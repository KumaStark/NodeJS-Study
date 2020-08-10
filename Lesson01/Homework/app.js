const http = require("http");
const fs = require("fs");
let content = "";
const server = http.createServer((request,response)=>{
    let url = request.url;
    console.log('Request Url:',url);
    if(url.startsWith("/res")||url.startsWith("/favicon.ico")){
        resUrl = url.replace(/^\/res/g,"/static");
        content = fs.readFileSync(__dirname + resUrl);
        console.log('Resource Address:',__dirname + resUrl);
        response.write(content);
    }else{
        switch(url){
            case "/":
                response.setHeader('Content-Type', 'text/html;charset=utf-8');
                console.log("Response Page: index.html");
                content = fs.readFileSync("./template/index.html");
                response.write(content);
                // response.write("Test infomation");
                break;
        }
    }
    response.end();
})
let serverPort = 8080;
server.listen(serverPort,()=>{
    console.log(`服务器开启成功，您可以通过：http://localhost:${serverPort}`);
});