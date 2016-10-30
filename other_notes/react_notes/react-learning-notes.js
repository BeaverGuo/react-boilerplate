/*
1.React official tutorial

Operating on the DOM nodes may also be tricky because the wrapper component has no way to know when the child’s state updates. You can solve this by providing a callback ref (new in React 0.13) as one of the props to the composed component. It can then use ref={this.props.someRef} to notify the higher-order component about attaching and detaching a particular DOM node. The higher-order component can then use React.findDOMNode to work with that node.
get rid of react mixin?

The idea is to have every mixin call super() to allow predictable chaining.

The mixin(...mixins) function would essentially create a new prototype chain with each mixin's set of functions stacked on top of each other in order. An object is treated as a prototype. A function is treated as a class/constructor and gets all their static methods + their prototype merged.

Idiomatic React reusable code should primarily be implemented in terms of composition and not inheritance.


Learning React by copying biolerplates is like learning to cook by eating food in fancy restaurants.It doesn't work.You need to start with basics and ignore the fear of missing out.It's unfounded.People create boilerplates to show off what they built or learned,not help you learn.
https://github.com/petehunt/react-howto
所有的软件都是建立在某个技术栈之上的, 你需要对整个技术栈有足够深入的理解, 才能建造你的应用. 为什么 React 生态圈的工具似乎总让人感觉压力山大呢, 因为它总是以错误的顺序被解释:
许多人一坐下来刚开始构建应用, 就认为需要用 Flux 来定义他们的数据模型. 这样采用 Flux 是不对的, Flux 应该在大量组件被建立完成以后才被引入.

React 组件之间存在层级关系. 在很多时候, 你的数据模型也跟随这种层级. 这种情况下, Flux 不会给你很大帮助. 但有些时候, 你的数据模型没有层次, 当你的 React 组件开始接受没有关联的 props 的时候, 或者当小部分组件开始变得复杂的时候, 你才可能需要看看 Flux.

你会知道什么时候需要用 Flux. 如果你不确定是否需要用它, 你就不需要它.
Immutable.js 提供了一系列的数据结构, 以帮助解决构造 React 应用时的某些性能问题. 这是一个很棒的库, 你可能会在应用发展的过程里大量用到它, 但直到你在意识到性能问题以前, 它是完全不必要的.
这些技术可以帮你减少 AJAX 请求数, 它们仍然是非常前沿的, 所以如果你没有遇到过多 AJAX 请求的问题, 就不需要用到 Relay 或者 Falcor.

Thinking in React
Since you're often displaying a JSON data model to a user, you'll find that if your model was built correctly, your UI (and therefore your component structure) will map nicely. That's because UI and data models tend to adhere to the same information architecture, which means the work of separating your UI into components is often trivial. Just break it up into components that represent exactly one piece of your data model.
步骤是:
划分组件,每个表示单一功能,如果某个组件end up growing,则需要再细分
列出组件间层级关系
To build a static version of your app that renders your data model, you'll want to build components that reuse other components and pass data using props. props are a way of passing data from parent to child. If you're familiar with the concept of state, don't use state at all to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don't need it.

DRY原则:
To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is DRY: Don't Repeat Yourself. Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you're building a TODO list, just keep an array of the TODO items around; don't keep a separate state variable for the count. Instead, when you want to render the TODO count, simply take the length of the TODO items array.
如果你创建的并非单页面应用, 请不要使用路由. 














2.webpack tutorial:
它和browserify类似 但是它可以把你的应用拆分成多个文件。如果你的单页应用里有很多页面，用户只会下载当前访问页面的代码。当他们访问应用中的其他页面时，不再需要加载与之前页面重复的通用代码。
它可以替代gulp和grunt 因为他可以构建打包css、预处理css、编译js和图片等。
如何调用webpack?

选择一个目录下有webpack.config.js文件的文件夹，然后运行下面的命令:

webpack 开发环境下编译
webpack -p 产品编译及压缩
webpack --watch 开发环境下持续的监听文件变动来进行编译(非常快!)
webpack -d 引入 source maps
你也要看下babel-loader的介绍，它会作为一个开发环境下的依赖加载到我们的项目中(run npm install babel-core babel-preset-es2015 babel-preset-react)

// webpack.config.js
module.exports = {
  entry: './main.js', // 入口文件
  output: {
    filename: 'bundle.js' // 打包输出的文件
  },
  module: {
    loaders: [
      {
        test: /\.coffee$/,  // test 去判断是否为.coffee的文件,是的话就是进行coffee编译
        loader: 'coffee-loader'
      },
      {
        test: /\.js$/, // test 去判断是否为.js,是的话就是进行es6和jsx的编译
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
如果你希望在require文件时省略文件的扩展名，只需要在webpack.config.js中添加 resolve.extensions 来配置。

// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee']
  }
};
Css样式和图片的加载

首先你需要用require()去加载你的静态资源(named as they would with node's require()):

require('./bootstrap.css');
require('./myapp.less');

var img = document.createElement('img');
img.src = require('./glyph.png');
但是这需要你在webpack.config.js做相应的配置(这里还是使用loaders)

// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    path: './build', // 图片和js会放在这
    publicPath: 'http://mycdn.com/', // 这里用来生成图片的地址
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // 用!去链式调用loader
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // 内联的base64的图片地址，图片要小于8k，直接的url的地址则不解析
    ]
  }
};

项目中有些代码我们只为在开发环境（例如日志）或者是内部测试环境（例如那些没有发布的新功能）中使用，那就需要引入下面这些魔法全局变量（magic globals）：

if (__DEV__) {
  console.warn('Extra logging');
}
// ...
if (__PRERELEASE__) {
  showSecretFeature();
}
同时还要在webpack.config.js中配置这些变量，使得webpack能够识别他们。

// webpack.config.js

// definePlugin 会把定义的string 变量插入到Js代码中。
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [definePlugin]
};

配置完成后，就可以使用 BUILD_DEV=1 BUILD_PRERELEASE=1 webpack来打包代码了。 值得注意的是，webpack -p 会删除所有无作用代码，也就是说那些包裹在这些全局变量下的代码块都会被删除，这样就能保证这些代码不会因发布上线而泄露。
如果你有两个页面：profile和feed。如果你希望用户访问profile页面时不加载feed页面的代码，那就需要生成多个bundles文件：为每个页面创建自己的“main module”（入口文件）。

// webpack.config.js
module.exports = {
  entry: {
    Profile: './profile.js',
    Feed: './feed.js'
  },
  output: {
    path: 'build',
    filename: '[name].js' // name是基于上边entry中定义的key
  }
};
在profile页面中插入<script src="build/Profile.js"></script>。feed也一样。
Feed和Profile页面存在大量通用代码(比如React、公共的样式和组件等等)。webpack可以抽离页面间公共的代码，生成一个公共的bundle文件，供这两个页面缓存使用:

// webpack.config.js

var webpack = require('webpack');

var commonsPlugin =
  new webpack.optimize.CommonsChunkPlugin('common.js'); // 引入插件

module.exports = {
  entry: {
    Profile: './profile.js',
    Feed: './feed.js'
  },
  output: {
    path: 'build',
    filename: '[name].js' // 为上面entry的key值
  },
  plugins: [commonsPlugin]
};
在上一步引入自己的bundle之前引入<script src="build/common.js"></script>
虽然CommonJS是同步加载的，但是webpack也提供了异步加载的方式。这对于单页应用中使用的客户端路由非常有用。当真正路由到了某个页面的时候，它的代码才会被加载下来。

指定你要异步加载的 拆分点。看下面的例子

if (window.location.pathname === '/feed') {
  showLoadingState();
  require.ensure([], function() { // 这个语法痕奇怪，但是还是可以起作用的
    hideLoadingState();
    require('./feed').show(); // 当这个函数被调用的时候，此模块是一定已经被同步加载下来了
  });
} else if (window.location.pathname === '/profile') {
  showLoadingState();
  require.ensure([], function() {
    hideLoadingState();
    require('./profile').show();
  });
}
剩下的事就可以交给webpack，它会为你生成并加载这些额外的 chunk 文件。

webpack 默认会从项目的根目录下引入这些chunk文件。你也可以通过 output.publicPath来配置chunk文件的引入路径

// webpack.config.js
output: {
    path: "/home/proj/public/assets", // webpack的build路径
    publicPath: "/assets/" // 你require的路径
}


3.Redux:
Redux offers a tradeoff. It asks you to:
Describe application state as plain objects and arrays.
Describe changes in the system as plain objects.
Describe the logic for handling changes as pure functions.

These limitations are appealing to me because they help build apps that:
Persist state to a local storage and then boot up from it, out of the box.
Pre-fill state on the server, send it to the client in HTML, and boot up from it, out of the box.
Serialize user actions and attach them, together with a state snapshot, to automated bug reports, so that the product developers can replay them to reproduce the errors.
Pass action objects over the network to implement collaborative environments without dramatic changes to how the code is written.
Maintain an undo history or implement optimistic mutations without dramatic changes to how the code is written.
Travel between the state history in development, and re-evaluate the current state from the action history when the code changes, a la TDD.
Provide full inspection and control capabilities to the development tooling so that product developers can build custom tools for their apps.
Provide alternative UIs while reusing most of the business logic.


Finally, don’t forget that you can apply ideas from Redux without using Redux.
But if you trade something off, make sure you get something in return.
*/
import React, { Component } from 'react';

const counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

class Counter extends Component {
  state = counter(undefined, {});
  
  dispatch(action) {
    this.setState(prevState => counter(prevState, action));
  }

  increment = () => {
    this.dispatch({ type: 'INCREMENT' });
  };

  decrement = () => {
    this.dispatch({ type: 'DECREMENT' });
  };
  
  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}

/*I think we’re in a weird transitional period where the widespread usage of classes is a necessary evil because they are limiting. They are certainly better than learning a new ad-hoc class system that comes with every framework, each with its own way of multiple inheritance in form of mixins.

So What About React Components?
I hope that the rules above show why this is a terrible idea:
import { Component } from 'react';
class BaseButton extends Component {
  componentDidMount() {
    console.log('hey');
  }
  render() {
    return <button>{this.getContent()}</button>;
  }
}
class RedButton extends BaseButton {
  componentDidMount() {
    super.componentDidMount();
    console.log('ho');
  }
  getContent() {
    return 'I am red';
  }
  render() {
    return (
      <div className='red'>
        {super.render()}
      </div>
    );
  }
}
However I say that the code below is just fine.
import { Component } from 'react';
class Button extends Component {
  componentDidMount() {
    console.log('hey');
  }
  render() {
    return (
      <div className={this.props.color}>
        <button>{this.props.children}</button>
      </div>
    );
  }
}
class RedButton extends Component {
  componentDidMount() {
    console.log('ho');
  }
  render() {
    return (
      <Button color='red'>
        I am red
      </Button>
    );
  }
}
Yes, we used the dreaded class keyword but we didn’t create a hierarchy, as we always extended Component. And you can write lint rules for that, if you wish so. There is no need to jump through the hoops just to avoid using the class keyword in the code above. It’s not a real issue.
When you want to supply a component with some additional functionality in a generic way, higher order components cover pretty much every use case I have encountered so far. Technically they are just higher order functions.
After discovering higher order components, I haven’t felt the need for either createClass()-style mixins, proposed-for-ES7 mixins, “stamp composition”, or any other composition solution. This is another argument in favor of just using class — because you don’t realistically need anything “more powerful”.
As of React 0.14 you can write the components as pure functions. This is totally worth doing. Any time you can write a function instead of a class, do.
However, when you need the lifecycle hooks or state, until React settles on some purely functional solution, I see no harm in using classes given that you don’t break the rules above. In fact it will be easier to migrate from ES6 classes to a purely functional approach than from anything else.
I am thus concerned about using “compositional solutions” that don’t directly harness React’s composition model, as in my view it’s a step back and conceptually is closer to mixins that don’t make sense in the functional paradigm.
So what are my recommendations for React components?
You can use class in your JS if you don’t inherit twice and don’t use super.
Prefer to write React components as pure functions when possible.
Use ES6 classes for components if you need the state or lifecycle hooks.
In this case, you may only extend React.Component directly.
Give your feedback to the React team on the functional state proposals.

notes from below:
https://medium.com/@dan_abramov
http://jlongster.com/

every day when you lie on the bed think about the work you've done and figure out how you can finish it more easily in shortest time and being smarter at your work! Think outside the box and keep doing this at a different point of view.

moment when you need refactoring:
1)High amount of churn
2)Severe architectural limitations
3)Too many things to fix(code,design,etc)

Load Performance:
1)# of HTTP requests
2)# of bytes downloaded
*/

