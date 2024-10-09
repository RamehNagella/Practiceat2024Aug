// // //programs
// // // you have two apis, you need to get the data from one api and use
// // // it in second api
// // // you have some data like 3 ids have same address and other 2 ids have
// // // other address then write a programme to find the address if i given
// // // any one of the id you have
// // // how to run number of apis at a time
// // // write a progrmme to get the data from api and use it in your programme
// // // to print the details of an employee

// const { application } = require("express");

// // // //synchronous code
// // // const p = 23;
// // // console.log(p);
// // // console.log(p + 1);

// // // const { Code } = require("mongodb");

// // // const arr = [1, 2, 3, 4, 5];

// // const sqrArr = arr.map((el) => el ** 2);
// // const cubicArr = arr.map((el) => el ** 3);
// // const sqrtArr = arr.map((el) => el ** (1 / 2));
// // console.log(sqrtArr, sqrArr, cubicArr);
// // // // [ 1, 1.4142135623730951, 1.7320508075688772, 2, 2.23606797749979 ]
// // // // [ 1, 4, 9, 16, 25 ] [ 1, 8, 27, 64, 125 ]

// // console.log(typeof sqrArr, typeof sqrArr[1], sqrArr[1]);
// // // // object number 4
// // // // In JavaScript, arrays are a special type of object.
// // // // When you check the type of an array using typeof, it will
// // // return "object" because arrays are technically objects in JavaScript.

// // // const squreArr = async function (arr) {
// // //   return arr.map((el) => el ** 2);
// // // };
// // // console.log(squreArr(arr)); //Promise { [ 1, 4, 9, 16, 25 ] }

// // //1
// // // console.log(
// // //   ">>",
// // //   squreArr(arr).then((res) => res)
// // // );
// // // >> Promise { <pending> }
// // //2.
// // // squreArr(arr).then((res) => {
// // //   console.log(res);
// // // });
// // //[ 1, 4, 9, 16, 25 ]
// // // .then((result) => result)

// // //

// // // // 1.
// // // console.log(
// // //   ">>",
// // //   squreArr(arr).then((res) => res)
// // // );
// // // /*
// // // In this case, you're logging the result of the then method directly.
// // // Here's what happens:

// // // squreArr(arr) returns a promise because it's an async function.
// // // The then method is attached to this promise, and it also returns a
// // //  new promise.

// // // The console.log statement is executed immediately, before the promise
// // // has been resolved.

// // // Since the promise is still pending, the output is Promise { <pending> }.
// // // So, what you see in the console is the promise object itself in
// // // a pending state.
// // // */
// // // // 2.
// // // squreArr(arr).then((res) => {
// // //   console.log(res);
// // // });
// // // /*
// // // In this case, you wait for the promise to resolve and then log the result:

// // // squreArr(arr) again returns a promise.
// // // The then method is used to attach a callback that will run once the
// // // promise is resolved.

// // // When the promise resolves, the callback function is executed, and
// // // console.log(res) logs the result. The result [1, 4, 9, 16, 25] is
// // // logged after the promise resolves.

// // // Key Difference
// // // In the first case, you're logging the promise immediately, so you see
// // // Promise { <pending> } because the promise hasn't resolved yet.

// // // In the second case, you're logging the result of the resolved promise inside the then callback,
// // // so you see the actual array [1, 4, 9, 16, 25] once the promise has resolved.
// // // The main difference is when the console.log is executed relative to the
// // // promise resolution:

// // // Case 1: Logs immediately, showing the promise state.
// // // Case 2: Logs after the promise has resolved, showing the resolved value.
// // //
// // // but i used a then method to resolve the promise right?

// // // squreArr(arr) returns a promise.
// // // .then((res) => res) is chained to this promise, which returns a
// // // new promise that resolves to the same value (res).

// // // console.log(">>", ...) is called before the promise resolves,

// // //  //   so it logs the new promise object itself, which is still pending at that moment.
// // // const squreArrResult = await squreArr(arr);
// // // console.log(squreArr);
// // //SyntaxError: await is only valid in async functions and the top level bodies of modules
// // // console.log(squreArrResult);
// // // const squreArrResult = await squreArr(arr);
// // //                        ^^^^^

// // // // SyntaxError: await is only valid in async functions and the top level bodies of modules

// // // //using top level await

// // // (async () => {
// // //   const result = await squreArr(arr);
// // //   console.log("from iife", result);
// // //   //handling the promise
// // //   squreArr(arr)
// // //     .then((res) => {
// // //       console.log("handling promise from IIFE ", res);
// // //     })
// // //     .catch((err) => {
// // //       console.log(err);
// // //     });
// // // })();

// // // // from iife [ 1, 4, 9, 16, 25 ]
// // // // handling promise from IIFE  [ 1, 4, 9, 16, 25 ]

// // // /*
// // // const squreArr = async function (arr) {
// // //   return arr.map((el) => el ** 2);
// // // };
// // // (async () => {
// // //   const result = await squreArr(arr);
// // //   console.log("from iife", result);
// // //   //handling the promise
// // //   squreArr
// // //     .then((res) => {
// // //       console.log("handling promise from IIFE ", res);
// // //     })
// // //     .catch((err) => {
// // //       console.log(err);
// // //     });
// // // })();
// // // .then((res) => {
// // // 	^

// // // TypeError: squreArr.then is not a function
// // //    at /home/admin1/Desktop/againPracts/restApis/api29Aug.js:111:6
// // //    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

// // // Node.js v18.17.1
// // // why that error is coming ?
// // // The error occurs because you're trying to use the .then method on squreArr,
// // // which is an async function, not a promise. Here's a detailed explanation:
// // // */
// // // //
// // // //ASYNC CODE

// // console.log("1. outside async code");

// // setTimeout(() => {
// //   console.log("2. inside async function (setTimeout)");
// // }, 1000);

// // console.log("2. after async function ");

// // // 1. outside async code
// // // 2. after async function
// // // 2. inside async function (setTimeout)

// // const promise1 = new Promise(function (res, rej) {
// //   setTimeout(() => {
// //     console.log("4. async funciton from promise");
// //   }, 1000);
// // });

// // // promise1.then((res) => {
// // //   console.log("5", res);
// // // });

// // const promise2 = new Promise(function (resolve, reject) {
// //   if (Math.random() > 0.5) resolve("You won!");
// //   else reject("you loss");
// // });
// // promise2
// //   .then((res) => {
// //     console.log("from promise without having asynchronous function ", res);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });
// // //   1. outside async code
// // //   2. after async function
// // //   you loss       // >>>>>>>>>>>>>.this is having any asynchronous function (like setTimeout, setInterval)inside it
// // //   2. inside async function (setTimeout)
// // //   4. async funciton from promise    //>> this coming from promise but present in asynchronous function

// // // second time run
// // //********************************************** */
// // // 1. outside async code		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.synchronous code
// // // 2. after async function      >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> synchronous code
// // // from promise without having asynchronous function  You won!>> promise without having any asynchronous function
// // // 2. inside async function (setTimeout) >>>>>>>>>>>>>>>>>>>>>>>  from asynchronous function without having any promise
// // // 4. async funciton from promise     >>>>>>>>>>>>>>>>>>>>>>>>>>> from promise but code is present in asynchronus functionn

// // // // code execution work flow is like this
// // // // synchrnous Code
// // // // promises without having any asynchronous function
// // // // order of asynchronous function and promise having asynchronous function

// // const asyncFn1 = setTimeout(() => {
// //   console.log("1a. inside asynchronous function outside of promise ");
// // }, 1000);

// // const promise3 = new Promise(function (res, rej) {
// //   setTimeout(() => {
// //     console.log("1. asynchronous function iinsdie promise");
// //   }, 1000);
// // });
// // promise3.then((res) => {
// //   console.log("2", res);
// // });

// // // const asyncFn = setTimeout(() => {
// // //   console.log("2. inside asynchronous function outside of promise");
// // // }, 1000);
// // // const promise4 = new Promise(function (res, rej) {
// // //   setTimeout(() => {
// // //     console.log(
// // //       "3. asynchronous function insdie promise but after asynchronous function  "
// // //     );
// // //   }, 1000);
// // // });
// // // promise4.then((res) => {
// // //   console.log("4.", res);
// // // });
// // // // 1a. inside asynchronous function outside of promise
// // // // 1. asynchronous function iinsdie promise
// // // // 2. inside asynchronous function outside of promise
// // // // 3. asynchronous function insdie promise but after asynchronous function
// // // // 1. asynchronous function
// // // // 2. inside asynchronous function
// // // /*
// // // asynchronous function   if you observe the execution asynchronous
// // // function(setTimeout()) is executing first than promise even the
// // // asycnchronous function is written after promise. But as  per node.js
// // //  eventloop operation promises has to be execute first than asynchronous
// // //   and callbacks but here it is reverseing why?

// // // ChatGPT said:
// // // ChatGPT
// // // The behavior you're observing relates to how JavaScript's event loop
// // // prioritizes different types of tasks: microtasks (like promises) and
// // // macrotasks (like setTimeout). To understand why the asynchronous
// // // functions (setTimeout) are being logged first, we need to dive into
// // // the workings of the event loop.

// // // Understanding the Event Loop
// // // Event Loop Overview:

// // // The event loop in JavaScript is responsible for handling asynchronous
// // //  operations. It processes tasks in different phases.

// // // There are two main types of tasks: microtasks and macrotasks.//*************************************************** */

// // // Microtasks: These include things like resolved promises and process.nextTick
// // //       in Node.js. They are executed right after the currently executing code
// // //       and before any other tasks.

// // // Macrotasks: These include things like setTimeout, setInterval, I/O
// // //       operations, etc. They are executed in the next iteration of the event
// // //       loop after all microtasks are handled.

// // // What’s Happening in Your Code:

// // // You have two setTimeout calls and two promises.
// // // setTimeout adds a macrotask to the event loop, which will be executed
// // // after the delay (in this case, 1000ms).
// // // When you create a promise (new Promise), the code inside the promise
// // // executor (the function passed to the promise) runs immediately. However,
// // // any asynchronous operations within the executor (like setTimeout)
// // //  behave just like any other asynchronous operation and will be scheduled
// // //   as a macrotask.

// // // // When the promises resolve, the callbacks attached via .then are added
// // // // to the microtask queue.

// // // // Execution Order:

// // // // After the initial synchronous code execution, the event loop first picks
// // // //  up the macrotasks that were scheduled after the delay (1000ms).
// // // // Once those macrotasks are completed, the event loop picks up the
// // // // microtasks (the .then callbacks).
// // // // Because your setTimeout operations inside the promises and outside
// // // // the promises are all macrotasks with the same delay (1000ms), they are
// // // // executed in the order they were added to the event loop.

// // // // The Key Point:
// // // // SetTimeout (Macrotasks) vs. Promises (Microtasks): While promises are
// // // // handled as microtasks, the setTimeout function creates macrotasks.

// // // // In your code, since the actual work inside the promises is being done by
// // // //  setTimeout, the tasks are still macrotasks, not microtasks. Therefore,
// // // //   they execute in the order they were added to the event loop, which is
// // // //    why they might appear before the promise resolution handlers
// // // //    (the .then callbacks).

// // // // Execution Breakdown:
// // // // 1a: setTimeout outside the promise → Logs after 1000ms.
// // // // 1: setTimeout inside the first promise → Logs after 1000ms.
// // // // 2: setTimeout outside the promise → Logs after 1000ms.
// // // // 3: setTimeout inside the second promise → Logs after 1000ms.
// // // // Because these are all macrotasks with the same delay, they execute in
// // // // the order they were added to the event loop. The .then handlers are
// // // // microtasks and are executed after all these macrotasks have been
// // // // handled.

// // // // Conclusion:
// // // // The setTimeout function itself is a macrotask, whether inside or
// // // // outside a promise, and all the setTimeout calls will be executed in
// // // //  the order they were added to the event loop. The .then callbacks are
// // // //  executed afterward because they are microtasks that follow the
// // // //  completion of all current macrotasks.
// // // //  */

// // // // //************    DIFFERENT TYPE OF ASYNCHRONOUS FUNCTIONS ***************** */

// // // // // 1. callback based asynchronous functions
// // // // // 2. Promise based asynchronous functions
// // // // // 3. Async/Await Functions

// // // function callbackBasedAsyncFn(callback) {
// // //   const a = 23;
// // //   callback(a);
// // // }
// // // // console.log(callbackBasedAsyncFn());
// // // // callback(a);
// // // // ^

// // // // TypeError: callback is not a function

// // // //executing callback based function
// // // callbackBasedAsyncFn((callback) => {
// // //   console.log(">>", callback);
// // // });
// // // // >> 23

// // // function promiseBasedAsyncFn() {
// // //   return new Promise((resolve, reject) => {
// // //     if (Math.random() > 0.5) resolve("Success!");
// // //     else reject("you can try again");
// // //   });
// // // }
// // // // // promiseBasedAsyncFn();   // **********************************
// // // // // NO OUTPUT CAME, to return the output we need to handle the promise.

// // // // handling the promise
// // // promiseBasedAsyncFn()
// // //   .then((res) => {
// // //     console.log(res);
// // //   })
// // //   .catch((err) => {
// // //     console.log(err);
// // //   });
// // // // //Success!

// // // /*
// // // //1.
// // // function callbackBasedAsyncFn(callback) {
// // //   const a = 23;
// // //   callback(a);
// // // }
// // // callbackBasedAsyncFn((callback) => {
// // //   console.log(">>", callback);
// // // });

// // // // >> 23

// // // // 2.
// // // function promiseBasedAsyncFn() {
// // //   return new Promise((resolve, reject) => {
// // //     if (Math.random() > 0.5) resolve("Success!");
// // //     else reject("you can try again");
// // //   });
// // // }
// // // // handling the promise
// // // promiseBasedAsyncFn()
// // //   .then((res) => {
// // //     console.log(res);
// // //   })
// // //   .catch((err) => {
// // //     console.log(err);
// // //   });

// // // //Success!
// // // with what name do we call above 2 functions ??

// // // The two functions you've provided represent two different approaches to
// // // handling asynchronous operations in JavaScript:

// // // Callback-based function (callbackBasedAsyncFn):

// // // This function takes a callback function as an argument and calls it
// // // after completing an operation (in this case, simply passing the value 23).

// // // Name: This is called a callback-based asynchronous function.
// // //       Promise-based function (promiseBasedAsyncFn):

// // // This function returns a Promise that either resolves or rejects based on
// // //     a condition (in this case, a random number check). The handling of the
// // //     resolved or rejected promise is done using .then() and .catch() methods.

// // // Name: This is called a promise-based asynchronous function.
// // // */

// // // //async/await function
// // // async function asyncAwaitBasedAsyncFn() {
// // //   const b = 23;
// // //   return b;
// // // }
// // // // console.log(asyncAwaitBasedAsyncFn());
// // // //Promise { 23 }
// // // asyncAwaitBasedAsyncFn()
// // //   .then((res) => {
// // //     console.log(res);
// // //   })
// // //   .catch((err) => {
// // //     console.log(err);
// // //   });
// // // // 23
// // // //is that correct way of working with async/await  ////*********************** */
// // // // The async keyword before the function makes it return a Promise,
// // // // even if the value returned is not explicitly a Promise

// // // //THE ABOVE ALL ARE ASYNCHRONOUS FUNCTIONS HAVING SYNCHRONOUS CODE IN IT

// // // //now WRITE A ASYNCHRONOUS CODE WITH ASYNCHRONOUS FUNCTIONS

// // // // 1;
// // // console.log("1.", typeof callbackBasedAsynchronousFn);

// // // function callbackBasedAsynchronousFn(callback) {
// // //   setTimeout(() => {
// // //     console.log("1. from inside callbackBasedAsyncFunction");
// // //     callback("1 from callbackBasedAsyncFunction");
// // //   }, 3000);
// // // }

// // // callbackBasedAsynchronousFn((callback) => {
// // //   console.log("12", callback);
// // // });

// // // //2.
// // // //promise based async function
// // // function promiseBasedAsynchronousFn() {
// // //   return new Promise((resolve, reject) => {
// // //     setTimeout(() => {
// // //       if (Math.random() > 0.6) {
// // //         resolve("success!");
// // //       } else {
// // //         reject("Try again.");
// // //       }
// // //     }, 2000);
// // //   });
// // // }
// // // console.log("2.", typeof promiseBasedAsynchronousFn);
// // // // // 2. function
// // // // why it is giving function not an promise object even it is returning promise??
// // // // promiseBasedAsynchronousFn is a function, not a Promise object.
// // // // The function returns a Promise when it's called, but the function
// // // // itself is still of type "function".
// // // // That’s why typeof promiseBasedAsynchronousFn gives "function".

