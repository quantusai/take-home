import * as React from "react";
import * as ReactDOM from "react-dom";

const App = () => {
  return (
    <>
      {[1,2,3].map(_ => <h1> Redox Takehome Assessment</h1>)}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
