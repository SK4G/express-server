const Author = require('./models/author');

const A1 = new Author( { firstname: "Tera", lastname: "Fide" } );
const A2 = new Author( { firstname: "Clara", lastname: "Fye" } );

A1.save().then(doc => console.log("saved"));
console.log(A1.fullname);
Author.find(function(err, result) {
    console.log(JSON.stringify(result))
    console.log(result[0].fullname);
    result[1].lastname = "Fication";
    result[1].save();
});

A2.save().then(doc => console.log("saved"));

console.log("hi");