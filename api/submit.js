import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  try {
    const { name, phone, configuration } = req.body;

    // Проверяем наличие обязательных переменных окружения
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
      console.error('GOOGLE_SHEETS_CREDENTIALS не установлена');
      return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
    }

    if (!process.env.SPREADSHEET_ID || !process.env.GOOGLE_SHEETS_RANGE) {
      console.error('SPREADSHEET_ID или GOOGLE_SHEETS_RANGE не установлены');
      return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
    }

    let credentials;
    try {
      // Заменяем экранированные символы новой строки на настоящие
      const credentialsString = process.env.GOOGLE_SHEETS_CREDENTIALS
        .replace(/\\n/g, '\n') // Заменяем \n на настоящие переносы строк
        .replace(/\\\\/g, '\\'); // Заменяем двойные обратные слеши на одинарные
      
      credentials = JSON.parse(credentialsString);
    } catch (parseError) {
      console.error('Ошибка парсинга GOOGLE_SHEETS_CREDENTIALS:', parseError);
      console.log('Строка для парсинга:', process.env.GOOGLE_SHEETS_CREDENTIALS);
      return res.status(500).json({ error: 'Неверный формат учетных данных' });
    }

    // Проверяем, что приватный ключ корректен
    if (!credentials.private_key || !credentials.client_email) {
      console.error('Неверные учетные данные: отсутствует private_key или client_email');
      return res.status(500).json({ error: 'Неверные учетные данные' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const addons = configuration.addons?.join(', ') || '-';

    const row = [
      new Date().toLocaleString('ru-RU'),
      name || '-',
      phone || '-',
      configuration.project || '-',
      configuration.technology || '-',
      configuration.configuration || '-',
      configuration.facade || '-',
      configuration.roof || '-',
      configuration.windows || '-',
      addons,
      configuration.totalPrice || '0',
    ];

    console.log('Добавляем строку:', row);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: process.env.GOOGLE_SHEETS_RANGE,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    });

    console.log('Данные успешно добавлены в таблицу');

    return res.status(200).json({ message: 'Данные успешно сохранены!' });
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    return res.status(500).json({ 
      error: 'Не удалось сохранить данные',
      details: error.message 
    });
  }
}