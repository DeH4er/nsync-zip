export function unique<T>(arr: T[]): T[] {
  if (arr.length === 0) {
    return arr;
  }

  const res = [arr[0]];
  for (let i = 0, j = 1; j < arr.length; i++, j++) {
    if (arr[i] === arr[j]) {
      continue;
    }
    res.push(arr[j]);
  }

  return res;
}
