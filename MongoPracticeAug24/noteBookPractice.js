const { text } = require("body-parser");

/*
The difference between insert and insertOne in MongoDB lies in their 
intended usage and how they handle operations:

db.sports.insert():

Usage: This method is used to insert one or more documents into a collection.
Behavior: It can accept either a single document or an array of documents.
 If an array is provided, all documents in the array are inserted in a 
 single operation.
Return Value: It returns a WriteResult object containing information about
 the operation, such as the number of documents inserted.
Example:
javascript
Copy code
db.sports.insert({name: "Running", isAtlet: true})
This inserts a single document into the sports collection.
db.sports.insertOne():

Usage: This method is specifically used to insert exactly one document into 
a collection.
Behavior: It only accepts a single document as an argument and inserts it into 
the collection.
Return Value: It returns an InsertOneResult object, which includes the _id of
 the inserted document and other details.
Example:
javascript
Copy code
db.sports.insertOne({name: "Hockey"})
This inserts a single document into the sports collection.
Key Differences:
Number of Documents:

insert: Can insert multiple documents at once if given an array.
insertOne: Only inserts a single document.
Return Object:

insert: Returns a WriteResult object, which is used for both single and bulk 
inserts.
insertOne: Returns an InsertOneResult object specifically for the insertion of 
a single document.
Modern vs. Legacy:

insert: Considered a more general and slightly older method, sometimes seen in legacy code.
insertOne: A newer method introduced for more explicit single-document insertion, often 
preferred for clarity and specificity.
In modern MongoDB applications, it's generally recommended to use insertOne for inserting a
 single document and insertMany for inserting multiple documents. This helps to avoid any
ambiguity in the code.

You said:
insert(), insertMany(), insertOne() key differences
ChatGPT said:
ChatGPT
Here’s a comparison of the three MongoDB methods: insert(), insertMany(), and insertOne(). Each
 method is used for inserting documents into a collection, but they have different use cases
  and behaviors:

1. insert()
Purpose: Used for inserting one or more documents into a collection.
Behavior: Accepts either a single document or an array of documents. If given an array, all
 documents are inserted in a single operation.
Return Value: Returns a WriteResult object that includes details like the number
 of documents inserted (nInserted).
Usage:
javascript
Copy code
db.collection.insert({ name: "John", age: 30 })  // Single document
db.collection.insert([{ name: "Jane", age: 25 }, { name: "Doe", age: 22 }])  // Multiple documents
Status: Considered a legacy method; it’s still supported but newer methods (insertOne() and
 insertMany()) are
 preferred.
2. insertOne()
Purpose: Specifically designed to insert a single document into a collection.
Behavior: Accepts a single document and inserts it.
Return Value: Returns an InsertOneResult object that includes the _id of the inserted document 
and an acknowledged flag indicating the operation's success.
Usage:
javascript
Copy code
db.collection.insertOne({ name: "John", age: 30 })
Status: Modern and preferred for inserting individual documents.
3. insertMany()
Purpose: Specifically designed to insert multiple documents into a
		 collection in a single operation.
Behavior: Accepts an array of documents and inserts them all at once.
Return Value: Returns an InsertManyResult object that includes an array of 
		_ids for the inserted documents and an acknowledged flag.

Usage:
javascript
Copy code
db.collection.insertMany([{ name: "Jane", age: 25 }, { name: "Doe", age: 22 }])
Status: Modern and preferred for bulk insert operations.

Key Differences:

Number of Documents:

insert(): Can handle both single and multiple document inserts.
insertOne(): Only inserts a single document.
insertMany(): Only inserts multiple documents.

Return Objects:

insert(): Returns a WriteResult object.
insertOne(): Returns an InsertOneResult object.
insertMany(): Returns an InsertManyResult object.

Error Handling:

insert(): In older versions, it may not throw an error if some documents fail to 
insert (depending on write concern).
insertOne(): Will throw an error if the document cannot be inserted.
insertMany(): Supports ordered and unordered inserts, which can affect how it
 handles errors (e.g., an ordered insert stops on the first failure, whereas an unordered insert tries to continue with the rest of the documents).
Performance:

insertMany(): Optimized for bulk insert operations, which can be more performant 
when inserting large numbers of documents compared to calling insertOne() in a loop.
In summary, insert() is more general and can handle both single and multiple 
inserts but is considered legacy. insertOne() and insertMany() are modern, preferred methods designed explicitly for single and multiple document inserts, respectively.

*/
db.users.insertMany([
  {
    name: "Max",
    age: 32,
    hobbies: [
      { title: "Sports", frequency: 3 },
      { title: "Cooking", frequency: 6 }
    ],
    phone: 23214223
  },
  {
    name: "Sara",
    age: 45,
    hobbies: [{ title: "hacking", frequency: 4 }],
    phone: 43252322
  },
  {
    name: "Jonas",
    age: 35,
    hobbies: [
      { title: "Sports", frequency: 2 },
      { title: "teaching", frequency: 8 }
    ],
    phone: 431235322
  }
]);
// {
// 	"acknowledged" : true,
// 	"insertedIds" : [
// 		ObjectId("66bc16d23d6802bbff2744dd"),
// 		ObjectId("66bc16d23d6802bbff2744de"),
// 		ObjectId("66bc16d23d6802bbff2744df")
// 	]
// }

//***************** ** READ OPERATORS   ********************************* */

//find the users who has sports as their hobby
db.users.find({ hobbies: "Sports" }).pretty();
//because we cant write the query like that because sports just value of key which is in embedded array
//correct query is
db.users.find({ "hobbies.title": "Sports" }).pretty();
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"name" : "Max",
	"age" : 32,
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 3
		},
		{
			"title" : "Cooking",
			"frequency" : 6
		}
	],
	"phone" : 23214223
}
{
	"_id" : ObjectId("66bc16d23d6802bbff2744df"),
	"name" : "Jonas",
	"age" : 35,
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "teaching",
			"frequency" : 8
		}
	],
	"phone" : 431235322
}
*/
// using $size
db.users.insertMany([
  { name: "Chris", hobbies: ["sports", "cooking", "hiking"] },
  { name: "Jonrdan", hobbies: ["sports", "eating", "cycling", "reading"] }
]);
/*
  {
	 "acknowledged" : true,
	 "insertedIds" : [
		 ObjectId("66bc1a633d6802bbff2744e0"),
		 ObjectId("66bc1a633d6802bbff2744e1")
	 ]
 }
 >*/
//find the users who have 3 hobbies
db.users.find({ hobbies: { $size: 3 } }, { hobbies: 1 }).pretty();
/*
  {
	 "_id" : ObjectId("66bc1a633d6802bbff2744e0"),
	 "hobbies" : [
		 "sports",
		 "cooking",
		 "hiking"
	 ]
 }
 */
//find users who has more than 3 hobbies
db.users.find({ hobbies: { $size: { $gte: 3 } } }, { hobbies: 1 }).pretty();

/*
 Error: error: {
	 "ok" : 0,
	 "errmsg" : "Failed to parse $size. Expected a number in: $size: { $gte: 3.0 }",
	 "code" : 2,
	 "codeName" : "BadValue"
 }
 */
//The error occurs because the $size operator in MongoDB expects a number, not a query.
// You cannot use comparison operators like $gte directly within $size.

//If you want to find documents where the hobbies array has a length of 3 or more,
// you'll need to do this in two steps:

//1.Use the $expr operator with $gte to compare the array length directly.
//2. Use the $size operator to get the size of the array.
//since $size doesn't allow comparison directly, you can achieve this using the aggregation framework or by writing a custom query logic
//correct query is
db.users
  .aggregate([
    { $project: { hobbies: 1, hobbiesLength: { $size: "$hobbies" } } }, //hobbiesLength: { $size: "$hobbies" }: This creates a new field named hobbiesLength in the output documents, which contains the number of elements in the hobbies array for each document.
    { $match: { hobbiesLength: { $gte: 3 } } }
  ])
  .pretty();
/*
 {
	 "_id" : ObjectId("66bc1a633d6802bbff2744e0"),
	 "hobbies" : [
		 "sports",
		 "cooking",
		 "hiking"
	 ],
	 "hobbiesLength" : 3
 }
 {
	 "_id" : ObjectId("66bc1a633d6802bbff2744e1"),
	 "hobbies" : [
		 "sports",
		 "eating",
		 "cycling",
		 "reading"
	 ],
	 "hobbiesLength" : 4
 }
*/
///using array query selector         "$all"

//find the docs which a genre of exactly thriller and action only as genres
db.movies.find({ genres: ["Action", "Thriller"] }).pretty();
db.movies.find({ genres: ["Drama", "Thriller"] }).pretty();
//for the above two queries  no output because in the genres aaarray more thn two elements are present and the order of the elements in the query we written
// above is not the same as it in the documents of database  like below
db.movies.find({}, { genres: 1 }).pretty();
/*
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	"genres" : [
		"Drama",
		"Science-Fiction",
		"Thriller"
	]
}
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"genres" : [
		"Drama",
		"Action",
		"Crime"
	]
}
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e87"),
	"genres" : [
		"Drama",
		"Horror",
		"Romance"
	]
}
*/
db.movies.find({ genres: ["Drama", "Action", "Crime"] }).pretty();
/*
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"id" : 2,
	"url" : "http://www.tvmaze.com/shows/2/person-of-interest",
	"name" : "Person of Interest",
	"type" : "Scripted",
	"language" : "English",
	"genres" : [
		"Drama",
		"Action",
		"Crime"
	],
}
*/
db.movies.find({ genres: ["Drama", "Action"] }).pretty();
//>
//will only match documents where the genres array is exactly ["Action", "Thriller"]
// in that specific order and with no other elements in the array.

//If the genres field in a document is ["Thriller", "Action"] or ["Action", "Thriller", "Drama"],
// it will not match because the order or the number of elements differs.

//To Find Documents with Exactly "Action" and "Thriller" in Any Order:
//use $all operator to overcome order in the array while finding the
// documents

db.movies
  .find({ genres: { $all: ["Action", "Drama"] } }, { genres: 1 })
  .pretty();
/*
 {
	"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"genres" : [
		"Drama",
		"Action",
		"Crime"
	]
}
{
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"),
	"genres" : [
		"Drama",
		"Action",
		"Science-Fiction"
	]
}
*/
//If you want to match documents where the genres array contains exactly "Action" and "Thriller" in any order and only those two elements, you can use the $all operator along with $size:
db.movies
  .find({
    genres: { $all: ["Drama", "Crime"] },
    $expr: { $eq: [{ $size }, 2] }
  })
  .pretty();
//because no document were found in the collection with exactly genres array size as 2
db.movies
  .find({
    genres: { $all: ["Drama", "Crime"] },
    $expr: { $eq: [{ $size: "$genres" }, 3] }
  })
  .pretty();
/*
  {
	"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"genres" : [
		"Drama",
		"Action",
		"Crime"
	]
}
{
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"),
	"genres" : [
		"Drama",
		"Crime",
		"Thriller"
	]
}
*/
//find the docs who have a hobby of sports and the frequency should be equal to 2
db.users
  .find(
    { $and: [{ "hobbies.title": "Sports" }, { "hobbies.frequency": 2 }] },
    { hobbies: 1 }
  )
  .pretty();

/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744df"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "teaching",
			"frequency" : 8
		}
	]
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	]
}
*/
// but that is not the correct one we want  we only want sports as hobby with a frequency of 2 only.
// In the second document if you see we got frequency as 5 for sports hobby
//the above query  would incorrectly match this document because it checks for "hobbies.title": "Sports" and "hobbies.frequency": 2 independently within the hobbies array,
// not ensuring they apply to the same element
//To ensure that both the title and frequency conditions apply to the same hobby, you can use the following query with the

// ***************** $elemMatch operator:

db.users
  .find(
    {
      hobbies: {
        $elemMatch: {
          title: "Sports",
          frequency: 2
        }
      }
    },
    {
      hobbies: 1
    }
  )
  .pretty();

/*
 {
		"_id" : ObjectId("66bc16d23d6802bbff2744df"),
		"hobbies" : [
			{
				"title" : "Sports",
				"frequency" : 2
			},
			{
				"title" : "teaching",
				"frequency" : 8
			}
		]
	}
	*/
//find the documents which have rating greater than 6 nd less than 8
db.movies
  .find({ rating: { $elemMatch: { $gt: 6, $lt: 8 } } }, { rating: 1 })
  .pretty();
// $elemMatch is used for matching elements within arrays, but "rating.average" is an object, not an array.

db.movies
  .find({ "rating.average": { $gt: 6, $lt: 8 } }, { rating: 1 })
  .pretty();
//  or
db.movies
  .find(
    {
      $and: [{ "rating.average": { $gt: 6 } }, { "rating.average": { $lt: 8 } }]
    },
    { rating: 1 }
  )
  .pretty();

/*
 {
	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	"rating" : {
		"average" : 6.5
	}
}
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e87"),
	"rating" : {
		"average" : 7.6
	}
}
{
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"),
	"rating" : {
		"average" : 7.6
	}
}
*/
//

//how can get the document present in the outther database to presently working database
// presently iam working in practice database, and collection name is cursorPractice and I have documents in credit database in the ratings collections,
// now I want to get the ratings collection documents into practice database of cursorPractice the query is
db.getSiblingDatabase("credit").aggregate([
  { $match: {} },
  { $out: "cursorPractice" }
]);
db.getSiblingDB("credit").cursorPractice.aggregate([
  { $match: {} },
  { $out: "cursorPractice" }
]);

// I used
const dataCursor = db.tempcursorPractice.find();
dataCursor.next();
dataCursor.forEach((doc) => {
  printjson(doc);
});
// in the shell i used the collection i have 1million documents
// then how can i stop in the shell
// with ctrl+c we can terminate or
// with limit() we can control the documents with some extent by using in the syntax

// using PROJECTIONS IN ARRAYS
db.movies.find({ genres: "Drama" }, { name: 1, genres: 1 }).pretty();
/*
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	"name" : "Under the Dome",
	"genres" : [
		"Drama",
		"Science-Fiction",
		"Thriller"
	]
}
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"name" : "Person of Interest",
	"genres" : [
		"Drama",
		"Action",
		"Crime"
	]
}
*/

//the above query is giving all the document which has Drama as its one of element of genres but
//we want  THE DOCUMENTS WHICH ONLY show the  DRAMA as its element and others dont want show
//  for this we can use .$ operator

db.movies
  .find({ genres: "Drama" }, { "genres.1": 1 }, { name: 1, genres: 1 })
  .pretty(); // which is wrong query there we DONT HAVE TO USE 1 in projections\
/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e85"), "genres" : [ ] }
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "genres" : [ ] }
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e87"), "genres" : [ ] }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"), "genres" : [ ] }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"), "genres" : [ ] }
*/

//correct query is

db.movies.find({ genres: "Drama" }, { "genres.$": 1 }).pretty();

/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e85"), "genres" : [ "Drama" ] }
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "genres" : [ "Drama" ] }
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e87"), "genres" : [ "Drama" ] }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"), "genres" : [ "Drama" ] }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"), "genres" : [ "Drama" ] }
*/
//but the docs behind th scens would have more data in genres array and some other fields in the document
//now if I want Drama and Thriller as the elements of the array

db.movies
  .find({ genres: "Dram" }, { "genres.$": ["Drama", "Horror"] })
  .pretty();
/*
 Error: error: {
	 "ok" : 0,
	 "errmsg" : "positional projection cannot be used with a literal",
	 "code" : 31308,
	 "codeName" : "Location31308"
 }
 /

Positional Projection in MongoDB:-
Positional projection is a feature in MongoDB that allows you to return only the first matching element from an array field that matches the
query criteria.
 It's useful when you want to retrieve specific elements from an array but don't want the entire array returned.

Explanation of the Positional Operator ($):
The positional operator ($) returns the first element in the array that matches the query condition.
In your query, { "genres.$": 1 } means "include only the first element in the genres array that matches the query condition."

*/
db.movies
  .find({ genres: { $all: ["Drama", "Thriller"] } }, { "genres.$": 1 })
  .pretty();
/*
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	"genres" : [
		"Thriller"
	]
}
{
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"),
	"genres" : [
		"Thriller"
	]
}
but in the genres array I have  
"genres" : [
		"Drama",
		"Crime",
		"Thriller"
	]  "genres" : [
		"Drama",
		"Action",
		"Science-Fiction"
	]
then why it is choosing Thriller as its first element in searching even Drama is the first element present in the document

The reason you're seeing "Thriller" instead of "Drama" as the first element when using the positional operator ($) in your query is 
related to how MongoDB processes and returns the first match within the array based on your query.

How the Positional Operator ($) Works:
The positional operator ($) returns the first element in the array that matches the condition specified in the query.
In your query, when you use {"genres.$": 1}, MongoDB looks for the first element in the genres array that satisfies the query condition, 
which in your case is genres: { $all: ["Drama", "Thriller"] }.
*/
//now I want see only Horror as the output in the document
//for tht use $elemMatch
db.movies
  .find({ genres: "Drama" }, { genres: { $elemMatch: { $eq: "Horror" } } })
  .pretty();
/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e85") }  ----------------------
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e86") } --------------------------------------- these are all have Drama genre but dont have Horror as its one of the genre
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e87"), "genres" : [ "Horror" ] }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e88") } -----------------------------
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e89") }---------------------
*/
db.movies.find({}, { genres: 1 });
/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e85"), "genres" : [ "Drama", "Science-Fiction", "Thriller" ] }
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "genres" : [ "Drama", "Action", "Crime" ] }
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e87"), "genres" : [ "Drama", "Horror", "Romance" ] }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"), "genres" : [ "Drama", "Action", "Science-Fiction" ] }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"), "genres" : [ "Drama", "Crime", "Thriller" ] }
*/

// now print the dcuments which rating is greater than 9 and has action  genre
db.movies
  .find(
    { "rating.average": { $gt: 8 } },
    { genres: { $elemMatch: { $eq: "Action" } } }
  )
  .pretty();
/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "genres" : [ "Action" ] }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e89") }

now print the dcuments which rating is greater than 9 and has action  genre
db.movies
  .find(
    { "rating.average": { $gt: 8 } },
    { genres: { $elemMatch: { $eq: "Action" } } }
  )
  .pretty();
/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "genres" : [ "Action" ] }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e89") } here I want only the documents which rating is greater than 8 and has action genre i dont want others, so i wrote a query like below db.movies.find({"rating.average":{$gt:8}},{"genres.$":["Action"]}).pretty()
Error: error: {
	"ok" : 0,
	"errmsg" : "positional projection cannot be used with a literal",
	"code" : 31308,
	"codeName" : "Location31308"
}
 using array projection as the desired element is present in the array , then what is the wrong in the query

The error you're encountering is due to incorrect usage of the positional projection ($). The positional projection ($) cannot be combined with a literal value as you've tried in your query.
This query is trying to combine the positional projection with a literal array ["Action"], "which is not allowed in MongoDB". The positional operator ($) is meant to return the first matching element from an array, but it can't be used directly with an array of values like this.


The error you're encountering is due to incorrect usage of the positional projection ($). The positional projection ($) cannot be combined with a literal value as you've tried in your query.

Here's the breakdown of what happened and the correct way to achieve your goal:

Problem with the Query
Your query:

javascript
Copy code
db.movies.find(
  { "rating.average": { $gt: 8 } },
  { "genres.$": ["Action"] }
).pretty();
This query is trying to combine the positional projection with a literal array ["Action"], which is not allowed in MongoDB. The positional operator ($) is meant to return the first matching element from an array, but it can't be used directly with an array of values like this.

Correct Approach
To retrieve documents where the rating.average is greater than 8 and the genres array contains "Action", and then 
to return only the "Action" genre in the result, you can modify your query like this:
THE CORRECT APPROCH
*/
db.movies
  .find({ "rating.average": { $gt: 8 }, genres: "Action" }, { "genres.$": 1 })
  .pretty();

//  { "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "genres" : [ "Action" ] }

//
//  using mongodb $slice operator

// find the documents  whose average rating is greater than 8 and print only 2 elements in the array of any one of the field
// for this use $slice operator instead of $elemMatch
//
db.movies
  .find(
    { "rating.average": { $gt: 8 } },
    { genres: { $slice: 2 }, genres: 1, rating: 1 }
  )
  .pretty(),
  db.movies
    .find(
      { "rating.average": { $gt: 8 } },
      { genres: { $slice: 2 } },
      { genres: 1, rating: 1 }
    )
    .pretty(),
  db.movies
    .find({ "rating.average": { $gt: 8 } }, { genres: { $slice: [1, 2] } })
    .pretty();
db.movies
  .find({ "rating.average": { $gt: 8 } }, { genres: { $slice: 2 } })
  .pretty();
db.movies.find({ "rating.average": { $gt: 8 } }, { rating: 1 }).pretty();

// whta is the difference among them?
/*
db.movies.find({"rating.average": {$gt: 8}}, {genres: {$slice: 2}, genres: 1, rating: 1}).pretty()
What it does:
Filters documents where rating.average is greater than 8.
In the projection, it returns:
The genres array, but only the first two elements due to the $slice: 2 operation.
The rating field.
The issue with this query is that it repeats the genres field in the projection, which isn't necessary.

2. Query 2:
javascript
Copy code
db.movies.find({"rating.average": {$gt: 8}}, {genres: {$slice: 2}}, {genres: 1, rating: 1}).pretty()
What it does:
This query is incorrectly formatted due to having two projection objects separated by a comma. 
MongoDB expects only one projection object.
This would throw an error in MongoDB because you cannot have multiple projection objects in the same query.

3. Query 3:
javascript
Copy code
db.movies.find({"rating.average": {$gt: 8}}, {genres: {$slice: [1, 2]}}).pretty()
What it does:
Filters documents where rating.average is greater than 8.
In the projection, it returns:
The genres array, but starts slicing from index 1 (second element) and returns 2 elements.
So, if genres is ["Drama", "Action", "Thriller"], the output would be ["Action", "Thriller"].
Only the sliced genres field is returned. Other fields are excluded unless explicitly included.

4. Query 4:
javascript
Copy code
db.movies.find({"rating.average": {$gt: 8}}, {genres: {$slice: 2}}).pretty()
What it does:
Filters documents where rating.average is greater than 8.
In the projection, it returns:
The genres array, but only the first two elements due to the $slice: 2 operation.
No other fields are included unless specified, so only the first two genres are returned.
5. Query 5:
javascript
Copy code
db.movies.find({"rating.average": {$gt: 8}}, {rating: 1}).pretty()
What it does:
Filters documents where rating.average is greater than 8.
In the projection, it returns:
Only the rating field and the _id by default (since _id is included unless explicitly excluded).
The genres field is not included in the result.

Summary of Differences:
Field Inclusion/Exclusion:

The first query incorrectly includes the genres field twice in the projection, which is unnecessary.
The second query has incorrect syntax due to the use of multiple projection objects.
The third and fourth queries use $slice to limit the number of elements returned from the genres array but differ in how they slice the array.
The fifth query does not include the genres field at all and only returns the rating field.
*/

// ************************************

// Arry slicing  with $slice operator gives you to get required number of elements in the field array
//  $slice: 2, return the first two elements of the Array
//  $slice:[1, 2] starts slicing from index position 1 of the arry i.e from second element and returns the next two elements

db.movies
  .find({ "rating.average": { $gt: 8 } }, { genres: { $slice: 2 } })
  .pretty();
// after using this query  Iam getting entire the documents not just the genres field with specified number of elements in
// the genres array as you said, it printing entire document, but if
//  I want only some of the field of the document with $slice projection how can I do?
// you should include the desired fields explicitly in the projection object.
//  the query is
db.movies
  .find(
    { "rating.average": { $gt: 8 } },
    { genres: { $slice: [1, 2] }, genres: 1, rating: 1 }
  )
  .pretty();

/*
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"genres" : [
		"Drama",
		"Action",
		"Crime"
	],
	"rating" : {
		"average" : 9
	}
}
{
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"),
	"genres" : [
		"Drama",
		"Crime",
		"Thriller"
	],
	"rating" : {
		"average" : 8.3
	}
}
*/
//************************************************************************************ */

//BUT MULTIPLE PROJECTION OBJECTS IN MONGODB IS NOT ACCEPTABLE LIKE BELOW QUERY
db.movies
  .find(
    { "rating.average": { $gt: 8 } },
    { genres: { $slice: 2 } },
    { genres: 1, rating: 1 }
  )
  .pretty();

//******************************************************************************* */
// IF YOU WANT TO PROJECT ONLY REQUIRED FIELD YOU CAN USE LIKE BELOW QUERY
db.movies
  .find(
    { "rating.average": { $gt: 8 } },
    { genres: { $slice: 2 }, rating: 1, _id: 0 }
  )
  .pretty();
//SAMPLE OUTPUT IS
/*
{
    "genres": ["Action", "Thriller"],
    "rating": {
        "average": 8.5
    }
}
*/

//*********************       UPDATE OPERATORS   ********************  */
db.users.insertOne({ name: "Dean", phone: 3234242342 });
/*
{
	"acknowledged" : true,
	"insertedId" : ObjectId("66bd73baaf3abccac1c4a1cb")
}
*/
db.users.updateOne(
  { _id: ObjectId("66bd73baaf3abccac1c4a1cb") },
  {
    $set: {
      hobbies: [
        { title: "Sports", frequency: 5 },
        { title: "Cooking", frequency: 3 },
        { title: "Hiking", frequency: 1 }
      ]
    }
  }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ _id: ObjectId("66bd73baaf3abccac1c4a1cb") });

/*
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"name" : "Dean",
	"phone" : 3234242342,
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		},
		{
			"title" : "Hiking",
			"frequency" : 1
		}
	]
}
 cls
*/
db.users.updateOne(
  { _id: ObjectId("66bd73baaf3abccac1c4a1cb") },
  {
    $set: {
      hobbies: [
        { title: "Sports", frequency: 5 },
        { title: "Cooking", frequency: 3 },
        { title: "Hiking", frequency: 1 }
      ]
    }
  }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }
//lets say the persons who has the sportss as one of the hobby they will recieve a new field called isSporty equal to true, so add that field
db.users.updateMany({ "hobbies.title": "Sports" }, { $set: { isSport: true } });
// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }
db.users.find().count();
// 8

db.users.updateMany(
  { hobbies: { $exists: true } },
  { $set: { comment: "You have better health because of having hobbies" } }
);
// { "acknowledged" : true, "matchedCount" : 8, "modifiedCount" : 8 }

// ******** UPDATING MULTIPLE FIELDS  ************
//  > CLS
//  2024-08-15T10:59:31.996+0530 E QUERY    [thread1] ReferenceError: CLS is not defined :
//  @(shell):1:1
//  > cls

db.users.update(
  { "hobbies.title": "Hiking" },
  { $set: { employeed: true, salary: 20000 } }
);

//  WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
db.users.findOne({ "hobbies.title": "Hiking" });
/*
 {
	 "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	 "name" : "Dean",
	 "phone" : 3234242342,
	 "hobbies" : [
		 {
			 "title" : "Sports",
			 "frequency" : 5
		 },
		 {
			 "title" : "Cooking",
			 "frequency" : 3
		 },
		 {
			 "title" : "Hiking",
			 "frequency" : 1
		 }
	 ],
	 "isSport" : true,
	 "comment" : "You have better health because of having hobbies",
	 "employeed" : true,
	 "salary" : 20000
 }
*/
db.users.updateMany(
  { "hobbies.title": "Hiking" },
  { $set: { employeed: true, salary: 20000 } }
);
//  { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }
db.users.findOne({ "hobbies.title": "Hiking" });
/*
 {
	 "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	 "name" : "Dean",
	 "phone" : 3234242342,
	 "hobbies" : [
		 {
			 "title" : "Sports",
			 "frequency" : 5
		 },
		 {
			 "title" : "Cooking",
			 "frequency" : 3
		 },
		 {
			 "title" : "Hiking",
			 "frequency" : 1
		 }
	 ],
	 "isSport" : true,
	 "comment" : "You have better health because of having hobbies",
	 "employeed" : true,
	 "salary" : 20000
 }
 */

db.users.updateMany(
  { "hobbies.title": "Cooking" },
  { $set: { employeed: "Self employeed", salary: 30000 } }
);
//  { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }

db.users.findOne({ "hobbies.title": "Cooking" });
/*
 {
	 "_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	 "name" : "Max",
	 "age" : 32,
	 "hobbies" : [
		 {
			 "title" : "Sports",
			 "frequency" : 3
		 },
		 {
			 "title" : "Cooking",
			 "frequency" : 6
		 }
	 ],
	 "phone" : 23214223,
	 "isSport" : true,
	 "comment" : "You have better health because of having hobbies",
	 "employeed" : "Self employeed",
	 "salary" : 30000
 }
 */
db.users.find({ "hobbies.title": "Cooking" }).pretty();
/*
 {
	 "_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	 "name" : "Max",
	 "age" : 32,
	 "hobbies" : [
		 {
			 "title" : "Sports",
			 "frequency" : 3
		 },
		 {
			 "title" : "Cooking",
			 "frequency" : 6
		 }
	 ],
	 "phone" : 23214223,
	 "isSport" : true,
	 "comment" : "You have better health because of having hobbies",
	 "employeed" : "Self employeed",
	 "salary" : 30000
 }
 {
	 "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	 "name" : "Stalin",
	 "hobbies" : [
		 {
			 "title" : "Sports",
			 "frequency" : 5
		 },
		 {
			 "title" : "Cooking",
			 "frequency" : 2
		 }
	 ],
	 "phone" : 234322234,
	 "isSport" : true,
	 "comment" : "You have better health because of having hobbies",
	 "employeed" : "Self employeed",
	 "salary" : 30000
 }
 {
	 "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	 "name" : "Dean",
	 "phone" : 3234242342,
	 "hobbies" : [
		 {
			 "title" : "Sports",
			 "frequency" : 5
		 },
		 {
			 "title" : "Cooking",
			 "frequency" : 3
		 },
		 {
			 "title" : "Hiking",
			 "frequency" : 1
		 }
	 ],
	 "isSport" : true,
	 "comment" : "You have better health because of having hobbies",
	 "employeed" : "Self employeed",
	 "salary" : 30000
 }
 */
