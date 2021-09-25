const express = require('express');
const mysql = require('mysql');
const { establishConnection } = require('../utils/connection');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: process.env.IS_PROD ? path.resolve(__dirname, '..', '..', 'public_html', 'eden', 'faceden-img') : path.resolve(__dirname, 'public', 'images'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '_' + Math.round(Math.random() * 100)
           + path.extname(file.originalname))
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 10000000 
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
        // upload only png and jpg format
        return cb(new Error('Please upload a Image'))
      }
    cb(undefined, true)
  }
}); 

router.post('/photo', imageUpload.single('image'), async (req, res) => {
  const { path } = req.file;
  const needle = '/faceden-img/';
  const publicPath = path.substring(path.indexOf(needle) + needle.length)
  return res.send(publicPath);
});


router.post('/register', async (req, res) => {
  if (!req) res.status(403).send('Błędne dane.');
  const connection = await establishConnection()
      .catch(() => undefined);
  
  if (!connection) return res.sendStatus(500);

  const teamData = await addUser(req.body, connection, res);

  res.status(200)
      .send({id: teamData[0], name: teamData[1]});

  
  connection.end();
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
    connection.query(query,(err) => {
      if (err) return res.status(500).send(err);
    });
}

async function addUser(data, connection, expressRes) {
  return new Promise((resolve) => {  
      const user = data.user;
      const answers = data.answers;
      let teamData;
      // check available teams
      

      const teamQuery = 'SELECT id, user_count from teams LEFT JOIN (SELECT team_id, COUNT(*) AS user_count FROM users GROUP BY team_id) team_counts ON teams.id = team_counts.team_id;';
      
      connection.query(teamQuery, async (err, response) => {
          if (err) return expressRes.status(500).send(err);
          
          let userCount = response;
          userCount.sort((a,b) => a.user_count - b.user_count );

          console.log(response);

          const addUserQuery = 'INSERT INTO users (??, ??, ??, ??) value (?, ?, ?, ?)';
          const userQuery = mysql.format(addUserQuery, ["name","description","picture_path", "team_id", user.name, user.description, user.path, userCount[0].id]);

          const selectTeamQuery = 'SELECT id, name FROM teams WHERE id = ?';
          const teamQuery = mysql.format(selectTeamQuery, [userCount[0].id]);

          teamData = await new Promise ((resolve) => {
              connection.query(teamQuery, (err, res) =>{
                  if (err) return expressRes.status(500).send(err);
                  const teamTable = [];
                  teamTable.push(res[0].id);
                  teamTable.push(res[0].name);
                  console.log("druzyna: ", teamTable)
                  resolve(teamTable);
              });
          });

          const insertedId = await new Promise((resolve) => {
              connection.query(userQuery, (err, res) => {
                  if (err) return expressRes.status(400).send({ message: 'Ta nazwa jest już zajęta' });

                  console.log(res.insertId);
                  resolve(res.insertId);
              });
          });

          const addAnswerQuery = 'INSERT INTO answers (??, ??, ??) VALUES (?, ?, ?)';

          await Promise.all(answers.map(element => new Promise(resolve => {
            const answerQuery = mysql.format(addAnswerQuery, ["user_id", "question_id", "answer", insertedId, element.id, element.answer]);

            connection.query(answerQuery, (err, res) => {
              if (err) return expressRes.status(500).send(err);
              resolve();
            });
          })));

          resolve(teamData);
      });
  });
};

module.exports = router;
