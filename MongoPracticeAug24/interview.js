// {
//     name: "Sara",
//     age: 45,
//     hobbies: [{ title: "hacking", frequency: 4 }],
//     phone: 43252322
//   },

db.collection.find({ "hobbies.title": "hacking" });
db.collection.find({ hobbies: { $eq: "hacking" } }); // if hobbies has array of elements
[
  { name: "Chris", hobbies: ["sports", "cooking", "hiking"] },
  { name: "Jonrdan", hobbies: ["sports", "eating", "cycling", "reading"] }
];
//using $size operator
db.collection.find({ hobbies: { $size: { $gt: 3 } } });
//the above one is gives an error because we cannot use $gt operator within the $size operator.
//if you want to get more than 3 hobbies array document then you can use aggregate
db.collection.aggregate([
  { $project: { hobbies: 1, hobbiesLength: { $size: "$hobbies" } } },
  { $match: { hobbiesLength: { gt: 3 } } }
]);
//find the docs which a genre of exactly thriller and action only as genres
db.collection.find({ genres: { $all: ["thriller", "action"] } });

//expression operator
db.collection.find(
  { genres: { $all: ["thriller", "action"] } },
  { $expr: { $eq: [{ $size: "$genres" }, 3] } }
);
//find the docs who have a hobby of sports and the frequency should be equal to 2
db.collection.find({
  $and: [{ "hobbies.title": "sports" }, { "hobbies.frequency": 2 }]
});
//this operator will differently check the documents withe "hobbies.title" and "hobbies.frequency", but wont find
//for exactly
db.collection.find({
  $elemMatch: [{ "hobbies.title": "sports" }, { "hobbies.frequency": 2 }]
});
db.collection.find({
  hobbies: { $elemMatch: { title: "sports", freqency: 2 } }
});
///find the docs which has drama as its genre and print only  drama in the output doc even it has more
// no of elements in the array
db.collection.find({ genres: "Drama" }, { "gernes.$": "Drama" }); // which is wrong
db.collection.find({ genres: "Drama" }, { "genres.$": 1 });

// { "_id" : ObjectId("64e3aa084ff5db12d7a58e85"), "genres" : [ "Drama" ] }
// { "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "genres" : [ "Drama" ] }

// $ : it is called positional projction in the mongodb, it is a feature that allows us to  look for the document
// of first matching element of the array in the specified query criteria
//it is useful to returieve the specific elements from the array not entire array

//now I want see only Horror as the output in the document

db.collection.find({ $genres: { $elemMatch: "Horror" } });
// now print the dcuments which rating is greater than 9 and has action  genre
db.movies.find(
  { "rating.average": { $gt: 9 } },
  { genres: { $elemMatch: { $eq: ["action"] } } }
);

db.movies.find(
  { "rating.average": { $gt: 9 }, genres: "action" },
  { "genres.$": 1 }
);
//  { "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "genres" : [ "Action" ] }

//$slice operator:
// find the documents  whose average rating is greater than 8 and print only 2 elements in the array of any one of the field
// for this use $slice operator instead of $elemMatch
db.moves.find({ "rating.average": { $gt: 8 } }, { genres: { $slice: 2 } });
// returns first two elements of genres array
db.collection.find(
  { "rating.average": { $gt: 8 } },
  { genres: { $slice: [1, 2] } }
);
//starts slicing from index 1 and print the next two elements >>>>.
// So, if genres is ["Drama", "Action", "Thriller"], the output would be ["Action", "Thriller"].

//update the documents
$set, $addToset;
db.collection.update(
  { "hobbies.title": "sports" },
  { $set: { isSport: true } }
);
db.collection.updateMany(
  { hobbies: { $exists: true } },
  { $set: "you have better health." }
);
db.updateMany({ age: { $exists: false } }, { $set: { age: 35 } });

// we can increase the value of the document field using $inc operator,
// to decrease the value of the document field the operator is $inc with -ve value operator
// e.g.: $inc: -3,
//$dec:3 will not work, there is no operator with $dec operator.

db.collection.updateOne({ name: "Ramesh" }, { age: { $inc: 3 } });
db.collection.updateOne({ name: "Ramesh" }, { age: { $inc: 3 } });
// db.users.updateOne({ isSport: true }, { $dec: { age: 3 } }); will not work gives error.

//write a condition to increase the age of a person whose age is greater than 25 and less than 35 by 3

// $and: [{ age: { $gt: 25 } }, { age: { $lt: 53 } }], { $inc: { age: 3 } };

db.collection.updateMany({}, { $mul: ["$age", 3] }); // which is wrong
db.collection.updateMany({}, { $mul: { age: 3 } });

db.collection.updateMany({ age: { $lt: 3 } }, { $set: { phone: "null" } });
// which makes the phone field to null
//to remove the field
db.collection.updateOne({ age: { $gt: 35 } }, { $set: { phone: "" } });

//$upsert operator is used to insert the document if filtered document is not present in the collection
db.collection.updateOne(
  { name: "stella" },
  { age: 23, hobbies: ["cooking", "eating"] },
  { upsert: true }
);

