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

