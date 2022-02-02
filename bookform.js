import { Book } from "/Book.js";
import { getUserLibrary, setUserLibrary } from "/library.js";
import { showBooks } from "/view.js";
import { closeModal } from "/modal.js";
const bookForm = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const hasBeenReadInput = document.querySelector("#read");

function addBookToLibrary(title, author, pages, hasBeenRead) {
  const newBook = new Book(title, author, pages, hasBeenRead);
  setUserLibrary(getUserLibrary().concat(newBook));
  showBooks();
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const hasBeenRead = hasBeenReadInput.checked;
  addBookToLibrary(title, author, pages, hasBeenRead);
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  hasBeenReadInput.checked = false;
  closeModal();
});

const formCheckboxButton = document.querySelector(".form-checkbox-button");
formCheckboxButton.addEventListener("keypress", (e) => {
  if (e.key.toLowerCase() === "enter") {
    e.target.click();
  }
});
