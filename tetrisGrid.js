const shapes = new Map([
  ['Q', [ 
          [1,1], 
          [1,1]
        ]
  ],
  ['Z', [ 
          [1,1,0], 
          [0,1,1]
        ] 
  ],
  ['S', [
          [0,1,1], 
          [1,1,0]
        ]
  ],
  ['I', [ 
          [1,1,1,1]
        ] 
  ],
  ['T', [ 
          [1,1,1], 
 		  [0,1,0]
        ] 
  ],
  ['L', [
          [1,0],
          [1,0],
          [1,1]
        ]
  ],
  ['J', [
          [0,1],
          [0,1],
          [1,1]
        ]
  ]
]);

const getNewRow = () => ([0,0,0,0,0,0,0,0,0,0])

const getShape = shape => (shapes.get(shape))

const removeFullEmptyRows = grid => {
  return grid.filter(row => {
    let rowTotalValue = row.reduce((total, currentValue) => (total + currentValue))
    return rowTotalValue && rowTotalValue < grid[0].length
  })
}

const calculateColumnHeights = grid => {
  let columnHeights = [];
  let j = 0;

  for(var i = 0; i < grid.length; i++) {
     
    if (grid[i][j]){
      columnHeights = [...columnHeights, grid.length - i]
    }
    else if (i === grid.length - 1){
      columnHeights = [...columnHeights, 0]
    }
  
    //move to next column
    if ((i === grid.length - 1 || grid[i][j])){
      if (j < grid[0].length - 1){
        j++;
        i = -1;
      }
      else {
        break;
      }
    }
  }

  return columnHeights;
}

const findVerticalPosition = (columnHeights, piece) => {

  let xPos = piece.xPos;
  let shape = piece.shape;
  let base = 1;
  let colIndexes = new Map();
  let bottomRowIdx = shape.length - 1;

  if (shape[0].length + xPos > columnHeights.length)
    return -1;
   
  for (var i = bottomRowIdx; i >= 0; i--) {
    let shapeRow = shape[i];

    for (var j = 0; j < shapeRow.length; j++) {
      if (shapeRow[j] && !colIndexes.has(j)){
        
        let deltaY = base + (bottomRowIdx - i) - columnHeights[xPos + j];

        if (deltaY > 0){
          colIndexes.set(j, deltaY);

          if (colIndexes.size === shapeRow.length){
            return base;
          }
        }
        else {
          colIndexes.clear();
          base++;
          i = bottomRowIdx + 1;
          break;
        }
      } 
    }
  }

  return base;
}

const insertPiece = (grid, yPos, piece) => {
  
  let shape = piece.shape;
  let pieceReversed = shape.slice(0).reverse();
 
  let deficit = shape.length - grid.length + (yPos - 1);
  
  for (var i = 0; i < deficit; i++) {
    grid.unshift([0,0,0,0,0,0,0,0,0,0])
  }
    
  let delta = grid.length - shape.length;

  let updatedGrid = grid.slice(0).reverse().map((row, i) => {
     
    if (i >= yPos - 1 && i <= (yPos + shape.length - 2)){
      let before = row.slice(0, piece.xPos);
      
      let newPiece = pieceReversed[i - (yPos - 1)];
        
      let after = row.slice(before.length + newPiece.length);

      let mergedRowCount = before.length + newPiece.length + after.length;

      return [...before,...newPiece,...after];
    }
    else {
      return row;
    }
  });
  
  return updatedGrid.slice(0).reverse();
}

const getData = () => (grid)

const initialize = () => ([getNewRow()])

const grid = [getNewRow()]

module.exports = { getNewRow, getShape, removeFullEmptyRows, calculateColumnHeights, findVerticalPosition, insertPiece, getData, initialize }