// // // console.log("2.", typeof promiseBasedAsynchronousFn());
// // // // Outputs: "object"

// // // //handling the promise

// // // // promiseBasedAsynchronousFn
// // // //   .then((result) => {
// // // //     console.log("2.", result);
// // // //   })
// // // //   .catch((err) => {
// // // //     console.log("2.", err);
// // // //   });
// // // //   /home/admin1/Desktop/againPracts/restApis/api29Aug.js:468
// // // //   .then((result) => {
// // // //    ^

// // // // TypeError: promiseBasedAsynchronousFn.then is not a function

// // // // question 1. the above function type is giving function not object

// // // // even it is giving promise question2. when I am handling(like promise
// // // //   object) the function  it is giving error . But I write the promise
// // // //   using function decleration its handling goes different than promise
// // // // written using function expression? why it is like that?

// // // //writing promise using function expression

// // // // Question 2: Why does handling the function differently from the
// // // // promise object give an error?
// // // // There are key differences between handling a function that returns a
// // // // promise and handling an actual promise object:

// // // const fnExpressionPromise = new Promise((resolve, reject) => {
// // //   setTimeout(() => {
// // //     if (Math.random() > 0.7) {
// // //       // console.log("3.FnExpre", "Success!");
// // //       resolve("fnExpreSuccess");
// // //     } else {
// // //       // console.log("3. FnExpe", "Try again.");
// // //       reject("fnExrpe try again");
// // //     }
// // //   }, 2000);
// // // });
// // // console.log("31.", typeof fnExpressionPromise);
// // // //31. object
// // // // 3. FnExpe Try again.
// // // // fnExpressionPromise()
// // // //   .then((result) => {
// // // //     console.log(result);
// // // //   })
// // // //   .catch((err) => {
// // // //     console.log(err);
// // // });
// // //   /home/admin1/Desktop/againPracts/restApis/api29Aug.js:491
// // // fnExpressionPromise()
// // // ^

// // // TypeError: fnExpressionPromise is not a function
// // // at Object.<anonymous> (/home/admin1/Desktop/againPracts/restApis/api29Aug.js:491:1)

// // fnExpressionPromise
// //   .then((result) => {
// //     console.log(result);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// // /*
// // Key Points:

// // Function Declaration vs. Promise Object:

// // Function Declaration: promiseBasedAsynchronousFn is a function that
// // returns a promise when you call it (promiseBasedAsynchronousFn()).
// // Promise Object: fnExpressionPromise is a Promise object. You don't need
// // to call it; you just use it directly.

// // Why the Error Occurs:

// // When you try to chain .then() and .catch() on promiseBasedAsynchronousFn(it is fnDeclearation)
// // without calling it, you are chaining on a function (which doesn't have .then() or
// //  .catch() methods). This leads to the TypeError.

// //  Similarly, when you try to call fnExpressionPromise() as if it's a
// // function, you get a TypeError because it's a Promise object, not a
// // function.

// // Summary:
// // Function: promiseBasedAsynchronousFn is a function, so typeof returns
// //     "function". Call it to get a Promise.
// // Promise: fnExpressionPromise is a Promise object, so typeof returns
// //    "object". Use it directly with .then() and .catch().

// //    The handling is different because a function that returns a promise
// //   and a promise object are distinct things in JavaScript, each with its
// //   own appropriate usage.

// // */
// // // Promise written using function  decleration and function expression are woriing
// // // differently, function decleration is returning function itself But function
// // // expression is returning a promise object.Why it is working like that??

// // function myPromiseSyncCodeDec() {
// //   return new Promise((resolve, reject) => {
// //     resolve("it is a function decleration promise");
// //     reject("function expression rejected promise");
// //   });
// // }

// // const myPromiseSyncCodeEx = function () {
// //   return new Promise((resolve, reject) => {
// //     // resolve(myPromiseSyncCodeDec);
// //     // resolve(myPromiseSyncCodeDec());
// //     resolve("it is a function expression promise");
// //     reject("functionExpression rejected promise");
// //   });
// // };

// // console.log(myPromiseSyncCodeDec);
// // console.log(myPromiseSyncCodeEx);
// // // [Function: myPromiseSyncCodeDec]
// // // [Function: myPromiseSyncCodeEx]
// // // Promise { [Function: myPromiseSyncCodeDec] }
// // // Promise { <pending> }

// // console.log(myPromiseSyncCodeDec());
// // console.log(myPromiseSyncCodeEx());
// // // Promise { 'it is a function decleration promise' }
// // // Promise { 'it is a function expression promise' }

// // console.log(typeof myPromiseSyncCodeDec);
// // console.log(typeof myPromiseSyncCodeEx);
// // // function
// // // function

// // console.log(typeof myPromiseSyncCodeDec());
// // console.log(typeof myPromiseSyncCodeEx());
// // // object
// // // object
// // //both are promise object

// // // promise directly give result right, no need to handle.
// // // is that correct?        ////******************************************* */
// // //   The promises you've created in both the function declaration and
// // //    function expression will not directly give the result immediately;
// // //    they will return a Promise object that needs to be handled
// // //    asynchronously.

// // // Understanding Promises
// // // When you create a promise using new Promise, you're setting up a
// // // function (referred to as the executor) that will either resolve or
// // // reject the promise at some point. The resolve function inside the
// // // promise indicates a successful completion, and the reject function
// // // indicates a failure.

// // // Summary
// // // NO  THE PROMISE DOES NOT GIVE RESULT DIRECTLY. THEY RETURN A  PROMISE
// // // OBJECT THAT YOU NEED TO HANDLE USING THEN(), AWAIT() OR OTHER ASYNCHRONOUS
// // // TECHNIQUES.
// // //
// // // THE IMPORTANT THING TO REMEMBER IS THA THE VALUE IS WRAPPED IN A PROMISE
// // // AND YOU NEED TO UNWRAP IT BY HANDLING THE PROMISE APPROPRIATELY.

// // console.log(myPromiseSyncCodeDec());
// // console.log(myPromiseSyncCodeEx());
// // // Promise { 'it is a function decleration promise' }
// // // Promise { 'it is a function expression promise' }

// // //the above calling output are promise object not result of the promise.

// // myPromiseSyncCodeDec()
// //   .then((result) => {
// //     console.log(result);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });
// // // it is a function decleration promise

// // myPromiseSyncCodeEx()
// //   .then((result) => {
// //     console.log(result);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });
// // // it is a function expression promise

// // const withPromiseCons = new Promise((resolve, reject) => {
// //   resolve("promise written using new Promise Constructor");
// //   reject("promise written using new Promise constructor rejected.");
// // });
// // console.log(withPromiseCons);
// // // Promise { 'promise written using new Promise Constructor' }
// // // console.log(withPromiseCons());
// // // // /home/admin1/Desktop/againPracts/restApis/api29Aug.js:667
// // // // console.log(withPromiseCons());
// // // //             ^

// // // // TypeError: withPromiseCons is not a function
// // //it is giving error rather than giving promise object? //*************************** */

// // // How Promises Work

// // // Promise Object: withPromiseCons is a Promise object, not a function.
// // //               This means you can't invoke it as if it were a function
// // //               (withPromiseCons()), which is why you're seeing the error
// // //               TypeError: withPromiseCons is not a function.

// // // Handling Resolve and Reject:

// // //             In your promise, the resolve function is called first
// // //             with the message "promise written using new Promise
// // //             Constructor".
// // //     The reject function is not executed because a promise can
// // //      only settle once.
// // //      Once it's resolved or rejected, any subsequent calls to
// // //      resolve or reject are ignored.

// // // Summary
// // // withPromiseCons is not a function: It's a Promise object, so trying
// // //   to call it as if it were a function (withPromiseCons()) results in
// // //    an error.

// // // Promise Settling: The promise only settles once (either resolved or
// // //   rejected). In your example, it resolves first, so the reject
// // //   statement has no effect.

// // // Handling the Promise: To access the value or handle the promise,
// // // you must use .then()/.catch() or async/await.

// // //

// // // correct way of handling the promise

// // withPromiseCons
// //   .then((response) => {
// //     console.log(response);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });
// // //handling using async/await keyword

// // const handlePromise = async function () {
// //   try {
// //     const response = await withPromiseCons;
// //     console.log("withAsyncAwait:", response);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
// // // or

// // async function handlePromiseusingfnDec() {
// //   try {
// //     const result = await withPromiseCons;
// //     console.log("handle with fnDecl Async/Await", result);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }
// // handlePromise();
// // //withAsyncAwait: promise written using new Promise Constructor
// // handlePromiseusingfnDec;
// // //no output like this calling
// // handlePromiseusingfnDec();

// // // handle with fnDecl Async/Await promise written using new Promise Constructor

// // // timing FUNCTIONS

// // // In this comprehensive guide, we'll explore the primary timing functions in JavaScript, including:

// // // 1. setTimeout() and clearTimeout()
// // // 2. setInterval() and clearInterval()
// // // 3. setImmediate() and clearImmediate() (Node.js)
// // // 4. requestAnimationFrame() and cancelAnimationFrame() (Browsers)
// // // 5. process.nextTick() (Node.js)

// // // 1.setTimeout(): shcedules a funciton to excute after certain amount of time

// // // timoutId = setTimeout(callback, delay, [arg1, arg2]);

// // // example :

// // function greet(name) {
// //   console.log(`Hellow, ${name}`);
// //   return "testing setTimout";
// // }

// // // const timeoutId = setTimeout(greet, 1000, "Aline");
// // //Hellow, Alice
// // // console.log(timeoutId);
// // // Timeout {
// // //   _idleTimeout: 3000,
// // //   _idlePrev: [TimersList],
// // //   _idleNext: [TimersList],
// // //   _idleStart: 65,
// // //   _onTimeout: [Function: greet],
// // //   _timerArgs: [Array],
// // //   _repeat: null,
// // //   _destroyed: false,
// // //   [Symbol(refed)]: true,
// // //   [Symbol(kHasPrimitive)]: false,
// // //   [Symbol(asyncId)]: 2,
// // //   [Symbol(triggerId)]: 1
// // // }

// // // console.log(timeoutId());
// // // console.log(timeoutId());
// // //             ^

// // // TypeError: timeoutId is not a function
// // // function greet(name) {
// // //   console.log(`Hellow, ${name}`);
// // //   return "testing setTimout";
// // // }

// // // console.log(setTimeout(greet(), 1000, "Alice"));
// // // node:internal/validators:440
// // // throw new ERR_INVALID_ARG_TYPE(name, 'Function', value);
// // // ^

// // //****************************************************************** */
// // // why that error came? if i want to get function return value how can I achieve??
// // // TypeError [ERR_INVALID_ARG_TYPE]: The "callback" argument must be of
// // //  type function. Received type string ('testing setTimout')
// // // The error you're encountering happens because you're calling the
// // // greet function immediately when passing it to setTimeout, rather
// // // than passing the function itself. Here's a breakdown:

// // // The Problem:

// // // When you write setTimeout(greet(), 1000, "Alice"), the greet
// // // function is executed immediately, and its return value (a string
// // //   in this case, "testing setTimout") is passed to setTimeout
// // //   instead of the function greet.
// // // setTimeout expects a function as its first argument, but you
// // // passed a string (the return value of greet), which causes the
// // // TypeError.

// // //to achive dsired effect
// // // Using an Anonymous Function:

// // const timeoutId = setTimeout(greet, 1000, "Aline");

// // setTimeout(() => {
// //   console.log("//", greet("Alice"));
// // }, 1000);

// // //Binding the Arguments:
// // setTimeout(greet, 1000, "Alika");
// // //**************************************************** *
// // //THIS TYPE OF CALLING ONLY PRINT THE FUNCTION VALUE WHICH IS TO BE
// // //WRITTEN FOR PRINTING(EX.written in console) BUT WONT RETURN THE VALUE OF FUNCTION

// // // Hellow, Aline

// // // Hellow, Alice
// // // // testing setTimout

// // // Hellow, Alika

// // // function greet(name) {
// // //   console.log(Hello, ${name});
// // //   return "testing setTimeout";
// // // }

// // // setTimeout(greet, 1000, "Alice");
// // //  for this type of call ouput is Hello, Alice only but
// // //  testing setTimeout is not coming why??

// // // The reason you're seeing only Hello, Alice and not testing
// // // setTimeout in the console is that the return value of the greet
// // // function isn't automatically logged by setTimeout.
// // // When you use setTimeout, it schedules the greet function to be
// // // executed after the specified delay (1000 ms in this case), but
// // // it doesn't do anything with the return value of the function.

// // // If you want to see "testing setTimeout" in the console, you need
// // // to explicitly log the return value of greet. Here's how you can do it:

// // //****************************** *
// // //Key Points:

// // // Executes the callback function once after the delay.

// // // Returns a timeout ID that can be used to cancel the timeout.

// // // The delay is not guaranteed to be exact due to the event loop and
// // // task queue mechanics. Minimum delays may be clamped by browsers

// // // (commonly to 4ms). ///********** ************************************

// // // 2.

// // clearTimeout();
// // // Cancels a timout scheduled with setTimeout();
// // // syntax
// // clearTimeout(timeoutId);
// // // timeoutID: The identifier returned by setTimeout().

// // const clearTime = setTimeout(() => {
// //   console.log("checking clearTimeout using clearTimout() function  ");
// // }, 3000);

// // console.log(typeof clearTime);
// // //object

// // // checking clearTimeout using clearTimout() function
// // // this is printed because  no clearTimeout function is written to stop the delay
// // //now use clearTimout function

// // clearTimeout(clearTime);

// // //no output came because clearTimeout() function was canceled the clerTime
// // // written in setTimout function

// // // Key Points:

// // // Prevents the callback from executing if it's still pending.
// // // Safe to call even if the timeout has already executed or been cleared.
// // // As long as you don’t call clearTimeout(clearTime) before the 3 seconds elapse,
// // //  the message will be printed to the console after 3 seconds.
// // // If you want to ensure that the message does not print, you would use
// // // clearTimeout(clearTime) before the 3 seconds are up.

// // //3.
// // // setInterval();
// // // Schedules a function to execute repeatedly at specified intervls(in milliSecond)

// // // syntax
// // // const intervelId = setInterval(callback, delay, [arg1, arg]);
// // function setIntervalFn(arg) {
// //   console.log(`This is printing because of ${arg}`);
// // }
// // console.log(typeof setIntervalFn); //function

// // console.log(typeof setInterval()); //we should not use like this. this function alone.

// // // Correct usage of setInterval
// // const intervalId = setInterval(setIntervalFn, 2000, "setInterval fn method.");
// // //This is printing because of setInterval fn method.
// // // This is printing because of setInterval fn method.
// // // This is printing because of setInterval fn method.
// // // This is printing because of setInterval fn method.
// // // This is printing because of setInterval fn method.
// // // ..
// // // ..
// // function setIntervalFn(arg) {
// //   console.log(`This is printing because of ${arg}`);
// // }

// // const setIntervalTime = setInterval(
// //   setIntervalFn,
// //   2000,
// //   "setInterval fn method."
// // );
// // setInterval();

// // // node:internal/validators:440
// // //     throw new ERR_INVALID_ARG_TYPE(name, 'Function', value);
// // //     ^

// // // TypeError [ERR_INVALID_ARG_TYPE]: The "callback" argument must be of
// // //  type function. Received undefined
// // /////// what is meant by 440 error ****************************************
// // //  Node.js Internal Error (As in Your Case):
// // // The "440" you referenced in your earlier example is not an HTTP
// // // status code but rather a line number in a Node.js internal module.
// // // The error message you're seeing (node:internal/validators:440)
// // // refers to a specific line in Node.js’s internal validation code,
// // //  where the error was thrown because the argument provided was not
// // //  of the expected type. In your case, it was expecting a function
// // //  but received a string.

// // // another exmple

// // // let count = 0;
// // // const intervalId2 = setInterval(() => {
// // //   count += 1;
// // //   console.log(`Count: ${count}`);
// // //   if (count === 5) {
// // //     clearInterval(intervalId2);
// // //   }
// // // }, 2000);
// // // Count: 1
// // // Count: 2
// // // Count: 3
// // // Count: 4
// // // Count: 5
// // // this is stopped because we terminated the interval function with clearInterval function
// // // by calling clearInterval(intervalId2) if count equal to 5;

