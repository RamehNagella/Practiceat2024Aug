//aggregation stages of mongodb are ******************************

const { Int32 } = require("mongodb");

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
db.moviesList.insertMany([
  { _id: 1, title: " movie1", network: { name: "Network A" } },
  { _id: 2, title: "movie2", network: { name: "Network B" } }
]);
db.networkList.insertMany([
  { id: 101, name: "Network A", country: "USA" },
  { id: 102, name: "Network B", country: "Canada" }
]);
db.moviesList.aggregate([
  {
    $lookup: {
      from: "networkList",
      localField: "network.name",
      foreignField: "name",
      as: "networkDetails"
    }
  }
])[
  ({
    _id: 1,
    title: " movie1",
    network: { name: "Network A" },
    networkDetails: [
      {
        _id: ObjectId("6704c085ee82939ec5136cc8"),
        id: 101,
        name: "Network A",
        country: "USA"
      }
    ]
  },
  {
    _id: 2,
    title: "movie2",
    network: { name: "Network B" },
    networkDetails: [
      {
        _id: ObjectId("6704c085ee82939ec5136cc9"),
        id: 102,
        name: "Network B",
        country: "Canada"
      }
    ]
  })
];
//assignning the result to variablbe
/*
const movieDetails = db.moviesList.aggregate([
...   {
...     $lookup: {
...       from: "networkList",
...       localField: "network.name",
...       foreignField: "name",
...       as: "networkDetails"
...     }
...   }
... ])
> movieDetails
{ "_id" : 1, "title" : " movie1", "network" : { "name" : "Network A" }, "networkDetails" : [ { "_id" : ObjectId("6704c085ee82939ec5136cc8"), "id" : 101, "name" : "Network A", "country" : "USA" } ] }
{ "_id" : 2, "title" : "movie2", "network" : { "name" : "Network B" }, "networkDetails" : [ { "_id" : ObjectId("6704c085ee82939ec5136cc9"), "id" : 102, "name" : "Network B", "country" : "Canada" } ] }
*/

// Key Point:
// The names of the fields (localField and foreignField) do not
//  need to be the same. They just need to contain matching
//  values for the $lookup to work.

