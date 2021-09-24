const express = require('express');
const router = express.Router();
const mysql = require('mysql');


function addUser(data) {
    let insertQuery = 'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)';
    let query = mysql.format(insertQuery,["users","name","teamId", "description", "picturePath", data.name, data.teamId, data.description, data.picturePath]);
    pool.query(query,(err, response) => {
        if(err) return console.log(err);
        // rows added
        console.log(response.insertId);
    })
};

function addAnswer(data) {
    let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
    let query = mysql.format(insertQuery,["answers","userId","questionId","answer",data.userId,data.questionId, data.answer]);
    pool.query(query,(err, response) => {
        if(err) return console.log(err);
        // rows added
        console.log(response.insertId);
    });
}

function addQuestion(data) {
    let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    let query = mysql.format(insertQuery,["questions","content","type",data.content,data.type]);
    pool.query(query,(err, response) => {
        if(err) return console.log(err);
        // rows added
        console.log(response.insertId);
    });
}

function addTeam(data) {
    let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    let query = mysql.format(insertQuery,["teams","name","picturePath",data.name,data.picturePath]);
    pool.query(query,(err, response) => {
        if(err) return console.log(err);
        // rows added
        console.log(response.insertId);
    });
};

function getUser(userId) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';    
    let query = mysql.format(selectQuery,["users","userId", userId]);
    // query = SELECT * FROM `todo` where `user` = 'shahid'
    pool.query(query,(err, data) => {
        if(err) return console.log(err);
        // rows fetch
        console.log(data);
    });
}

function getUserAnswers(userId) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';    
    let query = mysql.format(selectQuery,["answers","userId", userId]);
    // query = SELECT * FROM `todo` where `user` = 'shahid'
    pool.query(query,(err, data) => {
        if(err) return console.log(err);
        // rows fetch
        console.log(data);
    });
};

function getTeams() {
    let selectQuery = 'SELECT * FROM ??';    
    let query = mysql.format(selectQuery,["teams"]);
    // query = SELECT * FROM `todo` where `user` = 'shahid'
    pool.query(query,(err, data) => {
        if(err) return console.log(err);
        // rows fetch
        console.log(data);
    });
}


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
    });


    console.log(selectedQuestions);
    shuffle(selectedQuestions);

    connection.end();
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};