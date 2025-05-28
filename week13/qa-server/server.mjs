// import
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { check, validationResult } from 'express-validator';
import { listQuestions, getQuestion, listAnswersOf, addAnswer, updateAnswer, voteAnswer, getAnswer, deleteAnswer } from './dao.mjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { getUser } from './dao-user.mjs';
import session from 'express-session';
// init
const app = express();
const port = 3001;

// middleware
app.use(express.json());
app.use(morgan('dev'));

// Allow requests only from this specific origin, our frontend running on localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));;


passport.use(new LocalStrategy({ usernameField: 'email' }, async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { 
  return cb(null, user);
  
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));



app.post('/api/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).send(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);
      
      // req.user contains the authenticated user, we send all the user info back
      return res.status(201).json(req.user);
    });
  })(req, res, next);
});





/* ROUTES */

// GET /api/questions
app.get('/api/questions', (request, response) => {
  listQuestions()
    .then(questions => {
      setTimeout(() => { response.json(questions) }, 2000)
    })
    .catch(() => response.status(500).end());
});

// GET /api/questions/<id>
app.get('/api/questions/:id', async (req, res) => {
  try {
    const question = await getQuestion(req.params.id);
    if (question.error)
      res.status(404).json(question);
    else
      res.json(question);
  } catch {
    res.status(500).end();
  }
});


app.get('/api/answers/:aid', async (req, res) => {
  try {
    const answer= await getAnswer(req.params.aid);
    if (answer.error)
      res.status(404).json(answer);
    else
      res.json(answer);
  } catch {
    res.status(500).end();
  }
});


// GET /api/questions/<id>/answers
app.get('/api/questions/:id/answers', async (req, res) => {
  try {
    const question = await getQuestion(req.params.id)
    if (question?.error) {
      res.status(500).json({ error: question.error })
    } else {
      const answers = await listAnswersOf(req.params.id);
      res.json(answers);
    }
  } catch {
    res.status(500).json({ error: "Database error" });
  }
});

app.use(isLoggedIn);

// POST /api/questions/<id>/answers
app.post('/api/questions/:id/answers', [
  check('text').notEmpty(),
  check('email').isEmail(),
  check('score').isNumeric(),
  check('date').isDate({ format: 'YYYY-MM-DD', strictMode: true })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const newAnswer = req.body;

  const questionId = req.params.id;

  try {
    const id = await addAnswer(newAnswer, questionId);
    res.status(201).location(id).end();
  } catch (e) {
    console.error(`ERROR: ${e.message}`);
    res.status(503).json({ error: 'Impossible to create the answer.' });
  }
});

// PUT /api/answers/<id>
app.put('/api/answers/:id', [
  check('text').notEmpty(),
  check('email').isEmail(),
  check('score').isNumeric(),
  check('date').isDate({ format: 'YYYY-MM-DD', strictMode: true })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  console.log(req.body)
  const answerToUpdate = req.body;
  answerToUpdate.id = req.params.id;

  console.log("user",req.user)

  if (req.body.email != req.user.email){
    return res.status(403).json({ error: 'You are not authorized to modify this answer.' });
  }

  try {
    await updateAnswer(answerToUpdate);
    res.status(200).end();
  } catch {
    res.status(503).json({ 'error': `Impossible to update answer #${req.params.id}.` });
  }
});



// POST /api/answers/<id>/vote
app.post('/api/answers/:id/vote',  [
  check('vote').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const answerId = req.params.id;
  try {
    const num = await voteAnswer(answerId, req.body.vote);
    if (num === 1)
      res.status(204).end();
    else
      throw new Error(`Error in casting a vote for answer #${answerId}`);
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
});


app.delete('/api/answers/:id', isLoggedIn, async (req, res) => {
  try {
    const deleted = await deleteAnswer(parseInt(req.params.id));
    if (deleted === 1)
      res.status(204).end(); 
    else
      res.status(404).json({ error: `Answer #${req.params.id} not found.` });
  } catch (err) {
    console.error(err);
    res.status(503).json({ error: `Impossible to delete answer #${req.params.id}.` });
  }
});

app.get('/api/session/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);  // user is stored in the session by passport
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.post('/api/logout', (req, res) => {
  req.logout(() => {
    res.end();
  });
});


// far partire il server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });