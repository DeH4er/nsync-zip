import { readdir, stat } from 'fs/promises';
import { join } from 'path';

import anymatch from 'anymatch';

export async function walk(
  path: string,
  options?: { ignored?: any }
): Promise<string[]> {
  const ignore: (path: string) => boolean = options?.ignored
    ? anymatch(options.ignored)
    : () => true;

  const pathStat = await stat(path);
  if (pathStat.isFile()) {
    return [path];
  }

  return await walkDir(path, ignore, []);
}

async function walkDir(
  path: string,
  ignore: (path: string) => boolean,
  results: string[]
): Promise<string[]> {
  const files = await readdir(path, { withFileTypes: true });
  for await (const file of files) {
    if (ignore(file.name)) {
      continue;
    }

    const joinedPath = join(path, file.name);
    if (file.isDirectory()) {
      await walkDir(joinedPath, ignore, results);
    } else {
      results.push(joinedPath);
    }
  }

  return results;
}