/*
Many people get confused by the difference between components, their instances, and elements in React. Why are there three different terms to refer to something that is painted on screen?
If you’re new to React, you probably only worked with component classes and instances before. For example, you may declare a Button component by creating a class. When the program is running, you may have several instances of this component on screen, each with its own properties and local state. This is the traditional object oriented UI programming. Why introduce elements?
In this traditional UI model, it is up to you take care of creating and destroying child component instances. If a Form component wants to render a Button component, it needs to create its instance, and manually keep it up to date with any new information.
*/
class Form extends TraditionalObjectOrientedView {
  render() {
    // Read some data passed to the view
    const { isSubmitted, buttonText } = this.attrs;
    if (!isSubmitted && !this.button) {
      // Form is not yet submitted. Create the button!
      this.button = new Button({
        children: buttonText,
        color: 'blue'
      });
      this.el.appendChild(this.button.el);
    }
    if (this.button) {
      // The button is visible. Update its text!
      this.button.attrs.children = buttonText;
      this.button.render();
    }
    if (isSubmitted && this.button) {
      // Form was submitted. Destroy the button!
      this.el.removeChild(this.button.el);
      this.button.destroy();
    }
    if (isSubmitted && !this.message) {
      // Form was submitted. Show the success message!
      this.message = new Message({ text: 'Success!' });
      this.el.appendChild(this.message.el);
    }
  }
}
/*
This is pseudocode, but this is more or less what you end up with when you try to write composable UI that behaves consistently in an object oriented way with a framework like Backbone.
Each component has to keep references to its DOM node and to the instances of the children components, and create, update, and destroy them when the time is right. The lines of code grow as the square of the number of possible states of the component, and the parents have direct access to their children component instances, making it hard to decouple them in the future.
Now let’s talk about React.
In React, this is where the elements come to rescue. An element is a plain object describing a component instance or DOM node and its desired properties. It contains only information about the component type (for example, a Button), its properties (for example, its color), and any child elements inside it.
An element is not an actual instance. Rather, it is a way to tell React what you want to see on the screen. You can’t call any methods on the element. It’s just an immutable description object with two fields: type: (string | Component) and props: Object.*
When the element’s type is a string, an element represents a DOM node with that tag name, and props correspond to its attributes. This is what React will render. For example:
*/
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      children: 'OK!'
    }
  }
}
//Such an element is just a way to represent this HTML as a plain object:
<button class='button button-blue'>
  <b>
    OK!
  </b>
