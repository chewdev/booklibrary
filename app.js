const userLibrary = [];
const booksContainer = document.querySelector(".books-container");
function Book(title, author, pages, hasBeenRead) {
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

function addBookToLibrary(title, author, pages, hasBeenRead) {
  const newBook = new Book(title, author, pages, hasBeenRead);
  userLibrary.push(newBook);
}

// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
// addBookToLibrary("Holes", "Louis Sachar", 272, true);

function removeBookFromLibrary(title) {
  userLibrary = userLibrary.filter((book) =>
    book.title !== title ? true : false
  );
}

function showBooks() {
  userLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    const titleP = document.createElement("p");
    titleP.textContent = book.title;
    const authorP = document.createElement("p");
    authorP.textContent = book.author;
    const pagesP = document.createElement("p");
    pagesP.textContent = book.pages;
    const hasBeenReadP = document.createElement("p");
    hasBeenReadP.textContent = book.hasBeenRead
      ? "Has been read"
      : "Still needs to be read";
    bookDiv.appendChild(titleP);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(pagesP);
    bookDiv.appendChild(hasBeenReadP);
    booksContainer.appendChild(bookDiv);
  });
}

showBooks();
