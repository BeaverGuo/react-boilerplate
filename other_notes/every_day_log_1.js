我们现在要使用 React 来渲染我们的应用程序。

首先安装 React 和 ReactDOM：

运行 yarn add react react-dom
这两个包将添加到 "dependencies" 而不是 "devDependencies" ，因为生产环境的客户端打包需要它们，这跟构建过程需要的包不一样。

将 src/client/app.js 重命名为 src/client/app.jsx，然后加入如下代码：

import 'babel-polyfill';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dog from '../shared/dog';

const dogBark = new Dog('Browser Toby').bark();

const App = props => (
  <div>
    The dog says: {props.message}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

ReactDOM.render(<App message={dogBark} />, document.querySelector('.app'));
注意：如果您不熟悉 React 或 PropTypes 相关的知识，请先学习 React 的基本知识后再回到本教程。在接下来的章节里会有很多关于 React 的内容，所以你需要先理解它。

在你的 Gulpfile 中修改 clientEntryPoint 的值，改成 .jsx 扩展名：

clientEntryPoint: 'src/client/app.jsx',
我们使用了 JSX 语法，必须告诉 Babel 需要转换它。首先安装 React Babel preset，这个包告诉 Babel 如何转换 JSX 语法：yarn add --dev babel-preset-react。然后修改 package.json 中的 babel 字段：

"babel": {
  "presets": [
    "latest",
    "react"
  ]
},
现在运行 yarn start，打开 index.html，可以看见 React 渲染出了 "The dog says: Wah wah, I am Browser Toby"。




在本章（应该是目前为止最困难的一章）中，我们将添加 Redux 到我们的应用程序，并将它与 React 结合起来使用。 Redux 负责管理应用程序的状态。它由 store，actions 和 reducers 组成：store 是一个表示应用程序状态的 JavaScript 对象，actions 表示由用户触发的动作，reducers 表示如何处理这些动作。 reducers 将会改变应用程序的状态（store），当状态被修改时，应用程序可能会发生一些改变。 这里有一个很好的 Redux 可视化演示示例。

为了演示如何以最简单的方式使用 Redux，我们的应用程序将包括一个消息和一个按钮。消息的内容是狗是否已经叫了（初始值是没有叫），按钮用于让狗叫，点击按钮后应该更新消息的内容。

需要两个包，redux 和 react-redux。

运行 yarn add redux react-redux
新建两个文件夹：src/client/actions 和 src/client/reducers

在 actions 中新建 dog-actions.js：
export const MAKE_BARK = 'MAKE_BARK';

export const makeBark = () => ({
  type: MAKE_BARK,
  payload: true,
});
这里我们定义了一个 action 类型 MAKE_BARK 和一个函数（也称为 action creator），它触发一个名为 makeBark 的 MAKE_BARK action。两者都使用 export 导出了，因为在其他文件中需要它们。此操作实现了 Flux Standard Action 模型，所以它具有 type 和 payload 属性。

在 reducers 文件夹中新建 dog-reducer.js：
import { MAKE_BARK } from '../actions/dog-actions';

const initialState = {
  hasBarked: false,
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_BARK:
      return { hasBarked: action.payload };
    default:
      return state;
  }
};

export default dogReducer;
这里我们定义了应用程序的初始状态 initialState 和 dogReducer。initialState 是一个 hasBarked 属性为 false 的 JavaScript 对象，dogReducer 是根据 action 改变 state 的函数。在这个函数中不能直接修改 state，而应该返回一个新的 state。

修改 app.jsx 创建一个 store，替换成以下内容：
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import dogReducer from './reducers/dog-reducer';
import BarkMessage from './containers/bark-message';
import BarkButton from './containers/bark-button';

