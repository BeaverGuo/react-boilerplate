if(flow.hasOwnProperty("history")){
	moment.locale('zh-CN');
	let len = flow.history.length;
	if(len>=2){
		if(flow.history[len-2].records[0]){
			note1 = flow.history[len-2] ? (flow.history[len-2].records[0].hasOwnProperty("note") ? flow.history[len-2].records[0].note : "") : "";
			apprTime1 = moment(flow.history[len-2] ? flow.history[len-2].records[0].log_on : "").format('YYYY-MM-DD hh:mm:ss');
		}
	}
	if(len>=3){
		if(flow.history[len-3].records[0]){
			note2 = flow.history[len-3] ? (flow.history[len-3].records[0].hasOwnProperty("note") ? flow.history[len-3].records[0].note : "") : "";
			apprTime2 = moment(flow.history[len-3] ? flow.history[len-3].records[0].log_on : "").format('YYYY-MM-DD hh:mm:ss');
		}
	}
	if(len>=4){
		if(flow.history[len-3].records[0]){
			note3 = flow.history[len-4] ? (flow.history[len-4].records[0].hasOwnProperty("note") ? flow.history[len-4].records[0].note : "") : "";
			apprTime3 = moment(flow.history[len-4] ? flow.history[len-4].records[0].log_on : "").format('YYYY-MM-DD hh:mm:ss');
		}
	}
}




//reverse
if(this.check.bIsNotEmpty(flow)){
			
	if(flow.hasOwnProperty("history")){
		moment.locale('zh-CN');
		let history = fromJS(flow.history);
		history = history.toJS();
		history.reverse();
		//console.log("ffff",history);
		if(history[1] && history[1].records[0]){
			note1 = history[1] ? history[1].records[0].note : "";
			apprTime1 = moment(history[1] ? history[1].records[0].log_on : "").format('YYYY-MM-DD a hh:mm:ss ');
		}
		if(history[2] && history[2].records[0]){
			note2 = history[2] ? history[2].records[0].note : "";
			apprTime2 = moment(history[2] ? history[2].records[0].log_on : "").format('YYYY-MM-DD a hh:mm:ss ');
		}
		if(history[3] && history[3].records[0]){
			note3 = history[3] ? history[3].records[0].note : "";
			apprTime3 = moment(history[3] ? history[3].records[0].log_on : "").format('YYYY-MM-DD a hh:mm:ss ');
		}
	}
}



componentWillReceiveProps(nextProps){
	console.log(nextProps);
	let history = [];
	if(nextProps.flow.hasOwnProperty("history")){
		history = fromJS(nextProps.flow.history);
		history = history.toJS();
		history.reverse();
	}
	let workflow = nextProps.flow.workflow;
	let current = nextProps.flow.current;
	let delegate,
	currentFlowUser;
	if(current){
		delegate = (current.executors[0].delegate_on != null);
		currentFlowUser = delegate ? JSON.parse(current.executors[0].delegate_to.executor_json) : JSON.parse(current.executors[0].executor_json);
	}
	let items = [];
	history.map( (item,index) => {
		this.getNames(item).then((val)=>{
			let itemStatus = item.status;
			if(itemStatus == 0 && current.executors[0].id && this.check.checkUser(currentFlowUser.user_id)){
				items.push(<StateWIP step={item} options={nextProps.options} workflow={workflow} currentSeq={nextProps.currentSeq} delegate={delegate} handleSubmit={this.handleSubmit} handleReject={this.handleReject} handleDelegate={this.handleDelegate} />);
			}
			else if(itemStatus == 0)
			{
				items.push(<StateWillDo options={nextProps.options} workflow={workflow.states[item.state.sequence]} currentSeq={nextProps.currentSeq} />);
			}
			else if(itemStatus == 1){
				items.push(<StateFinished perInfo={val} options={nextProps.options} step={item} workflow={workflow} currentSeq={nextProps.currentSeq} />);
			}
			else if(itemStatus == 2){
				items.push(<StateRejected perInfo={val} options={nextProps.options} step={item} workflow={workflow} currentSeq={nextProps.currentSeq} />);
			}
			else{
			}
			
			
		});
		
	});
	if(current)
		for(let i=current.sequence+1; i< workflow.states.length; i++){
			items.push(<StateWillDo workflow={workflow.states[i]} />);
		}
	this.setState({items:items});
}



