import React from "react";
import "./App.css";
import ScrollSpy from "./ScrollSpy";
import styled from "styled-components";

const sections = ["section1", "section2", "section3", "section4", "section5"];

const BigSection = styled.section`
  width: 100%;
  height: 1000px;
  text-align: center;
  border: 5px solid black;
  box-sizing: border-box;
`;

const App = () => {
  return (
    <div className="App">
      <ScrollSpy items={sections} />
      <div>
        <BigSection id={sections[0]}>section 1</BigSection>
        <BigSection id={sections[1]}>section 2</BigSection>
        <BigSection id={sections[2]}>section 3</BigSection>
        <BigSection id={sections[3]}>section 4</BigSection>
        <BigSection id={sections[4]}>section 5</BigSection>
      </div>
    </div>
  );
};

export default App;
