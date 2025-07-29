const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const SPREADSHEET_ID = '1_hBcerWlQu22cEzs-eLetSAf2amkYOycK6WM3FdUZ0E';
const creds = require('./service-account.json');

const serviceAccountAuth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

async function appendToSheet(data) {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle['Chat'];
        await sheet.addRow(data);
    } catch (error) {
        console.error('Error appending to Google Sheet:', error);
    }
}

module.exports = {
    appendToSheet
};
