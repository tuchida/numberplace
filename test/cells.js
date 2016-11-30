const assert = require('power-assert');
const Cells = require('../lib/cells');


describe('Cells', () => {
  describe('column', () => {
    describe('9 * 6', () => {
      var cells = new Cells(9, 6);
      it('(0, 0)', () => {
        var index = 0 * 9 + 0;
        assert.deepEqual([...cells.column(index)], [0, 1, 2, 3, 4, 5, 6, 7, 8]);
      });
      it('(0, 1)', () => {
        var index = 1 * 9 + 0;
        assert.deepEqual([...cells.column(index)], [9, 10, 11, 12, 13, 14, 15, 16, 17]);
      });
      it('(1, 1)', () => {
        var index = 1 * 9 + 1;
        assert.deepEqual([...cells.column(index)], [9, 10, 11, 12, 13, 14, 15, 16, 17]);
      });
    });
    describe('6 * 9', () => {
      var cells = new Cells(6, 9);
      it('(0, 0)', () => {
        var index = 0 * 6 + 0;
        assert.deepEqual([...cells.column(index)], [0, 1, 2, 3, 4, 5]);
      });
      it('(1, 1)', () => {
        var index = 1 * 6 + 1;
        assert.deepEqual([...cells.column(index)], [6, 7, 8, 9, 10, 11]);
      });
    });
  });

  describe('row', () => {
    describe('9 * 6', () => {
      var cells = new Cells(9, 6);
      it('(0, 0)', () => {
        var index = 0 * 9 + 0;
        assert.deepEqual([...cells.row(index)], [0, 9, 18, 27, 36, 45]);
      });
      it('(1, 1)', () => {
        var index = 1 * 9 + 1;
        assert.deepEqual([...cells.row(index)], [1, 10, 19, 28, 37, 46]);
      });
    });
    describe('6 * 9', () => {
      var cells = new Cells(6, 9);
      it('(0, 0)', () => {
        var index = 0 * 6 + 0;
        assert.deepEqual([...cells.row(index)], [0, 6, 12, 18, 24, 30, 36, 42, 48]);
      });
      it('(1, 1)', () => {
        var index = 1 * 6 + 1;
        assert.deepEqual([...cells.row(index)], [1, 7, 13, 19, 25, 31, 37, 43, 49]);
      });
    });
  });

  describe('block', () => {
    describe('9 * 6', () => {
      var cells = new Cells(9, 6);
      it('(0, 0)', () => {
        var index = 0 * 9 + 0;
        assert.deepEqual([...cells.block(index)], [0, 1, 2, 9, 10, 11, 18, 19, 20]);
      });
      it('(1, 1)', () => {
        var index = 1 * 9 + 1;
        assert.deepEqual([...cells.block(index)], [0, 1, 2, 9, 10, 11, 18, 19, 20]);
      });
      it('(4, 4)', () => {
        var index = 4 * 9 + 4;
        assert.deepEqual([...cells.block(index)], [30, 31, 32, 39, 40, 41, 48, 49, 50]);
      });
    });
    describe('6 * 9', () => {
      var cells = new Cells(6, 9);
      it('(0, 0)', () => {
        var index = 0 * 6 + 0;
        assert.deepEqual([...cells.block(index)], [0, 1, 2, 6, 7, 8, 12, 13, 14]);
      });
      it('(1, 1)', () => {
        var index = 1 * 6 + 1;
        assert.deepEqual([...cells.block(index)], [0, 1, 2, 6, 7, 8, 12, 13, 14]);
      });
      it('(4, 4)', () => {
        var index = 4 * 6 + 4;
        assert.deepEqual([...cells.block(index)], [21, 22, 23, 27, 28, 29, 33, 34, 35]);
      });
    });
    describe('9 * 9', () => {
      var cells = new Cells(9, 9);
      it('(4, 0)', () => {
        var index = 0 * 6 + 4;
        assert.deepEqual([...cells.block(index)], [3, 4, 5, 12, 13, 14, 21, 22, 23]);
      });
    });
  });
});
