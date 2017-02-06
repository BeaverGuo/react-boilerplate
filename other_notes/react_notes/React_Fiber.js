React Fiber
rewrite core algorithm
why fiber?
how it works?
what it can do?

scheduling:
controls both how and when to update your UI

push or pull based approach

render priority
animations are more important than typical updates
Scheduling allows you to prioritize different types of work


concurrency in a single thread
current setState synchronously without interruption
what happening rendering between animation(two frams)?

1.interrupt the current ,lower priority work
2.complete the high priority work
3.resume the interrupted work where it left off

rendering a component is like calling a function
component is like function calling

interrupting a function call
generators-->concurrency
debugger;
 