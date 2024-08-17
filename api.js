const { response } = require("express");

//synchronous code
const p = 23;
console.log(p);
console.log(p + 1);

const arr = [1, 2, 3, 4, 5];
const sqrtArr = arr.map((el) => el ** (1 / 2));
console.log(sqrtArr);

const cubeArr = async function (arr) {
  return arr.map((el) => el ** 2);
};

// const cubeArrResult = await cubeArr(arr);
// console.log(cubeArrResult);
/*
console.log("tyoeof cubeArr:", typeof cubeArr);
console.log("tyoeof cubeArrCall:", typeof cubeArr(arr));
console.log("111:", cubeArr(arr));

cubeArr(arr).then((res) => {
  console.log("handling with then-catch:", res);
});
*/
// const cubeArrResult = await cubeArr(arr);//SyntaxError: await is only valid in async functions and the top level bodies of modules
// console.log(cubeArrResult);

// 23
// 24
// [ 1, 1.4142135623730951, 1.7320508075688772, 2, 2.23606797749979 ]
// tyoeof cubeArr: function
// tyoeof cubeArrCall: object
// 111: Promise { [ 1, 4, 9, 16, 25 ] }
// handling with then-catch: [ 1, 4, 9, 16, 25 ]

/*
const arr = [1, 2, 3, 4, 5];

const cubeArr = async function (arr) {
  return arr.map((el) => el ** 3);
};

// To use the asynchronous function, you need to use 'await' or handle the Promise with 'then'
// Using 'await' (inside an async function or a top-level function marked with 'await')
// const result = await cubeArr(arr);
// console.log(result);

// Using 'then' to handle the Promise
cubeArr(arr).then((result) => {
  console.log(result);
});

// console is
// admin1@admin1-HP-Laptop-15q-ds0xxx:~/Desktop/againPracts$ node api.js
// /home/admin1/Desktop/againPracts/api.js:39
// const result = await cubeArr(arr);
//                ^^^^^

// SyntaxError: await is only valid in async functions and the top level bodies of modules
*/
/*
(async () => {
  const result = await cubeArr(arr);
  // console.log(result);

  //handling the promise
  cubeArr(arr).then((Res) => {
    // console.log("then-catch block", Res);
  });
})();
// [ 1, 8, 27, 64, 125 ]
// then-catch block [ 1, 8, 27, 64, 125 ]

//ASYNCHRONOUS CODE
console.log("1.", "outside async code");
setTimeout(() => {
  console.log(
    "2.",
    "inside async code in setTimeout function with 1500ms timout."
  );
}, 1500);
console.log("3.", "after async code");

// 1. outside async code
// 3. after async code
// 2. inside async code

const promise1 = new Promise(function (resolve) {
  setTimeout(() => {
    console.log("4.", "async code but inside promise with timout");
    resolve("from inside promise");
  }, 1000);
});
promise1
  .then((Res) => {
    console.log("5.", Res);
  })
  .catch((err) => {
    console.log(err);
  });

const setTimeoutFn = function () {
  setTimeout(() => {
    console.log("from setTimeout synchronous code");
  }, 1000);
};

setTimeoutFn();
// 1. outside async code
// 3. after async code
// 2. inside async code
// 4. async code but inside promise with timout
// 5. from inside promise
// from setTimeout synchronous code

const setTimeoutfnwithAsync = async function () {
  await setTimeout(() => {
    console.log("from setTimeout function with async/await");
  }, 1000);
};
setTimeoutfnwithAsync();

// output>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 2. inside async code in setTimeout function.
// 4. async code but inside promise with timout
// 5. from inside promise
// from setTimeout synchronous code
// from setTimeout function with async/await

console.log("after all asynchronous codes its printing.");

// after all asynchronous codes its printing.
// 4. async code but inside promise with timout
// 5. from inside promise
// from setTimeout synchronous code
// from setTimeout function with async/await
// 2. inside async code in setTimeout function with 1500ms timout.

//************    DIFFERENT TYPE OF ASYNCHRONOUS FUNCTIONS ***************** */
/*
// 1. callback-based sync function

function callbackBasedAsyncFn(callback) {
  setTimeout(() => {
    console.log("Data fetched.");
    callback("23");
  }, 2000);
}
// callbackBasedAsyncFn();
// Data fetched.
// TypeError: callback is not a function
callbackBasedAsyncFn((callback) => {
  console.log("callback excuted.", callback);
});
// Data fetched.
// callback excuted. 23

// 2. Promise-based async function.

function promiseBasedAsyncFn() {
  return new Promise((resolve, reject) => {
    // if (Math.random() >= 0.5) resolve("success!");
    // else reject("try again.");
    setTimeout(() => {
      resolve(23 + 2);
    }, 2000);
  });
}
promiseBasedAsyncFn()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
//try again.

//25

//3. Async/Await Functions:

async function asyncAwaitBasedAsyncFn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("from async-await based asynchronous function.");
    }, 2000);
  });
}
console.log(
  "pppp",
  asyncAwaitBasedAsyncFn()
    .then((res) => {
      console.log("rrr", res);
      return res;
    })
    .catch((err) => err)
);
// 1. outside async code
// 3. after async code
// after all asynchronous codes its printing.
// pppp Promise { <pending> }
// 4. async code but inside promise with timout of 1000 msec
// 5. from inside promise
// from setTimeout synchronous code
// from setTimeout function with async/await
// 2. inside async code in setTimeout function with 1500ms timout.
// Data fetchede async code
// 3. after async code
// after all asynchronous codes its printing.
// pppp Promise { <pending> }
// 4. async code but inside promise with timout
// 5. from inside promise
// from setTimeout synchronous code
// from setTimeout function with async/await
// 2. inside async code in setTimeout function with 1500ms timout.
// Data fetched.
// callback excuted. 23
// 25
// rrr from async-await based asynchronous function..
// callback excuted. 23
// 25
// rrr from async-await based asynchronous function.

// 4. Event-based asynchronous function.

// const eventEmitter = new EventEmitter();
// function fetchData() {
//   setTimeout(() => {
//     console.log("from eventemitter based async function.");
//     eventEmitter.emit("datafetched");
//   }, 2000);
// }
// eventEmitter.on("dataFetched", () => {
//   console.log("EVent emitted.");
// });
// fetchData();
*/
//************** API: Application Programing Interface    ******** */
/*
const request = fetch("https://restcountries.com/v2/name/india");
console.log(request);
console.log(fetch(" https://openweathermap.org/api"));
// Promise { <pending> }
// { Promise { <pending> } }

// here to see the result of the fetch() method we need to handl the result of the fetch()
// because fetch method will give the promise
request
  .then((result) => {
    return result.json();
  })
  .then((res) => {
    // console.log("11", res);
    // console.log(res[1]);
    let resObj = res[1];
    const output = {
      country: resObj.name,
      alpha3Code: resObj.alpha3Code,
      capital: resObj.capital,
      Population: resObj.population,
      area: resObj.area,
      latlng: resObj.latlng,
      currency: resObj.currencies,
      flag: resObj.flag
    };
    console.log(output);
  })
  .catch((err) => {
    console.log(err);
  });
// {
//   country: 'India',
//   alpha3Code: 'IND',
//   capital: 'New Delhi',
//   Population: 1380004385,
//   area: 3287590,
//   latlng: [ 20, 77 ],
//   currency: [ { code: 'INR', name: 'Indian rupee', symbol: '₹' } ],
//   flag: 'https://flagcdn.com/in.svg'
// }

const countryData = (country) => {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((res) => res.json())
    .then((result) => {
      // console.log("////", result);
      let resObj = result[0];
      const output = {
        country: resObj.name,
        alpha3Code: resObj.alpha3Code,
        capital: resObj.capital,
        Population: resObj.population,
        area: resObj.area,
        latlng: resObj.latlng,
        currency: resObj.currencies,
        languages: resObj.languages,
        flag: resObj.flag
      };
      console.log(output);
    })
    .catch((err) => {
      console.log("err>>>>", err);
    });
};
// countryData("usa");
// countryData("New Zealand");

const countryDatawithAsync = async (country) => {
  const request = await fetch(`https://restcountries.com/v2/name/${country}`);
  const data = await request.json();
  // console.log(request
  // console.log(data);

  const output = {
    country: data[0].name,
    alpha3Code: data[0].alpha3Code,
    capital: data[0].capital,
    Population: data[0].population,
    area: data[0].area,
    latlng: data[0].latlng,
    currency: data[0].currencies,
    languages: data[0].languages,
    flag: data[0].flag
  };
  console.log(output);
};
countryDatawithAsync("canada");
countryDatawithAsync("Argentina");

fetch(" https://openweathermap.org/api")
  .then((res) => res.json)
  .then((result) => {
    console.log("22", result);
  })
  .catch((err) => {
    console.log(err);
  });
// {
//   country: 'Argentina',
//   alpha3Code: 'ARG',
//   capital: 'Buenos Aires',
//   Population: 45376763,
//   area: 2780400,
//   latlng: [ -34, -64 ],
//   currency: [ { code: 'ARS', name: 'Argentine peso', symbol: '$' } ],
//   languages: [
//     {
//       iso639_1: 'es',
//       iso639_2: 'spa',
//       name: 'Spanish',
//       nativeName: 'Español'
//     },
//     {
//       iso639_1: 'gn',
//       iso639_2: 'grn',
//       name: 'Guaraní',
//       nativeName: "Avañe'ẽ"
//     }
//   ],
//   flag: 'https://flagcdn.com/ar.svg'
// }
// {
//   country: 'Canada',
//   alpha3Code: 'CAN',
//   capital: 'Ottawa',
//   Population: 38005238,
//   area: 9984670,
//   latlng: [ 60, -95 ],
//   currency: [ { code: 'CAD', name: 'Canadian dollar', symbol: '$' } ],
//   languages: [
//     {
//       iso639_1: 'en',
//       iso639_2: 'eng',
//       name: 'English',
//       nativeName: 'English'
//     },
//     {
//       iso639_1: 'fr',
//       iso639_2: 'fra',
//       name: 'French',
//       nativeName: 'français'
//     }
//   ],
//   flag: 'https://flagcdn.com/ca.svg'
// }
// fetch(" https://developer.twitter.com/en/docs")
//   .then((res) => {
//     console.log("????????", res);
//     console.log(res.json());
//     return res.json();
//   })
//   .then((data) => {
//     console.log(">>>", data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//   //???????? Response { status:200,........}
// // TypeError: Body is unusable
// // SyntaxError: Unexpected token < in JSON at position 7

// ***************************** PARALLEL OPERATION OF APS **************
//PROMISE.ALL()

const api1 = "https://restcountries.com/v2/name/pakistan";
const api2 = "https://api.genderize.io?name=ramesh";
const api3 = "https://api.chucknorris.io/jokes/random";

const apis = [api1, api2, api3];
// apis
//   .map((url) => fetch(url))
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("mapppp", data);
//   })
//   .catch((Err) => {
//     console.log(Err);
//   });
//   // TypeError: apis.map(...).then is not a function
apis.map((url) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("mapppp", data);
    })
    .catch((Err) => {
      console.log(Err);
    })
);
*/
// with
//  Promise.all():>> Promise.all() takes an array of promises and returns a singel
//promise that is fullfilled with an array of fullfillment values of the input
//promises in the same order as the input promises.

