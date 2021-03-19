import test from 'ava';

import { unique } from './utils';

test('should return empty array if length is 0', (t) => {
  t.deepEqual(unique([]), []);
});

test('should return same array if length is 1', (t) => {
  t.deepEqual(unique([1]), [1]);
});

test('should return same array if no duplicates', (t) => {
  t.deepEqual(unique([1, 2, 3, 4, 5, 6]), [1, 2, 3, 4, 5, 6]);
});

test('should return unique array', (t) => {
  t.deepEqual(unique([1, 1, 1, 2, 3, 4, 5, 6]), [1, 2, 3, 4, 5, 6]);
  t.deepEqual(unique([1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6]), [1, 2, 3, 4, 5, 6]);
  t.deepEqual(unique([1, 1, 1, 1]), [1]);
  t.deepEqual(unique([1, 2, 1, 1]), [1, 2, 1]);
  t.deepEqual(unique([1, 1, 2, 1]), [1, 2, 1]);
});
