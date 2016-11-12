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

4.Bypass synthetic event system for Web Component events
https://github.com/facebook/react/issues/7901#issuecomment-255546486
What is the current behavior?

A WC custom event (e.g. flipend) must be handled by attaching the event listener directly to the element in componentDidMount using a ref.
window.addEventListener('WebComponentsReady',function(){
  
  class HelloMessage extends React.Component {
    handleHelloClick() {
      this.refs['foo'].toggle()
    }
    
    handleFlipend() {
      console.log('Handle flip end'); 
    }
    
    componentDidMount() {
      this.refs['foo'].addEventListener('flipend', ev =>
        this.handleFlipend()
      );
    }
    
   render() {
    return <div>
      <div onClick={ev => this.handleHelloClick()}>
        Hello {this.props.name}, click me!
      </div>
      <brick-flipbox class="demo" ref="foo">
        <div>front</div>
        <div>back</div>
      </brick-flipbox>
    </div>;
   }
  }
  
  ReactDOM.render(
    <HelloMessage name={'world'} />, 
    document.querySelector('#app')
  );
});

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

As long as we only support attributes. I don't see a problem doing this for the heuristic if (typeof props[propName] === 'function') element.addEventListener(propName, props[propName], false). The only concern would be if we should have some heuristic for normalizing the event name. I'm not really a fan of converting things like onXxx into xxx after doing that in MooTools. The other concern is related to #6436 and how we'd handle capture/bubble/passive/active etc.

I'd like it better if we could just pass through all props to element properties but it seems like that ship has sailed since most web components aren't designed to handle properties properly. A massive loss to the community IMO.
Props don't work for all elements. SVGElement will error if you set width as a property, for example because it's readonly.
Attributes don't work for all elements. HTMLInputElement needs value set as a property, for example because the attribute does not 2-way sync once the property is set or a user sets a value.
Some web components may have edge-cases where an attribute-only handler is necessary (aria-*, maybe).
Attributes with dashes (my-property) reflected to camel-cased props (myProperty). What is the behaviour here? Probably fine to not worry about this case because the consumer can just use <x-element myProperty={something} />.
Attributes with the same name as the property. What happens if the property is only a getter (no set() or writable: false)? There's no way for the consumer to prefer the attribute. Maybe this is something that is enforced; that the component author must provide a setter or the consumer has to <x-element ref={e => e.setAttribute('some', 'value')} />.
Would this behaviour be applied to custom elements only and how would this be detected if so?
Something like the following might be a little bit more robust:

Object.keys(props).forEach(name => {
  if (name in element) {
    // You might also need to ensure that it's a custom element because of point 1.
    element[name] = props[name];
  } else {
    doWhatReactNormallyDoesWithAttributes();
  }
});
Brainstorming just in case. Overall, I tend to agree with you that it'd be fine for React to just do Object.assign(). It seems like there are ways for the consumer to get around any potential design problems with the component they'd be using.

Maybe there is still hope to change the Web Components ecosystem to prefer that - and indeed React promoting that style would perhaps help.
I sure hope so. I'm trying to and I know the Polymer team is trying to, as well. I think if React did do this, that it'd be a massive help, too.


A problem with properties, attributes, events and children is that you have to know which one to use so you end up with heuristics or explicit namespaces. I don't think explicit namespaces is very ergonomic.

Properties are more powerful than attributes because:

Properties can have rich data types. E.g. boolean for checked or complex objects like style. Typed CSSOM will let us have specific data types for individual style properties too.

In HTML, properties can always control and represent the current visible state of an element. Whenever they diverge, properties is the source of truth - like in the case of HTMLInputElement's value. The only exception is that you can set progress into an indeterminate state - which is just an oversight. As @treshugart pointed out the exception to this is mostly random things added carelessly outside of the normal process - such as RDF or custom elements built by third parties. SVG does have some properties that can't be set in the normal way, but usually you can do that using style instead which are just nested normal properties. These are edge cases that can be dealt with by a library like React DOM that knows about these.

Properties have the benefit that they can be reflected over. You can't detect if an attribute or event is accepted or not because they're all accepted so you can't add runtime warnings for wrong attribute names. You can also use that for workarounds, e.g. fallback to something else if a property is not available.

So if we only had one, I'd prefer it to be properties.

That leaves events. If we use a heuristic, that affects performance negatively since we have to create mappings for it at runtime. It also means that we're claiming a whole namespace. It means that custom elements can't provide an onFoo property if they wanted to. For example, with infinite scrolls there's a pattern like onCreateRow that isn't just a simple a event but a callback that's invoked to create a row for a particular index.

