/*everyday_log

1.how to set up a boilerplate?
I think this link will help. https://github.com/verekia/js-stack-from-scratch
安装yarn:
npm install -g yarn
note: git bash貌似不能运行yarn init
https://github.com/yarnpkg/yarn/issues/743
创建一个新文件夹，并 cd 到文件夹中。
运行 yarn init，并按照提示输入一些字段（使用 yarn init -y 可以跳过输入字段的环节），将自动生成一个 package.json 文件。
新建 index.js 文件，内容为 console.log('Hello world')。
在当前文件夹下运行 node .（Node 默认会去找当前文件夹下的 index.js）。将打印 “Hello world”。
运行 node . 可能有点太容易了。我们将使用 NPM / Yarn 脚本来触发代码的执行。这样做的好处是，即使我们的程序变得更复杂，也能使用简单的一个命令 yarn start 来运行整个程序。

在 package.json 中增加 scripts 字段如下：
"scripts": {
  "start": "node ."
}

package.json 必须是有效的 JSON 文件，这意味着不能使用尾逗号。手动编辑 package.json 文件时要注意这一点。

运行 yarn start，将打印 Hello world。
新建一个 .gitignore 文件，增加以下内容：
npm-debug.log
yarn-error.log
注意：你可能注意到每章的 package.json 文件都有一个 tutorial-test 脚本。这些脚本是用于测试的，确保 yarn && yarn start 运行正确。你可以在自己的项目中删除它们。

在本节中我们将学习安装和使用包。每个“包”都是别人编写的代码片段的集合，你可以在你自己的代码中使用。它可以是任何代码。下面我们将尝试使用一个帮助你操作颜色的包。

运行 yarn add color，安装名为 color 的包
打开 package.json，可以看到 color 已经被自动加入到 dependencies 中了。

目录中多了一个 node_modules 文件夹，用于存储包。

添加 node_modules/ 到 .gitignore 文件中（如果当前目录还不是一个 git 仓库，执行 git init 创建一个新的 git 仓库）。
Yarn 生成了一个 yarn.lock 文件，它应该被提交到 git 仓库，确保团队中的每个人都使用相同的版本。如果你使用的是 NPM，那么应该使用 shrinkwrap。

color 只是用于教你学会如何使用包。如果不再需要这个包了，可以卸载它：
运行 yarn remove color

注意：有两种包依赖关系， "dependencies" 和 "devDependencies"。"dependencies" 更通用，而 "devDependencies" 是只在开发阶段使用的包（比如构建工具，代码检查工具等）。执行 yarn add --dev [package] 可以把包添加到 "devDependencies" 中。


我们将使用 ES6 语法，它相比于 ES5 有了很大改进。到目前为止，几乎所有的浏览器和 JS 运行环境都支持 ES5，但不是所有的都支持 ES6。所以我们将使用一个叫做 Babel 的工具，将 ES6 代码转换成 ES5 代码。为了运行 Babel，我们需要 Gulp。它类似于 package.json 的 scripts 中的任务，但是将任务写在 JS 文件中比使用 JSON 文件更简单清晰。我们将安装 Gulp 和 Gulp 的 Babel 插件：

运行 yarn add --dev gulp
运行 yarn add --dev gulp-babel
运行 yarn add --dev babel-preset-latest
在 package.json 中增加一个 babel 字段，添加如下代码将使用最新的 Babel 配置：
"babel": {
  "presets": [
    "latest"
  ]
},
注意：你也可以使用根目录下的 .babelrc 文件来保存 Babel 配置。随着项目变得复杂，根目录的文件将越来越多，所以我们在 package.json 中保存 Babel 的配置。

将 index.js 移动到一个名为 src 的新文件夹，用于存放 ES6 代码，编译后的 ES5 代码存放在 lib 文件夹。Gulp 和 Babel 会帮我们完成编译。删除 index.js 中有关 color 的代码，将其替换为以下更简单的版本：
const str = 'ES6';
console.log(`Hello ${str}`);
这里用到了模板字符串，这是一个 ES6 中的新功能，可以直接使用 ${} 在字符串中插入变量。有一点需要注意，模板字符串使用的是反引号。

新建 gulpfile.js 文件，包含以下内容：*/
const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const exec = require('child_process').exec;

const paths = {
  allSrcJs: 'src/**/*.js',
  libDir: 'lib',
};

gulp.task('clean', () => {
  return del(paths.libDir);
});

gulp.task('build', ['clean'], () => {
  return gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir));
});

