class Book {
    // Private Variables
    static #counter = 0;
    #id;
    #title;
    #author;
    #pages;
    #read;

    // Constructor
    constructor(Title, Author, Pages, Read) {
        this.#id = Book.#counter++;
        this.#title = Title;
        this.#author = Author;
        this.#pages = Pages;
        this.#read = Read;
    }

    // API
    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }

    get read() {
        return this.#read;
    }
}

class Library {
    // Private Variables
    #myLibrary = [];
    #cardContainer;
    #dialog;
    #cancelDialog;
    #template;
    #form;


    // Constructor
    constructor(...books) {
        books.forEach(book => {
            if (book instanceof Book) {
                this.#myLibrary.push(book);
            }
        });

        this.#cacheDOM();
        this.#bindEvents();
        this.#render();
    }


    // Private methods
    #cacheDOM() {
        this.#cardContainer = document.querySelector(".cards-container");
        this.#dialog = document.querySelector("#card-form");
        this.#cancelDialog = this.#dialog.querySelector("#cancel-dialog");
        this.#template = document.querySelector("template").content;
        this.#form = document.querySelector("form");
    }

    #bindEvents() {
        this.#cardContainer.addEventListener("click", this.#handleContainer.bind(this));
        this.#cancelDialog.addEventListener("click", this.#closeModal.bind(this));
        this.#form.addEventListener("submit", this.#addBookToLibrary.bind(this));
    }

    #render() {
        this.#myLibrary.forEach(book => {
            for (let x of this.#removeAbleElement()) {
                if (book.id === x.identifier) return;
            }

            this.#addBookToUI(book);
        });

        for (let x of this.#removeAbleElement()) {
            const book = this.#myLibrary.find(book => book.id === x.identifier);
            if (!book) {
                x.element.remove();
                return; // Finish rendering right away
            }
        }
    }


    // Private API
    #handleContainer(event) {
        const className = event.target.className.toString();

        if (className.includes("card-add")) {
            this.#showModal();
        } else if (className.includes("card-remove")) {
            this.#removeBookFromLibrary(event);
        }
    }

    #showModal() {
        this.#dialog.showModal();
    }

    #closeModal() {
        this.#dialog.close();
    }

    #addBookToLibrary() {
        const { title, author, pages, read } = this.#form.elements;
        const newBook = new Book(title.value, author.value, parseInt(pages.value), read.checked);
        this.addBook(newBook);

        this.#form.reset();
    }

    #removeBookFromLibrary(event) {
        const identifier = parseInt(event.target.getAttribute("data-identifier"));
        this.removeBook(identifier);
    }

    #addBookToUI(book) {
        const clone = this.#template.cloneNode(true);
        clone.querySelector(".card-remove").setAttribute("data-identifier", book.id);
        clone.querySelector(".card-title").textContent = book.title;
        clone.querySelector(".author-name").textContent= book.author;
        clone.querySelector(".pages").textContent = book.pages;
        clone.querySelector(".read").textContent = (book.read) ? "completely read" : "not read yet";
        this.#cardContainer.insertBefore(clone, this.#cardContainer.firstChild);
    }

    *#removeAbleElement() {
        const len = Array.from(this.#cardContainer.children).length;
        for (let i = 0; i < len; ++i) {
            const element = this.#cardContainer.children[i];
            const rmElement = element.querySelector(".card-remove");

            if (!rmElement) continue;

            const identifier = parseInt(rmElement.getAttribute("data-identifier"));
            yield { identifier, element };
        }
    }


    // Public API
    addBook(book) {
        if (book instanceof Book) {
            this.#myLibrary.push(book);
        }

        this.#render();
    }

    removeBook(identifier) {
        identifier = parseInt(identifier);
        if (identifier >= 0) {
            this.#myLibrary.forEach((book, index) => {
                if (book.id === identifier) {
                    this.#myLibrary.splice(index, 1);
                }
            });
        }

        this.#render();
    }

}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
const myLibrary = new Library(theHobbit);
