/*Higher order components
(Component) => EnhancedComponent
(arg1, arg2) => (Component) => EnhancedComponent
Curry & Partial Application
Application: The process of applying a function to its arguments in order to produce a return value
Partial Application: The process of applying a function to some of its arguments.It takes a function with multiple parameters and returns a function with fewer parameters.

Add(x,y) = x + y
Add2 = Partial(Add, 7)

Curry: A function that takes a function with multiple parameters as input and returns a function with exactly on parameter.

f(x,y,x) curried to f: x => (y => （z =>n)))

*/

var isGreaterThan = (limit) => (value) => value > limit

//react-redux

const EnhancedComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Component)

(arg1, arg2) => (Component) => EnchancedComponent

//relay

export default Relay.createContainer(Todo, {
    fragments: {
        todo: () => Relay.QL`
        fragment on Todo {
            complete,
            id,
            text
        }`
    }
})

(Component, arg1) => EnchancedComponent

// Combine simple functions, in return build more complicated once
// function composition

const Commit = ({ sha, message }) => (
    <div>
        <p>{sha}</p>
        <p>{message}</p>
    </div>
)

class CommitContainer extends React.Component {
    state = { commit: null }
    componentDidMount() {
        fetch(`/commits/${this.props.id}`)
            .then(commit => this.setState({ commit }))
    }

    render() {
        const { commit } = this.state
        return <Commit {...this.props} {...commit} />
    }
}


const fetchCommit = (WrappedComponent) => {
    class extends React.Component {
        state = { commit: null }
        componentDidMount() {
            fetch(`/commits/${this.props.id}`)
                .then(commit => this.setState({ commit }))
        }
        render() {
            const { commit } = this.state
            return <WrappedComponent {...this.props} {...commit} />
        }
    }
}

const CommitContainer = fetchCommit(Commit)

const fetchResource = (path) => (WrappedComponent) => (
    class extends React.Component {
        state = { resource: null }
        componentDidMount() {
            path(this.props)
                .then(resource => this.setState( { resource }))
        }

        render() {
            const { resource } = this.state
            return <WrappedComponent {...this.props} {...resource} />
        }
    }
)

const fetchPost = fetchResource(props =>
    fetch(`/commits`${props.id}))
const CommitContainer = fetchPost(Commit)


const fetchGithubOwner = fetchResource(props =>
    fetch(`/owners/${props.id}`)
)

const OwnerContainer = fetchGithubOwner(Owner)

//Props Proxy
const withUser = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            const user = {
                id: `1337`,
                name: `Pacman`
            }
            return (
                <WrappedComponent
                    {...this.props}
                    user={user}
                />
            )
        }
    }
}

//<Props manipulation>

//Inheritance Inversion
//<Render hijacking>

function iiHOC(WrappedComponent) {
    return class Enchancer extends WrappedComponent {
        render() {
            return super.render()
        }
    }
}

function authLocked(WrappedComponent) {
    return class Enchancer extends WrappedComponent {
        render() {
            if(this.props.loggedIn) {
                return super.render()
            } else {
                return null
            }
        }
    }
}

//<State manipulation>

export function debug(WrappedComponent) {
    return class Enchancer extends WrappedComponent {
        render() {
            return (
                <div>
                    <h2>Debugger Component</h2>
                    <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
                    <p>State</p> <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    {super.render()}
                </div>
            )
        }
    }
}

/*What can you do with HoC?
Code reuse
Logic abstraction
//props proxy
Props manipulation
State abstraction
//Inheritance Inversion
Render hijacking
state manipulation



compose
*/
const BaseComponent = (props) => {...}

let EnchancedComponent = firstHoc(BaseComponent)
EnchancedComponent = secondHoc(/*...args*/)(EnchancedComponent)
EnchancedComponent = thirdHoc(/*...args*/)(EnchancedComponent)

const enhance = compose(
    thirdHoc(/*...args*/),
    seconddHoc(/*...args*/),
    firstHoc
)

