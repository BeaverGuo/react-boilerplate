/*webpack 2016/11/22:
老美时间加8个钟
1.Code splitting with require.ensure()
2.Code Splitting - CSS  https://webpack.js.org/guides/code-splitting-css/

React is safe. We are not generating HTML strings so XSS protection is the default.
https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0#.tw4qhekwu
isomorphic (or universal) rendering:
That is, the ability to render your single page application on the server-side, send the html to the client and have the client become interactive without having to re-rendering the entire page.

初始渲染
The most common use case for server-side rendering is to handle the initial render when a user (or search engine crawler) first requests our app. When the server receives the request, it renders the required component(s) into an HTML string, and then sends it as a response to the client. From that point on, the client takes over rendering duties.

Redux on the Server
发送state到client用作initial state,为了保持初始与服务端的markup一致，不是很懂?
When using Redux with server rendering, we must also send the state of our app along in our response, so the client can use it as the initial state. This is important because, if we preload any data before generating the HTML, we want the client to also have access to this data. Otherwise, the markup generated on the client won't match the server markup, and the client would have to load the data again.

To send the data down to the client, we need to:

create a fresh, new Redux store instance on every request;
optionally dispatch some actions;
pull the state out of store;
and then pass the state along to the client.
On the client side, a new Redux store will be created and initialized with the state provided from the server.

Redux's only job on the server side is to provide the initial state of our app.

The following is the outline for what our server side is going to look like. We are going to set up an Express middleware using app.use to handle all requests that come in to our server. If you're unfamiliar with Express or middleware, just know that our handleRender function will be called every time the server receives a request.

sever.js
import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterApp from './reducers'
import App from './containers/App'

const app = Express()
const port = 3000

// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) { /* ... */ }
function renderFullPage(html, preloadedState) { /* ... */ }

app.listen(port)



The first thing that we need to do on every request is create a new Redux store instance. The only purpose of this store instance is to provide the initial state of our application.

When rendering, we will wrap <App />, our root component, inside a <Provider> to make the store available to all components in the component tree, as we saw in Usage with React.

The key step in server side rendering is to render the initial HTML of our component before we send it to the client side. To do this, we use ReactDOMServer.renderToString().

We then get the initial state from our Redux store using store.getState(). We will see how this is passed along in our renderFullPage function.

import { renderToString } from 'react-dom/server'

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(counterApp)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}

Inject Initial Component HTML and State

The final step on the server side is to inject our initial component HTML and initial state into a template to be rendered on the client side. To pass along the state, we add a <script> tag that will attach preloadedState to window.__PRELOADED_STATE__.

The preloadedState will then be available on the client side by accessing window.__PRELOADED_STATE__.

We also include our bundle file for the client-side application via a script tag. This is whatever output your bundling tool provides for your client entry point. It may be a static file or a URL to a hot reloading development server.

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}


The issue with that code snippet is in how we pass the Store state into the application. In the above screenshot, we just do a JSON.stringify call, and assign it to a global variable in a script tag. This is the vulnerability.
When a web browser parses the html of the page, and it encounters that <script> tag, they will continue reading until they see </script> — which means if your redux store has a value like the following in it, then when you load the client, you’ll receive an alert “You have an XSS vulnerability!”.
{
  user: {
    username: "NodeSecurity",
    bio: "as</script><script>alert('You have an XSS vulnerability!')</script>"
  }
}
The browser won’t actually read until the last curly bracket, instead, it will actually finish the script tag after bio: "as

How can you prevent this XSS vulnerability?
The Open Web Application Security Project luckily has a great selection of resources about XSS prevention. To prevent this vulnerability we need a few safety measures in place in our applications:
All user input should have HTML entities escaped. When you’re using React, it does prevent most XSS vulnerabilities, due to how it creates DOM Nodes and textual content.
When serializing state on the server to be sent to the client, you need to serialize in a way that escapes HTML entities. This is because you’re often no longer using React to create this string, hence not having the string automatically escaped.
Engineers over at Yahoo have luckily made the latter of these safety practices very easy to implement through their Serialize JavaScript module. Which you can easily drop into any application.
First instal the module with: npm install --save serialize-javascript
Then we can change the snippet from earlier to look like the following; In particular notice the change where we use serialize instead of JSON.stringify when assigning the value to __PRELOADED_STATE__


