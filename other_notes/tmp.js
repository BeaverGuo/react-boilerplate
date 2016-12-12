/*webpack 2016/11/22:
1.Code splitting with require.ensure()
2.Code Splitting - CSS  https://webpack.js.org/guides/code-splitting-css/

That is how html works. Whitespace is collapsed. Look at the way your question is displayed to see an example.

To work around this, wrap your text in a <pre> tag, or use &nbsp; instead of space characters

var spans = $("span").filter(function(idx) {
   return this.innerHTML.indexOf(myString) == 0;
});

var React = require('react/addons');

class UserWidget extends React.Component {
  // ...

  // BAD: set this.state.fullName with values received through props
  constructor (props) {
    this.state = {
      fullName: `${props.firstName} ${props.lastName}`
    };
  }

  render () {
    var fullName = this.state.fullName;
    var picture = this.props.picture;

    return (
      <div>
        <img src={picture} />
        <h2>{fullName}</h2>
      </div>
    );
  }
}
What’s wrong with this? It may not be obvious at first, but if firstName or lastName change, the view of this UserWidget will not change. The constructor function only runs when the component is mounted and thus fullName is forever whatever it was when the component mounted.* Developers who are new to React will often make this mistake, perhaps because setState is the easiest and most obvious way to update the component view.

You should ask yourself whether this component owns this data. Were firstName and lastName created internally? If not, then the state should not depend on it.** And what is the best way to avoid this? Calculate fullName as a part of the render function.

render () {
  var fullName = `${this.props.firstName} ${this.props.lastName}`;
  // ...
}
By moving this to the render function, we are now never again concerned about whether fullName will be updated. React has hooks to run a function whenever props are updated - i.e. componentWillReceiveProps - however, I would consider using this an anti-pattern because it adds complexity when it’s not needed.

Store the simplest possible values to describe a component’s state

var React = require('react/addons');
var cx = React.addons.classSet;

class ArbitraryWidget extends React.Component {
  // ...

  constructor () {
    this.state = {
      isHovering: false,
      isActive: false
    };
  }

  // GOOD: set this.state.isHovering to true on mouse over
  handleMouseOver () {
    this.setState({ isHovering: true });
  }

  // GOOD: set this.state.isHovering to false on mouse leave
  handleMouseOut () {
    this.setState({ isHovering: false });
  }

  // GOOD: toggle this.state.isActive on click
  handleClick () {
    var active = !this.state.isActive;
    this.setState({ isActive: active });
  }

  render () {
    // use the classSet addon to concat an array of class names together
    var classes = cx([
      this.state.isHovering && 'hover',
      this.state.isActive && 'active'
    ]);

    return (
      <div
        className={cx(classes)}
        onClick={this.handleClick.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)} />
    );
  }
}

Leave calculations and conditionals to the render function

Following the previous two rules, this one should already be in place; however, it’s still worth noting. Whenever possible, make decisions and do calculations at the last possible moment: in the render function. Though perhaps slightly slower than other approaches, it ensures the least amount of redirection in the component. Enhanced readability and extensibility should always come before micro-optimizations.

Do I need to concatenate the firstName and lastName prop? Move it to the render function. Which classes does my component need to use? Decide in the render function. Should I show placeholder text if I don’t have any items on my todo list? Decide in the render function. Do I need to format a phone number so that it looks more presentable? Do it in the render function. How should I render out subcomponents? Decide in the render function.* What am I having for lunch today? Decide in the render function.

Of course, you don’t have to cram all of code into a single function. On the contrary, it’s best to extract helper functions (with good names) when appropriate. The point is still that you should reduce complexity in your state by allowing the render function to do most of the decision making. You might decide to prefix these helpers with render as in the following example:**

// GOOD: Helper function to render fullName
renderFullName () {
  return `${this.props.firstName} ${this.props.lastName}`;
}

render () {
  var fullName = this.renderFullName();
  // ...
}

Because I’m suggesting that you defer just about everything to the render function, it would follow that even CPU intensive calculations are deferred as well. To avoid repeated complex renderings, consider a memoization function.
https://lodash.com/docs/4.17.2#memoize
Do not store values on the instance of the component

Just don’t. Storing values on the instance of a component is doing this:

var React = require('react/addons');

class ArbitraryWidget extends React.Component {
  // ...

  constructor () {
    this.derp = 'something';
  }

  handleClick () {
    this.derp = 'somethingElse';
  }

  render () {
    var something = this.derp;
    // ...
  }
}
This is particularly bad, not only because you’re breaking the obvious convention of storing state on this.state, but because render won’t automatically trigger when this.derp is updated.

domElement.addEventListener('funName',function(){
	console.log(this);//this refers to domElement
})

$body.on('click',$dom,function(){
if (!$(this).data['bindEvents']) {
//绑定事件


$(this).data[''bindEvents'] = true;
        }
})