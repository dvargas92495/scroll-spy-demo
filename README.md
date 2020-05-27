# Scroll Spy Demo

A react project showcasing the `ScrollSpy` component. The demo is reachable at https://scroll-spy-demo.netlify.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The core implementation
source code could be found in the `src/ScrollSpy` directory.

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
renders a different background opacity based on whether or not it represents the active id.

## Performance Considerations
The biggest performance consideration is the component's `intersectionCallback` method. Based on the documentation above, we
want this function to be run as fast as possible due to it being executed on the main thread. 

## Aspirations
What would I improve if I had more time to production-ize this? Well first, for production I probably would have just used the 
`react-scrollspy` library above to get myself started. Given that this was a take home test, I opted for a more manual approach.

For production, I would also write more tests to cover the component's functionality. I started on this path, and then realized
that I would have to mock the `IntersectionObserver`. Given that I won't be maintaining this component long term, I opted to focus
more of my time to the component itself.

## Limitations
Here are some potential issues with my implementation:
- Issue 1
- Issue 2
- Issue 3