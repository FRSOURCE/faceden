let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 's148.cyber-folks.pl',
  user: 'goethe_eden-faceden',
  password: '#-k^g%IaoK-AS5q2',
  database: 'goethe_eden-faceden'
});

connection.connect(function(err) {
    if (err) return console.log(err);
  
    console.log('Connected to the MySQL server.');
});

function getQuestions() {
    let selectQueryRand = 'SELECT * FROM ?? WHERE is_random = 0';
    let selectQueryNoRand = 'SELECT * FROM ?? WHERE is_random = 1';    

    let queryRand = mysql.format(selectQueryRand,["questions"]);
    let queryNoRand = mysql.format(selectQueryNoRand,["questions"]);

    const selectedQuestions = [];

    connection.query(queryRand,(err, data) => {
        if(err) return console.log(err);
    

        for (let i = 0; i < 5; i++) {
            const randNum = Math.floor(Math.random() * data.length);
            selectedQuestions.push([data[randNum].id, data[randNum].content]);
            data.splice(randNum, 1);
        }
    });

    connection.query(queryNoRand,(err, data) => {
        if(err) return console.log(err);
    

        for (let i = 0; i < 5; i++) {
            const randNum = Math.floor(Math.random() * data.length);
            selectedQuestions.push([data[randNum].id, data[randNum].content]);
            data.splice(randNum, 1);
        }
        console.log(selectedQuestions);
    });
    connection.end();
};

getQuestions();