// In this case, the join works correctly because the values in network.name ("Network A") match the
//  values in networkName ("Network A"), even though the field names are different.

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
// it is used to  take out the embedded document to top-level
// and replacing the original document structure entirely.

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
  query to find the no of shows that premiered after specific date?

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
db.members.findOne({});
/*
{
	"_id" : ObjectId("66c97781ebf623795aa1e3b2"),
	"gender" : "male",
	"name" : {
		"title" : "mr",
		"first" : "zachary",
		"last" : "lo"
	},
	"location" : {
		"street" : "3193 king st",
		"city" : "chipman",
		"state" : "yukon",
		"postcode" : "H8N 1Q8",
		"coordinates" : {
			"latitude" : "76.4507",
			"longitude" : "-70.2264"
		},
		"timezone" : {
			"offset" : "+11:00",
			"description" : "Magadan, Solomon Islands, New Caledonia"
		}
	},
	"email" : "zachary.lo@example.com",
	"login" : {
		"uuid" : "76970c67-4801-4926-80f0-4872fe0aee42",
		"username" : "lazyrabbit189",
		"password" : "pass1",
		"salt" : "BVMLMPwZ",
		"md5" : "a6ff61f912af9958587e0fc0c8dc920b",
		"sha1" : "bd37d1c699fb5a17031924c37e5d90ba4403e598",
		"sha256" : "0305e3ebf6f4502790d804cff5989a6a928f466af6e36bd808ad9ed24e51fee7"
	},
	"dob" : {
		"date" : "1988-10-17T03:45:04Z",
		"age" : 29
	},
	"registered" : {
		"date" : "2011-09-29T20:54:32Z",
		"age" : 6
	},
	"phone" : "273-427-0510",
	"cell" : "309-911-7770",
	"id" : {
		"name" : "",
		"value" : null
	},
	"picture" : {
		"large" : "https://randomuser.me/api/portraits/men/9.jpg",
		"medium" : "https://randomuser.me/api/portraits/med/men/9.jpg",
		"thumbnail" : "https://randomuser.me/api/portraits/thumb/men/9.jpg"
	},
	"nat" : "CA"
}

db.members.find({"location.state":"yukon"}).count()
23
//  "state" : "wicklow",
 

db.members.find({"location.state":"wicklow"}).count()
9
*/
//find the no of persons living in each city
db.members
  .aggregate([
    { $group: { _id: "$location.state", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ])
  .pretty();
/*
	 { "_id" : "midtjylland", "count" : 61 }
	{ "_id" : "nordjylland", "count" : 51 }
	{ "_id" : "new south wales", "count" : 47 }
	{ "_id" : "hovedstaden", "count" : 46 }
	{ "_id" : "australian capital territory", "count" : 44 }
	{ "_id" : "sjælland", "count" : 43 }
	{ "_id" : "syddanmark", "count" : 43 }
	{ "_id" : "queensland", "count" : 40 }
	{ "_id" : "tasmania", "count" : 38 }
	{ "_id" : "south australia", "count" : 37 }
	{ "_id" : "danmark", "count" : 36 }
	{ "_id" : "northern territory", "count" : 34 }
	{ "_id" : "victoria", "count" : 33 }
	{ "_id" : "zeeland", "count" : 30 }
	{ "_id" : "overijssel", "count" : 29 }
	{ "_id" : "nunavut", "count" : 29 }
	{ "_id" : "western australia", "count" : 28 }
	{ "_id" : "northwest territories", "count" : 28 }
	{ "_id" : "limburg", "count" : 28 }
	{ "_id" : "prince edward island", "count" : 27 }
	Type "it" for more
	*/
// find  how many persons are there in the "yokon state"
// to find the no of people in yukon city I wrote a query
db.members
  .aggregate([
    { $match: { "location.state": "yukon", noOfPeopleinYokon: { $sum: 1 } } }
  ])
  .pretty();
/*
assert: command failed: {
	"ok" : 0,
	"errmsg" : "unknown operator: $sum",
	"code" : 2,
	"codeName" : "BadValue"
} : aggregate failed
 where it gone wrong

*/
// The error in your query occurs because the $sum operator is being incorrectly
//  used inside the $match stage. The $match stage is used to filter documents
//  based on specified criteria, but it cannot perform aggregation operations
//  like $sum.

// To count the number of people in Yukon, you need to use the $group stage
// to aggregate the data after filtering the relevant
db.members
  .aggregate([
    { $match: { "location.state": "yukon" } },
    { $group: { _id: null, noOfPeopleinYukon: { $sum: 1 } } }
  ])
  .pretty();
// { "_id" : null, "noOfPeopleinYukon" : 23 }
db.members
  .aggregate([
    { $match: { "location.state": "yukon" } },
    { $group: { _id: "$location.state", noOfPeopleinYukon: { $sum: 1 } } }
  ])
  .pretty();
// { "_id" : "yukon", "noOfPeopleinYukon" : 23 }
db.members
  .aggregate([
    { $match: { "location.state": "victoria" } },
    { $group: { _id: "$location.state", noOfPeople: { $sum: 1 } } }
  ])
  .pretty();
// { "_id" : "victoria", "noOfPeople" : 33 }
db.members
  .aggregate([
    {
      $facet: {
        malePersons: [
          { $match: { gender: "male" } },
          { $group: { _id: "$location.state", noOfPeople: { $sum: 1 } } },
          {
            $project: { stateName: "$location.state", maleCount: "$noOfPeople" }
          },
          { $sort: { maleCount: -1 } },
          { $limit: 5 }
        ],
        femalePersons: [
          { $match: { gender: "female" } },
          { $group: { _id: "$location.state", noOfPeople: { $sum: 1 } } },
          {
            $project: {
              stateName: "$location.state",
              femaleCount: "$noOfPeople"
            }
          },
          { $sort: { femaleCount: -1 } },
          { $limit: 5 }
        ]
      }
    }
  ])
  .pretty();
/*
{
	"malePersons" : [
		{
			"_id" : "midtjylland",
			"maleCount" : 28
		},
		{
			"_id" : "hovedstaden",
			"maleCount" : 25
		},
		{
			"_id" : "sjælland",
			"maleCount" : 24
		},
		{
			"_id" : "nordjylland",
			"maleCount" : 24
		},
		{
			"_id" : "tasmania",
			"maleCount" : 23
		}
	],
	"femalePersons" : [
		{
			"_id" : "midtjylland",
			"femaleCount" : 33
		},
		{
			"_id" : "nordjylland",
			"femaleCount" : 27
		},
		{
			"_id" : "australian capital territory",
			"femaleCount" : 24
		},
		{
			"_id" : "new south wales",
			"femaleCount" : 24
		},
		{
			"_id" : "syddanmark",
			"femaleCount" : 24
		}
	]
}
*/
db.members
  .aggregate([
    { $match: { gender: "female" } },
    { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } }
  ])
  .pretty();
/*
	 { "_id" : { "state" : "oppland" }, "totalPersons" : 3 }
	{ "_id" : { "state" : "sinop" }, "totalPersons" : 3 }
	{ "_id" : { "state" : "finnmark - finnmárku" }, "totalPersons" : 8 }
	{ "_id" : { "state" : "haute-savoie" }, "totalPersons" : 1 }
	{ "_id" : { "state" : "west glamorgan" }, "totalPersons" : 4 }
	{ "_id" : { "state" : "solothurn" }, "totalPersons" : 4 }
	{ "_id" : { "state" : "taranaki" }, "totalPersons" : 6 }
	{ "_id" : { "state" : "aube" }, "totalPersons" : 5 }
	{ "_id" : { "state" : "minas gerais" }, "totalPersons" : 4 }
	{ "_id" : { "state" : "dumfries and galloway" }, "totalPersons" : 7 }
	{ "_id" : { "state" : "amazonas" }, "totalPersons" : 4 }
	{ "_id" : { "state" : "saarland" }, "totalPersons" : 8 }
	{ "_id" : { "state" : "bas-rhin" }, "totalPersons" : 2 }
	{ "_id" : { "state" : "tennessee" }, "totalPersons" : 3 }
	{ "_id" : { "state" : "haute-loire" }, "totalPersons" : 2 }
	{ "_id" : { "state" : "groningen" }, "totalPersons" : 9 }
	{ "_id" : { "state" : "pyrénées-orientales" }, "totalPersons" : 4 }
	{ "_id" : { "state" : "delaware" }, "totalPersons" : 3 }
	{ "_id" : { "state" : "خراسان رضوی" }, "totalPersons" : 10 }
	{ "_id" : { "state" : "dublin city" }, "totalPersons" : 6 }
	Type "it" for more
	*/

//find the no of perosns who are older than 50, then group them by gender
// and find out how many persons u hve per gender and what is the average
// age of totalPersons per gender then order the output the totlperson
db.members
  .aggregate([
    { $match: { "dob.age": { $gt: 50 } } },
    {
      $group: {
        _id: "$gender",
        count: { $sum: 1 },
        averageAgePerGender: { $avg: "$dob.age" }
      }
    },
    { $sort: { count: -1 } }
  ])
  .pretty();
//   { "_id" : "female", "count" : 1125, "averageAgePerGender" : 61.90577777777778 }
//   { "_id" : "male", "count" : 1079, "averageAgePerGender" : 62.066728452270624 }

// find the no of people per state and find how many members are there per gender
// and find their average age per gender
db.members
  .aggregate([
    { $group: { _id: "$location.state" } },
    {
      $facet: {
        maleStats: [
          {
            $group: {
              _id: { gender: "$gender", state: "$location.state" },
              totalpersonsPerGender: { $sum: 1 },
              avgAgePerGender: { $avg: "$dob.age" }
            }
          },
          { $sort: { totalpersonsPerGender: -1 } }
        ],
        femaleStats: [
          {
            $group: {
              _id: { gender: "$gender", state: "$location.state" },
              totalpersonsPerGender: { $sum: 1 },
              avgAgePerGender: { $avg: "$dob.age" }
            }
          },
          { $sort: { totalpersonsPerGender: 1 } }
        ]
      }
    }
  ])
  .pretty();
/*
  {
	"maleStats" : [
		{
			"_id" : {
				
			},
			"totalpersonsPerGender" : 533,
			"avgAgePerGender" : null
		}
	],
	"femaleStats" : [
		{
			"_id" : {
				
			},
			"totalpersonsPerGender" : 533,
			"avgAgePerGender" : null
		}
	]
}
*/
db.members
  .aggregate([
    {
      $facet: {
        maleStats: [
          { $match: { gender: "male" } },
          {
            $group: {
              _id: "$location.state",
              totalpersonsPerGender: { $sum: 1 },
              avgAge: { $avg: "$dob.age" }
            }
          },
          { $sort: { totalpersonsPerGender: -1 } },
          { $limit: 5 }
        ],
        femaleStats: [
          { $match: { gender: "female" } },
          {
            $group: {
              _id: "$location.state",
              totalpersonsPerGender: { $sum: 1 },
              avgAge: { $avg: "$dob.age" }
            }
          },
          { $sort: { totalpersonsPerGender: -1 } },
          { $limit: 5 }
        ]
      }
    }
  ])
  .pretty();
/*
  {
	"maleStats" : [
		{
			"_id" : "midtjylland",
			"totalpersonsPerGender" : 28,
			"avgAge" : 49.92857142857143
		},
		{
			"_id" : "hovedstaden",
			"totalpersonsPerGender" : 25,
			"avgAge" : 46.6
		},
		{
			"_id" : "sjælland",
			"totalpersonsPerGender" : 24,
			"avgAge" : 50.166666666666664
		},
		{
			"_id" : "nordjylland",
			"totalpersonsPerGender" : 24,
			"avgAge" : 45.791666666666664
		},
		{
			"_id" : "new south wales",
			"totalpersonsPerGender" : 23,
			"avgAge" : 45.04347826086956
		}
	],
	"femaleStats" : [
		{
			"_id" : "midtjylland",
			"totalpersonsPerGender" : 33,
			"avgAge" : 41.75757575757576
		},
		{
			"_id" : "nordjylland",
			"totalpersonsPerGender" : 27,
			"avgAge" : 45.111111111111114
		},
		{
			"_id" : "syddanmark",
			"totalpersonsPerGender" : 24,
			"avgAge" : 49.666666666666664
		},
		{
			"_id" : "new south wales",
			"totalpersonsPerGender" : 24,
			"avgAge" : 44.333333333333336
		},
		{
			"_id" : "australian capital territory",
			"totalpersonsPerGender" : 24,
			"avgAge" : 46.291666666666664
		}
	]
}
*/

//simple form of above query
db.members
  .aggregate([
    {
      $group: {
        _id: { state: "$location.state", gender: "$gender" },
        totalPersons: { $sum: 1 },
        avgAge: { $avg: "$dob.age" }
      }
    },
    { $sort: { "_id.state": 1, "_id.gender": 1 } },
    { $limit: 3 }
  ])
  .pretty();
/*
  {
	"_id" : {
		"state" : "aargau",
		"gender" : "female"
	},
	"totalPersons" : 10,
	"avgAge" : 44.9
}
{
	"_id" : {
		"state" : "aargau",
		"gender" : "male"
	},
	"totalPersons" : 3,
	"avgAge" : 58.333333333333336
}
{
	"_id" : {
		"state" : "acre",
		"gender" : "female"
	},
	"totalPersons" : 2,
	"avgAge" : 32
}
*/

db.members.aggregate([
  { $project: { _id: 0, gender: 1, fullName: ["Hellow", "World"] } }
]);
/*
{ "gender" : "male", "fullName" : [ "Hellow", "World" ] }
{ "gender" : "male", "fullName" : [ "Hellow", "World" ] }
{ "gender" : "male", "fullName" : [ "Hellow", "World" ] }
*/
// 1. Print the names
db.members.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: ["$name.title", "$name.first", "$name.last"],
      age: "$dob.age",
      email: "$email"
    }
  }
]);
/*
{ "gender" : "male", "fullName" : [ "mr", "zachary", "lo" ], "age" : 29, "email" : "zachary.lo@example.com" }
{ "gender" : "male", "fullName" : [ "mr", "victor", "pedersen" ], "age" : 59, "email" : "victor.pedersen@example.com" }
{ "gender" : "male", "fullName" : [ "mr", "harvey", "chambers" ], "age" : 30, "email" : "harvey.chambers@example.com" }
*/

//2. pront the name in capital letters
db.members.aggregate([
  {
    $project: {
      _id: 0,
      name: {
        $concat: [{ $toUpper: "$name.first" }, { $toUpper: "$name.last" }]
      }
    }
  }
]);
/*
{ "name" : "ZACHARYLO" }
{ "name" : "VICTORPEDERSEN" }
{ "name" : "HARVEYCHAMBERS" }
{ "name" : "GIDEONVAN DRONGELEN" }
{ "name" : "CARLJACOBS" }
{ "name" : "ELIJAHLEWIS" }
{ "name" : "OLAVOEHME" }
*/
// { $substrCp: [ <string>, <start>, <length> ] }
// <string>: The string from which to extract the substring.
// <start>: The starting position (zero-based index) in code points.
// <length>: The number of code points to include in the substring.

