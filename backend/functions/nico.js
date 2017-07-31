var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chabashoytest.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("users");
ref.once("value", function (snapshot) {
    console.log(snapshot.val());
});