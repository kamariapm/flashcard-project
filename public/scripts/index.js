$('#flashcardsLoaded').hide()
$('#addCard').hide()
$("#answer").hide()
$("#hint").hide()
$('#flashcardsUpdated').hide()
$('#update').hide()
$('#cardID').hide()


//setting variables to count through arrays in the object and pass them into the object
let cardNumber = 0
let flashcardDB = []
//create function that counts through the number of the arrays in the object 
//and returns the number of the array back to 0 when it is to
//begin at the first card again
let question
let hint
let answer
function setUpFlashcard() {
    console.log(flashcardDB[cardNumber]._id)
    question = flashcardDB[cardNumber].question
    hint = flashcardDB[cardNumber].hint
    answer = flashcardDB[cardNumber].answer
    //printing the info from database in the pug/html
    $("#question").html(flashcardDB[cardNumber].question)
    $("#hint").html(flashcardDB[cardNumber].hint)
    $("#answer").html(flashcardDB[cardNumber].answer)
    cardNumber++
    console.log(cardNumber)
    if (cardNumber >= flashcardDB.length) {
        cardNumber = 0
    }
}

function checkForInput () {
    let empty = true
    while ($('#addCardQuest').val() || $('#addCardAnsw').val() || $('#addCardHint').val() == '') {
        console.log('waiting for new flashcard')
        // if ($('#addCardQuest').val() || $('#addCardAnsw').val() || $('#addCardHint').val() == ''){
            $('#ifEmptyStrings').show()
            empty
        // $('#ifEmptyStrings').on('shown.bs.modal', function () {
     if ($('#addCardQuest').val() && $('#addCardAnsw').val() && $('#addCardHint').val() !== '') {
        empty == false
     }


    }
}
//making the ajax call to recieve information from the database

$.ajax({
    type: 'GET',
    url: '/flashcards',
    success: function (data) {
        console.log(data)
        //setting variable for the data to come back as an array
        flashcardDB = data
        setUpFlashcard()
    },
    error: function (error) {
        console.log(error)

    }
})


$.ajax({
    type: 'PUT',
    url: '/flashcards',
    success: function (data) {
        console.log('put' + data)
        //setting variable for the data to come back as an array
        flashcardDB = data
        setUpFlashcard()
    },
    error: function (error) {
        console.log(error)
    }
})


$(document).ready(function () {
    $('#begin').click(function () {
        $('#flashcardsLoaded').show();
        $('#addCard').show();
        $('#welcomeCard').hide();
        $('#begin').hide();
        $('#welcomeToWebsite').hide();
        $('#update').show()

    })
    $('#flashcardsUploaded').hide();

    $('#submitNext').click(function () {
        $("#answer").hide();
        $("#hint").hide();

        setUpFlashcard()
        console.log("flashcardDB", flashcardDB)
    });

    $("#submitHint").click(function () {
        $("#hint").show();
    });

    $("#submitAnswer").click(function () {
        $("#answer").show();

    });
//Edit card button
    $('#update').click(function(){
        $('#flashcardsUpdated').show();
        $('#updateCardQuest').val(question)
        $('#updateCardHint').val(hint)
        $('#updateCardAnsw').val(answer)

    })

    $('#submitPut').click(function () {
      
    })
    
    $('#cancelPut').click(function () {
        $('#flashcardsUpdated').hide();
        $('#flashcardsLoaded').show();

    })

    $('#addCard').click(function () {
        $('#flashcardsLoaded').hide();
        $('#flashcardsUploaded').show();
        $('#ifEmptyStrings').hide();

    })
    $('#submit').click(function () {
        // checkForInput()
        // ($('#addCardQuest').val(' ') && $('#addCardAnsw').val(' ') && $('#addCardHint').val(' ')) {
        //     M.toast({ html: `Added to the deck!`, inDuration: 500 })
    })
    
    $('#cancel').click(function () {
        $('#flashcardsUploaded').hide();
        $('#flashcardsLoaded').show();

    })

})







// let cardNumber = 0
// let flashcard = []



// function setupFlashcard(cardNumber , data){
//     console.log(data)

//     if(cardNumber < data.length){
//         //printing the info from database in the pug/html
//         $("#question").html(data[cardNumber].question)
//         $("#answer").html(data[cardNumber].answer)
//         $("#hint").html(data[cardNumber].hint)
//     } else {
//         cardNumber=0
//     }        
// } 

// function hideShowHint() {
//     $('#hint').is(":hidden") ? $('#hint').show() : $('#hint').hide()
// }

// function hideShowAnswer() {
//     $('#answer').is(":hidden") ? $('#answer').show() : $('#answer').hide()
// }



//  $.ajax(
//     {
//         type: 'GET',
//         url: '/flashcards',
//         success: function (data) {
//             // $(document).ready(function () {
//                 //calling the function
//                 setupFlashcard(cardNumber, data)
//                 //making the buttons work
//                 $("#submitNext").click(function () {
//                     // $("#question").show()
//                     cardNumber ++
//                     if(cardNumber > data.length){
//                         cardNumber = 0
//                     } 

//                     setupFlashcard(cardNumber, data)   
//                 });

//                 $("#submitHint").click(function () {
//                    hideShowHint()

//                 });

//                 $("#submitAnswer").click(function () {
//                     hideShowAnswer()

//                  });

//              $('#addCard').click(function(){
//                 // $('.modal').modal();
//                 $('#flashcardsLoaded').hide()
//                 $('#flashcardsUploaded').show()
//              })
//              $('#submit').click(function(){
//                 // if ($('#addCardQuest') && $('#addCardAnsw') && $('#addCardHint') === ' ') {
//                 //     console.log('waiting for new flashcard')
//                 //     alert('waiting for new flashcard')

//                 // } else if ($('#addCardQuest') && $('#addCardAnsw') && $('#addCardHint') != ' ') {
//                 //     M.toast({html: `Added to the deck!`, inDuration: 500})
//                 // }
//              })
//              $('#cancel').click(function(){
//                 $('#flashcardsUploaded').hide()
//                 $('#flashcardsLoaded').show()

//              })

//             // });
//          },
//         error: function (err) {
//             console.log(err)
//         }


//     });

// function hideShowHint() {
//     $('#hint').is(":hidden") ? $('#hint').show() : $('#hint').hide()
// }

// function hideShowAnswer() {
//     $('#answer').is(":hidden") ? $('#answer').show() : $('#answer').hide()
// }

// function hideShowHintAnswer () {
//     if ()
// }
