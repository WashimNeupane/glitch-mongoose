/**********************************************
* 3. FCC Mongo & Mongoose Challenges
* ==================================
***********************************************/

/** # MONGOOSE SETUP #
/*  ================== */

/** 1) Install & Set up mongoose */

// Add mongodb and mongoose to the project's package.json. Then require 
// mongoose. Store your Mongo Atlas database URI in the private .env file 
// as MONGO_URI. Connect to the database using the following syntax:
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
    
/** # SCHEMAS and MODELS #
/*  ====================== */

/** 2) Create a 'Person' Model */
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model("Person",personSchema);
/** # [C]RUD part I - CREATE #
/*  ========================== */

/** 3) Create and Save a Person */
var createAndSavePerson = function(done) {
  var shimmy = new Person({name:"Washim",age:12,favoriteFoods:["dal","bhat"]});
  shimmy.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

/** 4) Create many People with `Model.create()` */
var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople,function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

/** # C[R]UD part II - READ #
/*  ========================= */

/** 5) Use `Model.find()` */
var findPeopleByName = function(personName, done) {
  Person.find({name:personName},function(err,personFound){
    if(err) return console.error(err);
    done(null,personFound);
  });
};

/** 6) Use `Model.findOne()` */
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods:food},function(err,foodfound){
    if(err) return console.error(err);
    done(null,foodfound);
  })  
};

/** 7) Use `Model.findById()` */
var findPersonById = function(personId, done) {
  Person.findById({_id:personId},function(err,idfoind){
    if(err) return console.error(err);
    done(null,idfoind);
  });
};

/** # CR[U]D part III - UPDATE # 
/*  ============================ */

/** 8) Classic Update : Find, Edit then Save */
var findEditThenSave = function(personId, done) {
  var foodToAdd = "hamburger";
  Person.findById(personId, function(err, data) {
    if (err) {
      done(err);
    }

    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => (err ? done(err) : done(null, data)));
  });
};

/** 9) New Update : Use `findOneAndUpdate()` */
var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{ new: true },function(err,data){
    if (err) {
      done(err);
    }
    done(null,data);
  });
};

/** # CRU[D] part IV - DELETE #
/*  =========================== */
/** 10) Delete one Person */
var removeById = function(personId, done) {
  Person.findOneAndRemove({_id:personId},function(err,data){
    if (err) {
      done(err);
    }
    done(null,data);
  })    
};

/** 11) Delete many People */
var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name:nameToRemove},function(err,data){
    if (err) done(err);
    done(null,data);
  })   
};

/** # C[R]UD part V -  More about Queries # 
/*  ======================================= */

/** 12) Chain Query helpers */
var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(error, people) {
    if (error) done(error);
    done(null,people);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

/** # Further Readings... #
/*  ======================= */
// If you are eager to learn and want to go deeper, You may look at :
// * Indexes ( very important for query efficiency ),
// * Pre/Post hooks,
// * Validation,
// * Schema Virtuals and  Model, Static, and Instance methods,
// * and much more in the [mongoose docs](http://mongoosejs.com/docs/)


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
