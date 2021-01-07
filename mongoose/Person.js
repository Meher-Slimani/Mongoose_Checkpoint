const mongoose = require("mongoose");

// Creating the person schema
const personSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favoriteFoods: [String],
});

module.exports = mongoose.model("Person", personSchema);
