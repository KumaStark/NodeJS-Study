const moment = require('moment');
const tpl = require('../libs/tpl');
const users = [];
let nowTime;
module.exports = {
    index: (ctx) => {
        ctx.body = tpl.render('chat.html');
    },
    connected: (socket) => {
        // users.push({
        //     id: socket.id
        // });
        nowTime = moment().format('hh:mm:ss A');
        console.log(`用户${socket.id}进入了简易聊天室`,nowTime);
        socket.emit('Greatings', `欢迎${socket.id}进入聊天室`);
        //通过socket通知给其它socket
        socket.broadcast.emit('Greatings', `新朋友${socket.id}加入了，我们欢迎👏他！`);
        // socket.broadcast.emit('userUpdate', users);
        socket.on('Message', data => {
            socket.emit('Message', `[${nowTime}]我说：${data}`);
            socket.broadcast.emit('Message', `[${nowTime}]${socket.id} 说：${data}`);
        })
    }
}