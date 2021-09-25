const mysql = require('mysql');

exports.establishConnection = () => new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
        host: process.env.IS_PROD ? 'localhost' : 's148.cyber-folks.pl',
        user: 'goethe_eden-faceden',
        password: '#-k^g%IaoK-AS5q2',
        database: 'goethe_eden-faceden',
        multipleStatements: true
    });
    
    connection.connect(function(err) {
        if (err) {
            const message = 'error: ' + err.message;
            console.error(message);
            return reject(message);
        }
      
        console.log('Connected to the MySQL server.');
        resolve(connection);
    });
});
