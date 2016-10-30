1.redux code

// connect() is a function that injects Redux-related props into your component.
// You can inject data and callbacks that change that data by dispatching actions.
function connect(mapStateToProps, mapDispatchToProps) {
  // It lets us inject component as the last step so people can use it as a decorator.
  // Generally you don't need to worry about it.
  return function (WrappedComponent) {
    // It returns a component
    return class extends React.Component {
      render() {
        return (
          // that renders your component
          <WrappedComponent
            {/* with its props  */}
            {...this.props}
            {/* and additional props calculated from Redux store */}
            {...mapStateToProps(store.getState(), this.props)}
            {...mapDispatchToProps(store.dispatch, this.props)}
          />
        )
      }
      
      componentDidMount() {
        // it remembers to subscribe to the store so it doesn't miss updates
        this.unsubscribe = store.subscribe(this.handleChange.bind(this))
      }
      
      componentWillUnmount() {
        // and unsubscribe later
        this.unsubscribe()
      }
    
      handleChange() {
        // and whenever the store state changes, it re-renders.
        this.forceUpdate()
      }
    }
  }
}

// This is not the real implementation but a mental model.
// It skips the question of where we get the "store" from (answer: <Provider> puts it in React context)
// and it skips any performance optimizations (real connect() makes sure we don't re-render in vain).

// The purpose of connect() is that you don't have to think about
// subscribing to the store or perf optimizations yourself, and
// instead you can specify how to get props based on Redux store state:

const ConnectedCounter = connect(
  // Given Redux state, return props
  state => ({
    value: state.counter,
  }),
  // Given Redux dispatch, return callback props
  dispatch => ({
    onIncrement() {
      dispatch({ type: 'INCREMENT' })
    }
  })
)(Counter)




//flow promise problem
//提交流程helper funciton
    flowHelper(divdat,name,pk0,pk1,pk2,bIsThree,FTindex,pkArr,pk3){
      let FT,
        curUsr = JSON.parse(sessionStorage.getItem("userInfo")),
        promiseArr = [];
      switch(FTindex){
        case 1:
        promiseArr = this.changeFlowStatus(pkArr);
        FT = ft.unitProjFlow;
        break;
        case 2:
        promiseArr = this.changeFlowStatus1(pkArr);
        FT = ft.processFlow;
        break;
        case 3:
        promiseArr = this.changeFlowStatus2(pkArr);
        FT = ft.processFlow;
            break;
        case 4:
        promiseArr = this.changeFlowStatus3(pkArr);
        FT = ft.qualityTableFlow;
            break;
            case 5:
            promiseArr = this.changeFlowStatus4(pkArr);
            FT = ft.yearPlanFlow;
            break;
            case 6:
            promiseArr = this.changeFlowStatus5(pkArr);
            FT = ft.yearPlanFlow;
            break;
            case 7:
            promiseArr = this.changeFlowStatus6(pkArr);
            FT = ft.drawingFlow;
            break;
        default:
        break;
      }
      if(typeof divdat == 'string'){
        if(!pk0 || !pk1){
          message.info('请选择人员！');
          return;
        }
      //submit to flow
      let data = {
          id:divdat,
          name:name,
          description: "",
          subject:pkArr
        };

      console.log(pk0,pk1,pk2);
      let executors = [[curUsr.id],[pk0],[pk1]];
      console.log(data,executors,FT);
            //let promiseArr = this.changeFlowStatus([divdat]);
            Promise.all(promiseArr).then((cur)=>{
                FlowTrans.newFlow(data,FT,executors).then((data)=>{
                    message.success("流程开启成功");
                    console.log(data);
                }).catch((err)=>{
                    message.error("流程开启失败");
                    console.log("error",err);
                });
            }).catch((err)=>{
                message.error("流程开启失败");
                console.log("error",err);
            });
      
      }
      else{
        let executors = [[curUsr.id],[pk0],[pk1]];
        if(!this.bIsNotEmpty(divdat)){
          message.info('请选择分项工程！');
          return;
        }
        if(bIsThree){
          if(!pk0 || !pk1 || !pk2){
            message.info('请选择人员！');
            return ;
          }
          executors = [[curUsr.id],[pk0],[pk1],[pk2]];
        }
        if(FTindex == 4 && !pk3){
          message.info('请选择监理人员！');
          return;
        }else{
          executors = [[curUsr.id],[pk0],[pk1],[pk2],[pk3]];
        }
          
        if(!pk0 || !pk1){
          message.info('请选择人员！');
          return;
        }
      //submit to flow
      let data = {
        id:divdat.pk,
        name:name,
        description: "",
      };
            //let promiseArr = this.changeFlowStatus(pkArr);
            return Promise.all(promiseArr).then((cur)=>{   //that's the point!!!!!!!!!!!!!
                data.subject = pkArr;
                console.log(pk0,pk1,pk2);
                console.log(data,executors);
                const p2 = new Promise((resolve, reject) => {
                    FlowTrans.newFlow(data,FT,executors).then((dat)=>{
                        message.success("流程开启成功");
                        console.log(dat);
                        resolve(dat);
                    }).catch((err)=>{
                        message.error("流程开启失败");
                        console.log("error",err);
                    });
                });
                return p2;
            }).catch((err)=>{
                message.error("流程开启失败");
                console.log("error",err);
            });
      
      }
    
    }


/*自己注册的事件需要自己进行内存管理,在render里面bind(this)后的函数是一个新的函数,不是原来的函数
在constructor里面的是原来的,这样就能释放掉原来组件绑定的事件,而不会每次render组件时找不到原来的事件
这样注册的事件会越来越多,导致内存泄漏

I had the same issue with the demo8 (draggable list) because of event listeners set up in componentDidMount().
I fixed that adding removeEventListener in componentWillUnmount()