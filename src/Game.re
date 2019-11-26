// basic constants
let gridSize = 20;
let threshold = 0.6;

// grid initializers
let makeGrid = size => Array.make(size * size, 0);

let randomizeGrid = size =>
  Array.map(_ => Random.float(1.0) > threshold ? 1 : 0, makeGrid(size));

// grid accessors
let getIndex = (~size, ~x, ~y) => x + y * size;
let getXY = (~size, ~index) => (index mod size, index / size);

let toggleCell = (~grid, ~size, ~x, ~y) => {
  let index = getIndex(~size, ~x, ~y);

  Array.mapi(
    (i, cell) =>
      if (i == index) {
        cell == 1 ? 0 : 1;
      } else {
        cell;
      },
    grid,
  );
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

let calculateNeighbours = (grid, size, ~x, ~y) =>
  List.fold_left(
    (total, (nX, nY)) => {
      let checkedX = x + nX;
      let checkedY = y + nY;

      if (checkedX >= 0 && checkedX < size && checkedY >= 0 && checkedY < size) {
        let cell = grid[getIndex(~size, ~x=checkedX, ~y=checkedY)];
        total + cell;
      } else {
        total;
      };
    },
    0,
    neighborCells,
  );

let simulationStep = (grid, size) => {
  let getNeighboorhoods = calculateNeighbours(grid, size);

  Array.mapi(
    (index, cell) => {
      let (x, y) = getXY(~size, ~index);
      let neighbors = getNeighboorhoods(~x, ~y);

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