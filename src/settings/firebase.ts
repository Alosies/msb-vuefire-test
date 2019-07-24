import firebase from 'firebase';
import 'firebase/firestore';

export const db = firebase
  .initializeApp({ projectId: 'test-vuefire-d0816' })
  .firestore();
