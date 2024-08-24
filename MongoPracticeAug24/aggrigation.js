//aggregation stages of mongodb are ******************************
// 1. $match: Filter Documents by Status
db.movies.aggregate([{ $match: { status: "Running" } }]);

// 2. $project: Display Specific Fields
db.movies.aggregate([
  { $project: { name: 1, premiered: 1, "rating.average": 1, _id: 0 } }
]);

// 3. $group: Count Shows by Network
db.movies.aggregate([
  { $group: { _id: "$network.name", noOfShows: { $sum: 1 } } }
]);

// 4. $unwind: Separate Genres
db.movies.aggregate([
  { $unwind: "$genres" },
  { $project: { name: 1, genres: 1, _id: 0 } }
]);

// 5. $sort: Sort by Rating
db.movies.aggregate([{ $sort: { "rating.average": -1 } }]);

// 6. $lookup: Join with Another Collection
db.movies.aggregate([
  {
    $lookup: {
      from: "networks",
      localField: "network.name",
      foreignField: "name",
      as: "networkDetails"
    }
  }
]);

// 7. $limit: Limit Number of Results
db.movies.aggregate([{ $limit: 5 }]);

// 8. $skip: Skip Documents
db.movies.aggregate([{ $skip: 2 }]);

// 9. $addFields: Add a New Field
db.movies.aggregate([
  {
    $addFields: {
      premiereYear: { $year: { $dateFromString: { dateString: "$premiered" } } }
    }
  }
]);

// 10. $match with Array Element Condition
db.movies.aggregate([{ $match: { genres: "Drama" } }]);

// 11. $bucket: Categorize Shows Based on Rating
db.movies.aggregate([
  {
    $bucket: {
      groupBy: "$rating.average",
      boundaries: [0, 5, 7, 10],
      default: "Other",
      output: {
        count: { $sum: 1 },
        shows: { $push: "$name" }
      }
    }
  }
]);

// 12. $replaceRoot: Replace Document Root
db.movies.aggregate([{ $replaceRoot: { newRoot: "$network" } }]);

// 13. $facet: Multi-Faceted Search
// Problem: Perform multiple operations and return them as separate results.

db.movies.aggregate([
  {
    $facet: {
      "Top Rated": [
        { $sort: { "rating.average": -1 } },
        { $limit: 5 },
        { $project: { name: 1, "rating.average": 1 } }
      ],
      "Recent Shows": [
        { $sort: { premiered: -1 } },
        { $limit: 5 },
        { $project: { name: 1, premiered: 1 } }
      ]
    }
  }
]);

// 14. $out: Save the Result to a New Collection
// Problem: Save the result of a query to a new collection called top_movies.
db.movies.aggregate([
  { $match: { "rating.average": { $gte: 8 } } },
  { $out: "top_movies" }
]);

// 15. $merge: Merge the Result with Another Collection
// Problem: Merge the result of an aggregation with the network_stats
// collection, updating existing entries or inserting new ones.

db.movies.aggregate([
  { $group: { _id: "$network.name", noOfShows: { $sum: 1 } } },
  {
    $merge: {
      into: "network_stats",
      whenMatched: "merge",
      whenNotMatched: "insert"
    }
  }
]);

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
	"summary" : "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
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
*/
//  i have this type of documents, create some questions on aggregation framework  that can be used to retrieve the docs
// Question 1: Retrieve the name, language, and average rating of shows that have
db.movies.find(
  { "rating.average": { $gt: 8 } },
  { name: 1, rating: 1, language: 1, _id: 0 }
)[
  ({ name: "Person of Interest", language: "English", rating: { average: 9 } },
  { name: "True Detective", language: "English", rating: { average: 8.3 } })
];

// 1. Count the Number of Shows by Language

//write aggregation query to find How many shows are available in each language?
db.movies
  .aggregate([
    { $group: { _id: "$language", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ])
  .pretty();
//   { "_id" : "English", "count" : 5 }

// 2. Find the Average Rating of Shows by Genre

//2. What is the average rating for shows in each genre?
db.movies.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres", averageRating: { $avg: "$rating.average" } } },
  { $sort: { averageRating: -1 } }
]);
/*
{ "_id" : "Drama", "averageRating" : 7.8 }
{ "_id" : "Thriller", "averageRating" : 7.4 }
{ "_id" : "Horror", "averageRating" : 7.6 }
{ "_id" : "Romance", "averageRating" : 7.6 }
{ "_id" : "Action", "averageRating" : 8.3 }
{ "_id" : "Crime", "averageRating" : 8.65 }
{ "_id" : "Science-Fiction", "averageRating" : 7.05 }
*/
//

//for the above doc find the no of movies on eaach genres
db.movies
  .aggregate([
    { $unwind: "$genres" },
    { $group: { _id: "$genres", noOfMovies: { $sum: "$name" } } },
    { $sort: { noOfMovies: -1 } }
  ])
  .pretty();
/*
{ "_id" : "Drama", "noOfMovies" : 0 }
{ "_id" : "Thriller", "noOfMovies" : 0 }
{ "_id" : "Horror", "noOfMovies" : 0 }
{ "_id" : "Romance", "noOfMovies" : 0 }
{ "_id" : "Action", "noOfMovies" : 0 }
{ "_id" : "Crime", "noOfMovies" : 0 }
{ "_id" : "Science-Fiction", "noOfMovies" : 0 }
> //The issue with your query lies in the use of {$sum: "$name"}. The $sum operator is 
used to add numeric values, but the field name contains a string (the movie title). 
Therefore, the noOfMovies is resulting in 0 because $sum is expecting a numeric value, 
but it's receiving a string.
*/
db.movies
  .aggregate([
    { $unwind: "$genres" },
    { $group: { _id: "$genres", noOfMovies: { $sum: 1 } } },
    { $sort: { noOfMovies: -1 } }
  ])
  .pretty();
/*
  { "_id" : "Drama", "noOfMovies" : 5 }
  { "_id" : "Thriller", "noOfMovies" : 2 }
  { "_id" : "Action", "noOfMovies" : 2 }
  { "_id" : "Crime", "noOfMovies" : 2 }
  { "_id" : "Science-Fiction", "noOfMovies" : 2 }
  { "_id" : "Horror", "noOfMovies" : 1 }
  { "_id" : "Romance", "noOfMovies" : 1 }
  */

//find how many genres are there for each movie
db.movies
  .aggregate([
    { $unwind: "$genres" },
    { $group: { _id: "$name", totalGenres: { $sum: 1 } } }
  ])
  .pretty();

/*
{ "_id" : "Under the Dome", "totalGenres" : 3 }
{ "_id" : "Person of Interest", "totalGenres" : 3 }
{ "_id" : "Arrow", "totalGenres" : 3 }
{ "_id" : "True Detective", "totalGenres" : 3 }
{ "_id" : "Bitten", "totalGenres" : 3 }
*/
//   3. Find Shows Premiered After a Specific Date
//   Which shows premiered after June 1, 2015?
/*
db.movies.aggregate([
	...   {
	...     $match: {
	...       "$expr": {
	...         "$gt": [
	...           "$premiered",
	...           {
	...             "$dateFromString": {
	...               "dateString": "June 1, 2015",
	...               "format": "%B %d, %Y"
	...             }
	...           }
	...         ]
	...       }
	...     },
	...     moviesName: "$name"
	...   }
	... ]).pretty()
	assert: command failed: {
		"ok" : 0,
		"errmsg" : "A pipeline stage specification object must contain exactly one field.",
		"code" : 40323,
		"codeName" : "Location40323"
	} : aggregate failed
	 what is the error
	ChatGPT said:
	ChatGPT
	The error you are encountering, "A pipeline stage specification object 
	must contain exactly one field.", occurs because within the $match stage, you have included an additional field (moviesName: "$name") that is not a valid part of the $match stage.
	
	In MongoDB's aggregation framework, each pipeline stage (like $match, $group, $project, etc.) 
	must contain exactly one operation. The $match stage is used only to filter documents
	*/
db.movies.aggregate([
  {
    $match: {
      $expr: {
        $gt: [
          "$premiered",
          {
            $dateFromString: {
              dateString: "June 1, 2015",
              format: "%B %d, %Y"
            }
          }
        ]
      }
    }
  },
  {
    $project: { moviesName: "$name" }
  }
]);
// or
db.movies
  .aggregate([
    { $match: { premiered: { $eq: new Date("2015-06-01") } } },
    { $project: { _id: 1, name: 1, genres: 1, premiered: 1 } }
  ])
  .pretty();
