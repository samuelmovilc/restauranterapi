const { Client } = require('ssh2');
const fs = require('fs');
const conn = new Client();
conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    sftp.readFile('/var/www/minipos-api/src/routes/pedidos.js', 'utf8', (err, data) => {
      if (err) console.error('Error pedidos.js:', err);
      else fs.writeFileSync('minipos_pedidos_remote.js', data);

      sftp.readFile('/var/www/minipos-api/src/routes/config.js', 'utf8', (err, data) => {
        if (err) console.error('Error config.js:', err);
        else fs.writeFileSync('minipos_config_remote.js', data);
        
        console.log('Downloaded files.');
        conn.end();
      });
    });
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