// Promise.all([api1, api2, api3])
// .then((res) => res.json())  //>TypeError: res.json is not a function
//here we need to handle the single promise only, here its giving array of prnding promises
// so take an array method to handle one promise at a time

//.then((res) => res.map((res) => res.json()))//TypeError: res.json is not a function
// handling the promises responses like this also not correct
//here all the respnses are promises in array format
//hence u need to use promise.all() again to handle the pending promises

// const apiPromises = [fetch(api1), fetch(api2), fetch(api3)];
// Promise.all(apiPromises)
//   .then((response) => {
//     console.log(">>>>>>>", response);
//     // console.log(
//     //   "lllllll",
//     //   response.map((res) => res.json())         //lllllll [ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]
//     // TypeError: Body is unusable
//     // );
//     const validResponse = response.filter(
//       (res) => res && res.json === "function"  **************
//     );
//     if (validResponse.length === response.length) {
//       // all respnoses are valide, proceed with parsing JSON
//       return Promise.all(response.map((res) => res.json()));
//     } else {
//       throw new Error("Invalid response is found.");
//     }
//   })
//   .then((data) => {
//     console.log("promise.all response: ", data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
const api1 = "https://restcountries.com/v2/name/pakistan";
const api2 = "https://api.genderize.io?name=ramesh";
const api3 = "https://api.chucknorris.io/jokes/random";