// // // Key Points:

// // // Executes the callback function repeatedly every specified delay.
// // // Returns an interval ID that can be used to cancel the interval.
// // // Similar to setTimeout(), the actual execution timing may vary.

// // // 4.
// // // clearInterval()
// // // it is used to cancel the interval scheduled with setInterval()

// // // syntax
// // // clearInterval(intervalId)
// // // intervalId : the identifier returned by setInterval()
// // // example

// // let countDis = 0;
// // // const setIntervalforScroll1 = setInterval(() => {
// // //   console.log("flight delayed due to rain");
// // //   countDis++;
// // // }, 2000);
// // // console.log("ccccc", countDis);//0
// // // if (countDis > 5) {
// // //   clearInterval(setIntervalforScroll1);
// // // }
// // // // flight delayed due to rain
// // // // flight delayed due to rain
// // // // flight delayed due to rain
// // // // flight delayed due to rain
// // // // flight delayed due to rain
// // // // flight delayed due to rain
// // // // flight delayed due to rain
// // // // flight delayed due to rain
// // // // flight delayed due to rain
// // // // the above syntax is not stoping the interval
// // // //because
// // // The issue with your code is that the condition if (countDis > 5)
// // // is being evaluated immediately after the interval is set, rather
// // // than within the interval callback function. When the condition is
// // // checked, countDis is still 0, so clearInterval is never called.
// // //correct syntax is

// // const setIntervalforScroll = setInterval(() => {
// //   countDis += 1;
// //   console.log(`${countDis}: flight delayed due to rain`);
// //   if (countDis >= 5) {
// //     clearInterval(setIntervalforScroll);
// //   }
// // }, 1000);
// // // 1: flight delayed due to rain
// // // 2: flight delayed due to rain
// // // 3: flight delayed due to rain
// // // 4: flight delayed due to rain
// // // 5: flight delayed due to rain

// // const clearIntervalId = setInterval(() => {
// //   console.log("this will be logged for every 2 seconds.");
// // }, 2000);
// // // console.log("ccc", countDis++);
// // //stop the message after 10 seconds
// // setTimeout(() => {
// //   clearInterval(clearIntervalId);
// //   console.log("interval was cleared.");
// // }, 10000);
// // // this will be logged for every 2 seconds.
// // // this will be logged for every 2 seconds.
// // // this will be logged for every 2 seconds.
// // // this will be logged for every 2 seconds.
// // // interval was cleared.

// // // Key Points:

// // // Stops future executions of the callback.
// // // Safe to call even if the interval has already been cleared or has ended.

// // // 5.
// // // setImmediate()
// // // setImmediate() schedules a function to be executed immediately after the /
// // //current event loop cycle completes. It's similar to setTimeout()
// // // with a delay of 0 but has higher priority in the execution queue.

// // //syntax
// // // setImmediate(function, ...args);
// // // ex
// // console.log("before setImmediate");

// // setImmediate(() => {
// //   console.log("This runs after the current event loop phase");
// // });
// // console.log("after setImmediate");

// // // object        ////
// // // function      ////
// // // before setImmediate *************  /////
// // // after setImmediate  ****************//////
// // // This runs after the current event loop phase***********
// // // Hellow, Alice
// // // // testing setTimout
// // // Hellow, Alika
// // // 1: flight delayed due to rain
// // // this will be logged for every 2 seconds.

// // //   outputs showed with //// symbol will execute first because they
// // // are part of the synchronous code. Hence they need to be execute first
// // // After the sync code execution the current loop execution has finished
// // // after that, The event loop has to start next loop to exection asynchronous
// // // callbacks and other timed funciton But, before start to execute
// // // async code, it execute the SETIMMEDIATE FUNCTION AS you can see above
// // // executed output

// // // Why This Happens:         ***********************************
// // // setImmediate queues a function to run after the I/O events in
// // // the event loop.
// // // It will always be called after all synchronous code is executed.
// // /*
// // what are I/O events in javascript

// // In JavaScript, particularly in Node.js, I/O (Input/Output) events
// // refer to the asynchronous operations that involve interacting with
// // external systems or resources, such as reading/writing to the file
// // system, making network requests, accessing databases, or
// // interacting with hardware devices. These operations are typically
// // slower than in-memory or CPU-bound operations because they involve
// // communication with external systems.

// // Key Examples of I/O Operations:

// // File System Operations:
// //     Reading or writing to files.
// //     Example: fs.readFile(), fs.writeFile()
// // Network Operations:
// //     Sending or receiving data over the internet or a local network.
// //     Example: http.request(), fetch()
// // Database Queries:
// //     Interacting with databases to retrieve or store data.
// //     Example: Querying a MongoDB database, MySQL queries.
// // Timers:
// //     Scheduling future tasks.
// //     Example: setTimeout(), setInterval()
// // User Input/Output (for browser-based JavaScript):
// //     Handling user interactions like mouse clicks, keyboard input,
// //     etc.
// // Streams:
// //     Data streams (e.g., reading from a file or receiving chunks of
// //     data over a network connection).
// // */
// // /*          *********************************
// //     but according to this statement you given in previous question setImmediate
// //     queues a function to run after the I/O events in the event loop. It will
// //     always be called after all synchronous code is executed.
// //   setImmediate has to execute after I/O events in the event loop right?

// //   Yes, you're absolutely right — setImmediate is designed to execute after
// //   I/O events in the event loop. However, the specific behavior of
// //   setImmediate in relation to I/O events depends on the timing of
// //   when it is scheduled and where it falls in the event loop phases.

// // Detailed Breakdown of Event Loop Phases:
// // In Node.js, the event loop goes through several phases during its
// // execution:

// // Timers: This phase executes callbacks scheduled by setTimeout() and
// //  setInterval().

// // Pending Callbacks: This phase handles I/O callbacks that were
// // deferred to the next iteration of the event loop.

// // Idle/Prepare: Internal operations.

// // Poll: This is the most important phase for I/O. It retrieves new
// // I/O events and executes I/O-related callbacks.

// // Check: This phase executes callbacks scheduled by setImmediate().

// // Close Callbacks: Handles "close" events, like socket.on('close').

// // The Role of setImmediate:  ****************************
// // setImmediate() is executed in the Check phase, which happens after
// // the Poll phase where I/O callbacks are processed. So, if you
// // schedule a setImmediate() after an I/O operation, it will execute
// // after the I/O event is completed.

// // Key Points:
// // setImmediate is designed to execute after the I/O cycle completes.
// // It runs before any timers (like setTimeout) in the next iteration of
// // the event loop, but only after all pending I/O events are processed.

// // Behavior Example: setImmediate vs I/O Callback
// // Here's an example demonstrating how setImmediate runs after an I/O
// // event, but still after all synchronous code has executed:

// // */
// // const fs = require("fs");

// // console.log("Start of script");

// // // Asynchronous I/O operation

// // fs.readFile(__filename, () => {
// //   console.log("I/O operation complete");

// //   setImmediate(() => {
// //     console.log("Executed by setImmediate");
// //   });

// //   // SetTimeout is a Timer, and runs after Poll phase but before the next Check phase
// //   setTimeout(() => {
// //     console.log("Executed by setTimeout");
// //   }, 0);
// // });

// // console.log("End of script");

// // // Output:

// // // Copy code
// // // Start of script
// // // End of script
// // // I/O operation complete
// // // Executed by setImmediate
// // // Executed by setTimeout

// // /*
// // Explanation:
// // Synchronous Code:

// // "Start of script" is printed.
// // The fs.readFile() function initiates an I/O operation, but its
// // callback is not yet executed.
// // "End of script" is printed immediately after.
// // I/O Callback:

// // When the I/O operation (fs.readFile()) completes, its callback is
// // placed in the Poll phase and executed.
// // setImmediate and setTimeout:

// // Inside the I/O callback, both setImmediate() and setTimeout() are
// // scheduled.
// // setImmediate() runs first because it is executed in the Check phase,
// // which occurs right after the Poll phase.
// // setTimeout() runs after that because timers are handled in the
// // Timers phase of the next iteration.

// // Summary:
// // setImmediate() is executed after I/O events in the event loop but
// // before any setTimeout() scheduled with a 0 ms delay.
// // When there is an I/O operation, setImmediate() will execute after
// // the I/O callback, as it is placed in the Check phase, which comes
// // after the Poll phase where I/O events are processed.

// // */

// // setTimeout(() => {
// //   console.log("ss>>from setTimeout");
// // }, 0);
// // setImmediate(() => {
// //   console.log("ss>>from setImmediate");
// // });
// // //console
// // // ss>>from setTimeout
// // // ss>>from setImmediate

// // //if time(10msec) is given in setTimout function

// // // ss>>from setImmediate
// // // ss>>from setTimeout
// // ////////////////      *************************************
// // // if you observe output console  first setTimout function was
// // // executed after setImmediate executed. why ? but as the
// // // setImmediate is alreay executed in check phase of first loop it has
// // //  to execute first right? even it is defined after setImmediate

// // // Great question! The behavior you're observing is due to the subtle
// // // differences in how setTimeout and setImmediate interact with the
// // // event loop in Node.js.

// // // The Reason Behind the Output Order:
// // // When both setTimeout(() => ..., 0) and setImmediate(() => ...) are
// // // invoked, they may execute in different orders depending on the
// // // context in which they are called. Here’s a breakdown:

// // // setTimeout(..., 0):
// // // Although it's given a delay of 0, the callback is not executed
// // // immediately after the synchronous code.
// // // It goes through the Timers phase of the event loop. The timer queue
// // //  is checked at the beginning of each loop iteration.

// // // setImmediate(...):
// // // setImmediate schedules the callback to be executed in the Check
// // // phase, which happens after the Poll phase, and typically after I/O
// // // callbacks have been processed.

// // // So, Why Does setTimeout Execute Before setImmediate in Your Case?
// // // When Called at the Top Level (No I/O):

// // // When setTimeout and setImmediate are invoked in normal (top-level)
// // // code (i.e., outside of any I/O callbacks), the order in which they
// // // are executed is non-deterministic because:

// // // setTimeout(..., 0): Even with a 0 ms delay, it is placed into the
// // // Timers phase of the event loop.

// // // setImmediate(): It is placed into the Check phase.
// // // In a typical event loop iteration:

// // // The event loop checks the Timers phase (e.g., setTimeout), then
// // // moves to the Poll phase (e.g., I/O callbacks), and finally, to the
// // // Check phase (setImmediate).
// // // But since there’s no I/O between them, both setTimeout(..., 0) and
// // // setImmediate() are effectively competing to execute in the same
// // // event loop iteration.

// // // The Node.js event loop doesn't guarantee the execution order between
// // //  setTimeout(..., 0) and setImmediate() in this context. As a result,
// // //  sometimes setTimeout executes first, sometimes setImmediate does.

// // //  When setImmediate Executes First:
// // // If you're running code inside an I/O callback (such as a fs.readFile or http request), setImmediate consistently executes before setTimeout(..., 0) because the event loop will move from the Poll phase to the Check phase where setImmediate is executed, before revisiting the Timers phase.

// // // Conclusion:
// // // In your case, the non-deterministic nature of setTimeout(..., 0)
// // // and setImmediate() means that sometimes setTimeout may execute
// // // before setImmediate, even though setImmediate typically runs in
// // // the Check phase. This behavior can vary depending on system load
// // // and Node.js version.

// // // For a consistent order of execution, if you want to prioritize
// // // setImmediate after an I/O event, you can use it within the callback
// // // of an I/O operation to ensure it runs first in the Check phase.

// // //clearImmediate

// // console.log("testing clreaImmdiate");
// // const immediateId = setImmediate(() => {
// //   console.log("immedidate for clearimmediate");
// // });
// // // testing clreaImmdiate
// // // after immediateId id
// // // immedidate for clearimmediate
// // // console.log("after immediateId id ");
// // clearImmediate(immediateId);
// // console.log("after immediateId id ");

// // // testing clreaImmdiate
// // // after immediateId id
// // // no immediateId was printed because we are clearing the setImmediate()
// // //using clearImmediate() method

// // //clearImmediate() is executing first because it is treated as synchronous
// // // code. as setImmediate() is in the check phase firstly sync code, timers,
// // // poll phase has to execute becase of the order of event loop execution

// // setImmediate(() => {
// //   setTimeout(() => {
// //     console.log("setTimout function inside the setImmidite method.");
// //   }, 0);
// // });

// // setImmediate(() => {
// //   console.log("immedidate for clearimmediate");
// // });
// // // immedidate for clearimmediate
// // // setTimout function inside the setImmidite method.
// // // why it is executed like that??  //**************** *
// // // Step-by-Step Breakdown of Event Loop Phases:
// // // First Check Phase (setImmediate execution):

// // // The first setImmediate() callback runs, which schedules the
// // //  setTimeout(..., 0) to be executed in the next Timers phase.
// // // The second setImmediate() callback runs, printing: "immediate for clearImmediate".
// // // Next Event Loop Iteration:

// // // The event loop moves to the next Timers phase where the previously
// // // scheduled setTimeout(..., 0) runs, printing: "setTimeout function
// // // inside the setImmediate method.".

// // // Why Does This Happen?
// // // setImmediate() callbacks always run during the Check phase of the
// // // event loop.
// // // setTimeout(..., 0) callbacks are placed in the Timers phase, which
// // // happens before the next Check phase of the next event loop
// // // iteration.
// // // Since the setTimeout(..., 0) is nested inside setImmediate, the
// // // setImmediate() callback is completed first, and only in the next
// // // iteration of the event loop does the setTimeout(..., 0) get executed.

// // // Conclusion:
// // // The execution order of your code is due to how the event loop
// // // phases are structured:

// // // Both setImmediate() callbacks are executed in the Check phase of the
// // // current event loop.
// // // The setTimeout(..., 0) inside the first setImmediate() is scheduled
// // // for the next Timers phase, which runs in the next iteration of the

// // // event loop.
// // // Thus, "immediate for clearImmediate" is logged first, followed by
// // // "setTimeout function inside the setImmediate method."

// // //type of asynchronous functions having asynchronous code

// // // setTimeout(() => {
// // // console.log("1.asyncrhonous code.");
// // // }, 1000);

// // // const cbbasedAsyncFn = function (callback) {
// // // return setTimeout(() => {
// // // callback("2. callback async function inside asyn function.");
// // // }, 1000);
// // // };

// // // const prmsAsyncFn = function () {
// // // return new Promise((resolve, reject) => {
// // // setTimeout(() => {
// // // resolve("3.promise function inside async function.");
// // // }, 1000);
// // // });
// // // };

// // // const promiseFn = new Promise((resolve, reject) => {
// // // setTimeout(() => {
// // // resolve("4.asynchronous code in Promise constructor .");
// // // }, 1000);
// // // });

// // // const asyncawaitAsyncFn = async function () {
// // // const asyncCode = await setTimeout(() => {
// // // return "async/await keyword bsed async code function ";
// // // });
// // // };
// // // this way of writing is totally incorrect  because async/await is used
// // // only for promises.
// // // Async/awiat are used to handle promises only
// // // As setTimeout is not a promise its wrong way of writing.
// // // SetTimeout  will not return any thing meaningful.
// // //
// // // Key Issues:
// // //
// // // setTimeout is not a Promise: setTimeout uses a callback pattern,
// // // and await only works with Promises.
// // //
// // // The return value of the function inside setTimeout will not be
// // // passed back the way you expect because setTimeout doesn’t return
// // // anything meaningful.
// // // correct code is
// // //
// // // const asnycAwaitasyncFn = async function () {
// // // const asyncCode = await new Promise((resolve, reject) => {
// // // resolve("5.async code inside a async/await keyword.");
// // // }, 1000);
// // // return asyncCode;
// // // };
// // // console.log(typeof cbbasedAsyncFn);
// // // console.log(typeof prmsAsyncFn);
// // // console.log(typeof promiseFn); //>>>>>>>>>>>>>
// // // console.log(typeof asnycAwaitasyncFn);
// // // function
// // // function
// // // object>>>>>>>>>>>>>>>>>>//because directly written using new Promise constructor
// // // function