gulp.task('main', ['build'], (callback) => {
  exec(`node ${paths.libDir}`, (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);
/*让我们花点时间来理解这一大段代码。

Gulp 本身的 API 很简单。使用 gulp.task 定义一系列的任务，使用 gulp.src 读取文件，使用 .pipe()（这里是 babel()）进行一系列的处理，并将使用 gulp.dest 输出处理后的文件。可以使用 gulp.watch 监听文件的更改。 将一个数组（如 ['build']）作为第二个参数传递给 gulp.task，可以定义这个任务的依赖，在执行这个任务之前先执行他依赖的任务。更详细的介绍请参阅Gulp 的文档。

首先，定义一个 paths 对象来存储我们需要文件路径，这样可以并保持 DRY（不要重复自身）。

然后，定义 5 个任务： build， clean， main， watch 和 default。

build 任务读取 src 下的所有文件，使用 Babel 转换，将转换后的文件写入到 lib 下。
clean 任务用于在每次执行 build 之前删除 lib 文件夹下的所有内容。这是一个很有用的任务。当你重命名或删除了 src 下的一些文件，这个任务可以帮助你清除旧的编译文件。如果你不小心构建失败了，这能确保 lib 文件夹与 src 文件夹下的内容保持同步，即使你并不知道构建失败了。使用 del 删除文件，它遵循 Gulp 的流式处理方式（这是Gulp 推荐的方式）。运行 yarn add --dev del 安装这个包。
main 任务与之前章节里提到的 node . 是等价的。不过这次我们希望执行 lib/index.js。我们已经知道 Node 默认会去找 index.js 文件，所以运行 node lib 即可（在这里我们定义了一个变量 libDir，来保持 DRY）。require('child_process').exec 和 exec 是 Node 中的原生方法，用于执行 shell 命令。将 stdout 的内容转发到 console.log() 中，如果报错了，使用 gulp.task 的回调函数返回错误。你可能觉得不能彻底理解这部分内容，不用担心，只需要记住一点， 这个任务相当于执行了 node lib。
watch 任务监听文件改动，当有文件内容发生变化时，执行 main 任务。
如果你直接从命令行调用 gulp，将默认运行 default 任务。在这个例子中，我们希望它运行 watch 和 main（首次执行）。
注意：你可能会感到奇怪，这个 Gulp 文件中的代码使用了一些 ES6 语法，我们并没有用 Babel 转换它，但它并没有报错。这是因为我们使用的 Node 版本支持某些 ES6 功能（确保你的 Node 版本大于 6.5.0，版本可以通过 node -v 查看）。

好！我们做完了。看下程序是不是能跑起来。

在 package.json 中，将 start 脚本改成 "start": "gulp"。
运行 yarn start，将会打印 "Hello ES6" 并开始监听文件的更改。你可以试试在 src/index.js 中写一些有语法错误的代码，看下 Gulp 是不是报错了。
添加 /lib/ 到 .gitignore 文件中

新建一个文件 src/dog.js，包含以下内容：
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Wah wah, I am ${this.name}`;
  }
}

module.exports = Dog;
如果你之前接触过面向对象编程，你应该不会感到陌生。对于 JavaScript 来说，这是最近才有的语法。这个类通过赋值给 module.exports 暴露出来。

ES6 代码中经常使用的有类，const 和 let，模板字符串和箭头函数（(param) => { console.log('Hi'); }），尽管我们在这个例子中没有使用到上面说的这些。

在 src/index.js 加入如下内容：

const Dog = require('./dog');

const toby = new Dog('Toby');

console.log(toby.bark());
你可能注意到了，跟引用第三方包 color 的方式有点不一样，当我们需要引用本地的文件时，在 require() 中使用了 ./。

运行 yarn start ，将打印 'Wah wah, I am Toby'。
看一下 lib 中编译后的文件长什么样（const 都被 var 替换了）。


将 const Dog = require('./dog') 替换为 import Dog from './dog'，这是 ES6 模块系统的语法（前一种属于 CommonJS 模块语法）。

将 dog.js 中的 module.exports = Dog 也替换为 export default Dog。

在 dog.js 中，Dog 这个变量只在 export 中使用了。因此我们可以直接导出一个匿名的类，如下：

export default class {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Wah wah, I am ${this.name}`;
  }
}
你可能已经猜到了，使用 import 导入 index.js 不一定要使用 Dog 来指代它，其他名字也可以，它只是一个代号而已。下面的代码也能正常运行：

import Cat from './dog';

const toby = new Cat('Toby');
大多数时候，我们会使用与 类/模块 相同的名字。在 Gulp 文件中我们使用 const babel = require('gulp-babel')，这是一个反例。

那 gulpfile.js 中的那些 require() 可以替换成 import 吗？最新版本的 Node 支持大部分的 ES6 功能，但不支持 ES6 模块语法。不过幸运的是，可以让 Babel 来帮助 Gulp 做这件事。如果我们将 gulpfile.js 重命名为 gulpfile.babel.js，Babel 会将 import 导入的模块传给 Gulp。

将 gulpfile.js 重命名为 gulpfile.babel.js
替换其中的 require()：
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import { exec } from 'child_process';
注意 exec 方法直接从 child_process 模块中提取出来了（使用了 ES6 的解构赋值语法）。非常优雅！

yarn start 还是会打印 "Wah wah, I am Toby"


我们需要检查代码来发现潜在的问题。ESLint 是 ES6 代码检查的首选。在这个例子中，我们不自己配置规则，而是使用 Airbnb 的规则。它依赖了一些插件，首先需要安装它们：

运行 yarn add --dev eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
一条命令里可以安装多个包。这些包都会自动添加到 package.json 中。

在 package.json 中添加 eslintConfig 字段：

"eslintConfig": {
  "extends": "airbnb",
  "plugins": [
    "import"
  ]
},
plugin 字段用于告诉 ESLint 我们使用了 ES6 中的模块语法。

注意：也可以使用根目录下的 .eslintrc.js 来代替 package.json 中的 eslintConfig 字段。跟 Babel 配置类似，我们不希望根目录下有太多文件，但如果你的 ESLint 配置比较复杂，那可以考虑把它单独放在一个文件里。

我们将创建一个 Gulp 任务，用于运行 ESLint。首先需要安装 ESLint 的 Gulp 插件：

运行 yarn add --dev gulp-eslint
将以下任务添加到 gulpfile.babel.js 中：
*/
import eslint from 'gulp-eslint';

const paths = {
  allSrcJs: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  libDir: 'lib',
};

// [...]

gulp.task('lint', () => {
  return gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
在这个任务中，将 gulpfile.babel.js 通过 src 包括进来了。

为 build 任务添加一个依赖 lint：

gulp.task('build', ['lint', 'clean'], () => {
  // ...
});
/*运行 yarn start，此时会报一堆代码检查错误，以及一个关于 console.log() 的警告。
其中一个错误是 'gulp' should be listed in the project's dependencies, not devDependencies (import/no-extraneous-dependencies)。这其实不是我们想要的，因为 ESLint 不知道哪些文件是构建过程的一部分，哪些不是，所以我们需要写一些注释来告诉他。在 gulpfile.babel.js 的顶部添加：

/* eslint-disable import/no-extraneous-dependencies */
/*这样 ESLint 就不会对这个文件使用 import/no-extraneous-dependencies 规则了。

还有一个错误：Unexpected block statement surrounding arrow body (arrow-body-style)。ESLint 告诉我们有更好的写法：

() => {
  return 1;
}
应该写成：

() => 1
在 ES6 中，如果函数体中只包含 return 语句时，可以去掉大括号，return 语句和分号。

相应的我们可以更新 Gulp 文件了：

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('clean', () => del(paths.libDir));

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
);
最后一个问题是关于 console.log() 的。 console.log() 是我们预期的结果，应该告诉 ESLint 不要检查这个规则。你可能已经猜到了，与之前类似，将 /* eslint-disable no-console */ 添加到 index.js 即可。

/*运行 yarn start，现在应该没有任何错误了。
注意：本章我们学习了如何在终端中配置 ESLint。在代码构建期间，提交之前就发现潜在的错误是一个很好的功能，你可能希望将这个功能集成到 IDE 里。不要使用 IDE 默认的 ESLint 配置，你需要额外配置一下让 IDE 使用 node_modules 下的 ESLint 命令（一般是 node_modules/.bin/eslint）。这样才会使用我们自己定义的配置。


error: Expected linebreaks to be 'LF' but found 'CRLF'    linebreak-style
Check if you have the linebreak-style rule configure as below either in your .eslintrc or in source code:

/*eslint linebreak-style: ["error", "unix"]*/
//Since you're working on Windows, you may want to use this rule instead:

/*eslint linebreak-style: ["error", "windows"]*/
/*Refer to the documentation of linebreak-style:

When developing with a lot of people all having different editors, VCS applications and operating systems it may occur that different line endings are written by either of the mentioned (might especially happen when using the windows and mac versions of SourceTree together).

The linebreaks (new lines) used in windows operating system are usually carriage returns (CR) followed by a line feed (LF) making it a carriage return line feed (CRLF) whereas Linux and Unix use a simple line feed (LF). The corresponding control sequences are "\n" (for LF) and "\r\n" for (CRLF).
This is a rule that is automatically fixable. The --fix option on the command line automatically fixes problems reported by this rule.

But if you wish to retain CRLF line-endings in your code (as you're working on Windows) do not use the fix option.

解决办法见：
https://medium.com/@Rascle/fix-line-endings-in-sublime-text-3-35d926d1c041#.j34av7vbu


在根目录下新建 dist 目录，在其中新建一个 index.html 文件：
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <div class="app"></div>
    <script src="client-bundle.js"></script>
  </body>
</html>
在 src 文件夹中，新建 server，shared，client 文件夹，将 index.js 移动到 server 文件夹中，将 dog.js 移动到 shared 文件夹中。在 client 文件夹中新建 app.js。

目前我们不会涉及 Node 后端相关的知识，但将这些文件分开到不同的文件夹，有助于理解这些文件的作用。由于目录结构变了，所以我们需要将 server/index.js 中的 import Dog from './dog'; 修改成 import Dog from '../shared/dog';，不然 ESLint 会报一个模块无法解析的错误。

在 client/app.js 中添加：

import Dog from '../shared/dog';

const browserToby = new Dog('Browser Toby');

document.querySelector('.app').innerText = browserToby.bark();
在 package.json 中的 eslintConfig 中添加：

"env": {
  "browser": true
}
这样可以让 ESLint 知道目前在浏览器环境中，所以 window 或 document 之类的变量一定是存在的，就不会报变量未声明的错误了。

如果你希望在前端代码中使用一些最新的 ES 功能，比如 Promise，需要引入 Babel Polyfill。

运行 yarn add babel-polyfill
在 app.js 的最前面加入：

import 'babel-polyfill';
这样最终打包生成的文件会多大约 300KB 的体积，所以如果你不需要这里面的任何功能，不要这么做。

Webpack

在 Node 环境中，你可以使用 import 导入任何的文件，Node 根据路径自动寻找这些文件。而在浏览器端，并没有一个文件系统，所以没有可以用 import 导入的东西。为了让入口文件 app.js 知道它需要导入什么，我们要将整个依赖树“打包”到一个文件中。Webpack 就是用来做这个的。

和 Gulp 类似，Webpack 也需要一个配置文件，叫 webpack.config.js。为了使用 ES6 模块语法，跟之前的 Gulp 一样，需要将配置文件命名为 webpack.config.babel.js 即可。

新建 webpack.config.babel.js 文件
添加 webpack.config.babel.js 到 Gulp 的 lint 任务中，同时在 paths 中添加一些常量：
*/
const paths = {
  allSrcJs: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
};

// [...]

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
/*我们需要告诉 Webpack 如何处理 ES6 文件（就跟之前 Gulp 使用 gulp-babel 一样）。在 Webpack 中，如果需要处理除旧版本的 JavaScript 之外的文件，需要使用 loaders。所以我们要安装 Babel 的 loader：

运行 yarn add --dev babel-loader
在 webpack.config.babel.js 中添加以下内容：
*/
export default {
  output: {
    filename: 'client-bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
/*我们一起分析一下这个文件到底做了什么：

首先 export 了一个对象。output.filename 指定了打包后的文件名。devtool: 'source-map' 将开启 source map，让浏览器调试更方便。module.loaders 中的 test 字段是一个 JavaScript 的正则表达式，匹配的文件将会使用 babel-loader 处理。在下一章中我们需要匹配 .js 和 .jsx（React），所以使用了 /\.jsx?$/ 这个正则。node_modules 中的文件不需要编译，所以包含在 exclude 字段中，这样 Babel 不会去尝试编译这些文件，能减少构建时间。resolve 字段告诉 Webpack 哪些文件在 import 的时候可以省略扩展名，这样 import Foo from './foo' 中的 foo 可以代表 foo.js 或 foo.jsx。

配置完毕，现在我们需要运行 Webpack。

将 Webpack 集成到 Gulp

Webpack 可以做很多事情。如果你的项目中主要是客户端的业务逻辑，它实际上可以完全替代 Gulp。Gulp 是一个更通用的工具，它更适合用于代码检查，测试和后端任务等，同时对于新手来说比复杂的 Webpack 更容易理解。我们已经有一个健壮的 Gulp 工作流了，所以将 Webpack 集成到 Gulp 中会比较容易。

接下来我们要创建一个 Gulp 任务用于执行 Webpack。打开 gulpfile.babel.js。

现在不需要 main 任务执行 node lib/ 命令了，取而代之的是打开 index.html 来运行 APP。

移除 import { exec } from 'child_process'
与 Gulp 插件类似，webpack-stream 这个包使我们能够很容易将 Webpack 集成到 Gulp 中。

安装包：yarn add --dev webpack-stream
加入以下内容：
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
第二行代码导入了我们的配置文件。

如我之前所说，在下一章中我们将使用 .jsx 文件（在客户端，甚至是服务端），所以让我们现在先设置它。

将常量改成以下内容：
*/
const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
};
/*.js?(x) 只是一个匹配 .js 或 .jsx 文件的模式。

我们现在有了我们应用程序的不同部分的常量，以及一个入口文件。

修改 main 任务如下：
gulp.task('main', ['lint', 'clean'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
);
注意：build 任务目前会将 src 下的所有 .js 文件的 ES6 语法转换成 ES5。现在我们已经将代码分成了服务端，共享的和客户端三部分，分别位于 server， shared 和 client 目录下，我们可以让这个任务只编译服务端和共享的（因为客户端代码由 Webpack 负责）。但是，在测试那一章中，我们需要用 Gulp 编译客户端的代码以便在 Webpack 外部进行测试。所以，在那一章之前，这部分的构建过程并没有意义。实际上，在那之前，甚至可以不再使用 build 任务和 lib 文件夹，因为我们现在关心的是客户端打包。

运行 yarn start，文件夹下多出了一个 client-bundle.js 文件，在浏览器中打开 index.html ，将展示 "Wah wah, I am Browser Toby"。
最后一点：与 lib 文件夹不同， dist/client-bundle.js 和 dist/client-bundle.js.map 文件在每次构建之前都不会被 clean 任务清理。

添加 clientBundle: 'dist/client-bundle.js?(.map)' 到 paths，同时调整 clean 任务：*/
gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
]));
//将 /dist/client-bundle.js* 添加到 .gitignore 文件。

/*git error
In Unix systems the end of a line is represented with a line feed (LF). In windows a line is represented with a carriage return (CR) and a line feed (LF) thus (CRLF). when you get code from git that was uploaded from a unix system they will only have a LF. It's nothing to worry about.

And if you want to turn this warning off, type this in the git command line

git config core.autocrlf true
If you want to make an intelligent decision how git should handle this, read the documentation

Here is a snippet

Formatting and Whitespace

Formatting and whitespace issues are some of the more frustrating and subtle problems that many developers encounter when collaborating, especially cross-platform. It’s very easy for patches or other collaborated work to introduce subtle whitespace changes because editors silently introduce them, and if your files ever touch a Windows system, their line endings might be replaced. Git has a few configuration options to help with these issues.

core.autocrlf
If you’re programming on Windows and working with people who are not (or vice-versa), you’ll probably run into line-ending issues at some point. This is because Windows uses both a carriage-return character and a linefeed character for newlines in its files, whereas Mac and Linux systems use only the linefeed character. This is a subtle but incredibly annoying fact of cross-platform work; many editors on Windows silently replace existing LF-style line endings with CRLF, or insert both line-ending characters when the user hits the enter key.

Git can handle this by auto-converting CRLF line endings into LF when you add a file to the index, and vice versa when it checks out code onto your filesystem. You can turn on this functionality with the core.autocrlf setting. If you’re on a Windows machine, set it to true – this converts LF endings into CRLF when you check out code:

$ git config --global core.autocrlf true
If you’re on a Linux or Mac system that uses LF line endings, then you don’t want Git to automatically convert them when you check out files; however, if a file with CRLF endings accidentally gets introduced, then you may want Git to fix it. You can tell Git to convert CRLF to LF on commit but not the other way around by setting core.autocrlf to input:

$ git config --global core.autocrlf input
This setup should leave you with CRLF endings in Windows checkouts, but LF endings on Mac and Linux systems and in the repository.

If you’re a Windows programmer doing a Windows-only project, then you can turn off this functionality, recording the carriage returns in the repository by setting the config value to false:

$ git config --global core.autocrlf false