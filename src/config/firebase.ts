import admin, { ServiceAccount } from "firebase-admin";

import { firebase_variables } from "./environment";

const firebase = admin.initializeApp({
  credential: admin.credential.cert(firebase_variables as ServiceAccount),
});

firebase.firestore().settings({
  ignoreUndefinedProperties: true,
});

export default firebase;