//for updateMany() $upsert cannot be used to upsert multiple docments
// upsert: true used with multiple documents either it will update all the documents or it will upsert the
// single document if no doc find for filtered criteria
db.collection.updateMany(
  { requiredTeam: true },
  { $inc: { "no of players": 10 } }
);

//  update the embedded field of the document
db.collection.updateMany({}, { $set: { "hobbies.goodFrequency": true } });
//it will not work because in mongodb we cannot directly updated the filed within the array using statnderd
// $set operator without using $ positional operator
db.collection.updateMany(
  { "hobbies.sports": { $exists: true } },
  { $set: { "hobbies.$.goodFrequency": true } }
);
//update all fields  of array of the document
db.collection.updateMany(
  { age: { $gt: 30 } },
  { $inc: { "hobbies.$[].frequency": -1 } }
);
//decreases frequency of array document by 1
//update the specific field of the array
db.collection.updateOne(
  { name: "John" },
  { hobbies: { $inc: { "hobbies.1.frequency": 2 } } }
);
// to remove the field present in the objects of array
db.collection.updateMany(
  { "hobbies.goodFrequency": true },
  { hobbies: { $unset: { "hobbies.$[].goodFrequency": "" } } }
);
db.users.updateMany(
  { "hobbies.goodFrequency": true },
  { $unset: { "hobbies.goodFrequency": "" } }
);
// which is wrong
//find the docs which has sports s hobby and frequency only 1 and 2
db.collection.find({
  hobbies: { $elemMatch: { title: "sports", frequency: { $and: [1, 2] } } }
});
//which is wrong
// to find exactly 1 and 2 frequency elements
db.collection.find({
  hobbies: { $elemMatch: { title: "sports", frequency: { $in: [1, 2] } } }
});
// this will find the doc where the object of array has title: sports and its frequency either 1 or 2

db.collection.updateMany(
  { hobbies: { $elemMatch: { title: "sports", frequency: { $in: [1, 2] } } } },
  { $set: { "hobbies.$.hasSportshobby": true } }
);
//after finding, this will update the document of  only FIRST MATCHED OBJECT of the hobbies array of all the documents
// which satisfyied the filter condition, even more no of objects are present in the hobbies array only first object will update

db.collection.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $in: [1, 2] } } } },
  {
    $set: { "hobbies.$[].hasGoodHealth": true }
  }
);
//this query will update the ALL OBJECTS OF THE HOBBIES ARRAY OF documents whose meet the filter criteria,
//EVEN OTHER FREQUENCIES AND OTHER HOBBIE IS THERE IN THE OTHER OBJECTS OF THE ARRAY becasue the object met
// filter condition

//To update the documents only which has the elements specified in the filter i.e. title:sports and frequency:1 or2
// we can use the below quries

db.collection.updateMany(
  { hobbies: { $elemMatch: { title: "sports", freqency: { $in: [1, 2] } } } },
  {
    $set: { "hobbies.$[el].hasGoodFrequency": true },
    arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]
  }
);
// Summary of Key Differences:

// Scope of Update:

// Query 1: Updates only the first matching element in the array.
// Query 2: Updates all elements in the array.
// Query 3: Updates elements in the array that meet specific conditions defined by arrayFilters.

// Targeted Elements:

// Query 1: Uses the positional operator $ to target the first matching element.
// Query 2: Uses the all positional operator $[] to target all elements.
// Query 3: Uses $[el] with arrayFilters to target elements based on custom filter conditions.
// The arrayFilters option specifies which elements in the array should be updated based on
// additional criteria.

// { hobbies: { $not: { $elemMatch: { title: "Sports" } } } }:
// This condition finds documents where no element in the hobbies array has title: "Sports".
// Array Filters:
// arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]: Specifies that
// the update should be applied to elements in the hobbies array where frequency is in [1, 2].

//find the docs which does not has title: "sports" and which has frequency is either 1 or 2
db.collection.updateMany(
  {
    hobbies: {
      $not: { $elemMatch: { title: "sports" } },
      $elemMatch: { frequency: { $lte: 2 } }
    }
  },
  {
    $set: { "hobbies.$[el].hasGoodHealth": "maybe" },
    arrayFilters: [{ "el.freqency": { $in: [1, 2] } }]
  }
);
// $set: Replaces or creates a field with a specified value.
// $addToSet: Adds a value to an array only if it does not exist.
// $push: Adds a value to an array regardless of duplicates.
// $inc (often confused with $add): Increments a field value.

// {
//   "_id": 1,
//   "name": "Alice",
//   "hobbies": ["reading", "swimming"]
// }
db.collection.updateOne(
  { name: "Alice" },
  { $addToset: { hobbies: "singing" } }
);
//resulted doc
// {
//   "_id": 1,
//   "name": "Alice",
//   "hobbies": ["reading", "swimming", "singing"]
// }
db.collection.updateMany(
  {},
  { $addToset: { hobbies: { title: "cooking", frequency: 2 } } }
);