// // console.log("2.", cbbasedAsyncFn());
// // console.log("3.", prmsAsyncFn());
// // console.log("4.", promiseFn);
// // console.log("5.", asnycAwaitasyncFn());
// // // 2. Timeout {
// // //   _idleTimeout: 1000,
// // //   _idlePrev: [TimersList],
// // //   _idleNext: [Timeout],
// // //   _idleStart: 92,
// // //   _onTimeout: [Function (anonymous)],
// // //   _timerArgs: undefined,
// // //   _repeat: null,
// // //   _destroyed: false,
// // //   [Symbol(refed)]: true,
// // //   [Symbol(kHasPrimitive)]: false,
// // //   [Symbol(asyncId)]: 8,
// // //   [Symbol(triggerId)]: 1
// // // }
// // // 3. Promise { <pending> }
// // // 4. Promise { <pending> }
// // // 5. Promise { <pending> }

// // // handling above functions
// // cbbasedAsyncFn()
// //   .then((result) => {
// //     console.log(result);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });
// // // .then((result) => {
// // // ^

// // //  TypeError: cbbasedAsyncFn(...).then is not a function//
// // // The reason your code is not working as expected is that

// // // cbbasedAsyncFn is a callback-based function, and it does not
// // // return a Promise. However, .then() and .catch() are methods
// // // specifically for Promises, so you can't use them directly on a
// // // callback-based function.

// // // correct way of handling

// // // cbbasedAsyncFn((callback) => {
// // // console.log("", callback);
// // // });

// // // prmsAsyncFn()
// // // .then((response) => {
// // // console.log(response);
// // // })
// // // .catch((err) => {
// // // console.error(err);
// // // });
// // // promiseFn
// // // .then((res) => {
// // // console.log(res);
// // // })
// // // .catch((err) => {
// // // console.error(err);
// // // });

// // // asnycAwaitasyncFn()
// // // .then((response) => {
// // // console.log(response);
// // // })
// // // .catch((err) => {
// // // console.log(err);
// // // });
// // or;
// // // async function getAsyncCodeResult() {
// // // const result = await asnycAwaitasyncFn();
// // // console.log(">>", result);
// // // }
// // // getAsyncCodeResult();

// // // 5.async code inside a async/await keyword. // written using async/await
// // // >> 5.async code inside a async/await keyword.// written using async/await keyword and handle with async/await
// // // 1.asyncrhonous code.                         // written in setTimeout
// // // 4.asynchronous code in Promise constructor . // written in new Promise constructor
// // //  2. callback async function inside asyn function. // written in callback based funciton
// // // 3.promise function inside async function.   // written like new Promise (()=>{setTimeout...})

// // // THE ORDER OF EXECUTION IS
// // // FIRST SYNCHRONOUS CODE OUTSIDE OF ANY BLOCK
// // // SEONDLY SYNCHRONOUS CODE INSIDE BLOCKS
// // // THRIDLY PROMISES WRITTEN USING ASYNC/AWAIT
// // // FOURTHLY ASYNCHRONOUS CODE WRITTEN IN TIMERS
// // // FIFTH  CODE WRITTEN IN NEW PROMISE CONSTRUCOR
// // // LASTLY CALLBACKS OF HAVIN ASYNCHRONOUS CODE

// // // Order of Execution:
// // // When you run code in Node.js, both synchronous and asynchronous
// // // tasks are executed, and their order is determined by the event loop.
// // // Here’s a general breakdown of the execution order:

// // // Synchronous Code:
// // // All synchronous code is executed first in the order it is written.

// // // Microtasks Queue:

// // // After the current synchronous code finishes, the Microtasks Queue
// // // (containing process.nextTick() and resolved Promises) is processed
// // // before moving to the next event loop phase.

// // // Timers Phase:
// // // Next, callbacks from setTimeout() and setInterval() are executed if
// // //  their scheduled time has been reached.

// // // I/O Callbacks Phase:
// // // After timers, the event loop processes callbacks for I/O tasks that
// // // have completed (e.g., reading from a file).

// // // Poll Phase:
// // // Handles polling for new I/O events or continues processing I/O tasks
// // // that are waiting for more data.

// // // Check Phase:
// // // Executes callbacks from setImmediate(). These are guaranteed to
// // // run after the polling phase has completed.

// // // Close Callbacks Phase:
// // // Executes callbacks related to closing resources (like sockets).
// // // //
// // // //  ********************** APIS   *********************************
// // // /*
// // // What is an API?
// // // API stands for Application Programming Interface, a set of rules and
// // //  protocols that allows different software applications to
// // //  communicate and interact with each other. It acts as an intermediary
// // //  between the client (like a web browser or mobile app) and a server,
// // //  enabling them to send and receive data or requests.

// // // Types of APIs

// // // Web APIs:

// // // These are the most common types of APIs used for communication
// // // over the internet, typically following HTTP protocols.
// // // Examples: REST, GraphQL, SOAP.
// // // They are used in web and mobile apps to fetch or send data to a
// // // server.

// // // 2. Operating System APIs:

// // // APIs provided by operating systems (like Windows, macOS, Linux)
// // // that allow software to interact with the system's core features.
// // // Example: Windows API, POSIX in Linux.

// // // 3. Library/API Frameworks:

// // // These APIs allow developers to use predefined libraries of code,
// // //  simplifying tasks like building user interfaces, working with
// // // databases, etc.
// // // Examples: jQuery, TensorFlow, React.

// // // 4. Hardware APIs:

// // // APIs that enable software to communicate with hardware components,
// // // like sensors, cameras, or printers.
// // // Example: DirectX for gaming hardware interaction.

// // // 5.Remote APIs:

// // // These APIs allow access to resources over a network, usually
// // //  through the internet, where the API resides on a remote server.
// // // Example: Cloud storage APIs like AWS S3 or Google Drive API.

// // // COMMON API PROTOCOLS

// // // // 1.REST (Representaional State Transfer)

// // // A popular web API design architecture.

// // // Uses HTTP methods like GET, POST, PUT, DELETE to perform CRUD (Create, Read, Update, Delete) operations.

// // // Responses are typically in JSON or XML format.

// // // Stateless and scalable, REST is widely used in modern web applications.

// // // Example:

// // // GET /users/1  --> Retrieves information about user with ID 1
// // // POST /users   --> Creates a new user

// // // 2. SOAP(Simple Object Access Protocol);

// // // A protocol for exchanging structured information in web services.

// // // Uses XML for messaging and can operate over different protocols,
// // // including HTTP, SMTP, etc.

// // // Known for being more rigid and complex than REST, but has strong
// // // security and transaction support.

// // // Example:

// // // <soap:Envelope>
// // //   <soap:Body>
// // //     <GetUserDetails>
// // //       <UserID>123</UserID>
// // //     </GetUserDetails>
// // //   </soap:Body>
// // // </soap:Envelope>

// // // 3. GraphQL:

// // // A query language for APIs that allows clients to request exactly the data they need

// // // It differs from REST in that clients can specify the structure of the response, reducing
// // // over-fetching or under-fetching of data.

// // // // Key Components OF API
// // // 1.End Point:The URl where the client sends the request to interact with the API
// // // ex. http://api.example.com/users

// // // 2.Request Methods(for WebAPis):

// // //   GET: Retrives the data form the server.
// // //   POST: Sends the data to the server.
// // //   PUT: Updates existing data on th server.
// // //   DELETE: Removes data from the server.

// // // 3. Headers: Metadata sent along wth the API request or response, including
// // //   authorization tokens, content types etc.
// // //   example:
// // //   Content-Type:application/json
// // //   Authorization: Bearer<token>

// // // 4. Body: Data sent in the request (typically with POST or PUT requests)
// // //   example:
// // //   {
// // //     "name": "John Doe",
// // //     "email": "john.doe@example.com"
// // //   }

// // // 5. Response: The data sent back from the server, often in JSON or
// // //   XML format, along with a status code (e.g., 200 OK, 404 Not Found).
// // //     example:
// // //     {
// // //       "id": 1,
// // //       "name": "John Doe",
// // //       "email": "john.doe@example.com"
// // //     }

// // //     What is an API?
// // //     API stands for Application Programming Interface, a set of rules and protocols that allows different software applications to communicate and interact with each other. It acts as an intermediary between the client (like a web browser or mobile app) and a server, enabling them to send and receive data or requests.

// // //     APIs are essential for modern software development, allowing developers to leverage existing services, functionality, or data without needing to build everything from scratch. They enable different systems to work together, regardless of how they were built or what technology they use.

// // //     Types of APIs
// // //     Web APIs:

// // //     These are the most common types of APIs used for communication over the internet, typically following HTTP protocols.
// // //     Examples: REST, GraphQL, SOAP.
// // //     They are used in web and mobile apps to fetch or send data to a server.
// // //     Operating System APIs:

// // //     APIs provided by operating systems (like Windows, macOS, Linux) that allow software to interact with the system's core features.
// // //     Example: Windows API, POSIX in Linux.
// // //     Library/API Frameworks:

// // //     These APIs allow developers to use predefined libraries of code, simplifying tasks like building user interfaces, working with databases, etc.
// // //     Examples: jQuery, TensorFlow, React.
// // //     Hardware APIs:

// // //     APIs that enable software to communicate with hardware components, like sensors, cameras, or printers.
// // //     Example: DirectX for gaming hardware interaction.
// // //     Remote APIs:

// // //     These APIs allow access to resources over a network, usually through the internet, where the API resides on a remote server.
// // //     Example: Cloud storage APIs like AWS S3 or Google Drive API.
// // //     Common API Protocols
// // //     REST (Representational State Transfer):

// // //     A popular web API design architecture.
// // //     Uses HTTP methods like GET, POST, PUT, DELETE to perform CRUD (Create, Read, Update, Delete) operations.
// // //     Responses are typically in JSON or XML format.
// // //     Stateless and scalable, REST is widely used in modern web applications.
// // //     Example:

// // //     http
// // //     Copy code
// // //     GET /users/1  --> Retrieves information about user with ID 1
// // //     POST /users   --> Creates a new user
// // //     SOAP (Simple Object Access Protocol):

// // //     A protocol for exchanging structured information in web services.
// // //     Uses XML for messaging and can operate over different protocols, including HTTP, SMTP, etc.
// // //     Known for being more rigid and complex than REST, but has strong security and transaction support.
// // //     Example:

// // //     xml
// // //     Copy code
// // //     <soap:Envelope>
// // //       <soap:Body>
// // //         <GetUserDetails>
// // //           <UserID>123</UserID>
// // //         </GetUserDetails>
// // //       </soap:Body>
// // //     </soap:Envelope>
// // //     GraphQL:

// // //     A query language for APIs that allows clients to request exactly the data they need.
// // //     It differs from REST in that clients can specify the structure of the response, reducing over-fetching or under-fetching of data.
// // //     Example:

// // //     graphql
// // //     Copy code
// // //     query {
// // //       user(id: 1) {
// // //         name
// // //         email
// // //       }
// // //     }
// // //     Key Components of an API
// // //     Endpoint:

// // //     The URL where the client sends requests to interact with the API.
// // //     Example: https://api.example.com/users
// // //     Request Methods (for Web APIs):

// // //     GET: Retrieves data from the server.
// // //     POST: Sends new data to the server.
// // //     PUT: Updates existing data on the server.
// // //     DELETE: Removes data from the server.
// // //     Headers:

// // //     Metadata sent along with the API request or response, including authorization tokens, content types, etc.
// // //     Example:
// // //     http
// // //     Copy code
// // //     Content-Type: application/json
// // //     Authorization: Bearer <token>
// // //     Body:

// // //     Data sent in the request (typically with POST or PUT requests).
// // //     Example:
// // //     json
// // //     Copy code
// // //     {
// // //       "name": "John Doe",
// // //       "email": "john.doe@example.com"
// // //     }
// // //     Response:

// // //     The data sent back from the server, often in JSON or XML format, along with a status code (e.g., 200 OK, 404 Not Found).
// // //     Example:

// // //     json
// // //     Copy code
// // //     {
// // //       "id": 1,
// // //       "name": "John Doe",
// // //       "email": "john.doe@example.com"
// // //     }
// // //     Benefits of APIs
// // //     Modularity: APIs allow you to break down complex systems into modular parts, enabling reusability of code.
// // //     Interoperability: APIs allow different systems to interact, even if they're built using different technologies.
// // //     Scalability: By using APIs, services can be scaled independently without affecting other parts of the system.
// // //     Efficiency: Developers can leverage existing APIs to add functionality to their apps, saving time and effort.
// // //     Security: APIs can add layers of security, such as token-based authentication, limiting access to sensitive data.
// // //     */

// // // //WORKING WITH APIS
// // const request1 = fetch("https://restcountries.com/v2/name/india");
// // console.log(request1);
// // // Promise { <pending> } Promise { <pending> }
// // // handle the above promises
// // request1
// //   .then((res) => {
// //     // console.log("1.", res); // logs the response object from API
// //     return res.json(); //converts respnse body to json object
// //   })
// //   .then((data) => {
// //     // console.log("2.", data); //logs the parsed json data from api
// //     let data1;
// //     if (data.length > 1) {
// //       data1 = data[0].name === "india" ? data[0] : data[1];
// //     } else {
// //       data1 = data[0];
// //     }

// //     // console.log("1111", data1);
// //     const requiredData = {
// //       Name: data1.name,
// //       language: data1.languages,
// //       currency: data1.currencies,
// //       population: data1.population,
// //       flag: data1.flag
// //     };
// //     console.log(">>>", requiredData);
// //     return requiredData;
// //   })
// //   .catch((Err) => {
// //     console.error(Err); // Catches any errors during the process
// //   });

// // // >> Response
// // // [{
// // //   [Symbol(realm)]: null,
// // //   [Symbol(state)]: {
// // //     aborted: false,
// // //     rangeRequested: false,
// // //     timingAllowPassed: true,
// // //     requestIncludesCredentials: true,
// // //     type: 'default',
// // //     status: 200,
// // //     timingInfo: {
// // //       startTime: 142.76961900293827,
// // //       redirectStartTime: 0,
// // //       redirectEndTime: 0,
// // //       postRedirectStartTime: 142.76961900293827,
// // //       finalServiceWorkerStartTime: 0,
// // //       finalNetworkResponseStartTime: 0,
// // //       finalNetworkRequestStartTime: 0,
// // //       endTime: 0,
// // //       encodedBodySize: 1175,
// // //       decodedBodySize: 0,
// // //       finalConnectionTimingInfo: null
// // //     },
// // //     cacheState: '',
// // //     statusText: 'OK',
// // //     headersList: HeadersList {
// // //       cookies: null,
// // //       [Symbol(headers map)]: [Map],
// // //       [Symbol(headers map sorted)]: null
// // //     },
// // //     urlList: [ [URL] ],
// // //     body: { stream: undefined }
// // //   },
// // //   [Symbol(headers)]: HeadersList {
// // //     cookies: null,
// // //     [Symbol(headers map)]: Map(7) {
// // //       'server' => [Object],
// // //       'date' => [Object],
// // //       'content-type' => [Object],
// // //       'content-length' => [Object],
// // //       'connection' => [Object],
// // //       'cache-control' => [Object],
// // //       'content-encoding' => [Object]
// // //     },
// // //     [Symbol(headers map sorted)]: null
// // //   },
// // // }
// // // ]
// // [
// //   {
// //     name: "India",
// //     topLevelDomain: [".in"],
// //     alpha2Code: "IN",
// //     alpha3Code: "IND",
// //     callingCodes: ["91"],
// //     capital: "New Delhi",
// //     altSpellings: ["IN", "Bhārat", "Republic of India", "Bharat Ganrajya"],
// //     subregion: "Southern Asia",
// //     region: "Asia",
// //     population: 1380004385,
// //     latlng: [20, 77],
// //     demonym: "Indian",
// //     area: 3287590,
// //     gini: 35.7,
// //     timezones: ["UTC+05:30"],
// //     borders: ["AFG", "BGD", "BTN", "MMR", "CHN", "NPL", "PAK", "LKA"],
// //     nativeName: "भारत",
// //     numericCode: "356",
// //     flags: {
// //       svg: "https://flagcdn.com/in.svg",
// //       png: "https://flagcdn.com/w320/in.png"
// //     },
// //     currencies: [[Object]],
// //     languages: [[Object], [Object]],
// //     translations: {
// //       br: "India",
// //       pt: "Índia",
// //       nl: "India",
// //       hr: "Indija",
// //       fa: "هند",
// //       de: "Indien",
// //       es: "India",
// //       fr: "Inde",
// //       ja: "インド",
// //       it: "India",
// //       hu: "India"
// //     },
// //     flag: "https://flagcdn.com/in.svg",
// //     regionalBlocs: [[Object]],
// //     cioc: "IND",
// //     independent: true
// //   }
// // ];

