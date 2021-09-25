const express = require('express');
const mysql = require('mysql');
const { establishConnection } = require('../utils/connection');

const router = express.Router();

router.route('/form')
    .post(async function (req, res) {
        if (!req) res.status(403).send('Błędne dane.');
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


function compare( a, b ) {
  if ( a.userCount < b.userCount ){
    return -1;
  }
  if ( a.userCount > b.userCount ){
    return 1;
  }
  return 0;
}

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

    // check available teams

    const availableTeams = [];

    let teamQuery = 'SELECT team_id, COUNT(*) AS userCount FROM users GROUP BY team_id';
    connection.query(teamQuery, (err, response) => {
        if(err) return console.log(err);

        for (i = 0; i < response.length; ++i) {
          availableTeams.push({"team_id": response[i].team_id, "userCount": response[i].userCount})
        }
    });

    availableTeams.sort(compare);

    // sort and pick least members
}

module.exports = router;
