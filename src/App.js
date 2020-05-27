import React from "react";
import "./App.css";
import ScrollSpy from "./ScrollSpy";
import styled from "styled-components";

const sections = ["section-1", "section-2", "section-3"];

const BigSection = styled.section`
  width: 100%;
  height: 1000px;
  text-align: center;
  border: 5px solid black;
  box-sizing: border-box;
`;

function App() {
  return (
    <div className="App">
      <ScrollSpy items={sections} />
      <div>
        <BigSection id={sections[0]} background={"red"}>
          section 1
        </BigSection>
        <BigSection id={sections[1]} background={"blue"}>
          section 2
        </BigSection>
        <BigSection id={sections[2]} background={"green"}>
          section 3
        </BigSection>
      </div>
    </div>
  );
}

export default App;
