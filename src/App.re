open Game;

let gameSpeed = 300;

[@react.component]
let make = (~gridSize=gridSize) => {
  let (running, setRunning) = React.useState(() => false);
  let (grid, setGrid) = React.useState(() => makeGrid(gridSize));

  UseInterval.useInterval(
    () => setGrid(grid => simulationStep(grid, gridSize)),
    running ? gameSpeed : UseInterval.stop,
  );

  let toggleCell = (x, y) =>
    setGrid(grid => Game.toggleCell(~grid, ~size=gridSize, ~x, ~y));

  let onStart = _ => setRunning(prevRunning => !prevRunning);
  let onRandom = _ => setGrid(_ => randomizeGrid(gridSize));
  let onClear = _ => setGrid(_ => makeGrid(gridSize));
  let startLabel = running ? "stop" : "start";

  <div>
    <Controls onClear onStart onRandom startLabel />
    <Grid grid gridSize toggleCell />
  </div>;
};