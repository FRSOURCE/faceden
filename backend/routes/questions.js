const express = require('express');
const router = express.Router();
const mysql = require('mysql');

function fyShuffle(a) {
    if (a.length < 2) return;
    for (var i = a.length; --i >= 1; ) {
     var j = ~~(Math.random() * (i + 1)), tmp;
     tmp = a[j];
     a[j] = a[i];
     a[i] = tmp;
    }
};

router.get('/', (req, res) => {

    if (!req) res.status(403).send('Błędne dane.');

    let connection = mysql.createConnection({
        host: 's148.cyber-folks.pl',
        user: 'goethe_eden-faceden',
        password: '#-k^g%IaoK-AS5q2',
        database: 'goethe_eden-faceden',
        multipleStatements: true
    });
    
    connection.connect(function(err) {
        if (err) return console.log(err);
    
        console.log('Connected to the MySQL server.');
    });
      
    const selectQueryRand = 'SELECT * FROM ?? WHERE is_random = 0';
    const selectQueryNoRand = 'SELECT * FROM ?? WHERE is_random = 1';    

    const queryRand = mysql.format(selectQueryRand, ["questions"]);
    const queryNoRand = mysql.format(selectQueryNoRand, ["questions"]);

    connection.query(`${queryRand};${queryNoRand}`, (err, results) => {
        if(err) return console.log(err);
    
        const selectedQuestions = [];
        const dataRand = results[0];
        const dataNoRand = results[1];
        let chosenIndexes = [];

        for (let i = 0; i < 5; ++i) {
            const randNum = Math.floor(Math.random() * dataRand.length);
            if (chosenIndexes.includes(randNum)) {
                --i;
                continue;
            }
            selectedQuestions
                .push({"id": dataRand[randNum].id, "content": dataRand[randNum].content});
            chosenIndexes.push(randNum);
        }


        for (let i = 0; i < 5; ++i) {
            const randNum = Math.floor(Math.random() * dataNoRand.length);
            if (chosenIndexes.includes(randNum)) {
                --i;
                continue;
            }
            selectedQuestions
                .push({"id": dataNoRand[randNum].id, "content": dataNoRand[randNum].content});
            chosenIndexes.push(randNum);
        }

        fyShuffle(selectedQuestions);
        connection.end();

        res.status(200).send(selectedQuestions);;
    });
});

module.exports = router;