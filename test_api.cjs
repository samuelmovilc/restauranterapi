const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec('curl -s http://127.0.0.1:3007/api/health || echo "CURL FAILED 1"; curl -s http://127.0.0.1:3007/health || echo "CURL FAILED 2"', (err, stream) => {
    let out = '';
    stream.on('close', () => { console.log(out); conn.end(); })
      .on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
