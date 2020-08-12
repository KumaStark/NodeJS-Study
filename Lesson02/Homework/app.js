const koa = require("koa");
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const fs = require("fs");
const nunjucks = require('nunjucks');
// 加载数据
const mime = require('./mime.json');
const data = require('./data.json');
const links = require('./links.json');
// 设置
const serverPort = 8080;
// 新建koa实例
const server = new koa();
// 新建模板解析器并设定默认目录
const templateResolver = new nunjucks.Environment(new nunjucks.FileSystemLoader('template'));
// 注册一个静态资源缓存（虚拟地址与实际路径映射关系）?不能放在自定义的USE内容后面?
server.use(KoaStaticCache("./static", { prefix: "/res", gzip: true, dynamic: true }));
// 注册一个页面模板渲染器（自定义函数并绑定至context上）
server.use((ctx, next) => {
    ctx.render = (templateName, data) => { ctx.body = templateResolver.render(templateName, data); }
    next();
});
// 新建路由器
const router = new KoaRouter();
// 设置路由解析地址:"/""
router.get('/', ctx => {
    ctx.render('index.html', { docTitle: "Index", links});
    // ctx.body = templateResolver.render('index.html', { docTitle: "Index", links:links});
})
// 设置路由解析地址:"/getData"
router.get('/favicon.ico', ctx => {
    ctx.body = fs.readFileSync("./favicon.ico");
})
// 设置路由解析地址:"/getData"
router.get('/getData', ctx => {
    ctx.body = data;
})
// 注册路由解析方案
server.use(router.routes());
// 注册一个服务器解析响应
server.use((ctx, next) => {
    console.log('Not Recognized Url:', ctx.url);
    ctx.render('404.html');
    next();
});
// 启动服务器监听
server.listen(serverPort);
console.log(`服务器启动成功，您可以通过：http://localhost:${serverPort}`);