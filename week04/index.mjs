import express from 'express'
import morgan from 'morgan';

const app = express() ;

app.use(express.json())
app.use(morgan('dev'))

// Define routes and web pages
app.get('/', (req, res) =>	res.send('Hello World!')) ;

app.get('/user', (req, res) => {
    let u = { name: 'Fulvio', id:123 }
    res.json(u)
})

app.post('/user', (req, res) => {
    console.log(req.body)
    res.end()
})

app.get('/user/:id/name', (req, res) => {
    const id = req.params.id 

    res.json({"id": id, "name": "Tom"})
})

// Activate server
app.listen(3000, () =>	console.log('Server	ready')) ;