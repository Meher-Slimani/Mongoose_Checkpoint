const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Person = require("./Person.js");

const app = express();

// Setting the .env to be usable
dotenv.config();

// Creating a port variable
const PORT = "5000";

// Creating a person document
var person1 = Person({
  id: "1",
  name: "Meher",
  age: 31,
  favoriteFoods: ["pizza", "fries", "steak"],
});

// Saving the document above
person1.save((err, data) => {
  if (err) {
    console.error(err);
  }
  // Consoling the first document saved
  console.log("The first document saved:", data);
});

// Creating and saving more documents in the DB
Person.create(
  [
    { id: "2", name: "Ali", age: 20, favoriteFoods: ["Fish", "Sushi"] },
    {
      id: "3",
      name: "Mohamed",
      age: 26,
      favoriteFoods: ["Pasta", "Tiramissu"],
    },
    { id: "4", name: "Amal", age: 31, favoriteFoods: ["Chicken", "fruits"] },
    {
      id: "5",
      name: "Salah",
      age: 18,
      favoriteFoods: ["Salads", "Sandwichs"],
    },
    { id: "6", name: "Joulya", age: 1, favoriteFoods: ["Milk", "Fruits"] },
    { id: "7", name: "Salah", age: 55, favoriteFoods: ["Soup", "Legums"] },
  ],
  (err, data) => {
    if (err) {
      console.error(err);
    }
    // Consoling the rest of documents saved
    console.log("The rest of documents saved:", data);
  }
);

// Searching by name using find()
Person.find({ name: "Mohamed" }, (err, data) => {
  if (err) {
    console.error(err);
  }
  // Consoling the result of the search
  console.log("result by Name:", data);
});

// Searching for a single document using findOne()
Person.findOne({ favouriteFoods: "Fish" }, (err, data) => {
  if (err) {
    console.error(err);
  }
  // Consoling the result of the search
  console.log("result by favorite Food:", data);
});

// Searching for a single document by id using findById()
Person.findById("2", (err, data) => {
  if (err) {
    console.error(err);
  }
  // Consoling the result of the search
  console.log("result by ID:", data);
});

// Finding, Editing and Saving a document
Person.findOne({ id: "3" }, (err, data) => {
  if (err) {
    console.error(err);
  }
  // Editing the favoriteFoods of the found document
  data.favoriteFoods = data.favoriteFoods.push("Hamburger");
  data.save((err, data) => {
    if (err) {
      console.error(err);
    }
    // Consoling the updated document
    console.log("the updated data (favoriteFoods):", data);
  });
});

// Updating a document using findOneAndUpdate()
Person.findOneAndUpdate(
  { name: "Meher" },
  { $set: { age: 40 } },
  (err, data) => {
    if (err) {
      console.error(err);
    }
    // Consoling the updated document
    console.log("The updated document by age:", data);
  }
);

// Deleting a single document using findByIdAndRemove()
Person.findByIdAndRemove("1", (err, data) => {
  if (err) {
    console.error(err);
  }
  // Consoling the removed document
  console.log("The removed document:", data);
});

// Deleting all documents that match the condition using remove()
Person.remove({ name: "Salah" }, (err, data) => {
  if (err) {
    console.error(err);
  }
  // Consoling all the removed documents
  console.log("The removed documents with a name of Salah:", data);
});

// Chain Search Query Helpers
Person.find({ favoriteFoods: "Fruits" })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, data) => {
    err ? done(err) : done(null, data);
  });

// Setting the connection with the DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Setting the server to be listening
app.listen(PORT, console.log(`Listening on port ${PORT}`));
