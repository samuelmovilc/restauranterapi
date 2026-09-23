const bcrypt = require('bcryptjs');
const { Client } = require('ssh2');

async function updatePassword() {
  const hash = await bcrypt.hash('123456', 10);
  const conn = new Client();
  conn.on('ready', () => {
    conn.exec(`mysql -u root -p"R00t#C0nt4b0_P0S!2026" -P 3308 minipos_db -e "UPDATE usuarios SET password='${hash}' WHERE email='admin@minipos.com';"`, (err, stream) => {
      let out = '';
      stream.on('close', () => { console.log("Password updated to 123456"); conn.end(); })
        .on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
    });
  }).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
}
updatePassword();
