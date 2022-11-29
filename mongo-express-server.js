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

var Books = new Map();
Books = [
  Books.set(1, { id: "1", title: "Reactions in REACT", 
    author:"Ben Dover", publisher: "Random House",
    isbn: "978-3-16-148410-0", avail: true  }),
  Books.set(2, { id: "2", title: "Express-sions", 
    author:"Frieda Livery", publisher: "Chaotic House",
    isbn: "978-3-16-148410-2", avail: true  }),
  Books.set(3, { id: "3", title: "RESTful Rest", 
    author:"Al Gorithm",  publisher: "ACM Publishers",
    isbn: "978-3-16-143310-1", avail: true  }),
  Books.set(4, { id: "4", title: "See Es Es", 
    author:"Anna Log", publisher: "O'Reilly",
    isbn: "987-6-54-148220-1", avail: false, 
    who: "Homer", due:"1/1/23" }),
  Books.set(5, { id: "5", title: "Scripting in Javascript", 
    author:"Dee Gital", publisher: "IEEE",
    isbn: "987-6-54-324423-1", avail: false, 
    who: "Marge", due: "1/2/23" }),
  Books.set(6, { id: "6", title: "HTML Heros", 
    author:"Jen Neric", publisher: "self",
    isbn: "987-6-54-325523-2", avail: false, 
    who: "Lisa", due: "1/3/23" }),
  Books.set(7, { id: "7", title: "Pugging in pug", 
    author:"Pug Ers", publisher: "PPP",
    isbn: "987-6-54-321133-5", avail: false, 
    who: "P Master", due: "1/4/23" }),
  Books.set(7, { id: "7", title: "Logout", 
    author:"CTRL ALT Delete", publisher: "PPP",
    isbn: "987-6-54-321133-6", avail: false, 
    who: "nobody", due: "1/5/23" }),
  Books.set(8, { id: "8", title: "Styling in CSS", 
    author:"Ug Lee", publisher: "Pretty Prints",
    isbn: "987-6-54-321133-8", avail: false, 
    who: "Dom", due: "1/7/23" }),
  Books.set(9, { id: "9", title: "Python Manual", 
    author:"Mr. Snake", publisher: "Reptiles",
    isbn: "987-6-54-321133-9", avail: false, 
    who: "Grass", due: "1/9/23" }),
  Books.set(10, { id: "10", title: "Last Book On Earth", 
    author:"Pug Ers", publisher: "Unknown",
    isbn: "987-6-54-321177-1", avail: false, 
    who: "Mike", due: "1/2/93" })
] ;

function keyReduce(arr) { return arr.map(({id, title}) => ({id, title})); }

function NotExists(id, res) {
  if (Books.has(id)) return false;
  res.status(404).send(`${id} not found\n`);
  return true;
}

function findOne(res, id) {
  if (NotExists(id,res)) return;
  res.json(Books.get(id));
}

function readall(req, res) {
  res.json(Books);
}

function updateOne(res, req.params.id, req.body) {
  if (NotExists(id, res)) return res.status(404).send('not found');
  original = Books.get(id);
  for (var pname in item)
    original[pname] = item[pname];
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send('ok');
}

app.get('/books/:id', (req,res) => {
  books.findOne( { id:req.params.id }  )
  .then(  (book) => {
     if (book == null)
     res.status(404).send("not found")
     else res.send(JSON.stringify(book))
  }      )
 })

//  app.get('/books/:id', getone)

// async function getone(req,res) {
//  var book = await books.findOne( { id:req.params.id});
//  res.send(JSON.stringify(book));
// }

app.get('/books', (req,res) => { 
  books.find()
  .project({ _id:0, id:1, title:1 })
  .toArray()
  .then( allbooks => {
     res.send(JSON.stringify(allbooks))
  }    )
}); 


app.put('/books/:id', (req,res) => {
  books.find()
  .project({ _id:0, id:1, title:1 })
  .toArray()
  .then( allbooks => {
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
  }    )
}); 

app.delete('/books/:id', (req,res) => {
  books.find()
  .project({ _id:0, id:1, title:1 })
  .toArray()
  .then( allbooks => {
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
  }    )
 });
app.post('/books', (req,res) => { 
  books.find()
  .project({ _id:0, id:1, title:1 })
  .toArray()
  .then( allbooks => {
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
  }    )
});

app.put('/books/:id', (req,res) => { findOne(res, req.params.id);});
app.delete('/books/:id', (req,res) => { readall(req, res);});
app.post('/books', (req,res) => { });


start()
