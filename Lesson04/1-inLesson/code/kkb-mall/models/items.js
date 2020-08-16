const db = require('./model');

module.exports = {
    getItems() {
        return new Promise( (resolve, reject) => {
            db.query("select * from `items`", function(err, rs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rs);
                }
            });
        } )
    },

    addItem(newData) {
        return new Promise( (resolve, reject) => {
            db.query("insert into `items` (`category_id`, `name`, `price`, `cover`) values (?, ?, ?, ?)", newData, function(err, rs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rs);
                }
            });
        } )
    }
}