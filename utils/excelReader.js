const XLSX = require('xlsx');
const path = require('path');

function readExcel(filePath) {
  const workbook = XLSX.readFile(path.resolve(filePath));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet);
}

module.exports = { readExcel };
