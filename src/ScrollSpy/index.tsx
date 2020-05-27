import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { map, filter, minBy } from "lodash";

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

const StyledSectionLink = styled.a<{ active?: boolean }>`
  background-color: ${BACKGROUND};
  opacity: ${(props) => (props.active ? 1.0 : 0.5)};
  height: 20px;
  width: 20px;
  border-radius: 10px;
`;

type IntersectionEntry = {
  isIntersecting: boolean;
  y: number;
  id: string;
};

const SectionLink = ({ item, active }: { item: string; active: boolean }) => {
  return <StyledSectionLink role={"link"} active={active} href={`#${item}`} />;
};

const ScrollSpy = ({ items = [] }: { items?: string[] }) => {
  const [activeId, setActiveId] = useState<string>();
  const intersectionEntries = useRef<{
    [id: string]: IntersectionEntry;
  }>({});
  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((e) => {
        const id = e.target.id;
        intersectionEntries.current[id] = {
          isIntersecting: e.isIntersecting,
          y: e.boundingClientRect.y,
          id,
        };
      });
      const visibleItems = filter(
        items,
        (i) => intersectionEntries.current[i]?.isIntersecting
      );
      const computedActiveId = minBy(
        visibleItems,
        (item) => intersectionEntries.current[item].y
      );
      setActiveId(computedActiveId);

      // setting window location hash directly non-deterministically has jarring scrolling behavior
      // opted for `history`'s replace state. in 'production' would use react-router's history
      // eslint-disable-next-line no-restricted-globals
      history.replaceState({}, "", `#${computedActiveId}`);
    },
    [intersectionEntries, setActiveId, items]
  );

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      intersectionCallback,
      {
        threshold: 0.2,
      }
    );
    items.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        intersectionObserver.observe(element);
      } else {
        console.warn(`Invalid id passed to scroll spy: ${element}`);
      }
    });
    return () => intersectionObserver.disconnect();
  }, [intersectionCallback, items]);
  return (
    <Container>
      <LinksContainer>
        {map(items, (item, i) => (
          <SectionLink key={i} active={activeId === item} item={item} />
        ))}
      </LinksContainer>
    </Container>
  );
};

export default ScrollSpy;