db.members.aggregate([
  {
    $project: {
      _id: 0,
      fullName: {
        $concat: [
          { $toUpper: { $substrCp: ["$name.first", 0, 1] } },
          {
            $substrCp: [
              "$name.first",
              1,
              { $substrCp: [{ $strLenCp: "$name.first" }, 1] }
            ]
          },
          { $toUpper: { $substrCp: ["$name.last", 0, 1] } },
          {
            $substrCp: [
              "$name.last",
              1,
              { $substrCp: [{ $strLenCp: "name.last" }, 1] }
            ]
          }
        ]
      }
    }
  }
]);

//turning the location into a geojason object
db.members.findOne({}, { location: 1 });
[
  {
    _id: ObjectId("66c97781ebf623795aa1e3b2"),
    location: {
      street: "3193 king st",
      city: "chipman",
      state: "yukon",
      postcode: "H8N 1Q8",
      coordinates: {
        latitude: "76.4507",
        longitude: "-70.2264"
      },
      timezone: {
        offset: "+11:00",
        description: "Magadan, Solomon Islands, New Caledonia"
      }
    }
  }
];

db.members
  .aggregate([
    {
      $project: {
        _id: 0,
        name: { $concat: ["$name.first", "$name.last"] },
        location: {
          type: "Point",
          coordinates: [
            "$location.coordinates.longitude",
            "$location.coordintes.latitude"
          ]
        }
      }
    }
  ])
  .pretty();
// { "location" : { "type" : "Point", "coordinates" : [ "-70.2264", null ] }, "name" : "zacharylo" }
// { "location" : { "type" : "Point", "coordinates" : [ "-31.0208", null ] }, "name" : "victorpedersen" }
// { "location" : { "type" : "Point", "coordinates" : [ "168.9462", null ] }, "name" : "harveychambers" }
// { "location" : { "type" : "Point", "coordinates" : [ "-54.1364", null ] }, "name" : "gideonvan drongelen"
db.members.aggregate([
  {
    $project: {
      _id: 0,
      name: { $concat: ["$name.first", "$name.last"] },
      location: {
        type: "Point",
        coordinates: [
          { $toDouble: "$location.coordinates.longitude" },
          { $toDouble: "$location.coordinates.latitude" }
        ]
      }
    }
  }
]);

//another method to convert coordinates
db.members.aggregate([
  {
    $project: {
      _id: 0,
      fullName: { $concat: ["$name.first", "$name.last"] },
      location: {
        type: "Point",
        coordinates: [
          {
            $convert: {
              input: "$location.coordinates.longitude",
              to: "double",
              onError: 0,
              onNull: 0
            }
          },
          {
            $convert: {
              input: "$location.coordinates.latitude",
              to: "double",
              onError: 0,
              onNull: 0
            }
          }
        ]
      }
    }
  }
]);
// { "location" : { "type" : "Point", "coordinates" : [ -70.2264, 76.4507 ] }, "fullName" : "zacharylo" }
// { "location" : { "type" : "Point", "coordinates" : [ -31.0208, -29.8113 ] }, "fullName" : "victorpedersen" }
// { "location" : { "type" : "Point", "coordinates" : [ 168.9462, -22.5329 ] }, "fullName" : "harveychambers" }
// { "location" : { "type" : "Point", "coordinates" : [ -54.1364, -86.1268 ] }, "fullName" : "gideonvan drongelen" }
// { "location" : { "type" : "Point", "coordinates" : [ -154.6037, -29.6721 ] }, "fullName" : "carljacobs" }
// { "location" : { "type" : "Point", "coordinates" : [ -18.5996, -42.6128 ] }, "fullName" : "elijahlewis" }

//TRANSFORMAING BIRTHDATE
db.members.aggregate([
  {
    $project: {
      _id: 0,
      email: 1,
      birthDate: { $convert: { input: "$dob.date", to: "date" } },
      location: {
        type: "Point",
        coordinates: [
          {
            $convert: { input: "$location.coordinates.longitude", to: "double" }
          },
          {
            $convert: { input: "$location.coordinates.latitude", to: "double" }
          }
        ]
      }
    }
  }
]);
// { "location" : { "type" : "Point", "coordinates" : [ -70.2264, 76.4507 ] }, "email" : "zachary.lo@example.com", "birthDate" : ISODate("1988-10-17T03:45:04Z") }
// { "location" : { "type" : "Point", "coordinates" : [ -31.0208, -29.8113 ] }, "email" : "victor.pedersen@example.com", "birthDate" : ISODate("1959-02-19T23:56:23Z") }
// { "location" : { "type" : "Point", "coordinates" : [ 168.9462, -22.5329 ] }, "email" : "harvey.chambers@example.com", "birthDate" : ISODate("1988-05-27T00:14:03Z") }
// { "location" : { "type" : "Point", "coordinates" : [ -54.1364, -86.1268 ] }, "email" : "gideon.vandrongelen@example.com", "birthDate" : ISODate("1971-03-28T04:47:21Z") }
// { "location" : { "type" : "Point", "coordinates" : [ -154.6037, -29.6721 ] }, "email" : "carl.jacobs@example.com", "birthDate" : ISODate("1984-09-30T01:20:26Z") }
db.members.find({}, { _id: 0, "dob.date": 1 });
// { "dob" : { "date" : "1988-10-17T03:45:04Z" } }
// { "dob" : { "date" : "1959-02-19T23:56:23Z" } }
// { "dob" : { "date" : "1988-05-27T00:14:03Z" } }
// { "dob" : { "date" : "1971-03-28T04:47:21Z" } }

//using shortcut to Transfromation

db.members.aggregate([
  {
    $project: {
      _id: 0,
      email: 1,
      birthDate: { $toDate: "$dob.date" }
    }
  }
]);
// { "email" : "zachary.lo@example.com", "birthDate" : ISODate("1988-10-17T03:45:04Z") }
// { "email" : "victor.pedersen@example.com", "birthDate" : ISODate("1959-02-19T23:56:23Z") }
// { "email" : "harvey.chambers@example.com", "birthDate" : ISODate("1988-05-27T00:14:03Z") }
// { "email" : "gideon.vandrongelen@example.com", "birthDate" : ISODate("1971-03-28T04:47:21Z") }
// { "email" : "carl.jacobs@example.com", "birthDate" : ISODate("1984-09-30T01:20:26Z") }
// { "email" : "elijah.lewis@example.com", "birthDate" : ISODate("1986-03-29T06:40:18Z") }
//find the no of persons born on each year
db.members.aggregate([
  { $project: { _id: 0, email: 1, birthDate: { $toDate: "$dob.date" } } },
  {
    $group: {
      _id: { birthYear: { $isoWeekYear: "$birthDate" } },
      numPersons: { $sum: 1 }
    }
  }
]);
// { "_id" : { "birthYear" : NumberLong(1984) }, "numPersons" : 93 }
// { "_id" : { "birthYear" : NumberLong(1948) }, "numPersons" : 100 }
// { "_id" : { "birthYear" : NumberLong(1995) }, "numPersons" : 101 }
// { "_id" : { "birthYear" : NumberLong(1988) }, "numPersons" : 89 }
// { "_id" : { "birthYear" : NumberLong(1986) }, "numPersons" : 93 }
// { "_id" : { "birthYear" : NumberLong(1951) }, "numPersons" : 79 }

//PUSHING NEWLY CREATED ARRAY
db.movies.find({}, { name: 1, genres: 1, _id: 0 }).pretty();
/*
{
	"name" : "Under the Dome",
	"genres" : [
		"Drama",
		"Science-Fiction",
		"Thriller"
	]
}
{
	"name" : "Person of Interest",
	"genres" : [
		"Drama",
		"Action",
		"Crime"
	]
}
{ "name" : "Bitten", "genres" : [ "Drama", "Horror", "Romance" ] }
{
	"name" : "Arrow",
	"genres" : [
		"Drama",
		"Action",
		"Science-Fiction"
	]
}
{
	"name" : "True Detective",
	"genres" : [
		"Drama",
		"Crime",
		"Thriller"
	]
}
{
	"name" : "The 100",
	"genres" : [
		"Action",
		"Adventure",
		"Science-Fiction"
	]
}
{
	"name" : "Homeland",
	"genres" : [
		"Drama",
		"Thriller",
		"Espionage"
	]
}
{ "name" : "Glee", "genres" : [ "Drama", "Music", "Romance" ] }
{ "name" : "Revenge", "genres" : [ "Drama", "Thriller", "Mystery" ] }
{ "name" : "Grimm", "genres" : [ "Drama", "Crime", "Supernatural" ] }
{ "name" : "Gotham", "genres" : [ "Drama", "Action", "Crime" ] }
{ "name" : "Lost Girl", "genres" : [ "Drama", "Fantasy", "Horror" ] }
*/

