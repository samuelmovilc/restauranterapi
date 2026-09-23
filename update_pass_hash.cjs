const bcrypt = require('bcryptjs');
const { Client } = require('ssh2');

async function updatePassword() {
  const hash = await bcrypt.hash('123456', 10);
  const conn = new Client();
  const script = `
export MYSQL_PWD="R00t#C0nt4b0_P0S!2026"
mysql -h 127.0.0.1 -P 3308 -u root minipos_db -e "UPDATE usuarios SET email='admin@minipos.com', password_hash='${hash}' WHERE id=1;"
  `;
  conn.on('ready', () => {
    conn.exec(script, (err, stream) => {
      let out = '';
      stream.on('close', () => { console.log("Password hash updated."); conn.end(); })
        .on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
    });
  }).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
}
updatePassword();