//to update multiple elements with $addToSet
// ***************************
db.collection.updateOne(
  { name: "Maria" },
  {
    $addToSet: {
      hobbies: {
        $each: ["swimming", { title: "hicking" }]
      }
    }
  }
);
db.collection.updateOne({}, { $push: { hobbies: { goodFrequency: 3 } } });
// to add or push single value
db.collection.updateMany(
  {},
  {
    $push: {
      hobbies: {
        $each: [{ title: "cricket", freqency: 3 }, { hasGoodHealth: true }]
      }
    }
  }
);
//this is to add multiple documents

//to remove
db.collection("collectionName").updateOne(
  { name: "Maria" },
  { $pull: { hobbies: { title: "cookign", frequency: 2 } } }
);
//to remove multiple docs
db.collection("collectionName").updateMany(
  {
    age: { $gt: 65 }
  },
  {
    $pull: {
      hobbies: {
        $each: [
          { title: "Swimming", frequency: 2 },
          { title: "DAncing", frequency: 3 }
        ]
      }
    }
  }
);
// The above query gives 		"errmsg" : "unknown top level operator: $each. If you have a field name that starts with
// a '$' symbol, consider using $getField or $setField."
// because the $each operator is used inconjection with $push,$addToset to add multiple items
// we can remove multiple elements from a document using $or operator
db.collection.updateOne(
  { name: "Maria" },
  {
    $pull: {
      hobbies: {
        $or: [
          { title: "swimming", frequency: 2 },
          { title: "Dancing", freqency: 2 }
        ]
      }
    }
  }
);
//update the multiple documents  using $pull operator
db.collection.updateMany(
  { age: { $gt: 65 } },
  {
    $pull: {
      hobbies: {
        $or: [
          { title: "swimming", frequency: 2 },
          { title: "swimming", frequency: 2 }
        ]
      }
    }
  }
);
// $pull removes last elements from the array
// $pop removes first element from an array

// $addToSet also adds the elements to last position of the array.

db.persons.getIndexes()[
  ({
    v: 2,
    key: {
      _id: 1
    },
    name: "_id_"
  },
  {
    v: 2,
    key: {
      "dob.age": 1,
      gender: 1
    },
    name: "dob.age_1_gender_1"
  })
];
//**************************************************************** */
//  I have indexes like this, but I want to create a index on only for males
// like indexName: gender_male instead of gender_1 can I do like that

// In MongoDB, indexes are created on fields, NOT ON SPECIFIC VALUES within
// those fields. This means that you cannot create an index specifically for
// documents where gender is "male". However, you can create a partial index
// that only indexes documents where gender is "male". This partial index will
// include only the documents that meet the specified condition.

// creating partial index
db.collection.createIndex(
  { "dob.age": 1, gender: 1 },
  { partialFilterExpression: { gender: "male" } }
);
//if we have already like this  "dob.age_1_gender_1"
//then partial filter expression
db.collection.createIndex(
  { "dob.age": 1 },
  { name: "dob.age_gender_male", partialFilterExpression: { gender: "male" } }
);

// Important Considerations:
// This index will only include documents where the gender field is "male", and it will only index the
// dob.age field for those documents.
// If you already have a compound index named "dob.age_1_gender_1" (which indexes both dob.age and gender),
// this new index will not conflict with it. The existing index indexes both fields (dob.age and gender),
// while this new one indexes only dob.age for documents with gender: "male".
// If you need to optimize queries that filter on both dob.age and gender: "male", this new index will be
// helpful.

//ex2;
// if documents are in this type
[{ _id: 1, name: "Steven", standard: 4, gradePoints: 9.6, rank: 1 }];
//then create a index of students whose gradepoinst are in descending order within them print only
// only who are in between 7 to 9 gradepoints?

db.collection.createIndex(
  { gradePoints: -1 },
  { partialFilterExpression: { gradePoints: { $in: [7, 9] } } }
);
// the query is correct or not?
// The above query is almost correct but $in operator should not be used in creating the index it is used in
// to match the specific elements in finding and updating

//the correct query is
db.collection.createIndex(
  { gradePoints: -1 },
  { partialFilterExpression: { gradePoints: { $gte: 7, $lte9 } } } // // Only index documents with gradePoints between 7 and 9
);

//****************************CONFIGURING INDEXES ******************************
db.persons.createIndex({ email: 1 }, { unique: true });
// If you want to allow multiple null values but still enforce uniqueness for other email
// values, you can create a partial index that ignores documents where the email is null.

db.collection.createIndex(
  { email: 1 },
  // { unique: true, partialFilterExpression: { email: 1, $ne: { email: null } } }// which is wrong
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true, $ne: null } }
  }
);
// This index will enforce uniqueness only for documents where the email field exists
// and is not null, allowing you to have multiple null values in the collection without
// triggering a duplicate key error.

//You can create a partial index that only considers documents where the email field exists
//  and is a non-null string. Here's how you can do it:
db.collection.createIndex(
  { email: 1 },
  {
    unique: true,
    // partialFilterExpression: { email: { $exists: true, $type: "string" } } >> or
    partialFilterExpression: { email: { $type: "string" } }
  }
);

