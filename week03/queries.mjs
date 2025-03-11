import sqlite from 'sqlite3'

const db = new sqlite.Database('qa.sqlite', (err)=>{ if(err) console.log("DB problems", err)})

const userId = 2

const sql = 'SELECT * FROM user WHERE id=?'

// `SELECT * from user where id=${userId}` /// NOOOOOOOO

let users = []

db.all(sql, [userId], (err, rows) => {
    if(err) {
        console.log(err)
    } else {
        console.log(rows.length)
        for( const item of rows ) {
            console.log(item)
            users.push(item)
        }
    }
})

console.log("All users are: ", users)