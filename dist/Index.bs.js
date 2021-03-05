

import * as App from "./App.bs.js";
import * as React from "../_snowpack/pkg/react.js";
import * as ReactDom from "../_snowpack/pkg/react-dom.js";
import * as Belt_Option from "../_snowpack/pkg/bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "../_snowpack/pkg/bs-platform/lib/es6/caml_option.js";

ReactDom.render(React.createElement(App.make, {}), Belt_Option.getExn(Caml_option.nullable_to_opt(document.querySelector("#root"))));

export {
  
}
/*  Not a pure module */
