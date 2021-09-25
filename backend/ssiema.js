let mysql = require('mysql');
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



  async function addUser() {
    
    // check available teams

    const availableTeams = [];

    let teamQuery = 'SELECT team_id, COUNT(*) AS userCount FROM users GROUP BY team_id';
    connection.query(teamQuery, (err, response) => {
        if(err) return console.log(err);

        console.log(response);
    });

    // sort and pick least members
};

addUser();

