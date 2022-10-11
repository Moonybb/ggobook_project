/* Maria Connect 접속정보 : 20221006_moon */
const maria = require('mysql');

/* env require - 20221010_오영문 */
require('dotenv').config({ path: "config/env/.env.development.local"});


// 추후 DB서버 구축 후 변경 예정...
const conn = maria.createConnection({
    host: process.env.MARIA_HOST,
    port: process.env.MARIA_PORT,
    user: process.env.MARIA_USER,
    password: process.env.MARIA_PASSWORD,
    database: process.env.MARIA_NAME
});

module.exports = conn;