console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

window.addEventListener("load", (event) => {
  let numBooks = (document.getElementById("numBooks").textContent =
    "You have no books in your library...");
});

let bookIDIndex = 0;
let books = [];

class Book {
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  constructor(books) {
    this.bookCount = books.length;
    this.books = books;
  }

  markRead(checkbox, id) {
    this.books.forEach((element) => {
      if (id == element.id) {
        element.read = true;
        checkbox.disabled = true;
      }
    });
  }

  addBook() {
    let titleInput = document.getElementById("title");
    let authorInput = document.getElementById("author");
    let chkBoxValue = document.getElementById("read");

    let newBook = new Book(
      bookIDIndex,
      titleInput.value,
      authorInput.value,
      chkBoxValue.checked
    );
    this.books.push(newBook);

    let tBody = document.getElementById("tBody");
    let newTR = document.createElement("tr");
    newTR.id = newBook.id;
    let newTitle = document.createElement("td");
    let newAuthor = document.createElement("td");
    let newRead = document.createElement("td");

    let removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.value = "Remove";
    removeBtn.textContent = "Remove";
    removeBtn.id = bookIDIndex;
    removeBtn.addEventListener("click", (event) => {
      this.removeBook(event.target.id);
    });

    newTitle.textContent = titleInput.value;
    newAuthor.textContent = authorInput.value;

    let newBox = document.createElement("input");
    newBox.id = newBook.id;
    newBox.type = "checkbox";
    newBox.name = "readBox";
    newBox.checked = chkBoxValue.checked;
    newBox.disabled = chkBoxValue.checked;
    newBox.addEventListener("click", (event) => {
      this.markRead(event.target, event.target.id);
    });

    newRead.appendChild(newBox);
    newTR.appendChild(newTitle);
    newTR.appendChild(newAuthor);
    newTR.appendChild(newRead);
    newTR.appendChild(removeBtn);
    tBody.appendChild(newTR);

    this.bookCount++;
    bookIDIndex++;

    if (this.books.length == 0) {
      let numBooks = (document.getElementById("numBooks").textContent =
        "You have no books in your library...");
    } else if (this.books.length == 1) {
      numBooks.textContent = `You have ${this.books.length} book in your library!`;
    } else if (this.books.length != 1) {
      numBooks.textContent = `You have ${this.books.length} books in your library!`;
    }
  }

  removeBook(bookId) {
    this.books = this.books.filter(function (e) {
      bookId = parseInt(bookId);
      return e.id !== bookId;
    });

    let removeBody = document.getElementById("tBody");
    removeBody.removeChild(document.getElementById(bookId));

    if (this.books.length == 0) {
      let numBooks = (document.getElementById("numBooks").textContent =
        "You have no books in your library...");
    } else if (this.books.length == 1) {
      numBooks.textContent = `You have ${this.books.length} book in your library!`;
    } else if (this.books.length != 1) {
      numBooks.textContent = `You have ${this.books.length} books in your library!`;
    }
  }
}

let library = new Library(books);

let addBookBtn = document.getElementById("addBookBtn");
addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  library.addBook();
});
