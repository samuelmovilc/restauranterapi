const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec('export PATH=/root/.nvm/versions/node/v14.21.3/bin:$PATH && cd /var/www/minipos-api && node -e "require(\'dotenv\').config(); const mysql = require(\'mysql2/promise\'); mysql.createConnection({ host: process.env.DB_HOST, port: parseInt(process.env.DB_PORT), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME }).then(c => c.query(\'SHOW TABLES\').then(r => console.log(r[0]))).catch(e => console.error(e));"', (err, stream) => {
    let out = '';
    stream.on('close', () => { console.log(out); conn.end(); })
      .on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
