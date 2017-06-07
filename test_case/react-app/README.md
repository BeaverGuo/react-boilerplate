
### winterfall  v 2.0.0

*—— Winter is coming*

#### 目录结构

1.  `app/`：源代码根目录；

2.  `Components/`：功能性模块，无法通过`url`单独导航到；

    1. `Button/`：模块名字，可通过`import`方式导入到实际页面；

    - `index.js`：默认内容；
    - `styles.css`：默认样式；

3.  `Modules/`：页面大模块，包含几大业务模块;

    1. `Index/`：首页模块

    - `Images/`: 图片目录；

    - `Pages/`: 页面子模块，可通过`url`单独导航到；

         - `IndexPage`:
              - `index.js`：默认内容；
              - `styles.css`：默认样式；
              - `selectors.js`：所有从store中获取内容的函数；

    - `Store`: 数据流页面，数据存储及流转等过程；

         - `action.js`：所有的action函数（Redux）；
         - `actionType.js`：所有的actionType定义（Redux）；
         - `reducer.js`：所有store变动函数（Redux）；
         - `sagas.js`：所有saga函数，主要是和fetch进行配合；

4.  `Utils/`：工具模块；

    1. `request.js`：异步请求工具；

    2. `asyncInjectors`：异步注入saga和reducer工具；

5.  `app.js`：项目总入口；

6.  `index.html`：项目主页面模板；

7.  `routes.js`：项目所有路由，配置`url`；

8.  `reducers.js`：项目基础`reducer`以及所有其他`reducer`的集合；

9.  `store.js`：项目构建store，加入所有的依赖；

10.  `docs/`：存放开发过程中产生的开发文档；

11.  `***.md`：描述信息的`markdown`文件；

12.  `server/`：`Node`服务器配置信息，用于本地研发；

13.  `.gitignore`：屏蔽`git`版本控制路径；

14.  `.eslintrc`: `ESLint` 配置文件；

15.  `package.json`：控制`npm`依赖包；

16.  `README.md`：项目基础描述信息；

17.  `webpack.base.config.js`：`webpack`基础配置信息；

18.  `webpack.dev.config.js`：`webpack`开发配置信息；

19.  `webpack.prod.config.js`：`webpack`产品配置信息；

#### 安装指令

```node
$ git clone <url>
```

```node
$ npm install
```

国内可以选择使用`cnpm`--[点击这里](https://npm.taobao.org/)

#### 项目启动

```node
$ npm run start
```

打开游览器，地址栏输入`http://localhost:8080`；

#### 项目检测

```node
$ npm run lint
```

引入 `eslint`-->[点击这里](http://eslint.cn/docs/rules/) 代码规范检测机制。

检测内容详见 `.eslintrc` 的配置，具体涵盖如下几项：

1. 箭头函数参数使用圆括号；
2. 箭头函数体使用大括号；
3. object 末尾加逗号；
4. 使用一致的缩进（暂时除去了这项检测，无法配置成'tab'，请自觉使用 tab 完成缩进）；
5. 禁止对 function 的参数进行重新赋值，参数的任何属性值变动不会报错；
6. 禁用 console，出现 console 会出警告；
7. 要求使用模板字面量而非字符串连接；
8. 要求对象字面量的简写或非简写一致性；
9. 其他详见:
   [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)、
   [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)、
   [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)、
   [eslint-plugin-redux-saga](https://github.com/pke/eslint-plugin-redux-saga)

#### Sublime ESlint 插件
1. SublimeLinter
2. SublimeLinter-contrib-eslint

#### License

[GPL](https://tldrlegal.com/license/gnu-general-public-license-v2)


#### 项目更新日志

v2.0.0

1. 为加强暂存数据的有效管理，引入大模块的概念，将原有Page的方式修改为以模块的形式
   进行组织，具体方式参见目录结构Modules部分。
2. Modules目录下包含Base、Load、Login、Index等模块，Base是基础框架模块，Load是资源
   信息加载模块，Login是用户登录和退出模块，Index是首页模块。
3. 在项目的webpack配置文件中添加了HtmlWebpackPlugin中favicon的配置项。
4. 基于winterfall 2.0版本，针对项目中可能运用插件制作了Demo，主要包括以下几个方面：
   - [Ant Design](https://ant.design/index-cn)，内容详见分支[demo_antd](https://github.com/ecidi/winterfall/tree/demo_antd)；
   - [百度地图开放API](http://lbsyun.baidu.com/index.php?title=jspopular)，内容详见分支[demo_bmap](https://github.com/ecidi/winterfall/tree/demo_bmap)；
   - 开源地图引擎[Leaflet](http://leafletjs.com/)，内容详见分支[demo_leaflet](https://github.com/ecidi/winterfall/tree/demo_leaflet)；
   - 三维地理信息开发API [CityMaker](http://www.citymakeronline.com/index.htm)，内容详见分支[demo_citymaker](https://github.com/ecidi/winterfall/tree/demo_citymaker)；
   - JavaScript 的图表库 [ECharts](http://echarts.baidu.com/index.html)，内容详见分支[demo_echatrs](https://github.com/ecidi/winterfall/tree/demo_echatrs)；
   - ecidi数字化研发部BIM模型显示控制插件DGN 插件（WebBIM），内容详见分支[demo_dgn](https://github.com/ecidi/winterfall/tree/demo_dgn)；
   - 360全景图加载，借助720yun平台实现，内容详见分支demo_720yun；

v1.1.0

1. 新增图片和背景图demo，通过require能通过js动态实现图片路径的变动。
2. 新增代码检测机制。
3. 根据新的代码检测机制调整代码。
4. 完成代码检测机制的文档内容。






