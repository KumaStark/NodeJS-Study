const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');

const server = new Koa();
const router = new KoaRouter();

// 中间件 => 函数调用的过程（递归）
// server.use( async (ctx, next) => {

//     console.log(1111);

//     // next 类似 promise 的 resolve 方法
    
//     await next();

// } );

// server.use( async (ctx, next) => {
    
//     await new Promise(resolve => {
//         setTimeout(() => {
//             console.log(2222);
//             resolve();
//         }, 3000);
//     })

//     await next();
// } );

router.get('/', ctx => {
    console.log(3333);

    ctx.body = '开课吧';
});

server.use( router.routes() );

server.listen(8081, () => {
    console.log('服务启动成功：http://localhost:8081')
});

// fn1();

// function fn1() {
    
//     fn2();

//     console.log(1111);
// }

// function fn2() {
//     console.log(2222);
//     fn3();
// }

// function fn3() {
//     console.log(3333);
// }