//  in the above operations the document having id as "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), is updated for 2 times
//  but updates were happened for one time or it is overwritten by removing the previously updated value why? secondly, I want
//   only the update which happened for first time for that what should I do?

// ObjectId("66bd73baaf3abccac1c4a1cb") was updated twice because it matched both update criteria. This is why the fields employeed and
// salary were overwritten by the second update operation. Since both updates targeted the same fields (employeed and salary), the second update
// overwrote the values set by the first update.

// How to Prevent Overwriting the First Update??????????????????????????????

// To prevent a document from being updated multiple times in such cases, you can modify your update logic to ensure that a document is only updated once,
//  even if it matches multiple criteria. Here are some approaches:

// 1. Use a Conditional Field Update
// You can include a condition to check if the fields you want to update are
//  already set. For example:
db.users.updateMany(
  { "hobbies.title": "Hiking" },
  { $set: { employeed: "Employee", salary: 25000 } }
);

// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }

db.users.findOne({ "hobbies.title": "Hiking" });

/*
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"name" : "Dean",
	"phone" : 3234242342,
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		},
		{
			"title" : "Hiking",
			"frequency" : 1
		}
	],
	"isSport" : true,
	"comment" : "You have better health because of having hobbies",
	"employeed" : true,
	"salary" : 20000
}
*/
//
// update the documents who has cooking as the hobbie
db.users.updateMany(
  { "hobbies.title": "Cooking" },
  { $set: { employeed: "Self employeed", salary: 30000 } }
);
// { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"name" : "Max",
	"age" : 32,
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 3
		},
		{
			"title" : "Cooking",
			"frequency" : 6
		}
	],
	"phone" : 23214223,
	"isSport" : true,
	"comment" : "You have better health because of having hobbies",
	"employeed" : "Self employeed",
	"salary" : 30000
}
*/
//find the document who doesnot have the sports as hobby
db.users.find({ "hobbies.title": { $ne: "Sports" } }).pretty();
/*
{

	"_id" : ObjectId("66bc16d23d6802bbff2744de"),
	"name" : "Sara",
	"age" : 45,
	"hobbies" : [
		{
			"title" : "hacking",
			"frequency" : 4
		}
	],
	"phone" : 43252322,
	"comment" : "You have better health because of having hobbies"
}
*/
db.users
  .find({ "hobbies.title": { $ne: "Sports" } })
  .pretty()
  .count();
// 4
// now update the documents which doesnot have the sports as hobbie even they are updated with the same field before
// update with new field
db.users.updateMany(
  { "hobbies.title": { $ne: "Sports" }, employeed: { $exists: true } },
  { $set: { comment: "You need to have sports as hobbie" } }
);
// { "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
//Nothing happend because
/*
Explanation
Array Matching with $ne:

The $ne operator works fine for fields that are not arrays or if you want to match against the whole array. 
However, when dealing with arrays, the query needs to handle the array elements properly.

Matching with $exists and $ne:

When you use $ne to check for the absence of an element in an array field, it does not work as expected 
because MongoDB's query language matches documents where the entire array does not match the condition,
not just individual elements.

*/

//CORRECT QUERY

db.users.updateMany(
  { "hobbies.title": { $ne: "Sports" } },
  { $set: { comment: "You need to have sports as hobbie" } }
);
// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }

db.users.find({ "hobbies.title": { $ne: "Sports" } }, { hobbies: 1 }).pretty();
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744de"),
	"hobbies" : [
		{
			"title" : "hacking",
			"frequency" : 4
		}
	]
}
{
	"_id" : ObjectId("66bc1a633d6802bbff2744e0"),
	"hobbies" : [
		"sports",
		"cooking",
		"hiking"
	]
}
*/
//update the document which doesnot have the employe field and salary field update them

db.users.find({ employeed: { $exists: false } }).count();
// 5
db.users.updateMany(
  { employeed: { $exists: false } },
  { $set: { employeed: "You need to be employeed", salary: "Not applicable" } }
);
// { "acknowledged" : true, "matchedCount" : 5, "modifiedCount" : 5 }

// **************UPDATING SPECIFIC DOCUMENT MANUALLY
//update the documents which doesnot have the phone number fields add them to phone fields
const existingDoc = db.users.findOne({ phone: { $exists: false } });
// existingDoc

/*
{
	"_id" : ObjectId("66bc1a633d6802bbff2744e0"),
	"name" : "Chris",
	"hobbies" : [
		"sports",
		"cooking",
		"hiking"
	],
	"comment" : "You need to have sports as hobbie",
	"employeed" : "You need to be employeed",
	"salary" : "Not applicable"
}

if(!existingDoc){ 
	... db.users.updateMany(
	... {phone:{$exists:false}},
	... {$set:{phone:23423534523}}
	... );
	... }
//  nothing was happened because that condition is wrong since existing document is already present 
*/
db.users.findOne({ _id: ObjectId("66bc1a633d6802bbff2744e0") });
// {
// 	"_id" : ObjectId("66bc1a633d6802bbff2744e0"),
// 	"name" : "Chris",
// 	"hobbies" : [
// 		"sports",
// 		"cooking",
// 		"hiking"
// 	],
// 	"comment" : "You need to have sports as hobbie",
// 	"employeed" : "You need to be employeed",
// 	"salary" : "Not applicable"
// }

if (existingDoc) {
  db.users.updateMany(
    { phone: { $exists: false } },
    { $set: { phone: 23423534523 } }
  );
}
// { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
db.users.find({}, { phone: 1 });
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "phone" : 23214223 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "phone" : 43252322 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "phone" : 431235322 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "phone" : 23423534523 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "phone" : 23423534523 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "phone" : 324234234 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "phone" : 234322234 }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "phone" : 3234242342 }
*/
db.users.find({}).count();
// 8
db.users.find({}, { phone: 1 }).count();
// 8
//TILL NOW WE HAVE LEARNT IN UPDATE OPERATORS OF
// UPDATING SINGLE FIELD
// UPDATING MULTIPLE FIELDS
// UPDATING THE DOCUMENTS WHICH DOESNOT HAVE SOME SPECIFIC FIELDS

//UPDATING THE DOCUMENTS WITHOUT OVERWRITTEN FOR THAT WE NEED TO USE $exists operator
// if you want overwrite the field value use specific document update method

// UPDATING THE DOCUMENTS BASED ON SPECIFIED CONDITION LIKE IF FIELD HAS SOME VALUE FOR THEM ONLY ADD SOME SPECIFIC FIELDS
//  AND WHICH DOES NOT HAVE SOME QUALITIES FOR THEM ADD SOME OTHER FIELDS
// UPDATING THE SINGLE DOCUMENT BY STORING THE VALUE OF UNFIELDS DOCUMENT
// UPDATING BY USING IF CONDITION

//*************** INCREMENT AND DECREMENT OPERATORS */

//increase the age by 3
// db.users.updateOne({ name: "Max" }, { $inc: [(age: 2)] });
// 2024-08-15T15:46:12.731+0530 E QUERY    [thread1] SyntaxError: missing ] after element list @(shell):1:42
db.users.updateOne({ name: "Max" }, { $inc: { age: 2 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

// *****************
// Now decrease the age by 3 for who as isSport equal to true
db.users.updateOne({ isSport: true }, { $dec: { age: 3 } });
// 2024-08-15T15:48:56.870+0530 E QUERY    [thread1] WriteError: Unknown modifier: $dec. Expected a valid update modifier or pipeline-style update specified as an array :
//
// The error you're encountering is because the $dec operator doesn't exist in MongoDB.
// MongoDB does not have a built-in $dec operator to decrement a value. However, you can achieve
// this by using the $inc operator with a negative value.

db.users.updateMany({ isSport: true }, { $inc: { age: -3 } });
// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }

//****** changing double fields in the  document

//set isSport:false whose age is greater than 40 and increase their age by 1

db.users.updateMany(
  { age: { $gt: 40 } },
  { $inc: { age: 1 } },
  { $set: { isSport: false } }
);
// { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }

db.users.find({ age: { $gt: 40 } }, { name: 1, isSport: 1, age: 1 });

// { "_id" : ObjectId("66bc16d23d6802bbff2744de"), "name" : "Sara", "age" : 46 }
// { "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "name" : "Jack", "age" : 90 }

//************************************************************ *
db.users
  .find([
    { _id: ObjectId("66bc16d23d6802bbff2744de") },
    { _id: ObjectId("66bc2cdd3d6802bbff2744e2") }
  ])
  .pretty();

/*
Error: error: {
	"ok" : 0,
	"errmsg" : "Expected field filterto be of type object",
	"code" : 14,
	"codeName" : "TypeMismatch"
}
*/
db.users
  .find({
    _id: {
      $in: [
        ObjectId("66bc16d23d6802bbff2744de"),
        ObjectId("66bc2cdd3d6802bbff2744e2")
      ]
    }
  })
  .pretty();

/*{
	"_id" : ObjectId("66bc16d23d6802bbff2744de"),
	"name" : "Sara",
	"age" : 46,
	"hobbies" : [
		{
			"title" : "hacking",
			"frequency" : 4
		}
	],
	"phone" : 43252322,
	"comment" : "You need to have sports as hobbie",
	"employeed" : "You need to be employeed",
	"salary" : "Not applicable"
}
{
	"_id" : ObjectId("66bc2cdd3d6802bbff2744e2"),
	"name" : "Jack",
	"age" : 90,
	"hobbies" : [
		{
			"title" : "Walking",
			"frequency" : 2
		},
		{
			"title" : "shopping",
			"frequency" : 3
		}
	],
	"phone" : 324234234,
	"comment" : "You need to have sports as hobbie",
	"employeed" : "You need to be employeed",
	"salary" : "Not applicable"
}
*/
db.users.find({}, { age: 1 }).pretty();
// /*
// { "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 31 }
// { "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
// { "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 32 }
// { "_id" : ObjectId("66bc1a633d6802bbff2744e0") }
// { "_id" : ObjectId("66bc1a633d6802bbff2744e1") }
// { "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
// { "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : -3 }
// { "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : -3 }
// */
//ADD THE AGE FIELD WHOSE DOCUMENT DOESNOT HAVE

db.users.find({ age: { $exists: false } }, { age: 1 }).pretty();
/*
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0") }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1") }
*/
db.users.updateMany({ age: { $exists: false } }, { $set: { age: 35 } });
// { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
db.users.find({}, { age: 1 }).pretty();
// /*
// { "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 31 }
// { "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
// { "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 32 }
// { "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "age" : 35 }
// { "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "age" : 35 }
// { "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
// { "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : -3 }
// { "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : -3 }
// */
// ********************************************
//I have two documents with age of 35 now I want to increase one of the document age by 2 and want to decrease the age of
// the other document by 3 then how can write the single query to do the operation
//In MongoDB, you cannot update two documents with different update operations in a single query directly. However,
//  you can perform two separate update operations within the same script or use a transaction if you're using MongoDB with
//  transaction support (e.g., in a replica set or sharded cluster).

db.users.findAndModify(
  { _id: ObjectId("66bc1a633d6802bbff2744e0") },
  { $set: { age: 48 } }
);
/*
2024-08-15T16:14:31.040+0530 E QUERY    [thread1] Error: findAndModifyFailed failed: {
	"ok" : 0,
	"errmsg" : "no such command: '_id'",
	"code" : 59,
	"codeName" : "CommandNotFound"
} :
*/
// _getErrorWithCode@src/mongo/shell/utils.js:25:13
// DBCollection.prototype.findAndModify@src/mongo/shell/collection.js:724:1
// @(shell):1:1
//  db.users.findAndModify({}

/*
 db.users.findAndModify({
 query:{"_id":ObjectId("66bc1a633d6802bbff2744e0")},
 update:{$set:{age:48}},
 {new : true} >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.. here it is wrong
 })
 */
// 2024-08-15T16:17:16.313+0530 E QUERY    [thread1] SyntaxError: invalid property id @(shell):4:0

db.users.findAndModify({
  query: { _id: ObjectId("66bc1a633d6802bbff2744e0") },
  update: { $set: { age: 48 } },
  new: true // Optional: if you want to return the modified document
});

/*
{
	"_id" : ObjectId("66bc1a633d6802bbff2744e0"),
	"name" : "Chris",
	"hobbies" : [
		"sports",
		"cooking",
		"hiking"
	],
	"comment" : "You need to have sports as hobbie",
	"employeed" : "You need to be employeed",
	"salary" : "Not applicable",
	"phone" : 23423534523,
	"age" : 48
}
*/
db.users.find({}, { age: 1 }).pretty();
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 31 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 32 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "age" : 48 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "age" : 35 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : -3 }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : -3 }
*/
db.users.updateOne({ age: { $lte: 0 } }, { $set: { age: 58 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

db.users.updateOne({ age: { $lte: 0 } }, { $set: { age: 23 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

db.users.find({}, { age: 1 }).pretty();
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 31 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 32 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "age" : 48 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "age" : 35 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : 58 }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : 23 }
*/
//write a condition to increase the age of a person whose age is greater than 25 and less than 35 by 3
//2024-08-15T16:29:04.856+0530 E QUERY    [thread1] SyntaxError: missing ; before statement @(shell):1:6

//write a condition to increase the age of a person whose age is greater than 25 and less than 35 by 3
db.users.updateMany(
  { $and: [{ age: { $gt: 25 } }, { age: { $lt: 35 } }] },
  { $inc: { age: 3 } }
);
// { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
db.users.find({}, { age: 1 }).pretty();
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 34 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 35 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "age" : 48 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "age" : 35 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : 58 }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : 23 }
*/
db.users.updateMany({ age: { $gt: 25, $lt: 35 } }, { $inc: { age: 3 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
// the above query simpler that previous one
/*
db.users.updateMany({},{
... [
...   {
...     $set:{
...        fieldToUpdate: {
...            $cond: {
...                if:{age:{$lte:28}},
...                then:{appriciate:"You are too young"},
...                else:"$age"
...                  }
..                }
...          }
...   }
... ]})
2024-08-15T17:01:30.662+0530 E QUERY    [thread1] SyntaxError: missing : after property id @(shell):14:1
> db.users.updateMany({},[   {     $set:{        fieldToUpdate: {            $cond: {                if:{age:{$lte:28}},                then:{appriciate:"You are too young"},                else:"$age"                  }                }          }   } ])
2024-08-15T17:01:41.799+0530 E QUERY    [thread1] Error: the update operation document must contain atomic operators :
DBCollection.prototype.updateMany@src/mongo/shell/crud_api.js:625:1
@(shell):1:1
> db.users.updateMany(
...   {},
...   [
...     {
...       $set: {
...         comment: {
...           $cond: {
...             if: { $lte: ["$age", 28] },
...             then: "You are too young",
...             else: "Age is fine"
...           }
...         }
...       }
...     }
...   ]
... )
2024-08-15T17:03:17.878+0530 E QUERY    [thread1] Error: the update operation document must contain atomic operators :
DBCollection.prototype.updateMany@src/mongo/shell/crud_api.js:625:1
@(shell):1:1
*/

db.users.find({}, { age: 1, name: 1 }).pretty();
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "name" : "Max", "age" : 37 }
{
	"_id" : ObjectId("66bc16d23d6802bbff2744de"),
	"name" : "Sara",
	"age" : 46
}
{
	"_id" : ObjectId("66bc16d23d6802bbff2744df"),
	"name" : "Jonas",
	"age" : 35
}
{
	"_id" : ObjectId("66bc1a633d6802bbff2744e0"),
	"name" : "Chris",
	"age" : 48
}
{
	"_id" : ObjectId("66bc1a633d6802bbff2744e1"),
	"name" : "Jonrdan",
	"age" : 35
}
{
	"_id" : ObjectId("66bc2cdd3d6802bbff2744e2"),
	"name" : "Jack",
	"age" : 90
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"name" : "Stalin",
	"age" : 58
}
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"name" : "Dean",
	"age" : 23
}
*/
db.users.updateOne({ name: "Dean" }, { $min: { age: 30 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }
db.users.updateOne({ name: "Dean" }, { $min: { age: 25 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }
// it doesnot change to new value because $min changes the value if it is lower than the defined value it changes to new value if the present value is greater than the defined value
db.users.updateOne({ name: "Dean" }, { $min: { age: 20 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Dean" }, { age: 1, name: 1 });
// /*
//  {
// 	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
// 	"name" : "Dean",
// 	"age" : 20
// }
// */

db.users.updateMany({}, { $max: { age: 40 } });
// { "acknowledged" : true, "matchedCount" : 8, "modifiedCount" : 4 }
//$max operator changes the age field value to new value if the present value is lower than defined value otherwise wont change to defined value
db.user.find({}, { age: 1 }).pretty();
db.users.find({}, { age: 1 }).pretty();

/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 40 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 40 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "age" : 48 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "age" : 40 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : 58 }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : 40 }
*/
//using multiplier
//$mul
//multiply whose age is less than 40 for the first document whose meet the criteria
db.users.updateOne({ age: 40 }, {});
// 2024-08-15T17:29:31.703+0530 E QUERY    [thread1] Error: the update operation document must contain at least one atomic operator :
// DBCollection.prototype.updateOne@src/mongo/shell/crud_api.js:537:1
// @(shell):1:1
db.users.updateOne({ age: { $eq: 40 } }, { $mul: { age: 1.32 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.updateOne({ age: 40 }, { $mul: { age: 1.5 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.updateOne({ age: 40 }, { $mul: { age: 1.7 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.find({}, { age: 1 }).pretty();
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 52.800000000000004 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 60 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "age" : 48 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "age" : 68 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : 58 }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : 40 }
*/
// **************************************************************************
// in mongo db document i have { "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 52.800000000000004  this value how can I remove that decimal part

db.users.updateMany({}, [{ $set: { age: { $trunc: "$age" } } }]);
// 2024-08-15T17:37:10.584+0530 E QUERY    [thread1] Error: the update operation document
// must contain atomic operators :
// db.users.updateMany(
// 	...   {},
// 	...   [
// 	...     {
// 	...       $set: {
// 	...         age: {
// 	...           $toInt: "$age"
// 	...         }
// 	...       }
// 	...     }
// 	...   ]
// 	... )

// it will work for later mongodb versions of mongoshell
//the CORRECT QUERY TO REMOVE THE DECIMAL PART IN THE DOCUMENT IS

db.users.find({}).forEach(function (doc) {
  db.users.updateOne({ _id: doc._id }, { $set: { age: Math.floor(doc.age) } });
});
db.users.find({}, { age: 1 }).pretty();

/*
 { "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 52 }
	{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
	{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 60 }
	{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "age" : 48 }
	{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "age" : 68 }
	{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
	{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : 58 }
	{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : 40 }
	
*/
//************************ GETTING RID OF FIELDS INTHE DOCUMENT

//lets say we want getrid of phone field who has isSport :true
db.users.find({}, { phone: 1, isSport: 1 });
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "phone" : 23214223, "isSport" : true }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "phone" : 43252322 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "phone" : 431235322, "isSport" : true }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "phone" : 23423534523 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "phone" : 23423534523 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "phone" : 324234234 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "phone" : 234322234, "isSport" : true }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "phone" : 3234242342, "isSport" : true }
*/
db.users.updateMany({ isSport: ture }, { $set: { phone: null } });
// 2024-08-15T17:53:16.612+0530 E QUERY    [thread1] ReferenceError: ture is not defined :
// @(shell):1:22
db.users.updateMany({ isSport: true }, { $set: { phone: null } });
// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }
db.users.find({}, { phone: 1, isSport: 1 });
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "phone" : null, "isSport" : true }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "phone" : 43252322 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "phone" : null, "isSport" : true }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "phone" : 23423534523 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "phone" : 23423534523 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "phone" : 324234234 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "phone" : null, "isSport" : true }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "phone" : null, "isSport" : true }
*/
// with the above query phone field is present but its value be treated as Null
//to get rid of entire field we can use $unset field
db.users.updateMany({ isSport: true }, { $unset: { phone: "" } });
// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }
db.users.find({}, { phone: 1, isSport: 1 });
/*
 { "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "isSport" : true }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "phone" : 43252322 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "isSport" : true }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "phone" : 23423534523 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "phone" : 23423534523 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "phone" : 324234234 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "isSport" : true }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "isSport" : true }
*/
//************** RENAMING THE FIELDNAME

//  db.users.updateMany({},{$rename:{age:"totalAge}})
//  2024-08-15T18:05:34.861+0530 E QUERY    [thread1] SyntaxError: unterminated string literal @(shell):1:37
db.users.updateMany({}, { $rename: { age: "totalAge" } });
//  { "acknowledged" : true, "matchedCount" : 8, "modifiedCount" : 8 }
db.users.find({}, { totalAge: 1 });
/*
 { "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "totalAge" : 52 }
 { "_id" : ObjectId("66bc16d23d6802bbff2744de"), "totalAge" : 46 }
 { "_id" : ObjectId("66bc16d23d6802bbff2744df"), "totalAge" : 60 }
 { "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "totalAge" : 48 }
 { "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "totalAge" : 68 }
 { "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "totalAge" : 90 }
 { "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "totalAge" : 58 }
 { "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "totalAge" : 40 }
 */
//UNDERSTANDING  $upsert() *******************************
//we will get the situation like when we updated the document with some filter criteria we dont get the update operation because of not getting the filtered document in that case updte operation we dont get the entire operation will get rolled back In that cases we need to insert the entire document manually, WE DONT want that
//like below
db.users.findOne();
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"name" : "Max",
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 3
		},
		{
			"title" : "Cooking",
			"frequency" : 6
		}
	],
	"isSport" : true,
	"comment" : "You have better health because of having hobbies",
	"employeed" : "Self employeed",
	"salary" : 30000,
	"totalAge" : 52
}

*/

db.users.updateOne(
  { name: "Maria" },
  {
    $set: {
      age: 23,
      hobbies: [
        { title: "ListeningTo music", frequency: "3" },
        { title: "Cooking", frequency: 2 }
      ],
      isSport: false
    }
  }
);
// { "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
//se in the above result matchedCount is 0 and modifiedCount is 0,it is because we havenot get the Maria document in the db, so no modification was done.WE DONT WANT LIKE THIS,
//TO OVERCOME THIS ISSUE WE WILL USE $UPSERT OPERATOR what it does is if we set this value as true, if mognodb wont find the document with specified field then it will insert the new document with specified fields in the query with another id, and we will get succeed the update operation

// db.users.updateOne({name:"Maria"},{$set:{age:23,hobbies:[{title:"ListeningTo music",frequency:"3"},{title:"Cooking", frequency:2}],isSport:false}}, $upsert:true)
// 2024-08-16T09:35:42.785+0530 E QUERY    [thread1] SyntaxError: missing ) after argument list @(shell):1:155
db.users.updateOne(
  { name: "Maria" },
  {
    $set: {
      age: 23,
      hobbies: [
        { title: "ListeningTo music", frequency: "3" },
        { title: "Cooking", frequency: 2 }
      ],
      isSport: false
    }
  },
  { $upsert: true }
);
// { "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
db.users.find({}, { name: 1 }).pretty();

/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "name" : "Max" }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "name" : "Sara" }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "name" : "Jonas" }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "name" : "Chris" }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "name" : "Jonrdan" }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "name" : "Jack" }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "name" : "Stalin" }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "name" : "Dean" }
*/
// document is not inserted

// The document is not being inserted because of the way the updateOne function works. The $upsert option
// should be placed within the same object as the $set operator and not as a separate argument.

db.users.updateOne(
  { name: "Maria" },
  {
    $set: {
      age: 23,
      hobbies: [
        { title: "Listening to music", frequency: "3" },
        { title: "Cooking", frequency: 2 }
      ],
      isSport: false
    }
  },
  { upsert: true }
);
/*
  {
	"acknowledged" : true,
	"matchedCount" : 0,
	"modifiedCount" : 0,
	"upsertedId" : ObjectId("66bed0a429bb79f34a966a1c") //****************************** 
}
> db.users.find({},{name:1}).pretty()
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "name" : "Max" }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "name" : "Sara" }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "name" : "Jonas" }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "name" : "Chris" }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "name" : "Jonrdan" }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "name" : "Jack" }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "name" : "Stalin" }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "name" : "Dean" }
{ "_id" : ObjectId("66bed0a429bb79f34a966a1c"), "name" : "Maria" } //************************* 
  */

//INSERT TWO DOCUMENTS WITH UPDATEMANY() USING $UPSERT
db.users.updateMany(
  { name: "Stella" },
  { $set: { age: 26, game: "Cricket" } },
  { $upsert: true }
);
// { "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }

db.users.updateMany(
  { name: "Stella" },
  { $set: { age: 26, game: "Cricket" } },
  { upsert: true }
);

/*
{
	"acknowledged" : true,
	"matchedCount" : 0,
	"modifiedCount" : 0,
	"upsertedId" : ObjectId("66bed57229bb79f34a966a3a")
}
*/
//The updateMany() function with the $upsert option in MongoDB cannot be used to insert multiple different
//  documents. The upsert option with updateMany() will either update all matching documents or insert a single new
//  document if no documents match the query.

//If you want to insert two different documents conditionally (i.e., using upsert logic), you'll need to perform two
//   separate updateOne() operations with upsert: true. Each operation would check for a different condition and insert the
//  respective document if the condition is not met.

//The updateMany() operation with the $upsert option is designed to either update multiple
//   documents if they match the query or insert a single new document if no matches are found.
// However, it cannot insert multiple new documents in a single operation using the $upsert option.

//create a new collection ("sports") and upsert two documents with "title", and "requiredTeam"
//update all the documents which do require a team  by adding a new
//  field with mininmum number of players required

db.createCollection("sports");
// { "ok" : 1 }
// show collections
aggregate;
collection;
cursorprct;
movies;
persons;
practicCursor;
practsAggr;
sports;
users;
db.sports.insertOne({ _id: 1, name: football }, { $upsert: true });
// 2024-08-16T10:16:49.479+0530 E QUERY    [thread1] ReferenceError: football is not defined :
// @(shell):1:29

db.sports.insertOne({ _id: 1, name: "football" }, { $upsert: true });
// { "acknowledged" : true, "insertedId" : 1 }
db.sports.updateMany(
  { name: "cricket" },
  { $set: { title: "gold" } },
  { $upsert: true }
);
// { "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
db.sports.updateMany(
  { name: "cricket" },
  { $set: { title: "gold" } },
  { upsert: true }
);
// {
// "acknowledged" : true,
// "matchedCount" : 0,
// "modifiedCount" : 0,
// "upsertedId" : ObjectId("66beda4f29bb79f34a966a5a")
// }
db.sports.find({}).pretty();
/*
{ "_id" : 1, "name" : "football" }
{
	"_id" : ObjectId("66beda4f29bb79f34a966a5a"),
	"name" : "cricket",
	"title" : "gold"
}
*/
db.sports.insertOne({ name: "Hockey" });

/*
{
	"acknowledged" : true,
	"insertedId" : ObjectId("66bedb19dc66ae777b25aa98")
}
*/
db.sports.updateMany({}, { $set: { isSport: true } });
// { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
db.sports.insert({ name: "Running", isAtlet: true });
// WriteResult({ "nInserted" : 1 })

db.sports.find({}).pretty();
/*
{ "_id" : 1, "name" : "football", "isSport" : true }
{
	"_id" : ObjectId("66beda4f29bb79f34a966a5a"),
	"name" : "cricket",
	"title" : "gold",
	"isSport" : true
}
{
	"_id" : ObjectId("66bedb19dc66ae777b25aa98"),
	"name" : "Hockey",
	"isSport" : true
}
{
	"_id" : ObjectId("66bedb82dc66ae777b25aa99"),
	"name" : "Running",
	"isAtlet" : true
}
*/

//add  a team which game require a team
db.sports.updateMany(
  { isSport: true },
  { $min: { "no of players": 15 } },
  { upsert: true }
);
// { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }

