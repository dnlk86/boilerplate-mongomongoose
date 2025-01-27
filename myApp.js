require('dotenv').config();
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


let Person = require("./src/models/person");

const createAndSavePerson = (done) => {
  var dan = new Person({
    name: "Dan",
    age: "25",
    favoriteFoods: ["Beer", "Pizza"]
  });
  dan.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: "Al", age: 45, favoriteFoods: ["Arancini"] },
  { name: "John", age: 48, favoriteFoods: ["Pizza"] },
  { name: "Jack", age: 47, favoriteFoods: ["Pasta"] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function(err, person) {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, function (err, updatedPerson) {
    if (err) return console.log(err);
    done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, removedPerson) {
    if (err) return console.log(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age:0})
  .exec(function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  })
};

/** **Well Done !!**
 * You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
