const utility = require("./utility.js"); 
const gridUtil = require("./tetrisGrid.js"); 

const inputFile = process.argv[2];
const outputFile = process.argv[3];

let outputData = '';
let outFileName = '';

if (!inputFile) {
  console.log('Input file name parameter is missing!');
  process.exit(1);
}

if (inputFile.substr(inputFile.length - 4) !== '.txt') {
  console.log('Input file .txt extension missing or not correct!');
  process.exit(1);
}

if (!outputFile) {
  console.log('Output file name parameter is missing!');
  process.exit(1);
}

if (outputFile.substr(outputFile.length - 4) !== '.txt') {
  console.log('Output file .txt extension missing or not correct!');
  process.exit(1);
}

var filename = process.argv[2];

let grid = gridUtil.initialize();

let inputLines = utility.uploadInputFileSync(inputFile);

for(let inputLine of inputLines){
	
  let instrs = utility.processInputFileLine(inputLine);

  for(let instr of instrs){
  	if (!grid.length)
  		grid = gridUtil.initialize();

    let colHeights = gridUtil.calculateColumnHeights(grid);

    let shape = gridUtil.getShape(instr.shape);

    let piece = {xPos: instr.xPos, shape: shape};

    let yPos = gridUtil.findVerticalPosition(colHeights, piece);

  	grid = gridUtil.insertPiece(grid, yPos, piece);

  	grid = gridUtil.removeFullEmptyRows(grid);
  }

  outputData = outputData + `${grid.length}\r`
  grid = gridUtil.initialize();
}

utility.writeToOutputFile(outputFile, outputData)