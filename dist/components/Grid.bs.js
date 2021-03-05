

import * as Cell from "./Cell.bs.js";
import * as Game from "../Game.bs.js";
import * as $$Array from "../../_snowpack/pkg/bs-platform/lib/es6/array.js";
import * as Curry from "../../_snowpack/pkg/bs-platform/lib/es6/curry.js";
import * as React from "../../_snowpack/pkg/react.js";

function Grid(Props) {
  var grid = Props.grid;
  var gridSize = Props.gridSize;
  var toggleCell = Props.toggleCell;
  var drawCell = function (index, cell) {
    var match = Game.getXY(gridSize, index);
    var y = match[1];
    var x = match[0];
    return React.createElement(Cell.make, {
                isAlive: cell !== 0,
                toggleCell: (function (param) {
                    return Curry._2(toggleCell, x, y);
                  }),
                key: String(index)
              });
  };
  var style = {
    display: "grid",
    gridTemplateColumns: "repeat(" + (String(gridSize) + ", 30px)")
  };
  return React.createElement("div", {
              style: style
            }, $$Array.mapi(drawCell, grid));
}

var make = Grid;

export {
  make ,
  
}
/* Cell Not a pure module */
