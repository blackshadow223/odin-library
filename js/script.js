// // Code to handle dialog opening and closing
// const cardContainer = document.querySelector(".cards-container");
// const cardAdd = document.querySelector(".card-add");
// const dialog = document.querySelector("#card-form");
// const cancelDialog = document.querySelector("#cancel-dialog");
// const template = document.querySelector("template");

// cardAdd.addEventListener("click", (event) => {
//     dialog.showModal();
// });

// cancelDialog.addEventListener("click", (event) => {
//     dialog.close();
// });

// // Code to handle Library functions
// const myLibrary = [];

// function Book(title, author, pages, read) {
//     this.id = Book.counter++;
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }
// Book.counter = 0;


// theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
// addBookToLibrary(theHobbit);

// function addBookToLibrary(book) {
//     myLibrary.push(book);
//     pushBookToUI(book, book.id);
// }

// function removeBookFromLibrary(identifier) {
//     myLibrary.forEach((item) => {
//         if (item.id === identifier) {
//             myLibrary.splice(myLibrary.indexOf(item), 1);
//         }
//     });
// }

// // Code to handle connecting Library to UI
// function pushBookToUI(book, identifier) {
//     const clone = template.content.cloneNode(true);
//     clone.querySelector("#book-remove").setAttribute("data-identifier", identifier);
//     clone.querySelector(".card-title").textContent = book.title;
//     clone.querySelector(".author-name").textContent = book.author;
//     clone.querySelector(".pages").textContent = book.pages;
//     clone.querySelector(".read").textContent = (book.read) ? "completely read" : "not read yet";
//     cardContainer.insertBefore(clone, cardContainer.firstChild);
// }

// cardContainer.addEventListener("click", (event) => {
//     if (event.target.id === "book-remove") {
//         removeBookFromLibrary(parseInt(event.target.getAttribute("data-identifier"))); // Always convert to numerical form
//         event.target.parentNode.remove();
//     }
// });

// // Code to handle getting date from UI to Library
// const form = document.querySelector("form");

// form.addEventListener("submit", (event) => {
//     const { title, author, pages, read } = form.elements;
//     const newBook = new Book(title.value, author.value, parseInt(pages.value), read.checked);
//     addBookToLibrary(newBook);

//     form.reset();
// });



