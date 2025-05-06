import { Answer, Question } from "../models/QAModels.mjs";

const URI = 'http://localhost:3001/api'

// Fake questions as a immediately resolved Promise
// async function loadQuestions() {
//                // Fake Database of questions
//                const fakeQuestion1 = new Question(1, 'how are you?', 'me@mail.com', 24, '2025-04-01')
//                const fakeQuestion2 = new Question(2, 'what time is it?', 'user@mail.it', 25, '2025-05-05')
//                return [fakeQuestion1, fakeQuestion2]
// }

// Fake questions with a response delay
function loadQuestions_fake() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const fakeQuestion1 = new Question(1, 'how are you?', 'me@mail.com', 24, '2025-04-01')
            const fakeQuestion2 = new Question(2, 'what time is it?', 'user@mail.it', 25, '2025-05-05')
            resolve([fakeQuestion1, fakeQuestion2])
        }, 1000)
    })
}

// real one, calls the API server
async function loadQuestions() {
    const response = await fetch(URI+'/questions')
    const questions = await response.json()
    console.log(questions)
    return questions
}

async function loadAnswers(qid) {
    const response = await fetch(URI+`/questions/${qid}/answers`)
    const answers = await response.json()
    return answers.map( a => new Answer(a.id, a.text, a.email, undefined,a.date, a.score))
}

async function upVote(aid) {

    const bodyObject = { 'vote': 'upvote' }
    const response = await fetch(URI+`/answers/${aid}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)        
    })
    return true
}

export { loadQuestions, loadAnswers, upVote };