getNames(data){
	if(data.records.length){
		let perData = JSON.parse(data.records[0].participant.executor_json);
		let perPK = "";
		let perName = "";
		let perOrg = "";
		const p2 = new Promise((resolve, reject) => {
			this.check.getUser(perData.user_id).then((val)=>{
				perOrg = val.account.organization;
				perName = val.account.person_name;
				resolve({perName,perOrg});
			});
		});
		return p2;
	}
	else{
		const p2 = new Promise((resolve, reject) => {
			resolve({perName:"",perOrg:""});
		});
		return p2;
	}
	
}






//momentjs
<Option value={`${moment().format().slice(0,4)}年1季度`}>{`${moment().format().slice(0,4)}年1季度`}</Option>

并不是没有卸载，而是执行一个异步方法的回掉函数时，对应的组件已经卸载掉了，所以会出现上述提示。
解决的办法是在回调函数中使用this.isMounted检查组件是否仍处于加载状态，再使用 setState 进行操作

shouldComponentUpdate: function(nextProps, nextState) {
  return nextProps.id !== this.props.id;
}

componentDidMount() {
    this.mounted = true;
}

componentWillUnmount() {
    this.mounted = false;
}





/*addEventListener
A few things:

Most people will suggest something like var self = this because it's fast and easy.
But var self = this does not separate the view object entirely from the view logic, which coming from a more formal C# background and looking at your code, sounds like something you want to do.
In order to have the callback execute only when the event fires, wrap the handler in a function, so that it's evaluated right away, but only executed when and if a keydown event fires (see the code below).
Understanding scope in JS: Whatever the execution context is, is also the current scope. Your listener was added in a method (called listen) on Keyboard.prototype, but the keydown event is actually fired on window -- the handler is executing in a different context than where it was defined; it's executing within the context of what is invoking it, in this case, window, so it's scoped to window unless you bind it to another object via bind or apply when it's defined.
In your code, window is the view a user's interacting with, and Keyboard is that view's controller. In MVC patterns like what you're probably used to in C#/.NET, views don't tell themselves what to do when things happen, controllers tell views what to do. So, if you were to assign a reference to the controller by using var self = this like so many do, the view would be managing itself -- but only for that specific handler for keydown events. This is inconsistent and would become hard to manage in a large project.

A solution:

Keyboard.prototype.listen = function() {
    window.addEventListener('keydown', function(e) {
        this.handle_keydown(e);
    }.bind(this), false);
}
A better solution:

Keyboard.prototype.view = window;

Keyboard.prototype.listen = function() {
    this.view.addEventListener('keydown', function(e) {
        this.handle_keydown(e);
    }.bind(this), false);
}
The best solution (until ES6 class is ready):

// define
function addViewController(view) {

    function ViewController() {

        this.handle_keydown = function(args) {
            // handle keydown events
        };

        this.listen = function() {
            this.view.addEventListener('keydown', function(e) {
                this.handle_keydown(e);
            }.bind(this), false);
        };

        this.view = view;
        return this;

    }

    return new ViewController(view);

}

// implement
var keyboard = addViewController(window);
keyboard.listen();
Note: .bind() is compatible with ECMAScript 5+; if you need a solution for older browsers, Mozilla has posted a great alternative to .bind() using functions and .call():
https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind

Edit: Here's what your instantiated keyboard object will look like using this new, modular solution: enter image description here







/*注册事件的方法
BasePage的组件constructor里面init一个事件并把其放置到window里面然后在模型那边的script里面
dispatch这个事件
*/

