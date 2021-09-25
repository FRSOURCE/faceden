const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { establishConnection } = require('../utils/connection');

function fyShuffle(a) {
    if (a.length < 2) return;
    for (var i = a.length; --i >= 1; ) {
     var j = ~~(Math.random() * (i + 1)), tmp;
     tmp = a[j];
     a[j] = a[i];
     a[i] = tmp;
    }
};

function chooseQuestions(data, chosenIndexes, count = 5) {
    const selectedQuestions = [];

    for (let i = 0; i < count; ++i) {
        const randNum = Math.floor(Math.random() * data.length);
        if (chosenIndexes.includes(randNum)) {
            --i;
            continue;
        }
        selectedQuestions
            .push({"id": data[randNum].id, "content": data[randNum].content});
        chosenIndexes.push(randNum);
    }

    return selectedQuestions;
}

router.get('/', async (req, res) => {
    if (!req) res.status(403).send('Błędne dane.');
    const connection = await establishConnection()
        .catch(() => undefined);
    
    if (!connection) return res.sendStatus(500);
      
    const selectQueryRand = 'SELECT * FROM ?? WHERE is_random = ?';
    const selectQueryNoRand = 'SELECT * FROM ?? WHERE is_random = ?';    

    const queryRand = mysql.format(selectQueryRand, ["questions", 1]);
    const queryNoRand = mysql.format(selectQueryNoRand, ["questions", 0]);

    connection.query(`${queryRand};${queryNoRand}`, (err, results) => {
        if(err) return console.log(err);
    
        const dataRand = results[0];
        const dataNoRand = results[1];
        let chosenIndexes = [];

        const selectedQuestions = chooseQuestions(dataRand, chosenIndexes)
            .concat(chooseQuestions(dataNoRand, chosenIndexes));

        fyShuffle(selectedQuestions);
        connection.end();

        res.status(200).send(selectedQuestions);;
    });
});

module.exports = router;