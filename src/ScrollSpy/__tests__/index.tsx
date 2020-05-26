import React from "react";
import { render } from "@testing-library/react";
import ScrollSpy from "..";
import { range, map } from "lodash";
import "jest-styled-components";

test("Should render the scroll spy component", () => {
  const { container } = render(<ScrollSpy />);
  expect(container).toMatchInlineSnapshot(`
    .c0 {
      position: fixed;
      left: 0;
      top: 30%;
      bottom: 30%;
      width: 50px;
      min-height: 200px;
      background-color: #7267e640;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
    }

    .c1 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: space-around;
      -webkit-justify-content: space-around;
      -ms-flex-pack: space-around;
      justify-content: space-around;
      height: 50%;
      width: 100%;
    }

    <div>
      <div
        class="c0"
      >
        <div
          class="c1"
        />
      </div>
    </div>
  `);
});

test("As we scroll through the content, the sidebar active element should automatically update to the current section", () => {
  const sectionIds = map(range(3), (i) => `section${i}`);
  const { getAllByRole } = render(
    <div>
      <ScrollSpy items={sectionIds} />
      <section id={sectionIds[0]}>Content 0</section>
      <section id={sectionIds[1]}>Content 1</section>
      <section id={sectionIds[2]}>Content 2</section>
    </div>
  );
  const elements = getAllByRole("link");
  expect(elements).toHaveLength(sectionIds.length);
  expect(elements[0]).toHaveStyle("opacity: 1.0");
  expect(elements[1]).toHaveStyle("opacity: 0.5");
  expect(elements[2]).toHaveStyle("opacity: 0.5");
});