db.sports.find({}).pretty();
/*
{ "_id" : 1, "name" : "football", "isSport" : true, "no of players" : 15 }
{
	"_id" : ObjectId("66beda4f29bb79f34a966a5a"),
	"name" : "cricket",
	"title" : "gold",
	"isSport" : true,
	"no of players" : 15
}
{
	"_id" : ObjectId("66bedb19dc66ae777b25aa98"),
	"name" : "Hockey",
	"isSport" : true,
	"no of players" : 15
}
{
	"_id" : ObjectId("66bedb82dc66ae777b25aa99"),
	"name" : "Running",
	"isAtlet" : true
}
/
//update the all the documents with title and requiredTeam
 db.sports.updateMany({},{$set:{title:"Running",requiredTeam:false}},{upsert:true})
// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }
db.sports.find({}).pretty()
/*
{

	"_id" : 1,
	"name" : "football",
	"isSport" : true,
	"no of players" : 15,
	"requiredTeam" : false,
	"title" : "Running"
}
{
	"_id" : ObjectId("66beda4f29bb79f34a966a5a"),
	"name" : "cricket",
	"title" : "Running",
	"isSport" : true,
	"no of players" : 15,
	"requiredTeam" : false
}
{
	"_id" : ObjectId("66bedb19dc66ae777b25aa98"),
	"name" : "Hockey",
	"isSport" : true,
	"no of players" : 15,
	"requiredTeam" : false,
	"title" : "Running"
}
{
	"_id" : ObjectId("66bedb82dc66ae777b25aa99"),
	"name" : "Running",
	"isAtlet" : true,
	"requiredTeam" : false,
	"title" : "Running"
}
*/
//increase the no of players whose game require
db.sports.updateMany(
  { requierdTeam: true },
  { $inc: { "no of players": 10 } },
  { upsert: true }
);
/*
 {
	"acknowledged" : true,
	"matchedCount" : 0,
	"modifiedCount" : 0,
	"upsertedId" : ObjectId("66bee05b29bb79f34a966a85")
}
*/
db.sports.find({}).pretty();
/*
{
	"_id" : 1,
	"name" : "football",
	"isSport" : true,
	"no of players" : 15,
	"requiredTeam" : false,
	"title" : "Running"
}
{
	"_id" : ObjectId("66beda4f29bb79f34a966a5a"),
	"name" : "cricket",
	"title" : "Running",
	"isSport" : true,
	"no of players" : 15,
	"requiredTeam" : false
}
{
	"_id" : ObjectId("66bedb19dc66ae777b25aa98"),
	"name" : "Hockey",
	"isSport" : true,
	"no of players" : 15,
	"requiredTeam" : false,
	"title" : "Running"
}
{
	"_id" : ObjectId("66bedb82dc66ae777b25aa99"),
	"name" : "Running",
	"isAtlet" : true,
	"requiredTeam" : false,
	"title" : "Running"
}
{
	"_id" : ObjectId("66bee05b29bb79f34a966a85"),
	"requierdTeam" : true,
	"no of players" : 10
}
*/
//modify the field value whose game is not a athlet
db.sports.updateMany({ isSport: true }, { $set: { requiredTeam: true } });
// { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
db.sports.find({}).pretty();
/*
{
	"_id" : 1,
	"name" : "football",
	"isSport" : true,
	"no of players" : 15,
	"requiredTeam" : true,
	"title" : "Running"
}
{
	"_id" : ObjectId("66beda4f29bb79f34a966a5a"),
	"name" : "cricket",
	"title" : "Running",
	"isSport" : true,
	"no of players" : 15,
	"requiredTeam" : true
}
{
	"_id" : ObjectId("66bedb19dc66ae777b25aa98"),
	"name" : "Hockey",
	"isSport" : true,
	"no of players" : 15,
	"requiredTeam" : true,
	"title" : "Running"
}
{
	"_id" : ObjectId("66bedb82dc66ae777b25aa99"),
	"name" : "Running",
	"isAtlet" : true,
	"requiredTeam" : false,
	"title" : "Running"
}
{
	"_id" : ObjectId("66bee05b29bb79f34a966a85"),
	"requierdTeam" : true,
	"no of players" : 10
}
*/
db.sports.updateMany(
  { requierdTeam: true },
  { $inc: { "no of players": 10 } },
  { upsert: true }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.sports.updateMany(
  { requiredTeam: true },
  { $inc: { "no of players": 10 } },
  { upsert: true }
);
// { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
db.sports.find({}).pretty();
/*
{
	"_id" : 1,
	"name" : "football",
	"isSport" : true,
	"no of players" : 25,
	"requiredTeam" : true,
	"title" : "Running"
}
{
	"_id" : ObjectId("66beda4f29bb79f34a966a5a"),
	"name" : "cricket",
	"title" : "Running",
	"isSport" : true,
	"no of players" : 25,
	"requiredTeam" : true
}
{
	"_id" : ObjectId("66bedb19dc66ae777b25aa98"),
	"name" : "Hockey",
	"isSport" : true,
	"no of players" : 25,
	"requiredTeam" : true,
	"title" : "Running"
}
{
	"_id" : ObjectId("66bedb82dc66ae777b25aa99"),
	"name" : "Running",
	"isAtlet" : true,
	"requiredTeam" : false,
	"title" : "Running"
}
{
	"_id" : ObjectId("66bee05b29bb79f34a966a85"),
	"requierdTeam" : true,
	"no of players" : 20
}
*/
//
// ************************************************************************************************
//   ********************  UPDATING MATCHED ARRAY ELEMENTS ***********************************************
// lets update the all documents where the persons has sports as has a frequency geater than 3
db.users
  .find({ hobbies: { title: "Sports", frequency: { $gt: 3 } } }, { hobbies: 1 })
  .pretty();
//we cannot get the data with this query we can use $and operator or $elemmatch
//we cannot find directly like this if array had documents we need to use $elemMatch
db.users
  .find(
    { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
    { hobbies: 1 }
  )
  .pretty();

/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 3
		},
		{
			"title" : "Cooking",
			"frequency" : 6
		}
	]
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	]
}
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		},
		{
			"title" : "Hiking",
			"frequency" : 1
		}
	]
}
*/
//we can also use basic method as we studies in basics part1
//with dot notation and with $and operator we can find
db.users
  .find(
    { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
    { hobbies: 1 }
  )
  .pretty()
  .count();
// 3

//DOING MODIFICATION BY ADDING highFrequency : true

db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
  { $set: { "hobbies.highFrequency": true } }
);
// 2024-08-16T11:37:43.815+0530 E QUERY    [thread1] SyntaxError: missing : after property id @(shell):1:93
//The error is due to a syntax mistake in the query. Specifically, the issue is with the way you're trying
// to set the field hobbies.highFrequency.
// In MongoDB, you cannot directly update a nested field within an array using the standard $set operator
//  without using the positional $ operator or array filters.

db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
  { $set: { "hobbies.$.highFrequency": true } }
);

// { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }

// the use of $ operator: $ is a positional operator. It allows you to update the first array element
//   that matches the query condition within an array field.
//How it works:
//  Positional Operator ($):
//  When you query for a specific condition inside an array, the positional operator $ refers
// to the first element in the array that matches the query criteria.
//  In the update operation, you can use $ to apply changes directly to this matching element.

db.users
  .find({ hobbis: { title: "Sports", frequency: { $gt: 3 } } }, { hobbies: 1 })
  .pretty();
//we cannot get the data like this query if you want specify the array embeded fields as a filter criteria
db.users
  .find(
    { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
    { hobbies: 1 }
  )
  .pretty();

/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 3,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 6
		}
	]
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	]
}
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		},
		{
			"title" : "Hiking",
			"frequency" : 1
		}
	]
}
*/
// UPDATING ALL ARRAY FIELDS
db.users.updateMany(
  { "hobbies.frequency": { $gt: 4 } },
  { $set: { "hobbies.$.goodFrequency": true } }
);

// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }
db.users.find({ "hobbies.frequency": { $gt: 4 } }, { hobbies: 1 }).pretty();
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 3,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 6,
			"goodFrequency" : true
		}
	]
}
{
	"_id" : ObjectId("66bc16d23d6802bbff2744df"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "teaching",
			"frequency" : 8,
			"goodFrequency" : true
		}
	]
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5,
			"highFrequency" : true,
			"goodFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	]
}
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5,
			"highFrequency" : true,
			"goodFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		},
		{
			"title" : "Hiking",
			"frequency" : 1
		}
	]
}
*/
//with the above query the new field is added in the objects of hobbies array wherever the frequency value is greater than specified value
db.users.updateMany(
  { "hobbies.frequency": { $gt: 4 } },
  { $set: { "hobbies.$.goodFrequency": true } }
);

// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 0 }
db.users.find({ "hobbies.frequency": { $gt: 4 } }, { hobbies: 1 }).pretty();
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 3,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 6,
			"goodFrequency" : true
		}
	]
}
{
	"_id" : ObjectId("66bc16d23d6802bbff2744df"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "teaching",
			"frequency" : 8,
			"goodFrequency" : true
		}
	]
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5,
			"highFrequency" : true,
			"goodFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	]
}
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5,
			"highFrequency" : true,
			"goodFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		},
		{
			"title" : "Hiking",
			"frequency" : 1
		}
	]
}
*/
//with the above query the new field is added in the objects of hobbies array wherever
// the frequency value is greater than specified value and it UPDATE THE SPECIFIED FIELD
// ONLY IN THE OBJECTS WHICH MEETS THE SPECIFIED CRITERIA IF THE SECOND OBJECT MEETS THE
// CONDITION THEN IT WILL NOT UPDATE THE SECOND OBJECT IN THAT PARTICULAR DOCUMENT
// IT UPDATE THE DOCUMENT OF A EACH ID FOR ONLY TIME ************************
db.users.updateMany(
  { "hobbies.frequency": { $gt: 4 } },
  { $set: { "hobbies.$.goodFrequency": true } }
);
// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 0 }

// ***************************  updating ALL ELEMENTS OF THE ARRAY  *****************
db.users.updateMany(
  { totalAge: { $gt: 30 } },
  { $inc: { "hobbies.$[].frequency": -1 } }
);
// 2024-08-16T13:13:15.292+0530 E QUERY    [thread1] WriteError: Cannot create field 'frequency' in element {0: "sports"} :

// The error indicates that MongoDB is trying to apply the update to an element in the
// hobbies array where the frequency field does not exist. Specifically, it appears that one
//  or more elements in the hobbies array are not objects or do not have a frequency field.

// To handle this, you can:

// Ensure that all elements in the hobbies array are objects with the frequency field.
// Use an array filter to conditionally update elements that meet certain criteria.

// to update like this the fields in the array you need to have a same schema in array

//***************** *
// db.users.updateMany({totalAge:{$gt:50}},{$inc:{hobbies.$[].frequency: -1}})
// 2024-08-16T13:41:58.180+0530 E QUERY    [thread1] SyntaxError: missing : after property id @(shell):1:54
db.users.updateMany(
  { totalAge: { $gt: 50 } },
  { $inc: { "hobbies.$[].frequency": -1 } }
);
// { "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }

//*************************** FINDING & UPDATING SPECIFIC FIELDS IN THE ARRAY ************* */
//  to update a specific field  in the document

//update firstmatching element
db.collection.updateMany(`{"filter"}`, {
  $set: { "fieldName.$[identifier].embeddedfieldName": "requiredValue" }
});

// example: You have a document with a hobbies array, and you want to update the frequency of a hobby titled "Reading":
db.users.updateOne(
  { name: "John", "hobbies.title": "Reading" },
  { $set: { "hobbies.$.frequency": 5 } }
);

//Update all matching elements
// example: Update the frequency field for all hobbies titled "Reading":
db.collection.updateMany(
  { name: "John" },
  { $set: { "hobbis.$[elem].frequency": 5 } },
  { arrayFilters: [{ "elem.title": "Reading" }] }
);

//UPDATE ALL ELEMENTS IN THE ARRAY
// example: Decrease the frequency for all elements in the hobbies array:
db.users.updateMany(
  { name: "John" },
  { $inc: { "hobbies.$[].frequency": -1 } }
);

//UPDATE A SPECIFIC ELEMENT BY INDEX
//Example: Update the frequency of the second hobby (index 1) in the hobbies array:
db.users.updateOne({ name: "John" }, { $set: { "hobbies.1.frequency": 5 } });

//SUMMARY *************************************************
/***************************************************************************** *
1. Use the "$" positional operator to update the FIRST MATCHINH element in the array 
2. Use 'arrayFilters' to update a SPECIFC ELEMENTS based on conditions 
3. Use the `.$[]` operator to update all elements in as an array 
4. Use the SPECIFIC INDEX if you know which element you want to update by ITS POSITION in the 
// ************************************************************************************************* *
*/
db.users.deleteMany([
  ObjectId("66bc16d23d6802bbff2744de"),
  ObjectId("66bed57229bb79f34a966a3a")
]);
// 2024-08-16T16:30:55.758+0530 E QUERY    [thread1] WriteCommandError: BSON field 'delete.deletes.q' is the wrong type 'array', expected type 'object' :
db.users.findOne();
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"name" : "Max",
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 0,
			"highFrequency" : true,
			"goodFrequency" : "yes"
		},
		{
			"title" : "Cooking",
			"frequency" : 3,
			"goodFrequency" : true
		}
	],
	"isSport" : true,
	"comment" : "You have better health because of having hobbies",
	"employeed" : "Self employeed",
	"salary" : 30000,
	"totalAge" : 52
}
*/ //******************************************************************************** */
//increase the sports frequency of person who has less than 1 as frequency
db.users.find({ hobbies: { title: "Sports", frequency: { $lt: 1 } } }).count();
// 0
//The above query wont work as expected because its trying to match the entire
// "hobbies" array with a specific object rather than CHECKING each individual
// object within the array
//To To query documents where the hobbies array contains an object with
// title: "Sports" and frequency < 1 you shold USE $elemMatch OPERATOR // **************
db.users
  .find({ hobbies: { $elemMatch: { title: "Sports", frequency: { $lt: 1 } } } })
  .count();
// 2
//now INCREASE THE FREQUENCY OF SPORTS TO 2
// db.users.updateMany({hobbies:{$elemMatch:{title:"Sports",frequency:{$lt:1}}}},{$inc:{"hobbies.$":{title:"Sports", frequency:2}}}})
// 2024-08-17T08:14:37.057+0530 E QUERY    [thread1] SyntaxError: missing ) after argument list @(shell):1:128
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $lt: 1 } } } },
  { $inc: { "hobbies.$": { title: "Sports", frequency: 2 } } }
);
// 2024-08-17T08:15:10.530+0530 E QUERY    [thread1] WriteError: Cannot increment with non-numeric argument: {hobbies.$: { title: "Sports", frequency: 2.0 }} :
//The error you're encountering is because the $inc operator is meant to increment numerical values, not objects. To update a specific field within an array (in this case, the frequency field of the hobbies array), you need to use the $set operator combined with the positional $ operator.
//The correct query is
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $lt: 1 } } } },
  { $inc: { "hobbies.$.frequency": 2 } }
);
// { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
db.users.find({ hobbies: { title: "Sports", frequency: { $lt: 3 } } }).count();
// 0// this is incorrect query whcih will match the
db.users
  .find(
    { "hobbies.title": "Sports", "hobbies.frequency": { $lt: 3 } },
    { name: 1, hobbies: 1 }
  )
  .pretty();
/*
 {
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"name" : "Max",
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2,
			"highFrequency" : true,
			"goodFrequency" : "yes"
		},
		{
			"title" : "Cooking",
			"frequency" : 3,
			"goodFrequency" : true
		}
	]
}
{
	"_id" : ObjectId("66bc16d23d6802bbff2744df"),
	"name" : "Jonas",
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 1,
			"goodFrequency" : true
		},
		{
			"title" : "teaching",
			"frequency" : 5,
			"goodFrequency" : true
		}
	]
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"name" : "Stalin",
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 4,
			"highFrequency" : true,
			"goodFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 1
		}
	]
}
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"name" : "Dean",
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 5,
			"highFrequency" : true,
			"goodFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3,
			"goodFrequency" : true
		},
		{
			"title" : "Hiking",
			"frequency" : 1
		}
	]
}
*/
//now DECREASE THE SPORTS FREQUENCY WHOSE FREQUENCY IS GREATER THAN 2;
db.users
  .find({ "hobbies.title": "Sports", "hobbies.frequency": { $gte: 3 } })
  .count();
4;
db.users
  .find({
    hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } }
  })
  .count();
2;
/*i want to find the document whose sports frequency is greater than 3 so I wrote two queries like  db.users.find({"hobbies.title":"Sports", "hobbies.frequency":{$gte:3}}).count()
4
> db.users.find({hobbies:{$elemMatch:{title:"Sports", frequency:{$gte:3}}}}).count()
2
if both are pointing to same object in the array of of hobbies field then why it is given two different answers
ChatGPT said:
ChatGPT
The two queries you wrote differ in how they interpret the array data, which is why they are returning different results. Let me explain the difference:

Query 1:
javascript
Copy code
db.users.find({"hobbies.title":"Sports", "hobbies.frequency":{$gte:3}}).count()
Query 2:
javascript
Copy code
db.users.find({hobbies:{$elemMatch:{title:"Sports", frequency:{$gte:3}}}}).count()
Difference in Behavior:
Query 1 ({"hobbies.title": "Sports", "hobbies.frequency": { $gte: 3 }}):

This query checks independently whether any element in the hobbies array has a title of "Sports" and 
separately checks if any element has a frequency of >= 3.
Because these conditions are evaluated independently, it's possible that one element in the hobbies 
array satisfies title: "Sports" and another element satisfies frequency: { $gte: 3 }, but they are not 
the same element.
Thus, this query might return documents where these conditions are true for different elements within the 
array.

Query 2 ({hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } }}}):

This query uses the $elemMatch operator, which ensures that both conditions must be true for the same array 
element. It will only match documents where there is an element in the hobbies array that has both
 title: "Sports" and frequency >= 3.
This query is more precise and only returns documents where a single element in the hobbies array satisfies
 both conditions.
Why the Different Counts?
The first query might be over-counting because it's not ensuring that the conditions are met by the same 
array element.
The second query provides a more accurate count, where both conditions are true for the same element in 
the hobbies array.
*/
//******************************************************************************** */
// Conclusion:
// To accurately find documents where a specific element in the
// array meets both conditions (title: "Sports" and frequency >= 3),
// the second query with $elemMatch is the correct and more reliable approach.
// The first query can lead to misleading results because it does not ensure that
// both conditions apply to the same array element.
//***************** */
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gt: 3 } } } },
  { $inc: { "hobbies.$": { frequency: -2 } } }
);
// 2024-08-17T08:48:05.056+0530 E QUERY    [thread1] WriteError: Cannot increment with non-numeric argument: {hobbies.$: { frequency: -2.0 }} :
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gt: 3 } } } },
  { $inc: { "hobbies.$.frequency": -2 } }
);
// { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
db.users
  .find({ hobbies: { $elemMatch: { title: "Sports", frequency: { $gt: 3 } } } })
  .count();
0;
//Now remove the field embedded in the array name "goodFrequency: true" and "goodFrequency:false"
//firstly find the doucments who has "goodFrequency:true"
db.users.find({ "hobbies.goodFrequency": true }).count();
6;
//delete that field
db.users.updateMany(
  { "hobbies.goodFrequency": true },
  { $unset: { "hobbies.goodFrequency": "" } }
);
// { "acknowledged" : true, "matchedCount" : 6, "modifiedCount" : 0 }
db.users.updateMany(
  { "hobbies.goodFrequency": true },
  { $unset: { goodFrequency: "" } }
);
// { "acknowledged" : true, "matchedCount" : 6, "modifiedCount" : 0 }

//*********************** *
// why modified count is zero if I want getRid of that field embeddedin the array of object

// The reason the modifiedCount is zero is because the query you used does not
// match any documents where the hobbies.goodFrequency field exists directly in
// an embedded document within the hobbies array. /
// The query is looking for      //************************************************** */
// documents where the hobbies array contains a field goodFrequency at the top
// level of the array, rather than inside individual objects within the array

//
//
// hobbies.goodFrequency isn't a direct field of the hobbies array but rather a property inside
// objects within the array, it doesn’t match the documents as expected.
//
//****************** */
// To correctly remove the goodFrequency field from each object inside the hobbies array,
// you can use the positional $[] operator or array filters.

//Using $[] to Apply to All Elements in the Array
// If you want to remove the goodFrequency field from all elements

// in the hobbies array:
//correct QUERY
db.users.updateMany(
  { "hobbies.goodFrequency": true },
  { $unset: { "hobbies.$.goodFrequency": "" } }
);
// { "acknowledged" : true, "matchedCount" : 6, "modifiedCount" : 6 }
db.users.updateMany(
  { "hobbies.goodFrequency": true },
  { $unset: { "hobbies.$[].goodFrequency": "" } }
);
// { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }

db.users.find({}, { hobbies: 1 }).pretty();
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2,
			"highFrequency" : true,
			"goodFrequency" : "yes"
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		}
	]
}
{
	"_id" : ObjectId("66bc16d23d6802bbff2744df"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 1
		},
		{
			"title" : "teaching",
			"frequency" : 5
		}
	]
}
{
	"_id" : ObjectId("66bc2cdd3d6802bbff2744e2"),
	"hobbies" : [
		{
			"title" : "Walking",
			"frequency" : 1
		},
		{
			"title" : "shopping",
			"frequency" : 2,
			"goodFrequency" : "yes"
		}
	]
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 1
		}
	]
}
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 3,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		},
		{
			"title" : "Hiking",
			"frequency" : 1
		}
	]
}
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	]
}
*/
//********************************************************************* */

db.users.updateMany(
  { "hobbies.goodFrequency": true },
  { $unset: { "hobbies.$.goodFrequency": "" } }
);
// { "acknowledged" : true, "matchedCount" : 6, "modifiedCount" : 6 }

db.users.updateMany(
  { "hobbies.goodFrequency": true },
  { $unset: { "hobbies.$[].goodFrequency": "" } }
);
//{ "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
// what is the difference between the above two queries
// The two queries you provided have different behaviors due to the usage of the positional $ operator and
// the array wildcard $[] operator. ///**********$$$$$$$$$$$$$$$$$$$$******************* */
// Here's the difference between them:

// First Query ($): Only removes goodFrequency from the first matching element in the hobbies array.
// Second Query ($[]): Removes goodFrequency from all elements in the hobbies array where goodFrequency exists.

//remove good frequency field
//find the docs which has good Frequncy field
db.users
  .find({ "hobbies.goodFrequency": { $exists: true } }, { name: 1, hobbies: 1 })
  .pretty();
db.users
  .find(
    { hobbies: { $elemMatch: { goodFrequency: { $exists: true } } } },
    { name: 1, hobbies: 1 }
  )
  .pretty();

/*
{
	  "_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	  "name" : "Max",
	  "hobbies" : [
		  {
			  "title" : "Sports",
			  "frequency" : 2,
			  "highFrequency" : true,
			  "goodFrequency" : "yes"
		  },
		  {
			  "title" : "Cooking",
			  "frequency" : 3
		  }
	  ]
  }
  {
	  "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"),
	  "name" : "Jack",
	  "hobbies" : [
		  {
			  "title" : "Walking",
			  "frequency" : 1
		  },
		  {
			  "title" : "shopping",
			  "frequency" : 2,
			  "goodFrequency" : "yes"
		  }
	  ]
  }
  {
	  "_id" : ObjectId("66bc2cdd3d6802bbff2744e3"),
	  "name" : "Jacks",
	  "hobbies" : [
		  {
			  "title" : "Walking",
			  "frequency" : 1
		  },
		  {
			  "title" : "shopping",
			  "frequency" : 2,
		  }
		  goodFrequency:"yes"
	  ]
  }

  When to Use Which:
// First Query: Use it when you just need to check for the existence of a field in 
// any element of the array.
// Second Query: Use it when you need to match a specific condition within a 
// single array element and when dealing with more complex queries where multiple
// conditions within an array element need to be met.

Conclusion:
Both queries will yield the same results with the provided documents.
Choose the first query ("hobbies.goodFrequency": { $exists: true }) for 
simplicity when you only need to check if the field exists anywhere in the array.
/********** 
Choose the second query ($elemMatch) if you need more control or if you're 
working with more complex conditions within the array.
*/
//removing the field in the array using $unset operator
db.users.updateMany(
  { hobbies: { $elemMatch: { goodFrequency: { $exists: true } } } },
  { $unset: { "hobbies.$[].goodFrequency": "" } }
);
// { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
db.users.updateMany(
  { hobbies: { $elemMatch: { goodFrequency: { $exists: true } } } },
  { $unset: { "hobbies.$.goodFrequency": "" } }
);
// { "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
db.users.find({}, { name: 1, hobbies: 1 }).pretty();
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"name" : "Max",
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		}
	]
}
and more
*/
//update the document which has sports as hobbie for 2 or 1 time a day for them add a field hasGoodFrequncy:true
//find the document whose spors:true and frequency:{$lt:2}
db.users.find(
  {
    hobbies: {
      $elemMatch: { title: "Sports", frequency: { $and: ["$gte:1", "$lte:2"] } }
    }
  },
  { hobbies: 1 }
);
// Error: error: {
// "ok" : 0,
// "errmsg" : "unknown operator: $and",
// "code" : 2,
// "codeName" : "BadValue"
// }
db.users.find(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $lte: 2 } } } },
  { hobbies: 1 }
);
db.users.find(
  { hobbies: { title: "Sports", frequency: { $lte: 2 } } },
  { hobbies: 1 }
);
db.users
  .find(
    { hobbies: { $elemMatch: { title: "Sports", frequency: { $lte: 2 } } } },
    { hobbies: 1 }
  )
  .pretty();

/*{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		}
	]
}
{
	"_id" : ObjectId("66bc16d23d6802bbff2744df"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 1
		},
		{
			"title" : "teaching",
			"frequency" : 5
		}
	]
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 1
		}
	]
}
*/
//find only the docs which has frequency 1 and 2
db.users
  .find({
    hobbies: { $elemMatch: { title: "Sports", frequency: { $and: [1, 2] } } }
  })
  .count();
// 2024-08-17T11:40:48.674+0530 E QUERY    [thread1] Error: count failed: {
// 	"ok" : 0,
// 	"errmsg" : "unknown operator: $and",
db.users
  .find({
    hobbies: { $elemMatch: { title: "Sports", frequency: { $in: [1, 2] } } }
  })
  .count();
3;

//now add field hasGood frequency where sports has hobby of 2 times less
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $in: [1, 2] } } } },
  { "hobbies.$.hasGoodFrequency": true }
);
// 2024-08-17T11:56:23.457+0530 E QUERY    [thread1] Error: the update operation document must contain atomic operators :
// DBCollection.prototype.updateMany@src/mongo/shell/crud_api.js:625:1
// @(shell):1:1
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $in: [1, 2] } } } },
  { $set: { "hobbies.$.hasGoodFrequency": true } }
);
// { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
db.users
  .find({
    hobbies: { $elemMatch: { title: "Sports", frequency: { $in: [1, 2] } } }
  })
  .count();
3;
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $in: [1, 2] } } } },
  { $set: { "hobbies.$[].hasGoodHealth": true } }
);
// { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
db.users.find({}, { hobbies: 1 }).pretty();
/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2,
			"highFrequency" : true,
			"hasGoodFrequency" : true,
			"hasGoodHealth" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3,
			"hasGoodHealth" : true
		}
	]
}
{
	"_id" : ObjectId("66bc16d23d6802bbff2744df"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 1,
			"hasGoodFrequency" : true,
			"hasGoodHealth" : true
		},
		{
			"title" : "teaching",
			"frequency" : 5,
			"hasGoodHealth" : true
		}
	]
}
{
	"_id" : ObjectId("66bc2cdd3d6802bbff2744e2"),
	"hobbies" : [
		{
			"title" : "Walking",
			"frequency" : 1
		},
		{
			"title" : "shopping",
			"frequency" : 2
		}
	]
}
{
	"_id" : ObjectId("66bc2e5a3d6802bbff2744e4"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2,
			"highFrequency" : true,
			"hasGoodFrequency" : true,
			"hasGoodHealth" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 1,
			"hasGoodHealth" : true
		}
	]
}
{
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 3,
			"highFrequency" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3
		},
		{
			"title" : "Hiking",
			"frequency" : 1
		}
	]
}
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	]
}
*/
// if you observe the above result
// the update operation hasGoodFrequency: true is done with .$ operator
// the update operation hasGoodHealth: true  is done with .$[] operator
//  WITH SPECIFIED FITER CONDITION
// NOW WHAT HAPPENED IS    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2
// .$ operator will work on the fields only where there is a specified field
// condition will be appilcable for entire objects in the array i.e in the above filter
// we have defined title:"Sports" and frequency:{$in:[1,2]}
// to work with .$ operator both are in the same object therefore it adds the new field whcih we written
//Only the first matching element of the hobbies array in the matched documents will have hasGoodFrequency
// set to true. Other elements in the hobbies array will remain unchanged.

//BUT .$[] will work on all the objects if the condition is SATISFIED ON ONE OBJECT OF THE ARRAY
//THEN .$[] OPEARATOR WILL WORK(update) ON ALL OBJECTS WITHIN THE ARRAY

// Every element of the hobbies array in the matched documents will have hasGoodHealth set to true
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $in: [1, 2] } } } },
  { $set: { "hobbies.$[].hasGoodHealth": true } }
);
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $in: [1, 2] } } } },
  { $set: { "hobbies.$.hasGoodFrequency": true } }
);
// what is the difference between them?
// Scope of Update:

// Query 1: Updates all elements in the hobbies array in the matched documents.
// Query 2: Updates only the first matching element in the hobbies array in the matched documents.

