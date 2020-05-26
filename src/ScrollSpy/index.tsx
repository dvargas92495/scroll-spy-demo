import React, { useState } from "react";
import styled from "styled-components";
import { map } from "lodash";

// Background-color stolen from withprimer.com
const BACKGROUND = "#7267e6";

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 30%;
  bottom: 30%;
  width: 50px;
  min-height: 200px;
  background-color: ${BACKGROUND}40;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50%;
  width: 100%;
`;

const SectionLink = styled.a<{ active?: boolean }>`
  background-color: ${BACKGROUND};
  opacity: ${(props) => (props.active ? 1.0 : 0.5)};
  height: 20px;
  width: 20px;
  border-radius: 10px;
`;

const ScrollSpy = ({ items = [] }: { items?: string[] }) => {
  const [activeId, setActiveId] = useState(items[0]);
  return (
    <Container>
      <LinksContainer>
        {map(items, (item, i) => (
          <SectionLink role={"link"} key={i} active={activeId === item} />
        ))}
      </LinksContainer>
    </Container>
  );
};

export default ScrollSpy;
