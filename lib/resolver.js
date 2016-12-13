const Cells = require('./cells');
const io = require('./io');

const remove = (array, el) => {
  var i = array.indexOf(el);
  if (i >= 0) {
    array.splice(i, 1);
  }
};

const allNums = length => [...Array(Math.sqrt(length))].map((_, i) => i + 1);

const clone = array => array.slice();

const deepClone = array => array.map(a => a ? clone(a) : a);


class Resolver {
  constructor(matrix, validNums = null) {
    let length = Math.sqrt(matrix.length);
    this.cells = new Cells(length, length);
    this.validNums = validNums ? deepClone(validNums) : matrix.map((n, i) => {
      return n > 0 ? null : this.makeValidNums(matrix, i);
    });
    this.answer = clone(matrix);
    this.multiAnswer = false;
  }
  resolve() {
    while (this.putIfOnlyOne() ||
           this.tryEliminationMethod() ||
           this.invalidIfExistSameNums() ||
           this.bruteForce()) {
      if (!this.isValidProgress()) {
        return null;
      }
    }
    return this.isValidAnswer() ? this.answer : null;
  }
  makeValidNums(matrix, index) {
    var nums = allNums(matrix.length);
    for (let i of this.cells.allBlock(index)) {
      remove(nums, matrix[i]);
    }
    return nums;
  }
  put(num, index) {
    this.answer[index] = num;
    this.validNums[index] = null;
    for (let i of this.cells.allBlock(index)) {
      if (this.validNums[i]) {
        remove(this.validNums[i], num);
      }
    }
  }
  putIfOnlyOne() {
    return this.validNums.some((nums, i) => {
      if (nums && nums.length === 1) {
        this.put(nums[0], i);
        return true;
      }
      return false;
    });
  }
  tryEliminationMethod() {
    for (var n of allNums(this.answer.length)) {
      for (let block of this.cells.allBlocks()) {
        var candidate = [];
        for (var i of block) {
          if (this.answer[i] === n) {
            break;
          }
          if (this.validNums[i] && this.validNums[i].includes(n)) {
            candidate.push(i);
          }
        }
        if (candidate.length === 1) {
          this.put(n, candidate[0]);
          return true;
        }
      }
    }
    return false;
  }
  invalidIfExistSameNums() {
    for (let block of this.cells.allBlocks()) {
      block = [...block];
      let count = new Map();
      for (let i of block) {
        if (this.validNums[i]) {
          let key = this.validNums[i].join();
          if (!count.has(key)) {
            count.set(key, [i]);
          } else {
            count.get(key).push(i);
          }
        }
      }
      for (let [, indexes] of count) {
        let removedIndexes = this.validNums[indexes[0]];
        if (indexes.length === removedIndexes.length) {
          let result = false;
          for (let i of block) {
            if (this.validNums[i] && !indexes.includes(i)) {
              let len = this.validNums[i].length;
              for (let n of removedIndexes) {
                remove(this.validNums[i], n);
              }
              result = result || (len !== this.validNums[i].length);
            }
          }
          if (result) {
            return result;
          }
        }
      }
    }
    return false;
  }
  bruteForce() {
    let index = this.validNums.findIndex(nums => !!nums);
    if (index < 0) {
      return false;
    }
    let answer = null;
    for (let num of this.validNums[index]) {
      let resolver = new Resolver(this.answer, this.validNums);
      resolver.put(num, index);
      let result = resolver.resolve();
      if (result) {
        if (answer) {
          this.multiAnswer = true;
          return false;
        } else {
          answer = result;
        }
      } else {
        if (resolver.multiAnswer) {
          this.multiAnswer = true;
          return false;
        }
        remove(this.validNums[index], num);
        return true;
      }
    }
    if (answer) {
      this.answer = answer;
      this.validNums.fill(null);
      return true;
    }
    return false;
  }
  isValidProgress() {
    if (this.multiAnswer) {
      return false;
    }
    return this.answer.every((n, i) => {
      if (n > 0) {
        return this.validNums[i] === null;
      } else {
        return this.validNums[i] && this.validNums[i].length > 0;
      }
    });
  }
  isValidAnswer() {
    for (var n of this.answer) {
      if (n === 0) {
        return false;
      }
    }
    return true;
  }
}

const resolve = (matrix) => {
  let resolver = new Resolver(matrix);
  let answer = resolver.resolve();
  if (!answer) {
    throw new InvalidProblem(resolver.answer, resolver.validNums);
  }
  return answer;
};

class InvalidProblem extends Error {
  constructor(answer, validNums) {
    super('Can\'t resolve');
    this.answer = answer;
    this.validNums = validNums;
  }
}

module.exports.resolve = resolve;
module.exports.InvalidProblem = InvalidProblem;
