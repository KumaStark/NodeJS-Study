const koa = require("koa");
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const fs = require("fs");
const nunjucks = require('nunjucks');
const mysql = require('mysql2/promise');
// 加载数据
const mime = require('./mime.json');
const homeworkData0810 = require('./data-0810.json');
const newsData = require('./data-news.json');
const links = require('./links.json');
const appSettings = require('./app-settings.json');
const databaseSettings = require('./database-settings.json');
// 设置
const serverPort = appSettings.serverListenPort;
// 新建koa实例
const server = new koa();
// 新建模板解析器并设定默认目录
const templateResolver = new nunjucks.Environment(new nunjucks.FileSystemLoader('template'));
// 数据库操作测试
async function db() {
    connection = await mysql.createConnection(databaseSettings);
}
db();
// 注册一个页面模板渲染器（自定义函数并绑定至context上）
server.use(async function (ctx, next) {
    ctx.render = (templateName, data) => { ctx.body = templateResolver.render(templateName, data); }
    await next();
});
// 注册一个服务器解析响应
server.use(async function (ctx, next) {
    console.log('Requested Url:', ctx.url);
    await next();
});
// 注册一个静态资源缓存（虚拟地址与实际路径映射关系）！本插件使用了异步加载，前置插件必须用await next()才能使本插件正常发挥作用
server.use(KoaStaticCache("./static", { prefix: "/res", gzip: true, dynamic: true }));
// 新建路由器
const router = new KoaRouter();
// 设置路由解析地址:"/""
router.get('/', ctx => {
    ctx.render('index.html', { siteTitle: appSettings.siteName, links });
    // ctx.body = templateResolver.render('index.html', { docTitle: "Index", links:links});
})
// 设置路由解析地址:"/getData"
router.get('/favicon.ico', ctx => {
    ctx.body = fs.readFileSync("./favicon.ico");
})
// 设置路由解析地址:"/getData"
router.get('/getData', ctx => {
    ctx.body = homeworkData0810;
})
// 设置路由解析地址:"/addUser"
router.get('/addUser', async (ctx) => {
    console.log(ctx.query.username, ctx.query.age);
    connection = await mysql.createConnection(databaseSettings);
    connection.execute('insert into `users` (`username`, `age`) values (?, ?)', [ctx.query.username, Number(ctx.query.age)]);
    ctx.body = "数据已保存";
})
// 设置路由解析地址:"/news"
router.get('/news', ctx => {
    ctx.render('news.html');
})
// 设置路由解析地址:"/news"
router.get('/detail', ctx => {
    ctx.render('news-detail.html');
})
// 注册路由解析方案
server.use(router.routes());
server.use(router.allowedMethods());
// 处理未能解析的URL
server.use(async (ctx, next) => {
    try {
        await next();
        if (!ctx.body) {
            console.log('Not Recognized Url:', ctx.url);
            ctx.status = 404;
            ctx.body = (fs.readFileSync('./template/404.html')).toString();
        }
    } catch (e) {
        console.log('Error:', e);
        ctx.status = 500;
        ctx.body = (fs.readFile('./template/500.html')).toString();
    }
});
// 启动服务器监听
server.listen(serverPort);
console.log(`服务器启动成功，您可以通过：http://localhost:${serverPort}`);