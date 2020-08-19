const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');

const app = new Koa();

app.use(KoaStaticCache('./static', {
    prefix: '/static',
    gzip: true,
    dynamic: true
}));

function upload(dir = '/static/upload') {
    return koaBody({
        // 开启二进制content-type类型的处理
        multipart: true,
        // 
        formidable: {
            uploadDir: __dirname + dir,
            keepExtensions: true,
            onFileBegin(name, file) {
                // console.log('name, file', name, file);
                return false;
            }
        }
    });
}

const router = new KoaRouter();

// 上传
// router.post('/upload', upload() );

router.post('/upload', upload(), async ctx => {

    ctx.body = '上传成功';
});

router.post('/attachment', upload('/static/attachment'), async ctx => {
    console.log(ctx.files);
    ctx.body = '上传成功';
});

app.use( router.routes() );


app.listen(8081);