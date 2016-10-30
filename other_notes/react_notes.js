/*What makes React important is the shift from global, template-based layouts to distinct, data-driven components.
render的错误被promise的catch捕获到了
*/
1.this in js
/*These two snippets are different:

// 1
obj.method();

// 2
var method = obj.method;
method();

Learn why and you’ll understand JavaScript.
In my opinion, a lot of this confusion is cleared up by understanding the core function invocation primitive, and then looking at all other ways of invoking a function as sugar on top of that primitive.
The Core Primitive
First, let's look at the core function invocation primitive, a Function's call method[1]. The call method is relatively straight forward.

Make an argument list (argList) out of parameters 1 through the end
The first parameter is thisValue
Invoke the function with this set to thisValue and the argList as its argument list
For example:

function hello(thing) {  
  console.log(this + " says hello " + thing);
}

hello.call("Yehuda", "world") //=> Yehuda says hello world 
Obviously, invoking functions with call all the time would be pretty annoying. JavaScript allows us to invoke functions directly using the parens syntax (hello("world"). When we do that, the invocation desugars:

function hello(thing) {  
  console.log("Hello " + thing);
}

// this:
hello("world")

// desugars to:
hello.call(window, "world"); 
This behavior has changed in ECMAScript 5 only when using strict mode[2]:

// this:
hello("world")

// desugars to:
hello.call(undefined, "world"); 
The short version is: a function invocation like fn(...args) is the same as fn.call(window [ES5-strict: undefined], ...args).
Note that this is also true about functions declared inline: (function() {})() is the same as (function() {}).call(window [ES5-strict: undefined).
The ECMAScript 5 spec says that undefined is (almost) always passed, but that the function being called should change its thisValue to the global object when not in strict mode. This allows strict mode callers to avoid breaking existing non-strict-mode libraries.
var person = {  
  name: "Brendan Eich",
  hello: function(thing) {
    console.log(this + " says hello " + thing);
  }
}

// this:
person.hello("world")

// desugars to this:
person.hello.call(person, "world");
function hello(thing) {  
  console.log(this + " says hello " + thing);
}

person = { name: "Brendan Eich" }  
person.hello = hello;

person.hello("world") // still desugars to person.hello.call(person, "world")

hello("world") // "[object DOMWindow]world"  
Notice that the function doesn't have a persistent notion of its 'this'. It is always set at call time based upon the way it was invoked by its caller.
var person = {  
  name: "Brendan Eich",
  hello: function(thing) {
    console.log(this.name + " says hello " + thing);
  }
}

var boundHello = function(thing) { return person.hello.call(person, thing); }

boundHello("world");  
Even though our boundHello call still desugars to boundHello.call(window, "world"), we turn right around and use our primitive call method to change the this value back to what we want it to be.

var bind = function(func, thisValue) {  
  return function() {
    return func.apply(thisValue, arguments);
  }
}

var boundHello = bind(person.hello, person);  
boundHello("world") // "Brendan Eich says hello world"

var person = {  
  name: "Alex Russell",
  hello: function() { console.log(this.name + " says hello world"); }
}

$("#some-div").click(person.hello.bind(person));

// when the div is clicked, "Alex Russell says hello world" is printed
Because jQuery makes such heavy use of anonymous callback functions, it uses the call method internally to set the this value of those callbacks to a more useful value. For instance, instead of receiving window as this in all event handlers (as you would without special intervention), jQuery invokes call on the callback with the element that set up the event handler as its first parameter.

In several places, I simplified the reality a bit from the exact wording of the specification. Probably the most important cheat is the way I called func.call a "primitive". In reality, the spec has a primitive (internally referred to as [[Call]]) that both func.call and [obj.]func() use.
However, take a look at the definition of func.call:

If IsCallable(func) is false, then throw a TypeError exception.
Let argList be an empty List.
If this method was called with more than one argument then in left to right order starting with arg1 append each argument as the last element of argList
Return the result of calling the [[Call]] internal method of func, providing thisArg as the this value and argList as the list of arguments.
As you can see, this definition is essentially a very simple JavaScript language binding to the primitive [[Call]] operation.

If you look at the definition of invoking a function, the first seven steps set up thisValue and argList, and the last step is: "Return the result of calling the [[Call]] internal method on func, providing thisValue as the this value and providing the list argList as the argument values."

It's essentially identical wording, once the argList and thisValue have been determined.

I cheated a bit in calling call a primitive, but the meaning is essentially the same as had I pulled out the spec at the beginning of this article and quoted chapter and verse.

There are also some additional cases (most notably involving with) that I didn't cover here.

*/
2.setState()
this.setState({locationArr});
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));

3.text select
inputOnClick(e){
	e.target.focus();
    e.target.setSelectionRange(7,e.target.value.length);
}