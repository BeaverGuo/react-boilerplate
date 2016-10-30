//布署

#### 编译部署

`$ ./make.sh` 

编译好后，build_out 目录为外网部署文件，build目录为内网部署文件。

如内网或外网ip或数据服务地址改变，请修改以下文件中的配置项：

> webpack.prod.config_inside.js 内网部署配置文件
> webpack.prod.config_outside.js 外网部署配置文件
> app\Ajax\Config\config_inside.json 内网数据及其他服务地址配置文件
> app\Ajax\Config\config_out.json 外网数据及其他服务地址配置文件
#!/bin/sh

rm build -Rf 
rm build_out -Rf
cp webpack.prod.config_outside.js webpack.prod.config.js -f
cp app/Ajax/Config/config_out.json app/Ajax/Config/config.json -f 
npm run build 
mv build build_out 
cp webpack.prod.config_inside.js webpack.prod.config.js -f 
cp app/Ajax/Config/config_inside.json app/Ajax/Config/config.json -f 
npm run build


地址： 10.215.160.35
协议： SFTP
登录账号： ecidi
密码： *****


//new

###ecidi-react-boilerplate

*一个简单的环境有利于快速起步。*

#### 基础目录

所有目录性质的都小写开头。

1. `app/`：源代码根目录，用于存储功能性代码；
2. `docs/`：用于存放开发过程中产生的开发文档；
3. `src/`：资源类目录，用于存储静态资源；
  1. `images/`：用于存放图片等静态文件资源；
  2. `sass/`：用于存放样式表文件；
  3. `fonts/`：用于存放字体；
4. `index.html`：基础页面文件；

#### 基础业务逻辑目录

app文件夹内部所有功能组件性质的集合都大写开头。

1. `Ajax/`：用于存放所有请求；
  1. `GET/`：用于存放所有的`GET`请求；
    1. `[name].js`：用于存放对应的`GET`方法，`[name]`为`restful api`最后一个单词；
  2. `POST/`：用于存放所有的`POST`请求；
  3. `PUT/`：用于存放所有的`GET`请求；
  4. `PATCH/`：用于存放所有的`PATCH`请求；
  5. `DELETE/`：用于存放所有的`DELETE`请求；
2. `Components/`：用于存放所有全局使用的`UI`组件，如顶部导航栏，底部页脚栏等；
3. `Pages/`：用于存放所有拥有独立`url`的页面文件，需与`app.js`中的`router`配置相匹配；
  1. `HomePage/`：用于存放`HomePage`该页面相关的代码；
    1. `index.js`: `HomePage`相关页面代码；
    2. `styles.css`：`HomePage`相关样式代码；
    3. `tests/`：`HomePage`相关测试代码；
        1. `index.test.js`：`HomePage`相关页面测试代码；
4. `app.js`：客户端入口及路由配置文件；

#### 基础指令

`$ npm install`

`$ npm run start`

打开游览器，地址栏输入 http://localhost:8080；

如何变动端口号：

变动 webpack.dev.config 以及 server.js 当中的端口号。

<br>
<br>
<br>
<br>
-- 本着一颗简单的心来完成简单的事情



#### 编译部署

`$ ./make.sh test` 

> 编译为测试服务文件

`$ ./make.sh dev` 

> 编译为开发服务文件

	以上两个选项编译好后，build_out 目录为外网部署文件，build目录为内网部署文件。

`$ ./make.sh` 

> 编译为产品部署文件

编译好后，build目录为部署文件。



如内网或外网ip或数据服务地址改变，请修改以下文件中的配置项：

> webpack.prod.config_inside_test.js 内网测试部署配置文件
> webpack.prod.config_outside_test.js 外网测试部署配置文件
> app\Ajax\Config\config_inside_test.json 内网测试数据及其他服务地址配置文件
> app\Ajax\Config\config_out_test.json 外网测试数据及其他服务地址配置文件
> webpack.prod.config_inside.js 内网开发部署配置文件
> webpack.prod.config_outside.js 外网开发部署配置文件
> app\Ajax\Config\config_inside.json 内网开发数据及其他服务地址配置文件
> app\Ajax\Config\config_out.json 外网开发数据及其他服务地址配置文件
> webpack.prod.config_product.js 最终产品部署配置文件
> app\Ajax\Config\config_product.json 最终产品部署数据及其他服务地址配置文件
