/*create data table that allows readers to enter their name and reading level and then add the books read and date completed.*/

class Book {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }
}

class Reader {
    constructor(id, name, level) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.books = [];
    }

    addBook(book) {
    this.books.push(book);
    }

    deleteBook(book) {
        let index = this.books.indexOf(book);
        this.books.splice(index, 1);
    }
}

let readers = [];
let readerId = 0;

window.onload = function() {
    document.getElementById("new-reader-name").focus();
};

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener("click", action);
    return element;
}

/*Some sort of jQuery like this-- ($("#entry").checkValidity()); -- to be incorporated to keep onClick from overridng HTML 'required' but when added it cancels out the add functionality*/

onClick("new-reader", () => {
    readers.push(new Reader(readerId++, getValue("new-reader-name"), getValue("new-reader-level")));
    drawDOM();
});

function getValue(id) {
    return document.getElementById(id).value;
}

/*need this to clear out table creation area*/
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function drawDOM() {
    let readerDiv = document.getElementById("readers");
    clearElement(readerDiv);
    for (reader of readers) {
        let table = createReaderTable(reader);
        let title = document.createElement("h2");
        let level = document.createElement("h3");
        let deleteReader = createDeleteReaderButton(reader);
        title.innerHTML = `Reader: ${reader.name}`;
        level.innerHTML = `Level: ${reader.level}`;
        readerDiv.appendChild(title);
        readerDiv.appendChild(level);
        readerDiv.appendChild(deleteReader);
        readerDiv.appendChild(table);
        for (book of reader.books) {
            createBookRow(reader, table, book);
        }
    }
    /*need this to reset the field to blank*/
    document.getElementById("new-reader-name").value = "";
    document.getElementById("new-reader-level").value = "";
}

function createBookRow(reader, table, book) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = book.title;
    row.insertCell(1).innerHTML = book.date;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteBookButton(reader, book));
}

function createReaderTable(reader) {
    let table = document.createElement("table");
    table.setAttribute("class", "table table-info table-striped table-bordered");
    let row = table.insertRow(0);
    let titleColumn = document.createElement("th");
    let dateColumn = document.createElement("th");
    titleColumn.innerHTML = "Title";
    dateColumn.innerHTML = "Date Completed";
    row.appendChild(titleColumn);
    row.appendChild(dateColumn);
    let formRow = table.insertRow(1);
    let titleTh = document.createElement("th");
    let dateTh = document.createElement("th");
    let createTh = document.createElement("th");
    let titleInput = document.createElement("input");
    titleInput.setAttribute("id", `title-input-${reader.id}`);
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("class", "form-control");
    let dateInput = document.createElement("input");
    dateInput.setAttribute("id", `date-input-${reader.id}`);
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("class", "form-control");
    let newBookButton = createNewBookButton(reader);
    titleTh.appendChild(titleInput);
    dateTh.appendChild(dateInput);
    createTh.appendChild(newBookButton);
    formRow.appendChild(titleTh);
    formRow.appendChild(dateTh);
    formRow.appendChild(createTh);
    return table;
}

function createNewBookButton(reader) {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.innerHTML = "Add Book";
    btn.onclick = () => {
        reader.books.push(new Book(getValue(`title-input-${reader.id}`), getValue(`date-input-${reader.id}`)));
        drawDOM();
    };
    return btn;
}

function createDeleteBookButton(reader, book) {
    let btn = document.createElement("button");
    btn.className = "btn btn-secondary";
    btn.innerHTML = "Delete Book";
    btn.onclick = () => {
        let c = confirm("Are you sure you want to delete this entry?");
        if (c == true) {
            let index = reader.books.indexOf(book);
            reader.books.splice(index, 1);
            drawDOM();
        }   else {
            drawDOM();  
        }
    }
    return btn;
}

function createDeleteReaderButton(reader) {
    let btn = document.createElement("button");
    btn.className = "btn btn-secondary";
    btn.innerHTML = "Delete Reader";
    btn.onclick = () => {
        let r = confirm("Are you sure you want to delete this reader?");
        if (r == true) {
            let index = readers.indexOf(reader);
            readers.splice(index, 1);
            drawDOM();
        }   else {
            drawDOM();
        } 
    }
    return btn;
}

