//Note: You will find a lot of React Router examples using * as the route on the server,
//leaving the entire routing handling to React Router. Since all requests go through the
//same function, that makes it inconvenient to implement MVC-style pages. Instead of doing
//that, we're here explicitly declaring the routes and their dedicated responses, to be able
//to fetch data from the database and pass it to a given page easily.

//Here is our controller. It would typically make business logic and database calls, but in
//our case we just hard-code some results. Those results are passed back to the routing 
//module to be used to initialize our server-side Redux store.

export const homePage = () => null

export const helloPage = () => ({
    hello: { message: 'Server-side preloaded message' },
})

export const helloAsyncPage = () => ({
    hello: { message: 'Server-side preloaded message for async page' },
})

export const helloEndpoint = (num) => ({
    serverMessage: `Hello from the server! (received ${num})`,
})