// in a collection of thousands of documents how can i know the different documents
// of fields have the same value in different docs??????????????
// for this we can use aggregation framwork
db.collection.aggregate([
  { $group: { _id: "$email", count: { $sum: 1 } } }, // which group the different docs according to the same email value
  { $match: { count: { $gt: 1 } } }, // match the docs which count is greater than 1
  { $count: "Duplicate email count" } // this will count the total no fo documents which has duplicate emils
]);
// Use $group and $match stages in aggregation to identify duplicate values.

db.persons.createIndex(
  { email: 1 },
  { partialFilterExpression: { email: { $exists: true, $ne: null } } }
);
/*
  {
    "ok" : 0,
    "errmsg" : "Error in specification { key: { email: 1.0 }, name: \"email_1\", 
	partialFilterExpression: { email: { $exists: true, $ne: null } }, v: 2 } :: caused by ::
	 Expression not supported in partial index: $not\n    email $eq null\n",
    "code" : 67,
    "codeName" : "CannotCreateIndex"
  } 
  */
// MongoDB does not allow expressions like $ne or $not in partialFilterExpression because partial indexes only
// support simple expressions like $exists or equality conditions ($eq).

//correct approch
db.persons.createIndex(
  { email: 1 },
  { partialFilterExpression: { email: { $exists: true } } } // Only index documents where "email" exists
);
// Query for Filtering Out null Emails:
// Once the index is created, you can handle documents with null emails in your queries like this:

// javascript
// Copy code
db.persons.find({ email: { $exists: true, $ne: null } });

//
//

//

//

// in for loop we cannot write index and arr like thid for(let [el,i,arr]){} is that correct statement or not?

let arr = [1, 2, 3];
// Yes, that is a correct statement. In a standard for...of loop, you can only iterate over the elements of
//  an array (the values), not the index or the array itself.
for (let el of arr) {
  // Access only the element (el) here
}
arr.forEach((el, i, arr) => {
  // Access element (el), index (i), and array (arr) here
});
//but forEach wont return return anything
// with for in loop we can iterate over index
for (let i in arr) {
  // Access index (i) here and then use arr[i] to get the element
}

// for(const [i,el,arr] of array){} is that correct or not

// No, that is not correct. The for...in loop is used to iterate over the indices (or keys) of an array or
//  object, not the elements themselves. Also, trying to destructure [i, el, arr] in a for...in loop is invalid.

//for of loop to iterated over values of array,object, or maps
// for in loop is to iterate over indeces or keys of objects or Maps
// to iterate over keys and values use Object.entries()
// to iterate overs indeces and elements of array use array.key();

//Time to live index; it is useful where selfdestruction of index is needed.
db.collection.insertOne({
  data: "about Time-to-live index",
  createdAt: new Date()
});
db.collection.createIndex({ craetedAt: 1 }, { expireAfterSeconds: 10 });
db.collection.find({});
// {
// 	"_id" : ObjectId("66c47d9cda81ac7548953f99"),
// 	"data" : "about Time-to-live index",
// 	"createdAt" : ISODate("2024-08-20T11:27:24.971Z")
// }
// after 10 seconds this  collection data wont be present
//collection name is present but on the collection no data is present.
// so if we want the collection data for some time after that we dont need about it then we can use this
// index
//IT WORKS ONLY ON DATES OBJECTS, NOT ON ALL FIELDS
//IT IS APPLICABLE FOR SINGLE FIELD INDEXES ONLY, IT WONT WORKS FOR COMPOUND INDEXES

//how mongodb rejects plans(rejected plan)
//Multikey index:
// A multikey indexes are the the indexes, that allows efficient querying of docs that contains
// arrays
// when you create a index on fields which contains arrays, then mondodb automatically creates
// multikey index

// creating index on Arrays having OBJECTS AS ITS ELEMENTS
db.users.findOne();
[
  {
    _id: ObjectId("66c54fc6b933caba4e209f42"),
    name: "Rko",
    hobbies: ["Eating", "Dancing", "Sports"],
    address: [
      {
        street: "firstStreet"
      },
      {
        line: "3rd line"
      }
    ]
  }
];
db.users.createIndex({ address: 1 });
db.users.explain("executionStats").find({ "address.street": "firstStreet" });
//this search uses collectionScan only
db.users.explain("executionStats").find({ address: "firstStreet" });
// this will use INDEXSCAN
[
  {
    winningPlan: {
      queryPlan: {
        stage: "FETCH",
        planNodeId: 2,
        inputStage: {
          stage: "IXSCAN",
          planNodeId: 1,
          keyPattern: {
            address: 1
          },
          indexName: "address_1",
          isMultiKey: true
        }
      }
    }
  }
];
// isMultiKey set to true because we created the index on field which is in the array

//Limitations of multikey indexes
// 1.Multikey indexes were created only for one field which have arrays. If we create a index for
// two diffrent fields which have arrays then isMultikey :false

// 2. wecan create index for normal field and array field
db.collection.createIndex({ name: 1, hobbies: 1 });

