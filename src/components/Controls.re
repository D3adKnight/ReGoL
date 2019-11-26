type control = {
  label: string,
  action: unit => unit,
};

[@react.component]
let make = (~onStart, ~onClear, ~onRandom, ~startLabel) => {
  <div style={ReactDOMRe.Style.make(~marginBottom="10px", ())}>
    <button onClick=onStart> {React.string(startLabel)} </button>
    <button onClick=onRandom> {React.string("randomize")} </button>
    <button onClick=onClear> {React.string("clear")} </button>
  </div>;
};