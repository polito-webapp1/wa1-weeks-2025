import dayjs from 'dayjs';

function Answer(response, username, score, date) {
    this.response = response;
    this.username = username;
    this.score = score;
    this.date = date;  // is a ISO string
}

function Question (question, username, date) {
    this.question = question;
    this.username = username;
    this.date = date;  // is a ISO string
    this.answers = [];

    this.add = (answer) =>{
        this.answers.push(answer);
    }

    // this.find = (username) => {
    //     const answers = [];
    //     for (const ans of this.answers){
    //         if (ans.username === username){
    //             answers.push (ans);

    //         }
    //     }
    //     return (answers);
    // }

    this.find = (name) => this.answers.filter(a => a.username === name)

    this.listByScore = () => {
        const result = [...this.answers]
        result.sort( (a1, a2) => a1.score-a2.score)
        return result
    }

    this.listByDate = function() {
        const result = [...this.answers]

        // sort the array by date, considering dates as strings
        result.sort( (a1, a2) => {
            if(a1.date < a2.date)return -1
            else if(a2.date > a1.date) return +1
            else return 0
        })

        result.sort( (a1, a1) => (a1.date<a2.date) ? -1 : ( (a1.date>a2.date)? +1 : 0) )

        return result
    }

    this.afterDate = ( date ) => this.answers.filter( (a) => a.date>date )
}


const a1 = new Answer ('yes', 'Luigi', 5, '2025-03-04');
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

console.log("FINDING LUIGI")
const ansFound = q1.find('Luigi');
console.log(ansFound);


console.log("SORT BY SCORE")
const sorted_scores = q1.listByScore()
console.log(sorted_scores)


const ansFound2 = q1.find('Francesca');

//console.log(ansFound2);

console.log(q1);

const names = q1.answers
names.forEach( (a, i) => { console.log(i, a.username) } )
for (const a of names) { console.log( a.username)}

const all_have_scores = q1.answers.every( a => a.score ?? a.score>0 )
console.log(all_have_scores)

const answer_names = q1.answers.map( a => a.username )
console.log(answer_names)

const min_score = Math.min( ... q1.answers.map(a=>a.score) ) 
console.log(min_score)

const good_names = q1.answers.filter(a => a.score>4).map(a=>a.username)
console.log(good_names)

const scores = q1.answers.map(a=>a.score)
const sum_scores = scores.reduce( (sum, element) => sum+element, 0)
console.log(sum_scores)

const initials = q1.answers.map(a => a.username).reduce( (str, user)=>str+user[0], "")
console.log(initials)