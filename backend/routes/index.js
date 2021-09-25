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
          

        addUser(req);

        connection.end();

        res.status(200)
            .send('success');
});


function compare( a, b ) {
  if ( a.user_count < b.user_count ){
    return -1;
  }
  if ( a.user_count > b.user_count ){
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
    
  const user = data.user;
  const answers = data.answers;

  // check available teams

  const teamQuery = 'SELECT id, user_count from teams LEFT JOIN (SELECT team_id, COUNT(*) AS user_count FROM users GROUP BY team_id) team_counts ON teams.id = team_counts.team_id;';
  
  connection.query(teamQuery, async (err, response) => {
      if(err) return console.log(err);
      
      let userCount = response;
      userCount.sort((a,b) => a.user_count - b.user_count );

      console.log(response);

      const addUserQuery = 'INSERT INTO users (??, ??, ??, ??) value (?, ?, ?, ?)';
      const userQuery = mysql.format(addUserQuery, ["name","description","picture_path", "team_id", user.name, user.description, user.picture_path, userCount[0].id]);

      const insertedId = await new Promise((resolve) => {
          connection.query(userQuery, (err, res) => {
              if (err) return console.log(err);

              console.log(res.insertId);
              resolve(res.insertId);
          });
      });

      const addAnswerQuery = 'INSERT INTO answers (??, ??, ??) VALUES (?, ?, ?)';

      answers.forEach(element => {
          console.log('chuj jebać: ', insertedId)
          const answerQuery = mysql.format(addAnswerQuery, ["user_id", "question_id", "answer", insertedId, element.id, element.answer]);

          connection.query(answerQuery, (err, res) => {
              if (err) return console.log(err);
  
              console.log(res.insertId);
          });
      });
  });

  // sort and pick least members

};

module.exports = router;
