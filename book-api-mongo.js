const express = require('express');

const app = express();
const port = 3000;


// mongodb+srv://rick:rick@cluster0.1t66acq.mongodb.net/test

// cors
app.use(function(req, res, next){
    res.set('Cache-control', `no-store`);       // no cache
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
    'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
    });

var Books = [
{id: "1", title: "Reactions in REACT", author: "Ben Dover",
publisher: "Random House", isbn: "978-3-16-148410-0", avail: true},
{id: "2", title: "Express-sions", author: "Frieda Livery",
 publisher: "Chaotic House", isbn: "978-3-16-148410-2", avail: true},
{id: "3", title: "Restful REST", author: "Al Gorithm",
 publisher: "ACM", isbn: "978-3-16-143310-1", avail: true},
{id: "4", title: "See Essess", author: "Anna Log",
 publisher: "O'Reilly", isbn: "987-6-54-148220-1", avail: false, who: "Homer", due: "1/1/23"},
{id: "5", title: "Scripting in JS", author: "Dee Gital",
 publisher: "IEEE", isbn: "987-6-54-321123-1", avail: false, who: "Marge", due: "1/2/23"},
{id: "6", title: "Be An HTML Hero", author: "Jen Neric",
 publisher: "Coders-R-Us", isbn: "987-6-54-321123-2", avail: false, who: "Lisa", due: "1/3/23"}
]

function keyReduce(arr) { return arr.map(({id, title}) => ({id, title})); }

// returns a list of all books (title & id) regardless of checkout status (i.e. 
// both available and checked-out books should be included)
// app.get('/books', (req, res) => {
//     allBooks = Books.map(({id, title}) => ({id, title}))
//     res.status(200).send(JSON.stringify(allBooks));
// });

// returns list of all books (title & id) which are available or not available to be checked out 
app.get('/books', (req, res) => {
    if((req.query.avail == undefined)) return res.status(200).send(JSON.stringify(keyReduce(Books)));

    if (req.query.avail === "true" ){
        let booksAvail = Books.filter(b => Books.avail === true);
        return res.status(200).send(JSON.stringify(keyReduce(booksAvail)));
    }

    if (req.query.avail === "false" ){
        let booksNotAvail = Books.filter(b => Books.avail === false);
        return res.status(200).send(JSON.stringify(keyReduce(booksNotAvail)));
    }
    return res.status(200).send(JSON.stringify(keyReduce(Books)));
});

// returns all details for the book matching id, 404 if not found
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    idx = parseInt(id) -1;
    for (let book of Books) {
        if (book.id === id) {
            // res.json(book);
            return res.status(200).send(JSON.stringify(Books[idx]));
        }
    }
    res.status(404).send('Book not found');
});

// Add a new book as described in request body (JSON), which includes id 
// & status
app.post('/book', (req, res) => {
    const id = req.params.id;
    idx = parseInt(id) -1;
    for (let book of Books) {
        if (book.id === id) {
            // res.json(book);
            Books[idx]['title'] = req.body.id['title'];
            Books[idx]['author'] = req.body.id['author'];
            Books[idx]['publisher'] = req.body.id['publisher'];
            Books[idx]['avail'] = req.body.id['avail'];
            Books[idx]['who'] = req.body.id['who'];
            Books[idx]['due'] = req.body.id['due'];
            return res.status(201).send('created');
        }
    }

    res.status(403).send('already exists');
});


// For book matching id, update any properties present in request body 
// (JSON). Can be used to check in or out. 
app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    idx = parseInt(id) -1;
    for (let book of Books) {
        if (book.id === id) {
            // res.json(book);
            Books[idx]['title'] = req.body.id['title'];
            Books[idx]['author'] = req.body.id['author'];
            Books[idx]['publisher'] = req.body.id['publisher'];
            Books[idx]['avail'] = req.body.id['avail'];
            Books[idx]['who'] = req.body.id['who'];
            Books[idx]['due'] = req.body.id['due'];
            return res.status(200).send('ok');
        }
    }
    
    res.status(404).send('not found');
});

// Delete the book matching id (if it exists) regardless of checkout status
app.delete('/books/:id', (req, res) => {
    // Remove item from the books array
    const id = req.params.id;
    idx = parseInt(id) -1;
    for (let book of Books) {
        if (book.id === id) {
            // res.json(book);
            delete Books[idx]
            console.log(Books)
            return res.status(200).send(JSON.stringify(Books[idx]));
        }
    }

    res.status(204).send('no content');
});
  

app.listen(port, () => console.log('app listening on port ${port}!'))