// // // const request2 = fetch("https://openweathermap.org/api");

// // // request2
// // //   .then((res) => {
// // //     console.log(res);
// // //     return res.json();
// // //   })
// // //   .then((data) => {
// // //     console.log(data);
// // //   })
// // //   .catch((err) => {
// // //     console.error(err);
// // //   });
// // // //SyntaxError: Unexpected token < in JSON at position 0
// // //api is not valid
// // //*************************************$$$$$$$$$$$$$$$$$$$$$$$$ */
// // //different types of api that you can build for practice in js using node.js and express.js

// // // end points
// // // post/users- create a new user.
// // // get/users - Retrieve all users
// // // get/users/:id- Retrieve a specific user by id
// // // put/users/:id - Update a user by Id
// // // delete/users/:id- Delete a user by Id

// // // apis using async await
// // const weatherData = async function () {
// //   try {
// //     const response = await fetch(
// //       "https://api.openweathermap.org/data/2.5/weather"
// //     );
// //     // console.log("rrr", response);
// //     const data = response.json();
// //     return data;
// //   } catch (error) {
// //     console.error(error);
// //   }
// // };
// // // console.log(">>>", weatherData());
// // // TO GET WEAATHER DATA WE NEED API KEY.

// // // >>> Promise { <pending> }
// // // rrr Response {
// // //   [Symbol(realm)]: null,
// // //   [Symbol(state)]: {
// // //     aborted: false,
// // //     rangeRequested: false,
// // //     timingAllowPassed: true,
// // //     requestIncludesCredentials: true,
// // //     type: 'default',
// // //     status: 401,
// // //     timingInfo: {
// // //       startTime: 207.57271300256252,
// // //       redirectStartTime: 0,
// // //       redirectEndTime: 0,
// // //       postRedirectStartTime: 207.57271300256252,
// // //       finalServiceWorkerStartTime: 0,
// // //       finalNetworkResponseStartTime: 0,
// // //       finalNetworkRequestStartTime: 0,
// // //       endTime: 0,
// // //       encodedBodySize: 108,
// // //       decodedBodySize: 108,
// // //       finalConnectionTimingInfo: null
// // //     },
// // //     cacheState: '',
// // //     statusText: 'Unauthorized',
// // //     headersList: HeadersList {
// // //       cookies: null,
// // //       [Symbol(headers map)]: [Map],
// // //       [Symbol(headers map sorted)]: null
// // //     },
// // //     urlList: [ [URL] ],
// // //     body: { stream: undefined }
// // //   },
// // //   [Symbol(headers)]: HeadersList {
// // //     cookies: null,
// // //     [Symbol(headers map)]: Map(9) {
// // //       'server' => [Object],
// // //       'date' => [Object],
// // //       'content-type' => [Object],
// // //       'content-length' => [Object],
// // //       'connection' => [Object],
// // //       'x-cache-key' => [Object],
// // //       'access-control-allow-origin' => [Object],
// // //       'access-control-allow-credentials' => [Object],
// // //       'access-control-allow-methods' => [Object]
// // //     },
// // //     [Symbol(headers map sorted)]: null
// // //   }
// // // }
// // // Your weatherData function is trying to fetch data from the
// // // OpenWeatherMap API without providing the necessary API key, which
// // // is why you're receiving a 401 error.

// // const countryData = async function (countryName) {
// //   try {
// //     const response = await fetch(
// //       `https://restcountries.com/v2/name/${countryName}`
// //     );

// //     if (!response.status === 200) {
// //       return "invalid input.";
// //     }

// //     const data = await response.json();

// //     // console.log(">>", typeof data); //>> object
// //     // console.log("///", data.length);
// //     // console.log(">>>>>>>>", data[0]);
// //     // console.log("??", `${data[0]}`); //?? [object Object]
// //     let data1;
// //     if (data.length > 1) {
// //       data1 = data[0].name === countryName ? data[0] : data[1];
// //     } else {
// //       data1 = data[0];
// //     }

// //     // console.log("1111", data1);
// //     const requiredData = {
// //       Name: data1.name,
// //       language: data1.languages,
// //       currency: data1.currencies,
// //       population: data1.population,
// //       flag: data1.flag
// //     };
// //     // console.log(">>>", requiredData);
// //     return requiredData;
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }; //******************************************************
// // console.log("output", countryData("usa")); ///THIS WILL ALWAYS RETURN A PROMISE ITS NOT A FUNCTION IT'S PROMISE HENCE RETURN PENDING PROMISE.
// // // output Promise { <pending> }
// // // with this will we get requiredData or not? if not why?
// // // before talking about asynchronous code its finally a function
// // // it has to return some value right?why its not returning returned
// // // value but returning promise? ************************************

// // // ****************************************555555555555555555555555

// // // if you write async infront of function then it will become promise not  a function

// // /////   *********************************************************************

// // // When you call console.log("output", countryData("india"));,
// // //  you're logging the result of the countryData function, which is
// // //   an asynchronous function. The countryData function returns a
// // //   promise because it's defined as async, which means it always
// // //   returns a promise.

// // // Why You See a Promise

// // // Asynchronous Function: The async keyword before the function definition
// // // makes it an asynchronous function, which automatically returns a
// // // promise. The value you return from this function is wrapped in a
// // // promise.

// // // Pending Promise: The countryData function performs asynchronous
// // // operations (like fetching data and processing it), so it returns
// // // a promise that is still pending when you log it directly.

// // // Understanding Promises

// // // Promise Basics: A promise is a placeholder for a value that is
// // // not yet available but will be resolved in the future. When you
// // // use async functions, they always return promises.

// // // Handling the Promise: To get the value from a promise, you need to
// // // handle it asynchronously. This is done either by using await inside
// // //  an async function or by using .then().

// // // TO GET THE REQUIRED VALUE INSTEAD OF PROMISE WE NEED TO HANDLE THE PROMISE
// // // HANDLING THE PROMISE

// // async () => {
// //   const result = await countryData("india");
// //   console.log("rrr", result);
// // };

// // //no output will come becuase we need to invoke or we need to call this

// // (async () => {
// //   const result = await countryData("india");
// //   console.log("rrr", result);
// // })();

// // [
// //   {
// //     Name: "India",
// //     language: [
// //       {
// //         iso639_1: "hi",
// //         iso639_2: "hin",
// //         name: "Hindi",
// //         nativeName: "हिन्दी"
// //       },
// //       {
// //         iso639_1: "en",
// //         iso639_2: "eng",
// //         name: "English",
// //         nativeName: "English"
// //       }
// //     ],
// //     currency: [{ code: "INR", name: "Indian rupee", symbol: "₹" }],
// //     population: 1380004385,
// //     flag: "https://flagcdn.com/in.svg"
// //   }
// // ];

// // // or
// // countryData("argentina")
// //   .then((res) => {
// //     console.log("aaa", res);
// //   })
// //   .catch((error) => {
// //     console.log(error);
// //   });
// // [
// //   {
// //     Name: "Argentina",
// //     language: [
// //       {
// //         iso639_1: "es",
// //         iso639_2: "spa",
// //         name: "Spanish",
// //         nativeName: "Español"
// //       },
// //       {
// //         iso639_1: "gn",
// //         iso639_2: "grn",
// //         name: "Guaraní",
// //         nativeName: "Avañe'ẽ"
// //       }
// //     ],
// //     currency: [{ code: "ARS", name: "Argentine peso", symbol: "$" }],
// //     population: 45376763,
// //     flag: "https://flagcdn.com/ar.svg"
// //   }
// // ];

// // const { rejects } = require("assert");
// // const { error } = require("console");
// // // Final Execution Order:
// // // request1 fetch -> logs India data.
// // // countryData("usa") -> logs USA data as "rrr".
// // // countryData("argentina") -> logs Argentina data as "aaa".

// // //but promises handled with async/await need to execute first right?
// // // if not so then what is the use of async/await?

// // // The async/await syntax is designed to make it easier to work with
// // // promises in a more synchronous-looking style, but it does not
// // // guarantee that the promise will resolve first. The actual order of
// // // execution still depends on when the promises resolve and how you
// // // manage concurrency.

// // // How Promises Work

// // // JavaScript handles promises asynchronously via the event loop.
// // // When a promise is made (like with a fetch call), it is pushed to
// // // the background, and JavaScript continues to run other code. Once
// // // the promise resolves, it is placed in the event loop's task queue
// // // to be executed.

// // // How async/await Works

// // // async/await is syntactic sugar around promises. It makes your code
// // // look more readable by allowing you to write asynchronous code in a
// // // synchronous manner.

// // // When you use await, it pauses the execution of the function until
// // // the promise you're awaiting resolves. However, this does not block
// // // the entire program. Other asynchronous code can still execute while
// // // awaiting.

// // // Use of Async/Await

// // // Readability: The main advantage of async/await is that it simplifies how you write and manage asynchronous code. Instead of chaining .then(), you can use await to pause execution and handle promises in a linear, more readable way.

// // // Error Handling: With async/await, you can use try/catch for handling errors, making it easier to handle synchronous and asynchronous errors in one place.

// // // When to Use Async/Await

// // // You would use async/await to:
// // // Make code easier to read and understand, especially when dealing
// // // with multiple asynchronous steps.

// // // Write code that reads more like synchronous code, even though it's
// // // asynchronous under the hood.

// // // Handle errors more cleanly with try/catch.

// // // Conclusion
// // // The order in which promises resolve depends on external factors
// // // (like network speed) and not on whether you use async/await or .then().
// // // Both are just different ways to handle asynchronous operations.

// // // async/await helps you write asynchronous code that looks synchronous,
// // // but the actual promise resolution timing is still asynchronous and
// // // dependent on when the promise resolves, not on the syntax.

// // // other way of extracting api

// // // using axios

// // // axios
// // //   .get(`https://restcountries.com/v2/name/${countryName}`)
// // //   .thne((res) => res.json())
// // //   .then((data) => {
// // //     console.log(data);
// // //   })
// // //   .catch((err) => {
// // //     console.log(err);
// // //   });

// // // using Node.js https Modules

// // // 2.
// // const https = require("https");
// // const { resolve } = require("path");
// // https.get(`https://restcountries.com/v2/name/france`, (res) => {
// //   let data = "";

// //   res.on("data", (chunk) => {
// //     console.log(chunk); //<Buffer 5b 7b 22 6e 61 6d 65 22 3a 22 55 6e 69 74 65 64 20 53 74 61 74 65 73 20 6f 66 20 41 6d 65 72 69 63 61 22 2c 22 74 6f 70 4c 65 76 65 6c 44 6f 6d 61 69 ... 1362 more bytes>
// //     data += chunk;
// //   });

// //   res
// //     .on("end", () => {
// //       console.log(JSON.parse(data));
// //     })
// //     .on("error", (error) => {
// //       console.error("Error", error);
// //     });
// // });

// // // 3.
// // //using request library Node.js
// // const request = require("request");
// // request(
// //   `https://restcountries.com/v2/name/portugal`,
// //   { json: true },
// //   (err, res, body) => {
// //     if (err) {
// //       console.error("Error", err);
// //     } else {
// //       console.log(body);
// //     }
// //   }
// // );

// // //here 2 and 3 are executing first than async code written in first,
// // //  why it is like that
// // // The reason why the second and third blocks (using https and request
// // // in Node.js) are executing before the first block (using fetch with
// // // async/await) comes down to the order in which JavaScript processes
// // // asynchronous tasks in the event loop.

// // // The fetch() request (inside the async function) is part of the
// // // microtask queue, but it waits for the entire response to resolve
// // // before proceeding.

// // // The https and request tasks are handled as macrotasks and begin
// // // streaming data in chunks as soon as the response starts arriving,
// // // so their logs appear first.
// // // Even though the async/await code uses the microtask queue, network
// // // operations like fetch still take time to complete, so you see output
// // // from https and request first.

// // // JavaScript Event Loop and Asynchronous Tasks

// // // JavaScript is single-threaded and handles asynchronous operations using
// // //    the event loop. The event loop manages two main types of asynchronous
// // //    tasks:

// // // Microtasks: These are tasks that are executed immediately after
// // //    the current operation, before any other tasks. Microtasks include:

// // //    Promise resolutions (.then(), async/await).

// // //    MutationObserver callbacks.

// // // Macrotasks: These are tasks that are placed in the event loop's
// // //     task queue. Macrotasks include:

// // //      I/O operations like setTimeout, setInterval, and https/request in
// // //       Node.js.

// // // Any event callbacks triggered by asynchronous operations like file
// // //  system access, HTTP requests (https.get or request).

// // //using new Promise constructor
// // const promiseApi = new Promise((resolve, reject) => {
// //   fetch("https://www.restcountries.com/v2/name/spain")
// //     .then((res) => res.json())
// //     .then((data) => resolve(data))
// //     .catch((err) => {
// //       reject(err);
// //     });
// // });
// // promiseApi
// //   .then((data) => {
// //     console.log("prm1", data);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// // (async () => {
// //   const data = await promiseApi;
// //   console.log("prm2", data);
// // })();

// // // const genderApiPr = async function (name){
// // //   return  new Promise((res, rej)=>{
// // //     const data = await fetch(`https://api.genderize.io?name=${name}`);
// // //     console.log(data);
// // //   })
// // // }

// // //******************************************

// // //shall we use both async/await and new Promise constructor on single function *************************************

// // //the above written function in NOT CORRECT BECAUSE

// // // we DONOT USE BOTH async/await AND  new Promise IN THE SAME FUNCTION
// // // because async functions implicitly return a promise.

// // // This means that when you mark a function as async, it automatically
// // //  returns a promise, and await allows you to pause execution
// // // until that promise is resolved.

// // //HOW ASYNC/aWAIT WORKS

// // //    async funciton automatically (returns) wraps a promise with its value

// // //    inside async function we use await to pause tha execution untill promise
// // //    is resolved, making the code look synchronous

// // //   the return value form async funcion is reloved value of promise.

// // // const genderApiPr = function (name) {
// // //   return new Promise((resolve, reject) => {
// // //     try {
// // //       const response = fetch(`https://api.genderize.io?name=${name}`);
// // //       const data = response.json();
// // //       resolve(data);
// // //     } catch (error) {
// // //       reject(error);
// // //     }
// // //   });
// // // };
// // //this way of writing promise is also not correct

// // // correct version

// // const genderApiPr = function (name) {
// //   return new Promise((resolve, reject) => {
// //     fetch(`https://api.genderize.io?name=${name}`)
// //       .then((res) => {
// //         // console.log(">>", res); this will give pending response
// //         // resolve(res);
// //         return res.json();
// //       })
// //       .then((data) => {
// //         // console.log(data);
// //         resolve(data);
// //       })
// //       .catch((err) => {
// //         reject(err);
// //       });
// //   });
// // };

// // (async () => {
// //   const data = await genderApiPr("ramesh");
// //   console.log("////", data);
// // })();
// // //

// // // Summary of Approaches: for fetching data from api

// // // 1. fetch() (Native): Promises and async/await
// // // 2. XMLHttpRequest (Old school)
// // // 3. Axios (Promise-based third-party library)
// // // 4. jQuery.ajax() (jQuery users)
// // // 5. https module (Node.js built-in)
// // // 6. superagent (Third-party library)
// // // 7. request (Node.js library, deprecated)
// // // 8. Custom Promises with fetch
// // // 9. fetch with additional headers

// // //   *****************PARALLEL OPERATION OF APIs ************************
// // //  Parallel operation means process of making multiple APIs requests
// // // simultaneously rathan than sequentially, optimizing time efficiency.

// // //This is useful when dealing with independent api requests,
// // // where  the response of one API does not depend on the response of
// // // another.

// // //Benfits of Parallel API requests:

// // // 1. Faster Response Time: Since multiple requests are made at the
// // //            same time, the overall time taken is reduced, as we don't
// // //            have to wait for each request to finish before starting next one.

// // // 2. Efficient Resource Utilization: Parallel requests utilize system
// // //            system resources like network and processing power more efficiently.

// // //3. Better User Experience: In client facing applications, parallel
// // //            API requests reduce latency and improve the responsiveness
// // //            of the app.

// // //  Use Cases:

// // // Data Aggregation : Fetching country data and weather data information
// // //          in parallel to combine the results into a comprehensive dataset

