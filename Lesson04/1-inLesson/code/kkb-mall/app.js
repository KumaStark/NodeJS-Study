const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const koaBody = require('koa-body');

// 控制器加载
const mainController = require('./contollers/main');
const userController = require('./contollers/user');
const itemController = require('./contollers/item');

const server = new Koa();
const router = new KoaRouter();

// 静态资源处理
server.use( KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}) );

// mvc => 分层开发模式
// model view controller
// web server : 用户发起请求 => 分析用户请求，处理路由 => 处理数据（操作数据库，操作缓存）=> view（data+template）=> response
// controller => model => view

// router.get('/', ctx => {
//     // ctx.body = '开课吧';

//     // ctx.render();
// });

// body 解析中间件
server.use( koaBody({
    multipart: true,
    // 处理上传的二进制文件
    formidable: {
        // 上传目录
        uploadDir: __dirname + '/public/upload',
        // 是否保留上传文件名后缀
        keepExtensions: true
    }
}) );

router.get('/', mainController.index);
router.get('/user/register', userController.register);
router.get('/user/login', userController.login);

router.get('/item/add', itemController.add);
router.post('/item/add', itemController.addPost);

server.use( router.routes() );

server.listen(8081, () => {
    console.log('服务启动成功：http://localhost:8081')
});


