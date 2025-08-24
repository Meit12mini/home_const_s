import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  try {
    const { name, phone, configuration } = req.body;

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
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

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: process.env.GOOGLE_SHEETS_RANGE,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });

    return res.status(200).json({ message: 'Данные успешно сохранены!' });
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    return res.status(500).json({ error: 'Не удалось сохранить данные' });
  }
}