</button>
/*Note how the elements can be nested. By convention, when we want to create an element tree, we specify one or more child elements as the children prop of their containing element.
What’s important is that both child and parent elements are just descriptions and not actual instances. They don’t refer to anything on the screen when you create them. You can create them and throw them away, and it won’t matter much.
React Elements are easy to traverse, don’t need to be parsed, and of course are much lighter than the actual DOM elements—they’re just objects!
However, the type of an element can also be a function or class corresponding to a React component:
*/
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}
/*
This is the core idea of React.
An element describing a component is also an element, just like an element describing the DOM node. They can be nested and mixed with each other.
This feature lets you define a DangerButton component as a Button with a specific color property value without worrying about whether Button renders to a button, a div, or something else entirely.
*/
const DangerButton = ({ children }) => ({
  type: Button,
  props: {
    color: 'red',
    children: children
  }
});
//You can mix and match them later:
const DeleteAccount = () => ({
  type: 'div',
  props: {
    children: [{
      type: 'p',
      props: {
        children: 'Are you sure?'
      }
    }, {
      type: DangerButton,
      props: {
        children: 'Yep'
      }
    }, {
      type: Button,
      props: {
        color: 'blue',
        children: 'Cancel'
      }
   }]
});
//Or, if you prefer JSX:
const DeleteAccount = () => (
  <div>
    <p>Are you sure?</p>
    <DangerButton>Yep</DangerButton>
    <Button color='blue'>Cancel</Button>
  </div>
);
/*This keeps components decoupled from each other, as they can express both is-a and has-a relationships exclusively through composition.
When React sees an element with a function or class type, it will know to ask that component what element it renders to with the given props.
When it sees
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}
React will ask Button what it renders to, and it will get
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      children: 'OK!'
    }
  }
}
React will repeat this process until it knows the underlying DOM tag elements for every component on the page.
React is like a child asking “what is Y” for every “X is Y” you explain to them until they figure out every little thing in the world.
Remember the Form example above? It can be written in React as follows*:
*/
const Form = ({ isSubmitted, buttonText }) => {
  if (isSubmitted) {
    // Form submitted! Return a message element.
    return {
      type: Message,
      props: {
        text: 'Success!'
      }
    };
  }
  // Form still visible! Return a button element.
  return {
    type: Button,
    props: {
      children: buttonText,
      color: 'blue'
    }
  };
};
/*
That’s it! For a React component, props are the input, and an element tree is the output.
The returned element tree can contain both elements describing DOM nodes, and elements describing other components. This lets you compose independent parts of UI without relying on their internal DOM structure.
We let React create, update, and destroy instances. We describe them with elements we return from the components, and React takes care of managing the instances.
In the code above, Form, Message, and Button are React components. They can either be written as functions, as above, or as classes descending from React.Component:
class Button extends React.Component {
  render() {
    const { children, color } = this.props;
    // Return an element describing a
    // <button><b>{children}</b></button>
    return {
      type: 'button',
      props: {
        className: 'button button-' + color,
        children: {
          type: 'b',
          props: {
            children: children
          }
        }
      }
    };
  }
}
When a component is defined as a class, it is a little more powerful than a functional component. It can store some local state and perform custom logic when the corresponding DOM node is created or destroyed. A functional component is less powerful but is simpler, and it acts like a class component with just a single render() method.
However, whether functions or classes, fundamentally they are all components to React. They take the props as their input, and return the elements as their output.
When you call
ReactDOM.render({
  type: Form,
  props: {
    isSubmitted: false,
    buttonText: 'OK!'
  }
}, document.getElementById('root'));
React will ask the Form component what element tree it returns, given those props. It will gradually “refine” its understanding of your component tree in terms of simpler primitives:
// React: You told me this...
{
  type: Form,
  props: {
    isSubmitted: false,
    buttonText: 'OK!'
  }
}
// React: ...And Form told me this...
{
  type: Button,
  props: {
    children: 'OK!',
    color: 'blue'
  }
}
// React: ...and Button told me this! I guess I'm done.
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
At the end of this process React knows the result DOM tree, and a renderer like ReactDOM or React Native applies the minimal set of changes necessary to update the actual DOM nodes.
This gradual refining process is also the reason React apps are easy to optimize. If some parts of your component tree become too large for React to visit efficiently, you can tell it to skip this “refining” and diffing certain parts of the tree if the relevant props have not changed. It is very fast to calculate whether the props have changed if they are immutable, so React and immutability work great together, and can provide great optimizations with the minimal effort.
You might have noticed that I have talked a lot about components and elements, and not so much about the instances. The truth is, instances have much less importance in React than in most object oriented UI frameworks.
Only components declared as classes have instances, and you never create them directly: React does that for you. While there are mechanisms for a parent component instance to access a child component instance, they are only used for imperative actions (such as setting focus on a field), and should generally be avoided.
React will take care of creating an instance for every class component, so that you can write components in an object oriented way with methods and local state, but other than that, instances are not very important in the React’s programming model, and are managed by React itself.
Recap
An element is a plain object describing what you want to appear on the screen in terms of the DOM nodes or other components. Elements can contain other elements in their props.
A component can be two things. It can be a class with a render() method that inherits from React.Component . Or it can be a function. In both cases, it takes props as an input, and returns an element tree as the output.
When a component receives some props as an input, it is because a parent component returned an element with its type and these props. This is why people say that the props flows one way in React: from parents to children.
An instance is what you refer to as this in the component class you write. It is useful for storing local state and reacting to the lifecycle events.
Functional components don’t have instances at all. Class components have instances, but you never need to create a component instance directly—React takes care of this.
Finally, to create elements, use React.createElement(), JSX, or an element factory helper. I discourage you from writing them as plain objects in the real code—just know that they are plain objects under the hood.

There is a growing sentiment in the JavaScript community that ES6 classes are not awesome:
Classes obscure the prototypal inheritance at the core of JS.
Classes encourage inheritance but you should prefer composition.
Classes tend to lock you into the first bad design you came up with.
I think it’s great that the JavaScript community is paying attention to the problems caused by the use of classes and inheritance, but I’m worried that the beginners are confused as classes are both “bad” and were just added to the language. Even more confusingly, some libraries, notably React, use ES6 classes all over its documentation. Is React intentionally following “bad practices”?
I think we’re in a weird transitional period where the widespread usage of classes is a necessary evil because they are limiting. They are certainly better than learning a new ad-hoc class system that comes with every framework, each with its own way of multiple inheritance in form of mixins.
If you like functional programming, you might see how transitioning from proprietary class systems to the “stripped down” ES6 classes (no mixins, no autobinding, etc) moves us a step closer towards the functional solutions.
In the meantime, here is how to use classes and sleep at night:
Resist making classes your public API. (Of course exporting React components is an exception as they aren’t used directly.) You can always hide your classes behind the factory functions. If you expose them, people will inherit from them in all sorts of ways that make zero sense to you, but that you may break in the future. Avoiding breaking people’s classes is hard because they might use the method names you want to use in the future versions, they might read your private state, they might put their own state onto your instances, and they might override your methods without calling super which may work for a while if they’re lucky but break later. That said, when there isn’t back-and-forth interaction between the base class and the user’s derived classes, such as in case of React components, exposing a base class may very well be a valid API choice.
Don’t inherit more than once. Inheritance can be handy as a shortcut, and inheriting once is um-kay, but don’t go deeper. The problem with inheritance is that the descendants have too much access to the implementation details of every base class in the hierarchy, and vice versa. When the requirements change, refactoring a class hierarchy is so hard that it turns into a WTF sandwich with traces of outdated requirements. Instead of creating a class hierarchy, consider creating several factory functions. They may call each other in chain, tweaking the behavior of each other. You may also teach the “base” factory function to accept a “strategy” object modulating the behavior, and have the other factory functions provide it. Regardless of the approach you choose, the important part is to keep inputs and outputs explicit at every step. “You need to override a method” is not an explicit API and is hard to design well, but “you need to provide a function as an argument” is explicit and helps you think it through.
Don’t make super calls from methods. If you override a method in a derived class, override it completely. Tracing a sequence super calls is like following a series of notes hidden around the world by a movie villain. It’s only fun when you watch someone else doing it. What if you really need to transform the result of the super method, or perform it before or after doing something else? See the previous point: turn your classes into the factory functions and keep the relationships between them very explicit. When your only tools are parameters and return values, it’s easier to discover the right balance of responsibilities. The intermediate functions can have different (and more fine-grained) interfaces than the “top-level” and “bottom-level” functions. Classes don’t easily provide such mechanisms because you can’t designate a method “for the use of base class only” or “for the use of derived class only”, but functional composition makes it natural.
Don’t expect people to use your classes. Even if you choose to provide your classes as a public API, prefer duck typing when accepting inputs. Instead of instanceof checks, assert the existence of the methods you plan to use, and trust the user to do the right thing. This will make userland extensions and later tweaks easier, as well as eliminate the issues with iframes and different JavaScript execution contexts.
Learn functional programming. It will help you not think in classes, so you won’t be compelled to use them even though you know their pitfalls.
So What About React Components?
I hope that the rules above show why this is a terrible idea:
import { Component } from 'react';
class BaseButton extends Component {
  componentDidMount() {
    console.log('hey');
  }
  render() {
    return <button>{this.getContent()}</button>;
  }
}
class RedButton extends BaseButton {
  componentDidMount() {
    super.componentDidMount();
    console.log('ho');
  }
  getContent() {
    return 'I am red';
  }
  render() {
    return (
      <div className='red'>
        {super.render()}
      </div>
    );
  }
}
However I say that the code below is just fine.
import { Component } from 'react';
class Button extends Component {
  componentDidMount() {
    console.log('hey');
  }
  render() {
    return (
      <div className={this.props.color}>
        <button>{this.props.children}</button>
      </div>
    );
  }
}
class RedButton extends Component {
  componentDidMount() {
    console.log('ho');
  }
  render() {
    return (
      <Button color='red'>
        I am red
      </Button>
    );
  }
}
Yes, we used the dreaded class keyword but we didn’t create a hierarchy, as we always extended Component. And you can write lint rules for that, if you wish so. There is no need to jump through the hoops just to avoid using the class keyword in the code above. It’s not a real issue.
When you want to supply a component with some additional functionality in a generic way, higher order components cover pretty much every use case I have encountered so far. Technically they are just higher order functions.
After discovering higher order components, I haven’t felt the need for either createClass()-style mixins, proposed-for-ES7 mixins, “stamp composition”, or any other composition solution. This is another argument in favor of just using class — because you don’t realistically need anything “more powerful”.
As of React 0.14 you can write the components as pure functions. This is totally worth doing. Any time you can write a function instead of a class, do.
However, when you need the lifecycle hooks or state, until React settles on some purely functional solution, I see no harm in using classes given that you don’t break the rules above. In fact it will be easier to migrate from ES6 classes to a purely functional approach than from anything else.
I am thus concerned about using “compositional solutions” that don’t directly harness React’s composition model, as in my view it’s a step back and conceptually is closer to mixins that don’t make sense in the functional paradigm.
So what are my recommendations for React components?
You can use class in your JS if you don’t inherit twice and don’t use super.
Prefer to write React components as pure functions when possible.
Use ES6 classes for components if you need the state or lifecycle hooks.
In this case, you may only extend React.Component directly.
Give your feedback to the React team on the functional state proposals.

Inventing on  principle:
Creators need immediately connection to what they create.If you make a change/descision,see the change immediately.这样能产生更多的ideas,try ideas as you think of them.
Larry's principle:nomodes
Insight.try many things and gain experiences.

my twitter account:
lalabeaver21@gmail.com


1)container component pattern.
Re-renders
shouldComponentUpdate(){
    return false;
}
PureRender mixin
var PureRenderMixin =  React.addons.PureRenderMixin;
React.createClass({
    mixins:[PureRenderMixin],
});

Data comparability
shallow comparision,super fast 但是复杂情况下并不好比较或者不可能比较,如2个函数
shouldComponentUpdate(nextProps, nextState) {
    return (
        !shallowEqual(this.props, nextProps) ||
        !shallowEqual(this.state, nextState)
    );
}

loosely coupled
component hierarchy
<OuterScroller scrollTop={props.offsetTop}>
    <InnerTable width="123" style="blue" />
</OuterScroller>

childern create deep update trees.
children change over time.
children are expensive.
var Parent = React.createClass({
    shouldComponentUpdate(nextProps){
        return this.props.children !== nextProps.children;
    },
    render(){
        return <section>{this.props.children}</section>;
    }
});

setInterval(()=>React.render(
    <Parent>
        <div>child</div>
    </Parent>,
    document.body
),1);

Independent children

var StaticTwoColumnSplit = React.createClass({
    shouldComponentUpdate(nextProps){
        return false;
    },
    render(){
        return (
            <div>
                <FloatLeft>{this.props.children[0]}</FloatLeft>
                <FloatRight>{this.props.children[1]}</FloatRight>
            </div>
        );
    }
});

<AdsApp width={props.width}>
    <Header />
    <StaticTwoColumnSplit>
        <TargetingContainer />
        <BudgetWidgetContainer />
    </StaticTwoColumnSplit>
</AdsApp>

Containers vs. components
<BudgetWidgetContainer />  <----->  <BudgetWidget value={...} />
    talks to stores                  renders markup可复用
这样的话可以将parent和children解耦,使用childless containers直接从store获取数据,从而避免整个tree rerendering
A container does data fetching and then renders its corresponding sub-component. That’s it.
Why containers?
Say you have a component that displays comments. You didn’t know about container components. So, you put everything in one place:
// CommentList.js
class CommentList extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  componentDidMount() {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this)
    });
  }
  render() {
    return <ul> {this.state.comments.map(renderComment)} </ul>;
  }
  renderComment({body, author}) {
    return <li>{body}—{author}</li>;
  }
}
Your component is responsible for both fetching data and presenting it. There’s nothing “wrong” with this but you miss out on a few benefits of React.
Reusability
CommentList can’t be reused unless under the exact same circumstances.
Data structure
Your markup components should state expectations of the data they require. PropTypes are great for this.
Our component is opinionated about data structure but has no way of expressing those opinions. This component will break silently if the json endpoint change.
First, lets pull out data-fetching into a container component.
// CommentListContainer.js
class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  componentDidMount() {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this)
    });
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
Now, let’s rework CommentList to take comments as a prop.
// CommentList.js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return <ul> {this.props.comments.map(renderComment)} </ul>;
  }
  renderComment({body, author}) {
    return <li>{body}—{author}</li>;
  }
}

We’ve separated our data-fetching and rendering concerns.
We’ve made our CommentList component reusable.
We’ve given CommentList the ability to set PropTypes and fail loudly.

My presentational components:
Are concerned with how things look.
May contain both presentational and container components** inside, and usually have some DOM markup and styles of their own.
Often allow containment via this.props.children.
Have no dependencies on the rest of the app, such as Flux actions or stores.
Don’t specify how the data is loaded or mutated.
Receive data and callbacks exclusively via props.
Rarely have their own state (when they do, it’s UI state rather than data).
Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.
Examples: Page, Sidebar, Story, UserInfo, List.

My container components:
Are concerned with how things work.
May contain both presentational and container components** inside but usually don’t have any DOM markup of their own except for some wrapping divs, and never have any styles.
Provide the data and behavior to presentational or other container components.
Call Flux actions and provide these as callbacks to the presentational components.
Are often stateful, as they tend to serve as data sources.
Are usually generated using higher order components such as connect() from React Redux, createContainer() from Relay, or Container.create() from Flux Utils, rather than written by hand.
Examples: UserPage, FollowersSidebar, StoryContainer, FollowedUserList.
I put them in different folders to make this distinction clear.

Benefits of This Approach
Better separation of concerns. You understand your app and your UI better by writing components this way.
Better reusability. You can use the same presentational component with completely different state sources, and turn those into separate container components that can be further reused.
Presentational components are essentially your app’s “palette”. You can put them on a single page and let the designer tweak all their variations without touching the app’s logic. You can run screenshot regression tests on that page.
This forces you to extract “layout components” such as Sidebar, Page, ContextMenu and use this.props.children instead of duplicating the same markup and layout in several container components.
Remember, components don’t have to emit DOM. They only need to provide composition boundaries between UI concerns.
*/

componentWillReceiveProps(nextProps){
  console.log("kkkk");
  let pk = nextProps.params.id;//这里不用nextProps用this.props...就会取到上一次的参数
  console.log(pk);
  Api.getCell(pk).then((data)=>{
      console.log('part',data);
      data.children_wp.map((val,index)=>{
        val.index = index + 1;
        val.PTRName = data.name;
        val.PTRCode = data.code;
        return val;
      });
      this.setState({
    ITMdata:data.children_wp
      });
  }).catch((err)=>{
      console.log('error');
  });
}

//setState
setState(function(previousState, currentProps) {
  return {myInteger: previousState.myInteger + 1};
});

onPartChange(e,val){
    //console.log(e.target.checked,val);
    if(e.target.checked){
      this.setState((prevState,curProps)=>{
        prevState.selParts.push(val);
        return {selParts:prevState.selParts}
      });
    }
    else{
      this.setState((prevState,curProps)=>{
        return {selParts:prevState.selParts.filter((cur)=>(cur.code !== val.code))}
      });
    } 
}

//传递this
let passWPThis = this;
let bNormal = this.TabOperate.submit(this.props.unitPrjData,this.props.code,pk0,pk1,pk2,pk3,this.props.suffix,passWPThis);


//顺序问题
handleSubmit(currentSeq){
    if(currentSeq == 4){
      let flow = this.check.checkObj(this.props.flowData);
      let sj = JSON.parse(flow.subject_json);
      let promiseArr = this.check.endFlowStatus3(sj);
      Promise.all(promiseArr).then((val)=>{
        const {advice,time} = this.getAdviceTime(currentSeq);
        //console.log(this.state.id,advice);
        this.check.approvedFlow(this.state.id,advice).then((val)=>{
          console.log("1",val);
          this.check.loadTaskTree(null,this.props.onChangeUserTask,true).then((curDat)=>{//这个没执行，是promise.all的问题还是then的问题
            console.log("2",curDat);
            this.check.updateFlowDat(this.state.id,this.props.onSetFlowData);
          });//这个暂时没起作用,后面再看
        });
        
      }).catch((err)=>{
        console.log("error");
      });
    }
    else{
      const {advice,time} = this.getAdviceTime(currentSeq);
      //console.log(this.state.id,advice);
      this.check.approvedFlow(this.state.id,advice).then((val)=>{
        console.log("1",val);
      });
      this.check.loadTaskTree(null,this.props.onChangeUserTask,true).then((curDat)=>{
          console.log("2",curDat);
          this.check.updateFlowDat(this.state.id,this.props.onSetFlowData);
        });//这个暂时没起作用,后面再看
    }
    
  }


  //原来是这个没 有resolve
  //审核通过
    approvedFlow(pk,note){
      const p2 = new Promise((resolve, reject) => {
        FlowTrans.logEvent(pk,note).then((data)=>{
          message.success("流程审批成功");
          console.log(data);
        }).catch((err)=>{
          message.error("流程审批失败");
          console.log("error",error);
        });
      });
      return p2;
    }



    handleSubmit(currentSeq){
    let self = this;
    if(currentSeq == 4){
      let flow = this.check.checkObj(this.props.flowData);
      let sj = JSON.parse(flow.subject_json);
      let promiseArr = this.check.endFlowStatus3(sj);
      Promise.all(promiseArr).then((val)=>{
        const {advice,time} = this.getAdviceTime(currentSeq);
        //console.log(this.state.id,advice);
        this.check.approvedFlow(this.state.id,advice).then((val)=>{
          console.log(val);
          this.check.updateTaskFlow(self);
        }); 
      }).catch((err)=>{
        console.log("error");
      });
    }
    else{
      const {advice,time} = this.getAdviceTime(currentSeq);
      //console.log(this.state.id,advice);
      this.check.approvedFlow(this.state.id,advice).then((val)=>{
        console.log(val);
        this.check.updateTaskFlow(self);
      });
    }
    
  }


  shouldComponentUpdate(nextProps) {
  const currentProps = _.pick(this.props, 'defaultValue', 'initialValue', 'valid', 'active', 'touched', 'value');
  const otherProps = _.pick(nextProps, 'defaultValue', 'initialValue', 'valid', 'active', 'touched', 'value');
  return !_.isEqual(currentProps, otherProps);
  }
  //父组件调用子组件的方法用ref
  var Todo = React.createClass({
  render: function() {
    return <div onClick={this.props.onClick}>{this.props.title}</div>;
  },

  //this component will be accessed by the parent through the `ref` attribute
  animate: function() {
    console.log('Pretend %s is animating', this.props.title);
  }
});

var Todos = React.createClass({
  getInitialState: function() {
    return {items: ['Apple', 'Banana', 'Cranberry']};
  },

  handleClick: function(index) {
    var items = this.state.items.filter(function(item, i) {
      return index !== i;
    });
    this.setState({items: items}, function() {
      if (items.length === 1) {
        this.refs.item0.animate();
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.items.map(function(item, i) {
          var boundClick = this.handleClick.bind(this, i);
          return (
            <Todo onClick={boundClick} key={i} title={item} ref={'item' + i} />
          );
        }, this)}
      </div>
    );
  }
});

ReactDOM.render(<Todos />, mountNode);
Alternatively, you could have achieved this by passing the todo an isLastUnfinishedItem prop, let it check this prop in componentDidUpdate, then animate itself; however, this quickly gets messy if you pass around different props to control animations.

class Parent extends Component {
 render() {
  return (
    <div>
      <Child ref="child" />
      <button onClick={() => this.refs.child.childMethod()}>Click</button>
    </div>
  );
 }
}

class Child extends Component {
  childMethod(){
    //...
  }
  render(){
    return <h1>Child</h1>
  }
}