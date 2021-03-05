

import * as React from "../../_snowpack/pkg/react.js";

function Info(Props) {
  var style = {
    display: "flex",
    margin: "0 10px",
    paddingTop: "25px",
    flexDirection: "column"
  };
  return React.createElement("div", {
              style: style
            }, React.createElement("span", undefined, React.createElement("b", undefined, "click"), " - toggle cell"), React.createElement("span", undefined, React.createElement("b", undefined, "start/stop"), " - start/stop simulation"), React.createElement("span", undefined, React.createElement("b", undefined, "randomize"), " - populate field with random"), React.createElement("span", undefined, React.createElement("b", undefined, "clear"), " - clear field"));
}

var make = Info;

export {
  make ,
  
}
/* react Not a pure module */
