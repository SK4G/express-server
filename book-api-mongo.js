const express = require('express');

const app = express();
const port = 3000;

// mongodb+srv://luiz:255kbWi0uGtZ43Um@cluster0.nmzb0ht.mongodb.net/test

// cors
app.use(function(req, res, next){
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

// returns all details for the book matching id, 404 if not found
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    for (let book of Books) {
        if (book.id === id) {
            // res.json(book);
            return res.status(200).send(JSON.stringify(Books[id]));
        }
    }
    res.status(404).send('Book not found');
});

// returns list of all books (title & id) which are available or not available to be checked out 
app.get('/books', (req, res) => {
    // if(!req.query) return res.status(200).send(JSON.stringify(keyReduce(Books)));

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

// Add a new book as described in request body (JSON), which includes id 
// & status
app.post('/book', (req, res) => {
    const id = req.body.id;
    for (let book of Books) {
        if (book.id === id) {
            // res.json(book);
            Books.push(book);
            return res.status(201).send('created');
        }
    }

    res.status(403).send('already exists');
});


// For book matching id, update any properties present in request body 
// (JSON). Can be used to check in or out. 
app.put('/books/id', (req, res) => {
    const id = req.body.id;
    for (let book of Books) {
        if (book.id === id) {
            // res.json(book);
            Books.push(book);
            return res.status(200).send('ok');
        }
    }
    
    res.status(404).send('not found');
});

// Delete the book matching id (if it exists) regardless of checkout status
app.delete('/books/id', (req, res) => {
  // Remove item from the books array
  const id = req.body.id;
  for (let book of Books) {
      if (book.id === id) {
          // res.json(book);
          Books.delete(book);
          return res.status(200).send('ok');
      }
  }

  res.status(204).send('no content');
});
  

app.listen(port, () => console.log('app listening on port ${port}!'))