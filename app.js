  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDCj2CpFI5THiqwQ8m7LhVmtMjtp6YJpdk",
    authDomain: "train-scheduler-9c480.firebaseapp.com",
    databaseURL: "https://train-scheduler-9c480.firebaseio.com",
    projectId: "train-scheduler-9c480",
    storageBucket: "train-scheduler-9c480.appspot.com",
    messagingSenderId: "477069529311"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$('#add-btn').on('click', function(event) {
  console.log('addbtn clicked');
  event.preventDefault();

  var trainName = $('#train-input').val().trim();
  var destinationName = $('#destination-input').val().trim();
  var firstTrain = $('#first-train-input').val().trim();
  var frequencyInput = $('#frequency-input').val().trim();
  console.log(trainName, destinationName, firstTrain, frequencyInput)

  database.ref().push({
    train: trainName ,
    destination: destinationName,
    firstTrainTime: firstTrain ,
    frequency: frequencyInput  
  });
});

database.ref().on("child_added", function(childSnapshot) {
  console.log('childSnapshot fn');

    var now = moment();
  var theFirstTrain = childSnapshot.val().firstTrainTime;
  console.log(theFirstTrain);
  var timeFormat = "HH:mm";
  var convertedDate = moment(theFirstTrain, timeFormat);
  var newFirstTrainTime = moment(convertedDate).format("HH:mm A")
  var numberOfMin = moment(convertedDate).diff(moment(), "minutes");

$("#new-table").append("<tr>" + "<td class = 'table-name'>" + childSnapshot.val().train + "</td>" + 
    "<td class = 'table-name'>" + childSnapshot.val().destination + "</td>" + 
    "<td class = 'table-name'>" + childSnapshot.val().frequency + "</td>" + 
    "<td class = 'table-name'>" + newFirstTrainTime + "</td>" +
    "<td class = 'table-name'>" + numberOfMin + "</td>" + "</tr>");

});