/*

 my query is that. the date format present in the document is
  "premiered" : "2013-06-24",. One if we console the 
  console.log(new Date(2013-06-24)) 
  the output is 2015-06-01T00:00:00.000Z. 
  To compare the document with field value this is not correct 
  value right. then how can I write the correct format of date in 
  query to compare with the field value of document and write correct 
  query to find the no of show that premiered after specific date?

  Your understanding is correct—if you use new Date("2013-06-24") in 
  JavaScript, it will correctly create a Date object representing June 24, 2013, 
  and your MongoDB query should work as expected if the date in the document is 
  stored as an ISO date string like "2013-06-24" or as an actual Date object in MongoDB.

However, the issue seems to be related to how JavaScript handles dates when constructing 
them using new Date("YYYY-MM-DD"). Depending on your timezone, the output might 
shift to a different day due to the time zone offset.

1. Use ISO Date Strings in Queries:
MongoDB can store dates as ISODate objects or as strings. If your premiered 
field is stored as an ISODate, your query should use new Date("2013-06-24").
If your date is stored as a string like "2013-06-24", then your $match clause
 should compare it directly as a string.

2. Handling Time Zones:
When you create a date using new Date("2013-06-24"), JavaScript may convert
 it to a UTC time (e.g., 2013-06-23T18:00:00.000Z depending on your timezone),
  which can cause issues if your data does not include time and you only want 
  to compare by the date part.
To avoid issues with time zones, you might consider storing dates without 
time components or converting both the stored date and query date to a 
standardized format.

4. Alternative Method:
If the time zone conversion is still causing issues, you could compare the dates 
as strings (assuming the dates are stored in "YYYY-MM-DD" format as strings):
*/
db.movies
  .aggregate([
    { $match: { premiered: { $gt: "2013-06-24" } } },
    { $project: { _id: 1, name: 1, genres: 1, premiered: 1 } }
  ])
  .pretty();

[
  ({
    _id: ObjectId("64e3aa084ff5db12d7a58e87"),
    name: "Bitten",
    genres: ["Drama", "Horror", "Romance"],
    premiered: "2014-01-11"
  },
  {
    _id: ObjectId("64e3ad1e4ff5db12d7a58e89"),
    name: "True Detective",
    genres: ["Drama", "Crime", "Thriller"],
    premiered: "2014-01-12"
  })
];

//find the no of show premiered after a specific date
db.movies
  .aggregate([
    { $match: { premiered: { $gt: "2012-01-01" } } },
    { $count: "numberOfShows" }
  ])
  .pretty();
// { "numberOfShows" : 4 }

// 4. Find the Number of Shows per Network
// Question: How many shows are there on each network?
db.movies
  .aggregate([
    { $group: { _id: "$netwerok.name", noOfShows: { $sum: 1 } } },
    { $project: { "$network.name": 1, noOfShows: 1 } }
  ])
  .pretty();
//   assert: command failed: {
// 	"ok" : 0,
// 	"errmsg" : "Invalid $project :: caused by :: FieldPath field names may not start with '$'. Consider using $getField or $setField.",
// 	"code" : 16410,
// 	"codeName" : "Location16410"
// } : aggregate failed

db.movies
  .aggregate([{ $group: { _id: "$network.name", count: { $sum: 1 } } }])
  .pretty();
// { "_id" : "Space", "count" : 1 }
// { "_id" : "The CW", "count" : 1 }
// { "_id" : "HBO", "count" : 1 }
// { "_id" : "CBS", "count" : 2 }
db.movies
  .aggregate([
    { $group: { _id: "$netwrok.name", noOfShows: { $sum: 1 } } },
    { $project: { "network.name": 1, noOfShows: 1 } }
  ])
  .pretty();
// { "_id" : null, "noOfShows" : 5 }
//*************************************************************************** */
//WHICH IS WRONG QUERY because
/*
$project Stage Problem: In the projection stage, you are trying to project
 "network.name": 1, but after the $group stage, network.name no longer 
 exists as a field in the documents. The documents now only have _id and 
 noOfShows fields. The _id field contains the value of "network.name" 
 that you grouped by, and noOfShows contains the count.

 after using a field name for group key, that should not used for projection again 
 In mongodb after you used a field as a group key in the '$group' stage, the 
 original field does not exist as seperate field in the reuslting documents.. 
 Instead, the grouped value is stroed in the _id field of the doc reuslting from 
 "$group" stage.
 */

//to transfer the data from one db to another db

db.movies.aggregate([
  { $match: {} }, // Optionally apply filters or other aggregation stages here
  { $out: { db: "practice", coll: "movies" } } // Correct 'db' and 'coll' syntax
]);
/*  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
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

//FIND THE NO OF SHOW  ON EACH LANGUAGE
db.movies.aggregate([
  { $group: { _id: "$language", noOfMoviesPerLang: { $sum: 1 } } }
]);
// { "_id" : "English", "noOfMoviesPerLang" : 21 }

// 5. Find Shows with Average Rating Greater than a Specific Value
// Question: Which shows have an average rating greater than 7.0?
db.movies
  .aggregate([
    { $match: { "rating.average": { $gt: 7.0 } } },
    { $project: { name: 1, rating: "$rating.average", _id: 0 } }
  ])
  .pretty();
/* { "name" : "Person of Interest", "rating" : 9 }
{ "name" : "Bitten", "rating" : 7.6 }
{ "name" : "Arrow", "rating" : 7.6 }
{ "name" : "True Detective", "rating" : 8.3 }
{ "name" : "The 100", "rating" : 7.9 }
{ "name" : "Homeland", "rating" : 8.3 }
{ "name" : "Revenge", "rating" : 8 }
{ "name" : "Grimm", "rating" : 8.5 }
{ "name" : "Gotham", "rating" : 7.8 }
{ "name" : "Lost Girl", "rating" : 8 }
{ "name" : "The Flash", "rating" : 8.1 }
{ "name" : "Continuum", "rating" : 8.2 }
{ "name" : "Constantine", "rating" : 7.4 }
{ "name" : "Penny Dreadful", "rating" : 8.3 }
{ "name" : "The Amazing Race", "rating" : 7.5 }
{ "name" : "Supernatural", "rating" : 8.4 }
{ "name" : "The Strain", "rating" : 7.6 }
{ "name" : "The Last Ship", "rating" : 7.8 }
{ "name" : "True Blood", "rating" : 8 }
*/
//find the no of showa which are greater tha 7.0
db.movies.aggregate([
  { $match: { "rating.average": { $gt: 7.0 } } },
  { $project: { "no of shows greater than 7": { $sum: 1 } } }
]);
/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e87"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3ad5a4ff5db12d7a58e8a"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3ad5a4ff5db12d7a58e8b"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3adfd4ff5db12d7a58e8d"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3adfd4ff5db12d7a58e8e"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3aea34ff5db12d7a58e8f"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3aea34ff5db12d7a58e90"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3af454ff5db12d7a58e91"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3af454ff5db12d7a58e92"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3affa4ff5db12d7a58e93"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3affa4ff5db12d7a58e94"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3b0294ff5db12d7a58e95"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3b0294ff5db12d7a58e96"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3b0294ff5db12d7a58e97"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3b1874ff5db12d7a58e98"), "no of shows greater than 7" : 1 }
{ "_id" : ObjectId("64e3b1874ff5db12d7a58e99"), "no of shows greater than 7" : 1 }
*/
// it only print the values but not sum
//whic is wrong

db.movies.aggregate([
  { $match: { "rating.average": { $gt: 7.0 }, count: { $sum: 1 } } }
]);
/*
assert: command failed: {
	"ok" : 0,
	"errmsg" : "unknown operator: $sum",
	"code" : 2,
	"codeName" : "BadValue"
} : aggregate failed

The error in your query occurs because the $match stage is used to filter
 documents and does not support aggregation operations like $sum. To count 
 the total number of shows with a rating greater than 7.0, you need to use 
 a combination of the $match and $count stages in your aggregation pipeline.
 */

