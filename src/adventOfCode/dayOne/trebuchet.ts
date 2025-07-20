import * as path from 'path';
import { readLines } from './readFile';
import { processData } from './processData';

export async function trebuchet(): Promise<number> {
  const filePath = path.resolve(__dirname, './trebuchet.txt');
  try {
    const data = await readLines(filePath);
    console.log(processData(data));
  } catch (err) {
    console.error('Error reading the file:', err);
  }
  return 0;
}