db.movies
  .aggregate([
    {
      $project: {
        _id: 0,
        movieName: "$name",
        genres: { $slice: ["$genres", 1] }
      }
    }
  ])
  .pretty();
//prints the first element of the array i.e index:0 position will print
// { "movieName" : "Under the Dome", "genres" : [ "Drama" ] }
// { "movieName" : "Person of Interest", "genres" : [ "Drama" ] }
// { "movieName" : "Bitten", "genres" : [ "Drama" ] }
// { "movieName" : "Arrow", "genres" : [ "Drama" ] }
// { "movieName" : "True Detective", "genres" : [ "Drama" ] }
// { "movieName" : "The 100", "genres" : [ "Action" ] }
// { "movieName" : "Homeland", "genres" : [ "Drama" ] }
// { "movieName" : "Glee", "genres" : [ "Drama" ] }

db.movies
  .aggregate([
    {
      $project: {
        _id: 0,
        movieName: "$name",
        genres: { $slice: ["$genres", 1, 2] }
      }
    }
  ])
  .pretty();
//$slice: ["$genres", 1, 2] goes to genres array here 1:represent index position of the array
//   2: represent  upto what number index position element we want print
// hence  the above syntax represent print the hobbies array elements array
// from index 1 position element to index3 element position element

/*{
	"movieName" : "Under the Dome",
	"genres" : [
		"Science-Fiction",
		"Thriller"
	]
}
{ "movieName" : "Person of Interest", "genres" : [ "Action", "Crime" ] }
{ "movieName" : "Bitten", "genres" : [ "Horror", "Romance" ] }
{ "movieName" : "Arrow", "genres" : [ "Action", "Science-Fiction" ] }
{ "movieName" : "True Detective", "genres" : [ "Crime", "Thriller" ] }
{
	"movieName" : "The 100",
	"genres" : [
		"Adventure",
		"Science-Fiction"
	]
}
{ "movieName" : "Homeland", "genres" : [ "Thriller", "Espionage" ] }
{ "movieName" : "Glee", "genres" : [ "Music", "Romance" ] }
{ "movieName" : "Revenge", "genres" : [ "Thriller", "Mystery" ] }


*/
db.users.aggregate([
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } }
]);
//creates new array naming allHobbies and insert the $hobbies elements of users collection
// by grouping with certain age
/*
{
	"_id" : {
		"age" : 23
	},
	"allHobbies" : [
		[
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
		]
	]
}
{
	"_id" : {
		"age" : null
	},
	"allHobbies" : [
		[
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
		[
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
		],
		[
			{
				"title" : "Walking",
				"frequency" : 1
			},
			{
				"title" : "shopping",
				"frequency" : 2
			}
		],
*/
db.arrayData
  .aggregate([
    { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } }
  ])
  .pretty();
/*
	{
		"_id" : {
			"age" : 29
		},
		"allHobbies" : [
			[
				"Sports",
				"Cooking"
			],
			[
				"Cooking",
				"Skiing"
			]
		]
	}
	{
		"_id" : {
			"age" : 30
		},
		"allHobbies" : [
			[
				"Eating",
				"Data Analytics"
			]
		]
	}
	*/

//find the length of the array
db.users.aggregate([
  { $project: { _id: 0, name: 1, lengthOfHobbiesArr: { $size: "$hobbies" } } }
]);
// { "name" : "Max", "lengthOfHobbiesArr" : 2 }
// { "name" : "Jonas", "lengthOfHobbiesArr" : 2 }
// { "name" : "Jack", "lengthOfHobbiesArr" : 2 }
// { "name" : "Stalin", "lengthOfHobbiesArr" : 2 }
// { "name" : "Dean", "lengthOfHobbiesArr" : 3 }
// { "name" : "Maria", "lengthOfHobbiesArr" : 4 }
// { "name" : "Steven", "lengthOfHobbiesArr" : 5 }
// { "name" : "John", "lengthOfHobbiesArr" : 3 }
// { "name" : "Rko", "lengthOfHobbiesArr" : 3 }

//******************************* */
//USING PROJECTION ON ARRAAYS

db.arrayData.find({}, { examScores: 1, _id: 0 });
// { "examScores" : [ { "difficulty" : 4, "score" : 57.9 }, { "difficulty" : 6, "score" : 62.1 }, { "difficulty" : 3, "score" : 88.5 } ] }
// { "examScores" : [ { "difficulty" : 3, "score" : 75.1 }, { "difficulty" : 8, "score" : 44.2 }, { "difficulty" : 6, "score" : 61.5 } ] }
// { "examScores" : [ { "difficulty" : 7, "score" : 52.1 }, { "difficulty" : 2, "score" : 74.3 }, { "difficulty" : 5, "score" : 53.1 } ] }

db.arrayData.aggregate([
  { $project: { _id: 0, examScore: { $slice: ["$examScores", 1] } } }
]);
//   { "examScore" : [ { "difficulty" : 4, "score" : 57.9 } ] }
//   { "examScore" : [ { "difficulty" : 3, "score" : 75.1 } ] }
//   { "examScore" : [ { "difficulty" : 7, "score" : 52.1 } ] }
db.arrayData.aggregate([
  {
    $project: { _id: 0, name: 1, examScore: { $slice: ["$examScores", 1, 3] } }
  }
]);
// { "examScore" : [ { "difficulty" : 6, "score" : 62.1 }, { "difficulty" : 3, "score" : 88.5 } ] }
// { "examScore" : [ { "difficulty" : 8, "score" : 44.2 }, { "difficulty" : 6, "score" : 61.5 } ] }
// { "examScore" : [ { "difficulty" : 2, "score" : 74.3 }, { "difficulty" : 5, "score" : 53.1 } ] }
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
// i have documents like this in the users collection, NOw I just want to take out
// the hobbies field values and create a new array on hobbiesArr for each name,
// then how can I write a query using aggregation framework? please write?
db.users
  .aggregate([
    {
      $addFields: {
        hobbiesArr: {
          $map: { input: "$hobbies", as: "hobby", in: "$$hobby.title" }
        }
      }
    },
    { $project: { _id: 0, name: 1, hobbiesArr: 1 } }
  ])
  .pretty();
/*
{ "name" : "Max", "hobbiesArr" : [ "Sports", "Cooking" ] }
{ "name" : "Jonas", "hobbiesArr" : [ "Sports", "teaching" ] }
{ "name" : "Jack", "hobbiesArr" : [ "Walking", "shopping" ] }
{ "name" : "Stalin", "hobbiesArr" : [ "Sports", "Cooking" ] }
{ "name" : "Dean", "hobbiesArr" : [ "Sports", "Cooking", "Hiking" ] }
{
	"name" : "Maria",
	"hobbiesArr" : [
		"Cooking",
		"Sports",
		"Hiking",
		"Cooking"
	]
}
{
	"name" : "Steven",
	"hobbiesArr" : [
		null,
		null,
		null,
		"Running",
		null
	]
}
{ "name" : "John", "hobbiesArr" : [ null, null, null ] }
{ "name" : "Rko", "hobbiesArr" : [ null, null, null ] }
*/

// ********************************************************

// $map operator

/* The $map operator is used to apply the specific expression in an array and
 return an array with results.
 It allows you to transform elements of an arry inside documents.
 
//  syntaxx
{
  $map: {
	input: <array>,
		as:<variable_name>,
		in: <expression>
  }
}
*/
// ex
db.users.aggregate([
  {
    $project: {
      hobbiesArr: {
        _id: 0,
        name: 1,
        $map: { input: "$hobbies", as: "hobby", in: "$$hobby.title" }
      }
    }
  }
]);
/*
	assert: command failed: {
		"ok" : 0,
		"errmsg" : "Invalid $project :: caused by :: Cannot do inclusion on field name 
		in exclusion projection",
		"code" : 31253,
		"codeName" : "Location31253"
	} : aggregate failed
The error you're encountering is due to a conflict between inclusion and exclusion 
in the $project stage. In MongoDB's aggregation framework, when using the 
$project stage, you must either include fields or exclude fields, but you 
cannot mix both approaches.

Here's a breakdown of the issue:

In your query, you attempted to include the name field and exclude the _id 
field at the same time, which led to the error.
$map is used to transform the array, but it should be directly within the 
hobbiesArr field assignment, not inside the inclusion/exclusion.
To fix this issue, ensure you're either including or excluding fields, but 
not both in the same $project stage.
*/
db.users.aggregate([
  {
    $project: {
      _id: 0, // Exclude _id field
      name: 1, // Include name field
      hobbiesArr: {
        $map: {
          input: "$hobbies",
          as: "hobby",
          in: "$$hobby.title"
        }
      }
    }
  }
]);

