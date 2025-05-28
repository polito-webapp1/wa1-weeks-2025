import { Answer, Question } from "../models/QAModels.mjs";

const URI = 'http://localhost:3001/api'

// Fake questions as a immediately resolved Promise
// async function loadQuestions() {
//                // Fake Database of questions
//                const fakeQuestion1 = new Question(1, 'how are you?', 'me@mail.com', 24, '2025-04-01')
//                const fakeQuestion2 = new Question(2, 'what time is it?', 'user@mail.it', 25, '2025-05-05')
//                return [fakeQuestion1, fakeQuestion2]
// }


async function updateAnswer(answer) {
    console.log(answer)
    const response = await fetch(URI + '/api/answers/:id')
}


async function addAnswer(answer, questionId) {

    const response = await fetch(URI + `/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ text: answer.text, email: answer.email, score: 0, date: answer.date }),
        credentials: 'include'
    });

    if (!response.ok) {
        let errMessage = await response.json();
        if (response.status === 422)
            errMessage = `${errMessage.errors[0].msg} for ${errMessage.errors[0].path}.`
        else
            errMessage = errMessage.error;
        throw errMessage;
    }
    else return null;

}

async function editAnswer(answer) {

    const answerId = answer.id

    const response = await fetch(URI + `/answers/${answerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(answer),
        credentials: 'include'
    });

    if (!response.ok) {
        let errMessage = await response.json();
        if (response.status === 422)
            errMessage = `${errMessage.errors[0].msg} for ${errMessage.errors[0].path}.`
        else
            errMessage = errMessage.error;
        throw errMessage;
    }
    else return null;

}

async function getAnswerById(aid) {
    try {
        const response = await fetch(URI + `/answers/${aid}`)
        if (response.ok) {
            const answer = await response.json()
            console.log("from API",answer)
            return answer
        } else {
            throw new Error("Application error ")
        }
    } catch (ex) {

        throw new Error("Network error " + ex)
    }
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
            throw new Error(error)
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
        body: JSON.stringify(bodyObject),
        credentials: 'include'
    })
    return true
}

async function logIn(credentials) {

    const bodyObject = {
        email: credentials.email,
        password: credentials.password
    }
    const response = await fetch(URI + `/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(bodyObject)
    })
    if (response.ok) {
        const user = await response.json();
        return user;

    } else {
        const err = await response.text()
        throw err;
    }
}

async function deleteAnswer(answerId) {
  const response = await fetch(URI + `/answers/${answerId}`, {
    method: 'DELETE',
    credentials: 'include',  
  });

  if (!response.ok) {
    let errorMsg;
    try {
      const err = await response.json();
      errorMsg = err.error || 'Unknown error';
    } catch {
      errorMsg = 'Unable to delete the answer.';
    }
    throw new Error(errorMsg);
  }

  return null; 
}


async function logout() {
    const response = await fetch(URI + `/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    if (response.ok)
        return null;
}


async function getCurrentUser() {
  const res = await fetch(URI + '/session/current', {
    credentials: 'include'
  });

  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

export { loadQuestions, loadAnswers, upVote, logIn, logout, addAnswer, updateAnswer, getAnswerById, editAnswer, getCurrentUser, deleteAnswer };