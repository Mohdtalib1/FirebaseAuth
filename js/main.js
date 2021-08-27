const firebaseConfig = {
  apiKey: "AIzaSyA8gav5pSY9X0GqMjjGeHhCjjByymFjUgo",
  authDomain: "authenticationassignment-80bc4.firebaseapp.com",
  databaseURL: "https://authenticationassignment-80bc4-default-rtdb.firebaseio.com",
  projectId: "authenticationassignment-80bc4",
  storageBucket: "authenticationassignment-80bc4.appspot.com",
  messagingSenderId: "815747555563",
  appId: "1:815747555563:web:64ff99caee24d425155eae",
  measurementId: "G-HRLMKYJ402"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function login(event) {
  event.preventDefault();

  var email = document.querySelector('.email').value;
  var password = document.querySelector('.password').value;

  if (email == "" || password == "") {
    alert("Please fill all the etries.");
  } else {
    document.getElementById("loader1").style.display = 'block';
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
            document.getElementById("loader1").style.display = 'none';
      });
  }
}

function signUp(event) {

  event.preventDefault();

  var username = document.querySelector('.name').value;
  var email = document.querySelector('.email').value;
  var password = document.querySelector('.password').value;
  var gender = document.querySelector('.gender').value;

  if (gender == "none" || email == "" || username == "" || password == "") {
    alert("Please Fill all the entries");
  } else {

document.getElementById("loader").style.display = 'block';

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        var currentUserId = user.uid;
        firebase.database().ref().child('Users').child(currentUserId).set({
          name: username,
          email: email,
          gender: gender
        }).then(function(ref) { //use 'child' and 'set' combination to save data in your own generated key
          location.href = 'profile.html';
          document.getElementById("loader").style.display = 'none';
        }, function(error) {
          alert(error);
          document.getElementById("loader").style.display = 'none';
        });


      })
      .catch(function(err) {
        alert(err);
        document.getElementById("loader").style.display = 'none';
      });
  }
}

function logout() {
  firebase.auth().signOut().then(() => {
    location.href = 'index.html';
  }).catch((error) => {
    alert(error);
  });
}

function checkCurrentUser() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      if (document.URL.includes("profile.html")) {

      } else {
        location.href = 'profile.html';
      }

    } else {
      if (document.URL.includes("profile.html")) {
        location.href = 'index.html';
      }
    }
  });
}

function getUserData() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var dataReference = firebase.database().ref().child('Users').child(user.uid);
      dataReference.on('value', (snapshot) => {
        const data = snapshot.val();
        document.getElementById("name").innerHTML = data.name;
          document.getElementById("email").innerHTML = data.email;
            document.getElementById("gender").innerHTML = data.gender;

              document.getElementById("loader3").style.display = 'none';


      });
    } else {
      location.href = 'index.html';
    }
  });


}
