import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { promisify } from 'util';
import { inflate as _inflate } from 'zlib';

import mkdir from 'mkdirp';

import { unique } from './utils';

const inflate = promisify(_inflate);

export async function unzip(
  path: string,
  zip: { path: string; zip: Buffer }[]
): Promise<void> {
  await mkdir(path);
  await createDirs(path, zip);
  await createFiles(path, zip);
}

function createFiles(
  path: string,
  zip: { path: string; zip: Buffer }[]
): Promise<unknown> {
  return Promise.all(
    zip.map(async (item: { path: string; zip: Buffer }) => {
      const unzip = await inflate(item.zip);
      const fullpath = join(path, item.path);
      return await writeFile(fullpath, unzip);
    })
  );
}

function createDirs(
  path: string,
  zip: { path: string; zip: Buffer }[]
): Promise<unknown> {
  const uniqueDirs = dirs(zip.map((item) => join(path, item.path)));
  return Promise.all(uniqueDirs.map((dir: string) => mkdir(dir)));
}

function dirs(paths: string[]): string[] {
  return unique(paths.map(dirname)).filter((path: string) => path !== '.');
}
