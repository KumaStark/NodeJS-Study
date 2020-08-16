const db = require('../models/database');
module.exports = {
    // addUser: new Promise((resolve,reject)=>{
    //     db.execute('insert into `users` (`username`, `age`) values (?, ?)', [ctx.query.username, Number(ctx.query.age)]);
    // })
    addUser: (name, age) => {
        return new Promise((resolve, reject) => {
            db.query('insert into `users` (`username`, `age`) values (?, ?)', [name, age], function (err, rs) {
                if (err) { reject(err); }
                else { resolve(rs); }
            });
        });
    },
    clearUsers: () => {
        db.execute('truncate table `users`');
    }
}