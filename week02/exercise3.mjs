import dayjs from 'dayjs';

function Answer(response, username, score, date) {
    this.response = response;
    this.username = username;
    this.score = score;
    this.date = date;
}

function Question (question, username, date) {
    this.question = question;
    this.username = username;
    this.date = date;
    this.answers = [];

    this.add = (answer) =>{
        this.answers.push(answer);
    }

    this.find = (username) => {
        const answers = [];
        for (const ans of this.answers){
            if (ans.username === username){
                answers.push (ans);

            }
        }
        return (answers);
    }
}

const a1 = new Answer ('yes', 'Luigi', 5, dayjs('2025-03-04'));
console.log(a1);

const q1 = new Question ('How are you?', 'Luigi', '2025-03-04');
//console.log(q1);

q1.add(a1);
//console.log(q1);

q1.add(new Answer('No','Mario', 5, '2025-03-04'));

//console.log(q1);

q1.add(new Answer ('Well', 'Francesca', 3, '2025-03-05'));
q1.add (new Answer('Bad', 'Andrea', 7, '2025-03-05'));
q1.add (new Answer('Ok', 'Luigi', 5, '2025-03-04'));

q1.add( new Answer('Ok', 'Francesca', 6, dayjs().toDate()));

//console.log(q1);

const ansFound = q1.find('Luigi');
//console.log(ansFound);

const ansFound2 = q1.find('Francesca');

//console.log(ansFound2);

console.log(q1);
