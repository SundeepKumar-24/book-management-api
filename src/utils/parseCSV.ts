import fs from 'fs';
import readline from 'readline';

export const parseCSV = async (path: string): Promise<any[]> => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const entries: any[] = [];
  let headers: string[] = [];
  let index = 0;

  for await (const line of rl) {
    const cells = line.split(',');
    if (index === 0) {
      headers = cells;
    } else {
      const entry: any = {};
      cells.forEach((cell, i) => {
        const key = headers[i];
        entry[key] = key === 'publishedYear' ? Number(cell) : cell;
      });
      entries.push(entry);
    }
    index++;
  }

  return entries;
};