const tpl = require('../libs/tpl');
const itemsModel = require('../models/items');

module.exports = {

    index: async ctx => {
        // console.log('db', db);

        let items = await itemsModel.getItems();

        // console.log('rs', rs);
        
        ctx.body = tpl.render('index.html', {
            items
        });
        
    }

}