// // //  Microservices Architecture : Different microservices can respond to
// // //          to requests concurrently, reducing overall latency in service-
// // //          oriented archeticures.

// // // Batch Processing: Retrieving multiple resources at once, such as requesting
// // //          user profiles, order details, or toher batch data.

// // // example :
// // async function getCountriesAndWether() {
// //   const countryApi = "https://restcountries.com/v3.1/all";
// //   // const weatherApi =
// //   // "https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=London";
// //   const genderApi = "https://api.genderize.io?name=Ramesh";
// //   console.log();
// //   try {
// //     const [countryResponce, genderResponce] = await Promise.all([
// //       // fetch([countryApi, genderApi])//TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))at Function.all (<anonymous>)
// //       fetch(countryApi),
// //       fetch(genderApi)
// //     ]);
// //     const countries = await countryResponce.json();
// //     // const weather = await weatherResponce.json();//
// //     const gender = await genderResponce.json();

// //     return { countries, gender };
// //   } catch (Error) {
// //     // res.json({status:404, error:Error})
// //     console.error("getCountriesError:", Error);
// //   }
// // }

// // //the above function will return promise, now we need to handle then
// // (async () => {
// //   const data = await getCountriesAndWether();
// //   if (data) {
// //     const countryNames = data.countries.map((country) => country.name.common);
// //     const gender = data.gender.gender;
// //     // console.log(data);
// //     console.log(countryNames);
// //     console.log(gender);
// //   } else {
// //     console.error("Error Fetching data");
// //   }
// // })();
// // // getCountriesAndWether()
// // //   .then((data) => {
// // //     console.log(data.countries.map((country) => country.name.common));
// // //     console.log(data.gender);
// // //   })
// // //   .catch((error) => {
// // //     console.error(error);
// // //   });
// // [
// //   "South Georgia",
// //   "Grenada",
// //   "Switzerland",
// //   "Sierra Leone",
// //   "Hungary",
// //   "Taiwan",
// //   "Wallis and Futuna",
// //   "Barbados",
// //   "Pitcairn Islands",
// //   "Ivory Coast",
// //   "Tunisia",
// //   "Italy",
// //   "Benin",
// //   "Indonesia",
// //   "Cape Verde",
// //   "Saint Kitts and Nevis",
// //   "Laos",
// //   "Caribbean Netherlands",
// //   "Uganda",
// //   "Andorra",
// //   "Burundi",
// //   "South Africa",
// //   "France",
// //   "Libya",
// //   "Mexico",
// //   "Gabon",
// //   "Northern Mariana Islands",
// //   "North Macedonia",
// //   "China",
// //   "Yemen",
// //   "Saint Barthélemy",
// //   "Guernsey",
// //   "Solomon Islands",
// //   "Svalbard and Jan Mayen",
// //   "Faroe Islands",
// //   "Uzbekistan",
// //   "Egypt",
// //   "Senegal",
// //   "Sri Lanka",
// //   "Palestine",
// //   "Bangladesh",
// //   "Peru",
// //   "Singapore",
// //   "Turkey",
// //   "Afghanistan",
// //   "Aruba",
// //   "Cook Islands",
// //   "United Kingdom",
// //   "Zambia",
// //   "Finland",
// //   "Niger",
// //   "Christmas Island",
// //   "Tokelau",
// //   "Guinea-Bissau",
// //   "Azerbaijan",
// //   "Réunion",
// //   "Djibouti",
// //   "North Korea",
// //   "Mauritius",
// //   "Montserrat",
// //   "United States Virgin Islands",
// //   "Colombia",
// //   "Greece",
// //   "Croatia",
// //   "Morocco",
// //   "Algeria",
// //   "Antarctica",
// //   "Netherlands",
// //   "Sudan",
// //   "Fiji",
// //   "Liechtenstein",
// //   "Nepal",
// //   "Puerto Rico",
// //   "Georgia",
// //   "Pakistan",
// //   "Monaco",
// //   "Botswana",
// //   "Lebanon",
// //   "Papua New Guinea",
// //   "Mayotte",
// //   "Dominican Republic",
// //   "Norfolk Island",
// //   "Bouvet Island",
// //   "Qatar",
// //   "Madagascar",
// //   "India",
// //   "Syria",
// //   "Montenegro",
// //   "Eswatini",
// //   "Paraguay",
// //   "El Salvador",
// //   "Ukraine",
// //   "Isle of Man",
// //   "Namibia",
// //   "United Arab Emirates",
// //   "Bulgaria",
// //   "Greenland",
// //   "Germany",
// //   "Cambodia",
// //   "Iraq",
// //   "... 150 more items"
// // ];
// // //male
// // // { count: 160806, name: 'Ramesh', gender: 'male', probability: 0.98 }

// // //       ******************************************************* *

// // // writing fetching data in parallel api method like below will lead to error
// // // fetch([countryApi, genderApi])//TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))at Function.all (<anonymous>)

// // // *********************************************
// // //DIFFERENT WAYS OF HANDLING PARALLEL API OPERATIONS:
// // //  Depending on use cases, environment , and the desired outcome
// // //  the are several ways
// // //    1. Promise.all()
// // //    2. Promise.allSettled()
// // //    3. Promise.race()
// // //    4. Using async/await with Individual Requests
// // //    5.  Combining Sequential and Parallel Requests  ***********
// // //    6. Using Observable with RxJS(Reactive Programming)

// // // Conclusion

// // // For most general use cases, Promise.all() or Promise.allSettled()
// // // are suitable for handling parallel API requests.

// // // If you want resiliency and the ability to handle partial failures,
// // // Promise.allSettled() is a better choice.

// // // If you're only interested in the fastest response, Promise.race()
// // // might be useful.

// // // For complex use cases that involve combining reactive data streams
// // // or real-time updates, RxJS with observables offers a more advanced
// // // solution.

// // // 1.Using Promise.all() :It runs all promises concurrently and waits
// // // for all of them to resolve.
// // // If any one of them reject all promises will reject

// // async function fetchUsingPrAll() {
// //   try {
// //     const responses = await Promise.all([
// //       fetch("https://api.example1.com"),
// //       fetch("https://api.example2.com"),
// //       fetch("https://api.example3.com")
// //     ]);
// //     // const data = await responses.json()  >>>>> not correct needs to be called individually on each response to extract the JSON data

// //     const data = await Promise.all(responses.map((object) => object.json()));

// //     const [data1, data2, data3] = data;
// //     return { data1, data2, data3 };

// //     //or

// //     // const [response1,response2, response3] = responses;
// //     // const data1 = await response1.json()
// //     // const data2 = await response2.json()
// //     // const data3 = await response3.json()

// //     // return {data1,data2,data3}
// //   } catch (Error) {
// //     console.error("Error");
// //   }
// // }

// // //the above function will give promise object, to get desired
// // // output we need to handle the above promise

// // fetchUsingPrAll()
// //   .then((data) => {
// //     console.log(data.data1);
// //     console.log(data.data2);
// //     console.log(data.data3);
// //   })
// //   .catch((error) => {
// //     console.error(error);
// //   });

// // // directly writing to get data like this
// // // const data = await responses.json()
// // //  will fail right? we need to write response.json() on each object right?

// // //   Yes, that's correct! Writing const data = await responses.json()
// // //   will fail because responses is an array of Response objects, not
// // //    a single response.

// // // Each Response object from fetch contains a method called .json(),
// // //  which needs to be called individually on each response to
// // //  extract the JSON data. Since you're working with an array of
// // //  responses, you need to map over the array and call .json() on
// // //  each Response object, like this:

// // // const data = await Promise.all(responses.map(response => response.json()));

// // // This way, Promise.all ensures that all the .json() calls resolve
// // // before you proceed, and data will then be an array of parsed JSON
// // //  data from all the responses.

// // //****************************
// // //Benefits:

// // //      Efficiency: The requests are initiated simultaneously.
// // //      Error Handling: If any request fails, it throws an error and
// // //      skips other responses.

// // //Drawbacks:
// // //      Single Failure: If one request fails, the entire operation is
// // //      considered failed

// // //

// // // USING Promise.allSettled(): waits for all the promises to settle
// // //      (either resolve or reject) and
// // //      return an array of objects with each promise's status(it may be)
// // //      fullfilled or rejected

// // async function fetchUsignPrAllSettled() {
// //   const results = await Promise.allSettled([
// //     fetch("api1"),
// //     fetch("api2"),
// //     fetch("api3")
// //   ]);
// //   // //if you know all the promises will fullfilled
// //   // const data = await Promise.allSettled(results.map(object=>object.json()));
// //   //otherwise
// //   results.forEach((result, index) => {
// //     if (result.status === "fulfilled") {
// //       console.log(`api ${index + 1} data:`, result.value);
// //     } else {
// //       console.error(`api ${index + 1}`, result.reason);
// //     }
// //   });
// // }

// // //this function need to be handle but we dont get any data. So the correct
// // // version of code is
// // async function fetchUsignPrAllDtSettled() {
// //   const results = await Promise.allSettled([
// //     fetch("api1"),
// //     fetch("api2"),
// //     fetch("api3")
// //   ]);
// //   const data = [];
// //   const rejected = [];
// //   results.forEach((response) => {
// //     if (response.status === "fulfilled") {
// //       data.push(response.value);
// //     } else {
// //       rejected.push(response);
// //     }
// //   });
// //   return { data, rejected };
// // }

// // fetchUsignPrAllDtSettled()
// //   .then((data) => {
// //     console.log(data.data);
// //     console.log(data.rejected);
// //   })
// //   .catch((Err) => {
// //     console.error(Err);
// //   });
// // async function fetchData() {
// //   const results = await Promise.allSettled([
// //     fetch("https://api.example1.com/data"),
// //     fetch("https://api.example2.com/data")
// //   ]);

// //   const data = await Promise.all(
// //     results.map(async (result, index) => {
// //       if (result.status === "fulfilled") {
// //         try {
// //           const jsonData = await result.value.json(); // Extract JSON data
// //           return { success: true, data: jsonData }; // Return the JSON data
// //         } catch (error) {
// //           return {
// //             success: false,
// //             error: `Failed to parse JSON for API ${index + 1}`
// //           };
// //         }
// //       } else {
// //         return {
// //           success: false,
// //           error: `API ${index + 1} failed: ${result.reason}`
// //         };
// //       }
// //     })
// //   );

// //   return data;
// // }

// // // Benefits:

// // //       Resiliency: All promises are handled, even if some fail.
// // //       No Complete Failure: Allows processing of successful results
// // //       even if some requests fail.

// // // Drawbacks:
// // //     You need to manually check the status of each response and
// // //     handle the errors accordingly.

// // // 3. USING Promise.race()
// // // This will runs the multiple promises in parallel but returns only
// // // the result of first promise the resole or reject *************
// // // It is useful when working with time-sensitive operation

// // async function fetchUsingPrRace() {
// //   try {
// //     const response = Promise.race([fetch("api1"), fetch("api2")]);
// //     // const data = await response.map(reponse=>response.json());// >> *********
// //     //data variable is wrong because becase there we dont have to use
// //     // map method since Promise.race only gives one response it may be
// //     // either rejected or resolved.

// //     const data = await response.json();
// //     return data;
// //   } catch (Error) {
// //     console.Error(Error);
// //   }
// // }
// // (async () => {
// //   const data = await fetchUsingPrAll();
// //   console.log(data);
// // })();

// // // Benefits:
// // // Speed: You get the first successful response quickly.
// // // Drawbacks:
// // // Limited Use: Only one response is processed; you won’t get
// // // data from other APIs.

// // //4. using async/await with individual Requests:
// // //we can manually request using async/await, though this would be
// // // sequential and thus slower.
// // //THIS WILL BE USEFUL IF THERE'S A DEPENDANCY BETWEEN API CALLS

// // async function fetchUsingAsyncAwait() {
// //   try {
// //     const response1 = await fetch("api1");
// //     const data1 = await response1.json();

// //     const response2 = await fetch(
// //       `https://api.example.com/data?param=${data1.id}`
// //     );
// //     const data2 = await response2.json();

// //     return data2;
// //   } catch (Error) {
// //     console.error(Error);
// //   }
// // }
// // fetchUsingAsyncAwait()
// //   .then((result) => {
// //     console.log(result);
// //   })
// //   .catch((Err) => {
// //     console.log(Err);
// //   });

// // //Benfits
// // // Simplicity : Eacy to fallow if one request depends on another.
// // // Drawbacks
// // // Slower: Each requests waits for the previous one to finish

// // // 5. Combining Sequential and Parallel Requests:

// // //  sometimes we need hybrid approch, where some requests are dependnt
// // //   on others, and remaning can be handled in parallel.

// // async function fetchUsingSeqndParallel() {
// //   try {
// //     const response1 = await fetch("api1");
// //     const data1 = await response1.json();

// //     const responses = await Promise.all([fetch("api2"), fetch("api3")]);
// //     const data = responses.map((response) => response.json());
// //     const [data2, data3] = data;

// //     return { data1, data2, data3 };
// //   } catch (Error) {
// //     console.error(Error);
// //   }
// // }

// // fetchUsingSeqndParallel()
// //   .then((results) => {
// //     console.log(results);
// //   })
// //   .catch((Err) => {
// //     console.log(Err);
// //   });

// // // Benfits:
// // // Flexibilty: Allows you to mix parallel and sequential requests
// // //       based on dependencies

// // // Drawbacks:
// // //   Complexity: Can make code harder to manage if there are too many
// // //       interdependent requests.

// // //

// // //6. Using Obaservable with RxJS(Reactive Programming):

// // // In more advanced scenarios, especially in applications that require real-time
// // // updates or rective streams of data, you can use observables to handle
// // // parallel API requests.

// // // RxJS allows you to make multiple API requests and combine, merge, or
// // // transform the results in various ways

// // import { forkJoin } from "rxjs";
// // import { ajax } from "rxjs";

// // const api1$ = ajax.getJSON("https://api.example.com/data");
// // const api2$ = ajax.getJSON("https://api.example.com/data");

// // forkJoin([api1$, api2$]).subscribe({
// //   next: ([data1, data2]) => console.log("Data1:", data1, "Data2:", data2),
// //   error: (err) => console.error("Error:", err)
// // });

// // // Benfits: Stream-based Approach: Efficient handling of multiple streams of data.

// // // Drawbacks: Complexity:Require knowledge of RxJs and observable.

// // //           ****************************************
// // //CONCLUSION:

// // // for most general use cases: Promise.all() and Promise.allSettled() are suitable.

// // // if you want resiliency and ability to handle PARTIAL FAILURES, Promise.allSettled()
// // // is better choice.

// // // if we only interested in fastest response, Promise.race() might be useful.

// // // for complex use cases that involve combining rective data streams or real-
// // // time unstable_batchedUpdates, RxJS with observables offers a more advanced
// // // solution
// // // in the above promise how do iget all those data like forkJoin, rxjs, ajax and wht is the meaning of putting $sign aftervariable name like api1$ like that?

// // // Let's break down your code and concepts piece by piece:

// // // 1. What is RxJS?
// // // RxJS (Reactive Extensions for JavaScript) is a library that allows you to work with asynchronous data streams. It provides observables, which are objects that emit data over time. You can subscribe to an observable to react to changes or emitted values.

// // // 2. What is forkJoin?
// // // forkJoin is an RxJS operator that waits for all provided observables to complete, and then combines their last emitted values into a single observable array. It's similar to Promise.all() but for observables.

// // // In your code:

// // // forkJoin([api1$, api2$])
// // // This waits for both api1$ and api2$ observables to complete and then emits an array of the results [data1, data2].

// // // 3. What is ajax.getJSON?
// // // ajax.getJSON is an RxJS operator from the rxjs/ajax package that makes an HTTP request and returns an observable that emits the parsed JSON data.

// // // For example:

// // // javascript
// // // Copy code
// // // const api1$ = ajax.getJSON('https://api.example1.com/data');
// // // This returns an observable api1$ that will emit the JSON response from the API.

// // // 4. What is the $ Sign After Variable Names?
// // // In RxJS, it's common practice to add a $ suffix to variables that represent observables. This is not a syntactical requirement, but a naming convention to easily distinguish observables from other variables.

// // // For example:

// // // api1$ indicates that this is an observable (a stream of data).
// // // Without the $, like api1, you might think it's just the raw JSON data or a normal variable.
// // // This helps developers know they need to subscribe to it to get the actual data.

