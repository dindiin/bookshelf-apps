const INCOMPLETE_BOOK = "incompleteBookshelfList";
const COMPLETE_BOOK = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
    const incompletedBookList = document.getElementById(INCOMPLETE_BOOK);
    const completeBookshelfList = document.getElementById(COMPLETE_BOOK);

    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

    const book = createBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
    const bookObject = composeBookObject(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if (inputBookIsComplete == true) {
        completeBookshelfList.append(book);
    } else {
        incompletedBookList.append(book);
    }

    updateDataToStorage();
}

function createBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) {
    const book = document.createElement("article");
    book.classList.add("book_item");

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = inputBookTitle;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = inputBookAuthor;

    const bookYear = document.createElement("p");
    bookYear.innerText = inputBookYear;

    const cardAction = document.createElement("div");
    cardAction.classList.add("action");

    book.append(bookTitle, bookAuthor, bookYear, cardAction);
    if (inputBookIsComplete) {
        cardAction.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        cardAction.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return book;
}

function createUndoButton() {
    return createButton("green", "Belum dibaca", function (event) {
        undoBookFromCompleted(event.target.parentElement.parentElement);
    });
}

function createTrashButton() {
    return createButton("red", "Hapus", function (event) {
        removeBookFromCompleted(event.target.parentElement.parentElement);
    });
}

function createCheckButton() {
    return createButton("green", "Selesai dibaca", function (event) {
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}

function createButton(buttonTypeClass, buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETE_BOOK);
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelectorAll(".book_item > p")[0].innerText;
    const bookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText;

    const newBook = createBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.inputBookIsComplete = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeBookFromCompleted(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoBookFromCompleted(taskElement) {

    const listUncompleted = document.getElementById(INCOMPLETE_BOOK);
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelectorAll(".book_item > p")[0].innerText;
    const bookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText;

    const newBook = createBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.inputBookIsComplete = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function bookSearch(keyword) {
    const filter = keyword.toUpperCase();
    const titles = document.getElementsByTagName("h3");

    for (let i = 0; i < titles.length; i++) {
        const titlesText = titles[i].textContent || titles[i].innerText;

        if (titlesText.toUpperCase().indexOf(filter) > -1) {
            titles[i].closest(".book_item").style.display = "";
        } else {
            titles[i].closest(".book_item").style.display = "none";
        }
    }
}