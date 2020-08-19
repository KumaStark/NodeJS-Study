const Http = require('http');
const Koa = require("koa");
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
// const KoaStatic = require('koa-static');
const KoaBody = require('koa-body');
// 读取配置文件
const appSettings = require('./settings/app.json');
// 加载控制器
const mainController = require('./controllers/main');
// const shopController = require('./controllers/shop');
// const newsController = require('./controllers/news');
const chatController = require('./controllers/chat');
const homeworkCtl = require('./controllers/homework');
const server = new Koa();
const router = new KoaRouter();
// 加载中间件
server.use(mainController.middleWare.showUrlRequest);
server.use(router.routes());
server.use(router.allowedMethods());
server.use(KoaStaticCache("./public", { prefix: "/res", gzip: true, dynamic: true }));
// server.use(KoaStatic("./static"));
server.use(mainController.middleWare.prcdUnkownUrls);
// 注册Url路由
router.get('/', mainController.index);
router.get('/favicon.ico', mainController.getfavicon);
router.get('/getData', homeworkCtl.getData);
router.get('/addUser', homeworkCtl.addUser);
router.get('/clearUsers', homeworkCtl.clearUsers);
router.get('/getUpload', homeworkCtl.getUpload);
router.post('/upload', KoaBody({
    multipart: true, formidable: {
        uploadDir: __dirname + '/static/temp',
        // maxFileSize: 200 * 1024,
        keepExtensions: true
    }
}), homeworkCtl.uploadFile);
router.get('/chat', chatController.index);
// router.get('/news', ctx => {ctx.render('news.html');});
// router.get('/detail', ctx => {ctx.render('news-detail.html');});
// 设置服务器监听端口
const serverPort = appSettings.serverListenPort;
// 使用WebSocket.io时，Koa的加载方式稍有变化
const httpServer = require('http').createServer(server.callback());
const webSocketOptions = { /* ... */ };
const io = require('socket.io')(httpServer, webSocketOptions);
io.on('connection', chatController.connected);
// 服务器启动方式也稍有变化
// server.listen(serverPort);
httpServer.listen(serverPort);
console.log(`服务器启动成功，您可以通过：http://localhost:${serverPort}`);