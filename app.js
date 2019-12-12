require('./build/check-versions')()

var config = require('./config')

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var env = process.env.NODE_ENV

console.log(env)

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./build/webpack.dev.conf')
var http = require('http');
logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    responseTime = require('response-time'),
    helmet = require('helmet'),
    methodOverride = require('method-override'),
    compression = require('compression');

var port = process.env.PORT || config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var proxyTable = config.dev.proxyTable
var app = express()


if(env == "development"){

    var compiler = webpack(webpackConfig)

    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    })

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {}
    })

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' })
            cb()
        })
    })

    devMiddleware.waitUntilValid(() => {
        console.log('> Listening at ' + uri + '\n')
        // when env is testing, don't need open it
        if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
            // opn(uri)
        }
        _resolve()
    })


    app.use(devMiddleware)
    app.use(hotMiddleware)

}

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(compression())
// 这种是把用户的session存在浏览器里面，服务器不存。
/*app.use(cookieSession({
    name: 'session',
    keys: ['mima', 'mima2'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))*/
app.use(cookieSession({
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 2 * 60 * 60 * 1000 }
}));
// 记录响应时间
app.use(responseTime())
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(helmet());

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})


//app.use(require('connect-history-api-fallback')())



app.use(express.static('public'));



// require('./routes/dev/index')(app);         //测试环境
require('./routes/prod/index')(app);      //正式环境

var uri = 'http://localhost:' + port
var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')

//var server = app.listen(port)
var server = http.createServer(app);
server.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
