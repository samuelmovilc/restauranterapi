const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec(`export PATH=/root/.nvm/versions/node/v14.21.3/bin:$PATH && pm2 restart minipos-api`, (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', () => {
      console.log('PM2 RESTART:\n', out);
      conn.end();
    }).on('data', d => out += d).stderr.on('data', d => out += d);
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
