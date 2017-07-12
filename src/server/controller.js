// @flow

/* Here is our controller. It would typically make business logic and database calls,
 but in our case we just hard-code some results. Those results are passed back to the
routing module to be used to initialize our server-side Redux store.
*/

export const homePage = () => null

export const helloPage = () => ({
  hello: { message: 'Server-side preloaded message' },
})

export const helloAsyncPage = () => ({
  hello: { messageAsync: 'Server-side preloaded message for async page' },
})

export const followOthersPage = () => ({
  hello: { messageAsync: 'Server-side preloaded message for async page' },
})

export const helloEndpoint = (num: number) => ({
  serverMessage: `Hello from the server! (received ${num})`,
})
