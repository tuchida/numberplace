const Cells = require('./cells');
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
    this.cells = new Cells(maxX, maxY);
    this.validNums = [];
    this.answer = [];
  }
  resolve(matrix) {
    this.validNums = matrix.map((n, i) => {
      return n > 0 ? null : this.makeValidNums(matrix, i);
    });
    this.answer = matrix.slice();

    while (this.putIfOnlyOne() ||
           this.tryEliminationMethod()) {
    }
    this.isValidAnswer();
    return this.answer;
  }
  makeValidNums(matrix, index) {
    var nums = allNums();
    for (let i of this.cells.row(index)) {
      remove(nums, matrix[i]);
    }
    for (let i of this.cells.column(index)) {
      remove(nums, matrix[i]);
    }
    for (let i of this.cells.block(index)) {
      remove(nums, matrix[i]);
    }
    return nums;
  }
  put(num, index) {
    console.assert(this.answer[index] === 0);
    this.answer[index] = num;
    this.validNums[index] = null;
    for (let i of this.cells.row(index)) {
      if (this.validNums[i]) {
        remove(this.validNums[i], num);
      }
    }
    for (let i of this.cells.column(index)) {
      if (this.validNums[i]) {
        remove(this.validNums[i], num);
      }
    }
    for (let i of this.cells.block(index)) {
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
    for (let row of this.cells.rows()) {
      if (this.tryEliminationMethod_([...row])) {
        return true;
      }
    }
    for (let column of this.cells.columns()) {
      if (this.tryEliminationMethod_([...column])) {
        return true;
      }
    }
    for (let block of this.cells.blocks()) {
      if (this.tryEliminationMethod_([...block])) {
        return true;
      }
    }
    return false;
  }
  tryEliminationMethod_(cells) {
    for (var n of allNums()) {
      var candidate = [];
      for (var i of cells) {
        if (this.answer[i] === n) {
          console.assert(candidate.length === 0);
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
    return false;
  }
  isValidAnswer() {
    for (var n of this.answer) {
      if (n === 0) {
        io.print(this.answer);
        io.print(this.validNums);
        throw new Error('Can\'t resolve');
      }
    }
  }
}

const resolve = (matrix) => {
  return new Resolver().resolve(matrix);
};

module.exports = resolve;