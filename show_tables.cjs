const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec('mysql -u root -p"R00t#C0nt4b0_P0S!2026" -P 3308 minipos_db -e "SHOW TABLES;"', (err, stream) => {
    let out = '';
    stream.on('close', () => { console.log(out); conn.end(); })
      .on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
