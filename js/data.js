const STORAGE_KEY = "BOOK_APPS";

let books = [];

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBookObject(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) {
    return {
        id: +new Date(),
        inputBookTitle,
        inputBookAuthor,
        inputBookYear,
        inputBookIsComplete
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(INCOMPLETE_BOOK);
    let listCompleted = document.getElementById(COMPLETE_BOOK);

    for (book of books) {
        const newBook = createBook(book.inputBookTitle, book.inputBookAuthor, book.inputBookYear, book.inputBookIsComplete);
        newBook[BOOK_ITEMID] = book.id;

        if (book.inputBookIsComplete) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}