db.users.updateMany(
  {
    hobbies: {
      $elemMatch: {
        title: "Sports",
        frequency: { $in: [1, 2] }
      }
    }
  },
  {
    $set: { "hobbies.$[el].hasGoodHealth": true },
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

db.users.updateMany(
  {
    hobbies: {
      $elemMatch: {
        "title.Sports": { $exists: false },
        frequency: { $in: [1, 2] }
      }
    }
  },
  {
    $set: { "hobbies.$[el].hasGoodHealth": true },
    arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]
  }
);
//2024-08-17T12:39:40.146+0530 E QUERY    [thread1] WriteError: No array filter found for identifier 'el'
// in path 'hobbies.$[el].hasGoodHealth' :
// WriteError({
// 	"index" : 0,
// 	"code" : 2,
// 	"errmsg" : "No array filter found for identifier 'el' in path 'hobbies.$[el].hasGoodHealth'",
/*
The error you're encountering indicates that MongoDB couldn't find an array filter for the identifier el in 
your query. Let's break down what's happening and how to correct your query.

Understanding the Error

Array Filters:

arrayFilters is used with $[<identifier>] to specify which elements of 
the array should be updated based on certain conditions.
In your query, you used $[el] but provided a filter with arrayFilters that 
doesn't match the query criteria, which leads to the error.

Issue with the Query:

The query attempts to match documents where an element with title: "Sports" does not exist. However, 
MongoDB's $elemMatch condition needs to be properly formatted to check for the absence of the Sports title.

To update documents that do not have a Sports hobby, you should:

Find Documents without Sports in hobbies:

Use the $nor operator to find documents where no hobbies element has 
title: "Sports"
Update Documents:

Set the new field for all elements in the hobbies array where 
the frequency is in [1, 2].
*/
db.users.updateMany(
  {
    hobbies: {
      $not: {
        $elemMatch: { title: "Sports" }
      }
    }
  },
  {
    $set: { "hobbies.$[el].hasGoodHealth": true },
    arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]
  }
);
/*
Explanation

Query Condition:
{ hobbies: { $not: { $elemMatch: { title: "Sports" } } } }: 
This condition finds documents where no element in the hobbies array has title: "Sports".

Update Operation:
{ $set: { "hobbies.$[el].hasGoodHealth": true } }: Sets hasGoodHealth to 
true for elements that match the criteria in arrayFilters.

Array Filters:
arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]: Specifies that 
the update should be applied to elements in the hobbies array where frequency is in [1, 2].

Summary

Use $not with $elemMatch to find documents where the hobbies array does 
not contain an element with title: "Sports".
Apply the $set update with the appropriate arrayFilters to modify specific 
elements within the hobbies array.
*/
///*************************************************** */
// i wrote the query like that i want to update documets which does not has
// frequency as its hobby and frequency of one of the other hobbies are either 1 or 2
db.users.find({
  hobbies: {
    $not: { $elemMatch: { title: "Sports" } },
    frequency: { $in: [1, 2] }
  }
});

// is tht correct or not? what is correct query?
Objective;

// Find documents that do not have a hobby with the title "Sports".
// Update these documents where at least one other hobby's frequency is either 1 or 2.

// db.users.find({
// 	hobbies:{
// 		$not:{
// 				$elemMatch:{title:"Sports"}
// 			},
// 			{$elemMatch:{   //**************************** here it is wrong  */
// 				frequency:{$in:[1,2]}
// 						}
// 			}
// 		}
// 	},
// 	{hobbies:1}
// )

db.users.find(
  {
    hobbies: {
      $not: {
        $elemMatch: { title: "Sports" }
      },
      $elemMatch: {
        frequency: { $in: [1, 2] }
      }
    }
  },
  { hobbies: 1 }
);
/*
{
	"_id" : ObjectId("66bc2cdd3d6802bbff2744e2"),
	"hobbies" : [
		{
			"title" : "Walking",
			"frequency" : 1
		},
		{
			"title" : "shopping",
			"frequency" : 2
		}
	]
}
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	]
}
*/
/*db.users.find({hobbies:{$not:{$elemMatch:{title:"Sports"}}, $elemMatch:{frequency:{$in:[1,2]}}}}).count()
2
> db.users.updateMany(   {     hobbies: {       $not: { $elemMatch: { title: "Sports" } },       $elemMatch: { frequency: { $in: [1, 2] } }     }   },   {     $set: { "hobbies.$[el].hasGoodHealth": true },     arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]   } );db.users.updateMany(
...   {
...     hobbies: {
...       $not: { $elemMatch: { title: "Sports" } },
...       $elemMatch: { frequency: { $in: [1, 2] } }
...     }
...   },
...   {
...     $set: { "hobbies.$[el].hasGoodHealth": true },
...     arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]
...   }
... );
2024-08-17T13:33:40.320+0530 E QUERY    [thread1] WriteError: No array filter found for identifier 'el' in path 'hobbies.$[el].hasGoodHealth' :
WriteError({
	"index" : 0,
	"code" : 2,
	"errmsg" : "No array filter found for identifier 'el' in path 'hobbies.$[el].hasGoodHealth'",
 even I have the documents with specified filter, why its  getting error like no array filter found for 
 identifier then correct query is to updated the documents for the questions  Find documents that do not have a hobby with the title "Sports".
Update these documents where at least one other hobby's frequency is either 1 or 2. if I hava a documents like this below    {
	"_id" : ObjectId("66bc2cdd3d6802bbff2744e2"),
	"hobbies" : [
		{
			"title" : "Walking",
			"frequency" : 1
		},
		{
			"title" : "shopping",
			"frequency" : 2
		}
	]
}
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	]
}
ChatGPT said:
ChatGPT
It looks like the main issue with your queries is how the $elemMatch operator is used in conjunction with
 array filters. Array filters can only be applied if the elements in the array match the conditions 
 provided in the arrayFilters.

Problem Breakdown
Finding Documents:

Your find query is correctly identifying documents that do not have a hobby with the title "Sports" and 
have at least one other hobby with a frequency of 1 or 2. The count of 2 suggests that two documents meet this criteria.

Updating Documents:

The error No array filter found for identifier 'el' in path 'hobbies.$[el].hasGoodHealth' indicates that 
the array filter el does not match any elements in the documents returned by the find query. 
This is likely because the filter does not apply to any elements in the documents' hobbies array.
Correct Query Approach
1. Find Documents That Match Your Criteria

Your find query is already correct. It identifies documents where no hobby has the title "Sports" and 
where at least one hobby has a frequency of 1 or 2:

javascript
Copy code
db.users.find({
  hobbies: {
    $not: { $elemMatch: { title: "Sports" } },
    $elemMatch: { frequency: { $in: [1, 2] } }
  }
});
2. Update Documents

To update the documents where at least one hobby’s frequency is 1 or 2, you need to ensure that the array filter is applied correctly. Since $elemMatch is used to match the whole document, you should use a more precise query and update operation.

Here is the correct approach:

Find Documents

javascript
Copy code
db.users.find({
  hobbies: {
    $not: { $elemMatch: { title: "Sports" } },
    $elemMatch: { frequency: { $in: [1, 2] } }
  }
});
Update Operation

To update these documents, you need to use the $[] (all array elements) operator to apply changes to every element in the array. However, this will update all elements of the hobbies array in the matched documents, which is not what you want. Instead, you should use a more targeted approach.

Here’s how you can update the matched documents correctly:

javascript
Copy code
db.users.updateMany(
  {
    hobbies: {
      $not: { $elemMatch: { title: "Sports" } },
      $elemMatch: { frequency: { $in: [1, 2] } }
    }
  },
  {
    $set: { "hobbies.$[el].hasGoodHealth": true },
    arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]
  }
);
Explanation:

hobbies.$[el].hasGoodHealth: Sets the hasGoodHealth field for array elements that match the filter specified in arrayFilters.
arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]: Filters array elements where frequency is 1 or 2.
Common Pitfall:

Make sure that there are elements in the hobbies array with frequency 1 or 2 that are also being updated. 
The $[el] filter only applies to array elements that match the filter specified in arrayFilters.
Troubleshooting
Verify Document Structure:

Ensure that the documents returned by the find query have the correct structure and that the hobbies array contains elements that match the arrayFilters.
Test Find Query Separately:

Run the find query to make sure it correctly identifies the documents you want to update.
Check Array Filters:

Ensure that the arrayFilters used in the update operation correctly match elements in the array.
By ensuring these conditions are met, the update operation should work as expected.

You said:
no, for the above queries iam getting same error  2024-08-17T13:37:50.578+0530 E QUERY    [thread1] WriteError: No array filter found for identifier 'el' in path 'hobbies.$[el].hasGoodHealth' :
WriteError({
	"index" : 0,
	"code" : 2,
	"errmsg" : "No array filter found for identifier 'el' in path 'hobbies.$[el].hasGoodHealth'",
 what is the reason 
ChatGPT said:
ChatGPT
The error No array filter found for identifier 'el' in path 'hobbies.$[el].hasGoodHealth' means that the array filter el specified in arrayFilters did not match any elements in the hobbies array of the documents being updated.

Let's break down the problem and fix the update operation.

Understanding the Issue
Error Explanation: The WriteError indicates that the array filter el does not match any elements in the array for the documents found by your query. This could happen if:

The array filter condition ("el.frequency": { $in: [1, 2] }) does not match any element in the hobbies array of the documents that the query finds.
The arrayFilters syntax is correct, but no element in the hobbies array of the matched documents meets the criteria specified in the filter.
Array Filters Usage: arrayFilters are used to specify which elements in the array should be updated. The arrayFilters condition must match elements in the array for the update operation to succeed.

Steps to Fix the Issue
Verify the Find Query: Make sure that the find query correctly identifies the documents you want to update and that these documents have the structure you expect.

javascript
Copy code
db.users.find({
  hobbies: {
    $not: { $elemMatch: { title: "Sports" } },
    $elemMatch: { frequency: { $in: [1, 2] } }
  }
}).pretty();
Update Query with Correct Array Filter: Ensure that the array filter used in the update query matches the elements of the array in the documents. Here’s the corrected update query:

javascript
Copy code
db.users.updateMany(
  {
    hobbies: {
      $not: { $elemMatch: { title: "Sports" } },
      $elemMatch: { frequency: { $in: [1, 2] } }
    }
  },
  {
    $set: { "hobbies.$[el].hasGoodHealth": true },
    arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]
  }
);
Check for Array Content: Ensure that the documents identified by the query actually contain elements in the
 hobbies array with the frequency values of 1 or 2.

Test with Sample Data: To further troubleshoot, you can test with simpler or more specific queries to see 
if the arrayFilters work correctly:
db.users.updateMany(
  { hobbies: { $not: { $elemMatch: { title: "Sports" } } } },
  { $set: { "hobbies.$[el].hasGoodHealth": true }, arrayFilters: [{ "el.frequency": { $in: [1, 2] } }] }
);
Make sure to test this with documents that match the criteria specified in your arrayFilters.

Review Documents: Ensure that the documents in your database have the structure you expect, 
particularly the hobbies array and its elements. The filter condition must match the exact structure of
 the documents.

Debugging the Issue
Check Documents Manually: Manually review the documents to ensure they meet the criteria. For example:

javascript
Copy code
db.users.find({ hobbies: { $elemMatch: { frequency: { $in: [1, 2] } } } }).pretty();
Verify Array Filters: Make sure that the arrayFilters are correctly applied to elements of the array.

By ensuring that the documents, array filters, and update query are all aligned correctly, you should be able to resolve the error and update the documents as intended.
*/
db.users.updateMany(
  {
    hobbies: {
      $not: {
        $elemMatch: { title: "Sports" }
      },
      $elemMatch: { frequency: { $lte: 2 } }
    }
  },
  {
    $set: { "hobbies.$[el].hasGoodHealth": "May be" },

    arrayFilters: [{ "el.frequency": { $in: [1, 2] } }]
  }
);
//this is also getting same error as above

//adding fields using $PUSH operator ********************************************

db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
//for Maria document add a field like {title:"Sports", frequency:2} in her hobbies array

