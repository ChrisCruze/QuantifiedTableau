// Initialize Firebase
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var myFirebaseRef = firebase.database().ref();
var url = window.location.href;
var unique_id = moment().unix()

// get visit data
jQuery(function($) {
    $.getJSON("https://ipapi.co/json/", function(response) {
      console.log(response.country);
      console.log(response.city);
      console.log(response.region);
      console.log(response.timezone);
      myFirebaseRef.child(unique_id).set({
        click:false,
        email: 'null',
        url: url,
        country:response.country,
        city:response.city,
        region: response.region,
        timezone:response.timezone,

      });
    });
  });


  // get email and handle //

  function handleForm(event) {
    // prevent page reload
    event.preventDefault();
    var userEmail = document.getElementById('email').value;

    signupError.innerHTML = '';
    signupSuccess.innerHTML = '';
    if (userEmail.includes("@")) {




    jQuery(function($) {
        $.getJSON("https://ipapi.co/json/", function(response) {
          console.log(response.country);
          console.log(response.city);
          console.log(response.region);
          console.log(response.timezone);
          myFirebaseRef.child(unique_id).set({
            click:true,
            email: userEmail,
            url: url,
            country:response.country,
            city:response.city,
            region: response.region,
            timezone:response.timezone,
            
          });
        });
      });


      jQuery(function($) {
        $("#signup-success").html("Thanks, we'll be in touch soon!").show().delay(3000).fadeOut(2000);
        $("#modalLoginForm").modal("hide");
      });
    } else {
      document.getElementById("email").value = "";
      jQuery(function($) {
        $("#signup-error").html('Please make sure you entered your e-mail correctly!').show().delay(3000).fadeOut(2000);
        $("#modalLoginForm").modal("hide");
      });
      return false;
    }
    document.getElementById("email").value = "";
  };


// get focused push and url //
  function handlePush(event) {
    jQuery(function($) {
        $.getJSON("https://ipapi.co/json/", function(response) {
          console.log(response.country);
          console.log(response.city);
          console.log(response.region);
          console.log(response.timezone);
          myFirebaseRef.child(unique_id).set({
            click:true,
            email: 'null',
            url: url,
            country:response.country,
            city:response.city,
            region: response.region,
            timezone:response.timezone,
            
          });
        });
      });



  }


  // message handle and append

var signupSuccess = document.getElementById('signup-success');
var signupError = document.getElementById('signup-error');


var form = document.getElementById("signup-form");
var pushBtn = document.getElementById("push-btn");

form.addEventListener('submit', handleForm);
pushBtn.addEventListener('click', handlePush);