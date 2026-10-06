/**
 * Lorena — RSVP → Google Sheets
 * Cole este arquivo em Extensões → Apps Script, na planilha que vai receber
 * as respostas. Passo a passo completo: docs/lorena/README.md
 */

// Mesmo valor da variável LORENA_RSVP_SECRET na Vercel.
const SECRET = 'COLE_AQUI_O_SEGREDO';
const SHEET_NAME = 'RSVP';
const HEADER = ['Recebido em', 'Nome', 'Vem?', 'Pessoas', 'Observações'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.token !== SECRET) return json_({ ok: false, error: 'unauthorized' });

    lock.waitLock(10000);
    const vem = data.vem === 'sim';
    sheet_().appendRow([
      new Date(),
      safe_(data.nome),
      vem ? 'Sim' : 'Não',
      vem ? Math.min(6, Math.max(1, Number(data.pessoas) || 1)) : 0,
      safe_(data.obs),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Cria a aba RSVP com cabeçalho na primeira resposta. */
function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADER);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
  }
  return sh;
}

/** Impede que um texto vire fórmula na planilha (=, +, -, @). */
function safe_(v) {
  const s = String(v == null ? '' : v).slice(0, 1000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
