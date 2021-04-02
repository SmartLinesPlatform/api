import admin, { ServiceAccount } from "firebase-admin";
import * as fireorm from "fireorm";

import { firebase_variables } from "./environment";

admin.initializeApp({
  credential: admin.credential.cert(firebase_variables as ServiceAccount),
});

admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

const firestore = admin.firestore();

fireorm.initialize(firestore);

export default firestore;
