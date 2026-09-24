const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec(`mysql -u root -e "USE restaurante_app; SELECT * FROM metodos_pago;"`, (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', () => {
      console.log('restaurante_app metodos_pago:\n', out);
      conn.end();
    }).on('data', d => out += d).stderr.on('data', d => out += d);
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
