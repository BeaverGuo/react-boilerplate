## 大模块（big module）思想

### 大模块概念

>大模块思想是指基于业务大模块的概念，将系统分为几大业务模块，在涉及数据共有程度较高时，页面数据存储在同一个数据中心，例如，基于[winterfall](https://github.com/ecidi/winterfall)框架开发时，将部分Store数据逻辑+所有子页面构成一个大模块，即[winterfall V2.0.0](https://github.com/ecidi/winterfall/tree/v2.0.0)采用的框架结构；

### 大模块思想的缘由

>V2.0.0之前的结构是 page component 嵌套 page component的方式，就是说，整体的划分基本上是页面嵌套页面的方式，这种方式有个问题是，sagas数据层是服务于某个页面的，当需求变更后，页面的嵌套方式发生改变，起数据的依赖关系会发生比较大的变化，在这种模式下，维护不是很方便，比较这次需求变化，之前存在类似项目列表的页面，现在去掉了，我需要把原来列表也的数据都作用到详情页面上，改动其实比较大。另外一个问题。摸索过的几个实践，笔者认为最好的事，几个页面从属于一个业务模块的，这个业务模块相关的数据层也直接从属于一个业务模块，这个模块内的几个页面可以随时共享数据。直接刷新里面的页面，也不用关心外层页面的依赖关系和数据加载顺序问题。

### Modules结构

 - Modules/：页面大模块，包含几大业务模块；  
   + Index/：首页模块；
     - Images/：图片目录；  
     - Pages/： 模块内容汇总；  
         * IndexPage/：页面子模块，可通过url单独导航到；  
              * index.js：默认内容；  
              * styles.css：默认样式；  
              * selectors.js：所有从store中获取内容的函数；  
     - Store/: 数据流页面，数据存储及流转等过程；  
         + action.js：所有的action函数（Redux）；  
         + actionType.js：所有的actionType定义（Redux）；  
         + reducer.js：所有store变动函数（Redux）；  
         + sagas.js：所有saga函数，主要是和fetch进行配合； 
  + Task/：任务操作模块  

### 大模块下子页面数据组织和流转过程

![image](https://github.com/ecidi/winterfall/blob/master/docs/images/winterfall-big-module.png) 


