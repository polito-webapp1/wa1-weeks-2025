/* Data Access Object (DAO) module for accessing Q&A */
/* Initial version taken from exercise 4 (week 03) */

import db from './db.mjs';
import { Question, Answer } from './QAModels.mjs';



/** QUESTIONS **/
// get all the questions
export const listQuestions = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id';
    db.all(sql, [], (err, rows) => {
      if (err)
        reject(err);
      else {
        const questions = rows.map((q) => new Question(q.id, q.text, q.email, q.date));
        resolve(questions);
      }
    });
  });
}

// get a question given its id
export const getQuestion = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id WHERE question.id = ?';
    db.get(sql, [id], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({error: "Question not available, check the inserted id."});
      else {
        resolve(new Question(row.id, row.text, row.email, row.date));
      }
    });
  });
}

// add a new question
export const addQuestion = (question) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT id from user WHERE email = ?';
    db.get(sql, [question.email], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({error: "Author not available, check the inserted email."});
      else {
        sql = 'INSERT INTO question(text, authorId, date) VALUES(?,?,DATE(?))';
        db.run(sql, [question.text, row.id, question.date.toISOString()], function (err) {
          if (err)
            reject(err);
          else
            resolve(this.lastID);
        });
      }
    });
  });
}

/** ANSWERS **/

export const getAnswer = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT answer.*, user.email FROM answer JOIN user ON answer.authorId=user.id WHERE answer.id = ?'
    db.get(sql, [id], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({error: "Answer not available, check the inserted id."});
      else {
        resolve(new Answer(row.id, row.text, row.email, row.date, row.score));
      }
    });
  });
}


// get all the answer of a given question
export const listAnswersOf = (questionId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT answer.*, user.email FROM answer JOIN user ON answer.authorId=user.id WHERE answer.questionId = ?';
    db.all(sql, [questionId], (err, rows) => {
      if (err)
        reject(err)
      else {
        const answers = rows.map((ans) => new Answer(ans.id, ans.text, ans.email, ans.date, ans.score));
        resolve(answers);
      }
    });
  });
}

// add a new answer
export const addAnswer = (answer, questionId) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT id from user WHERE email = ?';
    db.get(sql, [answer.email], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({error: "Author not available, check the inserted email."});
      else {
        sql = "INSERT INTO answer(text, authorId, date, score, questionId) VALUES (?, ?, DATE(?), ?, ?)";
        db.run(sql, [answer.text, row.id, answer.date, answer.score, questionId], function (err) {
          if (err)
            reject(err);
          else
            resolve(this.lastID);
        });
      }
    });
  });
}

// update an existing answer
export const updateAnswer = (answer) => {
  return new Promise((resolve, reject) => {
        console.log(answer)
        const sql = "UPDATE answer SET text = ?, date = DATE(?), score = ? WHERE id = ?"
        db.run(sql, [answer.text, answer.date, answer.score, answer.id], function (err) {
          if (err){
            console.log(err)
            reject(err);}
          else
          {console.log(this)
            resolve(this.lastID);
          }
        });
      }
  );
}

export const deleteAnswer = (answerId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM answer WHERE id = ?';
    db.run(sql, [answerId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes); 
      }
    });
  });
}

// vote for an answer
export const voteAnswer = (answerId, vote) => {
  return new Promise ((resolve, reject) => {
    const delta = vote === 'upvote' ? 1: -1;
    const sql = 'UPDATE answer SET score = score + ? WHERE id = ?';
    db.run(sql, [delta, answerId], function(err) {
      if(err) reject(err);
      resolve(this.changes);
    });
  });
}