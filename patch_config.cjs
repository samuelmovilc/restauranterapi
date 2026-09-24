const { Client } = require('ssh2');
const fs = require('fs');
const conn = new Client();
conn.on('ready', () => {
  const content = fs.readFileSync('minipos_configuracion_remote.js', 'utf8');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    
    const writeStream = sftp.createWriteStream('/var/www/minipos-api/src/routes/configuracion.js');
    writeStream.on('close', () => {
      console.log('File successfully uploaded via SFTP.');
      conn.exec('export PATH=/root/.nvm/versions/node/v14.21.3/bin:$PATH && pm2 restart minipos-api', (err2, stream2) => {
        let out = '';
        stream2.on('close', () => {
          console.log('PM2 Output:', out);
          conn.end();
        }).on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
      });
    });
    writeStream.write(content);
    writeStream.end();
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
