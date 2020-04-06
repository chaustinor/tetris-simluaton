const utility = require("./utility.js");
const gridUtil = require("./tetrisGrid.js");
const assert = require("assert");

describe("clean tetris grid matrix test", function() {
  it("checks that all rows in the tetris grid that are filled or completely empty are removed", function() {
	
	let dirtyArray = [
	  [1,1,1,1,1],
	  [0,0,0,0,0],
	  [1,1,1,0,1],
	  [1,0,1,0,0],
	  [1,1,1,1,1],
	  [0,0,0,0,0]
	]

    let cleanArray = gridUtil.removeFullEmptyRows(dirtyArray)
    console.log(cleanArray)
    assert.equal(2, cleanArray.length);
  });
});

describe("column heights test", function() {
  it("checks the highest 1's position in each column which corresponds to the column's height", function() {
	
	let myArray = [
	 [0, 1, 0, 1],
	 [0, 1, 0, 1],    
	 [0, 1, 1, 1]
	]

    let colHeights = gridUtil.calculateColumnHeights(myArray)
    console.log(colHeights)
  });
});

describe("vertical position of piece test", function() {
  it("checks the vertical base position of the piece", function() {
	
	let piece = {
	  xPos:1,
	  shape: [
		[0,1,1],
		[1,1,0]
	  ]
	}

    let columnHeights = [0, 0, 0, 3, 0, 0, 0, 0, 0, 0];

    let verticalPosition = gridUtil.findVerticalPosition(columnHeights, piece)
    console.log(verticalPosition)
    assert.equal(3, verticalPosition);
  });
});

describe("grid update test", function() {
  it("checks that the grid properly update with addition of new piece", function() {
	
	let grid = [
	  [0,0,0,0,0,0,0,0,0,1],
	  [1,1,0,0,0,0,0,0,0,1],
	  [1,1,0,0,1,1,1,1,1,1]
	];

	let xPos = 3;
	let yPos = 2;

	let piece = {
	  shape: [
	    [1,1,1,1]
	  ],
	  xPos: 3
	}

    let updatedGrid = gridUtil.insertPiece(grid, yPos, piece);
    console.log(updatedGrid);
  });
});

describe("input file upload test", function() {
  it("checks that the input file gets processed correctly", function() {
	
	let inputFilePath = 'input.txt';
    let data = utility.uploadInputFileSync(inputFilePath);
    console.log(data);
  });
});

describe("input file line process test", function() {
  it("checks that the input file line is processed correctly", function() {
	
	let inputFileLine = [ 'Q0', 'Q2', 'Q4', 'Q6', 'Q8', 'Q1', 'Q1' ];

	let processedLine = utility.processInputFileLine(inputFileLine);
	console.log(processedLine);
	assert.equal("Q", processedLine[0].shape);
  });
});

describe("shape lookup test", function() {
  it("checks that the proper shape is retreived correctly", function() {
	
	let shape = 'Q';
	let shapeMatrix = gridUtil.getShape(shape);
	console.log(shapeMatrix);
	assert.equal(2, shapeMatrix.length);
  });
});

describe("wrtie to file test", function() {
  it("checks that the data properly writes to the file", function() {
	
	let data = 1111;
	const fileName = 'outputTest.txt'
	utility.writeToOutputFile(fileName, data);
  });
});



