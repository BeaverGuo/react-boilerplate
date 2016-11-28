/*
https://medium.com/@adamrackis/normalizing-redux-stores-for-maximum-code-reuse-ae6e3844ae95#.3tqprbbh1
Object oriented solutions like MobX reduce boilerplate, but leave you on your own to shape your application in a way that’s testable, cohesive, and not overly coupled — in other words object-oriented analysis and design.
why MobX is OO solutions? where is the trade-off?
what is 'normalizing your stores' in redux?
https://medium.com/@adamrackis/querying-a-redux-store-37db8c7f3b0f#.nnotoyd6x
redux docs:
Any component wrapped with connect() call will receive a dispatch function as a prop, and any state it needs from the global state. In most cases you will only pass the first argument to connect(), which is a function we call a selector. This function takes the global Redux store’s state, and returns the props you need for the component. In the simplest case, you can just return the state given to you (i.e. pass identity function), but you may also wish to transform it first.
To make performant memoized transformations with composable selectors, check out reselect. 

why nomalized state?
This is followed by a code sample with a React component connected with a selector doing a slight transform on the store. It’s easy to miss here a key point: your store should contain flat, simple data that’s shaped as needed for your components in a selector downstream. This was also mentioned at the very beginning of the docs:

Note on Relationships
In a more complex app, you’re going to want different entities to reference each other. We suggest that you keep your state as normalized as possible, without any nesting. Keep every entity in an object stored with an ID as a key, and use IDs to reference it from other entities, or lists. Think of the app’s state as a database. This approach is described in normalizr’s documentation in detail. For example, keeping todosById: { id -> todo } and todos: array<id> inside the state would be a better idea in a real app, but we’re keeping the example simple.

why hard?
think of app's state as a database.
The Problem

You have a JSON API that returns deeply nested objects;
You want to port your app to Flux or Redux;
You noticed it's hard for Stores (or Reducers) to consume data from nested API responses.

seems important to notice this point
I’m sure I’m not the only one who didn’t focus on this on my read through the docs. Unfortunately missing, and failing to internalize this advice will likely add a great deal of complexity and difficulty to your application


