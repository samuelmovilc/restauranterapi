const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec('sed -i "s|CORS_ORIGIN=.*|CORS_ORIGIN=http://localhost:3000,https://tu-app.vercel.app,https://restaurante-gamma-weld.vercel.app,https://restauranterapi.vercel.app|g" /var/www/minipos-api/.env && pm2 restart minipos-api', (err, stream) => {
    let out = '';
    stream.on('close', () => { console.log("CORS updated and restarted"); conn.end(); })
      .on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
