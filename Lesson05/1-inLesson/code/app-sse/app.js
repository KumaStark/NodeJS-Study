const http = require('http');
const fs = require('fs');

// let data = require('./data.json');
let str = "[]";

const app = http.createServer((req, res) => {

    if (req.url === '/index.html') {
        let content = fs.readFileSync('./index.html');
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.end(content);
        return;
    }

    if (req.url === '/getData') {

        getData(res);
        
    }

});

async function getData(res) {
    res.setHeader('content-type', 'text/event-stream');
    for (let i= 0; i<10; i++) {
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();¡
            }, 1000)
        });
        res.write(`event: abc\ndata: {"time": "${new Date()}"}\n\n`);
    }

    res.end();
    

}

app.listen(8081);