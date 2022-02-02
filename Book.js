export function Book(title, author, pages, hasBeenRead = false) {
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