db.movies.aggregate([
  { $match: { "rating.average": { $gt: 7.0 } } },
  { $count: "totalShows" }
]);
// { "totalShows" : 19 }
// how many shows are coming from United States
db.movies.aggregate([
  { $match: { "network.country.name": "United States" } },
  { $count: "totalShows" }
]);
//{ "totalShows" : 18 }
// find the shows which are not from united States
db.movies.aggregate([
  { $match: { "network.country.name": { $ne: "United States" } } },
  {
    $project: {
      name: 1,
      movieFrom: "$network.country.name",
      runtime: "$runtime"
    }
  }
]);
/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e87"), "name" : "Bitten", "runtime" : 60, "movieFrom" : "Canada" }
{ "_id" : ObjectId("64e3aea34ff5db12d7a58e90"), "name" : "Lost Girl", "runtime" : 60, "movieFrom" : "Canada" }
{ "_id" : ObjectId("64e3af454ff5db12d7a58e92"), "name" : "Continuum", "runtime" : 60, "movieFrom" : "Canada" }
*/
// testing
db.movies.findOne({ name: "Bitten" }, { name: 1, runtime: 1, network: 1 });

/*
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e87"),
	"name" : "Bitten",
	"runtime" : 60,
	"network" : {
		"id" : 7,
		"name" : "Space",
		"country" : {
			"name" : "Canada",
			"code" : "CA",
			"timezone" : "America/Halifax"
		}
	}
}
*/
// 6. Count the Number of Shows by Status
// Question: How many shows are currently "Ended" vs. "Running"?
db.movies.find({ status: "Running" }).count();
// 9
db.movies.find({ status: "Ended" }).count();
//12
//with aggregation
db.movies.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
// { "_id" : "Running", "count" : 9 }
// { "_id" : "Ended", "count" : 12 }

// 7. Find the Longest-Running Show
// Question: Which show has the longest runtime?
db.movies.find({}, { _id: 0, name: 1, runtime: 1 });

/*
{ "name" : "Under the Dome", "runtime" : 60 }
{ "name" : "Person of Interest", "runtime" : 60 }
{ "name" : "Bitten", "runtime" : 60 }
{ "name" : "Arrow", "runtime" : 60 }
{ "name" : "True Detective", "runtime" : 60 }
{ "name" : "The 100", "runtime" : 60 }
{ "name" : "Homeland", "runtime" : 60 }
{ "name" : "Glee", "runtime" : 60 }
{ "name" : "Revenge", "runtime" : 60 }
{ "name" : "Grimm", "runtime" : 60 }
{ "name" : "Gotham", "runtime" : 60 }
{ "name" : "Lost Girl", "runtime" : 60 }
{ "name" : "The Flash", "runtime" : 60 }
{ "name" : "Continuum", "runtime" : 60 }
{ "name" : "Constantine", "runtime" : 60 }
{ "name" : "Penny Dreadful", "runtime" : 60 }
{ "name" : "The Amazing Race", "runtime" : 60 }
{ "name" : "Supernatural", "runtime" : 60 }
{ "name" : "The Strain", "runtime" : 60 }
{ "name" : "The Last Ship", "runtime" : 60 }
Type "it" for more
> it
{ "name" : "True Blood", "runtime" : 60 }
*/
// with aggregation framework
db.movies.aggregate([{ $sort: { runtime: -1 } }, { $limit: 1 }]);
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
*/
db.movies
  .aggregate([
    { $sort: { runtime: -1 } },
    { $limit: 1 },
    { $project: { name: 1, runtime: 1, status: 1 } }
  ])
  .pretty();
// {
// 	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
// 	"name" : "Under the Dome",
// 	"status" : "Ended",
// 	"runtime" : 60
// }

// 8. Find Shows Scheduled on a Specific Day
// Question: Which shows are scheduled to air on Thursday?
db.movies.aggregate([
  { $match: { "schedule.days": "Thursday" } },
  { $project: { name: 1, sheduledOn: "$schedule.days[0]" } }
]);
/*
	{ "_id" : ObjectId("64e3aa084ff5db12d7a58e85"), "name" : "Under the Dome" }
	{ "_id" : ObjectId("64e3aea34ff5db12d7a58e8f"), "name" : "Gotham" }
	{ "_id" : ObjectId("64e3b0294ff5db12d7a58e96"), "name" : "Supernatural" }
	*/
// which is wrong?
/*
Why Is sheduledOn Missing?
The sheduledOn field is only displayed if the projection expression ($schedule.days[0]) 
results in a valid, non-null, non-undefined value.

If the condition or the referenced index does not exist or doesn't meet the criteria, 
MongoDB will omit the field from the final output.

To Ensure sheduledOn Is Always Printed:
If you always want to include the sheduledOn field, consider either:

Using the Full Array: Instead of projecting just the first element, project 
					the entire array as in your below query.
Conditional Checks: You can use a more complex expression to ensure that the 
					sheduledOn field always has a value, or use $arrayElemAt 
					to more reliably get a specific array element.
*/
db.movies
  .aggregate([
    { $match: { "schedule.days": "Thursday" } },
    {
      $project: {
        _id: 0,
        name: 1,
        scheduledOn: { $arrayElemAt: ["$schedule.days", 0] }
      }
    }
  ])
  .pretty();
/*
{ "name" : "Under the Dome", "scheduledOn" : "Thursday" }
{ "name" : "Gotham", "scheduledOn" : "Thursday" }
{ "name" : "Supernatural", "scheduledOn" : "Thursday" }
*/
db.movies.aggregate([
  { $match: { "schedule.days": "Thursday" } },
  { $project: { name: 1, sheduledOn: "$schedule.days" } }
]);
/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e85"), "name" : "Under the Dome", "sheduledOn" : [ "Thursday" ] }
{ "_id" : ObjectId("64e3aea34ff5db12d7a58e8f"), "name" : "Gotham", "sheduledOn" : [ "Thursday" ] }
{ "_id" : ObjectId("64e3b0294ff5db12d7a58e96"), "name" : "Supernatural", "sheduledOn" : [ "Thursday" ] }
*/

// 9. Find Shows with Multiple Genres
// Question: Which shows belong to more than one genre?

//finding the shows which are belongs to each genre
db.movies.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres", showName: "$name" } }
]);
/*
assert: command failed: {
	"ok" : 0,
	"errmsg" : "The field 'showName' must be an accumulator object",
	"code" : 40234,
	"codeName" : "Location40234"
} : aggregate failed
why it gone wrong?

The error occurred because in the $group stage, the field showName is 
being assigned a value ("$name") directly, which is not allowed in MongoDB 
aggregation..
Fields within the "$group" stage must either be part of the _id key or 
use an accumulator operator(e.g., "$sum","$avg","$push", "addToSet")
//the above query is completely wrong.
*/

