/* Same of week 03, but without any internal methods */
import dayjs from 'dayjs';

function Answer(id, text, email, userId, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.userId = userId;
  this.score = score;
  this.date = dayjs(date).format('YYYY-MM-DD');
}

function Question(id, text, email, userId, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.userId = userId;
  this.date = dayjs(date).format('YYYY-MM-DD');

  this.addAnswer = (answer) =>{
    this.answers.push(answer);
  }

  this.getAnswers = () => {
    return [...this.answers];
  }
}

export { Question, Answer };