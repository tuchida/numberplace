class Cells {
  constructor(maxX = 9, maxY = 9) {
    this.maxX = maxX;
    this.maxY = maxY;
  }
  *column(index) {
    var n = Math.floor(index / this.maxX) * this.maxX;
    for (var m = n + this.maxX; n < m; n++) {
      yield n;
    }
  }
  *row(index) {
    var n = index % this.maxX;
    for (var m = this.maxX * this.maxY; n < m; n += this.maxX) {
      yield n;
    }
  }
  *square(index) {
    var x = index % this.maxX;
    var y = Math.floor(index / this.maxX);
    x = Math.floor(x / 3) * 3;
    y = Math.floor(y / 3) * 3;
    var n = y * this.maxX + x;
    for (var i = 0; i < 9; i++) {
      yield n + (i % 3) + Math.floor(i / 3) * this.maxX;
    }
  }
  *allBlock(index) {
    yield* this.column(index);
    yield* this.row(index);
    yield* this.square(index);
  }
  *columns() {
    for (let i = 0, len = this.maxX * this.maxY; i < len; i += this.maxX) {
      yield this.column(i);
    }
  }
  *rows() {
    for (let i = 0, len = this.maxX; i < len; i++) {
      yield this.row(i);
    }
  }
  *squares() {
    for (let i = 0, len = this.maxX * this.maxY; i < len; i += 3) {
      yield this.square(i);
    }
  }
  *allBlocks() {
    yield* this.columns();
    yield* this.rows();
    yield* this.squares();
  }
}

module.exports = Cells;
