// basic constants
let gridSize = 20;
let population = 0.6;

// grid initializers
let makeGrid = size => Array.make(size * size, 0);

let randomizeGrid = size =>
  Array.map(_ => Random.float(1.0) > population ? 1 : 0, makeGrid(size));

// grid accessors
let getIndex = (~size, ~x, ~y) => x + y * size;
let getXY = (~size, ~index) => (index mod size, index / size);
let getValueByXY = (~grid, ~size, ~x, ~y) => grid[getIndex(~size, ~x, ~y)];

let toggleCell = (~grid, ~size, ~x, ~y) => {
  let index = getIndex(~size, ~x, ~y);

  Array.mapi((i, cell) => i == index ? cell == 1 ? 0 : 1 : cell, grid);
};

let neighborCells = [
  (0, (-1)),
  (1, (-1)),
  (1, 0),
  (1, 1),
  (0, 1),
  ((-1), 1),
  ((-1), 0),
  ((-1), (-1)),
];

let isInBounds = (~x, ~y, ~size) => x >= 0 && x < size && y >= 0 && y < size;

let calculateNeighbours = (grid, size, ~x, ~y) =>
  List.fold_left(
    (total, (nX, nY)) => {
      let checkedX = x + nX;
      let checkedY = y + nY;

      isInBounds(~x=checkedX, ~y=checkedY, ~size)
        ? total + getValueByXY(~grid, ~size, ~x=checkedX, ~y=checkedY) : total;
    },
    0,
    neighborCells,
  );

type nextCellState =
  | Dead
  | Born
  | Same(int);

let simulationStep = (grid, size) => {
  let getNeighbours = calculateNeighbours(grid, size);

  Array.mapi(
    (index, cell) => {
      let (x, y) = getXY(~size, ~index);
      let neighbors = getNeighbours(~x, ~y);

      if (neighbors < 2 || neighbors > 3) {
        0;
      } else if (neighbors == 3 && cell == 0) {
        1;
      } else {
        cell;
      };
    },
    grid,
  );
};