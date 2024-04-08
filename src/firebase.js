// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-1cfa2.firebaseapp.com",
  projectId: "insta-next-1cfa2",
  storageBucket: "insta-next-1cfa2.appspot.com",
  messagingSenderId: "778952103286",
  appId: "1:778952103286:web:be9e758a286697ceb4d657",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 3 * 1024 *1024 &&
//       request.resource.contentType.matches('imgae/.*')
//     }
//   }
// }
