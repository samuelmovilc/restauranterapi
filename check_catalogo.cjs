const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    sftp.readFile('/var/www/minipos-api/src/routes/catalogo.js', 'utf8', (err, data) => {
      if (err) console.error(err);
      else console.log(data);
      conn.end();
    });
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
