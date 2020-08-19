const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

const app = new Koa();

app.use(KoaStaticCache('./static', {
    prefix: '/static',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();

const users = ['mt', 'hai', 'xiaorui'];

let user = null;

router.get('/check', async ctx => {

    if (!user) {
        ctx.body = {
            code: -1,
            message: "还未登陆"
        };
    } else {
        ctx.body = {
            code: 0,
            message: "登陆成功"
        };
    }
    

});

router.get('/login', async ctx => {

    user = {};
    ctx.body = "登陆成功";

});


app.use( router.routes() );


app.listen(8081);