//3 we canNOT create a index on fields of same format and different format
db.collection.createIndex({ hobbies: 1, address: 1 });

///******************    T E X T   I N D E X E S   ******************* */
// This index will turn the words into array of words and store them in array
// one extra thing is that it will remove all stopping words like a, an, the,and, off, of, etc.
//  and it stems all the word, and you have array of keywords
//SPECIAL KIND OF MULTIKEY INDEX IS TEXT INDEX

db.indexText.insertMany([
  { title: "A Book", decription: "This is awesome book about a young artist" },
  {
    titel: "Red T-shirt",
    description: "This T-shirt is red and it's a pretty awesome!"
  }
]);
[
  {
    _id: ObjectId("66c58f21b933caba4e209f44"),
    title: "A Book",
    decription: "This is awesome book about a young artist"
  },
  {
    _id: ObjectId("66c58f21b933caba4e209f45"),
    titel: "Red T-shirt",
    description: "This T-shirt is red and it's a pretty awesome!"
  }
];
// creating text index on description field
db.collection.createIndex({ description: 1 });
//but the index created description_1 will NOT WORK  AS TEXT AS INDEX.
db.collection.dropIndex();

//CORRECT WAY OF CREATING TEXT INDEX IS         *****************

db.collection.createIndex({ description: "text" });
db.collection.getIndexes()[
  ({
    v: 2,
    key: {
      _id: 1
    },
    name: "_id_"
  },
  {
    v: 2,
    key: {
      _fts: "text",
      _ftsx: 1
    },
    name: "description_text",
    weights: {
      description: 1
    },
    default_language: "english",
    language_override: "language",
    textIndexVersion: 3
  })
];

//now find the book which is in red color
db.collection.find({ description: "red" });
//if we write a query like this for finding the book we CANNOT GET THe data using text index
//we need to use some mongodb text operators like $search, $text and more

//correct query is
// db.collection.find({ description: { $search: { $text: "red" } } });
//which is wrong
// db.collection.find({ description: { $text: { $search: "red" } } });
//the above query is also is incorrect

db.collection.find({ description: { $text: { $search: "red" } } });

// correct query:
db.collection.find({ $text: { $search: "red" } });
// which one is correct ?
//second one is correct

// db.collection.find({ description: { $text: { $search: "red" } } }); why this query is not correct ,
//  if we not specify the fieldName (description) where the mongodb driver will  search in the entire
//   collection
//when you are finding the docs using text index WE NO NEED TO SPECIFY THE NAME OF THE FIELD IN THE QUERY
// BECAUSE TEXTINDEX automatically includes the fieldName as we created text index on fieldName

// Reasons:
// How Text Indexes Work: When you create a text index, it’s already associated with specific fields
// (like description). You don’t have to explicitly specify the field in the query when performing a text
// search. Instead, you use the $text operator directly at the top level of the query to search across all
//  fields included in the text index.

// Misuse of $text Operator: The $text operator works at the document level, meaning it looks for text in
// any fields that are part of the text index. It is not a field-level operator. Therefore, you can't nest
//  $text inside a field query like { description: { $text: { $search: "red" } } }.

//correct usage of $text: we can directly use $text oprator on top level of the query without specifying the
// field name in the find operation, this operator will seach all the query words in the text index array, and
//NOT JUST IN THE DESCRIPTION FIELD

// To clarify:
// If a text index is created on description, MongoDB knows to search in that field when you use the $text
// query. Therefore, specifying description explicitly in the query with $text is unnecessary and incorrect.

//find the docs using text without using text index

db.collection.find({ description: "awsome" }); // which is WRONG

// correct query
db.collection.find({ description: /awsome/i });
//or
db.collection.find({ description: { $regex: "awsome" } });
// When performing a text search with MongoDB using a specific phrase, you need to ensure
// that the quotation marks within the search string are

//with index search
db.collection.find({ $text: { $search: "awsome book" } });

// how can i create text index for multiple words present in the same field  and
// can I create text index for multple fields

//ans:
//  we can create ONLY ONE TEXT INDEX PER COLLECTION, THAT INDEX CREATED ON SPECIFIC FIELD THAT WILL BE APPLICABLE
// FOR ALL WORDS IN THAT FIELD

// 2. Creating a Composite Text Index:
//  If you need to index multiple fields for text search, you should create a
//  COMPOSITE TEXT INDEX that includes all desired fields

//  how can I write multiple words to search using textIndex in the query ?????????????????????**************

//	To search for multiple words using a text inde in MongoDB, you can include
// the words in the '$search' string of the '$text' query.
// Mongodb will search for documents that contain any of hte specified word in
// the indexed text fields.
// By defalult, MOngoDB uses an "OR" condition between the word, so it
// returns docs containing any of the words.

//********************************************************* */
//Example with Multiple Words:
db.movies
  .find(
    { $text: { $search: "enormous transparent dome" } },
    { summary: 1, name: 1, language: 1 }
  )
  .pretty();

