const fs = require('fs');

const uploadInputFileSync = fileName => {
  let file = fs.readFileSync(fileName, 'utf8');
  let lines = file.trim().split('\n');
  return lines.map(line => line.split(','));
}

const processInputFileLine = inputFileLine => {
  return inputFileLine.map(x => {
    let instr = x.split('');
    return {shape: instr[0], xPos: parseInt(instr[1])};
  });
}

const writeToOutputFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err, data) => {
    if (err) console.log(err);
  })
}

module.exports = { uploadInputFileSync, processInputFileLine, writeToOutputFile }