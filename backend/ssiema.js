let mysql = require('mysql');
const fs = require('fs');

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

function getQuestions() {
    const selectQuery = 'SELECT * FROM ?? WHERE ? = ?';    

    const queryRand = mysql.format(selectQuery, ["questions", "is_random", 0]);
    const queryNoRand = mysql.format(selectQuery, ["questions", "is_random", 1]);


    connection.query(`${queryRand};${queryNoRand}`,(err, results) => {
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

        console.log(selectedQuestions);
        fyShuffle(selectedQuestions);
        console.log(selectedQuestions);
        connection.end();
    });
};

function fyShuffle(a) {
    if (a.length < 2) return;
    for (var i = a.length; --i >= 1; ) {
     var j = ~~(Math.random() * (i + 1)), tmp;
     tmp = a[j];
     a[j] = a[i];
     a[i] = tmp;
    }
  }


  function compare( a, b ) {
    if ( a.user_count < b.user_count ){
      return -1;
    }
    if ( a.user_count > b.user_count ){
      return 1;
    }
    return 0;
  }


// Test implementation of inserting an user and his answers - works with data structure defined at the bottom.

async function addUser(data) {
    return new Promise((resolve) => {  
        const user = data.user;
        const answers = data.answers;
        let teamData;
        // check available teams

        const teamQuery = 'SELECT id, user_count from teams LEFT JOIN (SELECT team_id, COUNT(*) AS user_count FROM users GROUP BY team_id) team_counts ON teams.id = team_counts.team_id;';
        
        connection.query(teamQuery, async (err, response) => {
            if(err) return console.log(err);
            
            let userCount = response;
            userCount.sort((a,b) => a.user_count - b.user_count );

            console.log(response);

            const addUserQuery = 'INSERT INTO users (??, ??, ??, ??) value (?, ?, ?, ?)';
            const userQuery = mysql.format(addUserQuery, ["name","description","picture_path", "team_id", user.name, user.description, user.picture_path, userCount[0].id]);

            const selectTeamQuery = 'SELECT id, name FROM teams WHERE id = ?';
            const teamQuery = mysql.format(selectTeamQuery, [userCount[0].id]);

            teamData = await new Promise ((resolve) => {
                connection.query(teamQuery, (err, res) =>{
                    if (err) return console.log(err);
                    const teamTable = [];
                    teamTable.push(res[0].id);
                    teamTable.push(res[0].name);
                    console.log("druzyna: ", teamTable)
                    resolve(teamTable);
                });
            });

            const insertedId = await new Promise((resolve) => {
                connection.query(userQuery, (err, res) => {
                    if (err) return console.log(err);

                    console.log(res.insertId);
                    resolve(res.insertId);
                });
            });

            const addAnswerQuery = 'INSERT INTO answers (??, ??, ??) VALUES (?, ?, ?)';

            await Promise.all(answers.map(element => new Promise(resolve => {
                const answerQuery = mysql.format(addAnswerQuery, ["user_id", "question_id", "answer", insertedId, element.id, element.answer]);

                connection.query(answerQuery, (err, res) => {
                    if (err) return console.log(err);
                    resolve();
                });
            })));

            console.log(teamData);
            resolve(teamData);
        });
    });
};

let data = {
    answers: [{id: 1, answer: 'Nie wiem'}, {id: 2, answer: 'Andrzej kolejny odpowiada'}],
    user: {
        name: 'Andrzejek',
        description: 'Jestem Andrzej.',
        picture_path: 'costam/tam/czwartyAndrzej.png'
    }
};

// addUser(data);



addUser(data);
