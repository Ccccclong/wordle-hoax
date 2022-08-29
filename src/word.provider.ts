import { readFile } from 'fs/promises';
import { WordsFileNotFoundError } from './word.provider.errors';

const FILE_PATH = 'words.txt';

export async function provideWords(path = FILE_PATH): Promise<string[]> {
  try {
    const buffer = await readFile(path);
    const content = buffer.toString();
    return content.split('\n').filter((word) => word.length > 0);
  } catch (error) {
    if ((error as any).code === 'ENOENT') throw new WordsFileNotFoundError();
    throw error;
  }
}
