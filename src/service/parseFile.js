import fs from 'fs';
import { parse } from 'csv-parse';
import xlsx from 'xlsx';

export const parseFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const invoices = [];
    
    if (filePath.endsWith('.csv')) {
      fs.createReadStream(filePath)
        .pipe(parse({ columns: true }))
        .on('data', (row) => invoices.push(row))
        .on('end', () => resolve(invoices))
        .on('error', (err) => reject(err));
    } else if (filePath.endsWith('.xlsx')) {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = xlsx.utils.sheet_to_json(sheet);
      resolve(rows);
    } else {
      reject(new Error('Unsupported file type'));
    }
  });
};
