import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.css";
import { Welcome } from './components/welcome/welcome.tsx'

const App = () => {
  return (
    <>
<article>
  <aside>
    <nav>
      <h3>Sidebar Navigation</h3>
      <ul>
        <li><a href="#">Welcome</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
        <li><a href="#">Link 4</a></li>
      </ul>
    </nav>
  </aside>
  <main>
    <Welcome/>
  </main>
</article>      
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
