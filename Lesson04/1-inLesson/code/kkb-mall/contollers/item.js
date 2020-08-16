const tpl = require('../libs/tpl');
const categoriesModel = require('../models/categories');
const itemsModel = require('../models/items');

module.exports = {

    add: async ctx => {

        let categories = await categoriesModel.getCategories();
        // console.log('categories', categories);
        
        ctx.body = tpl.render('add-item.html', {
            categories
        });
        
    },

    addPost: async ctx => {

        let data = ctx.request.body;
        let files = ctx.request.files;
        let filename = '';
        if (files && files.cover) {
            let lastPos = files.cover.path.lastIndexOf('/');
            filename = files.cover.path.substring(lastPos+1);
        }
        // console.log('data', filename);

        let rs = await itemsModel.addItem([
            data.category_id,
            data.name,
            data.price,
            filename
        ]);

        console.log('rs', rs);
        
        ctx.body = '添加成功';
        
    }

}