//模态框里加事件
connectPer(record){
	let request = new DataService(),
	self = this;
	self.setState({showModal:true,curRoleId:record.id});
	request.getRoleMember(record.id).then(function(data){
			console.log(data.members);
			let a = document.querySelector(".anticon-filter");
			a.addEventListener("click",self.changeStyle.bind(self),false);
			let tmpArr = [];
			data.members.map((val)=>{
				tmpArr.push(val.id);
			});
			self.setState({curMember:data,selectedRowKeys1:tmpArr});
		},function(msg){
			let a = document.querySelector(".anticon-filter");
			a.addEventListener("click",self.changeStyle.bind(self),false);
			console.log(msg);
	});
	

}

changeStyle(){
    setTimeout(()=>{
        let a = document.querySelector(".ant-table-filter-dropdown ul");
        a.style.height = "600px";
        a.style.overflow = "auto";
    },90);
    
}


componentWillUnmount(){
    let a = document.querySelector(".anticon-filter"),
    self = this;
    a.removeEventListener('click', self.changeStyle.bind(self),false);
}



//componentWillReceiveProps在redux收到props后不会更新,props已经传了但是不执行willReceiveProps

//不用Promise.all的解决方式
for(let i = 0, length = history.length; i < length ; i++ ){
	if(history[i].records.length <= 0){
		continue;
	}
	let personData = JSON.parse(history[i].records[0].participant.executor_json);
	let personPK = "";
	let personName = "";
	let personOrg = "";
	if(users.hasOwnProperty[personData.user_id])
	{
		continue;
	}
	users[personData.user_id] = {status:"loading"};
	this.check.getUser(personData.user_id).then((val)=>{
		personPK = val.account.person_id;
		personName = val.account.person_name;
		personOrg = val.account.organization;

		users[personData.user_id] = {
			status: "got",
			perPK: personPK,
			perName: personName,
			perOrg: personOrg
		};
		if(this.checkUser(users)){
			//console.log('载入完毕！', users);
			this.setState({users: users});
		}
	});
}


//flow person backup
//console.log("here");
/*let curUsr = JSON.parse(sessionStorage.getItem("userInfo"));
let fillper = JSON.parse(flow.workflow.states[0].participants[0].executor_json),
	seq1per = JSON.parse(flow.workflow.states[1].participants[0].executor_json),
	seq2per = JSON.parse(flow.workflow.states[2].participants[0].executor_json),
	seq3per = JSON.parse(flow.workflow.states[3].participants[0].executor_json);
if(flow.workflow.states[1].participants[0].delegate_to){
	seq1per = JSON.parse(flow.workflow.states[1].participants[0].delegate_to.executor_json);
}
if(flow.workflow.states[2].participants[0].delegate_to){
	seq2per = JSON.parse(flow.workflow.states[2].participants[0].delegate_to.executor_json);
}
if(flow.workflow.states[3].participants[0].delegate_to){
	seq3per = JSON.parse(flow.workflow.states[3].participants[0].delegate_to.executor_json);
}
self.setState({
	id:flow.id,
	fillPerId:curUsr.id,
	seq1perId:seq1per.user_id,
	seq2perId:seq2per.user_id,
	seq3perId:seq3per.user_id,
});
//console.log(fillper.user_id);
this.check.getUser(fillper.user_id).then((val)=>{
	//console.log(val);
	self.setState({
		fillPerName:val.account.person_name,
	});
});
let per1Pk = '',
	per2Pk = '',
	per3Pk = '';
this.check.getUser(seq1per.user_id).then((val)=>{
	//console.log(val);
	per1Pk = val.account.person_id;
	self.setState({
		seq1PerName:val.account.person_name,
	});
}).then((cur)=>{
	this.check.getUserInfo(per1Pk).then((dat)=>{
		//console.log("ppppp",dat);
		self.setState({
			seq1PerOrg:dat.organisation.name,
		});
	});
}).catch((err)=>{
	console.log("error",err);
});

this.check.getUser(seq2per.user_id).then((val)=>{
	//console.log(val);
	per2Pk = val.account.person_id;
	self.setState({
		seq2PerName:val.account.person_name,
	});
}).then((cur)=>{
	this.check.getUserInfo(per2Pk).then((dat)=>{
		//console.log("ppppp",dat);
		self.setState({
			seq2PerOrg:dat.organisation.name,
		});
	});
}).catch((err)=>{
	console.log("error",err);
});

this.check.getUser(seq3per.user_id).then((val)=>{
	//console.log(val);
	per3Pk = val.account.person_id;
	self.setState({
		seq3PerName:val.account.person_name,
	});
}).then((cur)=>{
	this.check.getUserInfo(per3Pk).then((dat)=>{
		//console.log("ppppp",dat);
		self.setState({
			seq3PerOrg:dat.organisation.name,
		});
	});
}).catch((err)=>{
	console.log("error",err);
});*/


