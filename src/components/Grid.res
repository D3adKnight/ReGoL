@react.component
let make = (~grid, ~gridSize, ~toggleCell) => {
  let drawCell = (index, cell) => {
    let (x, y) = Game.getXY(~size=gridSize, ~index)

    <Cell
      key={string_of_int(index)}
      isAlive={cell != 0 ? true : false}
      toggleCell={_ => toggleCell(x, y)}
    />
  }

  let style = ReactDOM.Style.make(
    ~display="grid",
    ~gridTemplateColumns="repeat(" ++ (string_of_int(gridSize) ++ ", 30px)"),
    (),
  )

  <div style> {Array.mapi(drawCell, grid)->React.array} </div>
}
