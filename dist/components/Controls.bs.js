

import * as React from "../../_snowpack/pkg/react.js";

function Controls(Props) {
  var onStart = Props.onStart;
  var onClear = Props.onClear;
  var onRandom = Props.onRandom;
  var startLabel = Props.startLabel;
  return React.createElement("div", {
              style: {
                marginBottom: "10px"
              }
            }, React.createElement("button", {
                  onClick: onStart
                }, startLabel), React.createElement("button", {
                  onClick: onRandom
                }, "randomize"), React.createElement("button", {
                  onClick: onClear
                }, "clear"));
}

var make = Controls;

export {
  make ,
  
}
/* react Not a pure module */
