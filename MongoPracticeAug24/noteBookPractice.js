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
Purpose: Specifically designed to insert multiple documents into a collection in a single operation.
Behavior: Accepts an array of documents and inserts them all at once.
Return Value: Returns an InsertManyResult object that includes an array of _ids for the inserted documents and
 an acknowledged flag.
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
//The error occurs because the $size operator in MongoDB expects a number, not a query. You cannot use comparison operators like $gte directly within $size.
//If you want to find documents where the hobbies array has a length of 3 or more, you'll need to do this in two steps:
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
//will only match documents where the genres array is exactly ["Action", "Thriller"] in that specific order and with no other elements in the array.

//If the genres field in a document is ["Thriller", "Action"] or ["Action", "Thriller", "Drama"], it will not match because the order or the number of elements differs.
//To Find Documents with Exactly "Action" and "Thriller" in Any Order:
//use $all operator to overcome order in the array while finding the documents

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
//we want  THE DOCUMENTS WHICH ONLY show the  DRAMA as its element and others dont want show for this we can use .$ operator

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
query criteria. It's useful when you want to retrieve specific elements from an array but don't want the entire array returned.

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
but in the genres array I have  "genres" : [
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
This query is incorrectly formatted due to having two projection objects separated by a comma. MongoDB expects only one projection object.
This would throw an error in MongoDB because you cannot have multiple projection objects in the same query.
3. Query 3:
javascript
Copy code
db.movies.find({"rating.average": {$gt: 8}}, {genres: {$slice: [1, 2]}}).pretty()
What it does:
Filters documents where rating.average is greater than 8.
In the projection, it returns:
The genres array, but starts slicing from index 1 (second element) and returns 2 elements. So, if genres is ["Drama", "Action", "Thriller"], the output would be ["Action", "Thriller"].
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

The $ne operator works fine for fields that are not arrays or if you want to match against the whole array. However, when dealing with arrays, the query needs to handle the array elements properly.
Matching with $exists and $ne:

When you use $ne to check for the absence of an element in an array field, it does not work as expected because MongoDB's query language matches documents where the entire array does not match the condition,
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
//TILL NOW WE HAVE LEARNT IN UPDAATE OPERATORS OF
// UPDATING SINGLE FIELD
// UPDATING MULTIPLE FIELDS
// UPDATING THE DOCUMENTS WHICH DOESNOT HAVE SOME SPECIFIC FIELDS

//UPDATING THE DOCUMENTS WITHOUT OVERWRITTEN FOR THAT WE NEED TO USE $exists operator
// if you want overwrite the field value use specific document update method

// UPDATING THE DOCUMENTS BASED ON SPECIFIED CONDITION LIKE IF FIELD HAS SOME VALUE FOR THEM ONLY ADD SOME SPECIFIC FIELDS
//      AND WHICH DOES NOT HAVE SOME QUALITIES FOR THEM ADD SOME OTHER FIELDS
// UPDSTING THE SINGLE DOCUMENT BY STORING THE VALUE OF UNFIELDS DOCUMENT
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

//************************************************************ */
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
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 31 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 32 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0") }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1") }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : -3 }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : -3 }
*/
//ADD THE AGE FIELD WHOSE DOCUMENT DOESNOT HAVE

db.users.find({ age: { $exists: false } }, { age: 1 }).pretty();
/*
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0") }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1") }
*/
db.users.updateMany({ age: { $exists: false } }, { $set: { age: 35 } });
// { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
db.users.find({}, { age: 1 }).pretty();
/*
{ "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "age" : 31 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744de"), "age" : 46 }
{ "_id" : ObjectId("66bc16d23d6802bbff2744df"), "age" : 32 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e0"), "age" : 35 }
{ "_id" : ObjectId("66bc1a633d6802bbff2744e1"), "age" : 35 }
{ "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "age" : 90 }
{ "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "age" : -3 }
{ "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "age" : -3 }
*/
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
/*
 {
	"_id" : ObjectId("66bd73baaf3abccac1c4a1cb"),
	"name" : "Dean",
	"age" : 20
}
*/
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
// it will work for lated mongodb versions of mongoshell
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

// The document is not being inserted because of the way the updateOne function works. The $upsert option should be placed within the same object as the $set operator and not as a separate argument.

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
//we cannot get the data with this query we can user $and operator or $elemmatch
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
//The error is due to a syntax mistake in the query. Specifically, the issue is with the way you're trying to set the field hobbies.highFrequency. In MongoDB, you cannot directly update a nested field within an array using the standard $set operator without using the positional $ operator or array filters.
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
  { $set: { "hobbies.$.highFrequency": true } }
);
// { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
// the use of $ operator: $ is a positional operator. It allows you to update the first array element
//   that matches the qury condition within an array field.
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

//***************** */
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
4. Use the SPECIFIC INDEX if you know which wlwmwnt you want to update by ITS POSITION in the 
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

This query checks independently whether any element in the hobbies array has a title of "Sports" and separately checks if any element has a frequency of >= 3.
Because these conditions are evaluated independently, it's possible that one element in the hobbies array satisfies title: "Sports" and another element satisfies frequency: { $gte: 3 }, but they are not the same element.
Thus, this query might return documents where these conditions are true for different elements within the array.
Query 2 ({hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } }}}):

This query uses the $elemMatch operator, which ensures that both conditions must be true for the same array element. It will only match documents where there is an element in the hobbies array that has both title: "Sports" and frequency >= 3.
This query is more precise and only returns documents where a single element in the hobbies array satisfies both conditions.
Why the Different Counts?
The first query might be over-counting because it's not ensuring that the conditions are met by the same array element.
The second query provides a more accurate count, where both conditions are true for the same element in the hobbies array.
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

//*********************** */
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
//****************************************$$$$$$$$$$$$$$$$$$$$$***************************** */

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
