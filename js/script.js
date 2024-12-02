// Code to handle dialog opening and closing
const cardContainer = document.querySelector(".cards-container");
const cardAdd = document.querySelector(".card-add");
const dialog = document.querySelector("#card-form");
const cancelDialog = document.querySelector("#cancel-dialog");
const template = document.querySelector("template");

cardAdd.addEventListener("click", (event) => {
    dialog.showModal();
});

cancelDialog.addEventListener("click", (event) => {
    dialog.close();
});

// Code to handle Library functions
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary(theHobbit);

function addBookToLibrary(book) {
    myLibrary.push(book);
    pushBookToUI(book, myLibrary.indexOf(book));
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

// Code to handle connecting Library to UI
function pushBookToUI(book, index) {
    const clone = template.content.cloneNode(true);
    clone.querySelector("#book-remove").setAttribute("data-index", index);
    clone.querySelector(".card-title").textContent = book.title;
    clone.querySelector(".author-name").textContent = book.author;
    clone.querySelector(".pages").textContent = book.pages;
    clone.querySelector(".read").textContent = (book.read) ? "completely read" : "not read yet";
    cardContainer.insertBefore(clone, cardContainer.firstChild);
}

if (myLibrary.length !== 0) {
    const cardRemove = document.querySelector("#book-remove");

    cardRemove.addEventListener("click", (event) => {
        removeBookFromLibrary(event.target.getAttribute("data-index"));
        event.target.parentNode.remove();
    });
}
