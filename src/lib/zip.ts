import { readFile } from 'fs/promises';
import { promisify } from 'util';
import { deflate } from 'zlib';

import { walk } from './walker';

export async function zip(
  path: string,
  options?: { ignored?: any }
): Promise<{ path: string; zip: Buffer }[]> {
  const paths = await walk(path, options);

  return Promise.all(
    paths.map(async (path: string) => {
      const zip = await zipFile(path);
      return {
        path,
        zip,
      };
    })
  );
}

async function zipFile(path: string): Promise<Buffer> {
  return promisify(deflate)(await readFile(path));
}
