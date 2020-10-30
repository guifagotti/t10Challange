const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 1000,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    timeout : 60 * 60 * 1000,
});

process.on('SIGINT', () => 
    pool.end((err : Object) => {
        if(err) return console.log(err);
        process.exit(0);
    })
); 

module.exports = pool;