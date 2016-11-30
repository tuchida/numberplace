const assert = require('power-assert');
const resolve = require('../lib/resolver');
const io = require('../lib/io');
const fs = require('fs');

describe('resolve', () => {
  const PROBLEM_DIR = './problem/';
  const ANSWER_DIR = './problem/answer/';

  for (let file of fs.readdirSync(PROBLEM_DIR)) {
    if (/\.csv$/.test(file)) {
      it(file, () => {
        let problem = io.parse(fs.readFileSync(PROBLEM_DIR + file).toString());
        let answer = io.parse(fs.readFileSync(ANSWER_DIR + file).toString());
        assert.deepEqual(resolve(problem), answer);
      });
    }
  }
});
