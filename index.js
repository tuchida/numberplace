const { resolve } = require('./lib/resolver');
const io = require('./lib/io');
const fs = require('fs');


if (process.argv.length < 3) {
  console.log('Usage: node index.js /path/to/problem.csv');
  process.exit(0);
}
fs.readFile(process.argv[2], (err, data) => {
  if (err) throw err;
  var p = io.parse(data.toString());
  console.time('resolve');
  var answer = resolve(p);
  console.timeEnd('resolve');
  io.print(answer);
});
