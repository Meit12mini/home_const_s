import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  try {
    const { name, phone, configuration } = req.body;

    console.log('Полученные данные:', { name, phone, configuration });

    // Проверка наличия обязательных переменных окружения
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
      console.error('Отсутствует GOOGLE_SHEETS_CREDENTIALS');
      return res.status(500).json({ error: 'Не настроены учетные данные Google Sheets' });
    }

    if (!process.env.GOOGLE_SHEETS_ID) {
      console.error('Отсутствует GOOGLE_SHEETS_ID');
      return res.status(500).json({ error: 'Не указан ID таблицы Google Sheets' });
    }

    if (!process.env.GOOGLE_SHEETS_RANGE) {
      console.error('Отсутствует GOOGLE_SHEETS_RANGE');
      return res.status(500).json({ error: 'Не указан диапазон Google Sheets' });
    }

    // Правильный парсинг credentials
    let credentials;
    try {
      // Пробуем разные форматы - может быть уже объект или строка JSON
      if (typeof process.env.GOOGLE_SHEETS_CREDENTIALS === 'string') {
        credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
      } else {
        credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
      }
      console.log('Credentials успешно распарсены');
    } catch (parseError) {
      console.error('Ошибка парсинга credentials:', parseError);
      // Возможно, credentials уже в формате объекта или в другом формате
      credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const addons = configuration.addons?.join(', ') || '-';

    const row = [
      new Date().toLocaleString('ru-RU'),
      name,
      phone,
      configuration.project,
      configuration.technology,
      configuration.configuration,
      configuration.facade,
      configuration.roof,
      configuration.windows,
      addons,
      configuration.totalPrice,
    ];

    console.log('Данные для записи в таблицу:', row);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: process.env.GOOGLE_SHEETS_RANGE,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });

    console.log('Успешный ответ от Google Sheets:', response.data);

    return res.status(200).json({ message: 'Данные успешно сохранены!' });
  } catch (error) {
    console.error('Полная ошибка при сохранении данных:');
    console.error('Название ошибки:', error.name);
    console.error('Сообщение ошибки:', error.message);
    console.error('Стек вызовов:', error.stack);
    
    if (error.code) {
      console.error('Код ошибки:', error.code);
    }
    
    if (error.response) {
      console.error('Данные ответа ошибки:', error.response.data);
      console.error('Статус ответа:', error.response.status);
    }

    return res.status(500).json({ 
      error: 'Не удалось сохранить данные',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Внутренняя ошибка сервера'
    });
  }
}