The client side is very straightforward. All we need to do is grab the initial state from window.__PRELOADED_STATE__, and pass it to our createStore() function as the initial state.

Let's take a look at our new client file:

client.js

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import counterApp from './reducers'

// Grab the state from a global injected into server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(counterApp, preloadedState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

import qs from 'qs' // Add this at the top of the file
import { renderToString } from 'react-dom/server'

function handleRender(req, res) {
  // Read the counter from the request, if provided
  const params = qs.parse(req.query)
  const counter = parseInt(params.counter, 10) || 0

  // Compile an initial state
  let preloadedState = { counter }

  // Create a new Redux store instance
  const store = createStore(counterApp, preloadedState)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const finalState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState))
}
The code reads from the Express Request object passed into our server middleware. The parameter is parsed into a number and then set in the initial state. If you visit http://localhost:3000/?counter=100 in your browser, you'll see the counter starts at 100. In the rendered HTML, you'll see the counter output as 100 and the __PRELOADED_STATE__ variable has the counter set in it.

As for receiving the data on the client-side, it works just the same as before, excepting that you now just have any HTML Entities in the string escaped (they’ll look like: \\u003C\\u002Fscript\\u003E rather than as </script>)
Remember: Just because you’re building an application with the latest technology on the market, or technology that is used by Facebook, you still have to take care of all the standard security practices you would, if you were writing an application with a Rails, Django, PHP, or older stack.



$.ajax({
  url: this.props.url,
  dataType: 'json',
  cache: false,
  success: function(data) {
    this.setState({data: data});
  }.bind(this),
  error: function(xhr, status, err) {
    console.error(this.props.url, status, err.toString());
  }.bind(this)
});


// tutorial14.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);



// tutorial17.js
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});



handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },


  The easiest way is to build a version that takes your data model and renders the UI but has no interactivity. It's best to decouple these processes because building a static version requires a lot of typing and no thinking, and adding interactivity requires a lot of thinking and not a lot of typing.

  To build a static version of your app that renders your data model, you'll want to build components that reuse other components and pass data using props. props are a way of passing data from parent to child. If you're familiar with the concept of state, don't use state at all to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don't need it.


  For each piece of state in your application:

Identify every component that renders something based on that state.
Find a common owner component (a single component above all the components that need the state in the hierarchy).
Either the common owner or another component higher up in the hierarchy should own the state.
If you can't find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

  var props = { foo: 'default' };
  var component = <Component {...props} foo={'override'} />;
  console.log(component.props.foo); // 'override'


<div>{'First \u00b7 Second'}</div>
<div>{'First ' + String.fromCharCode(183) + ' Second'}</div>

<div data-custom-attribute="foo" />


Autobinding: When creating callbacks in JavaScript, you usually need to explicitly bind a method to its instance such that the value of this is correct. With React, every method is automatically bound to its component instance (except when using ES6 class syntax). React caches the bound method such that it's extremely CPU and memory efficient. It's also less typing!


Event delegation: React doesn't actually attach event handlers to the nodes themselves. When React starts up, it starts listening for all events at the top level using a single event listener. When a component is mounted or unmounted, the event handlers are simply added or removed from an internal mapping. When an event occurs, React knows how to dispatch it using this mapping. When there are no event handlers left in the mapping, React's event handlers are simple no-ops. 




One of the hot methodologies in the JavaScript world is event delegation, and for good reason.  Event delegation allows you to avoid adding event listeners to specific nodes;  instead, the event listener is added to one parent.  That event listener analyzes bubbled events to find a match on child elements.  The base concept is fairly simple but many people don't understand just how event delegation works.  Let me explain the how event delegation works and provide pure JavaScript example of basic event delegation.

