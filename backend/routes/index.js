const express = require('express');
const mysql = require('mysql');
const { response } = require('../app');
const connection = mysql.createConnection({
  host: 's148.cyber-folks.pl',
  user: 'goethe_eden-faceden',
  password: '#-k^g%IaoK-AS5q2',
  database: 'goethe_eden-faceden'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

const router = express.Router();

module.exports = router;

userRouter.route('/form')
    .post(function (req, res) {
        
        addUser(req.user);

        req.answers.forEach(element => {
            addAnswer(element);
        });

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