db.users.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      hobbiesArr: {
        $map: { input: "$hobbies", as: "hobby", in: "$$hobby.title" }
      }
    }
  }
]);
/*
{ "name" : "Max", "hobbiesArr" : [ "Sports", "Cooking" ] }
{ "name" : "Jonas", "hobbiesArr" : [ "Sports", "teaching" ] }
{ "name" : "Jack", "hobbiesArr" : [ "Walking", "shopping" ] }
{ "name" : "Stalin", "hobbiesArr" : [ "Sports", "Cooking" ] }
{ "name" : "Dean", "hobbiesArr" : [ "Sports", "Cooking", "Hiking" ] }
{ "name" : "Maria", "hobbiesArr" : [ "Cooking", "Sports", "Hiking", "Cooking" ] }
{ "name" : "Steven", "hobbiesArr" : [ null, null, null, "Running", null ] }
{ "name" : "John", "hobbiesArr" : [ null, null, null ] }
{ "name" : "Rko", "hobbiesArr" : [ null, null, null ] }
*/
db.users.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      hobbiesFrequency: {
        $map: {
          input: "$hobbies",
          as: "hobbyFreq",
          in: "$$hobbyFreq.frequency"
        }
      }
    }
  }
]);
/*
{ "name" : "Max", "hobbiesFrequency" : [ 2, 3 ] }
{ "name" : "Jonas", "hobbiesFrequency" : [ 1, 5 ] }
{ "name" : "Jack", "hobbiesFrequency" : [ 1, 2 ] }
{ "name" : "Stalin", "hobbiesFrequency" : [ 2, 1 ] }
{ "name" : "Dean", "hobbiesFrequency" : [ 3, 3, 1 ] }
{ "name" : "Maria", "hobbiesFrequency" : [ 2, 2, 2, 1 ] }
{ "name" : "Steven", "hobbiesFrequency" : [ null, null, null, 2, null ] }
{ "name" : "John", "hobbiesFrequency" : [ null, null, null ] }
{ "name" : "Rko", "hobbiesFrequency" : [ null, null, null ] }
*/
db.users.aggregate([
  {
    $project: {
      hobbiesFrequency: {
        $map: {
          input: "$hobbies",
          as: "hobbyFreq",
          in: "$$hobbyFreq.frequency"
        }
      }
    }
  }
]);

// { "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "hobbiesFrequency" : [ 2, 3 ] }
// { "_id" : ObjectId("66bc16d23d6802bbff2744df"), "hobbiesFrequency" : [ 1, 5 ] }
// { "_id" : ObjectId("66bc2cdd3d6802bbff2744e2"), "hobbiesFrequency" : [ 1, 2 ] }
// { "_id" : ObjectId("66bc2e5a3d6802bbff2744e4"), "hobbiesFrequency" : [ 2, 1 ] }
// { "_id" : ObjectId("66bd73baaf3abccac1c4a1cb"), "hobbiesFrequency" : [ 3, 3, 1 ] }
// { "_id" : ObjectId("66bed0a429bb79f34a966a1c"), "hobbiesFrequency" : [ 2, 2, 2, 1 ] }
// { "_id" : ObjectId("66c09b35b2cc291f1488dd83"), "hobbiesFrequency" : [ null, null, null, 2, null ] }
// { "_id" : ObjectId("66c54fc6b933caba4e209f41"), "hobbiesFrequency" : [ null, null, null ] }
// { "_id" : ObjectId("66c54fc6b933caba4e209f42"), "hobbiesFrequency" : [ null, null, null ] }

db.arrayData.find().pretty();
/*
{
	"_id" : ObjectId("66c9e44b591f40664004c24c"),
	"name" : "Max",
	"hobbies" : [
		"Sports",
		"Cooking"
	],
	"age" : 29,
	"examScores" : [
		{
			"difficulty" : 4,
			"score" : 57.9
		},
		{
			"difficulty" : 6,
			"score" : 62.1
		},
		{
			"difficulty" : 3,
			"score" : 88.5
		}
	]
}
*/
//print the examScores score and difficulty level of each person  in the arrayData collection

db.arrayData
  .aggregate([
    {
      $addFields: {
        examInfo: {
          $map: {
            input: "$examScores",
            as: "exam",
            in: "$$exam.difficulty"
          }
        }
      }
    }
  ])
  .pretty();
/*
	{
		"_id" : ObjectId("66c9e44b591f40664004c24c"),
		"name" : "Max",
		"hobbies" : [
			"Sports",
			"Cooking"
		],
		"age" : 29,
		"examScores" : [
			{
				"difficulty" : 4,
				"score" : 57.9
			},
			{
				"difficulty" : 6,
				"score" : 62.1
			},
			{
				"difficulty" : 3,
				"score" : 88.5
			}
		],
		"examInfo" : [       ////////////////////////// added new fields  
			4,
			6,
			3
		]
	}
*/
db.arrayData.aggregate([
  {
    $project: { _id: 0, name: 1, examScore: { $slice: ["$examScores", 1, 3] } }
  }
]);
/*
	  { "name" : "Max", "examScore" : [ { "difficulty" : 6, "score" : 62.1 }, { "difficulty" : 3, "score" : 88.5 } ] }
	  { "name" : "Maria", "examScore" : [ { "difficulty" : 8, "score" : 44.2 }, { "difficulty" : 6, "score" : 61.5 } ] }
	  { "name" : "Manu", "examScore" : [ { "difficulty" : 2, "score" : 74.3 }, { "difficulty" : 5, "score" : 53.1 } ] }
  */
/*

//

//*************************************************** *

// what is the use of $addFields operator in aggregation frmework
The $addFields operator in MongoDB's aggregation framework is used to 
add new fields to documents or modify existing fields within a document 
during an aggregation pipeline. It doesn't change the original documents 
in the collection but creates new documents with the specified fields in 
the aggregation result.
Key Features:
Add New Fields: You can create and add new fields to each document in the 
aggregation pipeline.

Modify Existing Fields: You can alter existing fields by specifying a new 
value or computation.

Flexible Usage: The fields can be added or modified based on expressions, 
calculations, or other operations.
*/
// Example Scenarios:
// {
// 	"_id": 1,
// 	"product": "Laptop",
// 	"price": 1000,
// 	"quantity": 3
//   }
//find the total money need to get the products and create a doucment
db.product.aggregate([
  {
    $addFields: {
      totalMoneyNeed: { $multiply: ["$price", "$quantity"] }
    }
  }
]);
// {
// 	"_id": 1,
// 	"product": "Laptop",
// 	"price": 1000,
// 	"quantity": 3,
// 	"totalValue": 3000
//   }

//   mofifying an Existing field
db.products.aggregate([
  {
    $addFields: {
      status: {
        $cond: {
          if: { $gte: ["$totalValue", 2500] },
          then: "Rich",
          else: "Poor"
        }
      }
    }
  }
]);
// {
// 	"_id": 1,
// 	"product": "Laptop",
// 	"price": 1000,
// 	"quantity": 3,
// 	"totalValue": 3000
// status: "Rich"
//   }

db.arrayData.find({}, { age: 1, _id: 0 }).pretty();
// { "age" : 29 }
// { "age" : 29 }
// { "age" : 30 }

db.arrayDate.updateMany(
  {},
  {
    $addFields: {
      age: {
        $cond: {
          if: { $gte: ["$age", 29] },
          then: { $inc: ["$age", 5] },
          else: { $inc: ["$age", 2] }
        }
      }
    }
  }
);
// // 2024-08-27T08:17:13.081+0530 E QUERY    [thread1] SyntaxError: expected expression, got ')' @(shell):16:0
// //  where is wrong in the code
// //  The error in your code is due to several issues:

// Incorrect use of $addFields within an updateMany operation: $addFields is an
// aggregation operator and should beused within an aggregation pipeline,
//  not directly in an updateMany operation. Instead, you should use the
//   $set operator in an updateMany operation.

// Incorrect use of $inc operator: The $inc operator is used to increment
// a field by a specified amount, but it doesn't work the way you're trying
// to use it inside $cond. You should simply add the desired increment to the
// field.

// Incorrect placement of _id: 0: _id: 0 should be used within a $project stage
//  in an aggregation pipeline, not in an updateMany operation. In updateMany,
//  it is not valid.

