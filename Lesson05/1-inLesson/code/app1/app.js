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

router.get('/getData', async ctx => {

    ctx.body = users;

    // ctx.body = `
    //     <html>
    //         <head>轮询</head>
    //         <body>
    //             ${users}
    //             <script>
    //                 setTimeout(() => {
    //                     // window.location = '/getData';
    //                     window.location.reload();
    //                 }, 1000);
    //             </script>
    //         </body>
    //     </html>
    // `;
});


app.use( router.routes() );


app.listen(8081);