// can i create multiple text indexes in a collection for different fields in the docs
// we can create multiple text indexes for different fields, but we HAVE TO CREATE all of them only AT A TIME
// after creating one index, creating another text index is not possible because
//MONGODB SUPPORTS ONLY ONE TEXT INDEX PER COLLECTION, this index will be applicable for all fields in the docs
//that is we need to create a composite or combined text index

// If you want to include additional fields in the future:
// You cannot create another text index but can modify the existing one by dropping it and creating a new
// compound index with the desired fields.

// 1. You cannot create multiple text indexes on the same field.
// 2. You cannot create separate text indexes on other fields if a text index already exists in the collection.

// creating combined text index

db.collection.dropIndexes();
db.collection.createIndex({ field1: "text", field2: "text" });

// if we want to give more preference to specific field we can give weights to the each field, becase
// Certain fields are more important than others:
// For example, a match in the title field might be more important than a match in the description
// field.
// You want to prioritize certain fields during search:
// If a keyword appears in a higher-weighted field, it should rank higher in search results.

db.collection.createIndex(
  { field1: "text", field2: "text", field3: "text" },
  { weights: { field1: 10, field2: 5, field3: 3 } }
);
// In this case, field1 has the highest weight, so matches in field1 are considered more important than those
//  in field2 or field3.

// Important Notes:
// Text indexes are case-insensitive by default.
// You can adjust the relative weighting of fields within the index using the weights option if you want one
//  field to have more influence in searches.
// Conclusion:
// You cannot have more than one text index per collection in MongoDB. Instead, you should create a
//  single compound text index covering all the fields you need. If needed, adjust the weights to prioritize
// certain fields during search queries.

// example
db.collection.createIndex({
  summary: "text",
  name: "text",
  "rating.average": "text"
});
db.movies.getIndexes()[
  ({
    v: 2,
    key: {
      _id: 1
    },
    name: "_id_"
  },
  {
    v: 2,
    key: {
      _fts: "text",
      _ftsx: 1
    },
    name: "summary_text_name_text_rating.average_text",
    weights: {
      name: 1,
      "rating.average": 1,
      summary: 1
    },
    default_language: "english",
    language_override: "language",
    textIndexVersion: 3
  })
];

// can we create a text index and normal index in the same collections ?
// Yes, we can create a text index and normal index in the same collection but on different fields.
// A text index contain field of data  and is used to seach full text(e.g., title, description)
// A regular index is used to efficient querying, sorting or filtering and it is created on fileds having
// numeric, dates, or exact date Match(views, createdAt

//  WE HAVE TO CREATE TEXT AND REGULAR INDEX DIFFERENT TIMES (I.E. ONE AFTER ANOTHER) AND FOR DIFFERENT FIELDS

// Conclusion:
// Yes, you can create both a text index and a normal index within the same collection, but they need to be on
// different fields. MongoDB will utilize the appropriate index depending on the type of query you perform.

// Text indexs are essential for large-scale, complex full-text searches where
// 	performance and relevance ranking are crucial
// Collection scans might seems faster in small datsets, but they do not scale
// well and will become in efficient as your grows.

//for samll and tiny datasets collection scan might be better than text index. But
// for large scale datasets and complex full text searches text indexes are crucial.
db.products.find({ $text: { $search: "awesome T-Shirt" } }).pretty();

db.collection.aggregate([
  {
    $lookup: {
      from: "targetCollectionName",
      localField: "presentCollectionFieldName",
      foreignField: "targetCollectionFieldName",
      as: "newFieldName"
    }
  }
]);
// here
// data modification will occure in 'PRESETN COLLECTION'
// presentCollectionFieldName 'VALUE' and targetCollectionFieldNmae'
// VALUE SHOULD BE SAME OTHER WISE OPERATION WILL NOT DONE
// e.g.,
//i have studentsDetails data and classData data
// no i want to store the class details of student for each student in the studentData collection
const studentDetails = db.studentDetails.aggregate([
  {
    $lookup: {
      from: "classData",
      localField: { $and: ["$name.firstName", "$name.lastName"] },
      foreignField: "name",
      as: "classDetails"
    }
  }
]);
// $and is an operator used for logical conditions, not for
//  concatenating or combining fields. When performing a
// $lookup, the localField should reference a field that
// exists in the collection, not a computed value like $and.

//CORRECT QUERY
// to achieve this first we need to compute the name of the student
// first then we can use $lookup.

db.studentDetails.aggregate([
  {
    $addFields: {
      fullName: {
        $concat: ["$name.firstName", " ", "$name.lastName"]
      }
    } // this will add the new field in the studentDetails collection with fullName
  },
  {
    $lookup: {
      from: "classData",
      localField: "fullName", // created with $addFields stage
      foreignField: "name",
      as: "classDeatils"
    }
  }
]);
// here in the above query if I just want to add the "_id"  of
//  the "classData" collection documents fieldName "name" to
// 'studentDeatils' collection for each student , how could i write the query?

// procedure
// 1. Perform the $lookup as usual
// 2. Extract only the _id field from the classData collection documents
// USING "arrayElemAt" since $lookup returns an array, adn we
// want a single _id for each student.