const store = createStore(combineReducers({
  dog: dogReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BarkMessage />
      <BarkButton />
    </div>
  </Provider>
  , document.querySelector('.app')
);
可以看到，store 是由一个叫 createStore 的函数生成的。通过使用 combineReducers 函数将所有 reducer 结合起来传给 createStore。每个 reducer 都可以重新命名，在这里将其命名为 dog。

这是 Redux 的部分。

现在我们将使用 react-redux 将 Redux 和 React 结合起来。为了将我们的 store 传给 React，需要将整个 app 用 <Provider> 组件包裹起来。它只有能有一个子组件，所以我们用一个 <div> 将我们的两个组件 BarkMessage 和 BarkButton 再包了一层。

可以看到，BarkMessage 和 BarkButton 是从 containers 文件夹中导入的。现在我们将介绍 展示组件 *和 *容器组件 的概念。

展示组件 是 笨拙的 React 组件，它们无法知道任何的 Redux 状态。容器组件 是 聪明的 组件，它能获取 Redux 的状态，我们通过使用 connect 方法将这些状态传给 展示组件。

译者注：关于容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）的可能有不同的名称，可以查看 Redux 中文文档的相关章节。

新建两个文件夹 src/client/components 和 src/client/containers
在 components 中新建以下文件：
button.jsx

import React, { PropTypes } from 'react';

const Button = ({ action, actionLabel }) => <button onClick={action}>{actionLabel}</button>;

Button.propTypes = {
  action: PropTypes.func.isRequired,
  actionLabel: PropTypes.string.isRequired,
};

export default Button;
以及 message.jsx:

import React, { PropTypes } from 'react';

const Message = ({ message }) => <div>{message}</div>;

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
这些都是展示组件的例子，他们并没有跟应用程序的 state 关联起来，而是根据传入的 props 来展示内容。button.jsx 和 message.jsx 有一点区别，Button 的 props 里有一个 action，绑定在 onClick 事件上。在应用程序的上下文中，Button 标签不会改变（因为它没有绑定任何 state），但是 Message 组件将反映我们的应用程序的状态（绑定了 message 这个 state），并将根据状态而变化。

同样，展示组件不会知道关于 Redux actions 或 state 的任何信息，所以我们需要新建一个容器组件将 动作（actions） 和 数据（data）传给它们。

在 containers 中新建以下文件：
bark-button.js

import { connect } from 'react-redux';
import Button from '../components/button';
import { makeBark } from '../actions/dog-actions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(makeBark()); },
  actionLabel: 'Bark',
});

export default connect(null, mapDispatchToProps)(Button);
以及 bark-message.js:

import { connect } from 'react-redux';
import Message from '../components/message';

const mapStateToProps = state => ({
  message: state.dog.hasBarked ? 'The dog barked' : 'The dog did not bark',
});

export default connect(mapStateToProps)(Message);
在 BarkButton 中， 我们将 Button 组件和 makeBark 这个 action 以及 Redux 中的 dispatch 方法关联起来，将 BarkMessage 组件和 app 状态中的 Message 关联起来。当状态改变的时候，Message 组件会自动重新渲染（因为它的 props message 改变了）。这些操作都是由 react-redux 中的 connect 方法完成的。

现在可以执行 yarn start ，并打开 index.html 了。可以看到 "The dog did not bark" 的消息以及一个按钮。点击按钮后消息会变成 "The dog barked"。
译者注：本章概念比较多，可能不太容易理解，如果你希望深入地学习 Redux，请查看 Redux 中文文档

Immutable JS

与前一章不同，这一章相当容易，只是对之前的代码稍作改进。

首先向代码库添加 Immutable JS。Immutable 的中文意思是不可变，Immutable 是一个操作 JS 对象而不改变它们的库，不是这样做：

const obj = { a: 1 };
obj.a = 2; // Mutates `obj`
而是这样做：

const obj = Immutable.Map({ a: 1 });
obj.set('a', 2); // Returns a new object without mutating `obj`
这是一种函数式编程的范例，它能很好地与 Redux 一起使用。reducer 函数必须是纯函数，不能改变作为参数传递的 state，而是返回一个全新的 state 对象。让我们使用 Immutable 来强制做到这一点。

运行 yarn add immutable
我们将使用 Map，但 Airbnb 配置的 ESLint 会将其视为一个错误（大写开头的变量必须是一个类）。添加以下代码到 package.json 的 eslintConfig：

"rules": {
  "new-cap": [
    2,
    {
      "capIsNewExceptions": [
        "Map",
        "List"
      ]
    }
  ]
}
这样 Map 和 List（我们使用到的两个 Immutable 对象）就不会被 ESLint 视为错误了。这个 JSON 的实际上是被 Yarn/NPM 自动格式化了，所以我们没办法让它更紧凑。

回到 Immutable 的部分：

修改 dog-reducer.js 文件如下：

import Immutable from 'immutable';
import { MAKE_BARK } from '../actions/dog-actions';

const initialState = Immutable.Map({
  hasBarked: false,
});

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_BARK:
      return state.set('hasBarked', action.payload);
    default:
      return state;
  }
};

