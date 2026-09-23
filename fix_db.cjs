const { Client } = require('ssh2');
const conn = new Client();
const script = `
export MYSQL_PWD="R00t#C0nt4b0_P0S!2026"
mysql -h 127.0.0.1 -P 3308 -u root -e "CREATE DATABASE IF NOT EXISTS minipos_db;"
mysqldump -h 127.0.0.1 -P 3308 -u root -d restaurante_app > /tmp/schema_correct.sql
mysql -h 127.0.0.1 -P 3308 -u root minipos_db < /tmp/schema_correct.sql
mysql -h 127.0.0.1 -P 3308 -u root -e "INSERT IGNORE INTO minipos_db.usuarios SELECT * FROM restaurante_app.usuarios;"
`;
conn.on('ready', () => {
  conn.exec(script, (err, stream) => {
    let out = '';
    stream.on('close', () => { console.log("DB Recreated on Docker"); conn.end(); })
      .on('data', d => out += d.toString()).stderr.on('data', d => out += d.toString());
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
