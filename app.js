import {
  getUserSignIn,
  getUserStoredLibrary,
  writeUserLibrary,
  signOutUser,
  auth,
  isAuthed,
} from "/auth.js";

import { setInitialLibrary, getUserLibrary, setUserLibrary } from "/library.js";
import { showBooks } from "/view.js";

const signInButton = document.querySelector(".sign-in-out");
signInButton.addEventListener("click", () => {
  if (isAuthed()) {
    writeUserLibrary(
      auth.currentUser.uid,
      JSON.stringify(getUserLibrary())
    ).then((result) => {
      signOutUser();
    });

    setUserLibrary([]);
    signInButton.textContent = "Sign In";
    showBooks();
    return;
  }
  const userPromise = getUserSignIn();
  userPromise.then((user) => {
    if (user) {
      getUserStoredLibrary(user.uid).then((library) => {
        signInButton.textContent = "Sign Out";
        if (library) {
          setUserLibrary(setInitialLibrary(library));
          showBooks();
        } else {
          return;
        }
      });
    }
  });
});

showBooks();