db.studentDetails.aggregate([
  {
    $addFields: {
      fullName: { $concat: ["$name.firstName", " ", "$name.lastName"] }
    }
  },
  {
    $lookup: {
      from: "classData",
      localField: "fullName",
      foreignField: "name",
      as: "classDetails"
    }
  },
  {
    $addFields: {
      classId: {
        $arrayElemAt: ["$classDetails._id", 0] // extract the _id from the classDetails array
      }
    }
  }
]);
// "studentDetails" collection
[
  {
    _id: 1,
    name: { firstName: "John", lastName: "Doe" }
  },
  {
    _id: 2,
    name: { firstName: "Jane", lastName: "Smith" }
  }
][
  // classData collection
  ({
    _id: 101,
    name: "John Doe",
    class: "Math"
  },
  {
    _id: 102,
    name: "Jane Smith",
    class: "Science"
  })
][
  // output is
  {
    _id: 1,
    name: { firstName: "John", lastName: "Doe" },
    fullName: "JohnDoe", // Concatenated fullName without a space
    classDetails: [
      {
        _id: 101,
        name: "JohnDoe",
        class: "Math"
      }
    ],
    classId: 101 // The _id from the matched classData document
  }
];
//here i dont want class details, then the query will be

db.studentDetails.aggregate([
  {
    $addFields: {
      fullName: { $concat: ["$name.firstName", " ", "$name.lastName"] }
    }
  },
  {
    $lookup: {
      from: "classData",
      localField: "fullName",
      foreignField: "name",
      as: "classDetails"
    }
  },
  {
    $addFields: {
      classId: {
        $arrayElemAt: ["$classDetails._id", 0]
      }
    }
  },

  {
    $project: {
      classDetails: 0,
      fullName: 0
    }
  }
]);
//or
//optimised query

db.studentDetails.aggregate([
  {
    $lookup: {
      from: "classData",
      let: {
        fullName: { $concat: ["$name.firstName", "$name.lastName"] }
      },
      // {$match:{}} //wrong placement written in $lookup stage
      pipeline: [{ $match: { $expr: { $eq: ["$name", "$$fullName"] } } }],
      as: "classDetails"
    }
  },
  {
    $addFields: {
      classId: { $arrayElemAt: ["$clssDetails._id", 0] }
    }
  },
  {
    $project: {
      classDetails: 0
    }
  }
]);
// output is:
// {
//   "_id": 1,
//   "name": { "firstName": "John", "lastName": "Doe" },
//   "classId": 101   // Only the _id from the classData collection is added
// }

// here if i write a query then i need to get all the class details
//  of students using "class id" then how can I write  aquery
//  to get the class details of student using "classId" of document
//   present in "studentDetails" collection and classDetails
//   present in "classData" collection please a write a query

//to get this we can USE $lookup stage again
db.studentDetails.aggregate([
  {
    $lookup: {
      from: "classData", // the collection to join with(classData)
      localField: "classId", // the field in student collection to match (in the classData field value)
      foreignField: "_id", // the field in classData to match (_id)
      as: "classDetails" //the name of the field to store the matched class details
    }
  },
  {
    $project: {
      name: 1, //if you want just classDetails
      classDetails: 1
    }
  }
]);
//$addFields
//$concat
//$lookup,
//$addFields
//$arrayEleAt,
// the above operation is synchronous or asynchronous;

// the mongodb aggregation operations are synchronous in the context
// of  how they are executed within mongodb itself
//
// IN NODE.JS by  default mongodb operations are ASYNCHRONOUS.
// WHICH means when we run a query, it returns a promise that
// resolves once the query is complete.
//When you run an aggregation query like the one above, MongoDB processes
//  it on the server side in a synchronous manner.

// e.g.
const result = await db.studentDetails.aggregate([
  // your aggregation pipeline stages
]);

// 2.Synchronous: You can also write MongoDB queries in a
// blocking manner in Node.js, but this is rare in modern code
//  because async functions are more efficient for I/O-bound operations
// like database queries.
//  For example:
const resultSync = db.studentDetails.aggregate([
  // your aggregation pipeline stages
]);

//$bucket stage: categorizes the values based on conditions
[
  {
    $bucket: {
      groupBy: "<expression>", // The field to group by (typically numeric).
      boundaries: "<array>", // An array that defines the bucket ranges.
      default: "<string>" // Optional: A bucket for values outside the specified boundaries.
      // output: { "..."}             // The output fields for the bucket.
    }
  }
];
[
  {
    _id: 4,
    amount: 200
  },
  {
    _id: 5,
    amount: 300
  }
];
db.collection.aggregate({
  $bucket: {
    groupBy: "$amount",
    boundaries: [0, 100, 200, 700, 900, 1000],
    default: "others",
    output: {
      totalSales: { $sum: 1 },
      avgAmount: { $avg: "$amount" }
    }
  }
});

//outptu:

[
  {
    _id: { $bucket: "0-100" },
    totalSales: 2,
    avgAmount: 75
  },
  {
    _id: { $bucket: "101-200" },
    totalSales: 1,
    avgAmount: 150
  }
];

