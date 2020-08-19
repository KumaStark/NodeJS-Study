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

function getData(res) {
    let newStr = (fs.readFileSync('./data.json')).toString();
    // let newStr = JSON.stringify(newData);

    console.log(str , newStr);

    if (str === newStr) {
        console.log('没有变化');
        setTimeout(function() {
            getData(res);
        }, 100);
    } else {
        console.log('有变化');
        str = newStr;
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.end(str);
    }
}

app.listen(8081);