db.arrayDate.aggregate(
  {},
  {
    $addFields: {
      age: {
        $cond: {
          if: { $gte: ["$age", 29] },
          then: { $inc: ["$age", 5] },
          else: { $inc: ["$age", 2] }
        }
      }
    },
    _id: 0
  }
);
/*
assert: command failed: {
	"ok" : 0,
	"errmsg" : "A pipeline stage specification object must contain exactly one field.",
	"code" : 40323,
	"codeName" : "Location40323"
} : aggregate failed
*/
db.arrayData.aggregate([
  {
    $addFields: {
      age: {
        $cond: {
          if: { $gte: ["$age", 29] },
          then: { $add: ["$age", 5] },
          else: { $add: ["$age", 2] }
        }
      }
    }
  }
]);
db.arrayData.aggregate([
  {
    $addFields: {
      _id: 0,
      age: {
        $cond: {
          if: { $gte: ["$age", 29] },
          then: { $add: ["$age", 5] },
          else: "$age"
        }
      }
    }
  }
]);
// above two are correct queries will retrunurned modified fields
db.users.aggregate([
  {
    $project: {
      hobbiesFrequency: {
        $map: {
          input: "$hobbies",
          as: "hobbyFreq",
          in: "$$hobbyFreq.frequency"
        }
      }
    }
  }
]);

//****************************************
/*
$filter: operator is a powerful technique that is used to filter the elements of 
 an array based on specified condition. 
 This operator is especially useful when you want to include only specific elements
 from an array that meet certain criteria. 

 {
	$filter: {
	  input: <array>,           // The array to be filtered
	  as: <variable>,           // Optional name for the variable that represents each element of the array
	  cond: <expression>        // The condition to apply to each element
	}
  }

Parameters
input: The array you want to filter.
as: (Optional) A name for the variable that represents each element in 
the array during the filtering process. If not specified, the default 
name is $$this.
cond: The condition to evaluate. The elements that satisfy this 
condition will be included in the output array.
*/
[
  {
    _id: ObjectId("1"),
    name: "Alice",
    age: 25,
    hobbies: [
      { title: "Reading", frequency: 5 },
      { title: "Cooking", frequency: 3 },
      { title: "Hiking", frequency: 1 }
    ]
  }
];

//filter the hobbies based on frequency
// filter the hobbies array whose hobbieFrequency is greater than 2
db.arrayData.aggregate([
  {
    $project: {
      hobbies: {
        $filter: {
          input: "$hobbies",
          as: "hobby",
          condi: { $gt: ["$$hobby.frequency", 2] }
        }
      }
    }
  }
]);

// {
// 	"_id": ObjectId("1"),
// 	"name": "Alice",
// 	"hobbies": [
// 	  { "title": "Reading", "frequency": 5 },
// 	  { "title": "Cooking", "frequency": 3 }
// 	]
//   }

//  with $map operator
db.users.aggregate([
  {
    $project: {
      hobbiesFrequency: {
        $map: {
          input: "$hobbies",
          as: "hobbyFreq",
          in: "$$hobbyFreq.frequency"
        }
      }
    }
  }
]);

// { "_id" : ObjectId("66bc16d23d6802bbff2744dd"), "hobbiesFrequency" : [ 2, 3 ] }
// { "_id" : ObjectId("66bc16d23d6802bbff2744df"), "hobbiesFrequency" : [ 1, 5 ] }

// $filter operator returns document of fields whose meet the specified condition
// $map operator returns documents with feilds which are defined in the stage

//> //find the documents whose scores are greater than 50
db.arrayData
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        examScores: {
          $filter: {
            input: "$examScores",
            as: "scores",
            cond: { $gt: ["$$scores.score", 50] }
          }
        }
      }
    }
  ])
  .pretty();
/*
{
	"name" : "Max",
	"examScores" : [
		{
			"difficulty" : 4,
			"score" : 57.9
		},
		{
			"difficulty" : 6,
			"score" : 62.1
		},
		{
			"difficulty" : 3,
			"score" : 88.5
		}
	]
}
{
	"name" : "Maria",
	"examScores" : [
		{
			"difficulty" : 3,
			"score" : 75.1
		},
		{
			"difficulty" : 6,
			"score" : 61.5
		}
	]
}
{
	"name" : "Manu",
	"examScores" : [
		{
			"difficulty" : 7,
			"score" : 52.1
		},
		{
			"difficulty" : 2,
			"score" : 74.3
		},
		{
			"difficulty" : 5,
			"score" : 53.1
		}
	]
}
*/
// find the documents of scores of each person , whose scores are greater than 50;

db.arrayData.aggregate([
  {
    $match: {
      "examScores.score": { $gt: 50 },
      "examScores.difficulty": { $gt: 4 }
    }
  },
  { $project: { _id: 0, name: 1, examScores: 1 } }
]);
/*
	{ "name" : "Max", "examScores" : [ { "difficulty" : 4, "score" : 57.9 }, { "difficulty" : 6, "score" : 62.1 }, { "difficulty" : 3, "score" : 88.5 } ] }
	{ "name" : "Maria", "examScores" : [ { "difficulty" : 3, "score" : 75.1 }, { "difficulty" : 8, "score" : 44.2 }, { "difficulty" : 6, "score" : 61.5 } ] }
	{ "name" : "Manu", "examScores" : [ { "difficulty" : 7, "score" : 52.1 }, { "difficulty" : 2, "score" : 74.3 }, { "difficulty" : 5, "score" : 53.1 } ] }
	
	which is giving falut result because its printing docs either greater than 50 or 
	difficulty greater than 4 but not the docs which satisfyies both condition

	To satidfies both condition you can use $elemMatch
*/
db.arrayData.aggregate([
  {
    $match: {
      $elemMatch: {
        "examScores.score": { $gt: 50 },
        "examScores.difficulty": { $gt: 3 }
      }
    }
  },
  { $project: { _id: 0, name: 1, examScores: 1 } }
]);
// assert: command failed: {
// 	"ok" : 0,
// 	"errmsg" : "unknown top level operator: $elemMatch. If you have a field name that starts with a '$' symbol, consider using $getField or $setField.",
// 	"code" : 2,
// 	"codeName" : "BadValue"
// } : aggregate failed

//The way of writing the query is not correct

// correct wat of writng the query with $elemMatch
db.arrayData.aggregate([
  {
    $match: {
      examScores: {
        $elemMatch: {
          score: { $gt: 50 },
          difficulty: { $gt: 3 }
        }
      }
    }
  },
  { $project: { _id: 0, name: 1, examScores: 1 } }
]);
// { "name" : "Max", "examScores" : [ { "difficulty" : 4, "score" : 57.9 }, { "difficulty" : 6, "score" : 62.1 }, { "difficulty" : 3, "score" : 88.5 } ] }
// { "name" : "Maria", "examScores" : [ { "difficulty" : 3, "score" : 75.1 }, { "difficulty" : 8, "score" : 44.2 }, { "difficulty" : 6, "score" : 61.5 } ] }
// { "name" : "Manu", "examScores" : [ { "difficulty" : 7, "score" : 52.1 }, { "difficulty" : 2, "score" : 74.3 }, { "difficulty" : 5, "score" : 53.1 } ] }
db.arrayData.aggregate([
  {
    $match: {
      examScores: {
        $and: [{ score: { $gt: 50 } }, { difficulty: { $gt: 3 } }]
      }
    }
  },
  { $project: { _id: 0, name: 1, examScores: 1 } }
]);
//which is wrong giving error as unknown $and operaotor

db.arrayData.aggregate([
  {
    $match: {
      $and: [
        { "examScores.score": { $gt: 50 } },
        { "examScores.difficulty": { $gt: 3 } }
      ]
    }
  },
  { $project: { _id: 0, name: 1, examScores: 1 } }
]);
// { "name" : "Max", "examScores" : [ { "difficulty" : 4, "score" : 57.9 }, { "difficulty" : 6, "score" : 62.1 }, { "difficulty" : 3, "score" : 88.5 } ] }
// { "name" : "Maria", "examScores" : [ { "difficulty" : 3, "score" : 75.1 }, { "difficulty" : 8, "score" : 44.2 }, { "difficulty" : 6, "score" : 61.5 } ] }
// { "name" : "Manu", "examScores" : [ { "difficulty" : 7, "score" : 52.1 }, { "difficulty" : 2, "score" : 74.3 }, { "difficulty" : 5, "score" : 53.1 } ] }

