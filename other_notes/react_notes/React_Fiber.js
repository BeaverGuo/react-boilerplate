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
what happening rendering between animation(two frames)?

1.interrupt the current ,lower priority work
2.complete the high priority work
3.resume the interrupted work where it left off

rendering a component is like calling a function
component is like function calling

interrupting a function call
generators-->concurrency
debugger;

//Array.isArray polyfill
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

//react basics
function NameBox(name) {
  return { fontWeight: 'bold', labelContent: name };
}
'Sebastian Markbåge' ->
{ fontWeight: 'bold', labelContent: 'Sebastian Markbåge' };


function FancyUserBox(user) {
  return {
    borderStyle: '1px solid blue',
    childContent: [
      'Name: ',
      NameBox(user.firstName + ' ' + user.lastName)  //UI abstraction抽象成可复用的function
    ]
  };
}


{ firstName: 'Sebastian', lastName: 'Markbåge' } ->
{
  borderStyle: '1px solid blue',
  childContent: [
    'Name: ',
    { fontWeight: 'bold', labelContent: 'Sebastian Markbåge' }
  ]
};

//Composition: build abstractions from the containers that compose other abstractions.
function FancyBox(children) {
  return {
    borderStyle: '1px solid blue',
    children: children
  };
}

function UserBox(user) {
  return FancyBox([
    'Name: ',
    NameBox(user.firstName + ' ' + user.lastName)
  ]);
}

//state
function FancyNameBox(user, likes, onClick) {
  return FancyBox([
    'Name: ', NameBox(user.firstName + ' ' + user.lastName),
    'Likes: ', LikeBox(likes),
    LikeButton(onClick)
  ]);
}

// Implementation Details

var likes = 0;
function addOneMoreLike() {
  likes++;
  rerender();
}

// Init

FancyNameBox(
  { firstName: 'Sebastian', lastName: 'Markbåge' },
  likes,
  addOneMoreLike
);

//Memoization

function memoize(fn) {
  var cachedArg;
  var cachedResult;
  return function(arg) {
    if (cachedArg === arg) {
      return cachedResult;
    }
    cachedArg = arg;
    cachedResult = fn(arg);
    return cachedResult;
  };
}

var MemoizedNameBox = memoize(NameBox);

function NameAndAgeBox(user, currentTime) {
  return FancyBox([
    'Name: ',
    MemoizedNameBox(user.firstName + ' ' + user.lastName),
    'Age in milliseconds: ',
    currentTime - user.dateOfBirth
  ]);
}


//UI list
function UserList(users, likesPerUser, updateUserLikes) {
  return users.map(user => FancyNameBox(
    user,
    likesPerUser.get(user.id),
    () => updateUserLikes(user.id, likesPerUser.get(user.id) + 1)
  ));
}

var likesPerUser = new Map();
function updateUserLikes(id, likeCount) {
  likesPerUser.set(id, likeCount);
  rerender();
}

UserList(data.users, likesPerUser, updateUserLikes);

//Continuations
function FancyUserList(users) {
  return FancyBox( //返回带children的对象,children: UserList.bind(null, users), users是第一个参数
    UserList.bind(null, users)
  );
}

const box = FancyUserList(data.users);
const resolvedChildren = box.children(likesPerUser, updateUserLikes); //currying:后两个参数是likesPerUser, updateUserLikes
const resolvedBox = {
  ...box,
  children: resolvedChildren
};



class DOMComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedChildren = [];
    this.node = null;
  }

  getPublicInstance() {
    // For DOM components, only expose the DOM node.
    return this.node;
  }

  mount() {
    var element = this.currentElement;
    var type = element.type;
    var props = element.props;
    var children = props.children || [];
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Create and save the node
    var node = document.createElement(type);
    this.node = node;

    // Set the attributes
    Object.keys(props).forEach(propName => {
      if (propName !== 'children') {
        node.setAttribute(propName, props[propName]);
      }
    });

    // Create and save the contained children.
    // Each of them can be a DOMComponent or a CompositeComponent,
    // depending on whether the element type is a string or a function.
    var renderedChildren = children.map(instantiateComponent);
    this.renderedChildren = renderedChildren;

    // Collect DOM nodes they return on mount
    var childNodes = renderedChildren.map(child => child.mount());
    childNodes.forEach(childNode => node.appendChild(childNode));

    // Return the DOM node as mount result
    return node;
  }
}

