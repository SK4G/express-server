const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AuthorSchema = new Schema({
    firstname: { type: String },
    lastname:{ type: String },
    born: { type: Date }
});

AuthorSchema.virtual("fullname")
    .get( function () {
        return this.lastname + ", " + this.firstname;
    } )
    .set ( function (v) {
        const i = v.indexOf(' ');
        const firstname = v.substring(0,i);
        const lastname = v.substring(1+1);
        this.set( {firstname, lastname });
    })

module.exports = model('Author', AuthorSchema);
