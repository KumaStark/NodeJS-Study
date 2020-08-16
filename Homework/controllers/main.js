const fs = require("fs");
const tpl = require('../libs/tpl');
const appSettings = require('../settings/app.json');
module.exports = {
    index: ctx => {
        const homepage = require('../settings/homepage-links.json');
        ctx.body = tpl.render('index.html', { siteTitle: appSettings.siteName, homepage });
    },
    getfavicon: ctx => {
        ctx.body = fs.readFileSync("./favicon.ico");
    },
    middleWare: {
        showUrlRequest: async (ctx, next) => {
            console.log('Requested Url:', ctx.url);
            await next();
        },
        prcdUnkownUrls: async (ctx, next) => {
            try {
                await next();
                if (!ctx.body) {
                    console.log('Not Recognized Url:', ctx.url);
                    ctx.status = 404;
                    ctx.body = tpl.render('404.html');
                }
            } catch (e) {
                console.log('Error:', e);
                ctx.status = 500;
                ctx.body = tpl.render('500.html');
            }
        }
    }
}