//finding the shows which are belongs to each genre
db.movies.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres", shows: { $push: "$name" } } }
]);
/*
{
	"_id" : "Thriller",
	"shows" : [
		"Under the Dome",
		"True Detective",
		"Homeland",
		"Revenge",
		"Penny Dreadful",
		"The Strain",
		"The Last Ship"
	]
}
{
	"_id" : "Action",
	"shows" : [
		"Person of Interest",
		"Arrow",
		"The 100",
		"Gotham",
		"The Flash",
		"Constantine",
		"The Amazing Race",
		"Supernatural",
		"The Last Ship"
	]
}
{
	"_id" : "Drama",
	"shows" : [
		"Under the Dome",
		"Person of Interest",
		"Bitten",
		"Arrow",
		"True Detective",
		"Homeland",
		"Glee",
		"Revenge",
		"Grimm",
		"Gotham",
		"Lost Girl",
		"The Flash",
		"Continuum",
		"Constantine",
		"Penny Dreadful",
		"Supernatural",
		"The Strain",
		"The Last Ship",
		"True Blood"
	]
}
{
	"_id" : "Crime",
	"shows" : [
		"Person of Interest",
		"True Detective",
		"Grimm",
		"Gotham",
		"Continuum"
	]
}
{ "_id" : "Adventure", "shows" : [ "The 100", "The Amazing Race" ] }
{ "_id" : "Music", "shows" : [ "Glee" ] }
{
	"_id" : "Horror",
	"shows" : [
		"Bitten",
		"Lost Girl",
		"Constantine",
		"Penny Dreadful",
		"The Strain"
	]
}
{ "_id" : "Espionage", "shows" : [ "Homeland" ] }
{ "_id" : "Mystery", "shows" : [ "Revenge" ] }
{
	"_id" : "Supernatural",
	"shows" : [
		"Grimm",
		"Supernatural",
		"True Blood"
	]
}
{ "_id" : "Fantasy", "shows" : [ "Lost Girl" ] }
{ "_id" : "Family", "shows" : [ "The Amazing Race" ] }
{
	"_id" : "Science-Fiction",
	"shows" : [
		"Under the Dome",
		"Arrow",
		"The 100",
		"The Flash",
		"Continuum"
	]
}
{ "_id" : "Romance", "shows" : [ "Bitten", "Glee", "True Blood" ] }
*/
//find how many movies are there for each genre
db.movies.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres", count: { $sum: 1 } } }
]);
/*
{ "_id" : "Drama", "count" : 19 }
{ "_id" : "Action", "count" : 9 }
{ "_id" : "Thriller", "count" : 7 }
{ "_id" : "Crime", "count" : 5 }
{ "_id" : "Adventure", "count" : 2 }
{ "_id" : "Music", "count" : 1 }
{ "_id" : "Horror", "count" : 5 }
{ "_id" : "Espionage", "count" : 1 }
{ "_id" : "Mystery", "count" : 1 }
{ "_id" : "Supernatural", "count" : 3 }
{ "_id" : "Fantasy", "count" : 1 }
{ "_id" : "Family", "count" : 1 }
{ "_id" : "Science-Fiction", "count" : 5 }
{ "_id" : "Romance", "count" : 3 }
*/

// 9. Find Shows with Multiple Genres

// which shows belongs to more than one genre?
db.movies.aggregate([
  { $project: { name: 1, genreCount: { $size: "$genres" } } },
  { $match: { genreCount: { $gt: 1 } } },
  { $project: { name: 1, _id: 0, genreCount: 1 } }
]);
/*
{ "name" : "Under the Dome", "genreCount" : 3 }
{ "name" : "Person of Interest", "genreCount" : 3 }
{ "name" : "Bitten", "genreCount" : 3 }
{ "name" : "Arrow", "genreCount" : 3 }
{ "name" : "True Detective", "genreCount" : 3 }
{ "name" : "The 100", "genreCount" : 3 }
{ "name" : "Homeland", "genreCount" : 3 }
{ "name" : "Glee", "genreCount" : 3 }
{ "name" : "Revenge", "genreCount" : 3 }
{ "name" : "Grimm", "genreCount" : 3 }
{ "name" : "Gotham", "genreCount" : 3 }
{ "name" : "Lost Girl", "genreCount" : 3 }
{ "name" : "The Flash", "genreCount" : 3 }
{ "name" : "Continuum", "genreCount" : 3 }
{ "name" : "Constantine", "genreCount" : 3 }
{ "name" : "Penny Dreadful", "genreCount" : 3 }
{ "name" : "The Amazing Race", "genreCount" : 3 }
{ "name" : "Supernatural", "genreCount" : 3 }
{ "name" : "The Strain", "genreCount" : 3 }
{ "name" : "The Last Ship", "genreCount" : 3 }
Type "it" for more
> it
{ "name" : "True Blood", "genreCount" : 3 }
*/

// 10. Find the Total Number of Episodes for Each Show
// Question: How many episodes does each show have?
// Note: Assuming the episodes are stored in a related collection and linked via the show_id.

//FIND THE average rating of each genre
db.movies.aggregate([
  { $unwind: "$genres" },
  {
    $group: {
      _id: "$genres",
      totalMovies: { $sum: 1 },
      avgRating: { $avg: "$rating.average" }
    }
  },
  { $sort: { avgRating: -1 } },
  { $project: { genres: 1, totalMOvies: 1, avgRating: 1 } }
]);
/*
{ "_id" : "Crime", "totalMovies" : 5, "avgRating" : 8.36 }
{ "_id" : "Espionage", "totalMovies" : 1, "avgRating" : 8.3 }
{ "_id" : "Supernatural", "totalMovies" : 3, "avgRating" : 8.299999999999999 }
{ "_id" : "Mystery", "totalMovies" : 1, "avgRating" : 8 }
{ "_id" : "Fantasy", "totalMovies" : 1, "avgRating" : 8 }
{ "_id" : "Action", "totalMovies" : 9, "avgRating" : 7.944444444444445 }
{ "_id" : "Drama", "totalMovies" : 19, "avgRating" : 7.8999999999999995 }
{ "_id" : "Thriller", "totalMovies" : 7, "avgRating" : 7.828571428571429 }
{ "_id" : "Horror", "totalMovies" : 5, "avgRating" : 7.779999999999999 }
{ "_id" : "Adventure", "totalMovies" : 2, "avgRating" : 7.7 }
{ "_id" : "Science-Fiction", "totalMovies" : 5, "avgRating" : 7.659999999999999 }
{ "_id" : "Family", "totalMovies" : 1, "avgRating" : 7.5 }
{ "_id" : "Romance", "totalMovies" : 3, "avgRating" : 7.433333333333334 }
{ "_id" : "Music", "totalMovies" : 1, "avgRating" : 6.7 }
*/
db.movies.aggregate([
  { $unwind: "$genres" },
  {
    $group: {
      _id: "$genres",
      totalMovies: { $sum: 1 },
      avgRating: { $avg: "$rating.average" }
    }
  },
  { $sort: { avgRating: -1 } }
]);
/*
{ "_id" : "Crime", "totalMovies" : 5, "avgRating" : 8.36 }
{ "_id" : "Espionage", "totalMovies" : 1, "avgRating" : 8.3 } db.movies.aggregate([   { $unwind: "$genres" },   { $group:{_id: "$genres", totalMovies:{$sum:1},avgRating: { $avg: "$rating.average" } }},   { $sort: { avgRating: -1 } }])
{ "_id" : "Crime", "totalMovies" : 5, "avgRating" : 8.36 }
{ "_id" : "Espionage", "totalMovies" : 1, "avgRating" : 8.3 }
{ "_id" : "Supernatural", "totalMovies" : 3, "avgRating" : 8.299999999999999 }
{ "_id" : "Mystery", "totalMovies" : 1, "avgRating" : 8 }
{ "_id" : "Fantasy", "totalMovies" : 1, "avgRating" : 8 }
{ "_id" : "Action", "totalMovies" : 9, "avgRating" : 7.944444444444445 }
{ "_id" : "Drama", "totalMovies" : 19, "avgRating" : 7.8999999999999995 }
{ "_id" : "Thriller", "totalMovies" : 7, "avgRating" : 7.828571428571429 }
{ "_id" : "Horror", "totalMovies" : 5, "avgRating" : 7.779999999999999 }
{ "_id" : "Adventure", "totalMovies" : 2, "avgRating" : 7.7 }
{ "_id" : "Science-Fiction", "totalMovies" : 5, "avgRating" : 7.659999999999999 }
{ "_id" : "Family", "totalMovies" : 1, "avgRating" : 7.5 }
{ "_id" : "Romance", "totalMovies" : 3, "avgRating" : 7.433333333333334 }
{ "_id" : "Music", "totalMovies" : 1, "avgRating" : 6.7 }
{ "_id" : "Supernatural", "totalMovies" : 3, "avgRating" : 8.299999999999999 }
{ "_id" : "Mystery", "totalMovies" : 1, "avgRating" : 8 }
{ "_id" : "Fantasy", "totalMovies" : 1, "avgRating" : 8 }
{ "_id" : "Action", "totalMovies" : 9, "avgRating" : 7.944444444444445 }
{ "_id" : "Drama", "totalMovies" : 19, "avgRating" : 7.8999999999999995 }
{ "_id" : "Thriller", "totalMovies" : 7, "avgRating" : 7.828571428571429 }
{ "_id" : "Horror", "totalMovies" : 5, "avgRating" : 7.779999999999999 }
{ "_id" : "Adventure", "totalMovies" : 2, "avgRating" : 7.7 }
{ "_id" : "Science-Fiction", "totalMovies" : 5, "avgRating" : 7.659999999999999 }
{ "_id" : "Family", "totalMovies" : 1, "avgRating" : 7.5 }
{ "_id" : "Romance", "totalMovies" : 3, "avgRating" : 7.433333333333334 }
{ "_id" : "Music", "totalMovies" : 1, "avgRating" : 6.7 }
*/

