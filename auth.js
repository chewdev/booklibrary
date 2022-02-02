import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";

import {
  getDatabase,
  ref,
  child,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
import { setInitialLibrary, setUserLibrary } from "/library.js";
import { showBooks } from "/view.js";
//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUF-tP1XYxf3pwVbZlGWeAQfsMAzHuSq8",
  authDomain: "chewdev-library.firebaseapp.com",
  projectId: "chewdev-library",
  storageBucket: "chewdev-library.appspot.com",
  messagingSenderId: "1045062427594",
  appId: "1:1045062427594:web:d23696a38516bccc98e533",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export function isAuthed() {
  return !!auth.currentUser;
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector(".sign-in-out").textContent = "Sign Out";
    getUserStoredLibrary(user.uid).then((library) => {
      setUserLibrary(setInitialLibrary(library));
      showBooks();
    });
  } else {
    document.querySelector(".sign-in-out").textContent = "Sign In";
  }
});

export function signOutUser() {
  auth
    .signOut()
    .then((res) => {
      return;
    })
    .catch((error) => {
      console.error("log out error");
    });
}

export async function getUserSignIn() {
  const userObj = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return user;
    })
    .catch((error) => {
      //GoogleAuthProvider.credentialFromError(error)
      return null;
    });
  return userObj;
}

const database = getDatabase(app);

export function writeUserLibrary(userId, library) {
  return set(ref(database, "users/" + userId), {
    library,
  });
}

const dbRef = ref(getDatabase());
export function getUserStoredLibrary(userId) {
  return get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().library;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Error retrieving library");
    });
}
