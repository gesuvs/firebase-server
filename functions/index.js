require('dotenv/config');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const ALGOLIA_ID = process.env.ALGOLIA_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
admin.initializeApp(functions.config().firebase);

exports.onProductCreated = functions.firestore
    .document('eventos/{eventosID}')
    .onCreate((snap, context) => {
      const evento = snap.data();

      evento.objectID = context.params.eventosID;
      const index = client.initIndex(ALGOLIA_INDEX_NAME);
      return index.saveObject(evento);
    });

exports.onProductUpdated = functions.firestore
    .document('eventos/eventosID')
    .onUpdate(async (change, context) => {
      const evento = change.after.data();
      evento.objectID = context.params.eventosID;

      const index = client.initIndex(ALGOLIA_INDEX_NAME);
      await index.partialUpdateObject(evento);
    });

exports.onProductDeleted = functions.firestore
    .document('eventos/eventosID')
    .onDelete((snap) => {
      const index = client.initIndex(ALGOLIA_INDEX_NAME);
      return index.deleteObject(snap.id);
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
