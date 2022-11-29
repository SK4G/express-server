const express = require('express');

const app = express();
const port = 3000;

//Rickster's CORS middleware handler
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});
var Books = new Map();
app.use(express.json());    // <==== parse request body as JSON
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

function NotExists(id) {
  if (Books.has(id)) return false;
  return true;
}

function listbooks(avail) {
  var results = [];
  for (const book of Books.values()){
    if (book === avail) results.push(push);
  }
}

function readone(res, id) {
  if (NotExists(id,res)) return;
  res.json(Books.get(id));
}

function readall(req, res) {
  res.json(Books);
}

//  app.get('/books/:id', getone)

// async function getone(req,res) {
//  var book = await books.findOne( { id:req.params.id});
//  res.send(JSON.stringify(book));
// }

console.log(Books[1])