//using $first operator
db.movies.aggregate([
  { $unwind: "$genres" },
  {
    $group: {
      _id: "$genres",
      totalMovies: { $sum: 1 },
      avgRating: { $first: "$rating.average" }
    }
  },
  { $sort: { totalMovies: -1 } }
]);
/*
{ "_id" : "Drama", "totalMovies" : 19, "avgRating" : 6.5 }
{ "_id" : "Action", "totalMovies" : 9, "avgRating" : 9 }
{ "_id" : "Thriller", "totalMovies" : 7, "avgRating" : 6.5 }
{ "_id" : "Science-Fiction", "totalMovies" : 5, "avgRating" : 6.5 }
{ "_id" : "Horror", "totalMovies" : 5, "avgRating" : 7.6 }
{ "_id" : "Crime", "totalMovies" : 5, "avgRating" : 9 }
{ "_id" : "Romance", "totalMovies" : 3, "avgRating" : 7.6 }
{ "_id" : "Supernatural", "totalMovies" : 3, "avgRating" : 8.5 }
{ "_id" : "Adventure", "totalMovies" : 2, "avgRating" : 7.9 }
{ "_id" : "Music", "totalMovies" : 1, "avgRating" : 6.7 }
{ "_id" : "Mystery", "totalMovies" : 1, "avgRating" : 8 }
{ "_id" : "Fantasy", "totalMovies" : 1, "avgRating" : 8 }
{ "_id" : "Family", "totalMovies" : 1, "avgRating" : 7.5 }
{ "_id" : "Espionage", "totalMovies" : 1, "avgRating" : 8.3 }
*/
// $first :The $first operator is used in the aggregation pipeline
// to get the value of the first document in a group
// find the no of movies in each genres
db.movies.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres", totalMoviesperGenre: { $sum: 1 } } },
  { $sort: { totalMoviesperGenre: -1 } }
]);
/*
{ "_id" : "Drama", "totalMoviesperGenre" : 19 }
{ "_id" : "Action", "totalMoviesperGenre" : 9 }
{ "_id" : "Thriller", "totalMoviesperGenre" : 7 }
{ "_id" : "Science-Fiction", "totalMoviesperGenre" : 5 }
{ "_id" : "Horror", "totalMoviesperGenre" : 5 }
{ "_id" : "Crime", "totalMoviesperGenre" : 5 }
{ "_id" : "Supernatural", "totalMoviesperGenre" : 3 }
{ "_id" : "Romance", "totalMoviesperGenre" : 3 }
{ "_id" : "Adventure", "totalMoviesperGenre" : 2 }
{ "_id" : "Music", "totalMoviesperGenre" : 1 }
{ "_id" : "Mystery", "totalMoviesperGenre" : 1 }
{ "_id" : "Fantasy", "totalMoviesperGenre" : 1 }
{ "_id" : "Family", "totalMoviesperGenre" : 1 }
{ "_id" : "Espionage", "totalMoviesperGenre" : 1 }
> 
*/
//print the day month and year from the given document
db.movies
  .aggregate([
    {
      $project: {
        name: 1,
        premiered: 1,
        year: { $year: { $dateFromString: { dateString: "$premiered" } } },
        month: { $month: { $dateFromString: { dateString: "$premiered" } } },
        day: { $dayOfMonth: { $dateFromString: { dateString: "$premiered" } } }
      }
    },
    { $limit: 5 }
  ])
  .pretty();
/*
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	"name" : "Under the Dome",
	"premiered" : "2013-06-24",
	"year" : 2013,
	"month" : 6,
	"day" : 24
}
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"name" : "Person of Interest",
	"premiered" : "2011-09-22",
	"year" : 2011,
	"month" : 9,
	"day" : 22
}
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e87"),
	"name" : "Bitten",
	"premiered" : "2014-01-11",
	"year" : 2014,
	"month" : 1,
	"day" : 11
}
{
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"),
	"name" : "Arrow",
	"premiered" : "2012-10-10",
	"year" : 2012,
	"month" : 10,
	"day" : 10
}
{
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"),
	"name" : "True Detective",
	"premiered" : "2014-01-12",
	"year" : 2014,
	"month" : 1,
	"day" : 12
}
*/
// Question 4: Get the names and premier dates of shows that premiered after 2018.
db.movies
  .aggregate([
    { $match: { premiered: { $gt: "2012-01-01" } } },
    { $project: { name: 1, premiered: 1 } }
  ])
  .pretty();

//   or

db.movies
  .aggregate([
    {
      $project: {
        name: 1,
        premiered: 1,
        year: { $year: { $dateFromString: { dateString: "$premiered" } } }
      }
    },
    { $match: { year: { $gt: 2012 } } },
    { $sort: { premiered: -1 } }
  ])
  .pretty();
/* 
  {
	  "_id" : ObjectId("64e3affa4ff5db12d7a58e93"),
	  "name" : "Constantine",
	  "premiered" : "2014-10-24",
	  "year" : 2014
  }
  {
	  "_id" : ObjectId("64e3af454ff5db12d7a58e91"),
	  "name" : "The Flash",
	  "premiered" : "2014-10-07",
	  "year" : 2014
  }
  {
	  "_id" : ObjectId("64e3aea34ff5db12d7a58e8f"),
	  "name" : "Gotham",
	  "premiered" : "2014-09-22",
	  "year" : 2014
  }
  {
	  "_id" : ObjectId("64e3b0294ff5db12d7a58e97"),
	  "name" : "The Strain",
	  "premiered" : "2014-07-13",
	  "year" : 2014
  }
  {
	  "_id" : ObjectId("64e3b1874ff5db12d7a58e98"),
	  "name" : "The Last Ship",
	  "premiered" : "2014-06-22",
	  "year" : 2014
  }
  {
	  "_id" : ObjectId("64e3affa4ff5db12d7a58e94"),
	  "name" : "Penny Dreadful",
	  "premiered" : "2014-05-11",
	  "year" : 2014
  }
  {
	  "_id" : ObjectId("64e3ad5a4ff5db12d7a58e8a"),
	  "name" : "The 100",
	  "premiered" : "2014-03-19",
	  "year" : 2014
  }
  {
	  "_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"),
	  "name" : "True Detective",
	  "premiered" : "2014-01-12",
	  "year" : 2014
  }
  {
	  "_id" : ObjectId("64e3aa084ff5db12d7a58e87"),
	  "name" : "Bitten",
	  "premiered" : "2014-01-11",
	  "year" : 2014
  }
  {
	  "_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	  "name" : "Under the Dome",
	  "premiered" : "2013-06-24",
	  "year" : 2013
  }
*/
//find how many movies released in 2014
db.movies.aggregate([
  {
    $project: {
      name: 1,
      _id: 0,
      premiered: 1,
      year: { $year: { $dateFromString: { dateString: "$premiered" } } }
    }
  },
  { $match: { year: { $eq: 2014 } } },
  { $group: { _id: "$year", totalMovies: { $sum: 1 } } }
]);
// { "_id" : 2014, "totalMovies" : 9 }
// Question 5: Find the top 3 shows with the highest average rating.
db.movies.aggregate([
  { $sort: { "rating.average": -1 } },
  { $limit: 3 },
  { $project: { name: 1, avgRating: "$rating.average", _id: 0 } }
]);
/*
{ "name" : "Person of Interest", "avgRating" : 9 }
{ "name" : "Grimm", "avgRating" : 8.5 }
{ "name" : "Supernatural", "avgRating" : 8.4 }
*/
// Question 6: Determine the number of shows for each network.
db.movies.aggregate([
  { $group: { _id: "$network.name", noOfShowsPerNetwork: { $sum: 1 } } },
  { $sort: { noOfShowsPerNetwork: -1 } }
]);
/*
{ "_id" : "The CW", "noOfShowsPerNetwork" : 4 }
{ "_id" : "CBS", "noOfShowsPerNetwork" : 3 }
{ "_id" : "Showtime", "noOfShowsPerNetwork" : 2 }
{ "_id" : "HBO", "noOfShowsPerNetwork" : 2 }
{ "_id" : "Showcase", "noOfShowsPerNetwork" : 2 }
{ "_id" : "FOX", "noOfShowsPerNetwork" : 2 }
{ "_id" : "NBC", "noOfShowsPerNetwork" : 2 }
{ "_id" : "Space", "noOfShowsPerNetwork" : 1 }
{ "_id" : "FX", "noOfShowsPerNetwork" : 1 }
{ "_id" : "ABC", "noOfShowsPerNetwork" : 1 }
{ "_id" : "TNT", "noOfShowsPerNetwork" : 1 }
*/
db.movies.aggregate([
  {
    $group: { _id: "$network.name", noOfShowsPerNetwork: { $sum: 1 } },
    from: "$network.country.name"
  },
  { $sort: { noOfShowsPerNetwork: -1 } }
]);
/*
assert: command failed: {
	"ok" : 0,
	"errmsg" : "A pipeline stage specification object must contain exactly one field.",
	"code" : 40323,
	"codeName" : "Location40323"
} : aggregate failed
The error you're encountering is because in the aggregation pipeline, each stage 
(such as $group, $match, $project, etc.) must be a valid MongoDB stage 
operator. Each stage operator must contain only one top-level field that
 corresponds to the operator itself.
 In your case, the error occurs because you tried to include an additional field
  (from: "$network.country.name") within the $group stage, which is not allowed.
//

//

  in the $group stage you can only define computedd fields you cannot add new fields
you can compute using $first, $last, $sum, etc  
*/
//list the name of the shows that are not in english
db.movies.aggregate([
  { $match: { language: { $ne: "English" } } },
  { $project: { name: 1, language: "$language" } }
]);
//0 no movies are there in other languages except in english