I think that would be unfortunate to claim a whole namespace prefix or type when the precedence of element.onclick = fn is a much simpler model.

Of course, that will still leave us "children" as special but that's kind of a unique property of React that children of components can be any type of value so we'll have to concede that one constrained special case.


I took a stab at implementing the model discussed above. @sebmarkbage can you let me know if this matches your thinking?

class XCheckbox extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this._onclick);
  }
  disconnectedCallback() {
    this.removeEventListener('click', this._onclick);
  }
  _onclick(e) {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('checkchanged', {
      detail: { checked: this.checked }, bubbles: false
    }));
  }
  set oncheckchanged(fn) {
    this.removeEventListener('checkchanged', this._oncheckchanged);
    this._oncheckchanged = fn;
    this.addEventListener('checkchanged', this._oncheckchanged);
  }
  get oncheckchanged() {
    return this._oncheckchanged;
  }
  set checked(value) {
    this._checked = value;
    value ? this.setAttribute('checked', '') : this.removeAttribute('checked');
  }
  get checked() {
    return this._checked;
  }
}
customElements.define('x-checkbox', XCheckbox);

const props = {
  checked: true,
  oncheckchanged: function(e) {
    console.log('oncheckchanged called with', e);
  }
};
const customCheckbox = document.createElement('x-checkbox');
Object.assign(customCheckbox, props);
document.body.appendChild(customCheckbox);
One concern is that element authors have to opt-in to defining a setter to expose a handler for every event that they dispatch. That may end up bloating the elements, especially if they have a variety of events that they expose. Having React do element.addEventListener(propName, props[propName], false) might make element author's lives a bit easier. Just speaking personally, knowing the trade off between an event name heuristic and having to define setters for everything, I'd choose the heuristic.


//array diff
function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
};

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


//remove dunplicate items
uniqueArray = a.filter(function(item, pos) {
    return a.indexOf(item) == pos;
})
Basically, we iterate over the array and, for each element, check if the first position of this element in the array is equal to the current position. Obviously, these two positions are different for duplicate elements.

Using the 3rd ("this array") parameter of the filter callback we can avoid a closure of the array variable:

uniqueArray = a.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
})
Although concise, this algorithm is not particularly efficient for large arrays (quadratic time).

Hashtables to the rescue

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
This is how it's usually done. The idea is to place each element in a hashtable and then check for its presence instantly. This gives us linear time, but has at least two drawbacks:

since hash keys can only be strings in Javascript, this code doesn't distinguish numbers and "numeric strings". That is, uniq([1,"1"]) will return just [1]
for the same reason, all objects will be considered equal: uniq([{foo:1},{foo:2}]) will return just [{foo:1}].
That said, if your arrays contain only primitives and you don't care about types (e.g. it's always numbers), this solution is optimal.

The best from two worlds

An universal solution combines both approaches: it uses hash lookups for primitives and linear search for objects.

function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}
sort | uniq

Another option is to sort the array first, and then remove each element equal to the preceding one:

function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}
Again, this doesn't work with objects (because all objects are equal for sort). Additionally, we silently change the original array as a side effect - not good! However, if your input is already sorted, this is the way to go (just remove sort from the above).

Unique by...

Sometimes it's desired to uniquify a list based on some criteria other than just equality, for example, to filter out objects that are different, but share some property. This can be done elegantly by passing a callback. This "key" callback is applied to each element, and elements with equal "keys" are removed. Since key is expected to return a primitive, hash table will work fine here:

function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}
A particularly useful key() is JSON.stringify which will remove objects that are physically different, but "look" the same:

a = [[1,2,3], [4,5,6], [1,2,3]]
b = uniqBy(a, JSON.stringify)
console.log(b) // [[1,2,3], [4,5,6]]
If the key is not primitive, you have to resort to the linear search:

function uniqBy(a, key) {
    var index = [];
    return a.filter(function (item) {
        var k = key(item);
        return index.indexOf(k) >= 0 ? false : index.push(k);
    });
}
or use the Set object in ES6:

