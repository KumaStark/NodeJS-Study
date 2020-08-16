const Koa = require("koa");
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const KoaStatic = require('koa-static');
const KoaBody = require('koa-body');
// 读取配置文件
const appSettings = require('./settings/app.json');
// 加载控制器
const mainController = require('./controllers/main');
// const shopController = require('./controllers/shop');
// const newsController = require('./controllers/news');
const homeworkCtl = require('./controllers/homework');
const server = new Koa();
const router = new KoaRouter();
// 加载中间件
server.use(mainController.middleWare.showUrlRequest);
server.use(KoaBody({
        multipart: true, formidable: {
            uploadDir: __dirname + '/static/temp',
            // maxFileSize: 200 * 1024,
            keepExtensions: true
        }
    }));
server.use(router.routes());
server.use(router.allowedMethods());
server.use(KoaStaticCache("./public", { prefix: "/res", gzip: true, dynamic: true }));
server.use(KoaStatic("./static"));
server.use(mainController.middleWare.prcdUnkownUrls);
// 注册Url路由
router.get('/', mainController.index);
router.get('/favicon.ico', mainController.getfavicon);
router.get('/getData', homeworkCtl.getData);
router.get('/addUser', homeworkCtl.addUser);
router.get('/clearUsers', homeworkCtl.clearUsers);
router.get('/upload', homeworkCtl.getUpload);
router.post('/upload', homeworkCtl.uploadFile);
// router.get('/news', ctx => {ctx.render('news.html');});
// router.get('/detail', ctx => {ctx.render('news-detail.html');});
// 启动服务器监听
const serverPort = appSettings.serverListenPort;
server.listen(serverPort);
console.log(`服务器启动成功，您可以通过：http://localhost:${serverPort}`);