//find the movies which are in english
db.movies.aggregate([
  { $match: { language: { $eq: "English" } } },
  { $project: { name: 1, language: "$language" } }
]);
/*
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e85"), "name" : "Under the Dome", "language" : "English" }
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e86"), "name" : "Person of Interest", "language" : "English" }
{ "_id" : ObjectId("64e3aa084ff5db12d7a58e87"), "name" : "Bitten", "language" : "English" }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"), "name" : "Arrow", "language" : "English" }
{ "_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"), "name" : "True Detective", "language" : "English" }
{ "_id" : ObjectId("64e3ad5a4ff5db12d7a58e8a"), "name" : "The 100", "language" : "English" }
{ "_id" : ObjectId("64e3ad5a4ff5db12d7a58e8b"), "name" : "Homeland", "language" : "English" }
{ "_id" : ObjectId("64e3ad5a4ff5db12d7a58e8c"), "name" : "Glee", "language" : "English" }
{ "_id" : ObjectId("64e3adfd4ff5db12d7a58e8d"), "name" : "Revenge", "language" : "English" }
{ "_id" : ObjectId("64e3adfd4ff5db12d7a58e8e"), "name" : "Grimm", "language" : "English" }
{ "_id" : ObjectId("64e3aea34ff5db12d7a58e8f"), "name" : "Gotham", "language" : "English" }
{ "_id" : ObjectId("64e3aea34ff5db12d7a58e90"), "name" : "Lost Girl", "language" : "English" }
{ "_id" : ObjectId("64e3af454ff5db12d7a58e91"), "name" : "The Flash", "language" : "English" }
{ "_id" : ObjectId("64e3af454ff5db12d7a58e92"), "name" : "Continuum", "language" : "English" }
{ "_id" : ObjectId("64e3affa4ff5db12d7a58e93"), "name" : "Constantine", "language" : "English" }
{ "_id" : ObjectId("64e3affa4ff5db12d7a58e94"), "name" : "Penny Dreadful", "language" : "English" }
{ "_id" : ObjectId("64e3b0294ff5db12d7a58e95"), "name" : "The Amazing Race", "language" : "English" }
{ "_id" : ObjectId("64e3b0294ff5db12d7a58e96"), "name" : "Supernatural", "language" : "English" }
{ "_id" : ObjectId("64e3b0294ff5db12d7a58e97"), "name" : "The Strain", "language" : "English" }
{ "_id" : ObjectId("64e3b1874ff5db12d7a58e98"), "name" : "The Last Ship", "language" : "English" }
*/

//$addToFields working on
db.movies
  .aggregate([
    {
      $addFields: {
        premiereYear: {
          $year: { $dateFromString: { dateString: "$premiered" } }
        }
      }
    },
    { $project: { name: 1, premiered: 1, premierYear: 1, network: 1 } },
    { $limit: 5 }
  ])
  .pretty();
/*
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	"name" : "Under the Dome",
	"premiered" : "2013-06-24",
	"network" : {
		"id" : 2,
		"name" : "CBS",
		"country" : {
			"name" : "United States",
			"code" : "US",
			"timezone" : "America/New_York"
		}
	},
	"premierYear" : 2013
}
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"name" : "Person of Interest",
	"premiered" : "2011-09-22",
	"network" : {
		"id" : 2,
		"name" : "CBS",
		"country" : {
			"name" : "United States",
			"code" : "US",
			"timezone" : "America/New_York"
		}
	},
	"premierYear" : 2011
}
{
	"_id" : ObjectId("64e3aa084ff5db12d7a58e87"),
	"name" : "Bitten",
	"premiered" : "2014-01-11",
	"network" : {
		"id" : 7,
		"name" : "Space",
		"country" : {
			"name" : "Canada",
			"code" : "CA",
			"timezone" : "America/Halifax"
		}
	},
	"premierYear" : 2014
}
{
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"),
	"name" : "Arrow",
	"premiered" : "2012-10-10",
	"network" : {
		"id" : 5,
		"name" : "The CW",
		"country" : {
			"name" : "United States",
			"code" : "US",
			"timezone" : "America/New_York"
		}
	},
	"premierYear" : 2012
}
{
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e89"),
	"name" : "True Detective",
	"premiered" : "2014-01-12",
	"network" : {
		"id" : 8,
		"name" : "HBO",
		"country" : {
			"name" : "United States",
			"code" : "US",
			"timezone" : "America/New_York"
		}
	},
	"premierYear" : 2014
}

*/
// 11. $bucket: Categorize Shows Based on Rating
// it categorizes the given documents based on specific condition
//it is used to group the odcuments based on the values of a specified field
/*
1. $bucket:
	This is an aggregation stage used to categorizes documents into groups, or 
	"buckets" based on a specific field's values.
	The documents are placed in different buckets based on the defined "boundaries"

2. groupBy: this is used to group the documents based on given condition. 

3. boundaries: this defined the ranges that determine the buckets. 
			Each pair of adjacent values in the array defines the inclusive
			lower boundary and exclusive upperboudary of a bucket. 

4. default: This specifies the bucket where documents thta dont fit into any of the
			defined boundaries should go.
			In the given below example, any document with a "rating.average" value
			outside the '[0,10)' range will be placed in the Other bucket. 

5. output: This defins the structure of the document. It allows you to specify what 
			information to include in the output for each bucket. 

6. count:  This field counts the number of documents in each bucket. in the below example
		  $sum: 1 adds 1 for each document in the bucket, effectively counting the number 
		  of documents.

7. shows: This creates an array of the name field values for all documents in the bucket.
		$push: "$name" pushes the value of the name field into the shows array for each document 
		in the bucket.
*/
// qn.  Categorize show into bucket based on "rating.average"
db.movies.aggregate([
  {
    $bucket: {
      groupBy: "$rating.average",
      boundaries: [0, 5, 7, 10],
      default: "Other",
      output: {
        count: { $sum: 1 },
        shows: { $push: "$name" }
      }
    }
  }
]);
/*
How It Works

1. Grouping: The pipeline starts by grouping the documents in the movies 
	collection based on the rating.average field. The documents are divided 
	into buckets according to the specified boundaries.

2. Boundaries: Documents with rating.average between 0 and 5 (inclusive of 0,
	 exclusive of 5) go into the first bucket.
		Documents with rating.average between 5 and 7 (inclusive of 5, exclusive of 7) 
		go into the second bucket.
		Documents with rating.average between 7 and 10 (inclusive of 7, exclusive of 10) 
		go into the third bucket.

3. Default Bucket: Any document with a rating.average outside the defined 
		boundaries is placed into the "Other" bucket.

4. Output: For each bucket, the output includes a count of the documents in 
	that bucket and an array of shows containing the name of each movie in 
	that bucket.
*/
db.movies
  .aggregate([
    {
      $bucket: {
        groupBy: "$rating.average",
        boundaries: [0, 5, 7, 8, 9, 10],
        default: "Other",
        output: { count: { $sum: 1 }, shows: { $push: "$name" } }
      }
    }
  ])
  .pretty();
