const express = require('express');
const {MongoClient} = require('mongodb');

let cs = "mongodb+srv://rick:rick@cluster0.1t66acq.mongodb.net"
// let cs = "mongodb+srv://rick:rick@cluster0.1t66acq.mongodb.net/test"
let db;
let books;

async function start() {
  const client = new MongoClient(cs)
   await client.connect();
   db = client.db("DB1");
   books = db.collection("books");
  console.log("Listening");
  app.listen(3000);
}

var app = express();

//Rickster's CORS middleware handler
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

app.use(express.json());    // <==== parse request body as JSON

var StartBooks = new Map();
books = [
  books.set(1, { id: "1", title: "Reactions in REACT", 
    author:"Ben Dover", publisher: "Random House",
    isbn: "978-3-16-148410-0", avail: true  }),
  books.set(2, { id: "2", title: "Express-sions", 
    author:"Frieda Livery", publisher: "Chaotic House",
    isbn: "978-3-16-148410-2", avail: true  }),
  books.set(3, { id: "3", title: "RESTful Rest", 
    author:"Al Gorithm",  publisher: "ACM Publishers",
    isbn: "978-3-16-143310-1", avail: true  }),
  books.set(4, { id: "4", title: "See Es Es", 
    author:"Anna Log", publisher: "O'Reilly",
    isbn: "987-6-54-148220-1", avail: false, 
    who: "Homer", due:"1/1/23" }),
  books.set(5, { id: "5", title: "Scripting in Javascript", 
    author:"Dee Gital", publisher: "IEEE",
    isbn: "987-6-54-324423-1", avail: false, 
    who: "Marge", due: "1/2/23" }),
  books.set(6, { id: "6", title: "HTML Heros", 
    author:"Jen Neric", publisher: "self",
    isbn: "987-6-54-325523-2", avail: false, 
    who: "Lisa", due: "1/3/23" }),
  books.set(7, { id: "7", title: "Pugging in pug", 
    author:"Pug Ers", publisher: "PPP",
    isbn: "987-6-54-321133-5", avail: false, 
    who: "P Master", due: "1/4/23" }),
  books.set(7, { id: "7", title: "Logout", 
    author:"CTRL ALT Delete", publisher: "PPP",
    isbn: "987-6-54-321133-6", avail: false, 
    who: "nobody", due: "1/5/23" }),
  books.set(8, { id: "8", title: "Styling in CSS", 
    author:"Ug Lee", publisher: "Pretty Prints",
    isbn: "987-6-54-321133-8", avail: false, 
    who: "Dom", due: "1/7/23" }),
  books.set(9, { id: "9", title: "Python Manual", 
    author:"Mr. Snake", publisher: "Reptiles",
    isbn: "987-6-54-321133-9", avail: false, 
    who: "Grass", due: "1/9/23" }),
  books.set(10, { id: "10", title: "Last Book On Earth", 
    author:"Pug Ers", publisher: "Unknown",
    isbn: "987-6-54-321177-1", avail: false, 
    who: "Mike", due: "1/2/93" })
] ;

function listbooks(arr) { return arr.map(({id, title}) => ({id, title})); }

function NotExists(id, res) {
  if (books.has(id)) return false;
  res.status(404).send(`${id} not found\n`);
  return true;
}

function findone(res, id) {
  if (NotExists(id,res)) return res.status(404).send('Book not found');
  return res.status(200).send(JSON.stringify(books.get[id]));
}

function readall(req, res) {
  if((req.query.avail == undefined)) return res.status(200).send(JSON.stringify(listbooks(books)));
  res.json(books);
}

function createone(res, id, obj) {
  if (books.has(id)) {
    return res.status(403).send('already exists');
  }
  else {
    books.set(id, obj);
    return res.status(201).send('created');
  }
}

function deleteone(res, id) {
  if (NotExists(id, res)) return res.status(204).send('no content');
  books.delete(id);
  return res.status(200);
}

function updateone(res, id, obj) {
  const id = req.params.id;
  if (NotExists(id, res)) return res.status(404).send('not found');
  original = books.get(id);
  for (var key in obj)
    original[key] = obj[key];
  return res.status(200).send('ok');
}

app.get('/books/:id', (req,res) => {
  books.findone( { id:req.params.id }  )
  .then(  (book) => {
     if (book == null)
     res.status(404).send("not found")
     else return res.status(200).send(JSON.stringify(book));
  }      )
 })

// returns list of all books (title & id) which are available or not available to be checked out 
app.get('/books', (req, res) => {
  if((req.query.avail == undefined)) return res.status(200).send(JSON.stringify(listbooks(books)));

  if (req.query.avail === "true" ){
      let booksAvail = books.filter(b => books.avail === true);
      return res.status(200).send(JSON.stringify(listbooks(booksAvail)));
  }

  if (req.query.avail === "false" ){
      let booksNotAvail = books.filter(b => books.avail === false);
      return res.status(200).send(JSON.stringify(listbooks(booksNotAvail)));
  }
  return res.status(200).send(JSON.stringify(listbooks(books)));
}); 

app.put('/books/:id', (req,res) => { updateone(res, req.params.id, req.body);});
app.delete('/books/:id', (req,res) => { deleteone(res, req.params.id);});
app.post('/books', (req,res) => { createone(res, req.params.id, req.body)});


start()
