# Scroll Spy Demo

A react project showcasing the `ScrollSpy` component. The demo is reachable at https://scroll-spy-demo.netlify.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The core implementation
source code could be found in the `src/ScrollSpy` directory, with the App container in `src/App.tsx`.

## Design Decisions

For inspiration on usage, I looked at https://www.npmjs.com/package/react-scrollspy as reference. This led to an API
that requires the user to use `section` elements with ids in order to integrate the `ScrollSpy` component with the
rest of the page. That allowed the `ScrollSpy` component to be a separate component that could be composed into the page
instead of needing to wrap the page content.

Using the reference guide on [Intersection Observers](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API),
we set up observers on each of the ids as passed in by the `items` prop after the component's first render in a `useEffect` hook.
This allows each instance of the of the component to have its own observer, which disconnects when the component unmounts. We
maintain the currently intersecting entries in a `ref`, as we don't need to render based on this state. We use these values to
calculate an `activeId`, which we do rerender based on and also set the hash based on this value. The hash is updated as a
`replaceState` instead of a `pushState` so that we don't add to the browser history. Each id in the `items` prop
is then rendered as a `link`, which automatically scrolls to the component with the given id on click. Each of these links
renders a different background opacity based on whether or not it represents the active id. I was happy to get the component
to a point where only the links should meaningfully rerender on changing the `activeId`.

## Performance Considerations

The biggest performance consideration is the component's `intersectionCallback` method. Based on the documentation above, we
want this function to be run as fast as possible due to it being executed on the main thread. Currently, it's run time is
`O(size(items))`. I wanted to see if I could reduce this to `O(entries)`, but that often involved reverting the intersecting
entries to a `state` variable instead of a `ref` (so that it could then set active id), which created circular references. I'm
happy enough with number of section items, since in practice a page should only have a handful of sections anyway.

## Aspirations

What would I improve if I had more time to production-ize this? Well first, for production I probably would have just used the
`react-scrollspy` library above to get myself started. Given that this was a take home test, I opted for a more manual approach.

For production, I would also write more tests to cover the component's functionality. I started on this path, and then realized
that I would have to mock the `IntersectionObserver`. Given that I won't be maintaining this component long term, I opted to focus
more of my time to the component itself.

If this was a component that would be more widely shared (i.e. become a library like the package above), I would want to make it
far more configurable. The user could be able to define the styling for both the active/inactive state of the links or the styling
of the container. The example on the assignment page seemed to also display nesting, though this was not in the requirements. I
would want to give the user this capability as well, by passing in `items` as a list of section objects:

```javascript
type SectionItem = {
  id: string,
  depth: number,
};
```

I would opt for this flat list over a nested object since the links get rendered sequentially anyway and it would be easier to
operate on the prop as a list (e.g. observing each of the elements).

Another enhancement could include the component attempting to "smart" compute the `items` if a prop doesn't get passed in. Instead
of having to pass in the ids, the component could `document.getElementsByTagName('section')` and grab all of those ids. This is a
little tricky, since those elements won't be available on the initial render. I would still keep the optional items prop to give control to the user to override if need be.

There is also a `console.warn` in my implementation. In production, I'd like to use a logging library such that it would not log the
warnings to the web console when the `NODE_ENV` is production.

## Limitations

Here are some potential limitations with my implementation:

- I would consider all the potential enhancements above for production as a limitation of this component.
- If you increase the height of any one section to be greater than 5 times the viewport, it won't actually register the change 
since our threshold is 0.2. In this situation, we just keep whatever the last active id was. In practice, this is less of a concern 
since page sections shouldn't be so large, and if they are, the threshold could be adjusted accordingly. On that note, the current
threshold is hardcoded somewhat arbitrarily. I could see it be dynamically calculated based on the size of the largest section.
- The threshold 