/*
{ "_id" : 5, "count" : 2, "shows" : [ "Under the Dome", "Glee" ] }
{
	"_id" : 7,
	"count" : 8,
	"shows" : [
		"Bitten",
		"Arrow",
		"The 100",
		"Gotham",
		"Constantine",
		"The Amazing Race",
		"The Strain",
		"The Last Ship"
	]
}
{
	"_id" : 8,
	"count" : 10,
	"shows" : [
		"True Detective",
		"Homeland",
		"Revenge",
		"Grimm",
		"Lost Girl",
		"The Flash",
		"Continuum",
		"Penny Dreadful",
		"Supernatural",
		"True Blood"
	]
}
{ "_id" : 9, "count" : 1, "shows" : [ "Person of Interest" ] }
*/

//write a query that can categorizes the movies based on year
db.movies
  .aggregate([
    {
      $bucket: {
        groupBy: "$premiered",
        boundaries: [2010, 2012, 2014, 2016, 2018],
        default: "other",
        output: {
          count: {
            $sum: 1,
            movieNames: { $push: "$name" },
            released: "$premiered"
          }
        }
      }
    }
  ])
  .pretty();
/*
assert: command failed: {
	"ok" : 0,
	"errmsg" : "The field 'count' must specify one accumulator",
	"code" : 40238,
	"codeName" : "Location40238"
} : aggregate failed

the error due to  the output stage within the $bucket aggregation stage 
requires each field to be specified as a separate object in the output 

the $sum operator should only be used to count documents, and it cannot 
contain other fields like movieNames and released.

*/
//CORRECT QUERY
db.movies.aggregate([
  {
    $bucket: {
      groupBy: "$premiered",
      boundaries: [2000, 2010, 2012, 2014, 2018],
      default: "Other",
      output: {
        count: { $sum: 1 },
        moviesName: { $push: "$name" },
        released: { $push: "$premiered" }
      }
    }
  }
]);

/*
{
	"_id" : 2010,
	"count" : 5,
	"movieNames" : [
		"Person of Interest",
		"Homeland",
		"Revenge",
		"Grimm",
		"Lost Girl"
	],
	"released" : [
		"2011-09-22",
		"2011-10-02",
		"2011-09-21",
		"2011-10-28",
		"2010-09-12"
	]
}
{
	"_id" : 2012,
	"count" : 3,
	"movieNames" : [
		"Under the Dome",
		"Arrow",
		"Continuum"
	],
	"released" : [
		"2013-06-24",
		"2012-10-10",
		"2012-05-27"
	]
}
{
	"_id" : 2014,
	"count" : 9,
	"movieNames" : [
		"Bitten",
		"True Detective",
		"The 100",
		"Gotham",
		"The Flash",
		"Constantine",
		"Penny Dreadful",
		"The Strain",
		"The Last Ship"
	],
	"released" : [
		"2014-01-11",
		"2014-01-12",
		"2014-03-19",
		"2014-09-22",
		"2014-10-07",
		"2014-10-24",
		"2014-05-11",
		"2014-07-13",
		"2014-06-22"
	]
}
{
	"_id" : "other",
	"count" : 4,
	"movieNames" : [
		"Glee",
		"The Amazing Race",
		"Supernatural",
		"True Blood"
	],
	"released" : [
		"2009-05-19",
		"2001-09-05",
		"2005-09-13",
		"2008-09-07"
	]
}
*/
/*
 $replaceRoot: The $replaceRoot stage in MongoDB's aggregation framework is used to 
 			replace the existing document (or document root) with a specified embedded
			document. This allows you to reshape the structure of the document by promoting 
			an embedded document to the top level or by creating a completely new structure.

When to Use $replaceRoot
		
	Promoting an Embedded Document: If your documents have nested fields, 
			and you want to promote one of those fields to the top level of 
			the document.
	
	Restructuring Data: When you need to restructure the document to create a 
			new root document from existing fields or computed values.

// syntax
{
	$replaceRoot: { 
	  newRoot: <replacementDocument> 
	}
  }
  Key Points
Flexibility: $replaceRoot provides flexibility in reshaping documents, 
		especially when dealing with deeply nested structures.
Custom Structures: You can create custom structures by using expressions to 
		build the newRoot document dynamically.
Use Cases: Commonly used when flattening nested documents or transforming 
		document structures in preparation for further processing or final 
		output.
  
*/
db.movies
  .aggregate([{ $replaceRoot: { newRoot: "$_links" } }, { $limit: 3 }])
  .pretty();
/*
{
	"self" : {
		"href" : "http://api.tvmaze.com/shows/1"
	},
	"previousepisode" : {
		"href" : "http://api.tvmaze.com/episodes/185054"
	}
}
{
	"self" : {
		"href" : "http://api.tvmaze.com/shows/2"
	},
	"previousepisode" : {
		"href" : "http://api.tvmaze.com/episodes/659372"
	}
}
{
	"self" : {
		"href" : "http://api.tvmaze.com/shows/3"
	},
	"previousepisode" : {
		"href" : "http://api.tvmaze.com/episodes/631862"
	}
}
*/
// but the original document is like this

db.movies.find({}, { _id: 0, _links: 1 }).limit(3).pretty();
/*
{
	"_links" : {
		"self" : {
			"href" : "http://api.tvmaze.com/shows/1"
		},
		"previousepisode" : {
			"href" : "http://api.tvmaze.com/episodes/185054"
		}
	}
}
{
	"_links" : {
		"self" : {
			"href" : "http://api.tvmaze.com/shows/2"
		},
		"previousepisode" : {
			"href" : "http://api.tvmaze.com/episodes/659372"
		}
	}
}
{
	"_links" : {
		"self" : {
			"href" : "http://api.tvmaze.com/shows/3"
		},
		"previousepisode" : {
			"href" : "http://api.tvmaze.com/episodes/631862"
		}
	}
}
*/
// ADVANCED example  //******************************************************** */
// if you want to retain some fields from the original document along with
// the new root, you can combine "$replaceRoot" with "$mergeObject"
db.movies
  .aggregate([
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ original_id: "$_id", name: "$name" }, "$network"]
        }
      }
    }
  ])
  .pretty();
/*
{
	"original_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	"name" : "CBS",
	"id" : 2,
	"country" : {
		"name" : "United States",
		"code" : "US",
		"timezone" : "America/New_York"
	}
}
{
	"original_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"name" : "CBS",
	"id" : 2,
	"country" : {
		"name" : "United States",
		"code" : "US",
		"timezone" : "America/New_York"
	}
}
{
	"original_id" : ObjectId("64e3aa084ff5db12d7a58e87"),
	"name" : "Space",
	"id" : 7,
	"country" : {
		"name" : "Canada",
		"code" : "CA",
		"timezone" : "America/Halifax"
	}
}

*/
db.movies.aggregate([{ $replaceRoot: { newRoot: "$genres" } }]);
/*
assert: command failed: {
	"ok" : 0,
	"errmsg" : "PlanExecutor error during aggregation :: caused by :: 'newRoot' expression  must evaluate to an object, but resulting value was: [\"Drama\", \"Science-Fiction\", \"Thriller\"]. Type of resulting value: 'array'. Input document: {genres: [\"Drama\", \"Science-Fiction\", \"Thriller\"]}",
	"code" : 40228,
	"codeName" : "Location40228"
} : aggregate failed
*/
// The error occurs because the $replaceRoot stage expects the newRoot
// expression to evaluate to a document (an object), not an array.
// In your case, the genres field is an array, so trying to replace the
// root with an array is not valid, leading to the error.

db.movies
  .aggregate([
    { $unwind: "$genres" },
    {
      $replaceRoot: {
        newRoot: {
          genres: "$genres",
          name: "$name"
        }
      }
    },
    { $limit: 4 }
  ])
  .pretty();
