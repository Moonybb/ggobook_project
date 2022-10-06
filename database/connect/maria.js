/* Maria Connect 접속정보 : 20221006_moon */
const maria = require('mysql');

// 추후 DB서버 구축 후 변경 예정...
const conn = maria.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root123!',
    database: 'ggobook_db'
});

module.exports = conn;