db.users.updateOne(
  { name: "Maria" },
  { $push: { hobbies: { title: "Sports", frequency: 2 } } }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
//$push opearator can also be used for add multiple fields in the array
db.users.updateOne(
  { name: "Maria" },
  {
    $push: {
      hobbies: {
        $each: [
          { title: "goodwine", frequency: 1 },
          { title: "hiking", frequency: 2 }
        ]
      }
    }
  }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "goodwine",
			"frequency" : 1
		},
		{
			"title" : "hiking",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
db.users.updateOne(
  { name: "Maria" },
  {
    $push: {
      hobbies: {
        $each: [
          { title: "eating", frequency: 3 },
          { title: "running", frequency: 2 }
        ]
      }
    }
  },
  { $sort: { frequncy: -1 } }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "goodwine",
			"frequency" : 1
		},
		{
			"title" : "hiking",
			"frequency" : 2
		},
		{
			"title" : "eating",
			"frequency" : 3
		},
		{
			"title" : "running",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
db.users.updateOne(
  { name: "Maria" },
  {
    $push: {
      hobbies: {
        $each: [
          { title: "eating", frequency: 3 },
          { title: "running", frequency: 2 }
        ]
      }
    }
  },
  { $sort: { frequncy: 1 } }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "goodwine",
			"frequency" : 1
		},
		{
			"title" : "hiking",
			"frequency" : 2
		},
		{
			"title" : "eating",
			"frequency" : 3
		},
		{
			"title" : "running",
			"frequency" : 2
		},
		{
			"title" : "eating",
			"frequency" : 3
		},
		{
			"title" : "running",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
//$push operator addds the element at the last position of the arry

//**************************** */

// removing elements in the array using $pull operator
//which removes the last elements of the array

db.users.updateOne(
  { name: "Maria" },
  { $pull: { hobbies: { title: "eating", frequency: 2 } } }
);

// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }
//No Exact Match: The hobbies array might not contain an element with both title: "eating" and frequency: 2.
//  For the $pull operation to remove an element, both conditions must match exactly in the same element.
db.users.updateOne(
  { name: "Maria" },
  { $pull: { hobbies: { title: "eating", frequency: 3 } } }
);

// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

//
//> //removing multiple elements from the array
db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "goodwine",
			"frequency" : 1
		},
		{
			"title" : "hiking",
			"frequency" : 2
		},
		{
			"title" : "running",
			"frequency" : 2
		},
		{
			"title" : "running",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
//$pull operator removed all elements having name with title:"eating" even this element is present for multiple times
//removeing multiple elements with $pull operator
db.users.updateOne(
  { name: "Maria" },
  {
    $pull: {
      hobbies: {
        $each: [
          { title: "running", frequency: 2 },
          { title: "goodwine", frequency: 1 }
        ]
      }
    }
  }
);
/*
	// 2024-08-17T16:45:23.014+0530 E QUERY    [thread1] WriteError: unknown top level operator: $each. 
	If you have a field name that starts with a '$' symbol, consider using $getField or $setField. :
	WriteError({
		"index" : 0,
		"code" : 2,
		"errmsg" : "unknown top level operator: $each. If you have a field name that starts with 
		a '$' symbol, consider using $getField or $setField."
*/
//The error you're encountering is due to the incorrect use of the $each operator.
// The $each operator is typically used in conjunction with the $addToSet or $push operators to
// add multiple items to an array, but it cannot be used with $pull.

//but we can remove the multiple elements using $pull operator in conjuction  with $or operator

db.users.updateOne(
  { name: "Maria" },
  {
    $pull: {
      hobbies: {
        $or: [
          { title: "running", frequency: 2 },
          { title: "goodwine", frequency: 1 }
        ]
      }
    }
  }
);
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "hiking",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
// with $pull we can remove desired elements by specific the desired elements in the query

//can we remove the elements from MULTIPLE DOCUMENTS using $pull operator

// Yes, you can remove elements from arrays in multiple documents using
// the $pull operator in MongoDB. The $pull operator can be applied in combination with updateMany to target multiple documents that match a given query.
// example
db.users.updateMany(
  {},
  {
    $pull: {
      hobbies: {
        $or: [
          { title: "running", frequency: 2 },
          { title: "goodwine", frequency: 1 }
        ]
      }
    }
  }
);
//using $and operator with $pull opertor
//remove Cooking and hiking elements from the hobbies array of the maria document
db.users.updateOne(
  { name: "Maria" },
  {
    $pull: {
      hobbies: {
        $and: [
          { title: "Cooking", frequency: 2 },
          { title: "hiking", frequency: 2 }
        ]
      }
    }
  }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }
// The $and operator cannot be used directly within the $pull operator in MongoDB.
// This is why your query did not modify any documents, even though the query itself was acknowledged.

// Why Can't You Use $and with $pull?
// The $pull operator is designed to remove elements from an array that match a
// specific condition. However, the condition inside $pull should describe a
// single element of the array. The $and operator, when used in the way you tried,
// is not applicable within the $pull operator because MongoDB expects a straightforward
// match condition rather than a compound condition using $and.

// TO REMOVE THE MULTIPLE ELEMENTS FROM THE ARRAY WE CAN USE $OR OPERATOR INCONJUCTION WITH $PULL OPERATOR
//some times we want remove the last elements of the array
//for that we can remove the $pop operator
db.users.updateOne({ name: "Maria" }, { $pop: { hobbies: 1 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Listening to music",
			"frequency" : "3"
		},
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
//removing first element from the array using $pop operator  ***************************
db.users.updateOne({ name: "Maria" }, { $pop: { hobbies: -1 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
// *********************************************************

//*******************  #ADDTOSET OPERATOR  */
/*
The $addToSet operator in mongoDB is used to add a value to an array only if it does not 
DOES NOT ALREADY EXIST IN THE  array. This operator ENSURES that array remains a set,
meaning that it contains only UNIQUE values.

//KEY POINTS
.Uniqueness: Unlike $push, which appends an element to an array regardless of its current contents, 
$addToSet only ADDS THE ELEMENT IF IT IS NOT ALREADY PRESENT.

USE CASES:"$addToSet" is useful when you want to avoid duplicateds in an array.
for examplle, it can be used to TRACK a list of tags, userIDs, or other unirque identifiers.

OPERATION;If the value you are trying to add already exists in the array, MongoDb will ignore
the operation and leave the array unchanged.
The $addToSet operator is a powerful tool in MongoDB for maintaining uniqueness within an array. 
It is especially useful in situations where you want to ensure that a list of values, such as tags or 
hobbies, does not contain duplicates.
*/
db.users.updateOne(
  { name: "Maria" },
  { $addToSet: { hobbies: { title: "Hiking", frequency: 2 } } }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "Hiking",
			"frequency" : 2
		}
	],
	"isSport" : false
}
*/
//adding already exist element
db.users.updateOne(
  { name: "Maria" },
  { $addToSet: { hobbies: { title: "Cooking", frequency: 2 } } }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 } //********************* *

db.users.updateOne(
  { name: "Maria" },
  { $addToSet: { hobbies: { title: "Cooking", frequency: 1 } } }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Maria" });
/*
{
	"_id" : ObjectId("66bed0a429bb79f34a966a1c"),
	"name" : "Maria",
	"age" : 23,
	"hobbies" : [
		{
			"title" : "Cooking",
			"frequency" : 2
		},
		{
			"title" : "Sports",
			"frequency" : 2
		},
		{
			"title" : "Hiking",
			"frequency" : 2
		},
		{
			"title" : "Cooking",
			"frequency" : 1
		}
	],
	"isSport" : false
}
*/
//some useful work using $addToSet operator
db.users.insertOne({ name: "Steven", hobbies: ["Cooking", "Hiking"] }) >
  // {
  // 	"acknowledged" : true,
  // 	"insertedId" : ObjectId("66c09b35b2cc291f1488dd83")
  // }
  // > // add a new hobby (e.g., "Swimming") to Maria's hobbies array, ensuring no duplicates:
  // > // here no duplicates should be present in the document given in question
  // > //we can add elements using $set, $push, $addToset, in the question he asked that no duplictes should be present
  // > // so we have to use $addToSet operator to add specified element
  db.users.updateOne(
    { name: "Steven" },
    { $addToSet: { hobbies: "Swimming" } }
  );
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Steven" });
/*
{
	"_id" : ObjectId("66c09b35b2cc291f1488dd83"),
	"name" : "Steven",
	"hobbies" : [
		"Cooking",
		"Hiking",
		"Swimming"
	]
}
*/
db.users.updateOne({ name: "Steven" }, { $addToSet: { hobbies: "Cooking" } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }
// no modification was done because "Cooking" is already present
// $addToSet with Documents
db.users.updateOne(
  { name: "Steven" },
  { $addToSet: { hobbies: { title: "Running", frequency: 2 } } }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
//$each with $addToSet
db.users.updateOne(
  { name: "Steven" },
  { $addToSet: { hobbies: { $each: ["Swimming", "Dancing"] } } }
);
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.users.findOne({ name: "Steven" });

/*
{
	"_id" : ObjectId("66c09b35b2cc291f1488dd83"),
	"name" : "Steven",
	"hobbies" : [
		"Cooking",
		"Hiking",
		"Swimming",
		{
			"title" : "Running",
			"frequency" : 2
		},
		"Dancing"
	]
}
*/
//only Dancing was added, and Swimming is not added because its
// already present
// can we delete some fields in  the documents with deleteMany()
// and deleteOne() methods

//*************************** INDEXES  *************************/
db.ratings.explain("executionStats").find({ age: { $gt: 60 } });
/*

"winningPlan" : {
  "queryPlan" : {
    "stage" : "COLLSCAN",
    "planNodeId" : 1,
    "filter" : {
      "age" : {
        "$gt" : 60
      }
    },
    "direction" : "forward"
  },
  "executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 385991,
		"executionTimeMillis" : 558,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 1000002,
*/

db.ratings.getIndexes()[
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
      age: 1
    },
    name: "age_1"
  })
];
db.ratings.explain("executionStats").find({ age: { $gt: 60 } });
/*
"winningPlan" : {
  "queryPlan" : {
    "stage" : "FETCH",
    "planNodeId" : 2,
    "inputStage" : {
      "stage" : "IXSCAN",
      "planNodeId" : 1,
      "keyPattern" : {
        "age" : 1
      },
      "indexName" : "age_1",
      "isMultiKey" : false,
      "multiKeyPaths" : {
        "age" : [ ]
      },
      "isUnique" : false,

"executionStats" : {
  "executionSuccess" : true,
  "nReturned" : 385991,
  "executionTimeMillis" : 757,
  "totalKeysExamined" : 385991,
  "totalDocsExamined" : 385991,
*/
db.persons.getIndexes();
// [ { "v" : 2, "key" : { "_id" : 1 }, "name" : "_id_" } ]
db.persons.explain("executionStats").find({ "dob.age": { $lt: 45 } });
/*
 {
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"dob.age" : {
				"$lt" : 45
			}
      "queryPlan" : {
				"stage" : "COLLSCAN",
				"planNodeId" : 1,
				"filter" : {
					"dob.age" : {
						"$lt" : 45
					}
				},

		},
  }
    "executionStats" : {
      "executionSuccess" : true,
      "nReturned" : 2257,
      "executionTimeMillis" : 6,
      "totalKeysExamined" : 0,
      "totalDocsExamined" : 5004,
  
    */

db.persons
  .find({ "dob.age": { $lt: 45 } })
  .pretty()
  .count();
// 2257
db.persons.createIndex({ "dob.age": 1 });
/*
{
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"createdCollectionAutomatically" : false,
	"ok" : 1
}
*/
db.persons.explain("executionStats").find({ "dob.age": { $lt: 45 } });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"dob.age" : {
				"$lt" : 45
			}
		},
		"queryHash" : "A23C440A",
		"planCacheKey" : "58B7B707",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "FETCH",
				"planNodeId" : 2,
				"inputStage" : {
					"stage" : "IXSCAN",
					"planNodeId" : 1,
					"keyPattern" : {
						"dob.age" : 1
					},
					"indexName" : "dob.age_1",
					"isMultiKey" : false,
					"multiKeyPaths" : {
						"dob.age" : [ ]
            "rejectedPlans" : [ ]


            "executionStats" : {
              "executionSuccess" : true,
              "nReturned" : 2257,
              "executionTimeMillis" : 9,
              "totalKeysExamined" : 2257,
              "totalDocsExamined" : 2257,
            

              */
// in the abov two queries if you see , the time taken to retrieve the data without
// index is less than the with index, Useally data retrieval time would be less for
// the docs which have indexes than without indexes.
//This is because
//if you have a query tha will return a large portion or the majority of your documents,
// an index  is actually slower.
//in retrieving majority or all of the documents an index will not help you
// It makes slowet than the excution.
//THE IDEA OF THE INDEX IS TO QUICKELY GET THE NARROW SUBSET OF YOUR DOCUMENT LIST
// AND NOT THE MAJORITY OF THE DOCUMENTS

//now retrieving the minimum of docs
//WITH INDEX

db.persons
  .find({ "dob.age": { $gt: 65 } })
  .pretty()
  .count();
// 758
db.persons.explain("executionStats").find({ "dob.age": { $gt: 65 } });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
    "winningPlan" : {
			"queryPlan" : {
				"stage" : "FETCH",
				"planNodeId" : 2,
				"inputStage" : {
					"stage" : "IXSCAN",
					"planNodeId" : 1,
					"keyPattern" : {
						"dob.age" : 1
					},
				              	"indexName" : "dob.age_1",
					"isMultiKey" : false,
   "executionStats" : {
            "executionSuccess" : true,
            "nReturned" : 758,
                              "executionTimeMillis" : 3,
            "totalKeysExamined" : 758,
            "totalDocsExamined" : 758,
            "executionStats" : {
              "executionSuccess" : true,
              "nReturned" : 758,
              "executionTimeMillis" : 3,
              "totalKeysExamined" : 758,
              "totalDocsExamined" : 758,

}
*/
//now drop index
db.persons.dropIndexes();
//  {
//    "nIndexesWas" : 2,
//    "msg" : "non-_id indexes dropped for collection",
//    "ok" : 1
//  }

db.persons.explain("executionStats").find({ "dob.age": { $gt: 65 } });
/*
{
   "explainVersion" : "2",
   "queryPlanner" : {
     "namespace" : "practice.persons",
     "indexFilterSet" : false,
     "parsedQuery" : {
       "dob.age" : {
         "$gt" : 65
       }
     },
     "winningPlan" : {
			"queryPlan" : {
			              	"stage" : "COLLSCAN",
				"planNodeId" : 1,
				"filter" : {
					"dob.age" : {
						"$gt" : 65
					}
				},
				"direction" : "forward"
			},
"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 758,
	                  	"executionTimeMillis" : 14,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 5004,

 */
/*
{
	"_id" : ObjectId("66c34517ad083f11eb00a05f"),
	"gender" : "male",
	"name" : {
		"title" : "mr",
		"first" : "isolino",
		"last" : "viana"
	},
	"location" : {
		"street" : "7224 rua são jorge ",
		"city" : "cascavel",
		"state" : "são paulo",
		"postcode" : 40229,
		"coordinates" : {
			"latitude" : "78.8545",
			"longitude" : "101.5995"
		},
		"timezone" : {
			"offset" : "-10:00",
			"description" : "Hawaii"
		}
	},
	"email" : "isolino.viana@example.com",
	"login" : {
		"uuid" : "db3dca95-4597-4e7e-bdf2-f1c7b4491b6e",
		"username" : "blackfrog453",
		"password" : "poncho",
		"salt" : "ahSsAq5r",
		"md5" : "27f4c22bb816c5b30306932094224ece",
		"sha1" : "ab1735d464b80e04e26b808d72c95ca528d60962",
		"sha256" : "5e79c6f1371fc259c022c2aee096296432a36973986218aabdca8b5c3bce73b1"
	},
	"dob" : {
		"date" : "1959-03-22T14:53:41Z",
		"age" : 59
	},
	"registered" : {
		"date" : "2002-04-12T09:48:12Z",
		"age" : 16
	},
	"phone" : "(85) 7465-1411",
	"cell" : "(07) 4883-9964",
	"id" : {
		"name" : "",
		"value" : null
	},
	"picture" : {
		"large" : "https://randomuser.me/api/portraits/men/58.jpg",
		"medium" : "https://randomuser.me/api/portraits/med/men/58.jpg",
		"thumbnail" : "https://randomuser.me/api/portraits/thumb/men/58.jpg"
	},
	"nat" : "BR"
}
I have document like this, I want to create a index called TEXT INDEX on gender,  I created index like
{gender:1}, then in the disc how the mongodb will create the indexed collection for gender as the gender is
 male and female and index is text index
 
When you create an index in MongoDB, such as { gender: 1 }, it's a B-tree index rather than a text index.
 Let's break down what this means and how it behaves:

1. Creating a B-tree Index on gender:
When you create an index like { gender: 1 }, MongoDB organizes the values in a B-tree structure.
 This index allows for efficient querying of the gender field.
The 1 specifies that the index is in ascending order. If you used -1, it would be descending.
2. How MongoDB Stores Indexed Data:
For the gender field, MongoDB will store the field values (e.g., "male", "female") in a sorted manner in 
the B-tree.
The index will map these sorted values to their corresponding document locations on disk.

3. What Happens in the B-tree Index:
If you have documents with gender values like "male" and "female", the B-tree index will contain entries 
like this:
rust
Copy code
"female" -> ObjectId("66c34517ad083f11eb00a05e")
"male"   -> ObjectId("66c34517ad083f11eb00a05f")
This allows MongoDB to quickly locate all documents where gender is "male" or "female" by traversing the 
index rather than scanning the entire collection.

4. Text Indexes vs. B-tree Indexes:
A text index in MongoDB is different and is used for full-text search, allowing you to search within string 
content across multiple fields.
Creating a text index looks like this:

db.collection.createIndex({ gender: "text" });

Text indexes are typically used for search functionality, like finding documents that contain specific 
keywords.

5. Behavior on Disk:
B-tree Index (like {gender: 1}): The index is stored as a B-tree, where each node represents a range of 
values, making searches for specific values (like "male" or "female") very fast.
Text Index: If you created a text index on gender, MongoDB would tokenize the values and store them in
 a format optimized for text search. However, a text index on a simple field like gender is less common 
 since gender typically contains discrete values (like "male" or "female").

 6. Example Query Using the Index:
After creating the B-tree index on gender, you could run:
javascript
Copy code
db.collection.find({ gender: "male" });
MongoDB would use the index to quickly locate all documents where gender is "male".
Summary:
B-tree Index: Efficient for equality checks on discrete values (e.g., "male", "female").
Text Index: More suitable for full-text searches across large textual content.

If you intended to create a text index for searching within text content, you would use {gender: "text"}, 
but for most use cases involving discrete values like gender, a B-tree index {gender: 1} is appropriate.

*/

db.persons.createIndex({ gender: 1 });
// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
//1-->> Ascending order     -1 -->>>>>> Descending order
db.persons.explain("executionStats").find({ gender: "male" });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"gender" : {
				"$eq" : "male"
			}
		},

"winningPlan" : {
  "queryPlan" : {
    "stage" : "FETCH",
    "planNodeId" : 2,
    "inputStage" : {
      "stage" : "IXSCAN",
      "planNodeId" : 1,
      "keyPattern" : {
        "gender" : 1
      },
      "indexName" : "gender_1"
  "executionStats" : {
        "executionSuccess" : true,
        "nReturned" : 2435,
        "executionTimeMillis" : 8,
        "totalKeysExamined" : 2435,
        "totalDocsExamined" : 2435,
    

*/
//> //now I want all the persons who are older than 30 and who are male only

db.persons
  .explain("executionStats")
  .find({ "dob.age": { $gt: 40 }, gender: "male" });

/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"gender" : {
						"$eq" : "male"
					}
				},
				{
					"dob.age" : {
						"$gt" : 40
					}
				}
			]
		},
"winningPlan" : {
			"queryPlan" : {
        				"stage" : "COLLSCAN",
				"planNodeId" : 1,
        "executionStats" : {
"executionSuccess" : true,
          "nReturned" : 1523,
                  "executionTimeMillis" : 17,
          "totalKeysExamined" : 0,
          "totalDocsExamined" : 5004,
      
*/
//now create a compound Index
db.persons.createIndex({ "dob.age": 1, gender: 1 });
/*
{
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"createdCollectionAutomatically" : false,
	"ok" : 1
}
*/
//The above query will not create two indexes but it only create  one index
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

db.persons
  .explain("executionStats")
  .find({ "dob.age": { $gt: 40 }, gender: "male" });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"gender" : {
						"$eq" : "male"
					}
				},
				{
					"dob.age" : {
						"$gt" : 40
					}
				}
			]
		},
  },
  "winningPlan" : {
    "queryPlan" : {
      "stage" : "FETCH",
      "planNodeId" : 2,
      "inputStage" : {
        "stage" : "IXSCAN",
        "planNodeId" : 1,
        "keyPattern" : {
          "dob.age" : 1,
          "gender" : 1
        },
        "indexName" : "dob.age_1_gender_1",
      }

  "rejectedPlans" : [ ]
},
"executionStats" : {
  "executionSuccess" : true,
  "nReturned" : 1523,
              "executionTimeMillis" : 27,
  "totalKeysExamined" : 1557,
  "totalDocsExamined" : 1523,
*/
// with same index we can also used for finding age fields

db.persons.explain("executionStats").find({ "dob.age": { $gt: 60 } });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"dob.age" : {
				"$gt" : 60
			}
		},
		"queryHash" : "3545665C",
		"planCacheKey" : "74C5E96E",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "FETCH",
				"planNodeId" : 2,
				"inputStage" : {
					"stage" : "IXSCAN",
					"planNodeId" : 1,
					"keyPattern" : {
						"dob.age" : 1,
						"gender" : 1
					},
					"indexName" : "dob.age_1_gender_1",
					"isMultiKey" : false,
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1222,
	            	"executionTimeMillis" : 8,
		"totalKeysExamined" : 1222,
		"totalDocsExamined" : 1222,

*/

//using same index for finding gender based
db.persons.explain("executionStats").find({ gender: "male" });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"gender" : {
				"$eq" : "male"
			}
		},
		"queryHash" : "3A97C264",
		"planCacheKey" : "9F49CFBD",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
		                                  		"stage" : "COLLSCAN",
"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 2435,
	          	"executionTimeMillis" : 12,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 5004,


*/

// the above index  "indexName" : "dob.age_1_gender_1", is working for age field
// but not working for gneder because
// if we create a compound index it will work from left to write i.e
// it works as
// "indexName" : "dob.age_1_gender_1",
// "indexName" : "dob.age_1"

//BUT NOT WORK AS  //*********************************************************** *
// "indexName" :gender_1",
// USING INDEXES FOR SORTING
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

db.persons.find({ "dob.age": 35 }, { dob: 1, gender: 1 }).sort({ gender: 1 });
/*
{ "_id" : ObjectId("66c34517ad083f11eb00a063"), "gender" : "female", "dob" : { "date" : "1982-10-09T12:10:42Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a067"), "gender" : "female", "dob" : { "date" : "1983-05-20T21:26:44Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a155"), "gender" : "female", "dob" : { "date" : "1982-10-02T17:49:23Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a15d"), "gender" : "female", "dob" : { "date" : "1983-06-08T08:33:32Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a205"), "gender" : "female", "dob" : { "date" : "1983-08-13T04:29:08Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a285"), "gender" : "female", "dob" : { "date" : "1983-05-18T15:54:51Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a28f"), "gender" : "female", "dob" : { "date" : "1983-07-20T10:54:40Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a297"), "gender" : "female", "dob" : { "date" : "1983-01-30T10:18:40Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a2f8"), "gender" : "female", "dob" : { "date" : "1983-05-14T11:51:12Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a2fe"), "gender" : "female", "dob" : { "date" : "1983-05-13T03:48:04Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a36f"), "gender" : "female", "dob" : { "date" : "1982-12-19T04:28:33Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a490"), "gender" : "female", "dob" : { "date" : "1982-10-08T06:46:15Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a4e2"), "gender" : "female", "dob" : { "date" : "1982-11-05T08:25:19Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a662"), "gender" : "female", "dob" : { "date" : "1983-08-16T13:55:46Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a6db"), "gender" : "female", "dob" : { "date" : "1983-08-09T14:24:52Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a732"), "gender" : "female", "dob" : { "date" : "1982-10-30T15:08:00Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a7fc"), "gender" : "female", "dob" : { "date" : "1983-07-09T18:38:42Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a80b"), "gender" : "female", "dob" : { "date" : "1983-08-20T11:09:14Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a822"), "gender" : "female", "dob" : { "date" : "1983-01-06T18:54:40Z", "age" : 35 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a869"), "gender" : "female", "dob" : { "date" : "1983-07-14T02:19:12Z", "age" : 35 } }
Type "it" for more
*/
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

// Creating a Partial Index for gender: "male"
// To create an index on dob.age for documents where gender is "male", you
// can use the following query:

db.persons.createIndex(
  { "dob.age": 1 },
  {
    name: "dob.age_gender_male",
    partialFilterExpression: { gender: "male" }
  }
);
/*
Explanation:
{ "dob.age": 1 }: This specifies that the index should be created on the dob.age field in ascending order.
partialFilterExpression: { gender: "male" }: This tells MongoDB to create the index only for documents where gender is "male".
name: "dob.age_gender_male": This sets the name of the index to dob.age_gender_male.
How It Works:
This partial index will improve query performance for searches that involve both the dob.age field and the condition where gender is "male".
The index will not include documents where gender is something other than "male" or is missing.
*/

//****************************CONFIGURING INDEXES ******************************

db.persons.find({}, { _id: 1 });
/*
 { "_id" : ObjectId("652383bbbca13504bf0aa64b") }
 { "_id" : ObjectId("6523888abca13504bf0aa64c") }
 { "_id" : ObjectId("6523888abca13504bf0aa64d") }
 { "_id" : ObjectId("6523e296c4a544db0610bbc4") }
 { "_id" : ObjectId("66c34517ad083f11eb00a050") }
 { "_id" : ObjectId("66c34517ad083f11eb00a051") }
 { "_id" : ObjectId("66c34517ad083f11eb00a052") }
 { "_id" : ObjectId("66c34517ad083f11eb00a053") }
 { "_id" : ObjectId("66c34517ad083f11eb00a054") }
 { "_id" : ObjectId("66c34517ad083f11eb00a055") }
 { "_id" : ObjectId("66c34517ad083f11eb00a056") }
 { "_id" : ObjectId("66c34517ad083f11eb00a057") }
 { "_id" : ObjectId("66c34517ad083f11eb00a058") }
 { "_id" : ObjectId("66c34517ad083f11eb00a059") }
 { "_id" : ObjectId("66c34517ad083f11eb00a05a") }
 { "_id" : ObjectId("66c34517ad083f11eb00a05b") }
 { "_id" : ObjectId("66c34517ad083f11eb00a05c") }
 { "_id" : ObjectId("66c34517ad083f11eb00a05d") }
 { "_id" : ObjectId("66c34517ad083f11eb00a05e") }
 { "_id" : ObjectId("66c34517ad083f11eb00a05f") }
 Type "it" for more
 > // the above ids are unique they cannot be used for another documents
 > // They are unique and bydefault these are setting by mongodb
 > //like above uniqueness we can also create for different fields in the documents like _id
 */
// lets create unique on emails for the above persons documents
db.persons.createIndex({ email: 1 }, { unique: true });

// {
// 	"ok" : 0,
// 	"errmsg" : "Index build failed: 8ec660c0-8170-4266-a47e-b7a264e86682: Collection practice.persons
// ( d695c41e-45c7-4665-a681-c479f3c8ac4e ) :: caused by :: E11000 duplicate key error
//  collection: practice.persons index: email_1 dup key: { email: null }",
// 	"code" : 11000,
// 	"codeName" : "DuplicateKey",
// 	"keyPattern" : {
// 		"email" : 1
// 	},
// 	"keyValue" : {
// 		"email" : null
// 	}
// }
/*
what does mean

The error message you're seeing indicates that MongoDB failed to create a unique index on
the email field in the persons collection because there are duplicate values in that field. 
Specifically, the error mentions that there's a duplicate null value in the email field.

Breakdown of the Error:
Unique Index (unique: true):

The unique: true option means that every value in the email field must be unique across all 
documents in the collection.
Duplicate Key Error (E11000):

The error code 11000 is for a duplicate key error, meaning that MongoDB found duplicate values 
in the email field.
email: null:

The dup key: { email: null } part of the error message indicates that the duplicate value 
causing the problem is null.
This means that there are multiple documents in your collection where the email field is null.
Why This Happened:
Null Values: In MongoDB, when creating a unique index, null is treated as a value. If multiple 
documents have null in the email field, MongoDB considers them duplicates.

How to Resolve the Issue:
Remove or Update Documents with null Email Values:

You can remove or update documents where the email field is null to ensure that each 
document has a unique email.
javascript
Copy code
db.persons.updateMany({ email: null }, { $set: { email: "" } }) // Set email to an empty string or some other value
// Or, remove them
db.persons.deleteMany({ email: null })
Allow Multiple null Values:

If you want to allow multiple null values but still enforce uniqueness for other email 
values, you can create a partial index that ignores documents where the email is null.
javascript
Copy code
db.persons.createIndex(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true, $ne: null } } }
)
This index will enforce uniqueness only for documents where the email field exists 
and is not null, allowing you to have multiple null values in the collection without 
triggering a duplicate key error.

*/
// db.persons.findOne({ "_id": "8ec660c0-81704266a47eb7a264e86682" })
// null
// > db.persons.findOne({_id:'d695c41e-45c7-4665-a681-c479f3c8ac4e'})
// null
// the corrct way of finding is

db.persons.find({ email: null }, { email: 1 }).pretty();

// { "_id" : ObjectId("652383bbbca13504bf0aa64b") }
// { "_id" : ObjectId("6523888abca13504bf0aa64c") }
// { "_id" : ObjectId("6523888abca13504bf0aa64d") }
// { "_id" : ObjectId("6523e296c4a544db0610bbc4") }

//ALLOWING MULTPLE NULL VALUES
//these can be achieved by using partial filter expression
db.persons.createIndex(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true, $ne: null } }
  }
);
// {
// "ok" : 0,
// "errmsg" : "Error in specification { key: { email: 1.0 }, name: \"email_1\", unique: true, partialFilterExpression: { email: { $exists: true, $ne: null } }, v: 2 } :: caused by :: Expression not supported in partial index: $not\n    email $eq null\n",
// "code" : 67,
// "codeName" : "CannotCreateIndex"
// }
//The error you're encountering is due to a limitation in MongoDB where certain expressions,
//  like $ne: null, are not supported in partial indexes. To work around this issue, you can
// use a slightly different approach that avoids $ne: null by explicitly checking for the
// presence of the email field.
//You can create a partial index that only considers documents where the email field exists
//  and is a non-null string. Here's how you can do it:
db.persons.createIndex(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $type: "string" } } }
);
/*
{
	"ok" : 0,
	"errmsg" : "Index build failed: ae8ec37b-8e31-450c-b0cc-94f086a3e65a: Collection practice.persons ( d695c41e-45c7-4665-a681-c479f3c8ac4e ) :: caused by :: E11000 duplicate key error collection: practice.persons index: email_1 dup key: { email: \"abigail.clark@example.com\" }",
	"code" : 11000,
	"codeName" : "DuplicateKey",
	"keyPattern" : {
		"email" : 1
	},
	"keyValue" : {
		"email" : "abigail.clark@example.com"
	}
}
*/
db.persons.find({ email: "abigail.clark@example.com" }, { email: 1 });
// { "_id" : ObjectId("66c34517ad083f11eb00a7e8"), "email" : "abigail.clark@example.com" }
// { "_id" : ObjectId("66c34517ad083f11eb00ae2d"), "email" : "abigail.clark@example.com" }
db.persons.createIndex(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: "string" } }
  }
);
//  how it works explain
/*
 Components of the Command:
{ email: 1 }:

This specifies the field (email) on which you want to create the index.
The value 1 indicates that the index will be created in ascending order.
Indexing in MongoDB helps speed up queries that search for documents based on 
the email field.
unique: true:

This makes the index unique.
A unique index ensures that all values in the email field must be unique 
among the documents that are indexed.
If you attempt to insert or update a document in a way that would cause 
two documents to have the same email value, MongoDB will throw an error, 
preventing the operation.

partialFilterExpression:

This is an optional feature that allows you to create a partial index, 
meaning the index is applied only to documents that match a specific condition.
In your case, the condition is { email: { $type: "string" } }.
This means that the unique constraint is only applied to documents where 
the email field exists and is of type string.
Documents where the email field is null, missing, or of a different type 
(e.g., an array or number) are not included in the index and thus are not 
subject to the unique constraint.

How It Works:
Index Creation:

When you run this command, MongoDB will scan the persons collection and 
create an index on the email field for all documents where the email field 
is of type string.
The index will enforce uniqueness only for those documents.

Inserts and Updates:

When you insert a new document or update an existing document:
If the email field is a string and the value is unique among all other 
documents with a string email, the operation succeeds.
If the email field is a string but the value already exists in another 
document with a string email, the operation fails with a DuplicateKey error.
If the email field is null, missing, or not a string, MongoDB ignores this 
field for the purpose of this unique index, and the operation succeeds.
*/

//**********************************************************************************************/ */

// in a collection of thousands of documents how can i know the different documents
// of fields have the same value in different docs??????????????

// To identify documents with the same field values across different documents in
// a large collection, you can use MongoDB's aggregation framework to group documents
// by the field in question and count occurrences. Here's a step-by-step approach to
// finding duplicate values for a specific field, such as email, in a collection with
// thousands of documents:

//FINDING THE DUPLICATE VALUES
/*
we can use the aggregation frame work of group stage to group the docements 
by the fields of interst nd count occurences.
*/
db.collection.aggregate([
  {
    $group: {
      _id: "$email", //// Group by the `email` field
      count: { $sum: 1 } // // Count occurrences
    }
  },
  {
    $match: {
      count: { $gt: 1 } //// Filter to show only duplicates (more than 1 occurrence)
    }
  }
]);
// example
db.persons.aggregate([
  { $group: { _id: "$email", count: { $sum: 1 } } },
  { $match: { count: { $gt: 1 } } }
]);
// { "_id" : "sofia.martin@example.com", "count" : 2 }
// { "_id" : "jeremy.brown@example.com", "count" : 2 }
// { "_id" : "فاطمه زهرا.گلشن@example.com", "count" : 2 }
// { "_id" : "hannah.kowalski@example.com", "count" : 2 }
// { "_id" : "ستایش.نجاتی@example.com", "count" : 2 }
// { "_id" : "norah.fernandez@example.com", "count" : 2 }
// { "_id" : "philip.larsen@example.com", "count" : 2 }
// { "_id" : "علی رضا.محمدخان@example.com", "count" : 2 }
// { "_id" : "کیانا.رضایی@example.com", "count" : 2 }
// { "_id" : "آیلین.كامياران@example.com", "count" : 2 }
// { "_id" : "محمدطاها.نجاتی@example.com", "count" : 2 }
// { "_id" : "maya.scott@example.com", "count" : 2 }
// { "_id" : "محمدمهدی.موسوی@example.com", "count" : 2 }
// { "_id" : "oliver.singh@example.com", "count" : 2 }
// { "_id" : "آدرین.سهيليراد@example.com", "count" : 2 }
// { "_id" : "آرتين.مرادی@example.com", "count" : 2 }
// { "_id" : "mathilde.nielsen@example.com", "count" : 2 }
// { "_id" : "پارمیس.سالاری@example.com", "count" : 2 }
// { "_id" : "jayden.brown@example.com", "count" : 2 }
// { "_id" : "امیر.موسوی@example.com", "count" : 2 }
// Type "it" for more

/*
4. Handling Large Collections
For very large collections, you might need to paginate or batch your 
aggregation queries to handle memory and performance limitations. Using 
the $limit stage in the aggregation pipeline can help manage the output size.

Summary

Use $group and $match stages in aggregation to identify duplicate values.
Use the results to find all documents with those duplicate values.
For general use, replace the field name in the query with the field 
you're interested in.
This approach helps you find and analyze duplicate values efficiently in 
a large MongoDB collection.
*/
db.persons
  .aggregate([
    { $group: { _id: "$email", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
  ])
  .count();
// 2024-08-20T11:52:57.883+0530 E QUERY    [thread1]
// TypeError: db.persons.aggregate(...).count is not a function :
// @(shell):1:1
// cant we use count() in aggregation

db.persons.aggregate([
  { $group: { _id: "$email", count: { $sum: 1 } } },
  { $match: { count: { $gt: 1 } } },
  { $count: "duplicateEmailCount" }
]);
// { "duplicateEmailCount" : 64 }

///************************************PARTIALFILTEREXPERSSION()************************** */
// USE OF partialFilterExpression()
/*
In mongoDb, the partialFilterExpession is an option used when 
creating an index to specify a flter that determines which documents
in a collection are indexed. 
This ca be useful for optimising queries 
that only need to access a subset of the documents in a collection
Overview of partialFilterExpression

Purpose:

The partialFilterExpression allows you to create an index that only includes 
documents that match a specified condition. This can help reduce the 
index size and improve performance for queries that match the filter criteria.

Use Case:

Suppose you have a large collection with documents containing various fields. 
If you only need to index documents where a specific field meets certain criteria, 
you can use partialFilterExpression to include only those documents in the index.
*/
db.collection.createIndex(
  { fieldToIndex: 1 }, // Index specification
  {
    partialFilterExpression: { fieldToFilter: { $gt: 10 } } // Filter for which documents to index
  }
);
// example
db.persons.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { gender: "male" } }
);
/*
{
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"createdCollectionAutomatically" : false,
	"ok" : 1
}
*/
db.persons.getIndexes();
/*
[
	{
		"v" : 2,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_"
	},
	{
		"v" : 2,
		"key" : {
			"dob.age" : 1
		},
		"name" : "dob.age_1",
		"partialFilterExpression" : {
			"gender" : "male"
		}
	}
]
*/
//find the docs whose age is greater than 60;
db.persons
  .explain("executionStats")
  .find({ "dob.age": { $gt: 60 } }, { dob: 1 });
/*
	"queryPlan" : {
    "stage" : "PROJECTION_SIMPLE",
    "planNodeId" : 2,
    "transformBy" : {
      "dob" : true,
      "_id" : true
    },
  "inputStage" : {
                 "stage" : "COLLSCAN",
      "executionStats" : {
        "executionSuccess" : true,
        "nReturned" : 4997,
        "executionTimeMillis" : 12,
        "totalKeysExamined" : 0,
        "totalDocsExamined" : 5001,
      }


here if you see mongodb used collection scan not indexScan
this is because  of the following reasons

1. Partial Index Limitation:
Partial index: The index you created on "dob.age" includes only the 
documents where the gender is male. This means the index does not cover
docs where gender is anything other than 'male' or where gender is not present

Query Condition: The query {"dob.age":{$gt:60}} doesnot include
 a filter on 'gender'. This means that the query might petentially match documents 
 where 'gender' is not 'male', which are not included.

2. Query Matching Criteria:
Since the partial index is limited to only those documents that satisfy the 
condition "gender": "male", MongoDB determines that the partial index is not 
applicable to your query because your query could potentially match documents 
that are not included in this index.
As a result, MongoDB decides to perform a collection scan (COLLSCAN) instead, 
which examines every document in the collection to ensure that it finds all 
matching documents.
Summary:
Collection Scan occurred because the query did not match the 
partialFilterExpression of the index.

MongoDB could not use the index for the query because it might
 miss documents outside the partial index.
Solution: Include the condition on gender in the query to use 
the partial index effectively.
*/
db.persons.find().count();
// 5001

db.persons.find({ "dob.age": { $gt: 60 } }, { dob: 1 }).count();
// 1222

//Above 1222 docs are the docs whose age>60 they might be male of female
db.persons.find({ "dob.age": { $gt: 60 } }, { dob: 1, gender: 1 });
/*
{ "_id" : ObjectId("66c34517ad083f11eb00a059"), "gender" : "female", "dob" : { "date" : "1954-05-01T02:34:40Z", "age" : 64 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a05a"), "gender" : "female", "dob" : { "date" : "1948-04-23T03:40:22Z", "age" : 70 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a05d"), "gender" : "female", "dob" : { "date" : "1951-12-17T20:03:33Z", "age" : 66 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a069"), "gender" : "male", "dob" : { "date" : "1957-06-28T13:29:32Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a06d"), "gender" : "female", "dob" : { "date" : "1953-01-17T16:10:03Z", "age" : 65 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a06f"), "gender" : "male", "dob" : { "date" : "1948-08-16T11:51:26Z", "age" : 70 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a072"), "gender" : "female", "dob" : { "date" : "1951-04-18T03:58:19Z", "age" : 67 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a07a"), "gender" : "male", "dob" : { "date" : "1956-02-23T05:47:13Z", "age" : 62 } }
.
.
.,
*/
//now find the docs whose age is greater than 60 and who are male
db.persons.find({ "dob.age": { $gt: 60 }, gender: "male" }).count();
// 610
//above 610 docs are only male docs, female docs were not included
//for the above query mongodb will use indexScan which we created partially
// using partialFilterExpression
db.persons
  .explain("executionStats")
  .find({ "dob.age": { $gt: 60 }, gender: "male" });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"gender" : {
						"$eq" : "male"
					}
				},
				{
					"dob.age" : {
						"$gt" : 60
					}
				}
			]
		},
"winningPlan" : {
			"queryPlan" : {
				"stage" : "FETCH",
				"planNodeId" : 2,
				"inputStage" : {
					"stage" : "IXSCAN",
					"planNodeId" : 1,
					"keyPattern" : {
						"dob.age" : 1
					},
					"indexName" : "dob.age_1",
					"isMultiKey" : false,
"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 610,
		"executionTimeMillis" : 5,
		"totalKeysExamined" : 610,
		"totalDocsExamined" : 610,
*/
//see only male docs are got
db.persons.find(
  { "dob.age": { $gt: 60 }, gender: "male" },
  { dob: 1, gender: 1 }
);
/*
{ "_id" : ObjectId("66c34517ad083f11eb00a069"), "gender" : "male", "dob" : { "date" : "1957-06-28T13:29:32Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a0cd"), "gender" : "male", "dob" : { "date" : "1957-07-27T12:37:39Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a121"), "gender" : "male", "dob" : { "date" : "1957-04-21T22:06:24Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a14a"), "gender" : "male", "dob" : { "date" : "1957-07-27T17:10:19Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a1f6"), "gender" : "male", "dob" : { "date" : "1957-08-11T21:19:15Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a22b"), "gender" : "male", "dob" : { "date" : "1956-09-15T10:51:02Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a2b1"), "gender" : "male", "dob" : { "date" : "1957-03-15T22:03:16Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a59f"), "gender" : "male", "dob" : { "date" : "1956-09-27T04:26:58Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a5b3"), "gender" : "male", "dob" : { "date" : "1957-08-13T10:43:15Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a63d"), "gender" : "male", "dob" : { "date" : "1957-06-30T07:07:43Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a8ca"), "gender" : "male", "dob" : { "date" : "1956-11-02T17:17:04Z", "age" : 61 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a93b"), "gender" : "male", "dob" : { "date" : "1956-10-13T11:03:53Z", "age" : 61 } }
*/
//applying partilFilterExpression
db.persons.createIndex({ email: 1 }, { unique: true });
/*
{
	"ok" : 0,
	"errmsg" : "Index build failed: 34e50daf-a68f-4c02-a136-96d9a301b965: Collection practice.persons ( d695c41e-45c7-4665-a681-c479f3c8ac4e ) :: caused by :: E11000 duplicate key error collection: practice.persons index: email_1 dup key: { email: null }",
	"code" : 11000,
	"codeName" : "DuplicateKey",
	"keyPattern" : {
		"email" : 1
	},
	"keyValue" : {
		"email" : null
	}
}
*/
//the error because some of the docs have duplicate values for the email field specifically null. to avoid this for creating
// the index we can use partialFilterExpression
db.persons.createIndex(
  { email: 1 },
  { partialFilteExpression: { email: { $exits: true, $eq: null } } }
);
/*
{
	"ok" : 0,
	"errmsg" : "Error in specification { key: { email: 1.0 }, name: \"email_1\", 
	partialFilteExpression: { email: { $exits: true, $eq: null } } } :: caused by :: 
	The field 'partialFilteExpression' is not valid for an index specification. 
	Specification: { key: { email: 1.0 }, name: \"email_1\", partialFilteExpression: { email: { $exits: true, $eq: null } } }",

	"code" : 197,
	"codeName" : "InvalidIndexSpecificationOption"
}
*/
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
  
  The error you're encountering is due to the combination of the $exists and $ne operators 
  within the partialFilterExpression. MongoDB does not support the use of the $ne (not equal) 
  operator in partialFilterExpression for creating indexes. To work around this, you can still 
  create a partial index that ignores null values by using $exists: true alone.

However, if you want to exclude null values specifically, you would need to ensure that the 
documents do not have null values in the email field before creating the index. Here's the 
approach you can take:
  */
//trying to apply the index by ignoring the null value for email
db.persons.createIndex(
  { email: 1 },
  { partialFilterExpression: { email: { $exists: true } } }
);
// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
db.persons.getIndexes();
/*
[
	{
		"v" : 2,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_"
	},
	{
		"v" : 2,
		"key" : {
			"email" : 1
		},
		"name" : "email_1",
		"partialFilterExpression" : {
			"email" : {
				"$exists" : true
			}
		}
	}
]
*/

// **************** TIME TO LIVE INDEX *****************/
// This  index is helpful for the application where self-distruction is needed.
// / lets say sessions of users where we wnat to clear their data
// agter some duration or anything like that
db.session.insertOne({
  data: "about Time-to-live index",
  createdAt: new Date()
});
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66c47d9cda81ac7548953f99")
// }
db.session.find();
// { "_id" : ObjectId("66c47d9cda81ac7548953f99"), "data" : "about Time-to-live index", "createdAt" : ISODate("2024-08-20T11:27:24.971Z") }
//now create a ttl index
// these indexes are useful to limit a time for the collection.i.e if you want collection
// for some amount of time we will use this index
db.session.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10 });
//{
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }

db.session.find().pretty();
``;
// {
// 	"_id" : ObjectId("66c47d9cda81ac7548953f99"),
// 	"data" : "about Time-to-live index",
// 	"createdAt" : ISODate("2024-08-20T11:27:24.971Z")
// }
db.session.find().pretty();
// {
// 	"_id" : ObjectId("66c47d9cda81ac7548953f99"),
// 	"data" : "about Time-to-live index",
// 	"createdAt" : ISODate("2024-08-20T11:27:24.971Z")
// }
//wait for 10 seconds
db.session.find().pretty();
db.session.find().pretty();
//see no data is present
//  show collections
// aggregate
// collection
// cursorPractis
// cursorprct
// movies
// persons
// practsAggr
// session
// sports
// users
db.session.find();
//collection is present but data in the collection is not there
//so whenever you have a use case where data should clean up itself you dont need to
// write a complex script for that,you can use time-to-live index, that expiry
//after time that we added in index creation

//YOU CAN ONLY USE THIS IN SINGLE FIELD INDEXES, IT DOESNOT WORK ON COMPUND
// INDEXES AND AS WE MENTIONED IT WORKS ON DATE OBJECTS ONLY.
//******************************************************************************* */

//

//z********** UNDERSTANDING COVERED QUERY ************************
/*
A covered query is a type of query in MongoDB where all the fields requested in the 
query, including those in the filter, sort, and projection, are all part of an index. 
When a query is covered by an index, MongoDB can satisfy the query using only the index, 
without having to scan the actual documents in the collection. This leads to performance 
improvements because 
Reduced Disk I/O: Since the index stores the necessary information, MongoDB doesn't need to 
load documents from the disk into memory, reducing the amount of disk I/O operations.

Faster Query Execution: The query execution is faster because accessing an index is usually 
quicker than accessing the full documents, especially if the documents are large.

Efficient Use of Memory: Only the index needs to be loaded into memory, which is often 
smaller than the entire document collection, making it more efficient in terms of memory usage.
Since the index { name: 1, age: 1 } includes both the name and age fields and the query only requests 
these fields (plus omitting the _id), this query is a covered query. MongoDB can answer the query directly 
from the index without looking at the documents themselves.

Benefits of Covered Queries
Performance Gains: Since the query is resolved entirely using the index, there’s no need to scan 
the actual  documents, leading to faster query execution.
Lower Resource Usage: Covered queries consume fewer resources (like CPU and RAM) because they 
avoid the need to load documents from disk or memory.
Efficient Index Usage: Covered queries maximize the benefit of indexes by minimizing 
the workload required to answer the query.

Limitations

Index Size: The index size can grow large if you index many fields, potentially impacting write
 performance and consuming more disk space.

Complex Queries: Not all queries can be covered by indexes, especially if they 
involve complex aggregations or transformations.

Covered queries are particularly useful for optimizing read-heavy workloads in 
MongoDB, especially when specific fields are frequently accessed.
*/
db.users.getIndexes()[{ v: 2, key: { _id: 1 }, name: "_id_" }];
db.users.createIndex({ name: 1 });
/*
{
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"createdCollectionAutomatically" : false,
	"ok" : 1
}
*/
db.users.getIndexes()[
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
      name: 1
    },
    name: "name_1"
  })
];
db.users.explain("executionStats").find({ name: "Max" });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.users",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"name" : {
				"$eq" : "Max"
			}
		},
		"queryHash" : "1AD872C6",
		"planCacheKey" : "65CB68C6",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "FETCH",
				"planNodeId" : 2,
				"inputStage" : {
					"stage" : "IXSCAN",
					"planNodeId" : 1,
					"keyPattern" : {
						"name" : 1
					},
					"indexName" : "name_1",
					"isMultiKey" : false,
          "executionStats" : {
            "executionSuccess" : true,
            "nReturned" : 1,
            "executionTimeMillis" : 8,
            "totalKeysExamined" : 1,
            "totalDocsExamined" : 1,
  
// if you obseve total docs examined is 1 we can even make it is zero 
*/
db.users.explain("executionStats").find({ name: "Max" }, { name: 1, _id: 0 });
/*
"executionStats" : {
  "executionSuccess" : true,
  "nReturned" : 1,
  "executionTimeMillis" : 12,
  "totalKeysExamined" : 1,
  "totalDocsExamined" : 0,

  this is because th ecovered query is fully covered by index, then you will
  have very efficient query because you shiiped that stage of reched out the 
  collection getting docs that speeds up your query.if you get this you will have fast solution

*/
//another example
db.persons.find({ "name.first": "sandra" }, { name: 1, dob: 1 });
/*
{ "_id" : ObjectId("66c34517ad083f11eb00a05e"), "name" : { "title" : "miss", "first" : "sandra", "last" : "lorenzo" }, "dob" : { "date" : "1975-03-23T17:01:45Z", "age" : 43 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a214"), "name" : { "title" : "ms", "first" : "sandra", "last" : "leclerc" }, "dob" : { "date" : "1945-05-28T11:58:57Z", "age" : 73 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a78e"), "name" : { "title" : "mademoiselle", "first" : "sandra", "last" : "brun" }, "dob" : { "date" : "1971-08-06T14:19:23Z", "age" : 47 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a818"), "name" : { "title" : "mrs", "first" : "sandra", "last" : "rojas" }, "dob" : { "date" : "1975-01-09T10:48:25Z", "age" : 43 } }
{ "_id" : ObjectId("66c34517ad083f11eb00aa65"), "name" : { "title" : "mrs", "first" : "sandra", "last" : "da silva" }, "dob" : { "date" : "1967-07-31T00:42:20Z", "age" : 51 } }
{ "_id" : ObjectId("66c34517ad083f11eb00ac6b"), "name" : { "title" : "mrs", "first" : "sandra", "last" : "diaz" }, "dob" : { "date" : "1955-08-06T20:35:03Z", "age" : 63 } }
*/
db.persons.find(
  { "name.first": "sandra", "name.last": "rojas" },
  { name: 1, dob: 1 }
);
// { "_id" : ObjectId("66c34517ad083f11eb00a818"), "name" : { "title" : "mrs", "first" : "sandra", "last" : "rojas" }, "dob" : { "date" : "1975-01-09T10:48:25Z", "age" : 43 } }
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
      name: 1,
      "dob.age": 1
    },
    name: "name_1_dob.age_1"
  })
];

