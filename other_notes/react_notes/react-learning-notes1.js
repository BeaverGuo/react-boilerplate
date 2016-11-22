//issues
Bypass synthetic event system for Web Component events
To use a Web Component in React, you must directly attach an event listener to the React ref for that WC. We could change the implementation so that when React detects a custom element (tag names with dashes, like my-component), it will bypass the synthetic event system (and the whitelist) and just attach the event listener on the element itself.

Why bypass the synthetic event system? Because anyway we already need to bypass it manually when using a Web Component. I'm not so familiar with the React codebase, but this naive approach seems to work. Whoever uses Web Components in React can be responsible for whatever downsides that would cause, maybe in performance, I don't know. They are already having those (supposed) downsides, this issue is just about the convenience of WC usage inside React.

I was about to send a PR for this, but thought of opening an issue. I looked through the issues and didn't see any existing one related to the handling of WC events.

What is the current behavior?

A WC custom event (e.g. flipend) must be handled by attaching the event listener directly to the element in componentDidMount using a ref.

http://jsbin.com/yutocopasu/1/edit?js,output

React v15.1.0

class HelloMessage extends React.Component {
  handleHelloClick() {
    this.refs['foo'].toggle();//用ref调用brick-flipbox组件的方法
  }

  handleFlipend(ev) {
    console.log('Handle flip end');
  }

  componentDidMount() {
    this.refs['foo'].addEventListener('flipend', ev =>
      this.handleFlipend(ev);
    );
  }

  render() {
    return (
      <div>
        <div onClick={ev => this.handleHelloClick()}>
          Hello {this.props.name}, click me!
        </div>
        <brick-flipbox class="demo" ref="foo">
          <div>front</div>
          <div>back</div>
        </brick-flipbox>
      </div>
    );
  }
}
What is the expected behavior?

A WC custom event can be handled with onMyEvent={ev => this.handleMyEvent(ev)} on the ReactElement corresponding to the WC.

class HelloMessage extends React.Component {
  handleHelloClick() {
    this.refs['foo'].toggle();
  }

  handleFlipend(ev) {
    console.log('Handle flip end');
  }

  render() {
    return (
      <div>
        <div onClick={ev => this.handleHelloClick()}>
          Hello {this.props.name}, click me!
        </div>
        <brick-flipbox onFlipend={ev => this.handleFlipend(ev)} class="demo" ref="foo">
          <div>front</div>
          <div>back</div>
        </brick-flipbox>
      </div>
    );
  }
}
PS: this snippet above still has the ref, but for unrelated reasons. Ideally we wouldn't need refs for handling events of WCs.

As long as we only support attributes. I don't see a problem doing this for the heuristic if (typeof props[propName] === 'function') element.addEventListener(propName, props[propName], false). The only concern would be if we should have some heuristic for normalizing the event name. I'm not really a fan of converting things like onXxx into xxx after doing that in MooTools. The other concern is related to #6436 and how we'd handle capture/bubble/passive/active etc.

I'd like it better if we could just pass through all props to element properties but it seems like that ship has sailed since most web components aren't designed to handle properties properly. A massive loss to the community IMO.

window.onresize = function(event) {
    ...
};

Yes, but you are swallowing them:

      .then(() => {
        this.setState({ loaded: true })
      })
      .catch(()=> { 
        console.log('Swallowed!') 
      });
Your catch() handler is going to catch any error thrown in the then() chain before it, including the one caused by a render() due to a setState() call.

