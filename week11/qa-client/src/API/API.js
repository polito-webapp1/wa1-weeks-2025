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
    try {
        const response = await fetch(URI + '/questions')
        if (response.ok) {
            const questions = await response.json()
            // console.log(questions)
            return questions
        } else {
            throw new Error("Application error in loadQuestions")
        }
    } catch (ex) {
        // console.log("Network error in loadQuestions", ex)
        throw new Error("Network error in loadQuestions " + ex)
    }
}

async function loadAnswers(qid) {
    try {
        const response = await fetch(URI + `/questions/${qid}/answers`)
        if (response.ok) {
            const answers = await response.json()
            return answers.map(a => new Answer(a.id, a.text, a.email, undefined, a.date, a.score))
        } else {
            const error = await response.json()
            throw new Error( error )
        }
    } catch (ex) {
        throw new Error("Network error in loadQuestions " + ex)
    }
}

async function upVote(aid) {

    const bodyObject = { 'vote': 'upvote' }
    const response = await fetch(URI + `/answers/${aid}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
    })
    return true
}

export { loadQuestions, loadAnswers, upVote };