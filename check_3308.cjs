const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec(`mysql -u root -h 127.0.0.1 -P 3308 -p"R00t#C0nt4b0_P0S!2026" -e "USE minipos_db; SELECT * FROM metodos_pago;"`, (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', () => {
      console.log('PORT 3308 minipos_db metodos_pago:\n', out);
      conn.end();
    }).on('data', d => out += d).stderr.on('data', d => out += d);
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
