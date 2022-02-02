import { existsNumWithVal, existsStrWithLength } from "/validations.js";
import { Book } from "/Book.js";
import { isAuthed, auth, writeUserLibrary } from "/auth.js";
function validateJSONLibrary(jsonLibrary) {
  const library = JSON.parse(jsonLibrary);
  if (library && library.length) {
    return library.filter(
      (book) =>
        existsStrWithLength(book.title) &&
        existsStrWithLength(book.author) &&
        existsNumWithVal(Number(book.pages)) &&
        typeof book.hasBeenRead === "boolean"
    );
  } else {
    return null;
  }
}

function createUserLibraryFromValidatedJSONLibrary(validatedLibrary) {
  if (validatedLibrary && validatedLibrary.length) {
    return validatedLibrary.map((book) => {
      return new Book(book.title, book.author, book.pages, book.hasBeenRead);
    });
  } else {
    return [];
  }
}

export function setInitialLibrary(library) {
  if (!library) {
    library = window.localStorage.getItem("userLibrary");
  }
  return createUserLibraryFromValidatedJSONLibrary(
    validateJSONLibrary(library)
  );
}

export function removeBookFromLibrary(i) {
  userLibrary.splice(i, 1);
}

let userLibrary = setInitialLibrary();

export function setUserLibrary(val) {
  userLibrary = val;
}
export function getUserLibrary() {
  return userLibrary;
}

function saveLibrary() {
  debugger;
  const userLibraryJSON = JSON.stringify(getUserLibrary());
  if (isAuthed()) {
    writeUserLibrary(auth.currentUser.uid, userLibraryJSON);
  } else {
    window.localStorage.setItem("userLibrary", userLibraryJSON);
  }
  return null;
}

window.onbeforeunload = saveLibrary;
