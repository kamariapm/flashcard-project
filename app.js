const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');


const app = express()
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


let db

MongoClient.connect('mongodb://sandbox:project1@ds117888.mlab.com:17888/flashcards', (err, database) => {
    if (err) return console.log(err)
    db = database.db('flashcards')
    app.listen(3000, function () {
        console.log('Listening on port 3000')
    })
})


app.get('/', (req, res) => {
    let cursor = db.collection('flashcards').find().toArray(function(err, results){
        if (err) return console.log(err)
        console.log(results)
        console.log("question", results[0].question)
        res.render('index.pug', {flashcards: results.toString(), test_value:typeof(results[0].question)})  
    })
})

app.post('/flashcards', (req, res) => {
    
    db.collection('flashcards').save(req.body, (err,result) =>{
        console.log(req.body)
        if (err) return console.log(err)
        console.log('saved to database')
        console.log(req.body) 
        res.redirect('/')
    })
})