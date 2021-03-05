

import * as Game from "./Game.bs.js";
import * as Grid from "./components/Grid.bs.js";
import * as Info from "./components/Info.bs.js";
import * as Curry from "../_snowpack/pkg/bs-platform/lib/es6/curry.js";
import * as React from "../_snowpack/pkg/react.js";
import * as Controls from "./components/Controls.bs.js";
import * as UseInterval from "./components/useInterval.bs.js";

function App(Props) {
  var gridSizeOpt = Props.gridSize;
  var gridSize = gridSizeOpt !== undefined ? gridSizeOpt : Game.gridSize;
  var match = React.useState(function () {
        return false;
      });
  var setRunning = match[1];
  var running = match[0];
  var match$1 = React.useState(function () {
        return Game.makeGrid(gridSize);
      });
  var setGrid = match$1[1];
  UseInterval.useInterval((function (param) {
          return Curry._1(setGrid, (function (grid) {
                        return Game.simulationStep(grid, gridSize);
                      }));
        }), running ? 300 : UseInterval.stop);
  var toggleCell = function (x, y) {
    return Curry._1(setGrid, (function (grid) {
                  return Game.toggleCell(grid, gridSize, x, y);
                }));
  };
  var onStart = function (param) {
    return Curry._1(setRunning, (function (prevRunning) {
                  return !prevRunning;
                }));
  };
  var onRandom = function (param) {
    return Curry._1(setGrid, (function (param) {
                  return Game.randomizeGrid(gridSize);
                }));
  };
  var onClear = function (param) {
    return Curry._1(setGrid, (function (param) {
                  return Game.makeGrid(gridSize);
                }));
  };
  var startLabel = running ? "stop" : "start";
  var style = {
    display: "flex",
    margin: "0 -10px",
    flexDirection: "row"
  };
  return React.createElement("div", undefined, React.createElement("h2", undefined, "Game of Life"), React.createElement("div", {
                  style: style
                }, React.createElement("div", {
                      style: {
                        margin: "0 10px"
                      }
                    }, React.createElement(Controls.make, {
                          onStart: onStart,
                          onClear: onClear,
                          onRandom: onRandom,
                          startLabel: startLabel
                        }), React.createElement(Grid.make, {
                          grid: match$1[0],
                          gridSize: gridSize,
                          toggleCell: toggleCell
                        })), React.createElement(Info.make, {})));
}

var gameSpeed = 300;

var make = App;

export {
  gameSpeed ,
  make ,
  
}
/* Grid Not a pure module */