export default dogReducer;
初始 state 现在是一个 Immutable Map 了，使用 set() 方法生成一个新的 state，这就避免了改变原来的 state 对象。

在 containers/bark-message.js 中的 mapStateToProps 函数将 .hasBarked 替换为 .get('hasBarked')：

const mapStateToProps = state => ({
  message: state.dog.get('hasBarked') ? 'The dog barked' : 'The dog did not bark',
});
修改后 app 的行为与之前是一样的。

注意：如果 Babel 提示 Immutable 超过了 100KB，在 package.json 中的 babel 字段添加 "compact": false。

从上面的代码片段中可以看出，我们的 state 对象 dog 属性仍然不是不可变的。这没问题，但如果你只想操作不可变对象，可以安装 redux-immutable 包来替换 Redux 的 combineReducers 函数。

可选步骤：

运行 yarn add redux-immutable
把 app.jsx 中的 combineReducers 函数替换为从 redux-immutable 中导出的。
将 bark-message.js 中的 state.dog.get('hasBarked') 替换为 state.getIn(['dog', 'hasBarked'])。
Redux Actions

当你添加越来越多的 action 后，你会发现自己写了很多重复代码。 redux-actions 这个包有助于减少重复的样板代码，你可以以更紧凑的方式重写 dog-actions.js 文件：

import { createAction } from 'redux-actions';

export const MAKE_BARK = 'MAKE_BARK';
export const makeBark = createAction(MAKE_BARK, () => true);
redux-actions 实现了 Flux Standard Action 这个模型，就跟我们之前的代码一样，所以它能够无缝地集成在我们的 app 中。

不要忘记运行 yarn add redux-actions


Mocha 和 Chai

新建 src/test 文件夹。这个文件夹的目录结构应该与 app 的目录结构一致，所以也应该新建 src/test/client 文件夹（可以不添加 server and shared，目前我们只写这两个文件夹下的测试）
在 src/test/client 中新建 state-test.js，我们将在这里编写 Redux 生命周期的测试用例。
我们选择 Mocha 作为主要的测试框架。Mocha 易于使用，功能强大，是目前最流行的 JavaScript 测试框架，灵活并且模块化。另外，它允许你使用任何的断言库。 Chai 是一个非常棒的断言库，有很多插件可用，并允许你选择不同的断言样式。`

安装 Mocha 和 Chai：运行 yarn add --dev mocha chai
在 state-test.js 中添加：

/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */

import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { should } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import dogReducer from '../../client/reducers/dog-reducer';
import { makeBark } from '../../client/actions/dog-actions';

should();
let store;

describe('App State', () => {
  describe('Dog', () => {
    beforeEach(() => {
      store = createStore(combineReducers({
        dog: dogReducer,
      }));
    });
    describe('makeBark', () => {
      it('should make hasBarked go from false to true', () => {
        store.getState().getIn(['dog', 'hasBarked']).should.be.false;
        store.dispatch(makeBark());
        store.getState().getIn(['dog', 'hasBarked']).should.be.true;
      });
    });
  });
});
好，现在我们一起分析一下都发生了什么。

首先，注意我们是如何从 chai 中导入 should 断言样式的。这让我们使用 mynumber.should.equal(3) 这样的语法去做断言，很酷。为了能够让 should 让任何对象调用，需要所有测试之前运行 should()。这些断言中，有些是表达式，如 mybook.should.be.true，这会让 ESLint 报错，因此我们在顶部添加了一个 ESLint 注释，用于禁用 no-unused-expressions 这个规则。

Mocha 测试的工作就像一棵树。在这个例子中，makeBark 方法会修改 state 中的 dog 属性，我们想测试这个方法，所以应该使用这种层次结构：App State > Dog > makeBark，正如上面代码里 describe() 声明的一样。it() 是实际的测试函数， beforeEach() 是在每个 it() 测试之前执行的函数。在这个例子中，在测试之前我们需要新建一个 store。在文件的顶部声明一个 store 变量，这样在每个测试用例中都能用了。

makeBark 这个测试的意义非常明确， it() 中提供的字符串描述使它更加明确了：这个测试用例是在测试调用了 hasBarked 方法后 hasBarked 将从 false 变为 true。

好，该运行测试了！

新建 test 任务，它依赖 gulp-mocha 插件：
import mocha from 'gulp-mocha';

const paths = {
  // [...]
  allLibTests: 'lib/test/**/*.js',
};

// [...]

gulp.task('test', ['build'], () =>
  gulp.src(paths.allLibTests)
    .pipe(mocha())
);
当然在此之前需要运行 yarn add --dev gulp-mocha 安装它
如你所见，测试需要依赖 lib 中的代码，所以 build 任务是 test 任务的依赖。build 也有一个依赖，lint，最后我们为 main 添加依赖 test，所以 default 任务的依赖顺序是这样的：lint > build > test > main。

为 main 添加依赖 test：
gulp.task('main', ['test'], () => /* ... */ );
在 package.json 中将 "test" 字段替换为 "test": "gulp test"。 这样就能使用 yarn test 命令运行测试了。像持续集成服务等都将默认读取 test 中的内容，这是一种标准的做法，因此我们应该始终在 test 中填写测试命令。yarn start 命令将在 Webpack 进行客户端打包之前运行所有测试，确保了只有所有测试通过才进行打包。
运行 yarn test 或 yarn start，将会展现测试的结果，希望全是绿色（代表测试通过了）。
Sinon

在某些情况下，我们希望在单元测试中伪造一些东西。假设我们有一个函数 deleteEverything，它包含对 deleteDatabases() 的调用。如果真的运行了 deleteDatabases()（删除数据库），将会有很多副作用，我们绝不希望在运行测试时发生这种情况。

Sinon 是一个提供 Stubs（还有许多其他功能）的测试库，它允许我们不实际调用 deleteDatabases 而是监听它。这样我们可以测试它是否被调用，或者它调用了哪些参数。它可以伪造或避免 AJAX 请求，从而避免了真实 AJAX 请求对后端的副作用。

译者注：stub 通常翻译为测试桩。拿 deleteDatabases 举例，我们肯定不希望运行测试把数据库都干掉，打了测试桩之后，跑测试用例不会真的删数据库，但我们就能知道这个方法是否执行，执行过几次，执行时传入的参数是什么等等。

我们将 src/shared/dog.js 的Dog 类中增加一个 barkInConsole 方法：

class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Wah wah, I am ${this.name}`;
  }

  barkInConsole() {
    /* eslint-disable no-console */
    console.log(this.bark());
    /* eslint-enable no-console */
  }
}

