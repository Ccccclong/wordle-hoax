import { readFile } from 'fs/promises';

const FILE_PATH = 'words.txt';

export async function provideWords(path = FILE_PATH): Promise<string[]> {
  const buffer = await readFile(path);
  const content = buffer.toString();
  return content.split('\n');
}
