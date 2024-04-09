import './App.css';
import React from "react";
import Components from "./Components/Components";
import Parse from "parse";
import * as Env from "./environments";

// Initialize Parse
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

// App function calls Components function
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Components />
      </header>
    </div>
  );
}

export default App;