function uniqBy(a, key) {
    var seen = new Set();
    return a.filter(item => {
        var k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}
(Some people prefer !seen.has(k) && seen.add(k) instead of seen.has(k) ? false : seen.add(k)).

Libraries

Both underscore and Lo-Dash provide uniq methods. Their algorithms are basically similar to the first snippet above and boil down to this:

var result = [];
a.forEach(function(item) {
     if(result.indexOf(item) < 0) {
         result.push(item);
     }
});
This is quadratic, but there are nice additional goodies, like wrapping native indexOf, ability to uniqify by a key (iteratee in their parlance), and optimizations for already sorted arrays.

If you're using jQuery and can't stand anything without a dollar before it, it goes like this:

  $.uniqArray = function(a) {
        return $.grep(a, function(item, pos) {
            return $.inArray(item, a) === pos;
        });
  }
which is, again, a variation of the first snippet.

Performance

Function calls are expensive in Javascript, therefore the above solutions, as concise as they are, are not particularly efficient. For maximal performance, replace filter with a loop and get rid of other function calls:

function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}
This chunk of ugly code does the same as the snippet #3 above, but an order of magnitude faster:

Show code snippet

ES6

ES6 provides the Set object, which makes things a whole lot easier:

function uniq(a) {
   return Array.from(new Set(a));
}
or

let uniq = a => [...new Set(a)];
Note that, unlike in python, ES6 sets are iterated in insertion order, so this code preserves the order of the original array.

However, if you need an array with unique elements, why not use sets right from the beginning?






4.
this.props.dispatch() doesn't guarantee that you will have proper values in this.props.pets_options immediately after dispatch call. If you want to do something with new props values you have to use componentWillReceiveProps lifecycle method.

componentWillReceiveProps(nextProps) {
    this.setState({pets_options: nextProps.pets_options})
}
//不能立即生效
handleClick(index,rks){
    if(index == 1){
      let itemsToDo = this.check.check(this.props.itemsToDo);
      if(!itemsToDo.length){
        message.info('不存在分项工程');
        return ;
      }
      if(!rks.length){
        message.info('请选择分项工程');
        return ;
      }
      let v = [];
      rks.map((val)=>{
        v.push(itemsToDo[val]);
      });
      this.props.onFilterItemTodo(v);
      //console.log(this.props);
      
      this.updateList(v);
      this.setState({current:1});
    }
    else{

    }
  }
  updateList(v){

    let itemsToDo = v ? v : this.check.check(this.props.filteredItemsTodo);
    this.check.pArrHelper(itemsToDo,'wp',Api,'getCode',true).then((val)=>{
      //console.log(val);
      let res = [];
      val.map((item)=>{
        res = res.concat(this.check.dataFormat(item.children_wp,false,false,`${item.code} ${item.name}/${item.pk}`,item.related_documents));
      });
      //console.log("res",res);
      this.props.onSetItemsToDoChildren(res);
    });
  }


//remove duplicate items with same prop in an array
uniq(a,prop) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for(var i = 0; i < len; i++) {
       var propVal = a[i][prop];
       if(seen[propVal] !== 1) {
             seen[propVal] = 1;
             out[j++] = a[i];
       }else{
          out.map((val)=>{
            if(val[prop] == propVal)
              val.quantity = Number(val.quantity) + Number(a[i].quantity);
            return val;
          });
       }
  }
  return out;
}

