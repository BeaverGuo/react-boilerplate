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
