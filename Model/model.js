const mongoose = require("mongoose");

const schema = mongoose.schema;

let fg_expenses = new schema({
    name = String,
    price = Number,
    date = Date

});

const model = mongoose.model("fg_expenses",expenses);

model.exports = model;