/*The main difference after refactoring from mountHost() is that we now keep this.node and
 this.renderedChildren associated with the internal DOM component instance. We will also 
 use them for applying non-destructive updates in the future.
 if a functional <App> component renders a <Button> class component, and Button class renders a <div>, the internal instance tree would look like this:

[object CompositeComponent] {
  currentElement: <App />,
  publicInstance: null,
  renderedComponent: [object CompositeComponent] {
    currentElement: <Button />,
    publicInstance: [object Button],
    renderedComponent: [object DOMComponent] {
      currentElement: <div />,
      node: [object HTMLDivElement],
      renderedChildren: []
    }
  }
}

To complete this refactoring, we will introduce a function that mounts a complete tree into a container node, just like ReactDOM.render(). It returns a public instance, also like ReactDOM.render():
*/
function mountTree(element, containerNode) {
  // Create the top-level internal instance
  var rootComponent = instantiateComponent(element);

  // Mount the top-level component into the container
  var node = rootComponent.mount();
  containerNode.appendChild(node);

  // Return the public instance it provides
  var publicInstance = rootComponent.getPublicInstance();
  return publicInstance;
}

var rootEl = document.getElementById('root');
mountTree(<App />, rootEl);

class CompositeComponent {

  // ...

  unmount() {
    // Call the lifecycle hook if necessary
    var publicInstance = this.publicInstance;
    if (publicInstance) {
      if (publicInstance.componentWillUnmount) {
        publicInstance.componentWillUnmount();
      }
    }

    // Unmount the single rendered component
    var renderedComponent = this.renderedComponent;
    renderedComponent.unmount();
  }
}
//For DOMComponent, unmounting tells each child to unmount:

class DOMComponent {

  // ...

  unmount() {
    // Unmount all the children
    var renderedChildren = this.renderedChildren;
    renderedChildren.forEach(child => child.unmount());
  }
}

/*In practice, unmounting DOM components also removes the event listeners and clears some caches, but we will skip those details.

In the previous section, we implemented unmounting. However React wouldn't be very useful if each prop change unmounted and mounted the whole tree. The goal of the reconciler is to reuse existing instances where possible to preserve the DOM and the state:
*/
var rootEl = document.getElementById('root');

mountTree(<App />, rootEl);
// Should reuse the existing DOM:
mountTree(<App />, rootEl);



//local storage
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hits: null };
  }

  onSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    const cachedHits = localStorage.getItem(value);
    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
      return;
    }

    fetch('https://hn.algolia.com/api/v1/search?query=' + value)
      .then(response => response.json())
      .then(result => this.onSetResult(result, value));
  }

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.hits));
    this.setState({ hits: result.hits });
  }

  render() {
    return (
      <div>
        <h1>Search Hacker News with Local Storage</h1>
        <p>There shouldn't be a second network request, when you search for something twice.</p>

        <form type="submit" onSubmit={this.onSearch}>
          <input type="text" ref={node => this.input = node} />
          <button type="text">Search</button>
        </form>

        {
          this.state.hits &&
          this.state.hits.map(item => <div key={item.objectID}>{item.title}</div>)
        }
      </div>
    );
  }
}

export default App;

//about redux saga going to solve
<Clock 
    onStartClick={dispatch(startTimer())}
/>
<Timer 
    onStopClick={dispatch(showTime())}
/>

//开始计数启动定时，停止计数显示时间
//这两个组件耦合，不能复用
<Clock 
    onStartClick={dispatch(startClicked())}
/>
<Timer 
    onStopClick={dispatch(stopClicked())}
/>


function *connectClockToTimer() {
  while(true) {
    yield take(START_BUTTON_CLICKED)
    put(startTimer())
    yield take(STOP_BUTTON_CLICKED)
    put(stopTimer())
    put(showTimeOnClock())
  }
}

decoupled components

1.Containners and components
2.Group files by feature
3.Isolate Styling
4.Use redux-saga


4.performance

webpack
code splitting
shouldComponentUpdate(nextProps) {
  return this.props !== nextProps  
}

ImmutableJS
cheaply compare object deeply
compare hash

React Router:

<Router /> sets up your routes. Check out routes.js to see how route paths are mapped with application containers.

Path "/" corresponds to container <HomePage />
Path "/features" corresponds to container <FeaturePage />
Path "*" i.e. all other paths correspond to the <NotFoundPage /> (i.e. the 404 page)
These containers, along with their corresponding reducer and sagas, are loaded asynchronously with the help of dynamic import(). Whenever webpack encounters import() in the code, it creates a separate file for those imports. That means for every route, there will be a separate file. And by corollary, only those javascript files will be downloaded by the browser which are required for the current route.

When you navigate to "/", only files related to the Homepage will be downloaded and subsequently executed. This makes your application incredibly lightweight and lightning fast.
The mental model is that a saga is like a separate thread in your application that's solely responsible for side effects. redux-saga is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.













