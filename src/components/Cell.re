[@react.component]
let make = (~isAlive=false, ~toggleCell) => {
  let prevIsAliveRef = React.useRef(isAlive);
  let prevIsAlive = React.Ref.current(prevIsAliveRef);

  React.useEffect1(
    () => {
      if (isAlive != prevIsAlive) {
        React.Ref.setCurrent(prevIsAliveRef, isAlive);
      };

      None;
    },
    [|isAlive|],
  );

  let opacity = isAlive ? "1" : "0";

  let rStyle =
    ReactDOMRe.Style.make(
      ~border="1px solid black",
      ~width="30px",
      ~height="30px",
      (),
    );

  let iStyle =
    ReactDOMRe.Style.make(
      ~width="100%",
      ~height="100%",
      ~backgroundColor="seagreen",
      ~transition="opacity .25s",
      ~opacity,
      (),
    );

  <div style=rStyle onClick=toggleCell> <div style=iStyle /> </div>;
};