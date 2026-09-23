const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec('curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3007/health || echo "FAIL1"; curl -s -o /dev/null -w "%{http_code}" http://localhost:3007/health || echo "FAIL2"; curl -s -o /dev/null -w "%{http_code}" http://89.117.56.39:3007/health || echo "FAIL3"', (err, stream) => {
    let out = '';
    stream.on('close', () => { console.log(out); conn.end(); })
      .on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
