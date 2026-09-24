const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec(`mysql -u root -e "USE minipos_db; INSERT IGNORE INTO metodos_pago (id, nombre, tipo, activo, orden) VALUES (1, 'Efectivo', 'efectivo', 1, 1), (2, 'Nequi', 'transferencia', 1, 2), (3, 'Tarjeta', 'tarjeta', 1, 3), (4, 'Transferencia', 'transferencia', 1, 4);"`, (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', () => {
      console.log('Metodos inyectados:', out);
      conn.end();
    }).on('data', d => out += d).stderr.on('data', d => out += d);
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