const apis = [api1, api2, api3];

const apiPromises = [fetch(api1), fetch(api2), fetch(api3)];

Promise.all(apiPromises)
  .then((responses) => {
    // Check if responses are valid HTTP responses
    const invalidResponses = responses.filter((res) => !res.ok);

    if (invalidResponses.length === 0) {
      // All responses are valid, proceed with parsing JSON
      return Promise.all(responses.map((res) => res.json()));
    } else {
      // Some responses are not valid HTTP responses
      throw new Error(
        `Invalid HTTP responses found: ${invalidResponses
          .map((res, index) => `Response ${index + 1}`)
          .join(", ")}`
      );
    }
  })
  .then((data) => {
    console.log("Promise.all response: ", data);
  })
  .catch((err) => {
    console.log(err.message);
  });

//output:

// Promise.all response:  [
//   [
//     {
//       name: 'Pakistan',
//       topLevelDomain: [Array],
//       alpha2Code: 'PK',
//       alpha3Code: 'PAK',
//       callingCodes: [Array],
//       capital: 'Islamabad',
//       altSpellings: [Array],
//       subregion: 'Southern Asia',
//       region: 'Asia',
//       population: 220892331,
//       latlng: [Array],
//       demonym: 'Pakistani',
//       area: 881912,
//       gini: 31.6,
//       timezones: [Array],
//       borders: [Array],
//       nativeName: 'Pakistan',
//       numericCode: '586',
//       flags: [Object],
//       currencies: [Array],
//       languages: [Array],
//       translations: [Object],
//       flag: 'https://flagcdn.com/pk.svg',
//       regionalBlocs: [Array],
//       cioc: 'PAK',
//       independent: true
//     }
//   ],
//   { count: 106446, name: 'ramesh', gender: 'male', probability: 1 },
//   {
//     categories: [],
//     created_at: '2020-01-05 13:42:27.496799',
//     icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
//     id: 'dekkwYxTR6ydFuejFeDf3g',
//     updated_at: '2020-01-05 13:42:27.496799',
//     url: 'https://api.chucknorris.io/jokes/dekkwYxTR6ydFuejFeDf3g',
//     value: 'Sorry, ..., but this fact has been deleted by Chuck Norris. It will be reposted. Chuck Norris will not delete it that time.'
//   }
// ]

Promise.all(apiPromises)
  .then((responses) => {
    console.log(responses);
    const invalidResponses = responses.filter((res) => !res.ok);
    if (invalidResponses === 0) {
      return Promise.all(responses.map((res) => res.json()));
    } else {
      throw new Error(
        `Invalid responses found: ${invalidResponses
          .map((res, index) => `${index + 1}:${res}`)
          .join(", ")}`
      );
    }
  })
  .then((data) => {
    console.log(data);
  });
//PROMISE.RACE()
//It takes an array of promises and return a new promise that resolves or
//rejects as soon as one of the input promise reslves or rejects
// which means promise.race() gives only one promise response which one is first resolve of rejected

// Promise.race(apiPromises)
//   .then((res) => res.json())
//   .then((result) => {
//     console.log("promise.race response: ", result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
