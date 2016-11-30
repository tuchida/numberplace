const parse = text => {
  return [].concat(...text.split('\n').map(line => line ? line.split(',').map(Number) : []));
};

const print = matrix => {
  for (var i = 0, len = matrix.length; i < len; i += 9) {
    console.log(...matrix.slice(i, i+9));
  }
};

module.exports = {
  parse: parse,
  print: print
};
