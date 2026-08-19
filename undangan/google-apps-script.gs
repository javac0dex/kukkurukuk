/**
 * APPS SCRIPT — RSVP ke Google Sheet
 * ------------------------------------------------
 * CARA PASANG:
 * 1. Buka Google Sheet baru (atau yang sudah ada) untuk menampung data RSVP.
 * 2. Buat baris header di baris pertama: Waktu | Nama | Kehadiran | Ucapan
 * 3. Salin ID Sheet dari URL-nya. Contoh URL:
 *    https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit
 *    ID-nya adalah bagian:  1AbCdEfGhIjKlMnOpQrStUvWxYz
 * 4. Menu Extensions → Apps Script (dari dalam Sheet ini, bukan situs terpisah).
 * 5. Hapus kode default, tempel seluruh isi file ini.
 * 6. Ganti nilai SHEET_ID di bawah dengan ID Sheet Anda.
 * 7. Klik Deploy → New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Klik Deploy, izinkan akses saat diminta (klik Advanced → Go to project (unsafe) jika muncul peringatan Google).
 * 9. Salin URL Web App yang muncul (formatnya https://script.google.com/macros/s/.../exec)
 * 10. Tempel URL tersebut ke script.js pada bagian GOOGLE_SCRIPT_URL.
 *
 * CATATAN: jika Anda mengubah kode ini setelah deploy, Anda harus
 * Deploy → Manage deployments → Edit (ikon pensil) → Version: New version → Deploy
 * agar perubahan benar-benar aktif. Membuat deployment baru tidak otomatis
 * menggantikan URL lama.
 */

// EDIT: tempel ID Sheet Anda di sini (dari URL Sheet, bagian setelah /d/ dan sebelum /edit)
const SHEET_ID = '1Gnfe_b5oOl3X6K7Qn93YV9BxaBYRjyMMGZUK3K3WNGw';

function getSheet_() {
  return SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
}

function doPost(e) {
  const sheet = getSheet_();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.attendance || '',
    data.message || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = getSheet_();
  const rows = sheet.getDataRange().getValues();
  const header = rows.shift();

  const entries = rows.map(row => ({
    time: row[0],
    name: row[1],
    attendance: row[2],
    message: row[3]
  }));

  return ContentService
    .createTextOutput(JSON.stringify(entries))
    .setMimeType(ContentService.MimeType.JSON);
}
