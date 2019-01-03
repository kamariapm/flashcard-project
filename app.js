// const express = require('express');
// const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const path = require('path');


// const app = express()
// app.set('view engine', 'pug');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true }));


// let db

// function parseMongoData(mongoObject) {
//     const jObject = {
//         question: mongoObject.question,
//         answer: mongoObject.answer,
//         hint: mongoObject.hint
//     }
//     console.log("insideparseMongo",jObject)
//     return jObject

// }

// MongoClient.connect('mongodb://sandbox:project1@ds117888.mlab.com:17888/flashcards', (err, database) => {
//     if (err) return console.log(err)
//     db = database.db('flashcards')
//     app.listen(3000, function () {
//         console.log('Listening on port 3000')
//     })
// })


// app.get('/', (req, res) => {
//     let cursor = db.collection('flashcards').find().toArray(function(err, results){
//         if (err) return console.log(err)
//         // const js_results = results.map(flashcard => parseMongoData(flashcard))
//         // console.log(js_results)
//         // const test_object = {val1: 1, val2: 2}
//         res.render('index.pug', {flashcards: (results)})
//     }) 
// }) 

// , test_value:(results[0].question), js_results: JSON.stringify(js_results), test_object: JSON.stringify(test_object)}) 

// app.post('/flashcards', (req, res) => {

//     db.collection('flashcards').save(req.body, (err,result) =>{
//         console.log(req.body)
//         if (err) return console.log(err)
//         console.log('saved to database')
//         console.log(req.body) 
//         res.redirect('/')
//     })
// })



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
let triviaCards = []

MongoClient.connect('mongodb://sandbox:project1@ds117888.mlab.com:17888/flashcards', (err, database) => {
    if (err) return console.log(err)
    db = database.db('flashcards')
    app.listen(3000, function () {
        console.log('Listening on port 3000')
    })
})



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

app.post('/flashcards', (req, res) => {

    db.collection('flashcards').save(req.body, (err, results) => {
        console.log(req.body)
        if (err) return console.log(err)
        console.log('saved to database')
        console.log(req.body)
        res.redirect('/')
    })
})


app.put('/flashcards/:id', (req, res) => {
    console.log('in put' + req.params.id)
    let item = {
        question: req.body.question,
        hint: req.body.hint,
        answer:req.body.answer
    }
    let id = req.body.id
    db.collection('flashcards').updateOne({_id:ObjectId(id)}, {$set:item}, (err, results) => {
        if (err) return console.log(err)
        console.log('PUT to database')
        res.redirect('/')
    })
})