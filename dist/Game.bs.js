

import * as List from "../_snowpack/pkg/bs-platform/lib/es6/list.js";
import * as $$Array from "../_snowpack/pkg/bs-platform/lib/es6/array.js";
import * as Curry from "../_snowpack/pkg/bs-platform/lib/es6/curry.js";
import * as Random from "../_snowpack/pkg/bs-platform/lib/es6/random.js";
import * as Caml_obj from "../_snowpack/pkg/bs-platform/lib/es6/caml_obj.js";
import * as Caml_array from "../_snowpack/pkg/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../_snowpack/pkg/bs-platform/lib/es6/caml_int32.js";

function makeGrid(size) {
  return Caml_array.caml_make_vect(Math.imul(size, size), 0);
}

function randomizeGrid(size) {
  return $$Array.map((function (param) {
                if (Random.$$float(1.0) > 0.6) {
                  return 1;
                } else {
                  return 0;
                }
              }), makeGrid(size));
}

function getIndex(size, x, y) {
  return x + Math.imul(y, size) | 0;
}

function getXY(size, index) {
  return [
          Caml_int32.mod_(index, size),
          Caml_int32.div(index, size)
        ];
}

function getValueByXY(grid, size, x, y) {
  return Caml_array.get(grid, getIndex(size, x, y));
}

function toggleCell(grid, size, x, y) {
  var index = getIndex(size, x, y);
  return $$Array.mapi((function (i, cell) {
                if (i === index) {
                  if (cell === 1) {
                    return 0;
                  } else {
                    return 1;
                  }
                } else {
                  return cell;
                }
              }), grid);
}

var neighborCells = {
  hd: [
    0,
    -1
  ],
  tl: {
    hd: [
      1,
      -1
    ],
    tl: {
      hd: [
        1,
        0
      ],
      tl: {
        hd: [
          1,
          1
        ],
        tl: {
          hd: [
            0,
            1
          ],
          tl: {
            hd: [
              -1,
              1
            ],
            tl: {
              hd: [
                -1,
                0
              ],
              tl: {
                hd: [
                  -1,
                  -1
                ],
                tl: /* [] */0
              }
            }
          }
        }
      }
    }
  }
};

function isInBounds(x, y, size) {
  if (x >= 0 && x < size && y >= 0) {
    return y < size;
  } else {
    return false;
  }
}

function wrapValue(value, min, max) {
  if (Caml_obj.caml_lessthan(value, min)) {
    return max;
  } else if (Caml_obj.caml_greaterthan(value, max)) {
    return min;
  } else {
    return value;
  }
}

function wrapCoords(x, y, size) {
  var newX = function (param) {
    return function (param$1) {
      var func = function (param$2) {
        return wrapValue(param, param$1, param$2);
      };
      return function (param) {
        return Curry._4(func, param, x, 0, size);
      };
    };
  };
  var newY = function (param) {
    return function (param$1) {
      var func = function (param$2) {
        return wrapValue(param, param$1, param$2);
      };
      return function (param) {
        return Curry._4(func, param, y, 0, size);
      };
    };
  };
  return [
          newX,
          newY
        ];
}

function calculateNeighbours(grid, size, x, y) {
  return List.fold_left((function (total, param) {
                var checkedX = wrapValue(x + param[0] | 0, 0, size - 1 | 0);
                var checkedY = wrapValue(y + param[1] | 0, 0, size - 1 | 0);
                return total + getValueByXY(grid, size, checkedX, checkedY) | 0;
              }), 0, neighborCells);
}

function simulationStep(grid, size) {
  var getNeighbours = function (param, param$1) {
    return calculateNeighbours(grid, size, param, param$1);
  };
  return $$Array.mapi((function (index, cell) {
                var match = getXY(size, index);
                var neighbors = getNeighbours(match[0], match[1]);
                if (neighbors < 2 || neighbors > 3) {
                  return 0;
                } else if (neighbors === 3 && cell === 0) {
                  return 1;
                } else {
                  return cell;
                }
              }), grid);
}

var gridSize = 20;

var population = 0.6;

export {
  gridSize ,
  population ,
  makeGrid ,
  randomizeGrid ,
  getIndex ,
  getXY ,
  getValueByXY ,
  toggleCell ,
  neighborCells ,
  isInBounds ,
  wrapValue ,
  wrapCoords ,
  calculateNeighbours ,
  simulationStep ,
  
}
/* No side effect */