// // // 5. How Does It All Work?
// // // ajax.getJSON() returns an observable for each API call.
// // // forkJoin([api1$, api2$]) waits for both observables to complete and emits the final combined result.
// // // Inside subscribe(), the next callback receives the final array of results ([data1, data2]).
// // // In your code:

// // // javascript
// // // Copy code
// // // forkJoin([api1$, api2$]).subscribe({
// // //   next: ([data1, data2]) => console.log('Data1:', data1, 'Data2:', data2),
// // //   error: (err) => console.error('Error:', err)
// // // });
// // // next: This function is called when both API requests complete successfully, and it logs the data from both APIs.
// // // error: If any of the requests fail, this function will log the error.
// // // Summary of the Code:
// // // javascript
// // // Copy code
// // // import { forkJoin } from 'rxjs';
// // // import { ajax } from 'rxjs/ajax';

// // // // Create observables for both API calls
// // // const api1$ = ajax.getJSON('https://api.example1.com/data');
// // // const api2$ = ajax.getJSON('https://api.example2.com/data');

// // // // Use forkJoin to wait for both observables to complete
// // // forkJoin([api1$, api2$]).subscribe({
// // //   next: ([data1, data2]) => console.log('Data1:', data1, 'Data2:', data2), // Handle the successful response
// // //   error: (err) => console.error('Error:', err) // Handle any errors
// // // });

// // // api1$ and api2$ are observables that you created using ajax.getJSON().
// // // forkJoin([api1$, api2$]) subscribes to both observables, waits for them to complete, and then emits the results.
// // // The $ sign is a convention to indicate these are observables, not plain variables.
// // // This code waits for both API requests to complete, then logs the data. If any of the requests fail, it logs the error.

// // // from where I will get rxjs??

// // // RxJS is a JavaScript library that you can include in your project via npm (Node Package Manager) or Yarn.
// // //  Here's how you can install it and use it in your project.

// // // 1. Installing RxJS

// // // You can install RxJS using either npm or Yarn.

// // // Using npm:

// // // npm install rxjs

// // //working on Promise.allSettled()

// // // async function promisedtAllSettled(){
// // //   const api1 =
// // // }

// //A free API for cryptocurrency prices and market data.

// fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
//   .then((response) => {
//     // console.log(response);
//     return response.json();
//   })
//   .then((data) => {
//     // console.log("list of cryptoCurrency market:", data);
//     const totalMarkets = data.map((Object) => {
//       return Object.id;
//     });
//     // console.log(totalMarkets);
//     // console.log("totalMarket coins:", totalMarkets.length);
//   })
//   .catch((err) => {
//     console.error("error: ", err);
//   });

// // An Api for getching images and information about different breeds of dogs
// // Base url : https://api.thedogapi.com/v1
// // example:list all breeds:>> https://api.thedogapi.com/v1/breeds
// // serch for random dogs images: https://api.thedogapi.com/v1/images/seach
// [
//   {
//     id: "notcoin",
//     symbol: "not",
//     name: "Notcoin",
//     image:
//       "https://coin-images.coingecko.com/coins/images/33453/large/rFmThDiD_400x400.jpg?1701876350",
//     current_price: 0.00815144,
//     market_cap: 832003857,
//     market_cap_rank: 89,
//     fully_diluted_valuation: 832003857,
//     total_volume: 106658006,
//     high_24h: 0.00830897,
//     low_24h: 0.00802952,
//     price_change_24h: 7.81401e-7,
//     price_change_percentage_24h: 0.00959,
//     market_cap_change_24h: -3120128.458771825,
//     market_cap_change_percentage_24h: -0.37361,
//     circulating_supply: 102474423008.243,
//     total_supply: 102474423008.243,
//     max_supply: null,
//     ath: 0.02836145,
//     ath_change_percentage: -71.33442,
//     ath_date: "2024-06-02T18:00:38.587Z",
//     atl: 0.00461057,
//     atl_change_percentage: 76.33354,
//     atl_date: "2024-05-24T07:12:14.147Z",
//     roi: null,
//     last_updated: "2024-09-11T02:17:22.162Z"
//   }
// ];
// // totalMarket coins: 100

// /// *******************************************************

// // i have this type of documents then I want group them buy differentiating
// // the currect price for 0 to 0.5 and from 0.5 to 1 and from 1 to above,
// // then how can I do that? here I donot find the above data uisng database
// // and collection i find that from api then how can I acchive above
// // required data?

// //IF you find the data from api(instead of database) you can process data
// // directly in the application using javascript.

// // we can filter the docs basd on the current_page field into different
// // categories(e.g., 0-0.5, 0.5-1, and above 1)

// //STEPS TO PROCEED using JAVASCRIPT  ******************

// //    1. Fetch data from API.

// //    2. Group the data based on the "current_price" ranges.

// //    3. Store the grouped data in separate arrays for each price range.

// async function groupBitCoins() {
//   try {
//     //fetch coin data from api
//     const responce = await fetch(
//       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
//     );
//     const coinData = await responce.json();

//     return coinData;
//   } catch (Error) {
//     console.error("groupedCoins Error:", Error);
//   }
// }

// groupBitCoins()
//   .then((coin) => {
//     const groupBitCoins = {
//       "range 0 to 0.5": [],
//       "range 0.5 to 1": [],
//       "range above 1": []
//     };
//     coin.forEach((coinDoc) => {
//       if (coinDoc.current_price <= 0.5) {
//         groupBitCoins["range 0 to 0.5"].push({
//           id: coinDoc.id,
//           name: coinDoc.name,
//           currentPrice: coinDoc.current_price,
//           marketCapital: coinDoc.market_cap,
//           rank: coinDoc.market_cap_rank
//         });
//       } else if (coinDoc.current_price > 0.5 && coinDoc.current_price <= 1) {
//         groupBitCoins["range 0.5 to 1"].push({
//           id: coinDoc.id,
//           name: coinDoc.name,
//           currentPrice: coinDoc.current_price,
//           marketCapital: coinDoc.market_cap,
//           rank: coinDoc.market_cap_rank
//         });
//       } else if (coinDoc.current_price > 1) {
//         groupBitCoins["range above 1"].push({
//           id: coinDoc.id,
//           name: coinDoc.name,
//           currentPrice: coinDoc.current_price,
//           marketCapital: coinDoc.market_cap,
//           rank: coinDoc.market_cap_rank
//         });
//       }
//     });
//     // console.log(">>", groupBitCoins);
//     return groupBitCoins;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// // (async () => {
// //   const groupedCoins = await groupBitCoins();
// //   // console.log(">>>>", groupedCoins);
// // })();
// [
//   {
//     "range 0 to 0.5": [
//       {
//         id: "dogecoin",
//         name: "Dogecoin",
//         currentPrice: 0.101326,
//         marketCapital: 14738737885,
//         rank: 9
//       },
//       {
//         id: "tron",
//         name: "TRON",
//         currentPrice: 0.152779,
//         marketCapital: 13217001680,
//         rank: 11
//       },
//       `and more`
//     ],
//     "range 0.5 to 1": [
//       {
//         id: "ripple",
//         name: "XRP",
//         currentPrice: 0.534793,
//         marketCapital: 30049832065,
//         rank: 7
//       },
//       {
//         id: "first-digital-usd",
//         name: "First Digital USD",
//         currentPrice: 0.998454,
//         marketCapital: 2517268515,
//         rank: 37
//       }
//     ],
//     "range above 1": [
//       {
//         id: "bitcoin",
//         name: "Bitcoin",
//         currentPrice: 56905,
//         marketCapital: 1120557452025,
//         rank: 1
//       },
//       {
//         id: "ethereum",
//         name: "Ethereum",
//         currentPrice: 2354.43,
//         marketCapital: 282442704182,
//         rank: 2
//       }
//     ]
//   }
// ];

// // 1. JSONPlaceholder
// // A free fake online REST API for testing and prototyping.

// // Base URL: https://jsonplaceholder.typicode.com
// // Example Endpoints:
// // https://jsonplaceholder.typicode.com/posts (Get a list of posts)
// // https://jsonplaceholder.typicode.com/users (Get a list of users)
// // https://jsonplaceholder.typicode.com/comments (Get comments)

// // 2. Gender API
// // A free API for finding the gender of a person
// //Base url: "https://api.genderize.io?name=Ramesh"

// //Example end points:

// // "https://api.genderize.io?name=ravi"(give the Gender of ravi)

// // 3. CoinGecko API
// // A free API for cryptocurrency prices and market data.

// // Base URL: https://api.coingecko.com/api/v3
// // Example Endpoints:
// // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd (Get list of cryptocurrency markets)
// // https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd (Get Bitcoin price)

// // 4. The Dog API
// // An API for fetching images and information about different breeds of dogs.

// // Base URL: https://api.thedogapi.com/v1
// // Example Endpoints:
// // https://api.thedogapi.com/v1/breeds (List all breeds)
// // https://api.thedogapi.com/v1/images/search (Search for random dog images)

// // 5. The Cat API
// // Similar to The Dog API but for cat lovers.

// // Base URL: https://api.thecatapi.com/v1
// // Example Endpoints:
// // https://api.thecatapi.com/v1/images/search (Search for random cat images)
// // https://api.thecatapi.com/v1/breeds (List all cat breeds)
// // 6. REST Countries API
// // A free API for country data, including names, population, languages, and more.

// // Base URL: https://restcountries.com/v3.1
// // Example Endpoints:
// // https://restcountries.com/v3.1/all (List all countries)
// // https://restcountries.com/v3.1/name/{name} (Get a specific country by name)

// // 7. JokeAPI
// // A free API that provides programming jokes, general jokes, and more.

// // Base URL: https://v2.jokeapi.dev
// // Example Endpoints:
// // https://v2.jokeapi.dev/joke/Any (Get a random joke)
// // https://v2.jokeapi.dev/joke/Programming

// // 10. Public APIs Repository
// // If you want more APIs to explore and practice with, you can check this comprehensive list of public APIs:

// // URL: https://public-apis.xyz/
// // You can practice using these URLs with fetch, RxJS, or any other HTTP client like Axios.

// //using promise.all()
// async function UsingPromiseDtAll() {
//   try {
//     const response = await Promise.all([
//       fetch("https://jsonplaceholder.typicode.com/users"),
//       fetch("https://api.thedogapi.com/v1/breeds"),
//       fetch("https://v2.jokeapi.dev/joke/Programming")
//     ]);
//     //   **************************************************************
//     // const data = await response.json();//TypeError: response.json is not a function

//     // const data = await response.map((object) =>  object.json());// 1. which is wrong
//     //because we are not awaiting the .json() calls inside map function.
//     //map function will create a array of promises(as .json() itself is a promise),
//     // so we need to wait for those promises to be resolve before moving on

//     //correct code is           ****************************************
//     const [data1, data2, data3] = await Promise.all(
//       response.map((object) => object.json())
//     );

//     // console.log(">>>", data1, data2, data3);
//     return { data1, data2, data3 };
//   } catch (Error) {
//     console.error("promise.all Error:", Error);
//   }
// }

// UsingPromiseDtAll()
//   .then((data) => {
//     // console.log("111", data.data1);
//     // console.log("111", JSON.stringify(data.data1));
//     // console.log("111", JSON.stringify(data.data1, null, 2));
//     // console.log("222", data.data2);
//     console.log("333", data.data3);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // //HANDLE USING async/await
// // (async () => {
// //   const data = await UsingPromiseDtAll();
// //   console.log("hndle with async/await:", JSON.stringify(data, null, 2));
// // })();
// // hndle with async/await: {
// //   error: false,
// //   category: 'Programming',
// //   type: 'single',
// //   joke: 'Debugging: Removing the needles from the haystack.',
// //   flags: {
// //     nsfw: false,
// //     religious: false,
// //     political: false,
// //     racist: false,
// //     sexist: false,
// //     explicit: false
// //   },
// //   id: 40,
// //   safe: true,
// //   lang: 'en'
// // }
// //1.
// // >>> Promise { <pending> } Promise { <pending> } Promise { <pending> }
// // /// {
// //   data1: Promise { <pending> },
// //   data2: Promise { <pending> },
// //   data3: Promise { <pending> }
// // }

// //analysis:  **************************************
// // console.log("111", data.data1);
// //111
// [
//   {
//     id: 1,
//     name: "Leanne Graham",
//     username: "Bret",
//     email: "Sincere@april.biz",
//     address: {
//       street: "Kulas Light",
//       suite: "Apt. 556",
//       city: "Gwenborough",
//       zipcode: "92998-3874",
//       geo: [Object]
//     },
//     phone: "1-770-736-8031 x56442",
//     website: "hildegard.org",
//     company: {
//       name: "Romaguera-Crona",
//       catchPhrase: "Multi-layered client-server neural-net",
//       bs: "harness real-time e-markets"
//     }
//   },
//   "and more"
// ];
// // in that output why geo is showing [Object] not values or actual value?

// //1. The reason is when we LOG OBJECT LIKE data.data1, console.log() ONLY
// // prints a summary of deeply nestead objects to avoid clutter.

// // It shows [Object] as placeholder for objects nested inside other objects, like address.geo

// //TO SEE FULL CONTENT OF DEEPLY NESTED OBJECTS LIKE geo, we can use
// // 1. JSON.stringify() to prinst entire object
// // 2. Access and log the nested properties directly.

// // // 1. USING JSON.STRINGIFY()
// // console.log(JSON.stringify(data.data1));
// [
//   {
//     id: 1,
//     name: "Leanne Graham",
//     username: "Bret",
//     email: "Sincere@april.biz",
//     address: {
//       street: "Kulas Light",
//       suite: "Apt. 556",
//       city: "Gwenborough",
//       zipcode: "92998-3874",
//       geo: { lat: "-37.3159", lng: "81.1496" }
//     },
//     phone: "1-770-736-8031 x56442",
//     website: "hildegard.org",
//     company: {
//       name: "Romaguera-Crona",
//       catchPhrase: "Multi-layered client-server neural-net",
//       bs: "harness real-time e-markets"
//     }
//   },
//   {
//     id: 2,
//     name: "Ervin Howell",
//     username: "Antonette",
//     email: "Shanna@melissa.tv",
//     address: {
//       street: "Victor Plains",
//       suite: "Suite 879",
//       city: "Wisokyburgh",
//       zipcode: "90566-7771",
//       geo: { lat: "-43.9509", lng: "-34.4618" }
//     },
//     phone: "010-692-6593 x09125",
//     website: "anastasia.net",
//     company: {
//       name: "Deckow-Crist",
//       catchPhrase: "Proactive didactic contingency",
//       bs: "synergize scalable supply-chains"
//     }
//   }
// ];
// // TO GET MORE READBLE WAY

// // console.log("111", JSON.stringify(data.data1, null, 2));
// // //null ensures tha no filtering or properties happens
// // //2 adds a two-space indetaion to the ouput
// // //>> make code in JSON object human-readble

// // 2.
// // UsingPromiseDtAll()
// //   .then((data) => {
// //     data.data1.forEach((user) => {
// //       console.log(`Name: ${user.name}, Geo: ${JSON.stringify(user.address.geo)}`);
// //     });
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// // console.log("111", JSON.stringify(data.data1, null, 2));
// // 111
// [
//   {
//     id: 1,
//     name: "Leanne Graham",
//     username: "Bret",
//     email: "Sincere@april.biz",
//     address: {
//       street: "Kulas Light",
//       suite: "Apt. 556",
//       city: "Gwenborough",
//       zipcode: "92998-3874",
//       geo: {
//         lat: "-37.3159",
//         lng: "81.1496"
//       }
//     },
//     phone: "1-770-736-8031 x56442",
//     website: "hildegard.org",
//     company: {
//       name: "Romaguera-Crona",
//       catchPhrase: "Multi-layered client-server neural-net",
//       bs: "harness real-time e-markets"
//     }
//   },
//   {
//     id: 2,
//     name: "Ervin Howell",
//     username: "Antonette",
//     email: "Shanna@melissa.tv",
//     address: {
//       street: "Victor Plains",
//       suite: "Suite 879",
//       city: "Wisokyburgh",
//       zipcode: "90566-7771",
//       geo: {
//         lat: "-43.9509",
//         lng: "-34.4618"
//       }
//     },
//     phone: "010-692-6593 x09125",
//     website: "anastasia.net",
//     company: {
//       name: "Deckow-Crist",
//       catchPhrase: "Proactive didactic contingency",
//       bs: "synergize scalable supply-chains"
//     }
//   },
//   "and more"
// ];