If you don’t want to catch errors resulting from setState(), and want to only catch network failures (let’s imagine your Promise.resolve() is actually a fetch()), you want to use the second then() argument instead:

  componentDidMount() {
    Promise.resolve()
      .then(() => {
        this.setState({ loaded: true })
      }, (err) => {
        console.log('An error occurred (but not in setState!)', err);
      });

In this case, unless you catch() later in the chain, the error in render() will be uncaught and, with a good Promise polyfill (or with native Promises in Chrome and maybe other browsers), displayed.

function* imaGenerator() {
  yield 42;
  yield 43;
}

what generator bring to the table is the ability to treat a function like a program -- that you can define
specific rules that you define.So a generator function is a program.
To execute a program we need a interpreter.and yield command is how a program reaches out to the interpreter.
program <--> interpreter. two way communication.
interpreter(function* program() {
  // do something
});

const a = yield b;//send a command to b and put its response to a.and it's async.so the interpreter can give us 'a' right away or it later.the generator function will pause and not execute further untill the interpreter tells it to.

bundle 'watch' model:
1) wait for initial compilation
2) make some changes
3) wait for subsequent compilation to finish
4) assert changes were reflected in the new build

watch({}, function* (compilation) {
  yield compilation(); // pause and wait
  t.false(fs.readdirSync('./node_modules').includes('lodash'));

  // make changes
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.dependencies.lodash = '*';
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  yield compilation(); // pause and wait
  // assert they were reflected
  t.true(fs.readdirSync('./node_modules').includes('lodash'));
  t.end();
});

2.co is a generator interpreter which allows you to write nicer,more linear code for promises:
https://github.com/tj/co
getUser().then(user => getComments(user))
-->
co(function* () {
  const user = yield getUser();
  const comments = yield getComments(user);//async-await implemented in the userland.
});

3.redux-saga
Instead of scattering them across dozens of action creators and reducers, you group logically related pieces of behavior in a program called saga.

Redux-saga can interpret many commands. Among the most popular are:

take(ACTION_NAME) — wait for an action of ACTION_NAME to be dispatched. Returns the action object
put(action) — dispatch an action
call(promiseFn) — calls a function that returns a promise, and waits for it to resolve. Returns what the promise resolved to
& others
An example would be:

function* welcomeSaga() {
  yield take('REGISTRATION_FINISHED');
  yield put(showWelcomePopup());
}

sagaMiddleware.run(welcomeSaga);

try...catch...finally
finally 是不管有没有throw error都会执行的

The value of multiline is a Boolean and is true if the "m" flag was used; otherwise, false. The "m" flag indicates that a multiline input string should be treated as multiple lines. For example, if "m" is used, "^" and "$" change from matching at only the start or end of the entire string to the start or end of any line within the string.

var regex = new RegExp('foo', 'm');

console.log(regex.multiline); // true

regexp: ?
Matches the preceding expression 0 or 1 time. Equivalent to {0,1}.

For example, /e?le?/ matches the 'el' in "angel" and the 'le' in "angle" and also the 'l' in "oslo".

If used immediately after any of the quantifiers *, +, ?, or {}, makes the quantifier non-greedy (matching the fewest possible characters), as opposed to the default, which is greedy (matching as many characters as possible). For example, applying /\d+/ to "123abc" matches "123". But applying /\d+?/ to that same string matches only the "1".

Also used in lookahead assertions, as described in the x(?=y) and x(?!y) entries of this table.

