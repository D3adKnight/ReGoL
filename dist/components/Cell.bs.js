

import * as React from "../../_snowpack/pkg/react.js";

function Cell(Props) {
  var isAliveOpt = Props.isAlive;
  var toggleCell = Props.toggleCell;
  var isAlive = isAliveOpt !== undefined ? isAliveOpt : false;
  var prevIsAliveRef = React.useRef(isAlive);
  var prevIsAlive = prevIsAliveRef.current;
  React.useEffect((function () {
          if (isAlive !== prevIsAlive) {
            prevIsAliveRef.current = isAlive;
          }
          
        }), [isAlive]);
  var opacity = isAlive ? "1" : "0";
  var rStyle = {
    border: "1px solid black",
    height: "30px",
    width: "30px"
  };
  var iStyle = {
    backgroundColor: "seagreen",
    height: "100%",
    width: "100%",
    opacity: opacity,
    transition: "opacity .25s"
  };
  return React.createElement("div", {
              style: rStyle,
              onClick: toggleCell
            }, React.createElement("div", {
                  style: iStyle
                }));
}

var make = Cell;

export {
  make ,
  
}
/* react Not a pure module */