const EnchancedComponent = enhance(BaseComponent)

function compose(...funcs) {
    if(funcs.length === 0) {
        return arg => arg
    }

    if(funcs.length === 1) {
        return funcs[0]
    }

    const last = funcs[funcs.length - 1]
    return (...args) => {
        let result = last(...args)
        for(let i = funcs.length - 2; i >= 0; i-- ) {
            const f = funcs[i]
            result = f(result)
        }

        return result
    }
}

<<<<<<< HEAD
//recompose is a react utility belt for function components and higher-order components
=======
//single responsibility principle

//a component should have only one reason to change
//isolate uncertainty

//compound components是自身的状态像select/Tab是不需要放到redux state里面的

//we iterate over the children and use cloneElement to change their props


render() {
    const children = React.Children.map(this.props.children,(child)=>{
        if(child.type === TabPannels) {
            //before render dom?
            return React.cloneElement(child, {
                activeIndex: this.state.activeIndex
            })
        } else {
            return child
        }
    })
}


>>>>>>> 258d76378665ac907298762147822636e825c8e8

//Wrapped Functions
//withState withHandlers shouldUpdate withPropsOnChange lifecycle and many more...

//withState

const withCounterState = withState(`couter`, `setCounter`, 0)

const Counter = ({
    counter,
    setCounter
}) => (
    <div>
        Count: {counter}
        <button onClick={() => setCounter(n => n + 1)}>Increment</button>
        <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
    </div>
)

export default compose(
    withCounterState,
)(Counter)

//withHandlers
const withCounterHandler = withHandlers({
    handleCounterUp: ({
        counter,
        setCounter
    }) => () => {
        setCounter(counter + 1)
    },
    handleCounterDown: ({
        counter,
        setCounter
    }) => () => {
        setCounter(counter - 1)
    },
})

//withState & withHandlers

const Counter = ({
    counter,
    handleCounterUp,
    handleCounterDown
}) => (
    <div>
        Count: {counter}
        <button onClick={handleCounterUp}>Increment</button>
        <button onClick={handleCounterDown}>Decrement</button>
    </div>
)

export default compose(
    withCounterState,
    withCounterHandler,
)(Counter)

//shouldUpdate

const withCommitsAmountChanged = shouldUpdate(
    (props, nextProps) => {
        if(
            (props.commitsMax !== nextProps.commitsMax) ||
            (props.someotherProp !== nextProps.someotherProp)        
        ) {
            return true
        }

        return false
    }
)

//Decouple functional -and presentational layers
// fast dev. improves refactoring. more readability

//but expensive to change if abstraction is wrong


/*I’m using an arrow function in the click handler. This means every time render runs, a new function is allocated. In many cases, this isn’t a big deal. But if you have child components, they’ll re-render even when data hasn’t changed because each render allocates a new function.
*/

//So how do you avoid binding and arrow functions in render? Extract a child component. Here, I’ve extracted the list item to UserListItem.js:
//Bottom line: Avoid declaring arrow functions or binding in render for optimal performance. My team uses this ESLint rule to help alert us to this issue.

import React from 'react';
import PropTypes from 'prop-types';

class UserListItem extends React.Component {
  onDeleteClick = () => {
    // No bind needed since we can compose 
    // the relevant data for this item here
    this.props.onClick(this.props.user.id);
  }

  // No arrow func in render! 👍
  render() {
    return (
      <li>
        <input 
          type="button" 
          value="Delete" 
          onClick={this.onDeleteClick} 
        /> 
        {this.props.user.name}
      </li>
    );
  }
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default UserListItem;

//?
// With lazy evaluation
const Post = ({ title, content, comments, showComments }) => {
  const theComments = <Comments comments={comments} />; // only evaluate whe showComments is true 
  return (
    <article>
      <h1>title</h1>
      <div>{content}</div>
      {showComments ? theComments : null}
    </article>
  );
});