//用promise api的方法
	if(this.check.bIsNotEmpty(flow)){
		let fillper = JSON.parse(flow.workflow.states[0].participants[0].executor_json),
			users = {},
			history = [],
			promArr = [],
			self = this;
		if(flow.hasOwnProperty("history")){
			history = fromJS(flow.history);
			history = history.toJS();
			history.reverse();
		}
		for(let i = 0, length = history.length; i < length ; i++ ){
			if(history[i].records.length <= 0){
				continue;
			}
			let personData = JSON.parse(history[i].records[0].participant.executor_json),
				personPK = "",
				personName = "",
				personOrg = "";
			if(users.hasOwnProperty[personData.user_id])
			{
				continue;
			}
			let p = this.check.getUser(personData.user_id);
			promArr.push(p);
			p.then((val)=>{
				personPK = val.account.person_id;
				personName = val.account.person_name;
				personOrg = val.account.organization;
				users[personData.user_id] = {
					status: "got",
					perPK: personPK,
					perName: personName,
					perOrg: personOrg
				};
			});
		}
		let p1 = this.check.getUser(fillper.user_id),
		p2 = personApi.getListByOrgCodes(codes),
		fillPerName = "",
		options = "";
		promArr.push(p1);
		promArr.push(p2);
		p1.then((val)=>{
			fillPerName = val.account.person_name;
		});
		p2.then((orgs) => {
		   	options = orgs;
		}).catch((err) => {
		    message.error(err);
		});
		Promise.all(promArr).then((val)=>{
			self.setState({users:users,fillPerName:fillPerName,options:options});
		});
	}
}


