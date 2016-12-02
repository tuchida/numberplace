const parse = text => {
  return [].concat(...text.split('\n').map(line => line ? line.split(',').map(Number) : []));
};

const print = matrix => {
  let length = Math.sqrt(matrix.length);
  for (var i = 0, len = matrix.length; i < len; i += length) {
    console.log(...matrix.slice(i, i + length));
  }
};

module.exports = {
  parse: parse,
  print: print
};