Let's say that we have a parent UL element with several child elements:

<ul id="parent-list">
    <li id="post-1">Item 1</li>
    <li id="post-2">Item 2</li>
    <li id="post-3">Item 3</li>
    <li id="post-4">Item 4</li>
    <li id="post-5">Item 5</li>
    <li id="post-6">Item 6</li>
</ul>
Let's also say that something needs to happen when each child element is clicked.  You could add a separate event listener to each individual LI element, but what if LI elements are frequently added and removed from the list?  Adding and removing event listeners would be a nightmare, especially if addition and removal code is in different places within your app.  The better solution is to add an event listener to the parent UL element.  But if you add the event listener to the parent, how will you know which element was clicked?

Simple:  when the event bubbles up to the UL element, you check the event object's target property to gain a reference to the actual clicked node.  Here's a very basic JavaScript snippet which illustrates event delegation:

// Get the element, add a click listener...
document.getElementById("parent-list").addEventListener("click", function(e) {
    // e.target is the clicked element!
    // If it was a list item
    if(e.target && e.target.nodeName == "LI") {
        // List item found!  Output the ID!
        console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
    }
});
Start by adding a click event listener to the parent element.  When the event listener is triggered, check the event element to ensure it's the type of element to react to.  If it is an LI element, boom:  we have what we need!  If it's not an element that we want, the event can be ignored.  This example is pretty simple -- UL and LI is a straight-forward comparison.  Let's try something more difficult.  Let's have a parent DIV with many children but all we care about is an A tag with the classA CSS class:

// Get the parent DIV, add click listener...
document.getElementById("myDiv").addEventListener("click",function(e) {
    // e.target was the clicked element
  if (e.target && e.target.matches("a.classA")) {
    console.log("Anchor element clicked!");
    }
});
Using the Element.matches API, we can see if the element matches our desired target.

Since most developers use a JavaScript library for their DOM element and event handling, I recommend using the library's method of event delegation, as they are capable of advanced delegation and element identification.

Hopefully this helps you visually the concept behind event delegation and convinces you of delegation's power!

React thinks of UIs as simple state machines. By thinking of a UI as being in various states and rendering those states, it's easy to keep your UI consistent.

In React, you simply update a component's state, and then render a new UI based on this new state. React takes care of updating the DOM for you in the most efficient way.


How State Works
A common way to inform React of a data change is by calling setState(data, callback). This method merges data into this.state and re-renders the component. When the component finishes re-rendering, the optional callback is called. Most of the time you'll never need to provide a callback since React will take care of keeping your UI up-to-date for you.

装饰器
A common pattern is to create several stateless components that just render data, and have a stateful component above them in the hierarchy that passes its state to its children via props. The stateful component encapsulates all of the interaction logic, while the stateless components take care of rendering data in a declarative way.


<Parent><Child /></Parent>
Parent can read its children by accessing the special this.props.children prop. this.props.children is an opaque data structure: use the React.Children utilities to manipulate them.



Child Reconciliation
Reconciliation is the process by which React updates the DOM with each new render pass. In general, children are reconciled according to the order in which they are rendered. For example, suppose two render passes generate the following respective markup:

// Render Pass 1
<Card>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</Card>
// Render Pass 2
<Card>
  <p>Paragraph 2</p>
</Card>
Intuitively, <p>Paragraph 1</p> was removed. Instead, React will reconcile the DOM by changing the text content of the first child and destroying the last child. React reconciles according to the order of the children.

Stateful Children
For most components, this is not a big deal. However, for stateful components that maintain data in this.state across render passes, this can be very problematic.

In most cases, this can be sidestepped by hiding elements instead of destroying them:

// Render Pass 1
<Card>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</Card>
// Render Pass 2
<Card>
  <p style={{display: 'none'}}>Paragraph 1</p>
  <p>Paragraph 2</p>
