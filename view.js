import { getUserLibrary, removeBookFromLibrary } from "./library.js";

function makeShorterThan50Chars(str) {
  return str.length > 50 ? str.slice(0, 47) + "..." : str;
}

const booksContainer = document.querySelector(".books-container");
export function showBooks() {
  booksContainer.innerHTML = "";
  const library = getUserLibrary();
  library.forEach((book, i) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.dataset["libraryIndex"] = i;
    removeBtn.addEventListener("click", (e) => {
      removeBookFromLibrary(Number(e.target.dataset["libraryIndex"]));
      showBooks();
    });
    removeBtn.textContent = "Remove Book";
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("card-title-container");
    const titleH2 = document.createElement("h2");
    titleH2.textContent = makeShorterThan50Chars(book.title);
    titleH2.classList.add("card-title");
    titleDiv.appendChild(titleH2);
    const authorP = document.createElement("p");
    authorP.classList.add("card-author");
    authorP.textContent = `By: ${makeShorterThan50Chars(book.author)}`;
    const pagesP = document.createElement("p");
    pagesP.classList.add("card-pages");
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
      const userLibrary = getUserLibrary();
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

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(pagesP);
    bookDiv.appendChild(hasBeenReadFormGroup);
    bookDiv.appendChild(removeBtn);
    removeBtn.classList.add("changed-button");
    bookDiv.appendChild(removeBtn);
    booksContainer.appendChild(bookDiv);
  });
}
