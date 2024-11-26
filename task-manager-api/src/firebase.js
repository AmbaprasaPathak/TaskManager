// src/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-taskmanager-8ca55.firebaseio.com' 
});

const db = admin.firestore();

module.exports = { admin, db };