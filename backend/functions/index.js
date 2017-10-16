const admin = require("firebase-admin");
const functions = require('firebase-functions');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chabashoytest.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("data/nico");

exports.nico = functions.https.onRequest((request, response) => {

    ref.update({
        username: "nicoCroce Pablo",
        email: "email@k.com",
        profile_picture: "imageUr23"
    })
    .then(function(){
        response.send('Actualizado   ' + new Date());
    })
    .catch(function(){
        response.send('ERROR');
    });
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