在表示重复的字符后面加问号，比如+?,*?,{2,3}?可以停止匹配的贪婪模式。
var pattern=/\w{2,3}/;
console.log("aaaa".match(pattern)[0]);
/*结果"aaa";贪婪模式下会尽可能多的匹配，
所以会匹配3个重复的字符
*/
var pattern2=/\w{2,3}?/;
console.log("aaaa".match(pattern2)[0]);
/*
*结果"aa";加问号后会尽可能少的匹配重复次数，
*所以匹配到了2个重复的字符
*/
在分组内使用?:可以产生没有编号的分组，比如
var pattern=/(ab)\w+(ba)/;
console.log("abcba_".replace(pattern,"$1"));
/*结果"ab_";匹配到的字符被第一个分组(ab)
*替换
*/
var pattern2=/(?:ab)\w+(ba)/;
console.log("abcba_".replace(pattern2,"$1"));
/*
*结果"ba_";第一次分组内加入了?:,产生的是一个
*没有编号的分组，所以$1匹配的字符是第二个分组，
*也就是第一个编号分组(ba)相匹配的文本内容
*/
(?=)和(?!);零宽正向断言和负向断言，括号内表示某个位置右边必须和=右边匹配上，或者不和!后的字符匹配。
var pattern=/str(?=ings)ing/;
console.log("strings.a".match(pattern));
console.log("strings.a".match(/string(?=s)/));
console.log("string_x".match(pattern));
console.log("string_x".match(/string(?=s)/));
/*前两个结果是["string"],后两个结果是null;
*str(?=ings)ing/匹配"string",r后面的位置右边必须跟
*上ings;和/string(?=s)/一样;匹配"string";g后面的位置
*的右边必须跟一个s。"string_x"虽然也含有"string"但是
*不满足(?=...)括号内的条件
*/
var pattern=/string(?!s)/;
console.log("strings".match(pattern));//null
console.log("string.".match(pattern));//["string"]
/*(?!...)某位置右边不能有!后匹配的字符，
*string(?!s)/匹配"string","g"后不能跟"s"
*/
在表示重复次数时，代表重复0次或1次

I want to say that I don’t like that people try to classify JavaScript as object-oriented. It is event-oriented. It is in its own class. It is unique. Maybe Go is also kind of event-oriented. It’s more message-oriented. But JavaScript is not object-oriented. If you try to use object-oriented patterns in JavaScript, you’re going to screw it up.

Okay, that’s something I think is hard in JavaScript. When people write code that can’t be serialized and deserialized. Because so much is network-oriented in JavaScript because you’re looking at the browser and the server. And the page could refresh and you might have to put something in local storage. It’s such an unpredictable environment that if you ever end up with an object that can’t easily be serialized and deserialized meaning you can put it out to a string and then read it back and then get the exact same object with the exact same state, then you can get really messy stuff really fast.

I know. And I have to disagree here, too. Because ultimately you have objects in JavaScript. And they’re basically like JSON structures, right? But you can assign different attributes to have different functions. But if you’re using prototypes then you can effectively initialize with the data and use the prototypes to build the behavior back in.

Well, it’s not a performance… in this particular case it’s not a performance reason you do it. It’s binding. And the DOM is definitely slow. But I’m not… go watch Dave Smith’s talk about Angular and React. Angular 2 and React are pretty comparable on performance. But that’s, it really has nothing to do with the DOM, which is funny. It’s all about data binding that’s the reason that it’s slow.

Prototype lookups are dynamic.
New / updated properties are assigned to the object, not to the prototype.
eg:
var person = {
  kind: 'person'
}

var zack = {}
zack.__proto__ = person

zack.kind = 'zack'

console.log(zack.kind); //=> 'zack'
// zack now has a 'kind' property

console.log(person.kind); //=> 'person'
// person has not being modified

add props in Object.create
var zack = Object.create(person, {age: {value:  13} });
console.log(zack.age); // => ‘13’


var zack = Object.create(person);
Object.getPrototypeOf(zack); //=> person


function Foo(){}

var foo = new Foo();

//foo is now an instance of Foo
console.log(foo instanceof Foo ) //=> true

new keyword:
function Foo() {
  this.kind = ‘foo’
}

var foo = new Foo(); 
foo.kind //=> ‘foo’

-->

function Foo() {
  var this = {}; // this is not valid, just for illustration
  this.__proto__ = Foo.prototype;
  
  this.kind = ‘foo’
  
  return this;
}

function prototype:
The ‘prototype’ property points to the object that will be asigned as the prototype of instances created with that function when using ‘new’. 

function Person(name) {
  this.name = name;
}

// the function person has a prototype property
// we can add properties to this function prototype
Person.prototype.kind = ‘person’

// when we create a new object using new
var zack = new Person(‘Zack’);

// the prototype of the new object points to person.prototype
zack.__proto__ == Person.prototype //=> true

// in the new object we have access to properties defined in Person.prototype
zack.kind //=> person