//using $filter operator
db.arrayData.aggregate([
  {
    $match: {
      examInfo: {
        $filter: {
          input: "$examScores",
          as: "exam",
          condi: { $gt: ["$$exam.score", 50], $gt: ["$$exam.difficulty", 3] }
        }
      }
    }
  },
  { $project: { _id: 0, name: 1, examScores: 1 } }
]);
/*
assert: command failed: {
	"ok" : 0,
	"errmsg" : "unknown operator: $filter",
	"code" : 2,
	"codeName" : "BadValue"
} : aggregate failed
*/
db.arrayData.aggregate([
  {
    $match: {
      examInfo: {
        $filter: {
          input: "$examScores",
          as: "exam",
          cond: {
            $and: [
              { $gt: ["$$exam.score", 50] },
              { $gt: ["$$exam.difficulty", 3] }
            ]
          }
        }
      }
    }
  },
  { $project: { _id: 0, name: 1, examScores: 1 } }
]);
// assert: command failed: {
// 	"ok" : 0,
// 	"errmsg" : "unknown operator: $filter",
// 	"code" : 2,
// 	"codeName" : "BadValue"
// } : aggregate failed
//  why I am getting the error even evrything is corrcet?
/*        ********************************************************************
The error you're encountering occurs because the $filter operator is only valid 
within the $project stage or other stages that support transformations, 
such as $addFields or $set. It cannot be used directly within a $match stage.
The $match stage is specifically designed for filtering documents based on 
conditions, not for transforming data.

To achieve your goal, you need to structure the query differently:

Use $match to filter documents that contain at least one matching element 
in the array.
Use $project (with $filter) to isolate and return only the elements of the 
array that match your conditions.
*/
db.arrayData.aggregate([
  {
    $match: {
      examScores: {
        $elemMatch: {
          score: { $gt: 50 },
          difficulty: { $gt: 3 }
        }
      }
    }
  },
  { $project: { _id: 0, name: 1, examScores: 1 } }
]);
// { "name" : "Max", "examScores" : [ { "difficulty" : 4, "score" : 57.9 }, { "difficulty" : 6, "score" : 62.1 }, { "difficulty" : 3, "score" : 88.5 } ] }
// { "name" : "Maria", "examScores" : [ { "difficulty" : 3, "score" : 75.1 }, { "difficulty" : 8, "score" : 44.2 }, { "difficulty" : 6, "score" : 61.5 } ] }
// { "name" : "Manu", "examScores" : [ { "difficulty" : 7, "score" : 52.1 }, { "difficulty" : 2, "score" : 74.3 }, { "difficulty" : 5, "score" : 53.1 } ] }
db.arrayData.aggregate([
  {
    $match: {
      examScores: {
        $elemMatch: {
          score: { $gt: 50 },
          difficulty: { $gt: 3 }
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      examScores: {
        $filter: {
          input: "$examScores",
          as: "exam",
          cond: {
            $and: [
              { $gt: ["$$exam.score", 50] },
              { $gt: ["$$exam.difficulty", 3] }
            ]
          }
        }
      }
    }
  }
]);
// { "name" : "Max", "examScores" : [ { "difficulty" : 4, "score" : 57.9 }, { "difficulty" : 6, "score" : 62.1 } ] }
// { "name" : "Maria", "examScores" : [ { "difficulty" : 6, "score" : 61.5 } ] }
// { "name" : "Manu", "examScores" : [ { "difficulty" : 7, "score" : 52.1 }, { "difficulty" : 5, "score" : 53.1 } ] }

//************************************************************* */
// can we use array operators in $match stage
/*

Yes, array operators like $elemMatch, $size, $all, and $in can be used in 
the $match stage to filter documents based on array fields.

No, projection operators like $filter, $filter cannot be used in the $match stage.

Reason:
$map and $filter are projection operators, meaning they are designed to transform data rather 
than filter documents. They are used to manipulate arrays within a document, 
typically within stages like $project, $addFields, or $set.
The $match stage is specifically designed for filtering documents based on 
conditions, and it cannot transform or manipulate data.

*/
db.arrayData.aggregate([
  {
    $match: {
      $all: [
        { $gt: ["$examScores.score", 50] },
        { $gt: ["$examScores.difficulty", 3] }
      ]
    }
  },
  { $project: { _id: 0, examScores: 1, name: 1 } }
]);
// assert: command failed: {
// 	"ok" : 0,
// 	"errmsg" : "unknown top level operator: $all. If you have a field name that starts with a '$' symbol, consider using $getField or $setField.",
// 	"code" : 2,
// 	"codeName" : "BadValue"
// } : aggregate failed
db.arrayData.aggregate([
  {
    $match: {
      examScores: {
        $all: [{ $gt: ["$score", "50"] }, { $gt: ["$difficulty", 3] }]
      }
    }
  },
  { $project: { _id: 0, examScores: 1, name: 1 } }
]);
/*
assert: command failed: {
	"ok" : 0,
	"errmsg" : "no $ expressions in $all",
	"code" : 2,
	"codeName" : "BadValue"
} : aggregate failed

The error you're encountering is because the $all operator does not accept 
expressions like $gt inside it. The $all operator is used to match array
 fields that contain all the specified elements, but it doesn't work with
  comparison expressions.
  db.arrayData.aggregate([
  {
    $match: {
      examScores: { $all: [50, 60, 70] }
    }
  }
])
db.collection.aggregate([
  {
    $match: {
      examScores: { $size: 3 }
    }
  }
])
db.collection.aggregate([
  {
    $match: {
      examScores: {
        $elemMatch: {
          score: { $gt: 50 },
          difficulty: { $gt: 3 }
        }
      }
    }
  }
])


The $all operator is not suitable for applying conditions like $gt. 
It’s used for checking if an array contains specific elements.
For conditional matching within arrays, use $elemMatch in 
the $match stage and $filter in the $project stage to fine-tune 
which elements to return.
  */

//******************************************** */

// $bucket: it is used to distribute the data among specified values
/*
the $bucket stage is used to group the documents into buckets based on 
specifiied expression and range BOUNDARIES.
Is's paritcularly useful for CATEGORIZING into different groups or 
"buckets" based on a numberic field, like hositograms
Basic Structure of the $bucket Stage
The $bucket stage requires the following:

groupBy: The field or expression to group by.
boundaries: An array of values that define the boundaries of the buckets.
 The values must be sorted in ascending order.
default (optional): A bucket for values that don't fall within the 
specified boundaries.
output (optional): Specifies the fields to include in the output and 
the aggregation expressions to apply.

*/
// example
db.arrayData.aggregate([
  {
    $bucket: {
      groupBy: "$examScores.score",
      boundaries: [0, 25, 50, 75, 100],
      default: "Other",
      output: {
        name: 1,
        boundaryBelongsTo: "$boundries"
      }
    }
  }
]);
// assert: command failed: {
// 	"ok" : 0,
// 	"errmsg" : "The field 'name' must be an accumulator object",
// 	"code" : 40234,
// 	"codeName" : "Location40234"
// } : aggregate failed
//***************************************** */
// this  error because the FIELDS WITHIN THE OUTPUT SECTION OF "$bucket" stage
// must be ACCUMULATOR objects, NOT SIMPLE FIELD NAMES or REFERENCES.
// Accumulators are used to calculate aggregated values ofr the documents
// that fall into each bucket

db.arrayData
  .aggregate([
    {
      $bucket: {
        groupBy: { $avg: "$examScores.score" }, // Assuming you want to bucket based on the average score
        boundaries: [0, 25, 50, 75, 100], // Define the bucket boundaries
        default: "Other", // Handle values that don't fit in the defined boundaries
        output: {
          names: { $push: "$name" }, // Collect the names of all people in each bucket
          scores: { $push: "$examScores.score" }, // Collect the scores
          examScores: { $push: "$examScores" } // Push the entire examScores array if needed
        }
      }
    }
  ])
  .pretty()[
  {
    _id: 50,
    names: ["Max", "Maria", "Manu"],
    scores: [
      [57.9, 62.1, 88.5],
      [75.1, 44.2, 61.5],
      [52.1, 74.3, 53.1]
    ],
    examScores: [
      [
        { difficulty: 4, score: 57.9 },
        { difficulty: 6, score: 62.1 },
        { difficulty: 3, score: 88.5 }
      ],
      [
        { difficulty: 3, score: 75.1 },
        { difficulty: 8, score: 44.2 },
        { difficulty: 6, score: 61.5 }
      ],
      [
        { difficulty: 7, score: 52.1 },
        { difficulty: 2, score: 74.3 },
        { difficulty: 5, score: 53.1 }
      ]
    ]
  }
];

db.arrayData.updateOne(
  { name: "Max" },
  {
    $set: {
      examScores: [
        {
          difficulty: 4,
          score: 57.9
        },
        {
          difficulty: 3,
          score: 62.1
        },
        {
          difficulty: 3,
          score: 88.5
        },

        {
          difficulty: 2,
          score: 62.1
        },
        {
          difficulty: 1,
          score: 88.5
        }
      ]
    }
  }
);

db.arrayData.updateOne(
  {},
  { $push: { examScores: { difficulty: 1, score: 98 } } }
);

db.arrayData.findOne()[
  {
    _id: ObjectId("66c9e44b591f40664004c24c"),
    name: "Max",
    hobbies: ["Sports", "Cooking"],
    age: 29,
    examScores: [
      {
        difficulty: 4,
        score: 57.9
      },
      {
        difficulty: 3,
        score: 62.1
      },
      {
        difficulty: 3,
        score: 88.5
      },
      {
        difficulty: 2,
        score: 62.1
      },
      {
        difficulty: 1,
        score: 88.5
      },
      {
        difficulty: 1,
        score: 98
      }
    ]
  }
];
//group the each level quetions
db.arrayDate.aggregate([
  {
    $group: {
      _id: { examLevel: "$examScores.difficulty" },
      category: { $push: "$examScores.score" }
    }
  },
  { $project: { name: 1, age: 1, category: 1 } }
]);
// Grouping by Exam Level: You want to group documents by the difficulty level of
//  the examScores. However, examScores is an array, and you need to unwind the array
//  before grouping.

// Projecting Fields: In the $project stage, you are attempting to include
// fields like name and age, but these fields aren't part of the aggregation
// pipeline you’ve set up, which may lead to errors.
//correct query
db.arrayData.aggregate([
  { $unwind: "$examScores" },
  {
    $group: {
      _id: "$examScores.difficulty",
      scores: { $push: "$examScores.score" },
      students: { $push: "$name" }
    }
  },
  {
    $project: {
      students: 1,
      scores: 1,
      count: { $sum: 1 },
      average: { $avg: "$scores" }
    }
  }
]);
// { "_id" : 7, "scores" : [ 52.1 ], "students" : [ "Manu" ], "count" : 1, "average" : 52.1 }
// { "_id" : 3, "scores" : [ 62.1, 88.5, 75.1 ], "students" : [ "Max", "Max", "Maria" ], "count" : 1, "average" : 75.23333333333333 }
// { "_id" : 4, "scores" : [ 57.9 ], "students" : [ "Max" ], "count" : 1, "average" : 57.9 }
// { "_id" : 6, "scores" : [ 61.5 ], "students" : [ "Maria" ], "count" : 1, "average" : 61.5 }
// { "_id" : 1, "scores" : [ 88.5, 98 ], "students" : [ "Max", "Max" ], "count" : 1, "average" : 93.25 }
// { "_id" : 2, "scores" : [ 62.1, 74.3 ], "students" : [ "Max", "Manu" ], "count" : 1, "average" : 68.2 }
// { "_id" : 8, "scores" : [ 44.2 ], "students" : [ "Maria" ], "count" : 1, "average" : 44.2 }
// { "_id" : 5, "scores" : [ 53.1 ], "students" : [ "Manu" ], "count" : 1, "average" : 53.1 }

db.arrayData.aggregate([
  { $unwind: "$examScores" },
  {
    $group: {
      _id: "$examScores.difficulty",
      score: { $push: "$examScores.score" },
      students: { $push: "$name" },
      count: { $sum: 1 },
      average: { $avg: "$scores" }
    }
  },
  {
    $project: {
      _id: 1,
      students: 1,
      scores: 1
    }
  },
  {
    $bucket: {
      groupBy: "$_id",
      boundaries: [0, 1, 2, 3, 4, 5, 6, 7],
      default: "Others",
      output: {
        students: 1,
        scores: 1,
        count: 1,
        average: 1
      }
    }
  }
]);
//correct query is
db.arrayData.aggregate([
  { $unwind: "$examScores" }, // Unwind the examScores array
  {
    $group: {
      _id: "$examScores.difficulty", // Group by exam difficulty
      scores: { $push: "$examScores.score" }, // Collect scores in an array
      students: { $push: "$name" }, // Collect student names in an array
      count: { $sum: 1 }, // Count the number of students
      average: { $avg: "$examScores.score" } // Calculate the average score for each difficulty level
    }
  },
  {
    $bucket: {
      groupBy: "$_id", // Group by difficulty level
      boundaries: [0, 1, 2, 3, 4, 5, 6, 7], // Define boundaries for difficulty levels
      default: "Others", // Default bucket for values outside the boundaries
      output: {
        students: { $push: "$students" }, // Push students array
        scores: { $push: "$scores" }, // Push scores array
        count: { $sum: "$count" }, // Sum the counts
        average: { $avg: "$average" } // Average of the averages
      }
    }
  }
]);

// { "_id" : 1, "students" : [ [ "Max", "Max" ] ], "scores" : [ [ 88.5, 98 ] ], "count" : 2, "average" : 93.25 }
// { "_id" : 2, "students" : [ [ "Max", "Manu" ] ], "scores" : [ [ 62.1, 74.3 ] ], "count" : 2, "average" : 68.2 }
// { "_id" : 3, "students" : [ [ "Max", "Max", "Maria" ] ], "scores" : [ [ 62.1, 88.5, 75.1 ] ], "count" : 3, "average" : 75.23333333333333 }
// { "_id" : 4, "students" : [ [ "Max" ] ], "scores" : [ [ 57.9 ] ], "count" : 1, "average" : 57.9 }
// { "_id" : 5, "students" : [ [ "Manu" ] ], "scores" : [ [ 53.1 ] ], "count" : 1, "average" : 53.1 }
// { "_id" : 6, "students" : [ [ "Maria" ] ], "scores" : [ [ 61.5 ] ], "count" : 1, "average" : 61.5 }
// { "_id" : "Others", "students" : [ [ "Manu" ], [ "Maria" ] ], "scores" : [ [ 52.1 ], [ 44.2 ] ], "count" : 2, "average" : 48.150000000000006 }

//find the students whose got marks on each level
db.arrayData.aggregate([
  { $unwind: "$examScores" }, // Unwind the examScores array
  {
    $bucket: {
      groupBy: "$examScores.difficulty", // Group by difficulty level
      boundaries: [0, 1, 2, 3, 4, 5, 6, 7, 8], // Define boundaries for difficulty levels
      default: "Others", // Default bucket for values outside the boundaries
      output: {
        students: { $push: "$name" }, // Push students array
        scores: { $push: "$examScores.score" }, // Push scores array
        noOfStudentsonEachLevel: { $sum: 1 }, // Sum of the students on each level
        averageMarksOnEachLevel: { $avg: "$examScores.score" } // Average of the averages
      }
    }
  }
]);

/*
{ "_id" : 1, "students" : [ "Max", "Max" ], "scores" : [ 88.5, 98 ], "noOfStudentsonEachLevel" : 2, "averageMarksOnEachLevel" : 93.25 }
{ "_id" : 2, "students" : [ "Max", "Manu" ], "scores" : [ 62.1, 74.3 ], "noOfStudentsonEachLevel" : 2, "averageMarksOnEachLevel" : 68.2 }
{ "_id" : 3, "students" : [ "Max", "Max", "Maria" ], "scores" : [ 62.1, 88.5, 75.1 ], "noOfStudentsonEachLevel" : 3, "averageMarksOnEachLevel" : 75.23333333333333 }
{ "_id" : 4, "students" : [ "Max" ], "scores" : [ 57.9 ], "noOfStudentsonEachLevel" : 1, "averageMarksOnEachLevel" : 57.9 }
{ "_id" : 5, "students" : [ "Manu" ], "scores" : [ 53.1 ], "noOfStudentsonEachLevel" : 1, "averageMarksOnEachLevel" : 53.1 }
{ "_id" : 6, "students" : [ "Maria" ], "scores" : [ 61.5 ], "noOfStudentsonEachLevel" : 1, "averageMarksOnEachLevel" : 61.5 }
{ "_id" : 7, "students" : [ "Manu" ], "scores" : [ 52.1 ], "noOfStudentsonEachLevel" : 1, "averageMarksOnEachLevel" : 52.1 }
{ "_id" : "Others", "students" : [ "Maria" ], "scores" : [ 44.2 ], "noOfStudentsonEachLevel" : 1, "averageMarksOnEachLevel" : 44.2 }

*/
// here I am trying to print each level of marks students got, I got students
// name who are on which level but unable to getting score. How can I get the scores
// please write the query
// The issue in your query is with the field name in the scores array inside the $bucket stage. You incorrectly referenced "$examScores.scores" instead
// of "$examScores.score". The field name should match the actual field
// inside the examScores array, which is score.

//here we got ON EACH LEVEL HOW MANY STUDENTS ARE GOT THE MARKS AND THIER AVERAGE
