
var firebaseConfig = {
apiKey: "AIzaSyDzF8wXH6JSLeW0m5HphLme0V7nV15srrk",
authDomain: "rumble-signup.firebaseapp.com",
databaseURL: "https://rumble-signup.firebaseio.com",
projectId: "rumble-signup",
storageBucket: "rumble-signup.appspot.com",
messagingSenderId: "142131072925",
appId: "1:142131072925:web:fdd8a9ed39d5f7b4e46974",
measurementId: "G-RDXNCRB8HG"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var firebase_ref = firebase.database().ref();
const visit_id = moment().unix()


function visit_save_firebase() {
  $.getJSON("https://ipapi.co/json/", function(response) {
    const response_with_url = Object.assign({}, response, { url: document.URL, time_stamp: moment().format() , email: ''});
    firebase_ref.child(visit_id).set(response_with_url)
  });
}

visit_save_firebase()


$("#email_button").on("click", function() {
  var email = $("#email_input").val();
  $.getJSON("https://ipapi.co/json/", function(response) {
    const response_with_url = Object.assign({}, response, { url: document.URL, time_stamp: moment().format() , email: email});
    firebase_ref.child(visit_id).set(response_with_url)
  });
	$("#email_input").val("");
	swal("Thank You!");
});