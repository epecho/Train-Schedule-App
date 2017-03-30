//$(document).ready(function () {

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

// Code in the logic for storing and retrieving the most recent user.
var trainName = "";
var trainDest = "";
var trainFirst = "";
var trainFreq = 0;
var firstMoment = "";
var arrivalTime;


// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#train-dest-input").val().trim();
    var trainFirst = $("#train-first-input").val().trim();
    var trainFreq = $("#train-freq-input").val().trim();
    console.log(trainFreq);

    
    
    var newTrain = {
        trainName: trainName,
        trainDest: trainDest,
        trainFirst: trainFirst,
        trainFreq: trainFreq
    };


    trainDB.ref().push(newTrain);
    
    
    
    // Append each train's info into the table    
$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFirst + "</td><td>" + trainFreq + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    
    

});



// Firebase watcher + initial loader HINT: .on("value")
trainDB.ref().on("value", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().trainDest);
    console.log(snapshot.val().trainFirst);
    console.log(snapshot.val().trainFreq);


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);


});


// Adds newTrain to Firebase database
trainDB.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Creates variables for snapshot info
    var trainName = childSnapshot.val().trainName;
    var trainDest = childSnapshot.val().trainDest;
    var trainFirst = childSnapshot.val().trainFirst;
    var trainFreq = childSnapshot.val().trainFreq;

    // Arrival minutes and Modulus
    var timeDiff = moment().diff(moment.unix(trainFirst), "minutes");
    var remainTime = moment().diff(moment.unix(trainFirst), "minutes") % trainFreq;
    var trainMins = trainFreq - remainTime;

    // Calculate the arrival time
  arrivalTime = moment().add(trainMins, "m").format("HH:mm");
    console.log(trainMins);
    console.log(arrivalTime);
    console.log(moment().format("HH:mm"));
    
    
    

});






function theTime() {
    setTimeout("theTime()", 1000);
    // Assumptions
    var tFrequency = 20;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

}

theTime();


























//});