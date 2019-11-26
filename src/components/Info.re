[@react.component]
let make = () => {
  let style =
    ReactDOMRe.Style.make(
      ~display="flex",
      ~flexDirection="column",
      ~paddingTop="25px",
      ~margin="0 10px",
      (),
    );

  <div style>
    <span>
      <b> {React.string("click")} </b>
      {React.string(" - toggle cell")}
    </span>
    <span>
      <b> {React.string("start/stop")} </b>
      {React.string(" - start/stop simulation")}
    </span>
    <span>
      <b> {React.string("randomize")} </b>
      {React.string(" - populate field with random")}
    </span>
    <span>
      <b> {React.string("clear")} </b>
      {React.string(" - clear field")}
    </span>
  </div>;
};