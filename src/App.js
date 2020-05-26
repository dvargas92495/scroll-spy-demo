import React from "react";
import "./App.css";
import ScrollSpy from "./ScrollSpy";

function App() {
  return (
    <div className="App">
      <ScrollSpy />
      <div>
        <section id="section-1">section 1</section>
        <section id="section-2">section 2</section>
        <section id="section-3">section 3</section>
      </div>
    </div>
  );
}

export default App;
