const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec(`mysql -u root -e "USE minipos_db; DESCRIBE metodos_pago; SELECT * FROM metodos_pago;"`, (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', () => {
      console.log('Metodos DB info:\n', out);
      conn.end();
    }).on('data', d => out += d).stderr.on('data', d => out += d);
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
