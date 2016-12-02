const cells = new (require('./cells'));
const io = require('./io');

const remove = (array, el) => {
  var i = array.indexOf(el);
  if (i >= 0) {
    array.splice(i, 1);
  }
};

const allNums = () => [1, 2, 3, 4, 5, 6, 7, 8, 9];


class Resolver {
  constructor(maxX = 9, maxY = 9) {
    this.validNums = [];
    this.answer = [];
  }
  resolve(matrix) {
    this.validNums = matrix.map((n, i) => {
      return n > 0 ? null : this.makeValidNums(matrix, i);
    });
    this.answer = matrix.slice();

    while (this.putIfOnlyOne() ||
           this.tryEliminationMethod() ||
           this.invalidIfExistSameNums()) {
    }
    return this.isValidAnswer() ? this.answer : null;
  }
  makeValidNums(matrix, index) {
    var nums = allNums();
    for (let i of cells.allBlock(index)) {
      remove(nums, matrix[i]);
    }
    return nums;
  }
  put(num, index) {
    this.answer[index] = num;
    this.validNums[index] = null;
    for (let i of cells.allBlock(index)) {
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
    for (var n of allNums()) {
      for (let block of cells.allBlocks()) {
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
    for (let block of cells.allBlocks()) {
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
  let resolver = new Resolver();
  let answer = resolver.resolve(matrix);
  if (!answer) {
    io.print(resolver.answer);
    io.print(resolver.validNums);
    throw new Error('Can\'t resolve');
  }
  return answer;
};

module.exports = resolve;
