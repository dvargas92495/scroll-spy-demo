import React, { useState } from "react";
import "./App.css";
import ScrollSpy from "./ScrollSpy";
import styled from "styled-components";
import { map, reduce } from "lodash";

const sections = ["section1", "section2", "section3", "section4", "section5"];

const BigSection = styled.section`
  width: 100%;
  height: ${(props) => props.height}px;
  text-align: center;
  border: 5px solid black;
  box-sizing: border-box;
`;

const App = () => {
  const [heights, setHeights] = useState(
    reduce(sections, (acc, id) => ({ ...acc, [id]: 1000 }), {})
  );
  return (
    <div className="App">
      <ScrollSpy items={sections} />
      <div>
        {map(sections, (id, i) => (
          <BigSection id={id} height={heights[id]} key={i}>
            <h1>{id}</h1>
            <div>
              <label htmlFor={`input${i}`}>
                Feel Free to Change This Section's Height!
              </label>
            </div>
            <input
              id={`input${i}`}
              type={"number"}
              value={heights[id]}
              min={100}
              onChange={(e) => setHeights({ ...heights, [id]: e.target.value })}
            />
          </BigSection>
        ))}
      </div>
    </div>
  );
};

export default App;