db.persons
  .explain("executionStats")
  .find({ "name.first": "sandra", "name.last": "rojas" }, { name: 1, dob: 1 });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"name.first" : {
						"$eq" : "sandra"
					}
				},
				{
					"name.last" : {
						"$eq" : "rojas"
					}
				}
			]
		},
    "winningPlan" : {
			"queryPlan" : {
				"stage" : "PROJECTION_SIMPLE",
				"planNodeId" : 2,
				"transformBy" : {
					"name" : true,
					"dob" : true,
					"_id" : true
				},
				"inputStage" : {
			          		"stage" : "COLLSCAN",
					"planNodeId" : 1,
          "executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1,
		"executionTimeMillis" : 12,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 5001,

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

*/
// for the above collection I created index, still it is using collectionScan why?
/*In the query you provided, MongoDB is still using a collection scan instead of 
using the index on name because the index you created does not cover the fields 
being queried. Here's a detailed explanation:

1. Index Structure
You created an index on name as a whole:

javascript
Copy code
db.persons.createIndex({name: 1})
This index is for the entire name field, which would be useful if you queried the 
entire name object as a whole, like this:

javascript
*/
db.persons.find({ name: { first: "sandra", last: "rojas" } });
/*
However, your query is filtering on subfields of the name object:

javascript
Copy code
*/
db.persons.find({ "name.first": "sandra", "name.last": "rojas" });
/*
This means that the query cannot utilize the index on name because MongoDB indexes the 
entire object and does not break it down into its subfields automatically.

2. Why Collection Scan?
Since the index on name is not applicable to the query on name.first and name.last, 
MongoDB resorts to a collection scan (COLLSCAN), which examines every document in 
the collection.

3. How to Fix This?
To optimize the query and use an index, you should create a compound index that 
directly includes the fields you are querying:

javascript
Copy code
*/
db.persons.createIndex({ "name.first": 1, "name.last": 1 });
/*
This index specifically targets the name.first and name.last subfields. When you 
run the same query afterward, MongoDB should use this index instead of performing 
a collection scan.

4. Projection and Index Usage
Additionally, if you project fields that are covered by the index, MongoDB can 
potentially perform a covered query, further optimizing performance.

Summary
The collection scan occurred because the index on name doesn't apply to the subfields 
name.first and name.last. Creating a compound index on the specific fields being queried 
will allow MongoDB to use an index scan, improving query performance.
*/
db.persons.find({ "name.first": "sandra", "name.last": "rojas" });
/*
but iif wrote query like this mongodb using collection scan even I have indexes
 db.persons.getIndexes()
[
	{
		"v" : 2,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_"
	},
	{
		"v" : 2,
		"key" : {
			"name" : 1,
			"dob.age" : 1
		},
		"name" : "name_1_dob.age_1"
	},
	{
		"v" : 2,
		"key" : {
			"name" : 1
		},
		"name" : "name_1"
	}
]
like this, then how can i write a query


Based on the indexes you have and the query you want to run, it looks like the 
existing indexes are not optimized for the query you're executing. Here's how 
to approach the problem and ensure that MongoDB uses the appropriate index:

Current Indexes
Your existing indexes are:

Index on _id
Index on name and dob.age
Index on name
Issue
The query:


db.persons.find({ "name.first": "sandra", "name.last": "rojas" })
requires an index on name.first and name.last to be efficient. However, 
your indexes do not match this query directly. Specifically, the index 
named name_1 only covers the name field, and name_1_dob.age_1 indexes 
name and dob.age, but not specifically name.first and name.last.

Solution
To ensure efficient querying, you need to create a compound index on 
both name.first and name.last. Here’s how you can do it:

Create a Compound Index:


db.persons.createIndex({ "name.first": 1, "name.last": 1 })
This index will directly support the query by allowing MongoDB to 
quickly locate documents that match both name.first and name.last.

Verify Index Usage:

After creating the index, use the explain method to check if MongoDB 
is using the new index:

*/
db.persons
  .find({ "name.first": "sandra", "name.last": "rojas" })
  .explain("executionStats");
// Look for IXSCAN (index scan) in the output instead of COLLSCAN (collection scan).

// Index Details
/*
To create the compound index, MongoDB will store the index in a way that allows it to quickly 
find documents where both name.first and name.last match the specified values. The index works
 by sorting and indexing documents based on these two fields.
*/
// Steps to Verify
// Create the Compound Index:

db.persons.createIndex({ "name.first": 1, "name.last": 1 });
// Check Indexes:

// After creating the index, verify it with:

db.persons.getIndexes();
// You should see an index for { "name.first": 1, "name.last": 1 }.

// Run the Query and Explain:

db.persons
  .find({ "name.first": "sandra", "name.last": "rojas" })
  .explain("executionStats");
// Ensure that the winningPlan section shows an IXSCAN stage indicating that the index is
//  being used.

db.persons.createIndex({ "name.first": 1, "name.last": 1 });
/*
{
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"createdCollectionAutomatically" : false,
	"ok" : 1
}
*/
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
      "name.first": 1,
      "name.last": 1
    },
    name: "name.first_1_name.last_1"
  })
];

db.persons.find({ "name.last": "sandra" });
db.persons.find({ "name.first": "sandra" }, { name: 1, dob: 1 });
/*
{ "_id" : ObjectId("66c34517ad083f11eb00a78e"), "name" : { "title" : "mademoiselle", "first" : "sandra", "last" : "brun" }, "dob" : { "date" : "1971-08-06T14:19:23Z", "age" : 47 } }
{ "_id" : ObjectId("66c34517ad083f11eb00aa65"), "name" : { "title" : "mrs", "first" : "sandra", "last" : "da silva" }, "dob" : { "date" : "1967-07-31T00:42:20Z", "age" : 51 } }
{ "_id" : ObjectId("66c34517ad083f11eb00ac6b"), "name" : { "title" : "mrs", "first" : "sandra", "last" : "diaz" }, "dob" : { "date" : "1955-08-06T20:35:03Z", "age" : 63 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a214"), "name" : { "title" : "ms", "first" : "sandra", "last" : "leclerc" }, "dob" : { "date" : "1945-05-28T11:58:57Z", "age" : 73 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a05e"), "name" : { "title" : "miss", "first" : "sandra", "last" : "lorenzo" }, "dob" : { "date" : "1975-03-23T17:01:45Z", "age" : 43 } }
{ "_id" : ObjectId("66c34517ad083f11eb00a818"), "name" : { "title" : "mrs", "first" : "sandra", "last" : "rojas" }, "dob" : { "date" : "1975-01-09T10:48:25Z", "age" : 43 } }
*/
db.persons.find(
  { "name.first": "sandra", "name.last": "lorenzo" },
  { name: 1, dob: 1 }
);
// { "_id" : ObjectId("66c34517ad083f11eb00a05e"),
// 	 "name" : { "title" : "miss", "first" : "sandra", "last" : "lorenzo" },
// 	 "dob" : { "date" : "1975-03-23T17:01:45Z", "age" : 43 }
// }
db.persons
  .explain("executionStats")
  .find(
    { "name.first": "sandra", "name.last": "lorenzo" },
    { name: 1, dob: 1 }
  );
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"name.first" : {
						"$eq" : "sandra"
					}
				},
				{
					"name.last" : {
						"$eq" : "lorenzo"
					}
				}
			]
		},
    		"winningPlan" : {
			"queryPlan" : {
				"stage" : "PROJECTION_SIMPLE",
				"planNodeId" : 3,
				"transformBy" : {
					"name" : true,
					"dob" : true,
					"_id" : true
				},
				"inputStage" : {
					"stage" : "FETCH",
					"planNodeId" : 2,
					"inputStage" : {
					                     	"stage" : "IXSCAN",
						"planNodeId" : 1,
						"keyPattern" : {
							"name.first" : 1,
							"name.last" : 1
						},
					            	"indexName" : "name.first_1_name.last_1",
                        "executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1,
		"executionTimeMillis" : 1,
		"totalKeysExamined" : 1,
		"totalDocsExamined" : 1,

//NOW MAKING 
*/
db.persons
  .explain("executionStats")
  .find(
    { "name.first": "sandra", "name.last": "lorenzo" },
    { name: 1, _id: 0 }
  );
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.persons",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"name.first" : {
						"$eq" : "sandra"
					}
				},
				{
					"name.last" : {
						"$eq" : "lorenzo"
					}
				}
			]
		},
		"queryHash" : "81BC3562",
		"planCacheKey" : "7CD4542C",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "PROJECTION_SIMPLE",
				"planNodeId" : 3,
				"transformBy" : {
					"name" : true,
					"_id" : false
				},
				"inputStage" : {
					"stage" : "FETCH",
					"planNodeId" : 2,
					"inputStage" : {
						"stage" : "IXSCAN",
						"planNodeId" : 1,
						"keyPattern" : {
							"name.first" : 1,
							"name.last" : 1
						},
						"indexName" : "name.first_1_name.last_1",
						"isMultiKey" : false,
   "executionStats" : {
              "executionSuccess" : true,
              "nReturned" : 1,
              "executionTimeMillis" : 1,
              "totalKeysExamined" : 1,
              "totalDocsExamined" : 1,
          
              in the query  i made _id:0 , the totalDocsExamined:1 but it has to come for 
			1 right, then why it is came 1, here iam working on covered query 

In MongoDB, a "covered query" is a query where the fields requested in the query and the 
fields returned are all present in the index used. This means that MongoDB can satisfy the 
query using only the index and doesn't need to fetch the actual documents from the 
collection, which can improve performance.

In your case, you are querying with {"name.first": "sandra", "name.last": "lorenzo"} and 
projecting only the name field while excluding _id. The query uses an index on name.first 
and name.last, and the executionStats indicates that:

totalKeysExamined: 1 — This reflects that MongoDB examined one key from the index.
totalDocsExamined: 1 — This indicates that even though it’s a covered query, MongoDB still
						 had to look at one document.
This can happen because while the index covers the fields needed for the query, the query 
engine still needs to validate the documents in the index to ensure they match the query 
criteria. In this case, the document matching the query condition was examined to confirm it meets the criteria.

So, despite the query being covered, MongoDB may still examine the document associated with the index key to ensure it matches the query's conditions. This is why totalDocsExamined shows 1 even in a covered query.

then how can i make the totalDocsExamined:0
To ensure that totalDocsExamined is 0 in a covered query, you need to ensure that your query is fully covered by the index, meaning that MongoDB should be able to answer the query using only the index data without needing to fetch the actual documents.
*/
//
//**************************************************************************** */
// Since your index is name.first_1_name.last_1, it’s already covering the query. However,
//  you need to ensure that the projection is also covered.

db.persons.createIndex({ "name.first": 1, "name.last": 1, name: 1 });

//**********************HOW MONGODB REJECTS PLAN
db.persons.getIndexes()[{ v: 2, key: { _id: 1 }, name: "_id_" }];
db.persons.createIndex({ age: 1, name: 1 });
// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
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
      age: 1,
      name: 1
    },
    name: "age_1_name_1"
  })
];
// here in the name:age_1_name_1 index order is matter with age being 1st then name
db.persons.explain().find({ name: "Max", age: 30 });
/*
"winningPlan" : {
	"queryPlan" : {
		"stage" : "FETCH",
		"planNodeId" : 2,
		"inputStage" : {
			"stage" : "IXSCAN",
			"planNodeId" : 1,
			"keyPattern" : {
				"age" : 1,
				"name" : 1
			},
			"indexName" : "age_1_name_1",
			"isMultiKey" : false,


					"rejectedPlans" : [ ]
*/
db.persons.explain().find({ age: { $gt: 30 } });
/*
"winningPlan" : {
	"queryPlan" : {
		"stage" : "FETCH",
		"planNodeId" : 2,
		"inputStage" : {
			"stage" : "IXSCAN",
			"planNodeId" : 1,
			"keyPattern" : {
				"age" : 1,
				"name" : 1
			},
			"indexName" : "age_1_name_1",
			"isMultiKey" : false,
			
"rejectedPlans" : [ ]
*/
// in mongodb, when a query is executed, the query planner generates multiple
// potential execution plans to retrieve the data. These plans are evaluated based
// on their efficiency, and the most efficient plan is selected as the "winning plan"
//The othe plans that were generated but not chosen are reffered to as "rejected plans."

//HOW MONGODB REJECTS PLANS:
// 1.Query planner Process:
// // When a query is run, MongoDB’s query planner considers various ways to access the required data.
// // The planner might consider different indexes, collection scans, or combinations of index scans.
// // For each possible approach, the planner generates an execution plan.

// 2. Evaluation of Plans:

// MongoDB simulates the execution of these plans to estimate their performance.
// The performance metrics considered include the number of documents scanned, the
// number of keys examined, and the overall execution time.
// The query planner assigns a score to each plan based on these metrics.

// 3. Evaluation of Plans:

// MongoDB simulates the execution of these plans to estimate their performance.
// The performance metrics considered include the number of documents scanned, the number of keys examined, and the overall execution time.
// The query planner assigns a score to each plan based on these metrics.

// 4. Winning Plan Selection:

// The plan with the lowest cost (the most efficient) is selected as the "winning plan."
// This plan will be executed to return the query results.
// Rejected Plans:

// The other plans that were generated but not selected are "rejected plans."
// These plans are discarded after the best plan is chosen.
// However, the query planner may keep track of these plans for debugging or analysis,
// especially if the performance of the selected plan turns out to be suboptimal during
// actual execution.

//

//*****************using MULTIKY INDEXES  *************/

// A multi key index in mongoDB is an index tha allows efficient quering of docs
//  that contains an array,
// when you create index on a field that contains an array, MongoDB automatically creates
// a multikey index.
//This means that MongoDB indexes each element of the array separetely, allowing
// for efficient queries tha invove any or all elements of the array

//
////NOW ADD INDEX ON ARRAY ****************************

db.users.find({ hobbies: "Eating" });
/*
{ "_id" : ObjectId("66c54fc6b933caba4e209f41"), "name" : "John", "hobbies" : [ "Eating", "Workouts", "Boxing" ], "address" : [ { "street" : "mainStreet" }, { "street" : "secondLine" } ] }
{ "_id" : ObjectId("66c54fc6b933caba4e209f42"), "name" : "Rko", "hobbies" : [ "Eating", "Dancing", "Sports" ], "address" : [ { "street" : "firstStreet" }, { "line" : "3rd line" } ] }
> db.users.find({hobbies:"Sports"})
{ "_id" : ObjectId("66c54fc6b933caba4e209f42"), "name" : "Rko", "hobbies" : [ "Eating", "Dancing", "Sports" ], "address" : [ { "street" : "firstStreet" }, { "line" : "3rd line" } ] }
*/
db.users.find({ hobbies: "hiking" });
db.users.find({ hobbies: "Hiking" });
// { "_id" : ObjectId("66c09b35b2cc291f1488dd83"), "name" : "Steven", "hobbies" : [ "Cooking", "Hiking", "Swimming", { "title" : "Running", "frequency" : 2 }, "Dancing" ] }
//the documents who has hobbies as array they only returned but the documents who has objects
//  of array as hobbies were not returned. Because the calling for  like that array is
// different

//create index on hobbies array
db.users.getIndexes();
// [ { "v" : 2, "key" : { "_id" : 1 }, "name" : "_id_" } ]
db.users.createIndex({ hobbies: 1 });
// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }

db.users.getIndexes()[
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
      hobbies: 1
    },
    name: "hobbies_1"
  })
];
db.users.find({ hobbies: "Eating" }).pretty();
/*
{
	"_id" : ObjectId("66c54fc6b933caba4e209f41"),
	"name" : "John",
	"hobbies" : [
		"Eating",
		"Workouts",
		"Boxing"
	],
	"address" : [
		{
			"street" : "mainStreet"
		},
		{
			"street" : "secondLine"
		}
	]
}
{
	"_id" : ObjectId("66c54fc6b933caba4e209f42"),
	"name" : "Rko",
	"hobbies" : [
		"Eating",
		"Dancing",
		"Sports"
	],
	"address" : [
		{
			"street" : "firstStreet"
		},
		{
			"line" : "3rd line"
		}
	]
}
*/
db.users.explain("executionStats").find({ hobbies: "Eating" });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.users",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"hobbies" : {
				"$eq" : "Eating"
			}
		},
		"queryHash" : "D852C073",
		"planCacheKey" : "D209DBB6",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "FETCH",
				"planNodeId" : 2,
				"inputStage" : {
					"stage" : "IXSCAN",
					"planNodeId" : 1,
					"keyPattern" : {
						"hobbies" : 1
					},
					"indexName" : "hobbies_1",
												"isMultiKey" : true,
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 2,
		"executionTimeMillis" : 1,
		"totalKeysExamined" : 2,
		"totalDocsExamined" : 2,
*/
//HERE IsMULTIKEY IS SET TO TRUE FOR HOBBIES INDEX.MONGODB TREATS THIS AS  A
// MUTLIKEY INDEX. BECAUSE INDEX IS CREATED ON AN ARRAY OF VALUES
// Techniclly multikey indexes are working like normal index but they are stored differently

// The "isMultiKey": true flag in the query planner's output indicates that the index being
// used is a multikey index. In MongoDB, an index is considered multikey if it is created
// on a field that holds an array value in any document in the collection.

Summary;

// Multikey Index: When you create an index on a field that contains an array, MongoDB creates a multikey index.

// isMultiKey Flag: This flag is set to true when the index being used is a multikey index.

// Efficient Querying: The multikey index allows MongoDB to efficiently query arrays by indexing each element separately.

//Now finding the documents which has objects in its arrays as field-values

db.users.find({ name: "Max" });

/*
{
	"_id" : ObjectId("66bc16d23d6802bbff2744dd"),
	"name" : "Max",
	"hobbies" : [
		{
			"title" : "Sports",
			"frequency" : 2,
			"highFrequency" : true,
			"hasGoodFrequency" : true,
			"hasGoodHealth" : true
		},
		{
			"title" : "Cooking",
			"frequency" : 3,
			"hasGoodHealth" : true
		}
	],
	"isSport" : true,
	"comment" : "You have better health because of having hobbies",
	"employeed" : "Self employeed",
	"salary" : 30000,
	"totalAge" : 52
}
*/
db.users.explain("executionStats").find({ "hobbies.title": "Sports" });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.users",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"hobbies.title" : {
				"$eq" : "Sports"
			}
		},
		"queryHash" : "2D438B66",
		"planCacheKey" : "06CA000E",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
						"stage" : "COLLSCAN",
				"planNodeId" : 1,
				"filter" : {
					"hobbies.title" : {
						"$eq" : "Sports"
					}
				},
				"executionStats" : {
					"executionSuccess" : true,
					"nReturned" : 5,
					"executionTimeMillis" : 0,
					"totalKeysExamined" : 0,
					"totalDocsExamined" : 9,
*/
db.users.find({ name: "Rko" }).pretty();
/*
{
	"_id" : ObjectId("66c54fc6b933caba4e209f42"),
	"name" : "Rko",
	"hobbies" : [
		"Eating",
		"Dancing",
		"Sports"
	],
	"address" : [
		{
			"street" : "firstStreet"
		},
		{
			"line" : "3rd line"
		}
	]
}
*/
db.users.explain("executionStats").find({ "address.street": "firstStreet" });
/*
"queryPlanner" : {
		"namespace" : "practice.users",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"address.street" : {
				"$eq" : "firstStreet"
			}
		},
		"queryHash" : "B14AE29D",
		"planCacheKey" : "B512ECD1",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
								"stage" : "COLLSCAN",
				"planNodeId" : 1,
				"filter" : {
					"address.street" : {
						"$eq" : "firstStreet"
					}
				},
				"direction" : "forward"
			},
"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1,
		"executionTimeMillis" : 1,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 9,

//see mongodb used collectinScan even there is a index scan is present for 
// the whole document it used collectionsScan only 
*/
db.users.find({ name: "Rko" }).pretty();
/*
{
	"_id" : ObjectId("66c54fc6b933caba4e209f42"),
	"name" : "Rko",
	"hobbies" : [
		"Eating",
		"Dancing",
		"Sports"
	],
	"address" : [
		{
			"street" : "firstStreet"
		},
		{
			"line" : "3rd line"
		}
	]
}
*/
// creating index on Arrays having OBJECTS AS ITS ELEMENTS
db.users.createIndex({ address: 1 });
// {
// 	"numIndexesBefore" : 2,
// 	"numIndexesAfter" : 3,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
db.users.find({ address: "firstStreet" }).pretty();

db.users.find({ "address.street": "firstStreet" }).pretty();
/*
{
	"_id" : ObjectId("66c54fc6b933caba4e209f42"),
	"name" : "Rko",
	"hobbies" : [
		"Eating",
		"Dancing",
		"Sports"
	],
	"address" : [
		{
			"street" : "firstStreet"
		},
		{
			"line" : "3rd line"
		}
	]
}
*/
1;
db.users.explain("executionStats").find({ "address.street": "firstStreet" });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.users",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"address.street" : {
				"$eq" : "firstStreet"
			}
		},
		"queryHash" : "B14AE29D",
		"planCacheKey" : "48FA3363",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
							"stage" : "COLLSCAN",
				"planNodeId" : 1,
				"filter" : {
					"address.street" : {
						"$eq" : "firstStreet"
					}
				},
				"direction" : "forward"
			},
