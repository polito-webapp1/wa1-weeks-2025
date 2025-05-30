// Exercise 4

import sqlite from 'sqlite3'
import dayjs from 'dayjs'

const db = new sqlite.Database('qa.sqlite', (err) => { if (err) throw err })

function Question(id, text, authorId, authorEmail, date) {
    this.id = id
    this.text = text
    this.authorId = authorId
    this.authorEmail = authorEmail
    this.date = date

    this.getAnswers = () => {
        return new Promise((resolve, reject) => {
            // query DB and return an array of all answers to this question
            const sql =
                `SELECT answer.*, user.email 
                FROM answer, user
                WHERE questionId = ?
                AND answer.authorId=user.id`

            db.all(sql, [this.id], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    const result = rows.map((item) => new Answer(item.id, item.text,
                        item.authorId, item.email, dayjs(item.date),
                        item.score))

                    resolve(result)
                }
            })

        })
    }
}

function Answer(id, text, authorId, authorEmail, date, score) {
    this.id = id
    this.text = text
    this.authorId = authorId
    this.authorEmail = authorEmail
    this.date = date
    this.score = score


}

function QuestionList() {
    this.getQuestion = (id) => new Promise((resolve, reject) => {

        const sql = `SELECT question.*, user.email 
            FROM question, user
            WHERE question.id = ?
            AND question.authorId=user.id`

        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err)
            else {
                if (!row)
                    reject("No questions found with id=" + id)
                else
                    resolve(new Question(row.id, row.text, row.authorId, row.email, dayjs(row.date)))
            }

        })
    })

    /**
     * 
     * @param {Question} q - a Question object to be added to the database. The fields `id` and `authorEmail` are ignored, it's recommended to set them to `undefined`
     * @returns a Promise resolving to the new `id` of the created question, or failing with an error message 
     */
    this.addQuestion = (q) => new Promise((resolve, reject) => {

    })

}

// testing

const ql = new QuestionList()
ql.getQuestion(2)
    .then((q) => q.getAnswers())
    .then((list) => { console.log('We have ', list.length, ' answers') })
    .catch((err) => { console.log("ERROR: ", err) })