/*{
	"genres" : [
		"Drama",
		"Science-Fiction",
		"Thriller"
	],
	"_id" : ObjectId("64e3aa084ff5db12d7a58e85"),
	"name" : "Under the Dome"
}
{
	"genres" : [
		"Drama",
		"Action",
		"Crime"
	],
	"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
	"name" : "Person of Interest"
}
{
	"genres" : [
		"Drama",
		"Horror",
		"Romance"
	],
	"_id" : ObjectId("64e3aa084ff5db12d7a58e87"),
	"name" : "Bitten"
}
{
	"genres" : [
		"Drama",
		"Action",
		"Science-Fiction"
	],
	"_id" : ObjectId("64e3ad1e4ff5db12d7a58e88"),
	"name" : "Arrow"
}
*/ ///*************************************************************** */
// this $replaceRoot stage is useful when you want take the objects field to top level
// or if you have an array of documents or objects nested in array you can easily
// make them out to the toplevel using $unwind stage followed by $replaceRoot

// $facet: Multi-Faceted Search//***************************** */

// Problem: Perform multiple operations and return them as separate results.

db.movies
  .aggregate([
    {
      $facet: {
        topRatedMovies: [
          { $sort: { "rating.average": -1 } },
          { $limit: 5 },
          { $project: { name: -1, "rating.average": 1 } }
        ],
        "Recent Shows": [
          { $sort: { premiered: -1 } },
          { $limit: 5 },
          { $project: { name: 1, premiered: 1 } }
        ]
      }
    }
  ])
  .pretty();
/*
  {
	"topRatedMovies" : [
		{
			"_id" : ObjectId("64e3aa084ff5db12d7a58e86"),
			"name" : "Person of Interest",
			"rating" : {
				"average" : 9
			}
		},
		{
			"_id" : ObjectId("64e3adfd4ff5db12d7a58e8e"),
			"name" : "Grimm",
			"rating" : {
				"average" : 8.5
			}
		},
		{
			"_id" : ObjectId("64e3b0294ff5db12d7a58e96"),
			"name" : "Supernatural",
			"rating" : {
				"average" : 8.4
			}
		},
		{
			"_id" : ObjectId("64e3affa4ff5db12d7a58e94"),
			"name" : "Penny Dreadful",
			"rating" : {
				"average" : 8.3
			}
		},
		{
			"_id" : ObjectId("64e3ad5a4ff5db12d7a58e8b"),
			"name" : "Homeland",
			"rating" : {
				"average" : 8.3
			}
		}
	],
	"Recent Shows" : [
		{
			"_id" : ObjectId("64e3affa4ff5db12d7a58e93"),
			"name" : "Constantine",
			"premiered" : "2014-10-24"
		},
		{
			"_id" : ObjectId("64e3af454ff5db12d7a58e91"),
			"name" : "The Flash",
			"premiered" : "2014-10-07"
		},
		{
			"_id" : ObjectId("64e3aea34ff5db12d7a58e8f"),
			"name" : "Gotham",
			"premiered" : "2014-09-22"
		},
		{
			"_id" : ObjectId("64e3b0294ff5db12d7a58e97"),
			"name" : "The Strain",
			"premiered" : "2014-07-13"
		},
		{
			"_id" : ObjectId("64e3b1874ff5db12d7a58e98"),
			"name" : "The Last Ship",
			"premiered" : "2014-06-22"
		}
	]
}
*/

db.movies
  .aggregate([
    {
      $facet: {
        topRated: [
          { $sort: { "rating.average": -1 } },
          { $limit: 5 },
          {
            $project: {
              _id: 0,
              movieName: "$name",
              movieRating: "$rating.average"
            }
          }
        ],
        information: [
          { $sort: { premiered: -1 } },
          { $limit: 5 },
          {
            $project: {
              _id: 0,
              movieName: "$name",
              movieFrom: "$network.country.name",
              movieLanguage: "$langauge"
            }
          }
        ]
      }
    }
  ])
  .pretty();
/* 
 {
	"topRated" : [
		{
			"movieName" : "Person of Interest",
			"movieRating" : 9
		},
		{
			"movieName" : "Grimm",
			"movieRating" : 8.5
		},
		{
			"movieName" : "Supernatural",
			"movieRating" : 8.4
		},
		{
			"movieName" : "Penny Dreadful",
			"movieRating" : 8.3
		},
		{
			"movieName" : "Homeland",
			"movieRating" : 8.3
		}
	],
	"information" : [
		{
			"movieName" : "Constantine",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		},
		{
			"movieName" : "The Flash",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		},
		{
			"movieName" : "Gotham",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		},
		{
			"movieName" : "The Strain",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		},
		{
			"movieName" : "The Last Ship",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		}
	]
}
*/

// here I want  get the information of the topRated movies, for that what i need
// to do?  and  if I need to work on same documents which are came in first stage
// of operation for them only I have to work on second stage only.
// how can I get fist sateged operation elments to second stage of operation in
// $fecet stage
//****************************************************** */
// To work on the same set of documents in subsequent stages within the $facet
// stage, you need to design the pipeline such that the documents processed in
// one facet are accessible to another facet. However, MongoDB’s $facet stage
// works independently for each pipeline, meaning the results of one facet do
// not automatically carry over to another.
// To address this, here are the possible solutions:

// To address this, here are the possible solutions:

db.movies
  .aggregate([
    {
      $sort: { "rating.average": -1 } // Sort the entire collection first by rating
    },
    {
      $limit: 5 // Limit the collection to the top 5 movies
    },
    {
      $facet: {
        topRated: [
          {
            $project: {
              _id: 0,
              movieName: "$name",
              movieRating: "$rating.average"
            }
          }
        ],
        information: [
          {
            $project: {
              _id: 0,
              movieName: "$name",
              movieFrom: "$network.country.name",
              movieLanguage: "$language"
            }
          }
        ]
      }
    }
  ])
  .pretty();
/*
  {
	"topRated" : [
		{
			"movieName" : "Person of Interest",
			"movieRating" : 9
		},
		{
			"movieName" : "Grimm",
			"movieRating" : 8.5
		},
		{
			"movieName" : "Supernatural",
			"movieRating" : 8.4
		},
		{
			"movieName" : "Penny Dreadful",
			"movieRating" : 8.3
		},
		{
			"movieName" : "Homeland",
			"movieRating" : 8.3
		}
	],
	"information" : [
		{
			"movieName" : "Person of Interest",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		},
		{
			"movieName" : "Grimm",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		},
		{
			"movieName" : "Supernatural",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		},
		{
			"movieName" : "Penny Dreadful",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		},
		{
			"movieName" : "Homeland",
			"movieFrom" : "United States",
			"movieLanguage" : "English"
		}
	]
}
*/

// $merge: Merge the Result with Another Collection

// Problem: Merge the result of an aggregation with the network_stats collection,
// updating existing entries or inserting new ones.

db.movies.aggregate([
  { $group: { _id: "network.name", noOfMovies: { $sum: 1 } } },
  {
    $merge: {
      into: "network_stats",
      whenMatched: "merge",
      whenNotMatched: "insert"
    }
  }
]);
// // show collections
// aggregate
// collection
// cursorPractis
// cursorprct
// movies
// network_stats
// persons
// practsAggr
// products
// sports
// users

db.network_stats.find().pretty();
/*
{ "_id" : "TNT", "noOfMovies" : 1 }
{ "_id" : "ABC", "noOfMovies" : 1 }
{ "_id" : "CBS", "noOfMovies" : 3 }
{ "_id" : "NBC", "noOfMovies" : 2 }
{ "_id" : "Showtime", "noOfMovies" : 2 }
{ "_id" : "FOX", "noOfMovies" : 2 }
{ "_id" : "FX", "noOfMovies" : 1 }
{ "_id" : "HBO", "noOfMovies" : 2 }
{ "_id" : "Space", "noOfMovies" : 1 }
{ "_id" : "The CW", "noOfMovies" : 4 }
{ "_id" : "Showcase", "noOfMovies" : 2 }
*/
db.movies.aggregate([
  { $match: { "rating.average": { $gt: 8 } } },
  {
    $merge: {
      into: "network_stats",
      whenMatched: "merge",
      whenNotMatched: "insert"
    }
  }
]);
//*************************************** */