"executionStats" : {
		"executionSuccess" : true,
							"nReturned" : 1,
		"executionTimeMillis" : 1,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 9,

*/
2;
db.users.explain("executionStats").find({ address: "firstStreet" });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.users",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"address" : {
				"$eq" : "firstStreet"
			}
		},
		"queryHash" : "08D56692",
		"planCacheKey" : "F3362ED8",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "FETCH",
				"planNodeId" : 2,
				"inputStage" : {
					"stage" : "IXSCAN",
					"planNodeId" : 1,
					"keyPattern" : {
						"address" : 1
					},
							"indexName" : "address_1",
					"isMultiKey" : true,
"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 0,
		"executionTimeMillis" : 1,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 0,
*/
// i have documents which has objects as elements of the the array, then i created
// index on address field as address:1. Now I want return the document for that
//  i wrote a queries
//  in 1st query mongodb returned one document which met the filter criteria, but DID NOT USED INDEX
// THE 2ND QUERY is not returned the documents but used index
// why that is happened even documents were holding the index mongodb didn't used.

//answer is

// The first query didn't use the index because MongoDB needs an index on the specific
// subfield being queried ("address.street"), not just on the array field (address).

// The second query used the index, but since it looked for the entire address field to
// match a string, it didn't return any documents because address is an array of objects,
// not a string.

// To optimize queries on subfields within arrays, create an index specifically on those subfields.

/*
Let's break it down:
Indexes and Multikey Indexes:

When you create an index on a field that holds an array (address in this case), MongoDB 
creates a multikey index.

A multikey index allows MongoDB to index each element of an array separately.
 However, the way MongoDB uses this index depends on the specific query structure.

 Query Structure:

Query 1: db.users.explain("executionStats").find({ "address.street": "firstStreet" });

In this query, you are querying a specific field within an array of subdocuments 
("address.street").
Result: MongoDB performs a collection scan (COLLSCAN). This happens because there 
is no direct index on the "address.street" field. The index you created is on the
 address field as a whole, not specifically on the street subfield within the address 
 array.
Query 2: db.users.explain("executionStats").find({ address: "firstStreet" });

In this query, you are querying the entire address field directly, looking for documents
 where the address field (as a whole) equals "firstStreet".
Result: MongoDB uses the index on the address field because it matches the query 
structure. However, since no document in your collection has "firstStreet" as 
the whole value of the address field (the address field is an array of objects,
 not a string), the query returns 0 documents.
 Why MongoDB Didn't Use the Index in the First Query
Array Subfield Query: The first query targets a subfield within an array ("address.street": "firstStreet"). 
The index you created ({ address: 1 }) is on the address field as a whole and does not directly
 index subfields like street within the address array. MongoDB can't leverage the index 
 you created because the query structure ("address.street") doesn't match the
  indexed field (address).

Collection Scan: Since MongoDB can't use the address index for the subfield query, it
 defaults to a collection scan, which is a more general approach that doesn't 
 rely on indexes.
 */

//

//RESTRICTIONS OF MULTIKEY INDEXES
/*
 Multikey indexes in MongoDB are powerful, but they come with certain restrictions 
 and limitations due to their complexity and the potential impact on performance. 
 Here are some key restrictions of multikey indexes:

 1. Single Array Per Indexed Field Combination
MongoDB cannot create a multikey index if more than one indexed field in a document is 
an array. For example, you cannot create a compound index on two fields if both fields 
contain arrays. However, you can create a multikey index on a single array field combined 
with one or more scalar (non-array) fields.

// EXMPLE 1
db.users.createIndex({name:1,hobbies:1})
// {
// 	"numIndexesBefore" : 2,
// 	"numIndexesAfter" : 3,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }

 
2. wecan create index for normal field and array field 

 //  example 2.
 db.users.createIndex({name:1, address:1})
// {
// 	"numIndexesBefore" : 2,
// 	"numIndexesAfter" : 3,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
3. we cannot create indexes on arrays of same type 

> db.users.createIndex({hobbies:1, interests:1})
{
	"ok" : 0,
	"errmsg" : "Index build failed: a8d1f791-bd6b-496b-afae-46167703911c: Collection practice.users ( 391bb8c4-9e20-4e15-9bad-a5e3f7fc3870 ) :: caused by :: cannot index parallel arrays [interests] [hobbies]",
	"code" : 171,
	"codeName" : "CannotIndexParallelArrays"
}
4.
db.users.createIndex({address:1,studies:1})
{
	"ok" : 0,
	"errmsg" : "Index build failed: 28def647-9277-4ccf-806d-8a50aecd15c8: Collection practice.users ( 391bb8c4-9e20-4e15-9bad-a5e3f7fc3870 ) :: caused by :: cannot index parallel arrays [studies] [address]",
	"code" : 171,
	"codeName" : "CannotIndexParallelArrays"
}
5. we cannot create indexes for arrays of different formats
db.users.createIndex({hobbies:1, address:1})
{
	"ok" : 0,
	"errmsg" : "Index build failed: 5ef5fd6d-d5ae-4fe4-a306-414c0cd0cb22: Collection practice.users ( 391bb8c4-9e20-4e15-9bad-a5e3f7fc3870 ) :: caused by :: cannot index parallel arrays [address] [hobbies]",
	"code" : 171,
	"codeName" : "CannotIndexParallelArrays"
}
compound indexes with multikey indexes, are possible but only with one multikey
index, with one array , not with multiple arrays

*/
//

///******************    T E X T   I N D E X E S   ******************* */

// This  index turn the given text into arry of words nd stored them in the array
// One extra thing what it does is it removes all the stoping words(a,an,the,is,at,your.etc)
//  and it stems all the word, and you have array of keywords
//specil kind of multikey index is -text index
db.indexText.insertMany([
  { title: "A Book", decription: "This is awesome book about a young artist" },
  {
    titel: "Red T-shirt",
    description: "This T-shirt is red and it's a pretty awesome!"
  }
]);

/*{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("66c58f21b933caba4e209f44"),
		ObjectId("66c58f21b933caba4e209f45")
	]
}
*/
db.indexText.find().pretty();
/*
{
	"_id" : ObjectId("66c58f21b933caba4e209f44"),
	"title" : "A Book",
	"decription" : "This is awesome book about a young artist"
}
{
	"_id" : ObjectId("66c58f21b933caba4e209f45"),
	"titel" : "Red T-shirt",
	"description" : "This T-shirt is red and it's a pretty awesome!"
}
*/
db.indexText.getIndexes();
// [ { "v" : 2, "key" : { "_id" : 1 }, "name" : "_id_" } ]

//create text index  ************************************************************
db.indexText.createIndex({ description: 1 });
/*
{
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"createdCollectionAutomatically" : false,
	"ok" : 1
}
*/
//but the index created description_1 will not work as text index. so delete tha tesxt
db.indexText.dropIndex("description_1");
// { "nIndexesWas" : 2, "ok" : 1 }
db.indexText.getIndexes();
// [ { "v" : 2, "key" : { "_id" : 1 }, "name" : "_id_" } ]
//creating text indexes
db.indexText.createIndex({ description: "text" });
// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
db.indexText.getIndexes()[
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
db.indexText.find().pretty();
/*
{
	"_id" : ObjectId("66c58f21b933caba4e209f44"),
	"title" : "A Book",
	"decription" : "This is awesome book about a young artist"
}
{
	"_id" : ObjectId("66c58f21b933caba4e209f45"),
	"titel" : "Red T-shirt",
	"description" : "This T-shirt is red and it's a pretty awesome!"
}
*/
//now find the book which is in red color
db.indexText.find({ description: "awesome" }).pretty();
db.indexText.find({ description: "young artist" }).pretty();
//in this way we cannot find the docs by using text as filter criteria
//for that we need to use mongodb operators like $text and $search, and more
db.indexText.find({ description: { $text: { $search: "awesome" } } }).pretty();
/*
 Error: error: {
	"ok" : 0,
	"errmsg" : "unknown operator: $text",
	"code" : 2,
	"codeName" : "BadValue"
}
*/

//correct query is

db.indexText.find({ $text: { $search: "awesome" } }).pretty();

// {
// 	"_id" : ObjectId("66c58f21b933caba4e209f45"),
// 	"titel" : "Red T-shirt",
// 	"description" : "This T-shirt is red and it's a pretty awesome!"
// }
// it worked but if you see awesome is present in both docs it is given only one document
// this  behavior because duo to how mongoDB's text search prioritizes and
// ranks results. When you use the $text seach operator, MongoDB performs a text
// search  and ranks the documents based on their relevance to the search term
/*
// Understanding Text Search Relevance
Relevnce Scoring: Mongodb ranks documents based on  relevanc score, whic is 
		determined by factors like the frequency of the seach term and its position
		in the text. Documents with higher relevance scores are prioritized.
Default Behavior: By default, MongoDB returns a subset of documents with 
		the highest relevance. The number of documents returned can be controlled with
		the limit option, but the relevance-based ranking will always apply.

Example with limit
To see more results, you can use the limit method:

*/
db.indexText
  .find({ $text: { $search: "awesome" } })
  .limit(10)
  .pretty();
/*
This query will return up to 10 documents that match the search term "awesome".

Example with Sorting by Relevance
If you want to sort the results by their relevance score, you can use the $meta operator:
*/

db.indexText
  .find({ $text: { $search: "awesome" } }, { score: { $meta: "textScore" } })
  .sort({ score: { $meta: "textScore" } })
  .pretty();

// This query will return documents sorted by their relevance score, with the most
// relevant documents first.

// Adjusting Search Behavior

// Multiple Matches: If you need to ensure all matches are returned, adjust your queries or
// indexing strategy based on the specific use case. For instance, using a combination of
// text search and other filters or aggregations might be necessary for complex scenarios.

// Full Example

// Here’s how you might run a query to ensure you get all relevant documents:

db.indexText
  .find({ $text: { $search: "awesome" } }, { score: { $meta: "textScore" } })
  .sort({ score: { $meta: "textScore" } })
  .pretty();

// This will sort the documents by their relevance to the search term "awesome," ensuring you
// get all matching documents, with the most relevant ones listed first.

//working with indexes with seperate collection

db.products.insertMany([
  { title: "A Book", description: "This is awesome book about a young artist" },
  {
    title: "Red T-Shirt",
    description: "this T-Shirt is red and it's pretty awesome!"
  }
]);
// {
// 	"acknowledged" : true,
// 	"insertedIds" : [
// 		ObjectId("66c5b789428b533da76988fa"),
// 		ObjectId("66c5b789428b533da76988fb")
// 	]
// }
db.products.find();
// { "_id" : ObjectId("66c5b789428b533da76988fa"), "title" : "A Book", "description" : "This is awesome book about a young artist" }
// { "_id" : ObjectId("66c5b789428b533da76988fb"), "title" : "Red T-Shirt", "description" : "this T-Shirt is red and it's pretty awesome!" }
//creating text index
db.products.getIndexes();
// [ { "v" : 2, "key" : { "_id" : 1 }, "name" : "_id_" } ]
db.products.createIndexes({ description: "text" });
// 2024-08-21T15:18:32.330+0530 E QUERY    [thread1] Error: createIndexes first argument should be an array :
// DBCollection.prototype.createIndexes@src/mongo/shell/collection.js:624:1
// @(shell):1:1
db.products.createIndexe({ description: "text" });
// 2024-08-21T15:18:50.509+0530 E QUERY    [thread1] TypeError: db.products.createIndexe is not a function :
// @(shell):1:1
db.products.createIndex({ description: "text" });
// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
db.products.getIndexes()[
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
//perfroming text search
db.products.find({ $text: { $search: "awesome" } }).pretty();
/*
{
	"_id" : ObjectId("66c5b789428b533da76988fa"),
	"title" : "A Book",
	"description" : "This is awesome book about a young artist"
}
{
	"_id" : ObjectId("66c5b789428b533da76988fb"),
	"title" : "Red T-Shirt",
	"description" : "this T-Shirt is red and it's pretty awesome!"
}
*/

//find docs by using book as a text
db.products.find({ description: { $regex: "awesome" } });

// // { "_id" : ObjectId("66c5b789428b533da76988fa"), "title" : "A Book", "description" : "This is awesome book about a young artist" }
// { "_id" : ObjectId("66c5b789428b533da76988fb"), "title" : "Red T-Shirt", "description" : "this T-Shirt is red and it's pretty awesome!" }

db.products.find({ description: /awesom/i });
// { "_id" : ObjectId("66c5b789428b533da76988fa"), "title" : "A Book", "description" : "This is awesome book about a young artist" }
// { "_id" : ObjectId("66c5b789428b533da76988fb"), "title" : "Red T-Shirt", "description" : "this T-Shirt is red and it's pretty awesome!" }
// //searching with index
db.products.find({ $text: { $search: "book" } }).pretty();
// {
// 	"_id" : ObjectId("66c5b789428b533da76988fa"),
// 	"title" : "A Book",
// 	"description" : "This is awesome book about a young artist"
// }
// //searching for a specific phrases by wrapping phrase in double quotes and
//  since we are in double quotes we have to escape them with \ forward slash
//  db.products.find({$text:{$search:"\"awesome book"\"}}).pretty()
// // 2024-08-21T15:28:20.729+0530 E QUERY    [thread1] SyntaxError: illegal character @(shell):1:49
// db.products.find({$text:{$search:"\awesome book\"}}).pretty()
// // 2024-08-21T15:28:50.236+0530 E QUERY    [thread1] SyntaxError: unterminated string literal @(shell):1:33
// //what is  the correct query
// When performing a text search with MongoDB using a specific phrase, you need to ensure
// that the quotation marks within the search string are

// properly escaped. Here's the correct query:
db.products.find({ $text: { $search: '"awesome book"' } }).pretty();
/*
{
	"_id" : ObjectId("66c5b789428b533da76988fa"),
	"title" : "A Book",
	"description" : "This is awesome book about a young artist"
}
*/
// The \" is used to escape the double quotes within the string so that they are treated as
//  part of the search phrase rather than as the end of the string.

//**************************checking */
//checking whether index search or reqular seach if faster
//search using index ()
Explanation: db.products.getIndexes()[
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
db.products.explain("executionStats").find({ $text: { $search: "awesome" } });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.products",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$text" : {
				"$search" : "awesome",
				"$language" : "english",
				"$caseSensitive" : false,
				"$diacriticSensitive" : false
			}
		},
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "TEXT_MATCH",
				"planNodeId" : 3,
				"indexPrefix" : {
					
				},
							"indexName" : "description_text",
				"parsedTextQuery" : {
					"terms" : [
						"awesom"
					],
					"negatedTerms" : [ ],
					"phrases" : [ ],
					"negatedPhrases" : [ ]
				},
				"textIndexVersion" : 2,
				"inputStage" : {
					"stage" : "FETCH",
					"planNodeId" : 2,
					"inputStage" : {
							"stage" : "IXSCAN",
						"planNodeId" : 1,
						"keyPattern" : {
							"_fts" : "text",
							"_ftsx" : 1
						},
								"indexName" : "description_text",
															"isMultiKey" : true,
"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 2,
		"executionTimeMillis" : 4,
		"totalKeysExamined" : 2,
		"totalDocsExamined" : 2,


}
the resong isMultiKey:true because index ont he description field as a multikey index.

//REASON FOR 'isMultiKey:true" with TEXT INDEXES
> Text Indexes and Multikey Behavior: When you create a text index on a field, 
	mongoDB treats it as a multikey index internally. 
	This is because text indexes break down the text into indivudual terms or token.
	Each token is then indexed seperately, which is similar to how multikey indexes
	handle arrays where wach element is indexed individually.
	This alllows MongoDB to perform efficient searches for each term within the indexed text.

>Tokenization of Text Fields: The process of tokenizing the text (breaking it into words) is 
	what makes MongoDB treat the text index as multikey. Even though your documents do not 
	contain arrays, the text index itself is processed in a way that resembles the behavior 
	of multikey indexes.

IMPACT:
>>> This 'isMultiKey:true' flag doesnot negatively impact the performance or 
	correctness of your queries.
	It is simply an internl representation of how MongoDB handle text indexes.

So, in summary, the isMultiKey: true in your explain output is expected behavior for 
text indexes in MongoDB, and it occurs due to the way text data is tokenized and indexed.

*/
//now searching without index
db.products.dropIndexes();
// {
// 	"nIndexesWas" : 2,
// 	"msg" : "non-_id indexes dropped for collection",
// 	"ok" : 1
// }
db.products.getIndexes()[{ v: 2, key: { _id: 1 }, name: "_id_" }];
db.products
  .explain("executionStats")
  .find({ description: { $regex: "awesome" } });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.products",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"description" : {
				"$regex" : "awesome"
			}
		},
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "COLLSCAN",
				"planNodeId" : 1,
				"filter" : {
					"description" : {
						"$regex" : "awesome"
					}
				},
				"direction" : "forward"
			},
"executionStats" : {
				"executionSuccess" : true,
				"nReturned" : 2,
				"executionTimeMillis" : 1,
				"totalKeysExamined" : 0,
				"totalDocsExamined" : 2,
		
}
*/

//working on text indexes //************************************** */

db.movies.find().pretty();
/*
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	"id" : 1,
	"url" : "http://www.tvmaze.com/shows/1/under-the-dome",
	"name" : "Under the Dome",
	"type" : "Scripted",
	"language" : "English",
	"genres" : [
		"Drama",
		"Science-Fiction",
		"Thriller"
	],
	"status" : "Ended",
	"runtime" : 60,
	"premiered" : "2013-06-24",
	"officialSite" : "http://www.cbs.com/shows/under-the-dome/",
	"schedule" : {
		"time" : "22:00",
		"days" : [
			"Thursday"
		]
	},
	"rating" : {
		"average" : 6.5
	},
	"weight" : 91,
	"network" : {
		"id" : 2,
		"name" : "CBS",
		"country" : {
			"name" : "United States",
			"code" : "US",
			"timezone" : "America/New_York"
		}
	},
	"webChannel" : null,
	"externals" : {
		"tvrage" : 25988,
		"thetvdb" : 264492,
		"imdb" : "tt1553656"
	},
	"image" : {
		"medium" : "http://static.tvmaze.com/uploads/images/medium_portrait/0/1.jpg",
		"original" : "http://static.tvmaze.com/uploads/images/original_untouched/0/1.jpg"
	},
	"summary" : "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably
				 sealed off from the rest of the world by an enormous transparent dome. The town's 
				 inhabitants must deal with surviving the post-apocalyptic conditions while searching for 
				 answers about the dome, where it came from and if and when it will go away.</p>",
	"updated" : 1529612668,
	"_links" : {
		"self" : {
			"href" : "http://api.tvmaze.com/shows/1"
		},
		"previousepisode" : {
			"href" : "http://api.tvmaze.com/episodes/185054"
		}
	}
}
and manymore docs are there in the movies collection
*/
//createIndex on summary field to find the movies which are having investigations in the movie
db.movies.getIndexes()[{ v: 2, key: { _id: 1 }, name: "_id_" }];
db.movies.createIndex({ summary: "text" });

// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
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
    name: "summary_text",
    weights: {
      summary: 1
    },
    default_language: "english",
    language_override: "language",
    textIndexVersion: 3
  })
];
//using text index
db.movies
  .find(
    { $text: { $search: "investigations" } },
    { summary: 1, name: 1, language: 1 }
  )
  .pretty();

// {
// 	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"),
// 	"name" : "True Detective",
// 	"language" : "English",
// 	"summary" : "<p>Touch darkness and darkness touches you back. <b>True Detective</b>
// 				centers on troubled cops and the investigations that drive them to the edge.
// 				Each season features a new cast and a new case.</p>"
// // }
//********************************************** */
// in document i have created one text index, Now 1. i want to create one more text
// index on the same field and also 2.on the other fileds seperately how can i do???????????/

// In MongoDB, there are certain constraints regarding text indexes that you need to be aware of:
/*
1.Only ONE TEXT INDEX per Collection ***********************&&&&&&&&&
 MongoDb allows you to create only ""ONE TEXT INDEX PER COLLECTION"".
 This text index can cover multiple fields, but you CANNOT CREATE MULTIPLE
 seperate text indexes on the different fields or on the same field.

2. Creating a Composite Text Index:
 If you need to index multiple fields for text search, you should create a 
 COMPOSITE TEXT INDEX that includes all desired fields
 
 //createing composite text index
 */
db.movies.getIndexes()[{ v: 2, key: { _id: 1 }, name: "_id_" }];
db.movies.createIndex({ summary: "text" });
//  {
// 	 "numIndexesBefore" : 1,
// 	 "numIndexesAfter" : 2,
// 	 "createdCollectionAutomatically" : false,
// 	 "ok" : 1
//  }
//this index is created on entire summary field,if we search any one of the word from summary then it uses
//  this summary_text index. No need to create other index for seperate words to find.

//SUMMARY_TEXT index is applicable for all the word present in the summary field.

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
// {
// 	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
// 	"name" : "Under the Dome",
// 	"language" : "English",
// 	"summary" : "<p><b>Under the Dome</b> is the story of a small town that is suddenly and
// inexplicably sealed off from the rest of the world by an enormous transparent dome.
// The town's inhabitants must deal with surviving the post-apocalyptic conditions while
// searching for answers about the dome, where it came from and if and when it will go away.</p>"
// }
// Exact Phrase Search:>>>>>>>>>>>>>..

db.movies
  .find(
    { $text: { $search: '"touch darkness"' } },
    { summary: 1, name: 1, language: 1 }
  )
  .pretty();

//   {
// 	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"),
// 	"name" : "True Detective",
// 	"language" : "English",
// 	"summary" : "<p>Touch darkness and darkness touches you back. <b>True Detective</b> centers on troubled cops and the investigations that drive them to the edge. Each season features a new cast and a new case.</p>"
// }
///////////////////////////////////////////////////////////////////////
////  **************creating COMBINED TEXT INDEXES *************
db.movies.getIndexes()[{ v: 2, key: { _id: 1 }, name: "_id_" }];
db.movies.createIndex({
  summary: "text",
  name: "text",
  "rating.average": "text"
});
// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
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
// this is the index ihave created in that index rating,average is
//  a number type is it ok to create like that index??????????????*********************
/*
 Creating a text index on a field that contains numeric values, such 
 as "rating.average", is not recommended and typically doesn't provide 
 any meaningful benefit. Here's why:

 1.Text Indexing is for String Data:

	Text Indexes in MongoDB are designed specifically for fields that contain string data. 
	When you create a text index, MongoDB tokenizes the strings, stems the words (reducing 
	them to their root form), and then indexes those tokens to allow for efficient 
	full-text search.

	Numeric Fields like "rating.average" do not undergo this kind of processing, and including 
	them in a text index will not make numeric values searchable in a meaningful way through 
	text search.
Conclusion:
	Including a numeric field like "rating.average" in a text index is technically 
	possible, but it doesn’t provide any advantage and could lead to unnecessary 
	resource usage. It’s better to use text indexes only on fields that contain 
	textual data and create regular indexes for numeric fields when needed.
	
	
Better Approach:
	If you need to query or sort documents by numeric fields like "rating.average", 
	you should create a regular index on that field instead of including it in a text index.
	
*/
//which is faster
//  1.
db.products.explain("executionStats").find({ $text: { $search: '"awesome"' } });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.products",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$text" : {
				"$search" : "\"awesome\"",
				"$language" : "english",
				"$caseSensitive" : false,
				"$diacriticSensitive" : false
			}
		},
		"queryHash" : "AC3B536E",
		"planCacheKey" : "EBF5F32D",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "TEXT_MATCH",
				"planNodeId" : 3,
				"indexPrefix" : {
					
				},
				"indexName" : "description_text",
				"parsedTextQuery" : {
					"terms" : [
						"awesom"
					],
					"negatedTerms" : [ ],
					"phrases" : [
						"awesome"
					],
					"negatedPhrases" : [ ]
				},
				"textIndexVersion" : 2,
				"inputStage" : {
					"stage" : "FETCH",
					"planNodeId" : 2,
					"inputStage" : {
						"stage" : "IXSCAN",
						"planNodeId" : 1,
						"keyPattern" : {
							"_fts" : "text",
							"_ftsx" : 1
						},
						"indexName" : "description_text",
						"isMultiKey" : true,
"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 2,
								"executionTimeMillis" : 11,
		"totalKeysExamined" : 2,
		"totalDocsExamined" : 2,


*/
// 2.
db.products
  .explain("executionStats")
  .find({ description: { $regex: "awesome" } });
/*
{
	"explainVersion" : "2",
	"queryPlanner" : {
		"namespace" : "practice.products",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"description" : {
				"$regex" : "awesome"
			}
		},
		"queryHash" : "B91D450F",
		"planCacheKey" : "C31B509A",
		"maxIndexedOrSolutionsReached" : false,
		"maxIndexedAndSolutionsReached" : false,
		"maxScansToExplodeReached" : false,
		"winningPlan" : {
			"queryPlan" : {
				"stage" : "COLLSCAN",
				"planNodeId" : 1,
				"filter" : {
					"description" : {
						"$regex" : "awesome"
					}
				},
				"direction" : "forward"
			},
"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 2,
								"executionTimeMillis" : 1,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 2,
}
*/
db.products.getIndexes()[
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
// 1st query used indexScan and returned two docs and taken 11milliSeconds
// 2nd query used collectionScan, returned same two dos and taken 1 milliSecond of time
// then what is the use of text index here? and is collectionScan is faster than
// text index scan?
/*
Let's break down the results of your two queries and discuss the role of text indexes versus collection scans in MongoDB.

1. Text Index Scan vs Collection Scan
Text Index Scan:

Query: db.products.explain("executionStats").find({ $text: { $search: '"awesome"' } });
Index Used: description_text (text index)
Execution Time: 11 milliseconds
Docs Examined: 2
Keys Examined: 2
Stage: TEXT_MATCH followed by FETCH
Collection Scan:

Query: db.products.explain("executionStats").find({ description: { $regex: "awesome" } });
Index Used: None (full collection scan)
Execution Time: 1 millisecond
Docs Examined: 2
Keys Examined: 0
Stage: COLLSCAN
2. Why Text Index?
Text indexes are particularly useful in scenarios where you need to perform full-text 
search across large collections. They are optimized for:

Language processing: Handling stemming, tokenization, and language-specific 
rules (e.g., "running" would match "run").
Relevance ranking: MongoDB can score documents based on how relevant they 
are to the search terms.
Complex queries: You can search for multiple words, phrases, or combinations
 thereof.
3. Why Did the Collection Scan Appear Faster?
In this particular case, the collection scan appeared faster due to the 
small size of the dataset:

Small Dataset: The collection only had two documents, so scanning the entire 
collection was very quick.
No Index Overhead: The collection scan didn't need to interact with any index,
 reducing the overhead.
Cache Effects: MongoDB might have cached the data from previous queries, 
speeding up subsequent queries.
4. When is a Text Index Useful?
Text indexes shine in scenarios where:

Large Data Sets: When you have a large number of documents, a full collection
 scan would become prohibitively expensive.
Complex Searches: When performing more complex searches like looking for 
multiple words, phrases, or needing to rank results by relevance.
Scalability: As your data grows, text indexes can scale much better than 
a regex search, which would require scanning the entire collection.
5. Is Collection Scan Faster than Text Index?
Not necessarily. The collection scan was faster here due to the small size 
of the data set. However, in larger collections, the performance of a 
collection scan would degrade significantly, making the text index much 
faster and more efficient.

Conlusion:
Text indexs are essential for large-scale, complex full-text searches where 
	performance and relevance ranking are crucial
Collection scans might seems faster in small datsets, but they do not scale 
well and will become in efficient as your grows.

In summary, while the collection scan was faster in this tiny dataset, text 
indexes are far more beneficial for larger datasets and complex search 
queries.






*/
//******************** T E X T    I N D E X    &    S O R T I N G   ************ */

db.products.getIndexes();
[
  {
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
  }
];

db.products.find({ $text: { $search: "awesome T-Shirt" } }).pretty();
/*
{
	"_id" : ObjectId("66c5b789428b533da76988fa"),
	"title" : "A Book",
	"description" : "This is awesome book about a young artist"
}
{
	"_id" : ObjectId("66c5b789428b533da76988fb"),
	"title" : "Red T-Shirt",
	"description" : "this T-Shirt is red and it's pretty awesome!"
}

 //here we got two docs but the correct doc for our query is second one. 
this can be findout by using scores its reults on projection.
this is due to how MongoDB text search works. 

******* MongoDB's text search is designd to find the docs that CONTAIN ANY 
OF THE WORD SPECIFIED IN THE SEARCG STRING, RATHER THAN REQUIRING AN EXACT MATCH
FOR THE ENTIRE PHRASE.

*/
// Controlling Search Results

// If you want to return more relevant results or sort by relevance, you can:

// use SORT  $sort
db.products
  .find(
    { $text: { $search: "awesome T-Shirt" } },
    { score: { $meta: "textScore" } }
  )
  .sort({ score: { $meta: "textScore" } })
  .pretty();
/*
{
	"_id" : ObjectId("66c5b789428b533da76988fb"),
	"title" : "Red T-Shirt",
	"description" : "this T-Shirt is red and it's pretty awesome!",
	"score" : 1.7999999999999998
}
{
	"_id" : ObjectId("66c5b789428b533da76988fa"),
	"title" : "A Book",
	"description" : "This is awesome book about a young artist",
	"score" : 0.625
}

Two documents were returned because:

Text Search Behavior: The text search feature in MongoDB breaks down the 
	search phrase "awesome T-Shirt" into individual terms ("awesome" and 
	"T-Shirt") and searches for documents containing any of those terms.

Relevance Scoring: The documents are returned in the order of their 
	relevance scores. The second document was more relevant (score: 1.8) 
	because it contains both "T-Shirt" and "awesome," while the first 
	document had a lower relevance score (score: 0.625) because it only
 	contained "awesome."
*/
db.products.find({ $text: { $search: '"awesome T-Shirt"' } }).pretty();
//No document was returned because there is no matching element "awesome T-Shirt"
/*
Reasons for No Results:
Exact Match Requirement:
Phrase Searches: Require an exact match of the terms in the order specified. 
	If the phrase "awesome T-Shirt" does not appear exactly in any document's
	text field, no documents will be returned.
Hyphenation Issue: If the documents have "T-Shirt" written differently 
	(e.g., "T Shirt" without a hyphen or "awesome T-shirt" with a lowercase
	 "t"), the phrase search won’t match.
*/
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// TEXT INDEXING DETAILS
/*
Stemming: MongoDB text search may apply stemming and other lingustic transfermations.
	Howeve, in Phrase searched, it seeks the exact sequence as given in the 
	search string.
Case Sensitivity: Although MongoDB's text is case-insensitive, small variations
	in how words are stored(e.g., different punctuation or spacing) can cause phrase
	searched to fail.
*/
// Conclusion
// Non-Phrase Query: Returned both documents because both contained terms from your
// 	search string ("awesome" and/or "T-Shirt"), and they were ranked by
// 	relevance.
// Phrase Query: Returned no documents because there was no exact match for the
// 	phrase "awesome T-Shirt" in any of the documents.
db.products
  .find({ $text: { $search: "awesome" } }, { score: { $meta: "textScore" } })
  .sort({ score: { $meta: "textScore" } })
  .pretty();

/*{
	"_id" : ObjectId("66c5b789428b533da76988fa"),
	"title" : "A Book",
	"description" : "This is awesome book about a young artist",
	"score" : 0.625
}
{
	"_id" : ObjectId("66c5b789428b533da76988fb"),
	"title" : "Red T-Shirt",
	"description" : "this T-Shirt is red and it's pretty awesome!",
	"score" : 0.6
}
*/
db.products
  .find({ $text: { $search: "awesome" } }, { score: { $meta: "textScore" } })
  .sort({ score: { $meta: "textScore" } })
  .limit(1)
  .pretty();
// {
// 	"_id" : ObjectId("66c5b789428b533da76988fa"),
// 	"title" : "A Book",
// 	"description" : "This is awesome book about a young artist",
// 	"score" : 0.625
// }

///*************************************************************** */
//
//************ CALCULATING   T E X T   S C O R E     ************* */

// how can I calculate the text score for a given sentance can You explain?
// and with meta how to calculate
/*
Text scoring in mongoDB is a mechanism that ranks documents based on how well
they match a given text search query. 
The score is calculated using several factors, such as the frequency and location
of the serch terms within the text fields. 

HOW MONGODB CALCULTES Text SCORES:
MongoDB assign a text score to each document based on the following criteria

1.Term Frequency(TF);
	Defination: The number of times a search term appear in a document. 
	Imapct: Higher Frequency increases the score. 

	2.Invers Document Frequency(IDF):
	Defination: The uniqueness of a term across the entire collection. Rare terms
				have higher IDF, contributing more to the score. 
	
	Imapct: Terms that apper in a fewer documents are given more weight. 

3. Feild Boosting (Weights):
	Defination: Certain fields can be given more importance in the index . For 
				example, a term found in a title more contribute more to the 
				score than one found in the description. 
	Imapct: Feilds with higher weights have a greater influence on the score. 

4. Proximity of Terms:
	Defination: How close the terms are to each other in the document. Closer 
			Closer terms often result in higher scores. 
	Imact: Phrases with terms near each other are ranked higher.

5. Field Length Normlization:
	Defination: Normalizes the score by the length of the field. Longer fields 
			might dilute  the score. 
	Imact: Ensures that Longer documents dont automatically get higher scores.

EXAMPLE :
[
A,
	{
		"_id" : ObjectId("66c5b789428b533da76988fb"),
		"title" : "Red T-Shirt",
		"description" : "this T-Shirt is red and it's pretty awesome!"
	},
B,
	{
		"_id" : ObjectId("66c5b789428b533da76988fa"),
		"title" : "A Book",
		"description" : "This is an awesome book about a young artist"
	}
	
]

// for this query calculate score 

db.products.find(
	{ $text: { $search: "awesome T-Shirt" } }, 
	{ score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } }).pretty()
  
Understanding the Score Calculation:

1. Term Frequency(TF):
	If "awesome" and "T-Shirt" appear frequency in a document, that document
	will have a higher TF component in its score, because this terms are 
	used for serch in the query.

2.Invers Document Frequency (IDF):
	If "T-Shirt" is a common term across many documents, its contribution to the 
	score will be lessened. Conversely, if "awesome" is rare, it will contribute
	more to the score. 

3. Field Boosting(Weights): If the "description" field is weighted more in the text
	index, term found there will have a greater impact on the score. 

4.Proximity:
	If "awesome" and "T-Shirt" are found close together in the "description", 
	this will further boost the score for that document. 

Manual Calculation Example:
given:
Document A: "description": "This T-Shirt is awesome! "
Document B: "description": "An awesome book about T-Shirts."

Assume:

TF("awesome")= 1 for both A and B
TF ("T-Shirt") = 1 for both A and B
IDF("awesome") = 0.5 less inique
IDF("T-Shirt") = 0.8 more unique
Document A scores:

TF("awesome")*IDF("awesome") + TF ("T-Shirt")*IDF("T-Shirt")= 

1*0.5 + 1*0.5 = 1.3

Document B scores:

TF("awesome")*IDF("awesome") + TF ("T-Shirt")*IDF("T-Shirt")= 

1*0.5 + 1*0.5 = 1.3

In this example, both documents have the same score (1.3). In practice, 
MongoDB's scoring is more complex and accounts for other factors like 
proximity and normalization, which would likely result in different scores.

Conclusion:
Text scoring is a powerful tool for ranking search results based on 
relevance. While MongoDB calculates it automatically using a combination 
of TF-IDF, field boosting, and proximity, understanding the basics can 
help you better design your queries and indexes to get the most relevant
results.


How to Use $meta to Access the Score:
The $meta operator in MongoDB allows you to include the text score in your 
query results:

db.products.find(
  { $text: { $search: "awesome T-Shirt" } }, 
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } }).pretty()

$meta: "textScore": This adds the text score to each returned document.

sort({ score: { $meta: "textScore" } }): Sorts the documents by their 
relevance score in descending order.

Example 2;
//for pur products docs
db.products.find(   { $text: { $search: "awsome book red this" } },    { score: { $meta: "textScore" } } ).sort({ score: { $meta: "textScore" } }).pretty()
Steps to Calculate Scores (Simplified):
Check Term Presence in Documents:

Document A:

"awsome": Not present.
"book": Present.
"red": Not present.
"this": Present.
Document B:

"awsome": Not present.
"book": Not present.
"red": Present.
"this": Present.
Assign Term Frequencies (TF):

Document A:
"book": 1 occurrence.
"this": 1 occurrence.
Total terms matched = 2.
Document B:
"red": 1 occurrence.
"this": 1 occurrence.
Total terms matched = 2.
Resulting Scores (Simplified):
Document A:

Matches "book" and "this."
Score = TF * IDF for "book" + TF * IDF for "this."
Simplified Score = 1 (for "book") + 1 (for "this") = 2.
Document B:

Matches "red" and "this."
Score = TF * IDF for "red" + TF * IDF for "this."
Simplified Score = 1 (for "red") + 1 (for "this") = 2.

Without actual database output, exact scores can't be calculated 
manually, but the procedure above outlines how MongoDB might rank 
them similarly, with a potential slight edge for Document A if term 
proximity or stemming is considered.
*/

////////////
[
  {
    _id: ObjectId("66c5b789428b533da76988fa"),
    title: "A Book",
    description: "This is awesome book about a young artist"
  },
  {
    _id: ObjectId("66c5b789428b533da76988fb"),
    title: "Red T-Shirt",
    description: "this T-Shirt is red and it's pretty awesome!"
  }
];

//using text index to exlcude word
//
// In MongoDB, if you want to exclude specific words from being matched or
// indexed by a text index, you generally have two approaches:
db.products.find({ $text: { $search: "awesome -book" } });
// { "_id" : ObjectId("66c5b789428b533da76988fb"), "title" : "Red T-Shirt", "description" : "this T-Shirt is red and it's pretty awesome!" }
db.products.find({ $text: { $search: "young-awesome" } }).pretty();
/*
{
	"_id" : ObjectId("66c5b789428b533da76988fa"),
	"title" : "A Book",
	"description" : "This is awesome book about a young artist"
}
{
	"_id" : ObjectId("66c5b789428b533da76988fb"),
	"title" : "Red T-Shirt",
	"description" : "this T-Shirt is red and it's pretty awesome!"
}
*/
//
//I wrote the above query to find the docs which does not have the book word

//but its print the docs which has book, becasue the query syntax is wrong
//for the above written query
//when you searcg for "young-awesome",mongodb searches for documents that
//  either "young" or "awesome"
// Therefore, both documents are returned because:
//	 The first document contains "young" and "awesome".
// 	The second document contains "awesome"

//then the correct query is
db.products.find({ $text: { $search: "young -awesome" } }).pretty();
//no docment was print because no docs are present with only young as the word
//and without awesome

//

//SETTING THE DEFAULT LANGUAGES & using WEIGHTS
db.products.dropIndexes();
// {
// 	"nIndexesWas" : 2,
// 	"msg" : "non-_id indexes dropped for collection",
// 	"ok" : 1
// }
db.products.getIndexes()[{ v: 2, key: { _id: 1 }, name: "_id_" }];
db.products.createIndex({
  title: "text",
  description: "text",
  defualt_language: "English"
});
/*
{
	"ok" : 0,
	"errmsg" : "Error in specification { key: { title: \"text\", description: \"text\", defualt_language: \"English\" }, name: \"title_text_description_text_defualt_language_English\" } :: caused 
			by :: Unknown index plugin 'English'",
	"code" : 67,
	"codeName" : "CannotCreateIndex"
}
The error you encountered is due to a typo in your index creation command. 
Specifically, the field name default_language is misspelled 
as defualt_language in your command. Additionally, 
default_language is not a part of the key 

>>>>>specification when creating the text index; it should be part of 
the options for the index.

*/
db.products.createIndex(
  { title: "text", description: "text" },
  { default_language: "English" }
);

// {
// 	"ok" : 0,
// 	"errmsg" : "An equivalent index already exists with a different name and options. Requested index: { v: 2, key: { _fts: \"text\", _ftsx: 1 }, name: \"title_text_description_text\", default_language: \"English\", weights: { description: 1, title: 1 }, language_override: \"language\", textIndexVersion: 3 }, existing index: { v: 2, key: { _fts: \"text\", _ftsx: 1 }, name: \"description_text\", weights: { description: 1 }, default_language: \"english\", language_override: \"language\", textIndexVersion: 3 }",
// 	"code" : 85,
// 	"codeName" : "IndexOptionsConflict"
// }
db.products.dropIndexes();
// {
// 	"nIndexesWas" : 2,
// 	"msg" : "non-_id indexes dropped for collection",
// 	"ok" : 1
// }
db.products.createIndex(
  { title: "text", description: "text" },
  { default_language: "English" }
);
/*
{
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"createdCollectionAutomatically" : false,
	"ok" : 1
}
*/
//finding the weights of specified word from documents
db.products
  .find({ $text: { $search: "Red" } }, { score: { $meta: "textScore" } })
  .pretty();
// {
// 	"_id" : ObjectId("66c5b789428b533da76988fb"),
// 	"title" : "Red T-Shirt",
// 	"description" : "this T-Shirt is red and it's pretty awesome!",
// 	"score" : 1.2666666666666666
// }
db.products
  .find(
    { $text: { $search: "Red-awesome" } },
    { score: { $meta: "textScore" } }
  )
  .pretty()[
  ({
    _id: ObjectId("66c5b789428b533da76988fb"),
    title: "Red T-Shirt",
    description: "this T-Shirt is red and it's pretty awesome!",
    score: 1.8666666666666667
  },
  {
    title: "A Book",
    _id: ObjectId("66c5b789428b533da76988fa"),
    description: "This is awesome book about a young artist",
    score: 0.625
  })
];
db.products
  .find(
    { $text: { $search: "young-awesome" } },
    { score: { $meta: "textScore" } }
  )
  .pretty()[
  ({
    _id: ObjectId("66c5b789428b533da76988fa"),
    title: "A Book",
    description: "This is awesome book about a young artist",
    score: 1.25
  },
  {
    _id: ObjectId("66c5b789428b533da76988fb"),
    title: "Red T-Shirt",
    description: "this T-Shirt is red and it's pretty awesome!",
    score: 0.6
  })
];
////******************************** */
//What is the use of WEIGHTS in mongodb indexes
// IN mongodb, weights in text indexes are used to influence the relevance
// score of documents during a text search.
// By assgning different fields, you can control the importance of specific
// fields in the serch results.

// Use Cases:
// Prioritizing Important Fields: For example, in an e-commerce database,
// 	you might want the productName field to be more significant than the
// 	productDescription field.

// Fine-Tuning Search Results: Weights allow you to fine-tune how documents
// 	are ranked in search results, improving the relevance of returned
// 	documents.

//Final note
// >> Weights must be specified at the time of index creation; they cannot
// 		be changed later without dropping and rereating the index.
//>> Fields with higher wights will dominated the text search results, so use
// 		this feature carefully to avoid oveshadowing other relevant fields.

db.products.find().pretty();
[
  ({
    _id: ObjectId("66c5b789428b533da76988fa"),
    title: "A Book",
    description: "This is awesome book about a young artist"
  },
  {
    _id: ObjectId("66c5b789428b533da76988fb"),
    title: "Red T-Shirt",
    description: "this T-Shirt is red and it's pretty awesome!"
  },
  {
    _id: 1,
    title: "MongoDB Guide",
    description: "A comprehensive guide to MongoDB."
  },
  {
    _id: 2,
    title: "Database Management",
    description:
      "This book covers various database management systems, including MongoDB."
  })
];
//weights in practics
//create a text index that is used to  searches to prioritize matches in the "title" over the "description"field
db.products.createIndex(
  { title: "text", description: "text" },
  { weights: { title: 10, description: 2 } }
);
/*
{
	"ok" : 0,
	"errmsg" : "An equivalent index already exists with the same name but 
	different options. Requested index: { v: 2, key: { _fts: \"text\", _ftsx: 1 },
	 name: \"title_text_description_text\", weights: { description: 2, title: 10 }, 
	 default_language: \"english\", language_override: \"language\", textIndexVersion: 3 }, 
	 existing index: { v: 2, key: { _fts: \"text\", _ftsx: 1 }, 
	 name: \"title_text_description_text\", default_language: \"English\", 
	 weights: { description: 1, title: 1 }, language_override: \"language\", 
	 textIndexVersion: 3 }",
	"code" : 85,
	"codeName" : "IndexOptionsConflict"
}
*/

db.products.dropIndexes();
// {
// 	"nIndexesWas" : 2,
// 	"msg" : "non-_id indexes dropped for collection",
// 	"ok" : 1
// }
//create iNdex with added weights >>>>>>>>>>>>>>>>>>>>>>>>>>>>
db.products.createIndex(
  { title: "text", description: "text" },
  { weights: { title: 10, description: 2 } }
);
// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
db.products.getIndexes()[
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
    name: "title_text_description_text",
    weights: {
      description: 2,
      title: 10
    },
    default_language: "english",
    language_override: "language",
    textIndexVersion: 3
  })
];
/*
Explanation:

	title: 10: The title field is given a weight of 10, making it 5 times 
				more important than the description field.
	description: 2: The description field is given a lower weight of 2.

Impact on Search:
*/
// When you perform a text search on this collection:
db.products.find(
  { $text: { $search: "MongoDB" } },
  { score: { $meta: "textScore" } }
);
db.products
  .find({ $text: { $search: "MongoDB" } }, { score: { $meta: "textScore" } })
  .pretty()[
  ({
    _id: 2,
    title: "Database Management",
    description:
      "This book covers various database management systems, including MongoDB.",
    score: 1.125 //////////////////////////////////////////////
  },
  {
    _id: 1,
    title: "MongoDB Guide",
    description: "A comprehensive guide to MongoDB.",
    score: 8.833333333333334 //////////////////////////////////////////////
  })
];
// A document with the search term "MongoDB" in the title will score higher than
// a document with "MongoDB" only in the description, due to the higher weight
// assigned to title

//now create index without weight>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

db.products.dropIndexes();
// {
// 	"nIndexesWas" : 2,
// 	"msg" : "non-_id indexes dropped for collection",
// 	"ok" : 1
// }
db.products.createIndex({ title: "text", description: "text" });
// {
// 	"numIndexesBefore" : 1,
// 	"numIndexesAfter" : 2,
// 	"createdCollectionAutomatically" : false,
// 	"ok" : 1
// }
db.products.getIndexes()[
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
    name: "title_text_description_text",
    weights: {
      description: 1,
      title: 1
    },
    default_language: "english",
    language_override: "language",
    textIndexVersion: 3
  })
];
db.products
  .find({ $text: { $search: "MongoDB" } }, { score: { $meta: "textScore" } })
  .pretty()[
  ({
    _id: 2,
    title: "Database Management",
    description:
      "This book covers various database management systems, including MongoDB.",
    score: 0.5625 /////////////////////////////////////////////////
  },
  {
    _id: 1,
    title: "MongoDB Guide",
    description: "A comprehensive guide to MongoDB.",
    score: 1.4166666666666665 ///////////////////////////////////////////////
  })
];

