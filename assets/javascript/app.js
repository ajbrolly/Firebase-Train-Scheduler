  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC519iOJi8tbM45WPdfph3XP-nxkdtez-o",
    authDomain: "train-project-372d9.firebaseapp.com",
    databaseURL: "https://train-project-372d9.firebaseio.com",
    projectId: "train-project-372d9",
    storageBucket: "",
    messagingSenderId: "389811468420"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Button to add new train values to list
  $('#add-train-btn').on('click', function() {
    event.preventDefault();

    // Get user input values
    var trainName = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var trainTime = moment($('#first-train-input').val().trim(), 'HH:mm').format('X');
    var frequency = $('#freq-input').val().trim();

    // Creates object for holding traing data
    var newTrain = {
      name: trainName,
      destination: destination,
      time: trainTime,
      frequency: frequency
    }

    // Add data to Firebase database
    database.ref().push(newTrain);

    console.log(newTrain);

    // Clear form values once form has been submitted 
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#first-train-input').val('');
    $('#freq-input').val('');
  });

  database.ref().on('child_added', function(snapshot) {
    var train = snapshot.val();

    console.log(train.name);
    console.log(train.destination);
    console.log(train.time);

    // Format First Train time
    var firstTrain = moment.unix(train.time).format('HH:mm');


    // Calculate the next train time
    var newTime = moment(firstTrain, 'hh:mm')
        .add(train.frequency, 'minutes')
        .format('hh:mm');
    console.log(newTime);


    // Current Time
    var current = moment().format('hh:mm');
    console.log(current);

    // Calculate Minutes away from next Traim 
    var nextTrain = moment(newTime, 'hh:mm')
        .subtract(current, 'hh:mm')
        .format('mm');
    console.log(nextTrain);


    // Minutes to Next Train
    // var nextTrain = newTime.from(current, true);

    $('#train-table > tbody').append('<tr><td>' + train.name + '</td><td>' + train.destination + '</td><td>' + train.frequency + '</td><td>' + newTime + '</td><td>' + nextTrain + '</td>')
  });









