
const tpl = require('../libs/tpl');

module.exports = {

    register: async ctx => {
        ctx.body = '注册';
    },
    
    login: async ctx => {
        ctx.body = '登陆'
    }

    

}