// Without lazy evaluation
const Post = ({ title, content, comments, showComments }) => {
  const theComments = Comments({ comments }); // evaluate on every render of post
  return (
    <article>
      <h1>title</h1>
      <div>{content}</div>
      {showComments ? theComments : null}
    </article>
  );
});

//So why does Recompose break this rule? Because it's a utility library, not an application. Just as it's okay for lodash to use for-loops as an implementation detail of its helper functions, it should be okay for Recompose to eschew intermediate React elements as a (temporary) performance optimization.


...optimize rendering performance

No need to write a new class just to implement shouldComponentUpdate(). Recompose helpers like pure() and onlyUpdateForKeys() do this for you:

// A component that is expensive to render
const ExpensiveComponent = ({ propA, propB }) => {...}

// Optimized version of same component, using shallow comparison of props
// Same effect as React's PureRenderMixin
const OptimizedComponent = pure(ExpensiveComponent)

// Even more optimized: only updates if specific prop keys have changed
const HyperOptimizedComponent = onlyUpdateForKeys(['propA', 'propB'])(ExpensiveComponent)


import toClass from 'recompose/toClass'
// Converts a function component to a class component, e.g. so it can be given
// a ref. Returns class components as is.
const ClassComponent = toClass(FunctionComponent)

var FLASH_CLSID = "{d27cdb6e-ae6d-11cf-96b8-444553540000}",
Composition

Recompose helpers are designed to be composable:

const BaseComponent = props => {...}

// This will work, but it's tedious
let EnhancedComponent = pure(BaseComponent)
EnhancedComponent = mapProps(/*...args*/)(EnhancedComponent)
EnhancedComponent = withState(/*...args*/)(EnhancedComponent)

// Do this instead
// Note that the order has reversed — props flow from top to bottom
const enhance = compose(
  withState(/*...args*/),
  mapProps(/*...args*/),
  pure
)
const EnhancedComponent = enhance(BaseComponent)

Technically, this also means you can use them as decorators (if that's your thing):

@withState(/*...args*/)
@mapProps(/*...args*/)
@pure
class Component extends React.Component {...}

//write HOCs from scratch
const { Component } = React;

const overrideProps = (overrideProps) => (BaseComponent) => (props) =>
  <BaseComponent {...props} {...overrideProps} />;

const alwaysBob = overrideProps({ name: 'Bob' });

const neverRender = (BaseComponent) =>
  class extends Component {
    shouldComponentUpdate() {
      return false;
    }
    render() {
      return <BaseComponent {...this.props} />;
    }
  };

const User = ({ name }) =>
  <div className="User">{ name }</div>;

const User2 = alwaysBob(User);
const User3 = neverRender(User);

const App = () =>
  <div>
    <User name="Tim" />
    <User2 name="Joe" />
    <User3 name="Steve" />
  </div>;


/*
TITLE: Compose Multiple Higher Order Components Together using Recompose

DESCRIPTION: Learn how to use the 'compose' function to mix together
higher-order components, even ones from other libraries like 'connect'
from redux.
*/
const { Component } = React;
const { compose, setDisplayName, setPropTypes } = Recompose;
const { connect } = Redux();

const enhance = compose(
  setDisplayName('User'),
  setPropTypes({
    name: React.PropTypes.string.isRequired,
    status: React.PropTypes.string
  }),
  connect()
);

const User = enhance(({ name, status, dispatch }) =>
  <div className="User" onClick={
      () => dispatch({ type: "USER_SELECTED" })
    }>
    { name }: { status }
  </div>
);

console.log(User.displayName);

ReactDOM.render(
  <User name="Tim" status="active" />,
  document.getElementById('main')
);










// fake implementation of redux

function Redux() {
  return {
    connect: () => (BaseComponent) => (props) =>
      <BaseComponent
        {...props}
        dispatch={ ({ type }) => console.log(type + ' dispatched') }
      />
  }
}


/*
TITLE:
Add Local State to a Functional Stateless Component using Recompose

DESCRIPTION:
Learn how to use the 'withState' and 'withHandlers' higher order
components to easily add local state to your functional stateless
components. No need for classes!
*/
const { Component } = React;
const { compose, withState, withHandlers } = Recompose;

const withToggle = compose(
  withState('toggledOn', 'toggle', false),
  withHandlers({
    show: ({ toggle }) => (e) => toggle(true),
    hide: ({ toggle }) => (e) => toggle(false),
    toggle: ({ toggle }) => (e) => toggle((current) => !current)
  })
)

const StatusList = () =>
  <div className="StatusList">
    <div>pending</div>
    <div>inactive</div>
    <div>active</div>
  </div>;

const Status = withToggle(({ status, toggledOn, toggle }) =>
  <span onClick={ toggle }>
    { status }
    { toggledOn && <StatusList /> }
  </span>
);

const Tooltip = withToggle(({ text, children, toggledOn, show, hide }) =>
  <span>
    { toggledOn && <div className="Tooltip">{ text }</div> }
    <span onMouseEnter={ show } onMouseLeave={ hide }>{ children }</span>
  </span>
);

const User = ({ name, status }) =>
  <div className="User">
    <Tooltip text="Cool Dude!">{ name }</Tooltip>—
    <Status status={ status } />
  </div>;

const App = () =>
  <div>
    <User name="Tim" status="active" />
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);


