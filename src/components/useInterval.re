let stop = (-1);

let useInterval = (c, delay) => {
  let callback = React.useCallback1(() => c(), [|c|]);

  React.useEffect2(
    () =>
      if (delay != stop) {
        let id = Js.Global.setInterval(callback, delay);
        Some(() => Js.Global.clearInterval(id));
      } else {
        None;
      },
    (delay, callback),
  );
};