// //SECOND API USERS API

// // console.log("222", data.data2);

// ///222
// [
//   {
//     weight: { imperial: "7 - 15", metric: "3 - 7" },
//     height: { imperial: "13 - 15", metric: "33 - 38" },
//     id: 138,
//     name: "Italian Greyhound",
//     bred_for: "Lapdog",
//     breed_group: "Toy",
//     life_span: "12 - 15 years",
//     temperament:
//       "Mischievous, Affectionate, Agile, Athletic, Companionable, Intelligent",
//     reference_image_id: "SJAnzg9NX"
//   },
//   {
//     weight: { imperial: "4 - 9", metric: "2 - 4" },
//     height: { imperial: "8 - 11", metric: "20 - 28" },
//     id: 140,
//     name: "Japanese Chin",
//     bred_for: "Lapdog",
//     breed_group: "Toy",
//     life_span: "12 - 14 years",
//     temperament: "Alert, Loyal, Independent, Intelligent, Loving, Cat-like",
//     reference_image_id: "r1H6feqEm"
//   },
//   {
//     weight: { imperial: "15 - 19", metric: "7 - 9" },
//     height: { imperial: "12 - 15", metric: "30 - 38" },
//     id: 141,
//     name: "Japanese Spitz",
//     bred_for: "Companion",
//     life_span: "10 – 16 years",
//     temperament:
//       "Affectionate, Obedient, Playful, Companionable, Intelligent, Proud",
//     reference_image_id: "HksaMxqNX"
//   },
//   "... 72 more items"
// ];
// //it was print directly without any [Object] like this objects inside the
// //document because in these docs there is no inner objects, and Hence
// // no use of JSON.stringify();

// //THIRD API i.e for JOKE API

// // console.log("333", data.data3);

// // 333
// [
//   {
//     error: false,
//     category: "Programming",
//     type: "single",
//     joke: "Java is like Alzheimer's, it starts off slow, but eventually, your memory is gone.",
//     flags: {
//       nsfw: false,
//       religious: false,
//       political: false,
//       racist: false,
//       sexist: false,
//       explicit: false
//     },
//     id: 27,
//     safe: false,
//     lang: "en"
//   }
// ];

//      ****************************************************************************

// //USING Promise.allSettled()
//

// async function UsingPromiseDtallSettld() {
//   try {
//     const response = await Promise.allSettled([
//       fetch("https://jsonplaceholder.typicode.com/users"),
//       fetch("https://api.thecatapi.com/v1/images"),
//       fetch("https://api.themoviedb.org/3/movie/popular?api_key=KEY"),
//       fetch("https://restcountries.com/v3.1/all")
//     ]);
//     // console.log("11", response);
//     // in the above promises one of the api is rejected because of incorrected
//     // api so to get the data on rejected promise is not possible hence
//     //Promise.allSettled()  CANNOT BE USED.

//     // to get the desired data even any one of the api gets rejected we
//     // need to avoid rejected promises and handle only fullfilled or pending promises

//     //avoid rejected Promises
//     // console.log(">>>", response.status); //>>> undefined

//     const fulfilledPr = response.filter(
//       (object) => object.status === "fulfilled"
//     );
//     // console.log("///", fulfilledPr);
//     if (fulfilledPr.length === 0) {
//       return "Invalid or failed API requests.";
//     }
//     // const data = await Promise.all(
//     //   fulfilledPr.map((object) => {
//     //     // console.log("ddd", object); // for this output is {status:"fulfilled", value:Response{.....}}
//     //     //hence we need to apply json() method on response not on entire object.

//     //     return object.value.json();
//     //   })
//     // );
//     // Extract the .json() from each fulfilled promise's value (which is the Response object)
//     const data = await Promise.all(
//       fulfilledPr.map((object) => object.value.json()) // Access the Response object via `object.value`
//     );
//     console.log("22", data);

//     return data;
//   } catch (Error) {
//     console.error("Promise.allSettled Error:", Error);
//   }
// }

// (async () => {
//   const data = await UsingPromiseDtallSettld();
//   console.log("//>>", data);
// })();
// //console:

// // Promise.allSettled Error: SyntaxError: Unexpected token A in JSON at position 0
// //     at JSON.parse (<anonymous>)
// //     at parseJSONFromBytes (node:internal/deps/undici/undici:6662:19)
// //     at successSteps (node:internal/deps/undici/undici:6636:27)
// //     at node:internal/deps/undici/undici:1236:60
// //     at node:internal/process/task_queues:140:7
// //     at AsyncResource.runInAsyncScope (node:async_hooks:203:9)
// //     at AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
// //     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
// // //>> undefined

// //  ****************************************
// the reason for this error is, one of the api is likely returning an invalid or
//  non-JSON response, and this is casuing the issue when attempting to access
//  the json() method on teh response object

// Eventhogh filtering and logic was correctly return one of the fullfilled
//  promise response is giving error respnse in a format other than JSON
//  (e.g., HTML or plain text)
//  *******************************
// when you call response.json() on such a response, it WILL THROW ERROR

//SOLUTION :        *********************************

//CHECK THE Content-Type Header  of each fulfilled response before parsing
// the response body as JSON

//HANDLE NON-JSON Responses(e.g., API error respnses that return HTML)

//

async function UsingPromiseDtallSettld() {
  try {
    const response = await Promise.allSettled([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://api.thecatapi.com/v1/images"),
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=KEY"),
      fetch("https://restcountries.com/v3.1/all")
    ]);
    const fulfilledPr = response.filter(
      (object) => object.status === "fulfilled"
    );
    // console.log("///", fulfilledPr);
    if (fulfilledPr.length === 0) {
      return "Invalid or failed API requests.";
    }
    const data = await Promise.all(
      fulfilledPr.map((object) => {
        // Process each fulfilled response and check its content type before attempting to parse it as JSON
        // console.log("dddd", object);
        // console.log("dd>>", JSON.stringify(object));

        const headers = object.value.headers;

        // log all headers
        // for (const [key, value] of headers.entries()) {
        //   console.log("headers: ", `${key}: ${value}`);
        // }

        const contentType = object.value.headers.get("content-type");
        // console.log("ccc", contentType);

        //check if the content is JSON before parsing
        if (contentType && contentType.includes("application/json")) {
          return object.value.json(); // Access the Response object via `object.value`
        } else {
          // console.warn("Non-JSON response detected.");
          return "Non-JOSN response";
        }
      })
    );
    // console.log("22", JSON.stringify(data, null, 2));

    const dataReturn = JSON.stringify(data, null, 2);

    return dataReturn;
  } catch (Error) {
    console.error("Promise.allSettled Error:", Error);
  }
}

(async () => {
  const data = await UsingPromiseDtallSettld();
  // console.log("//>>", data);
})();

//
// console.log("headers: ", `${key}: ${value}`);
//
// headers:  access-control-allow-credentials: true
// headers:  age: 1029
// headers:  alt-svc: h3=":443"; ma=86400
// headers:  cache-control: max-age=43200
// headers:  cf-cache-status: HIT
// headers:  cf-ray: 8c1e7dfe884cb95a-AMS
// headers:  connection: keep-alive
// headers:  content-encoding: gzip
// headers:  content-type: application/json; charset=utf-8 >>!!!!!!!!!!!!!!!!!!!!!!!

// headers:  date: Thu, 12 Sep 2024 08:22:51 GMT
// headers:  etag: W/"160d-1eMSsxeJRfnVLRBmYJSbCiJZ1qQ"
// headers:  expires: -1
// headers:  nel: {"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}
// headers:  pragma: no-cache
// headers:  report-to: {"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1724342623&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=Mj%2BXmlyaPqMt63CkwKgzIAIJPqaSaP3eKTMBzRXfe%2Bk%3D"}]}
// headers:  reporting-endpoints: heroku-nel=https://nel.heroku.com/reports?ts=1724342623&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=Mj%2BXmlyaPqMt63CkwKgzIAIJPqaSaP3eKTMBzRXfe%2Bk%3D
// headers:  server: cloudflare
// headers:  transfer-encoding: chunked
// headers:  vary: Origin, Accept-Encoding
// headers:  via: 1.1 vegur
// headers:  x-content-type-options: nosniff
// headers:  x-powered-by: Express
// headers:  x-ratelimit-limit: 1000
// headers:  x-ratelimit-remaining: 999
// headers:  x-ratelimit-reset: 1724342662

// headers:  content-length: 81

// headers:  content-type: text/plain; charset=utf-8  >>>>>>>>>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// headers:  date: Thu, 12 Sep 2024 08:22:52 GMT
// headers:  server: Google Frontend
// headers:  x-cloud-trace-context: 41a27d937bfd1043fc0966141b1ee476

// headers:  cache-control: public, immutable, max-age=31556926
// headers:  connection: keep-alive
// headers:  content-encoding: gzip
// headers:  content-length: 171178
// headers:  content-type: application/json                 >>>>>>>>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// headers:  date: Thu, 12 Sep 2024 08:22:52 GMT
// headers:  server: nginx/1.22.1

//

//

// fetch("https://api.thedsogapi.com/v1/images/search")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error("err: ", err);
//   });
// // err:  TypeError: fetch failed
// //     at Object.fetch (node:internal/deps/undici/undici:11576:11)
// //     at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
// //   cause: Error: getaddrinfo ENOTFOUND api.thedsogapi.com
// //       at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:108:26) {
// //     errno: -3008,
// //     code: 'ENOTFOUND',
// //     syscall: 'getaddrinfo',
// //     hostname: 'api.thedsogapi.com'
// //   }
// // }

// if output of promise is rejected then we cannot handle for required data
// so the output of fetch is either pending promise response or fullfilled
// rejected promises cannot be handled is that correct or not?

// Corrected Understanding:         **************************
// Rejected promises can be handled via the .catch() block.
// The output of fetch() can be pending, fulfilled, or rejected, and both
// fulfilled and rejected promises are handleable.
// You can handle errors in rejected promises and take necessary actions
// (like logging, retries, etc.).

// Conclusion:
// Rejected promises can be handled, and your .catch() block is the correct
// way to manage them.

// but to get the desired data the promise should be fullfilled right? on
// that only we can able to handle using then()catch block there only we will
//  right the logic right?

// Yes, you're correct! To handle and access the desired data from a
// promise, the promise must first be fulfilled (successfully resolved).

// 1. Fulfilled Promise:
// When a promise is fullfilled,i.e if operation (like fetch()) is successfull
// and the data is available
// You can handle the fullfilled promise in the .then() block. with the
// availble data we can write the required logic to get desired output.

// 2. Rejected Promise:
// If something goes wrong(e.g. network error or a failed API request), the
// promise is rejected. and the error passed to the .catch() block

// We can handle the error in catch block, BUT WE DONT HAVE THE ACCESS TO
// THE DESIRES DATA beause operation is failed.
/*
async function generalFetch() {
  const response = await Promise.allSettled([
    fetch("https://api.thedogapi.com/v1/breeds"),
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
    fetch("https://jsonplaceholder.typicode.com/comments"),
    fetch("https://v2.jokeapi.dev/joke/Any"),
    fetch("https://api.thecatapi.com/v1/images/search")
  ]);
  // console.log("RR", response);
  const data = await Promise.all(response.map((obj) => obj.value.json()));
  // console.log(data);
  return data;
}
// generalFetch()
//   .then((data) => {
//     console.log(JSON.stringify(data, null, 2));
//   })
//   .catch((Err) => {
//     console.log(Err);
//   });

//using PROMISE.race();

async function UsingPromiseDtRace() {
  try {
    const response = await Promise.race([
      fetch("https://api.thedogapi.com/v1/breeds"),
      fetch("https://jsonplaceholder.typicode.com/users"),
      // fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://v2.jokeapi.dev/joke/Any"),
      fetch("https://api.thecatapi.com/v1/images/search")
      // fetch("https://jsonplaceholder.typicode.com/comments")
    ]);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (Error) {
    console.error("Promise.race() Error:", Error);
  }
}
(async () => {
  const data = await UsingPromiseDtRace();
  // console.log(">>", data);
})();

const PromiseDtRace = async () => {
  try {
    const response = await Promise.race([
      fetch("https://api.thedogapi.com/v1/breeds"),
      // fetch("https://jsonplaceholder.typicode.com/usersas"),
      // fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://v2.jokeapi.dev/joke/Any"),
      fetch("https://api.thecatapi.com/v1/images/search")
      // fetch("https://jsonplaceholder.typicode.com/comments")
    ]);
    const data = await response.json();
    return data;
  } catch (Error) {
    console.error("Promise.race() Error:", Error);
  }
};

console.log("11", PromiseDtRace());

console.log("22", typeof PromiseDtRace);
console.log("33", typeof PromiseDtRace());

PromiseDtRace()
  .then((data) => {
    // console.log("!!!", data);
  })
  .catch((err) => {
    console.log(err);
  });

//WORKING WITH BLUEBIRD:

// import Bluebird, { map } from "bluebird";

// //1. Basic use of bluebird:
// const delay = (ms) => new Bluebird((resolve) => setTimeout(resolve, ms));

// //Exmple of using Bluebird for asynchronous delays:
// delay(4000).then(() => {
//   console.log("Executed after 4 seconds.");
// });

// //2. Parallel API Requests with Bluebird.map

// //Fetch multiple URLs in parallel:

// map(
//   [
//     fetch("https://v2.jokeapi.dev/joke/Any"),
//     fetch("https://api.thecatapi.com/v1/images/search"),
//     fetch("https://jsonplaceholder.typicode.com/users")
//   ],
//   async (apiCall) => {
//     const response = await apiCall;
//     return response.json();
//   }
// ).then((results) => {
//   console.log(results.headers);
//   console.log("Data from APIs:", JSON.stringify(results, null, 2));
// });

// I have a question that  i have 4 apis which have a same
// value, if i hit any one of the api then the value of that api has to give then how can i implement that question
const apis = [
  "https://v2.jokeapi.dev/joke/Any",
  "https://api.thecatapi.com/v1/images/search",
  "https://jsonplaceholder.typicode.com/users"
];
// To implement this scenario where you have 4 APIs that return the same value
// you can follow a strategy that involves:

// 1.Randomly picking one of the apis to call
// 2.Using the result from the first successful api call
// 3. Handling cases where an api FileSystemWritableFileStream(e.g., using a fallback)

async function multipleApisReturnSameValue(apis) {
  try {
    const response = await Promise.race(apis.map((api) => fetch(api)));
    // console.log(response);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch from api.`);
    }
    const data = await response.json();
    console.log(data);
  } catch (Error) {
    console.error(Error);
  }
}
// multipleApisReturnSameValue(apis);

//we can also achive this by using promise.any()

async function multipleApisReturnSameValueusingPrdtAny(apis) {
  try {
    const response = apis.map((api) =>
      fetch(api).then((response) => {
        console.log(">>", response);
        if (!response.ok) {
          throw new Error(`API call failed at ${api}`);
        }
        return response.json();
      })
    );
    const data = await Promise.any(response);
    console.log("dddd", data);
  } catch (Error) {
    console.error(Error);
  }
}
multipleApisReturnSameValueusingPrdtAny(apis);
*/
const apiQn = new Map([
  [[200, 201, 204], "success Codes"],
  [[400, 405, 500, 505], "erros status codes"],
  ["codes", "codes for reponse"],
  ["name", "ramesh"]
]);
console.log(apiQn);
// Map(4) {
//   [ 200, 201, 204 ] => 'success Codes',
//   [ 400, 405, 500, 505 ] => 'erros status codes',
//   'codes' => 'codes for reponse',
//   'name' => "ramesh"
// }

console.log(apiQn.get("codes"));
console.log(">>", apiQn.get([200, 201, 204]));

// for (const [key, value] of apiQn) {
//   // console.log(key, value);
//   console.log(apiQn.get(key));
// }
// for (const keys of apiQn.keys()) {
//   console.log(keys, apiQn.get(keys));
// }

const obj = {
  name: "Ramesh",
  age: 27,
  school: "Zphs"
};
// for (const keys of Object.keys(obj)) {
//   console.log(keys);
// }
console.log(apiQn.get(200));
function getValue(keys) {
  // const
  let reqKey;
  apiQn.forEach((value, key) => {
    if (Array.isArray(key) && key.includes(keys)) {
      reqKey = key;
    }
  });
  return apiQn.get(reqKey);
}
console.log(getValue(200));
console.log(getValue(400));
