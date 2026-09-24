const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const fs = require('fs');
    const path = require('path');
    
    function uploadDir(localPath, remotePath) {
      return new Promise((resolve, reject) => {
        sftp.mkdir(remotePath, err => {
          // ignore mkdir error (might exist)
          fs.readdir(localPath, async (err, files) => {
            if (err) return reject(err);
            for (let file of files) {
              const fullLocalPath = path.join(localPath, file);
              const fullRemotePath = remotePath + '/' + file;
              const stat = fs.statSync(fullLocalPath);
              if (stat.isDirectory()) {
                await uploadDir(fullLocalPath, fullRemotePath);
              } else {
                await new Promise((res, rej) => {
                  sftp.fastPut(fullLocalPath, fullRemotePath, err => {
                    if (err) rej(err);
                    else {
                      console.log('Uploaded:', fullRemotePath);
                      res();
                    }
                  });
                });
              }
            }
            resolve();
          });
        });
      });
    }

    uploadDir(path.join(__dirname, 'dist'), '/var/www/restaurante-frontend/dist').then(() => {
      console.log('Frontend subido con éxito a /var/www/restaurante-frontend/dist');
      conn.end();
    }).catch(err => {
      console.error(err);
      conn.end();
    });
  });
}).connect({ host: '89.117.56.39', port: 22, username: 'root', password: 'Henogo0521*' });
