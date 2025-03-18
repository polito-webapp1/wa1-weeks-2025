/* Data Access Object (DAO) module for accessing Q&A */
/* Initial version taken from exercise 4 (week 03) */

import sqlite from 'sqlite3';
import { Question, Answer } from './QAModels.mjs';

// open the database
const db = new sqlite.Database('questions.sqlite', (err) => {
  if (err) throw err;
});

/** QUESTIONS **/
// get all the questions
export const listQuestions = () => {
  // write something clever
}

// get a question given its id
export const getQuestion = (id) => {
  return new Promise ((resolve, reject) => {
    const sql = 'SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id WHERE question.id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve('Question not available, check the inserted id.');
      } else {
        resolve(new Question(row.id, row.text, row.email, row.authorId, row.date));
      }
    });
  });
}

// add a new question
export const addQuestion = (question) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO question(text, authorId, date) VALUES (?,?,?)';
    db.run(sql, [question.text, question.userId, question.date], function(err) {
      if (err)
        reject(err);
      else 
        resolve(this.lastID);
    });
  });
}

/** ANSWERS **/

// get all the answer of a given question
export const listAnswersOf = (questionId) => {
  return new Promise ((resolve, reject) => {
    const sql = 'SELECT answer.*, user.email FROM answer JOIN user ON answer.authorId = user.id WHERE answer.questionId = ?';
    db.all(sql, [questionId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const answers = rows.map((ans) => new Answer(ans.id, ans.text, ans.email, ans.authorId, ans.date, ans.score));
        resolve(answers);
      }
    });
  });
}

// add a new answer
export const addAnswer = (answer, questionId) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO answer(text, authorId, date, score, questionId) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [answer.text, answer.userId, answer.date, answer.score, questionId], function (err) {
      if (err)
        reject(err);
      else
        resolve(this.lastID);
    });
  });
}

// update an existing answer
export const updateAnswer = (answer) => {
  // write something clever
}

// vote for an answer
export const voteAnswer = (answerId, vote) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE answer SET score = score + ? WHERE id= ?';
    const delta = vote === 'up' ? 1 : -1;
    db.run(sql, [delta, answerId], function(err) {
      if (err)
        reject(err);
      else
        resolve(this.changes);
    });
  });
}