//质量表单备份
	if(this.check.bIsNotEmpty(flow)){
		//console.log("here");
		let curUsr = JSON.parse(sessionStorage.getItem("userInfo"));
		let fillper = JSON.parse(flow.workflow.states[0].participants[0].executor_json),
			seq1per = JSON.parse(flow.workflow.states[1].participants[0].executor_json),
			seq2per = JSON.parse(flow.workflow.states[2].participants[0].executor_json),
			seq3per = JSON.parse(flow.workflow.states[3].participants[0].executor_json),
			seq4per = JSON.parse(flow.workflow.states[4].participants[0].executor_json),
			delper = "";

		if(flow.workflow.states[1].participants[0].delegate_to){
			seq1per = JSON.parse(flow.workflow.states[1].participants[0].delegate_to.executor_json);
		}
		if(flow.workflow.states[2].participants[0].delegate_to){
			seq2per = JSON.parse(flow.workflow.states[2].participants[0].delegate_to.executor_json);
		}
		if(flow.workflow.states[3].participants[0].delegate_to){
			seq3per = JSON.parse(flow.workflow.states[3].participants[0].delegate_to.executor_json);
		}
		if(flow.workflow.states[4].participants[0].delegate_to){
			seq4per = JSON.parse(flow.workflow.states[4].participants[0].delegate_to.executor_json);
		}

		if(flow.current.executors[0].delegate_to){
			delper = JSON.parse(flow.current.executors[0].delegate_to.executor_json);
		}
		self.setState({
			id:flow.id,
			fillPerId:curUsr.id,
			seq1perId:seq1per.user_id,
			seq2perId:seq2per.user_id,
			seq3perId:seq3per.user_id,
			seq4perId:seq4per.user_id,
			delper:delper.user_id,
		});
		//console.log(fillper.user_id);
		this.check.getUser(fillper.user_id).then((val)=>{
			console.log(val);
			self.setState({
				fillPerName:val.account.person_name,
			});
		});
		let per1Pk = '',
			per2Pk = '',
			per3Pk = '',
			per4Pk = '';
		this.check.getUser(seq1per.user_id).then((val)=>{
			//console.log(val);
			per1Pk = val.account.person_id;
			self.setState({
				seq1PerName:val.account.person_name,
			});
		}).then((cur)=>{
			this.check.getUserInfo(per1Pk).then((dat)=>{
				//console.log("ppppp",dat);
				self.setState({
					seq1PerOrg:dat.organisation.name,
				});
			});
		}).catch((err)=>{
			console.log("error",err);
		});

		this.check.getUser(seq2per.user_id).then((val)=>{
			console.log(val);
			per2Pk = val.account.person_id;
			self.setState({
				seq2PerName:val.account.person_name,
			});
		}).then((cur)=>{
			this.check.getUserInfo(per2Pk).then((dat)=>{
				//console.log("ppppp",dat);
				self.setState({
					seq2PerOrg:dat.organisation.name,
				});
			});
		}).catch((err)=>{
			console.log("error",err);
		});

		this.check.getUser(seq3per.user_id).then((val)=>{
			//console.log(val);
			per3Pk = val.account.person_id;
			self.setState({
				seq3PerName:val.account.person_name,
			});
		}).then((cur)=>{
			this.check.getUserInfo(per3Pk).then((dat)=>{
				//console.log("ppppp",dat);
				self.setState({
					seq3PerOrg:dat.organisation.name,
				});
			});
		}).catch((err)=>{
			console.log("error",err);
		});

		this.check.getUser(seq4per.user_id).then((val)=>{
			//console.log(val);
			per4Pk = val.account.person_id;
			self.setState({
				seq4PerName:val.account.person_name,
			});
		}).then((cur)=>{
			this.check.getUserInfo(per4Pk).then((dat)=>{
				//console.log("ppppp",dat);
				self.setState({
					seq4PerOrg:dat.organisation.name,
				});
			});
		}).catch((err)=>{
			console.log("error",err);
		});
		console.log('============ 开始载入用户 ===========');
		console.log(flow);

		let users = {};

		let history = [];
		if(flow.hasOwnProperty("history")){
			history = fromJS(flow.history);
			history = history.toJS();
			history.reverse();
		}
		console.log('============ 开始载入用户 ===========');
		for(let i = 0, length = history.length; i < length ; i++ ){
			if(history[i].records.length <= 0){
				continue;
			}
			let personData = JSON.parse(history[i].records[0].participant.executor_json);
			let personPK = "";
			let personName = "";
			let personOrg = "";
			if(users.hasOwnProperty[personData.user_id])
			{
				continue;
			}
			users[personData.user_id] = {status:"loading"};
			this.check.getUser(personData.user_id).then((val)=>{
				personPK = val.account.person_id;
				personName = val.account.person_name;
				personOrg = val.account.organization;

				users[personData.user_id] = {
					status: "got",
					perPK: personPK,
					perName: personName,
					perOrg: personOrg
				};
				if(this.checkUser(users)){
					console.log('载入完毕！', users);
					this.setState({users: users});
				}
			});
		}

	}

	personApi.getListByOrgCodes(codes).then((orgs) => {
	   	this.setState({options:orgs});
	    }).catch((err) => {
	        message.error(err);
	    }
    );



componentWillReceiveProps(nextProps,nextState){
    let userTask = nextProps.userTask,
      executing = [],
      completed = [],
      future = [],
      delegate = [];
      
    userTask = this.check.checkObj(userTask);
    data[0]['children'] = formatHelper(userTask.executing,nextState);//这里用了state导致任务树还是上一次的数据，要用nextState
    data[1]['children'] = formatHelper(userTask.completed,nextState);
    data[2]['children'] = formatHelper(userTask.future,nextState);
    data[3]['children'] = formatHelper(userTask.delegate,nextState);
   //console.log("ds",dataSource);
    this.setState({dataSource:data});
}