</Card>

Dynamic Children
The situation gets more complicated when the children are shuffled around (as in search results) or if new components are added onto the front of the list (as in streams). In these cases where the identity and state of each child must be maintained across render passes, you can uniquely identify each child by assigning it a key:

  render: function() {
    var results = this.props.results;
    return (
      <ol>
        {results.map(function(result) {
          return <li key={result.id}>{result.text}</li>;
        })}
      </ol>
    );
  }
When React reconciles the keyed children, it will ensure that any child with key will be reordered (instead of clobbered) or destroyed (instead of reused).

The key should always be supplied directly to the components in the array, not to the container HTML child of each component in the array:

// WRONG!
var ListItemWrapper = React.createClass({
  render: function() {
    return <li key={this.props.data.id}>{this.props.data.text}</li>;
  }
});
var MyComponent = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.results.map(function(result) {
          return <ListItemWrapper data={result}/>;
        })}
      </ul>
    );
  }
});
// Correct :)
var ListItemWrapper = React.createClass({
  render: function() {
    return <li>{this.props.data.text}</li>;
  }
});
var MyComponent = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.results.map(function(result) {
           return <ListItemWrapper key={result.id} data={result}/>;
        })}
      </ul>
    );
  }
});
You can also key children by passing a ReactFragment object. See Keyed Fragments for more details.

shouldComponentUpdate写在subtree里面
However, sometimes you really want to have fine-grained control over your performance. In that case, simply override shouldComponentUpdate() to return false when you want React to skip processing of a subtree. See the React reference docs for more information.


//jq
unction asyncEvent() {
  var dfd = jQuery.Deferred();
 
  // Resolve after a random interval
  setTimeout(function() {
    dfd.resolve( "hurray" );
  }, Math.floor( 400 + Math.random() * 2000 ) );
 
  // Reject after a random interval
  setTimeout(function() {
    dfd.reject( "sorry" );
  }, Math.floor( 400 + Math.random() * 2000 ) );
 
  // Show a "working..." message every half-second
  setTimeout(function working() {
    if ( dfd.state() === "pending" ) {
      dfd.notify( "working... " );
      setTimeout( working, 500 );
    }
  }, 1 );
 
  // Return the Promise so caller can't change the Deferred
  return dfd.promise();
}
 
// Attach a done, fail, and progress handler for the asyncEvent
$.when( asyncEvent() ).then(
  function( status ) {
    alert( status + ", things are going well" );
  },
  function( status ) {
    alert( status + ", you fail this time" );
  },
  function( status ) {
    $( "body" ).append( status );
  }
);

You could try using Promises and jQuery $.when

Store a list of the ajax call promises:

var defereds = [];

$(".editable-unsaved").each( function() {
    //...
    defereds.push($.get("WS/AverageSalary.ashx" /*...*/));
}
$.when.apply($, defereds).done(function() {
    CancelChanges();
});

This should, hopefully, wait for all the ajax calls to finish before calling CancelChanges()


异步顺序执行:
function doTask(taskNum, next){
    var time = Math.floor(Math.random()*3000);

    setTimeout(function(){
        console.log(taskNum);
        next();
    },time)
}

function createTask(taskNum){
    return function(next){
        doTask(taskNum, next);
    }
}

var tasks = [1,2,3];

for (var i = 0; i < tasks.length; i++){
    $(document).queue('tasks', createTask(tasks[i]));
}

$(document).queue('tasks', function(){
    console.log("all done");
});

$(document).dequeue('tasks');


.delegate()
Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.
As long as you delegate against the document you can also wire-up event handlers before the document ready event.
.live()
Elements dynamically added to the DOM that match the selector magically work because the real information was registered on the document.
Your events always delegate all the way up to the document. This can affect performance if your DOM is deep.






Everything is converted to a string before being rendered.
React elements are immutable. Once you create an element, you can't change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

