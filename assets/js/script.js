$(document).ready(function () {

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
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#train-dest-input").val().trim();
    var trainFirst = $("#train-first-input").val().trim();
    var trainFreq = $("#train-freq-input").val().trim();
    var firstMoment = moment(firstTime, "HH:mm").format('HH:mm');

    // Initial Values
    var newTrain = {
        trainName: trainName,
        trainDest: trainDest,
        trainFirst: trainFirst,
        trainFreq: trainFreq,
        firstMoment: firstMoment
    };

    // Capture Button Click
    $("#add-user").on("click", function () {
        // Don't refresh the page!
        event.preventDefault();
        database.ref().set({
            trainName: trainName,
            trainDest: destination,
            trainFreq: trainFreq,
            firstMoment: firstMoment
        });
    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function (snapshot) {

        // Log everything that's coming out of snapshot
        console.log(snapshot.val().trainName);
        console.log(snapshot.val().trainDest);
        console.log(snapshot.val().trainFirst);
        console.log(snapshot.val().firstMoment);
        console.log(snapshot.val().frequency);

        // Change the HTML to reflect
        $("#train-name-input").html(snapshot.val().trainName);
        $("#train-dest-input").html(snapshot.val().trainDest);
        $("#train-first-input").html(snapshot.val().trainFirst);
        $("#train-freq-input").html(snapshot.val().comment);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);

    });

    // Adds newTrain to Firebase database
    trainInfo.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Creates variables for snaphot info
        var trainName = childSnapshot.val().trainName;
        var trainDest = childSnapshot.val().trainDest;
        var trainFirst = childSnapshot.val().trainFirst;
        var trainFreq = childSnapshot.val().trainFreq;

        // Arrival minutes and Modulus
        var timeDiff = moment().diff(moment.unix(trainFirst), "minutes");
        var remainTime = moment().diff(moment.unix(trainFirst), "minutes") % trainFreq;
        var trainMins = trainFreq - remainTime;

        // Calculate the arrival time
        var arrivalTime = moment().add(trainMins, "m").format("HH:mm");
        console.log(trainMins);
        console.log(arrivalTime);
        console.log(moment().format("HH:mm"));

        // Append each train's info into the table    
        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + arrivalTime + "</td><td>" + trainMins + "</td></tr>");

    });

});