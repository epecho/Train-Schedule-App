// Initialize Firebase
var config = {
    apiKey: "AIzaSyAkn52Ey84P9UxlnBI65_9u3KWObwihrvM",
    authDomain: "my-awesome-project-4a911.firebaseapp.com",
    databaseURL: "https://my-awesome-project-4a911.firebaseio.com",
    storageBucket: "my-awesome-project-4a911.appspot.com",
    messagingSenderId: "610183199420"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var trainDB = firebase.database();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    var trainName = $("#trainNameInput").val().trim(); 
    var destination = $("#destinationInput").val().trim(); 
    var firstTrain = $("#firstTrainInput").val().trim(); 
    var firstMoment = moment(firstTime, "HH:mm").format('HH:mm'); 
    var frequency = $("#frequencyInput").val().trim();

// Initial Values
var newTrain: {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    firstMoment: firstMoment
    frequency: frequency
};


// Capture Button Click
$("#add-user").on("click", function () {
            // Don't refresh the page!
            event.preventDefault();
            database.ref().set({
                name: trainName,
                destination: destination,
                firstTrain: firstMoment,
                frequency: frequency
            });

});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().email);
    console.log(snapshot.val().age);
    console.log(snapshot.val().comment);

    // Change the HTML to reflect
    $("#name-display").html(snapshot.val().name);
    $("#email-display").html(snapshot.val().email);
    $("#age-display").html(snapshot.val().age);
    $("#comment-display").html(snapshot.val().comment);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);    
    
});






























$().htm("newTrain.name");















// Adds newTrain to Firebase database

trainInfo.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

// Creates variables for snaphot info

	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().firstTrain;
	var trainFreq = childSnapshot.val().frequency;

// Arrival minutes and Modulus

	var timeDiff = moment().diff(moment.unix(trainFirst), "minutes");
	var remainTime = moment().diff(moment.unix(trainFirst), "minutes") % trainFreq ;
	var trainMins = trainFreq - remainTime;

// Calculate the arrival time

	var arrivalTime = moment().add(trainMins, "m").format("HH:mm"); 
	console.log(trainMins);
	console.log(arrivalTime);
	console.log(moment().format("HH:mm"));


	
// Append each train's info into the table

$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + arrivalTime +"</td><td>"+ trainMins + "</td></tr>");

});

});







