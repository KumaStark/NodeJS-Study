new Promise(resolve => {
    console.log('aaaa');

    resolve();
}).then(val => {

    return new Promise(resolve => {
        setTimeout(() => {
            console.log('bbbb');
            resolve(100);
        }, 1000);
    });

    // 这个return会等settimeout以后才执行吗?
    // return 100;
}).then(val => {
    console.log('cccc', val);
}).catch(e=>{});