export default Dog;
如果在单元测试中运行 barkInConsole，console.log() 会把信息打印到终端。我们把它作为一种副作用来看待（就像 AJAX 一样），不希望它真的把东西打印出来，而是想知道 console.log() 是否正常被调用，以及调用的参数是什么。

新建 src/test/shared/dog-test.js 文件，加入以下内容：
/* eslint-disable import/no-extraneous-dependencies, no-console */

import chai from 'chai';
import { stub } from 'sinon';
import sinonChai from 'sinon-chai';
import { describe, it } from 'mocha';
import Dog from '../../shared/dog';

chai.should();
chai.use(sinonChai);

describe('Shared', () => {
  describe('Dog', () => {
    describe('barkInConsole', () => {
      it('should print a bark string with its name', () => {
        stub(console, 'log');
        new Dog('Test Toby').barkInConsole();
        console.log.should.have.been.calledWith('Wah wah, I am Test Toby');
        console.log.restore();
      });
    });
  });
});
这里我们使用了 Sinon 的 stubs 功能和一个 Chai 的插件。

运行 yarn add --dev sinon sinon-chai 安装需要的库文件
那么这里到底做了什么呢？首先，我们调用 chai.use(sinonChai) 来激活 Chai 插件。所有的奥秘都在发生在 it() 语句：stub(console, 'log') 将会为 console.log 打一个 stab 并监听它。当 new Dog('Test Toby').barkInConsole() 执行的时候，不出意外 console.log 应当会被调用。我们使用 console.log.should.have.been.calledWith() 来测试是否调用了 console.log。测试结束后恢复 console.log，使它再次正常工作。

重要说明：不推荐对 console.log 使用 stab，因为一旦测试失败，console.log.restore() 就不会被调用了，所以在其他测试代码执行的时候 console.log 一直是坏的！甚至不会打印导致测试失败的错误消息，这会很麻烦，一旦出了问题我们也不知道是什么问题。这个例子只用于说明 stub 功能。

如果一切顺利，目前应该有两个 “pass” 的测试用例了。

