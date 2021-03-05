

import * as Curry from "../../_snowpack/pkg/bs-platform/lib/es6/curry.js";
import * as React from "../../_snowpack/pkg/react.js";

function useInterval(c, delay) {
  var callback = React.useCallback((function (param) {
          return Curry._1(c, undefined);
        }), [c]);
  React.useEffect((function () {
          if (delay === -1) {
            return ;
          }
          var id = setInterval(callback, delay);
          return (function (param) {
                    clearInterval(id);
                    
                  });
        }), [
        delay,
        callback
      ]);
  
}

var stop = -1;

export {
  stop ,
  useInterval ,
  
}
/* react Not a pure module */