//reducer,actions应该把某一类操作写在一起,如设置数据,增删改查
case SET_DATA:
  switch(action.name){
    case 'partData':
    return state.set('partData',action.data);
    break;
    case 'divData':
    return state.set('divData',action.data);
    break;
    case 'cellData':
    let tmpArr = [];
    action.data.map((dat)=>{
      tmpArr = tmpArr.concat(dat.children_wp);
    });
    tmpArr.map((val)=>{
      val.key = val.pk+"/"+val.code+"/"+val.name;
      return val;
    });
    let cellToSelState = state.set('cellToSel',tmpArr);
    return cellToSelState.set('cellData',action.data);
    default:
    return state;
    break;
  }


  //event pass
  class TableManagementView extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      data:data,
      selectedRowKeys:[],
      show:false,
    }
    var saveTable = document.createEvent('Event');
    saveTable.initEvent('tableSaveClick', true, false);
    window.saveTable = saveTable;
  }
  handleSave(){
    document.dispatchEvent(window.saveTable);
  }
  componentWillUnmount(){
    //remove event
  }
    componentWillMount(){

    }
    componentWillReceiveProps(nextProps){
      if(nextProps.params.id!=this.props.params.id){
      this.setState({show:false});
      }
    }
  onSelectChange(selectedRowKeys) {
      this.setState({ selectedRowKeys }); 
  }
  showList(){
    this.setState({show:true});
  }
  hideList(){
    this.setState({show:false});
  }
  deleteRow(record){
        let index=this.state.data.indexOf(record);
     
        if(index!=null&&index!=undefined){
            this.state.data.splice(index,1);
            this.state.data.map((item,i)=>{
                item.key=i+1;
                item.index=i+1;
              }
            ); 
        }
        this.forceUpdate();
  }
  render() {
    const columns= [
      {
        title: '序号',
        dataIndex: 'index',
        width:60
      },{
        title: '编号',
        dataIndex: 'code',
        width:200
      }, {
        title: '表格名称',
        dataIndex: 'name',
          render: (text,item) => <span title={text}>{text}</span>,

      }, {
          title: '',
            render: (text,record) =>
            <Popconfirm title="确定要删除这个表单吗？" onConfirm={this.deleteRow.bind(this,record)}>
                <a title='删除'> <Icon type="delete" ></Icon></a>
            </Popconfirm> ,
        width:150
      }
    ];
    const { selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange.bind(this),
      };
    return (
      <div>
        <div className={styles[this.state.show!=true?'show':'hide']}>
            <h3>{this.props.params.id}</h3>
          <Affix  offsetTop={20} target={() => document.getElementById('affix-target')}>
            <div style={{float:'right',marginRight:5}}>
              <Badge dot >
                <Button onClick={this.showList.bind(this)} title='显示提交列表' style={{border: '1px solid #41addd',fontSize:18,color: '#57c5f7',float:'right',marginRight:8}} shape="circle" icon="bars" />
              </Badge>
            </div>
            <Button title='添加到提交列表' style={{border: '1px solid #41addd',fontSize:18,color: '#57c5f7',float:'right',marginRight:8}} shape="circle" icon="plus-square-o" ></Button>
            <Button title='保存' onClick={()=>this.handleSave()} style={{border: '1px solid #41addd',fontSize:18,color: '#57c5f7',float:'right',marginRight:8}} shape="circle" icon="save" />
          </Affix>
              <UpdatedQualityCheckContent />
        </div>
        <div  className={styles[this.state.show==true?'show':'hide']}>
            <h3>{'表单批处理'}</h3>
          <Button onClick={this.hideList.bind(this)} title='返回表单填写' style={{border: '1px solid #41addd',fontSize:18,color: '#57c5f7',float:'right',marginRight:30,marginBottom: 20}} shape="circle" icon="rollback" />
          <Table style={{clear:'both',marginTop:20}}  bordered rowSelection={rowSelection} columns={columns} dataSource={this.state.data} pagination={false} scroll={{y: 430 }} size='middle'/>
          <div style={{bottom:-80,position: 'relative'}}>
            <FlowInfo  bToProcessData={1}/>
          </div>
        </div>
      </div>
    );
  }
}

class QualityCheckContent extends Component{
    constructor(props) {
        super(props);
        this.check = new CheckObj();
        this.state = {
            tabIndex:"14",
            suffix:"",
            isOPenListBox:true,
            isShowPDF:false,
            url:"",
        };
        this.tableSaveClick = this.tableSaveClick.bind(this);
        document.addEventListener("tableSaveClick",this.tableSaveClick,false);
    }
    handleClick(e){
        console.log(e);
        let str = e.name.slice(-1),
            suffix = "";
        if(Number(str)){
            if(e.state[Number(str)-1]==2){
                message.info("该质量表单已被创建!");
                return;
            }
            suffix = str;
        }
        this.setState({
            tabIndex:e.serial_code,
            isOPenListBox: false,
            suffix:suffix
        });
    }
    tableSaveClick(){
        console.log('here...');
    }
    //.....
}


/*event parameters

If you make "x" a global variable, it will solve your problem. Perhaps you are looking for event.detail

new CustomEvent('eventName', {'detail': data})
Instead of data use x and in event listenener you can access x using event.detail
*/
function getSelectionBounds() {
  var x =(bounds["x"].toFixed(2));
 var y=  "xyz";
  var selectionFired = new CustomEvent("selectionFired",{ "detail": {"x":x,"y":y }});

  document.dispatchEvent(selectionFired);
};

document.addEventListener("selectionFired", function (e) {
  alert(e.detail.x+"   "+e.detail.y);
});


Yes, you can use a MessageEvent or a CustomEvent.

Example usage:

//Listen for the event
window.addEventListener("MyEventType", function(evt) {
    alert(evt.detail);
}, false);

//Dispatch an event
var evt = document.createEvent("CustomEvent");
evt.initCustomEvent("MyEventType", true, true, "Any Object Here");


//nUsed会取到之前pArr里所有的value并组成一个数组
Promise.all(pArr).then((nUsed)=>{
  console.log("tmpArr",tmpArr,nUsed);
  this.setState({dataSource:tmpArr});    
});