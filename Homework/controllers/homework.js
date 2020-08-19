const homeworkModel = require('../models/homework');
const tpl = require('../libs/tpl');
const path = require('path');
const fs = require("fs");
const { nextTick } = require('process');

module.exports = {
    getData: ctx => { ctx.body = { "name": "koa" }; },
    addUser: async (ctx) => {
        // console.log(ctx.query.username, ctx.query.age);
        await homeworkModel.addUser(ctx.query.username, Number(ctx.query.age));
        ctx.body = "数据已保存";
    },
    clearUsers: ctx => {
        homeworkModel.clearUsers();
        ctx.body = "数据已清空";
    },
    getUpload: ctx => {
        ctx.body = tpl.render("upload.html");
    },
    uploadFile: ctx => {
        let files = ctx.request.files;
        let uploadedFileInfo = [];
        for (file in files) {
            current = files[file];
            if (current.size > 0) {
                let lastPos = current.path.lastIndexOf('/');
                if (lastPos == -1) { lastPos = current.path.lastIndexOf('\\'); }
                newName = current.path.substring(lastPos + 1);
                const reader = fs.createReadStream(current.path);
                let filePath = path.join(__dirname, '../static/upload') + `/${newName}`;
                const upStream = fs.createWriteStream(filePath);
                reader.pipe(upStream);
                uploadedFileInfo.push({
                    oldName: current.name,
                    newName,
                    fileSize: current.size
                })
            }
            fs.unlink(current.path, error => { if (error) { console.log(error); return false; } });
        }
        ctx.body = tpl.render('success.html', { fileCount: uploadedFileInfo.length, uploadedFileInfo });
    }
}