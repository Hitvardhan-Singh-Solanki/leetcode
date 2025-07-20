import * as readline from 'readline';
import * as fs from 'fs';

export async function readLines(filePath: string): Promise<string[]> {
  const res: string[] = [];
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      res.push(line);
    }
  } catch (error) {
    console.error(`Error reading file: ${error}`);
  }

  return res;
}
