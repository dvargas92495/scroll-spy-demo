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

## Performance Considerations

## Aspirations
What would I improve if I had more time to production-ize this? Well first, for production I probably would have just used the 
`react-scrollspy` library above to get myself started. Given that this was a take home test, I opted for a more manual approach

## Limitations
Here are some potential issues with my implementation:
- Issue 1
- Issue 2
- Issue 3