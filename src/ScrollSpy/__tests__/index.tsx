import React from "react";
import { render } from "@testing-library/react";
import ScrollSpy from "..";

test("Should render the scroll spy component", () => {
  const { container } = render(<ScrollSpy />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="sc-AxjAm eCcCxr"
      />
    </div>
  `);
});
