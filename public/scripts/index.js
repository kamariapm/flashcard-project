//hiding containers & buttons that don't need to be seen when the page first loads
$('#flashcardsLoaded').hide()
$('#addCard').hide()
$("#answer").hide()
$("#hint").hide()
$('#flashcardsUpdated').hide()
$('#update').hide()
$('#flashcardsDelete').hide()
$('#deleteCard').hide()
$('#flashcardsUploaded').hide();

//setting variables to count through arrays in the object and pass them into the object
let cardNumber = 0
let flashcardDB = []
//set variables to populate delete/edit card containers with the current flashcard info
let question
let hint
let answer
let id
//function that counts through the number of arrays in the object and returns 
//the number of the array back to 0 to begin at the first card again
function setUpFlashcard() {
    id = flashcardDB[cardNumber]._id
    question = flashcardDB[cardNumber].question
    hint = flashcardDB[cardNumber].hint
    answer = flashcardDB[cardNumber].answer
    //printing the info from database in the pug/html
    $("#question").html(flashcardDB[cardNumber].question)
    $("#hint").html(flashcardDB[cardNumber].hint)
    $("#answer").html(flashcardDB[cardNumber].answer)
    cardNumber++
    if (cardNumber >= flashcardDB.length) {
        cardNumber = 0
    }
}

//checking for empty strings when adding new flashcards
//function is not working properly YET
function checkForInput() {
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

$(document).ready(function () {
    //"Begin" button which shows/hides necessary containers and buttons
    $('#begin').click(function () {
        $('#flashcardsLoaded').show();
        $('#addCard').show();
        $('#welcomeCard').hide();
        $('#begin').hide();
        $('#welcomeToWebsite').hide();
        $('#update').show()
        $('#deleteCard').show()
    })
    //Next button
    $('#submitNext').click(function () {
        $("#answer").hide();
        $("#hint").hide();
        setUpFlashcard()
    });
    //Hint button
    $("#submitHint").click(function () {
        $("#hint").show();
    });
    //Answer button
    $("#submitAnswer").click(function () {
        $("#answer").show();
    });

//When user wants to update/edit a card
    //Edit card button -- displays the value of the current card so user can 
    $('#update').click(function () {
        $('#flashcardsUpdated').show();
        $('.id').val(id).hide()
        $('#updateCardQuest').val(question)
        $('#updateCardHint').val(hint)
        $('#updateCardAnsw').val(answer)
        $('#flashcardsDelete').hide()
        $('#deleteCard').hide()
        $('#flashcardsLoaded').hide()
    })
   
    //Cancel button when user no longer wants to edit card
    $('#cancelPut').click(function () {
        $('#flashcardsUpdated').hide();
        $('#flashcardsLoaded').show();
        $('#deleteCard').show()
    })

//When user wants to add a new card
    //Add card button
    $('#addCard').click(function () {
        $('#flashcardsLoaded').hide();
        $('#flashcardsUploaded').show();
        $('#ifEmptyStrings').hide();
    })
    //Submit button for adding a new flashcard
    $('#submit').click(function () {
        //checkForInput function is not currently working, will add that here when kinks are worked out
        // checkForInput()
        // ($('#addCardQuest').val(' ') && $('#addCardAnsw').val(' ') && $('#addCardHint').val(' ')) {
        //     M.toast({ html: `Added to the deck!`, inDuration: 500 })
    })
    //Cancel button when user no longer wants to add a new flashcard
    $('#cancel').click(function () {
        $('#flashcardsUploaded').hide();
        $('#flashcardsLoaded').show();
    })

//When user wants to delete a card
    //Delete Card button--hide/shows necessary items
    $('#deleteCard').click(function () {
        $('#flashcardsLoaded').hide()
        $('#flashcardsDelete').show()
        $('.id').val(id).hide()
        $('#deleteCardQuest').val(question)
        $('#deleteCardHint').val(hint)
        $('#deleteCardAnsw').val(answer)
        $('#update').hide()
    })
    //Cancel button when user no longer wants to delete card
    $('#cancelDelete').click(function () {
        $('#flashcardsDelete').hide()
        $('#flashcardsLoaded').show()
        $('#update').show()
    })

})