// docs
[
  {
    _id: 1,
    amount: 50
  },
  {
    _id: 2,
    amount: 100
  },
  {
    _id: 3,
    amount: 150
  },
  {
    _id: 4,
    amount: 200
  },
  {
    _id: 5,
    amount: 300
  },
  {
    _id: 6,
    amount: 400
  }
];
db.salesData.aggregate([
  {
    $bucketAuto: {
      groupBy: "$amount",
      buckets: 3,
      output: {
        totalSales: { $sum: 1 },
        avgAmount: { $avg: "$amount" }
      }
    }
  }
]);
//  output
[
  {
    _id: 1,
    totalSales: 2,
    avgAmount: 75
  },
  {
    _id: 2,
    totalSales: 2,
    avgAmount: 175
  },
  {
    _id: 3,
    totalSales: 2,
    avgAmount: 350
  }
];

//when to use $bucket and $bucktAuto

// $bucket : $bucket is used to when we need CUSTOM buckeT ranges for grouping data(e..g., 0-100, 100-200)
//      // to have a precise control over how data is grouped
//      If you are creating histograms or doing any operations that need fixed value ranges for aggregation.

//$bucketAuto: it is used if we want automatically determine bucket ranges
//      and are more concerned with DISTRIBUTING EVENLY ACROSS FIXED NUMBER

db.contacts.find().pretty();
// {
// 	"_id" : ObjectId("64e6433777f1415973b34861"),
// 	"name" : "Max",
// 	"hobbies" : [
// 		"Cooking",
// 		"Sports"
// 	],
// 	"addresses" : [
// 		{
// 			"street" : "Main Street"
// 		},
// 		{
// 			"street" : "Second street"
// 		}
// 	]
// }
db.contacts.aggregate([{ $replaceRoot: { newRoot: "$addresses" } }]);
// "errmsg" : "PlanExecutor error during aggregation :: caused by :: 'newRoot'
// expression  must evaluate to an object, but resulting value was:
// [{street: \"Main Street\"}, {street: \"Second street\"}]

// $replaceRoot will not directly work on arrays
// it only used to set on embedded objects

// to get the array of embedded documents to top-level we can get them by in two ways
//1. using $unwind and $replaceRoot
//2. using $replacRoot with $arrayEleAt operator

// 2
db.collection.aggregate([
  { $replaceRoot: { newRoot: { $arrayElemAt: ["$addresses", 0] } } }
]);
// this will print only ONE DOCUMENT even multiple objects are present in the array field
// that is also 0 index based object only print
// { "street" : "Main Street" }

//1. using $unwind and $replaceRoot

db.collection.aggregate([
  { $unwind: "$addresses" },
  { $replaceRoot: { newRoot: "$addresses" } }
]);

//  { $replaceRoot: { newRoot: { $arrayElemAt: ["$addresses", 0] } } }
// here  0 means the index position of the addresses array, which means its print 0 index docement in the addresses array
// we can change this value to 1 or 3  or etc.
//BUT IT CANNOT ACCEPT MULTIPLE arguments like below
// { $replaceRoot: { newRoot: { $arrayElemAt: ["$addresses", 0, 2] } } }
db.studentDeatils.aggregate([
  {
    $lookup: {
      from: "classData",
      let: {
        fullName: { $concat: ["$name.firstName", "name.lastName"] },
        pipeline: [{ $match: { $expr: { $eq: ["$name", "$$fullName"] } } }],
        as: "classDetails"
      }
    }
  }
]);

db.collection.aggregate([
  {
    $facet: {
      topRatedMovies: [
        { $match: { "rating.average": { $gt: 7.5 } } },
        { $sort: { "rating.average": -1 } },
        { $limit: 5 }
      ],
      belowRatedMovies: [
        { $match: { "rating.average": { $lt: 7.5 } } },
        { $sort: { "rating.average": -1 } },
        { $limit: 5 }
      ]
    }
  }
]);

db.collection.aggregate([
  { $group: { _id: "netwrok.name", total: { $sum: 1 } } }, // calculate no of shows on each network
  {
    $merge: {
      into: "network_stats",
      whenMatched: "merge",
      whenNotMatched: "insert"
    }
  }
]);

//2. What is the average rating for shows in each genre?
db.collection.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres", average: { $avg: "$rating.average" } } },
  { $sort: { average: -1 } }
]);
[
  { _id: "Drama", averageRating: 7.8 },
  { _id: "Thriller", averageRating: 7.4 },
  { _id: "Horror", averageRating: 7.6 },
  { _id: "Romance", averageRating: 7.6 }
];
//find how many genres are there for each movie

// db.collection.aggregte([
//   { $group: { _id: "movies" } },
//   { $project: { totalGenres: { $size: "$genres" } } }
// ]); // wrong
db.collection.aggregate([
  { $unwind: "$gnres" },
  { $group: { _id: "$name", totalGenres: { $size: "$genres" } } }
]);
//or
db.collection.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$name", totalGenres: { $sum: 1 } } }
]);