// fp
function foo(x,y = 2) {
    // ..
}

function bar(x,...args) {
    // ..
}

function baz( {a,b} ) {
    // ..
}

foo.length;             // 1
bar.length;             // 1
baz.length;             // 1


//插入一个引用类型分析

// 超级飞人埋点

/** 背景
 * 超飞展示量、展示率、各页面转化率
 * 列表页超飞航班数量
 * 弹框弹出量，及用户点击“重新选择航班”和“同意并预订”的量
 */


/**
 * key: flt_oversea_search_result_online_basic (之前有)
 * 埋点参数：pageGlobal.NewUbt里面
 * @IsSuperFlight: 1/0
 * 
 * key: flt_oversea_float_click 列表页弹框点击埋点
 * @SuperFloat
 * @SuperConfirm
 * @SuperReSearch
 */

//推荐类型常量
var IS_SUPER_FLIGHT = 'IsSuperFlight',
    FLT_OVERSEA_FLOAT_CLICK_KEY = 'flt_oversea_float_click', 
    superFlyerLocalUbt = [];


var SuperFlyerUbt = {
    currentUbt: {},
    // 有超飞航班
    hasSuperFlyerUbt: function() {
        if(pageGlobal.NewUbt[IS_SUPER_FLIGHT] === 1)
            return;
        pageGlobal.NewUbt[IS_SUPER_FLIGHT] = 1;
    },

    check: function(prop, defaultVal) {
        pageGlobal.NewUbt[prop] = pageGlobal.NewUbt[prop] || defaultVal;
    },

    set: function(prop, val) {
        this.currentUbt[prop] = val;
    },

    popBox: function() {
        this.currentUbt = {} // 这个会重新赋值引用，打断原有的引用了
        this.set('SuperFloat', 1)
        superFlyerLocalUbt.push(this.currentUbt) // push的是引用
    },

    clear: function(prop) {
        if(this.currentUbt[prop])
            delete this.currentUbt[prop]
    },

    book: function() {
        this.clear('SuperReSearch')
        this.set('SuperConfirm', 1)
        this.currentUbt = {} // 这个会重新赋值引用，打断原有的引用了 所以上面push是可行的
    },
    
    back: function() {
        this.clear('SuperConfirm')
        this.set('SuperReSearch', 1)
        this.currentUbt = {} // 这个会重新赋值引用，打断原有的引用了
    },

    canReport: function() {
        return superFlyerLocalUbt.length >= 1
    }

};
