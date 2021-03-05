@react.component
let make = (~isAlive=false, ~toggleCell) => {
  let prevIsAliveRef = React.useRef(isAlive)
  let prevIsAlive = prevIsAliveRef.current

  React.useEffect1(() => {
    if isAlive != prevIsAlive {
      prevIsAliveRef.current = isAlive
    }

    None
  }, [isAlive])

  let opacity = isAlive ? "1" : "0"

  let rStyle = ReactDOM.Style.make(~border="1px solid black", ~width="30px", ~height="30px", ())

  let iStyle = ReactDOM.Style.make(
    ~width="100%",
    ~height="100%",
    ~backgroundColor="seagreen",
    ~transition="opacity .25s",
    ~opacity,
    (),
  )

  <div style=rStyle onClick=toggleCell> <div style=iStyle /> </div>
}
