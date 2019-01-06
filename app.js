const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const path = require('path');
const app = express()
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


let db
//variable that allows data to come back as an array (translating for JS) since Mongoose isn't being used
let triviaCards = []

MongoClient.connect('mongodb://sandbox:project1@ds117888.mlab.com:17888/flashcards', (err, database) => {
    if (err) return console.log(err)
    db = database.db('flashcards')
    app.listen(3000, function () {
        console.log('Listening on port 3000')
    })
})

//Retrieving cards from the database
app.get('/', (req, res) => {
    //.find.toArray makes it a JSON file
    let cursor = db.collection('flashcards').find().toArray(function (err, results) {
        if (err) return console.log(err)
        triviaCards = results
        console.log(results)
        res.render('index.pug', { flashcards: results })
    })
})

app.get('/flashcards', (req, res) => {
    res.send(triviaCards)
    console.log(triviaCards)
})

//Making call/route to be able to add cards
app.post('/flashcards', (req, res) => {

    db.collection('flashcards').save(req.body, (err, results) => {
        console.log(req.body)
        if (err) return console.log(err)
        console.log('saved to database')
        console.log(req.body)
        res.redirect('/')
    })
})
//Making call/route to pull object id to update cards
app.post('/flashcards/:id', (req, res) => {
    console.log('in put' + req.params.id)
    let item = {
        question: req.body.question,
        hint: req.body.hint,
        answer:req.body.answer
    }
    let id = req.body.id
    db.collection('flashcards').updateOne({_id:ObjectID(id)}, {$set:item}, (err, results) => {
        if (err) return console.log(err)
        console.log('PUT to database')
        res.redirect('/')
    })
})
//Making call/route to pull objID to delete cards
app.post('/flashcards/delete/:id', (req, res) => {
    console.log('in delete' + req.params.id)
    let id = req.body.id
    db.collection('flashcards').deleteOne({_id:ObjectID(id)}, (err, results) => {
        if (err) return console.log(err)
        console.log('delete from database')
        res.redirect('/')
    })
})