const userLibrary = [];
const booksContainer = document.querySelector(".books-container");
function Book(title, author, pages, hasBeenRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasBeenRead = hasBeenRead;
}
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.hasBeenRead ? "already read" : "not read yet"
  }`;
};
Book.prototype.toggleHasBeenRead = function () {
  this.hasBeenRead = !this.hasBeenRead;
};

function addBookToLibrary(title, author, pages, hasBeenRead) {
  const newBook = new Book(title, author, pages, hasBeenRead);
  userLibrary.push(newBook);
  showBooks();
}

function removeBookFromLibrary(i) {
  userLibrary.splice(i, 1);
}

function showBooks() {
  booksContainer.innerHTML = "";
  userLibrary.forEach((book, i) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.dataset["libraryIndex"] = i;
    removeBtn.addEventListener("click", (e) => {
      removeBookFromLibrary(Number(e.target.dataset["libraryIndex"]));
      showBooks();
    });
    removeBtn.textContent = "X";
    const titleP = document.createElement("p");
    titleP.textContent = book.title;
    titleP.classList.add("card-title");
    const authorP = document.createElement("p");
    authorP.textContent = "By: " + book.author;
    const pagesP = document.createElement("p");
    pagesP.textContent = "Total pages: " + book.pages;
    const hasBeenReadFormGroup = document.createElement("div");
    hasBeenReadFormGroup.classList.add("form-group");
    const hasBeenReadCheckboxGroup = document.createElement("div");
    const toggleHasBeenReadCheckbox = document.createElement("input");
    toggleHasBeenReadCheckbox.type = "checkbox";
    toggleHasBeenReadCheckbox.id = "has-been-read-" + i;
    toggleHasBeenReadCheckbox.name = "has-been-read-" + i;
    toggleHasBeenReadCheckbox.checked = book.hasBeenRead;
    toggleHasBeenReadCheckbox.classList.add("form-checkbox-input");
    toggleHasBeenReadCheckbox.addEventListener("change", (e) => {
      const ind = i;
      userLibrary[ind].toggleHasBeenRead();
      showBooks();
    });
    const hasBeenReadLabel = document.createElement("label");
    hasBeenReadLabel.htmlFor = "has-been-read-" + i;
    hasBeenReadLabel.classList.add("form-checkbox-label");
    const hasBeenReadLabelSpan = document.createElement("span");
    hasBeenReadLabelSpan.classList.add("form-checkbox-button");
    hasBeenReadLabelSpan.ariaRoleDescription = "checkbox";
    hasBeenReadLabel.appendChild(hasBeenReadLabelSpan);
    const text = book.hasBeenRead ? "Has been read" : "Still needs to be read";
    hasBeenReadLabel.innerHTML += text;
    hasBeenReadCheckboxGroup.appendChild(toggleHasBeenReadCheckbox);
    hasBeenReadCheckboxGroup.appendChild(hasBeenReadLabel);
    hasBeenReadFormGroup.appendChild(hasBeenReadCheckboxGroup);
    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(titleP);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(pagesP);
    bookDiv.appendChild(hasBeenReadFormGroup);
    booksContainer.appendChild(bookDiv);
  });
}

const modalBtn = document.querySelector(".modal-btn");
const modalCloseBtn = document.querySelector(".modal-close");
const bodyOverlay = document.querySelector(".body-overlay");
const modal = document.querySelector("[data-modal='add']");

function openModal() {
  modal.classList.add("is-visible");
  bodyOverlay.classList.add("is-overlayed");
}

function closeModal() {
  modal.classList.remove("is-visible");
  bodyOverlay.classList.remove("is-overlayed");
}

modalBtn.addEventListener("click", () => {
  openModal();
  modal.querySelector(".modal-close").addEventListener("click", () => {
    closeModal();
  });
});

const bookForm = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const hasBeenReadInput = document.querySelector("#read");

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
