const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec('export PATH=/root/.nvm/versions/node/v14.21.3/bin:$PATH && pm2 restart minipos-api && pm2 save', (err, stream) => {
    let out = '';
    stream.on('close', () => { console.log(out); conn.end(); })
      .on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
