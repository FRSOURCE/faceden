const express = require('express');
const mysql = require('mysql');
const { establishConnection } = require('../utils/connection');

const router = express.Router();

router.route('/form')
    .post(async function (req, res) {
        const connection = await establishConnection()
            .catch(() => undefined);
        
        if (!connection) return res.sendStatus(500);
        
        addUser(req.user);

        req.answers.forEach(element => {
            addAnswer(element);
        });

        connection.end();

        res.status(200)
            .send('success');
    });




function addAnswer(data, userId) {
    let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
    let query = mysql.format(insertQuery,["answers","user_id","question_id","answer",userId,data.questionId, data.answer]);
    connection.query(query,(err, response) => {
        if(err) return console.log(err);
        // rows added
        console.log(response.insertId);
    });
}

async function addUser(data) {
    const user = data;
    let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
    let query = mysql.format(insertQuery,["answers","user_id","question_id","answer",userId,data.questionId, data.answer]);
    connection.query(query, (err,response) => {

    })
}

module.exports = router;