// UPTO NOW WE LEARNT IN THIS PDF ARE
/*
1. How to insert documents
	a.insertOne()
	b.insertMany()
	c.insert()>>>>>>>>>>>>. Considered a more general and slightly older method, sometimes seen in legacy code.

2. work READ operators
	i.find Docs with dot notation if docs has fields inside objects & in arrays
	ii. uing  $size operator(if i want ot find the docs which have 
		exact no of elements in it like 
		db.collection.aggregate([{$project:{fieldName:1, length:{$size:"$arrayFieldName"}}},{$match:{length:{$gte:3}}}]) )
	iii. with field names,$all,$in, $expr, with logical operators $or,$and(meet the condition in different fields or different objects), 
	, $elemMatch(to meet the condition in one object or field),
	  ex:db.movies
  				.find({ genres: "Drama" }, { genres: { $elemMatch: { $eq: "Horror" } } })
  				.pretty();
	$slice operator>>> print only 2 elements in the array of any one of the field
	ex: db.movies
  	.find(
  	 	 { "rating.average": { $gt: 8 } },
   	 	{ genres: { $slice: 2 }, genres: 1, rating: 1 }
  	).pretty()

3.getting data from one db1 to db2
		db.collection.aggregate([{$match:{}},{$out:{dbName:"db1", coll:"collectionName"}}])
4.about dataScursor

5. $(positional projectional operator):it is a feature in MongoDB that allows you to return only the first 
		matching element from an array field that matches the query criteria. It's useful when you want to 
		retrieve specific elements from an array but don't want the entire array returned.
		
		ex:  "genres.$": 1>>include only the first element in the genres array that matches the query condition."
db.movies
  .find({ genres: { $all: ["Drama", "Thriller"] } }, { "genres.$": 1 })
  .pretty();
		//

6.update methods
*/
//to transfer the data from one db to another db

db.movies.aggregate([
  { $match: {} }, // Optionally apply filters or other aggregation stages here
  { $out: { db: "practice", coll: "movies" } } // Correct 'db' and 'coll' syntax
]);
/*
The $out stage in MongoDB replaces the target collection with the results of the 
aggregation pipeline. It does not merge the new documents with the existing ones
in the target collection.

Merging Data Instead of Replacing:
If you want to merge the documents from db1.movies into practice.movies 
without replacing the existing documents, $out is not suitable. 
Instead, you can:

Export and Import: Use mongoexport and mongoimport commands to export data from
db1.movies and import it into practice.movies.

Manual Insertion: Use an aggregation or find query to get the documents 
from db1.movies and then insert them into practice.movies using insertMany().

example;
use db1;
Step 1: Fetch Documents from db1.movies

var newDocs = db.movies.find().toArray();  // Fetch all documents from db1.movies

Step 2: Insert into practice.movies
use practice;
db.movies.insertMany(newDocs);  // Insert the fetched documents into practice.movies

This approach will merge the documents, retaining both the existing 5 documents 
and adding the 21 new ones, resulting in a total of 26 documents.
Summary:
$out stage will replace the target colletion documents, it will not merge
To merge the docs with target collection docs you need to use insertMany()
or similar methods after retrieving the docs from the source.

*/
///************************* NUMBERS ************************* */
db.createCollection("numbers");
//{ "ok" : 1 }
// working with int32
db.numbers.insertOne({ name: "Max", age: 29 });
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfc709aa88a186f9fdf2ae")
// }
//find the size of the memorry after inserting the name and age>>
// for this use db.collection().stats
// db.numbers.stats;
//>>>>>>>>>. which  is wrong
db.numbers.stats();
// {
// 	"ns" : "practice.numbers",
// 	"size" : 49,
// 	"count" : 1,
// 	"avgObjSize" : 49,
// 	"numOrphanDocs" : 0,
// 	"storageSize" : 20480,
// 	"freeStorageSize" : 0,
// 	"capped" : false,}
// size is 42 that is without Int32
//Now create document with Int32
db.numbers.deleteMany({});
// { "acknowledged" : true, "deletedCount" : 1 }
//creating user with int32
db.numbers.insertOne({ name: "Max", age: NumberInt(29) });
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfc8e9aa88a186f9fdf2af")
// }
db.numbers.findOne();
// { "_id" : ObjectId("66cfc8e9aa88a186f9fdf2af"),
// "name" : "Max",
// "age" : 29
// }
//check size
db.numbers.stats();
// {
// "ns" : "practice.numbers",
// "size" : 45,
// "count" : 1,
// "avgObjSize" : 45,
// "numOrphanDocs" : 0,
// 	"storageSize" : 24576,
// "freeStorageSize" : 4096,
// "capped" : false,
// "wiredTiger" : {
//   "metadata" : {
//     "formatVersion" : 1
//   },

// size decreased
// size decreased is you observe above results the size taken to store
// the number is taken 49 without  Int32, and with Int32 it is taken 45.
//  But with Int32 storageSize is 24576 which is more than number storage
//  without Int32 (storageSize:20480). why it is like that? actually the
//  storage size has to be low for storing a number with Int32 storage rigth?

/*
The behavior  is related to how mongonDB manages the storage at the collection
level, not just at the document level.
1.Document Size vs. Storage Size:

The document size refers to the actual size of the BSON document stored in
 MongoDB, which decreases when you use NumberInt(29) instead of a regular
number because NumberInt is a 4-byte integer, while a regular number (which
is stored as a double in BSON) takes 8 bytes.

The storage size, on the other hand, refers to the amount of disk space
allocated by MongoDB for storing the collection's data. This is not a
simple sum of all document sizes; it includes padding, space for indexes,
 and other internal overhead.

2.Why the Storage Size Increased:

Padding Factor: When you insert a document, MongoDB may allocate additional space in
 anticipation of future document growth, especially in non-capped collections. 
 This is known as a padding factor.

WiredTiger Storage Engine: If you're using the WiredTiger storage engine,
 it manages data in chunks called "extents," and it might allocate space in
  larger chunks as the collection grows, regardless of the actual document 
  sizes. The storage engine might also reserve space for internal data structures 
  and handling of potential updates.

 Why Document Size Decreased but Storage Size Increased:

The reduction in document size due to using NumberInt doesn’t necessarily
 lead to a reduction in the overall storage size, because storage size 
 accounts for more than just the raw document data. Other factors like 
 preallocated space and the behavior of the storage engine influence it.
  When documents are smaller, MongoDB might still allocate the same or 
  even more space at the collection level, leading to what you observed.

  In summary, even though the document size decreased when you used NumberInt,
   the storage size might have increased due to the way MongoDB allocates
    and manages storage at the collection level, not just based on
     individual document sizes.
     */

//WORKING WITH NUMBER INT 64 *****************************************
db.numbers.insertOne({ name: "Max", valuation: NumberInt("5000000000") });
// {
// "acknowledged" : true,
// "insertedId" : ObjectId("66cfda13aa88a186f9fdf2b2")
// }
db.numbers.find();
// { "_id" : ObjectId("66cfda13aa88a186f9fdf2b2"), "name" : "Max", "valuation" : 705032704 }
db.numbers.insertMany([
  { name: "withString", valuation: "5000000000" },
  { name: "normalInsert", valuation: 5000000000 }
]);
// {
// 	"acknowledged" : true,
// 	"insertedIds" : [
// 		ObjectId("66cfda7aaa88a186f9fdf2b3"),
// 		ObjectId("66cfda7aaa88a186f9fdf2b4")
// 	]
// }
db.numbers.find()[
  ({
    _id: ObjectId("66cfda13aa88a186f9fdf2b2"),
    name: "Max",
    valuation: 705032704
  },
  {
    _id: ObjectId("66cfda7aaa88a186f9fdf2b3"),
    name: "withString",
    valuation: "5000000000"
  },
  {
    _id: ObjectId("66cfda7aaa88a186f9fdf2b4"),
    name: "normalInsert",
    valuation: 5000000000
  })
];

// IF U INSERT AN INTEGER WITHOUT SPECIFYING ITS TYPE, MONGODB WILL STORE
// IT AS A DOUBLE BY DEFAULT **************************

//To explisitely storean inter as int32 or int64 u can use NumberInt() for int32
// or NumberLong() for int64

//because of that reason only the last integer is storing without any combursome
//if u store a number with string then we can store it for any long integer but
// we cannot do any mathematical operations on that numbers

// But,
// if yuo observe  for number we were stored with int32 bit integer
//actual storage number NumberInt("5000 0000 000") but it is storing as 705032704(whcih is random or garbage value)
// this is because the maximum value of int32 bit is
/*
1. int32
Maximum value: 2,147,483,647 (2^31 - 1)
Minimum value: -2,147,483,648 (-2^31)

2. int64
Maximum value: 9,223,372,036,854,775,807 (2^63 - 1)
Minimum value: -9,223,372,036,854,775,808 (-2^63)

3. double (64-bit)
Maximum value: Approximately 1.7976931348623157 × 10^308
Minimum value: Approximately -1.7976931348623157 × 10^308
Smallest positive value: Approximately 4.9406564584124654 × 10^-324

4. double (128-bit) (Quadruple-precision floating point)
Maximum value: Approximately 1.18973149535723176508575932662800702 × 10^4932
Minimum value: Approximately -1.18973149535723176508575932662800702 × 10^4932
Smallest positive value: Approximately 3.36210314311209350626267781732175260 × 10^-4932

Notes:
int32 and int64 are used for integers, with specific bit lengths 
determining their ranges.

double (64-bit) is a common floating-point format in most programming 
    languages, including MongoDB for storing numbers by default.
double (128-bit) is not typically used in MongoDB but is used in 
    certain specialized applications where higher precision is required 
*/
//inserting with int64(Long);
db.numbers.insertMany([
  { name: "with Int32", number: NumberInt("5000000000") },
  { name: "with Int64", number: NumberLong("5000000000") }
]);
//  {
//    "acknowledged" : true,
//    "insertedIds" : [
//      ObjectId("66cfdec1aa88a186f9fdf2b6"),
//      ObjectId("66cfdec1aa88a186f9fdf2b7")
//    ]
//  }
db.numbers.find()[
  ({
    _id: ObjectId("66cfdec1aa88a186f9fdf2b6"),
    name: "with Int32",
    number: 705032704
  },
  {
    _id: ObjectId("66cfdec1aa88a186f9fdf2b7"),
    name: "with Int64",
    number: NumberLong("5000000000")
  })
];

//now insert a highest posible int32 number
db.numbers.insertOne({
  name: "highest possible int32 number",
  number: NumberInt("2147483647")
});
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfe04eaa88a186f9fdf2b9")
// }
db.numbers.find()[
  {
    _id: ObjectId("66cfe04eaa88a186f9fdf2b9"),
    name: "highest possible int32 number",
    number: 2147483647
  }
];
//now add a number which is more than int32 maximum number
db.numbers.insertOne({
  name: "number More than int32",
  number: NumberInt("2147483648")
});
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfe0bfaa88a186f9fdf2ba")
// }
db.numbers.find()[
  ({
    _id: ObjectId("66cfe04eaa88a186f9fdf2b9"),
    name: "highest possible int32 number",
    number: 2147483647
  },
  {
    _id: ObjectId("66cfe0bfaa88a186f9fdf2ba"),
    name: "number More than int32",
    number: -2147483648
  })
];
//if we increase the number which is more than maximum value, then it traveses to the negative value

//hence storing a bigger value is not good using int32 bit
db.numbers.insertOne({
  name: "store with int64",
  number: NumberLong("2147483648")
});
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfe2f6aa88a186f9fdf2bb")
// }

//NOW STORE THE NUMBER int32
db.numbers.find();
// { "_id" : ObjectId("66cfe04eaa88a186f9fdf2b9"), "name" : "highest possible int32 number", "number" : 2147483647 }
// { "_id" : ObjectId("66cfe0bfaa88a186f9fdf2ba"), "name" : "number More than int32", "number" : -2147483648 }
// { "_id" : ObjectId("66cfe2f6aa88a186f9fdf2bb"), "name" : "store with int64", "number" : NumberLong("2147483648") }
//the number is stored as it is as we inserted using int 64
db.numbers.insertOne({
  name: "maximum int64 integer",
  number: NumberLong(9223372036854775807)
});
// 2024-08-29T08:31:42.362+0530 E QUERY    [thread1] Error: number passed to NumberLong must be representable as an int64_t :
// got error eventhough the number is in the accepted range,
//The problem is that this provided number is too big becase its a double
// so to store without any error wrapped this number quotations
db.numbers.insertOne({
  name: "maximum int64 integer",
  number: NumberLong("9223372036854775807")
});
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfe45daa88a186f9fdf2bd")
// }
db.numbers.find()[
  ({
    _id: ObjectId("66cfe04eaa88a186f9fdf2b9"),
    name: "highest possible int32 number",
    number: 2147483647
  },
  {
    _id: ObjectId("66cfe0bfaa88a186f9fdf2ba"),
    name: "number More than int32",
    number: -2147483648
  },
  {
    _id: ObjectId("66cfe2f6aa88a186f9fdf2bb"),
    name: "store with int64",
    number: NumberLong("2147483648")
  },
  {
    _id: ObjectId("66cfe45daa88a186f9fdf2bd"),
    name: "maximum int64 integer",
    number: NumberLong("9223372036854775807")
  })
];

// DOING MATHS WITH FLOATS INT32 AND INT64

db.numbers.insertOne({ name: "Max", account: "49718979795729875445452" });
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfe7f6aa88a186f9fdf2be")
// }
db.numbers.find();
// { "_id" : ObjectId("66cfe7f6aa88a186f9fdf2be"), "name" : "Max", "account" : "49718979795729875445452" }

//storing a number like a string(i.e using "" marks) we can store as much
// bigger as we can, but WE CANNOT DO MATHEMATICAL CALCULATIONS ON IT
//for exxample
db.numbers.insertOne({ name: "Max", money: "10" });
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfe8e0aa88a186f9fdf2bf")
// }
// now increase the money of max by 5 rupees
db.numbers.updateOne({ name: "Max" }, { $inc: { money: 5 } });
// 2024-08-29T08:51:28.288+0530 E QUERY    [thread1] WriteError: Cannot apply $inc to a value of non-numeric type. {_id: ObjectId('66cfe8e0aa88a186f9fdf2bf')} has the field 'money' of non-numeric type string :
// WriteError({
// 	"index" : 0,
// 	"code" : 14,
// 	"errmsg" : "Cannot apply $inc to a value of non-numeric type. {_id: ObjectId('66cfe8e0aa88a186f9fdf2bf')} has the field 'money' of non-numeric type string",
// 	"op" : {
// 		"q" : {
// 			"name" : "Max"
// 		},
// 		"u" : {
// 			"$inc" : {
// 				"money" : 5
// 			}
// 		},
// 		"multi" : false,
// 		"upsert" : false
// 	}
// })
db.numbers.insertOne({ name: "Max", account: 10 });
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfe9e3aa88a186f9fdf2c0")
// }
//increase account by 10
db.numbers.updateOne({ name: "Max" }, { $inc: { account: 5 } });
// { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
db.numbers.find();
// { "_id" : ObjectId("66cfe9e3aa88a186f9fdf2c0"), "name" : "Max", "account" : 15 }
// operations we can made

db.numbers.insertOne({ a: 0.3, b: 0.1 });
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfecd8aa88a186f9fdf2c2")
// }
db.numbers.find();
// { "_id" : ObjectId("66cfecd8aa88a186f9fdf2c2"), "a" : 0.3, "b" : 0.1 }

db.numbers.aggregate([{ $project: { result: { $subtract: ["$a", "$b"] } } }])[
  { _id: ObjectId("66cfecd8aa88a186f9fdf2c2"), result: 0.19999999999999998 }
];
//actual result a-b is 0.2 but it resluted another value
// The issue you're encountering is due to how floating-point arithmetic works
//  in most programming languages and databases, including MongoDB.
// Although MongoDB uses 64-bit double precision to store numbers, this does
// not guarantee exact precision for all decimal numbers.

db.numbers.aggregate([{ $project: { result: { $sum: ["$a", "$b"] } } }]);
// { "_id" : ObjectId("66cfecd8aa88a186f9fdf2c2"), "result" : 0.4 }
//

/// WORKING WITH DCIMAL 128 BIT

//insert a number that will use high precision double
db.numbers.insertOne({ a: NumberDecimal("0.3"), b: NumberDecimal("0.1") });
// {
// 	"acknowledged" : true,
// 	"insertedId" : ObjectId("66cfeb45aa88a186f9fdf2c1")
// }
db.numbers.find().pretty();
// {
// 	"_id" : ObjectId("66cfeb45aa88a186f9fdf2c1"),
// 	"a" : NumberDecimal("0.3"),
// 	"b" : NumberDecimal("0.1")
// }
db.numbers
  .aggregate([{ $project: { result: { $subtract: ["$a", "$b"] } } }])
  .pretty();
// {
// 	"_id" : ObjectId("66cfeb45aa88a186f9fdf2c1"),
// 	"result" : NumberDecimal("0.2")
// }
/// here we got exact number decimal value
// Now if we want this for Long and integer we can use NumberDecimal for all
// kind of  operations
