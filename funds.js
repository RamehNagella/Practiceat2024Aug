console.log(typeof null);
console.log(2037 - 1998);
//object
//39

let a = 10;
console.log(a);
a += 5;
console.log(a);

// 10
// 15

console.log(a++); //post increment (it increases the value but shold not add to at the same time)
console.log(a); //16
console.log(++a); //pre increament
//15
//17

const arr = [1, 2, 3, 4];
const displayArrwithIndex = arr.map((el, i, arr) => `${i}:${el}`);
console.log(displayArrwithIndex);
// [ '0:1', '1:2', '2:3', '3:4' ]

arr.map((el, i) => {
  console.log(`${i}:${el}`);
});
// 0:1
// 1:2
// 2:3
// 3:4
const b = 18;
console.log(b);
console.log(typeof b);
console.log(Number(b));
console.log(String(b));

console.log(b.toString());
console.log(b.toString(2));
console.log(b.toString(3));
console.log(b.toString(8));
console.log(b.toString(16));

console.log(b.toFixed(3));
// 18  >>>>> it is a number
// number
// 18
// 18 >>>>>> it is a number
// 18 >>>>>>it is a string
// 10010 >>>> in binary format
// 200  >>> in 4-2-1 bcd code format
// 22  >>>> in octal format
// 12  >>>>> in hexa decimal format
// 18.000

console.log("12" - "10" + 1);
console.log("12" + "10" + 1);
console.log(12 + "10" + 1);
console.log(12 - "10" + 1);
console.log(12 + 10 + 1);
// 3
// 12101
// 12101
// 3
// 23

let age = 19;
console.log(` I would like to drink a ${age >= 18 ? "wine" : "water"}`);
//
// I would like to drink a wine

// Array Sum

function arrSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[0];
  }
  return sum;
}
console.log(arr); //[1,2,3,4]

console.log(arr.reduce((acc, el) => acc + el, 0));

//calculate these numbers sum :1,2,3,4,5,6,7
function numSum(...num) {
  return num.reduce((acc, cur) => cur + acc, 0);
}
console.log(numSum(1, 2, 3, 4, 5, 6)); //21

//2.
const arr1 = ["a", "b", "c", "d"];
//print index and el using map() function

console.log(arr1.map((el, i, arr) => `${i}: ${el}`));
// [ '0: a', '1: b', '2: c', '3: d' ]

//regular function

const calcAge = function (birthYear) {
  return 2037 - birthYear;
};
console.log(calcAge(1998));

const calcAgeArr = (birthYear) => 2037 - birthYear;
console.log(calcAgeArr(1996));
//39
//41

const jonas = {
  birthYear: 1991,
  calcAge: function () {
    console.log("this>>>", this);
    return 2037 - this.birthYear;
  }
};
console.log(jonas.calcAge());
// this>>> { birthYear: 1991, calcAge: [Function: calcAge] }
// 46

//  copying jonas object key-value pairs
const matilda = {
  birthYear: 1999
};
console.log(matilda); //{ birthYear: 1999 }
matilda.calcAge = jonas.calcAge;

console.log(matilda);
console.log(matilda.calcAge());
// { birthYear: 1999, calcAge: [Function: calcAge] }
// this>>> { birthYear: 1999, calcAge: [Function: calcAge] }
//38

//HOISTING

console.log(name1);
// console.log(job);
// console.log(year);
// undefined
// console.log(job);
// ReferenceError: Cannot access 'job' before initialization
// console.log(year);
// ReferenceError: Cannot access 'year' before initialization
var name1 = "jonas";
let job = "teacher";
const year = 1998;

// hoisting on function

console.log(hoistFnDecl());
// console.log(hoistFnExpr());
// console.log(hoistArrFn());
//with function decleration hoisting can be possible
// console.log(hoistFnExpr());
// ReferenceError: Cannot access 'hoistFnExpr
// console.log(hoistArrFn());
// ReferenceError: Cannot access 'hoistArrFn' before initialization

function hoistFnDecl() {
  return "with function decleration hoisting can be possible";
}

const hoistFnExpr = function () {
  return "with function expression hoisting cannot be possible";
};

const hoistArrFn = () => "with arrow function function hoisting not possible";

// using VAR on function expression

// console.log(hoistFnExprwithVar());
// TypeError: hoistFnExprwithVar is not a function

var hoistFnExprwithVar = function () {
  return " function expression defined with var to check hoist";
};

var x = 1;

// console.log(x === window.x);
// ReferenceError: Window is not defined
// In JavaScript, the Window object represents the global window in a browser environment. The global object in a browser environment is typically the window object.
// When you declare a variable without explicitly specifying its scope using var, it becomes a property of the global object.
// The console.log(x === Window.x); statement is checking whether the value of x is equal to the value of x attached to the Window object

console.log(typeof NaN); //number
console.log(null);
console.log(typeof null);

// console.log(Null);
console.log(typeof Null);
// null;
// object;
// ReferenceError: Null is not defined
//undefined

// SWITCH STATEMENT
//SWITCH STATMENT
let day;
switch (day) {
  case "Monday":
    console.log("this is monday");
    break;
  case "Tuesday":
    console.log("this is tuesday");
    break;
  case "Wednesday":
    console.log("this is wed day");
    break;
  case "friday":
    console.log("this is friday");
    break;
  default:
    console.log("Not a valid day");
}

// console.log(switch(day)); //SyntaxError: Unexpected token 'switch'
day = "Monday";
// day = "Friday";

const date = Date.now();
console.log(Date.now());
console.log(new Date(Date.now()));
console.log(new Date(Date.now()).toISOString());
console.log(new Date(Date.now()).toDateString());
console.log(new Date(Date.now()).toJSON());
// 1707587095509
// 2024-02-10T17:44:55.509Z
// 2024-02-10T17:44:55.509Z
// Sat Feb 10 2024
// 2024-02-10T17:44:55.510Z

// console.log(Date.now().toDateString()); //>>>>>>>>>TypeError: Date.now(...).toDateString is not a function
console.log(new Date(Date.now()).toLocaleDateString());
console.log(new Date(Date.now()).toLocaleString());
console.log(new Date(Date.now()).toLocaleTimeString());
// 2/10/2024
// 2/10/2024, 11:20:35 PM
// 11:22:21 PM
console.log(new Date(Date.now()).toLocaleDateString());
console.log(new Date(Date.now()).getFullYear());
console.log(new Date(Date.now()).getMonth());
console.log(new Date(Date.now()).getDate());
console.log(new Date(Date.now()).getDay());

console.log(new Date(Date.now()).getHours());
console.log(new Date(Date.now()).getMinutes());

// 2/11/2024
// 2024
// 1           >>>>>>>>> months are 0 base indexes
// 11
// 0            >>>>>>> days count start from 0 to 6 (s,m,t,w,th,f,s)
// 8
// 49

const jons = ["Jonas", "Schmedthmann", 2037 - 1996, ["mike", "peter"]];
console.log(jons); //[ 'Jonas', 'Schmedthmann', 41, [ 'mike', 'peter' ] ]

//print jons array has which type of elements in it

for (let i = 0; i <= jons.length - 1; i++) {
  console.log(`${jons[i]} : ${typeof jons[i]}`);
}
// Jonas : string
// Schmedthmann : string
// 41 : number
// mike,peter : object
jons.map((el) => {
  console.log(el, ":", typeof el);
});
// Jonas : string
// Schmedthmann : string
// 41 : number
// [ 'mike', 'peter' ] : object

//print the elements which are only strings

const Strings = jons.filter((el) => typeof el === "String");
console.log(Strings);
// []

const calcTip = (bill) => {
  return bill >= 50 && bill <= 75
    ? bill * 0.15
    : bill > 75 && bill <= 90
    ? bill * 0.1
    : bill * 0.75;
};

const billsArray = [25, 50, 70, 76, 80, 91, 73, 95];

//calculate tip for each billed amount in the array
const tipsArr = billsArray.map((el) => calcTip(el).toFixed(2));
console.log(tipsArr);
const sumOfTips = tipsArr.reduce((acc, cur) => {
  // console.log(typeof acc, typeof cur);
  console.log(">>", acc + cur);
  return acc + cur;
}, 0);
// number string
// string string
// string string
// string string
// string string
// string string
// string string
// string string

// >> 018.75
// >> 018.757.50
// >> 018.757.5010.50
// >> 018.757.5010.507.60
// >> 018.757.5010.507.608.00
// >> 018.757.5010.507.608.0068.25
// >> 018.757.5010.507.608.0068.2510.95
// >> 018.757.5010.507.608.0068.2510.9571.25
// 018.757.5010.507.608.0068.2510.9571.25

// The reduce method in javascript perfomce type coercion when summing up values if the values are of strings if
// and only if the values are fractions.
// So whenever dealing with strings that represents the fractions(ex.,"0.15") using "PARSEFLOAT(parseFloat())" is necessary toString
// to ensure that the values are treated as numbers rather than concatenated strings.
console.log(sumOfTips); //018.757.5010.507.608.0068.2510.9571.25

console.log(billsArray.reduce((acc, el) => acc + el, 0)); //560

console.log(tipsArr.reduce((acc, cur) => acc + parseFloat(cur), 0));
//202.79999999999998

console.log(tipsArr.map((el, i, arr) => el + arr[i]));
console.log(tipsArr.map((el, i, arr) => parseFloat(el) + arr[i]));
console.log(tipsArr.map((el, i, arr) => parseFloat(el) + parseFloat(arr[i])));

// [
//   '18.7518.75',
//   '7.507.50',
//   '10.5010.50',
//   '7.607.60',
//   '8.008.00',
//   '68.2568.25',
//   '10.9510.95',
//   '71.2571.25'
// ]
// [
//   '18.7518.75',
//   '7.57.50',
//   '10.510.50',
//   '7.67.60',
//   '88.00',
//   '68.2568.25',
//   '10.9510.95',
//   '71.2571.25'
// ]
// [
//   37.5,    15,    21,
//   15.2,    16, 136.5,
//   21.9, 142.5
// ]

//WHICH MEANS

// WHENEVER WE ARE WORKING WITH SOME OPERATION ON FRACTION NUMBERS IT IS BETTER TO CONVERT THE FRACTION WITH PARSEFLOAT

console.log(parseFloat(17.32));
console.log(17.32);

console.log(typeof 17.32);
console.log(typeof parseFloat(17.32));
// 17.32
// 17.32
// number
// number
console.log(17.32 + 12.12);
console.log("13.13" + "12.12");

// 29.439999999999998
// 13.1312.12
console.log("13.13" + 12.12);
console.log(13.13 + "12.12");
// 13.1312.12
// 13.1312.12

console.log(17.32 + parseFloat("12.12"));
console.log("17.32" + parseFloat("12.12"));

console.log(parseFloat("17.32") + 17.32);
console.log(parseFloat("17.32") + "17.32");

console.log(parseFloat("17.32") + parseFloat("12.12"));
console.log(typeof (parseFloat("17.32") + parseFloat("12.12")));
// 29.439999999999998 >>number
// 17.3212.12         >> string

// 34.64              >> number
// 17.3217.32         >> string

// 29.439999999999998
//number

console.log(parseInt(13.13)); //13
console.log(parseInt(13.99));
console.log(parseInt(12.9999999999));
// 13
// 13
// 12

console.log(parseFloat(13.13));
console.log(parseFloat(13.99));
// 13.13
// 13.99

//to find prime numbers write a programme

function isPrime(num) {
  if (num <= 1) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
console.log(isPrime(2));
console.log(isPrime(4));
console.log(isPrime(1));
console.log(isPrime(25));
console.log(isPrime(29));
// true
// false
// false
// false
// true
const findPrimeNum = [1, 2, 3, 4, 5, 12, 13, 15, 23, 24, 45, 53, 99];
const primeNUms = findPrimeNum.filter((el) => {
  for (let i = 2; i <= Math.sqrt(el); i++) {
    if (el % i === 0) return false;
  }
  return true;
});
console.log(primeNUms);
//[
//   1,  2,  3, 5,
//  13, 23, 53
// ]
// eg. let el= 13
console.log(Math.sqrt(13)); //3.60;
// i= 2>> el%i---> > 13%2 != 0 hence if any number is not devisible by 2 and 4 then it is a prime number

// let el = 53;
console.log(Math.sqrt(53)); //7.280109889280518
// i = 2;  53%2 != 0;
// i = 3;  53%3 !=0;
// i = 4;  53%4 !=0;
// i = 5;
// i = 6;
// i = 7;

console.log(53 % 2); //1
// let el = 25;  sqrt(25)=5
// let i = 2  25%2 =1;
//     i = 3  25%3 = 1;
//     i = 4  25%4 = 1;
//     i = 5  25%5 = 0;
//hence 25 is not a prime;

//convert temperature from Celsius to Fahrenheit;
const tempArr = [18, 20, 23, 24, 30, 35, 37];
console.log(tempArr.map((el) => el + 273));
// [291, 293, 296, 297, 303, 308, 310]

//

//for of loop

for (const temp of tempArr) {
  console.log(temp);
}

// 18
// 20
// 23
// 24
// 30
// 35
// 37
console.log(...tempArr); //18 20 23 24 30 35 37

// print the array elements with thier index
for (const temp of tempArr.entries()) {
  console.log(temp);
  // console.log(temp[0]);//>>>>>> index values will print
  // console.log(temp[1]); // >>>>> elements will print
  // console.log(temp[2]);
}
// // [ 0, 18 ]
// // [ 1, 20 ]
// // [ 2, 23 ]
// // [ 3, 24 ]
// // [ 4, 30 ]
// // [ 5, 35 ]
// // [ 6, 37 ]

// 1
// 2
// 3
// 4
// 5
// 6

// 18
// 20
// 23
// 24
// 30
// 35
// 37

// undefined
// undefined
// undefined
// undefined
// undefined
// undefined
// undefined

//print only array elements without their indexes

for (const temp of tempArr.values()) {
  console.log(temp);
}
// 18
// 20
// 23
// 24
// 30
// 35
// 37

//print only indexes
for (const temp of tempArr.keys()) {
  console.log(temp);
}
// 0
// 1
// 2
// 3
// 4
// 5
// 6

//LOOPING THE OPBJCTS

const object1 = {
  key1: Number,
  key2: String,
  key3: Boolean,
  key4: [1, 2, 3, 4],
  method: function () {
    return true;
  },
  innerObject: {
    name: "Jonas",
    birthYear: 1996,
    hasDriversLicence: true,
    calcAge: function () {
      return 2037 - this.birthYear;
    },
    friends: ["Mike", "Max", "John"]
  }
};
// looping object with
//FOR loop
for (let i = 0; i <= object1.length - 1; i++) {
  console.log(object[i]);
}
console.log(object1.length); // undefined
// HENCE  WITH FOR looop  WE CANNOT LOOP THE OBJECTS

//"FOR OF" LOOP
// for (const itme of object1.entries()) {
//   console.log(itme);
// }
// // TypeError: object1.entries is not a function or its return value is not iterable

for (const [i, el] of Object.entries(object1)) {
  console.log(`${i}: ${el}`);
}
// key1: function Number() { [native code] }
// key2: function String() { [native code] }
// key3: function Boolean() { [native code] }
// key4: 1,2,3,4
// method: function () {
//     return true;
//   }
// innerObject: [object Object]

for (const [i, el] of Object.entries(object1.innerObject)) {
  console.log(`${i}: ${el}`);
}
// name: Jonas
// birthYear: 1996
// hasDriversLicence: true
// calcAge: function () {
//       return 2037 - this.birthYear;
//     }
// friends: Mike,Max,John

for (const key of Object.keys(object1)) {
  console.log(key);
}
// key1
// key2
// key3
// key4
// method
// innerObject
for (const value of Object.values(object1)) {
  // console.log(value);
}
// [Function: Number]
// [Function: String]
// [Function: Boolean]
// [ 1, 2, 3, 4 ]
// [Function: method]
// {
//   name: 'Jonas',
//   birthYear: 1996,
//   hasDriversLicence: true,
//   calcAge: [Function: calcAge],
//   friends: [ 'Mike', 'Max', 'John' ]
// }

//APPLICATION OF FOR OF LOOP

const timings = {
  thursday: {
    open: 19,
    close: 23
  },
  friday: {
    open: 20,
    close: "23:59"
  },
  saterday: {
    open: 19,
    close: "23:59"
  }
};
//display the timings in the digital board on each day the restaurant will open

for (const [day, { open, close }] of Object.entries(timings)) {
  console.log(
    `The restaurant will open on ${day} at ${open}pm and closes at ${close}pm`
  );
}
// The restaurant will open on thursday at 19pm and closes at 23pm
// The restaurant will open on friday at 20pm and closes at 23:59pm
// The restaurant will open on saterday at 19pm and closes at 23:59pm

//STRINGS

const airLine = "Tap Air Portugal";
const plane = "A320";

// finding length of the strings
// console.log(airLine.length());//TypeError: airLine.length is not a function
console.log(airLine.length);
console.log(plane.length);
// 16  >>>>>>>>>>>>>. which includes spaces also
// 4

// console.log(airLine(0)); //TypeError: airLine is not a function
console.log(airLine[0]); //T
console.log(plane[2]); //2
console.log(airLine[5]); //i

//find the letter index present in the string (i.e letter place present in the string)

console.log(airLine.indexOf(0)); //-1 >>>>>>> because 0 NOT PRESENT IN THE STRING

// console.log(airLine.indexOf(T)); //ReferenceError: T is not defined
console.log(airLine.indexOf("T")); //0
console.log(airLine.indexOf("Air")); //4
console.log(airLine.indexOf("a")); //1  >>>>>>> first find letter seaching from left to right
console.log(airLine.indexOf(" ")); //3  >>>>>>> first find space seaching from left to right

console.log(plane.indexOf(0)); //3
console.log(plane.indexOf(4)); //-1

// To get last position letter index use lastIndexOf

console.log(airLine.lastIndexOf("a")); //14
console.log(airLine.lastIndexOf("t")); //11
console.log(airLine.lastIndexOf(" ")); //7

console.log(airLine.indexOf("Air")); //4
console.log(airLine.indexOf("Portugal")); //8

console.log(plane.indexOf("20")); //2

//INDEXES ARE 0 BASE

//USE CASE OF indexOf()

console.log(airLine.slice("Air")); //Tap Air Portugal

console.log(airLine.slice(airLine.indexOf("Air"))); //Air Portugal
//To slice(copy)the some part of the string for other use we use ""slice()"" method
//slice method need the index position of the string or letter to slice so to find the index position we  use indexof()

console.log(airLine.slice(8)); //Portugal
//if we dont know the position of the Portugal then we can use indexOf() likethis below
console.log(airLine.slice(airLine.indexOf("Portugal"))); //Portugal

// console.log(airLine.slice("Air"));
// console.log(airLine.slice(" "));
// console.log(plane.slice("3"));
// console.log(plane.slice("320"));
// // Tap Air Portugal
// // Tap Air Portugal
// // 0
// //
// the slice() method will take numbers as its input will not take strings to slice
console.log(airLine.slice(4));
console.log(airLine.slice(2));
console.log(airLine.slice(8));

console.log(plane.slice(2));
console.log(plane.slice(1));
// p Air Portugal
// Portugal
// 20
// 320

//to slice some part of the strings we have to enter starting position of the letter ans ending position of the letter

console.log(airLine.slice(4, 8));
console.log(airLine.slice(airLine.indexOf("Air"), airLine.indexOf("Portugal")));
// Air
// Air

//THE LENGTH OF THE EXTRACTED STRING WILL ALWAYS EQUAL TO " endValue - beginValue"
console.log(airLine.slice(-1));
console.log(airLine.slice(-4));
console.log(airLine.slice(-8));
// l
// ugal
// Portugal

// find the booked seat is window seat or not
function findWindowSeat(seatNum) {
  const lastLetter = seatNum.slice(-1);
  return lastLetter === "W"
    ? "hey you got Window seat"
    : "You got middle seats";
}
console.log(findWindowSeat("A321W"));
console.log(findWindowSeat("A123M"));
// hey you got Window seat
// You got middle seats

//capitalization
const capitalizeName = "ramEsHNagelLa";

console.log(
  capitalizeName[0].toUpperCase() + capitalizeName.slice(1).toLowerCase()
);
// Rameshnagella

const priceUs = "288,77$";
const priceUk = priceUs.replace("$", "E");
console.log(priceUk); //288,77E

console.log(plane.includes("A"));
console.log(airLine.includes("Air"));
console.log(airLine.includes("air"));
// true
// true
// false
console.log(typeof airLine.includes("air")); //boolean

console.log(airLine.startsWith("T"));
console.log(airLine.startsWith("A"));

console.log(plane.startsWith("A"));
console.log(plane.startsWith("B"));

// true
// false

// true
// false
console.log(airLine.endsWith("W"));
console.log(airLine.endsWith("m"));
console.log(plane.endsWith(0));
// false
// false
// true

const plane1 = "A320neo";

if (plane1.startsWith("A") && plane1.endsWith("neo")) {
  console.log(`${plane1} is part Air India family`);
}
// A320neo is part Air India family

//checkBaggage
const NotAlloweditems = [
  "fireInstrument",
  "knife",
  "blade",
  "petrol",
  "cookien"
];
function checkBaggage(bag) {
  for (let i = 0; i <= NotAlloweditems.length - 1; i++) {
    for (let j = 0; j <= bag.length - 1; j++) {
      if (bag.includes(NotAlloweditems[i])) return "You are not allowed to fly";
    }
  }
  return "welcome to the indigo airlines";
}
const bag1 = ["laptop", "cloths", "mobile"];
const bag2 = ["laptop", "cloths", "mobile", "knife"];
const bag3 = ["laptop", "cloths", "mobile", "knife"];
const bag4 = ["laptop", "cloths", "petrol", "mobile", "knife"];

console.log(checkBaggage(bag1));
console.log(checkBaggage(bag2));
console.log(checkBaggage(bag3));
console.log(checkBaggage(bag4));
// welcome to the indigo airlines
// You are not allowed to fly
// You are not allowed to fly
// You are not allowed to fly
const checking = bag2.filter((item, i, arr) => {
  // console.log(item.includes(NotAlloweditems[i]));
  return item === NotAlloweditems[i]
    ? "You are not allowed to fly"
    : "you are welcome..";
});
console.log(">>", checking); //[ 'laptop', 'cloths', 'mobile' ]

console.log(
  bag1.map((item, i) => {
    return item === NotAlloweditems[i]
      ? "you are not allowed"
      : "welcom to you";
  })
);
// [ 'welcom to you', 'welcom to you', 'welcom to you' ]

// convert line of strings into array
console.log(`a very nice string`.split(" ")); //[ 'a', 'very', 'nice', 'string' ]

console.log(`this+line+is+going+split+based+on+plus+symbol`.split("+"));
// [
//   'this',   'line',
//   'is',     'going',
//   'split',  'based',
//   'on',     'plus',
//   'symbol'
// ]

console.log("Jonas Schmedthmann".split(""));
// [
//   'J', 'o', 'n', 'a', 's',
//   ' ', 'S', 'c', 'h', 'm',
//   'e', 'd', 't', 'h', 'm',
//   'a', 'n', 'n'
// ]
const splitName = "Jonas Schmedthmann".split(" ");

const joinName = splitName.join(" ");
console.log(splitName);
console.log(joinName);
// [ 'Jonas', 'Schmedthmann' ]
// JonasSchmedthmann

//capitalize Name
function capitalizName(name) {
  const splitName = name.trim().split(" ");
  const firstLetterCap = splitName.map(
    (str) => str[0].toUpperCase() + str.slice(1)
  );
  return firstLetterCap.join(" ");
}
console.log(capitalizName("ramesh nagella"));
console.log(capitalizName("ramesh Nagella has a laptop"));

//write  a function to bbok train
const bookedData = [];
const bookTicket = (flight, flightNum, passengers, price) => {
  const booking = {
    Flight: `${flight}${flightNum}`,
    Passengers: passengers,
    TotalPrice: `${(passengers || 1) * price}`,
    BookingId: Math.ceil(Math.random() * 1000000)
  };
  bookedData.push(booking);

  return `Ticket is booked and Booking Id is ${booking.BookingId}`;
};
console.log(bookTicket("AirIndia", 12, 2, 1500));
console.log(bookTicket("Indigo", 1, 3, 1500));
console.log(bookTicket("Deccen", 2, 1, 1500));
// Ticket is booked and Booking Id is 975381
// Ticket is booked and Booking Id is 25193
// Ticket is booked and Booking Id is 973399
//passing by reference
//passing by value
console.log(bookedData);
// [
//   {
//     Flight: 'AirIndia12',
//     Passengers: 2,
//     TotalPrice: '3000',
//     BookingId: 937950
//   },
//   {
//     Flight: 'Indigo1',
//     Passengers: 3,
//     TotalPrice: '4500',
//     BookingId: 180149
//   },
//   {
//     Flight: 'Deccen2',
//     Passengers: 1,
//     TotalPrice: '1500',
//     BookingId: 342552
//   }
// ]

const greeting = (greeting) => {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greetingHey = greeting("hey");
greetingHey("Mike");
//hey Mike
// greeting("Mike", "hii"); this is not the correct way of calling clouser
greeting("hey")("Max"); //hey Max
greeting("Manu")("hello"); //Manu hello

const isClouser = (name1, say) => {
  return function () {
    console.log(name1, say);
  };
};
isClouser("jonas", "Hii"); //calling like this will not work for clousers
// to call the clouser
const clouserCall = isClouser("jonas", "hii");
clouserCall(); //jonas hii
//TO CREATE A CLOUSER BEHAVIOR WE NEED TO CALL LIKE THIS ONLY
isClouser("john")("Hii");
//john undefined  >>>>>>> WILL NOT WORK

const lufthansa = {
  airLine: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book: function (flightNum, name) {
    console.log(
      `${name} has booked a seat on ${this.airLine} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      Name: name,
      airLine: this.airLine,
      flightNumber: `${this.iataCode} ${flightNum}`
    });
  }
};
lufthansa.book(234, "Max");
console.log(lufthansa.bookings);
// Max has booked a seat on Lufthansa flight LH234
// [{ Name: "Max", airLine: "Lufthansa", flightNumber: "LH 234" }];

lufthansa.book.call(lufthansa, 32, "Manu");
console.log(lufthansa.bookings);
// Manu has booked a seat on Lufthansa flight LH32
// [
//   { Name: 'Max', airLine: 'Lufthansa', flightNumber: 'LH 234' },
//   { Name: 'Manu', airLine: 'Lufthansa', flightNumber: 'LH 32' }
// ]

const euroWings = {
  airLine: "Eurowings",
  iataCode: "EW",
  bookings: []
};
euroWings.book = lufthansa.book;
console.log(euroWings);
// {
//   airLine: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
//   book: [Function: book]
// }

euroWings.book(123, "Jonas");
console.log(euroWings.bookings);
// Jonas has booked a seat on Eurowings flight EW123
// [ { Name: 'Jonas', airLine: 'Eurowings', flightNumber: 'EW 123' } ]

euroWings.book.call(euroWings, 123, "Strong");
console.log(euroWings.bookings);
// Strong has booked a seat on Eurowings flight EW123
[
  { Name: "Jonas", airLine: "Eurowings", flightNumber: "EW 123" },
  { Name: "Strong", airLine: "Eurowings", flightNumber: "EW 123" }
];

const book = lufthansa.book;
// console.log(book(123, "Steven"));
// TypeError: Cannot read properties of undefined (reading 'push')
//there is a problem when we assinging the INNER METHOD OF A OBJECT TO SEPERATE VARIABLE
//BECAUSE OF HAVING "this" keyword in the method
//when you copy the method from one object to another in javascript,the context(this) is not preserved.
//so, when you call the book method from lufthansa it lost its original context

// To fix this issue and ensure that the this keyword references the correct object (eurowings or lufthansa) even after
// //  copying the method, you can use bind, call, or apply to explicitly set the context.

//  CALL METHOD
book.call(lufthansa, 11, "Sara");
//"CALL" method calls the book function
console.log(lufthansa.bookings);
// Sara has booked a seat on Lufthansa flight LH11
// [
//   { Name: 'Max', airLine: 'Lufthansa', flightNumber: 'LH 234' },
//   { Name: 'Manu', airLine: 'Lufthansa', flightNumber: 'LH 32' },
//   { Name: 'Sara', airLine: 'Lufthansa', flightNumber: 'LH 11' }
// ]

book.call(euroWings, 43, "Thor");
console.log(euroWings.bookings);
// Thor has booked a seat on Eurowings flight EW43
// [
//   { Name: 'Jonas', airLine: 'Eurowings', flightNumber: 'EW 123' },
//   { Name: 'Strong', airLine: 'Eurowings', flightNumber: 'EW 123' },
//   { Name: 'Thor', airLine: 'Eurowings', flightNumber: 'EW 43' }
// ]

// TO bbok a ticket in indgo airlines
const indigo = {
  airLine: "Indigo",
  iataCode: "IND",
  bookings: []
};

book.call(indigo, 12, "Ram");
console.log(indigo.bookings);
// Ram has booked a seat on Indigo flight IND12
// [ { Name: 'Ram', airLine: 'Indigo', flightNumber: 'In 12' } ]

//APPLY METHOD
// apply  method is also same as call method but it takes the argumetns in array format

// with BIND METHOD

const flightData = [342, "George Cooper"];
book.apply(euroWings, flightData);
console.log(euroWings.bookings);

// George Cooper has booked a seat on Eurowings flight EW342
// [
//   { Name: 'Jonas', airLine: 'Eurowings', flightNumber: 'EW 123' },
//   { Name: 'Strong', airLine: 'Eurowings', flightNumber: 'EW 123' },
//   { Name: 'Thor', airLine: 'Eurowings', flightNumber: 'EW 43' },
//   {
//     Name: 'George Cooper',
//     airLine: 'Eurowings',
//     flightNumber: 'EW 342'
//   }
// ]
// with apply method we can book the same person with same details in another flight

book.apply(indigo, flightData);
console.log(indigo.bookings);
// George Cooper has booked a seat on Indigo flight IND342
// [
//   { Name: 'Ram', airLine: 'Indigo', flightNumber: 'IND 12' },
//   { Name: 'George Cooper', airLine: 'Indigo', flightNumber: 'IND 342' }
// ]

// BIND METHOD

// book.bind(indigo, 32, "Mohan");
// console.log(indigo.bookings);

//it will not work

const bookIND = book.bind(indigo);
bookIND(543, "Steven Williams");
// Steven Williams has booked a seat on Indigo flight IND543

const bookEW = book.bind(euroWings);
bookEW(435, "Mary");
console.log(euroWings.bookings);

// Mary has booked a seat on Eurowings flight EW435
// [
//   { Name: 'Jonas', airLine: 'Eurowings', flightNumber: 'EW 123' },
//   { Name: 'Strong', airLine: 'Eurowings', flightNumber: 'EW 123' },
//   { Name: 'Thor', airLine: 'Eurowings', flightNumber: 'EW 43' },
//   {
//     Name: 'George Cooper',
//     airLine: 'Eurowings',
//     flightNumber: 'EW 342'
//   },
//   { Name: 'Mary', airLine: 'Eurowings', flightNumber: 'EW 435' }
// ]

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); //220
addVat = addTax.bind(null, 0.2);
console.log(addVat(100)); //120

//IIFE
// function () {
//   console.log("this funcction will never run again");
// }
// //SyntaxError: Function statements require a function name
(function () {
  console.log(`this function will not run again whatever we do.`);
})();
// this function will not run again whatever we do.

{
  const isPrivate = 23;
  var isNotPrivate = 12;
  let isAlsoPrivate = 32;
}

// console.log(isPrivate);//ReferenceError: isPrivate is not defined
console.log(isNotPrivate);
12;
// console.log(isAlsoPrivate);//ReferenceError: isAlsoPrivate is not defined

//VARIABLES DEFINED WITH "LET" AND "CONST" CREATES THEIR OWN SCOPE INSIDE THE BLOCK AND
//  THEY COULD NOT ALLOW THIER VALUES TO ACCESS OUTSIDE OF BLOCK.

//ACCESSING THE VARIABLE FROM A FUNCTION

const accessVaribles = () => {
  console.log(varKey); //undefined
  // console.log(letKey);//ReferenceError: Cannot access 'letKey' before initialization
  // console.log(constKey);//ReferenceError: Cannot access 'constKey' before initialization

  var varKey = "defined with var";
  let letKey = "defined with let";
  const constKey = "defined with const";
};
accessVaribles();
// console.log(varKey);//ReferenceError: varKey is not defined
// console.log(letKey); //ReferenceError: letKey is not defined
// console.log(constKey); //ReferenceError: constKey is not defined

// ACCESSVARIABLES IN INNER FUNCTION AND ACCESSING INNERFUNCTION VARIBLES IN OUTER FUNCTION

const accessVarInnerfn = function (name, age) {
  console.log(name, age);
  var varKey = "defined with var";
  let letKey = "defined with let";
  const constKey = "defined with const";

  // console.log(
  //   "innerFunctionVaribles: ",
  //   innerVarKey
  //   // innerLetKey,
  //   // innerConstKey
  // );
  //ReferenceError: innerVarKey is not defined
  //ReferenceError: innerLetKey is not defined
  // ReferenceError: innerConstKey is not defined

  return function () {
    var innerVarKey = "defined in innerFn with var";
    let innerLetKey = "defined in innerFn with let";
    const innerConstKey = "defined in innerfn with const";

    console.log(">>>", name, age);

    console.log("parentFnVaribls", varKey, letKey, constKey);
    console.log("innerFnVaribles", innerVarKey, innerLetKey, innerConstKey);
  };
};
accessVarInnerfn("Max", 34);
//  To execute the inner function and see its logs, you need to capture the returned function and then invoke it separately.
const innerFunction = accessVarInnerfn("Manu", 33);
innerFunction();

// Manu 33
// >>> Manu 33
// parentFnVaribls defined with var defined with let defined with const
// innerFnVaribles defined in innerFn with var defined in innerFn with let defined in innerfn with const

//CLOUSER
const secureBooking = function () {
  let passengersCount = 0;
  return function () {
    passengersCount++;
    console.log(`${passengersCount} passengers`);
    return `${passengersCount} passengers`;
  };
};
console.log(secureBooking()); //[Function (anonymous)]
secureBooking();
//NO OUTPUT IS CAME BECAUSE WE ARE CALLINF ONLY PARENT FUNCTION NOT INNER FUNCTION SO
//TO CALL THE INNER FUNCITON WE NEED TO DECLARE THE CLOUSER FUNCTION WITH ANOTHER VARIBLE

const booker = secureBooking();
console.log(booker());
// 1 passengers
// 1 passengers

booker();
//2 passengers

//A clouser gives the function access to all the varibles of its private function, even after that parent function has excuted.
//This function keeps a refence to its out scope, whic preserves the chain throught the time

//A CLOUSER MAKE SURE THAT A FUNCTION DOESN'T LOOSE  CONNECTION TO VARIBLES THAT EXISTED IN THE FUNCTION BIRTH PLACE

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
//calling clouser
// g(); /// No ouput will come if we call like this

g();
f(); //      // 46

// ARRAYS

const array1 = ["a", "b", "c", "d", "e"];
//SLICE() method -->> it return the new arrrray but could NOT mutates the original array

console.log(array1.length);
console.log(array1.slice(2));
console.log(array1.slice(-1));
console.log(array1.slice(1));
console.log(array1.slice(-3));
// 5
// [ 'c', 'd', 'e' ]
// [ 'e' ]
// [ 'b', 'c', 'd', 'e' ]
// [ 'c', 'd', 'e' ]

//takeing the some part of the array

console.log(array1.slice(1, 3));
console.log(array1.slice(1, -2));
console.log(array1.slice(0, -3));
// [ 'b', 'c' ]
// [ 'b', 'c' ]
// [ 'a', 'b' ]

//SPLICE() method -->> same as slice method but it mutates the original array

console.log(array1.splice(3)); // from index 3 elements will be deleted
console.log(array1);
// [ 'd', 'e' ]
// [ 'a', 'b', 'c' ]
// console.log(array1.splice(-2));//[ 'b', 'c' ]
console.log(array1.length); //3
// console.log(array1.splice(0, -1)); //[]  negative index splice will not work
console.log(array1.splice(0, 2));
console.log(array1);
// [ 'a', 'b' ]
// [ 'c' ]

const array2 = [1, 2, 3, 4, 5];

//REVERSE      >>>> it revereses the array and muttes the original array

const reverseArray2 = array2.reverse();
console.log(reverseArray2); //[ 5, 4, 3, 2, 1 ]

console.log(array2);
// [ 5, 4, 3, 2, 1 ]

//EVEN WE DO THE REVERSE OPERATION WITH SEPERATE VARIBLE ASSIGNMENT THE ORIGINAL ARRRAY WILL MUTATE
console.log(array2.reverse()); //[ 1, 2, 3, 4, 5 ]

//CONCAT
console.log(array1.concat(array2));
// [ 'c', 1, 2, 3, 4, 5 ]

console.log(arr.concat(arr1));
// //[1,   2,   3,   4, 'a', 'b', 'c', 'd']

//JOIN
const letters = ["a", "b", "c", "d", "e", "f"];

console.log(letters.join("-"));
console.log(letters.join(""));

console.log("ramesh Nagella".split("").join("*"));
// a-b-c-d-e-f
// abcdef
// r*a*m*e*s*h* *N*a*g*e*l*l*a

//NEW AT METHOD

const array3 = [6, 7, 8, 9, 10];

console.log(array3[0]);
console.log(array3[-1]);
console.log(array3[array3.length - 1]);
// 6
// undefined
// 10
console.log(array3.at[1]);
//undefined
console.log(array3.at(1));
console.log(array3.at(-1));
console.log(array3.at(array3.length - 1));
// 7
// 10
// 10

// NEW AT METHOD on STRINGS
console.log("jonas".at(1));
console.log("jonas".at(-1));
console.log("jonas".at("jonas".length - 3));
// o
// s
// n
const movements = [2, 4, -4, 30, -7, -1, 1, 13];

// for of  >>>>>>>>>>>.the for...of loop is used to iterate over values that are iterable, such as arrays or strings.

for (const mov of movements) {
  if (mov > 0) console.log(`You deposited Rs.${mov}`);
  else console.log(`you withdwal Rs.${mov}`);
}
// You deposited Rs.2
// You deposited Rs.4
// you withdwal Rs.-4
// You deposited Rs.30
// you withdwal Rs.-7
// you withdwal Rs.-1
// You deposited Rs.1
// You deposited Rs.13

// for (let [el, i] of movements) {
//   console.log(`${i + 1}: ${el} ${el > 0 ? "deposted" : "withdrawn"}`);
// }
// //TypeError: .for is not iterable

// THIS IS BECUSE WE ARE ITERATING THE ARRAY BY DESTRUCTURING THE ARRAY ELEMENTS
// SO IN ORDER TO loop the array for DESTRUCTURING using 'for of' loop we need to use syntax like below
for (const [i, el] of movements.entries()) {
  console.log(`${i + 1}: Rs.${el} ${el > 0 ? "Deposted" : "withdrawn"}`);
}

// 1: Rs.2 Deposted
// 2: Rs.4 Deposted
// 3: Rs.-4 withdrawn
// 4: Rs.30 Deposted
// 5: Rs.-7 withdrawn
// 6: Rs.-1 withdrawn
// 7: Rs.1 Deposted
// 8: Rs.13 Deposted

//FOREACH
movements.forEach((mov) => {
  console.log(`${mov}${mov > 0 ? "Deposited" : "withdrwan"}`);
});
// 2Deposited
// 4Deposited
// -4withdrwan
// 30Deposited
// -7withdrwan
// -1withdrwan
// 1Deposited
// 13Deposited

movements.forEach((mov, i) => {
  console.log(`${i}: ${mov} `);
});
// 0: 2
// 1: 4
// 2: -4
// 3: 30
// 4: -7
// 5: -1
// 6: 1
// 7: 13

const forEachOutput = movements.forEach((mov, i, arr) => {
  // console.log(arr);
  if (mov > 0) {
    console.log(`${i + 1}: ${mov}`);
  } else {
    console.log(`${i + 1}:${mov}`);
  }
  console.log("/////////////", mov);
  return mov;
});
console.log("//////>>", forEachOutput); ////////>> undefined because in the loop we have given condition like that

// 1: 2
// ///////////// 2
// 2: 4
// ///////////// 4
// 3:-4
// ///////////// -4
// 4: 30
// ///////////// 30
// 5:-7
// ///////////// -7
// 6:-1
// ///////////// -1
// 7: 1
// ///////////// 1
// 8: 13
// ///////////// 13
// const forEach1 = movements.forEach((el) => {
//   return el;
// });
// console.log(forEach1);//undeined
// const movements = [2, 4, -4, 30, -7, -1, 1, 13];
// const forEach1 = movements.forEach((mov) => mov);
// console.log(forEach1);
// // undefined
// console.log(movements.forEach((el) => el));
// // undefined

//FOR EACH METHOD DOESNOT RETURN THE VALUE, IT JUST LOOP THE ARRAY HENCE ITS OUTPUT GIVING UNDEFINED
//FOReACH METHOD IS USED JUST LOOP OVER THE ARRAY AND APPLY THE GIVEN FUNCTION TO EACH ELEMENT
// and its not designed to create new array if we want to create new array after array looop then we can use map method

movements.forEach((el) => {
  console.log(el);
});
// 2
// 4
// -4
// 30
// -7
// -1
// 1
// 13
console.log(movements);
// [
//   2,  4, -4, 30,
//  -7, -1,  1, 13
// ]

const euroToUsd = movements.map((el) => Math.ceil(el * 1.92));
const euroToRupee = movements.map((el) => Math.ceil(el * 0.7));

console.log(euroToUsd);
console.log(euroToRupee);
// [
//   4,  8, -7, 58,
// -13, -1,  2, 25
// ]
// [
//  2,  3, -2, 21,
// -4, -0,  1, 10
// ]

//compute username
const user1 = "Steven Thomos William";
const user2 = "Maxmillian Schwarzmuller";

const createUserName = function (name) {
  const userArr = name.toLowerCase().split(" ");
  const firstLetter = userArr.map((name) => name[0]);
  const userName = firstLetter.join("") + Math.ceil(Math.random() * 1000);
  console.log(userName);
};
createUserName(user1);
createUserName(user2);
const user5 = "Steven Thomos Williams";
const user6 = "Jonas Schmedthmann";
const user3 = "ramesh babu Nagella";
const user4 = "Sara Williams Us";

function creatUserName(name) {
  console.log("11", name);
  let userName;

  if (typeof name === "string") {
    userName = name
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  } else {
    const names = Array.from(name);

    userName = names.map((name) => {
      return name
        .toLowerCase()
        .split(" ")
        .map((el) => el[0])
        .join("");
    });
  }
  return userName;
}

const users = [user5, user6, user3, user4];
console.log(">>", creatUserName(users));
console.log(">>", creatUserName("Thomose Alwa Edision"));
console.log(">>", creatUserName(["Thomos Alwa Edision", "raj koti"]));

function addPrefix(word) {
  return `pre_${word}`;
}

const animals = ["cat", "dog", "rabbit"];
const prefixedanimals = animals.map(addPrefix);
console.log(prefixedanimals);
//[ 'pre_cat', 'pre_dog', 'pre_rabbit' ]
const usersObj = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 16 },
  { name: "Charlie", age: 20 },
  { name: "David", age: 30 }
];
//find the no of adults in the above list
const adults = usersObj.filter((obj) => obj.age >= 18);
console.log(adults);
// [
//   { name: 'Alice', age: 25 },
//   { name: 'Charlie', age: 20 },
//   { name: 'David', age: 30 }
// ]
const names = ["Alice", "Bob", "Charlie", "David", "Eva"];
// filter  an array of string to extract names that start with a specific letter
//find the names that start with D and A
const namesStartWithDandA = names.filter(
  (name) => name.startsWith("D") || name.startsWith("A")
);
console.log(namesStartWithDandA); //[ 'Alice', 'David' ]

const namesHaveVandL = names.filter(
  (name) => name.includes("l") || name.includes("v")
);
console.log(namesHaveVandL);
// [ 'Alice', 'Charlie', 'David', 'Eva' ]

//Example 4: Filtering Falsy Values

const values1 = [0, 1, null, "hello", true, "", undefined, NaN, false];

const falsyValues = values1.filter(Boolean);
console.log(falsyValues); //[ 1, 'hello', true ]

const printAllBooleanVals = values1.filter((val) => {
  return typeof val === "boolean";
});
console.log(printAllBooleanVals); //[ true, false ]

//print only strings
console.log(values1.filter((val) => typeof val === "string"));
// [ 'hello', '' ]
const numberToReduce = [10, 20, 30, 40];

// find maximum element in the array

const maxNumber = numberToReduce.reduce((acc, cur) => {
  console.log(acc, cur);
  console.log(Math.max(acc, cur));

  return Math.max(acc, cur);
}, 0);
console.log(maxNumber);

// 10 20
// 20
// 20 30
// 30
// 30 40
// 40
// 40
//40

console.log(numberToReduce.map((el, i, arr) => Math.max(arr[i], arr[i + 1])));
// [ 20, 30, 40, NaN ]
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
// square the elements of the matrix
console.log(matrix);
console.log(matrix.map((arr) => arr.map((el) => el ** 2)));
// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
// [ [ 1, 4, 9 ], [ 16, 25, 36 ], [ 49, 64, 81 ] ]
const innerArr = [
  [1, 2, [3, 4]],
  [5, 6, [7, 8]]
];
//FORM THE FLATARRAY

console.log(innerArr.flat((el) => el));
// [ [ 1, 2, [ 3, 4 ] ], [ 5, 6, [ 7, 8 ] ] ]
console.log(innerArr.flat());
// [1, 2, [3, 4], 5, 6, [7, 8]];
console.log(innerArr.flat(2));
// [1, 2, 3, 4, 5, 6, 7, 8]
console.log(innerArr.flat(3));
// [1, 2, 3, 4, 5, 6, 7, 8]
console.log(innerArr.flatMap((el) => el));
//[ 1, 2, [ 3, 4 ], 5, 6, [ 7, 8 ] ]
// console.log(innerArr.flatMap(2));
// TypeError: flatMap mapper function is not callable

console.log(innerArr.reduce((acc, cur) => acc.concat(cur), []));
// [ 1, 2, [ 3, 4 ], 5, 6, [ 7, 8 ] ]

console.log(
  innerArr
    .reduce((acc, cur) => acc.concat(cur), [])
    .reduce((acc, cur) => acc.concat(cur), [])
);
// [ 1, 2, 3, 4,5, 6, 7, 8 ]

const items = ["apple", "banana", "orange", "apple", "banana", "apple"];

//calculate the number of items of each type of fruite

console.log(
  items.reduce((acc, cur, i, arr) => {
    console.log("111", acc[cur], acc);
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {})
);
// { apple: 3, banana: 2, orange: 1 }

//find method

const arrayFind = [1, 2, 3, 4, 5, 6];
// find the number greater than 4
console.log(arrayFind.find((el) => el > 4)); //5
//find the number of elements which are greate thatn 4
console.log(arrayFind.filter((el) => el > 4));
// [ 5, 6 ]
console.log(arrayFind.filter((el) => el > 4).length);
//2

//FINDINDEX

//find the index position of the element which is greater than 4

console.log(arrayFind.findIndex((el) => el > 4));
//3
console.log(
  arrayFind.filter((el, i, arr) => {
    return el > 4 ? arr[i] : 0;
  })
);

//find the FIRST even number in array
console.log(arrayFind.find((el) => el % 2 === 0));
//2
const usersFind = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];
//find the object based on property value

console.log(usersFind.find((el) => el.name == "Bob"));
// { id: 2, name: 'Bob' }
console.log(usersFind.find((el) => el.name == "Charlie"));
// { id: 3, name: 'Charlie' }

const wordsFind = ["apple", "banana", "orange", "grapefruit"];

//find the word with specific length
console.log(wordsFind.find((word) => word.length > 7));
// grapefruit

console.log(wordsFind.find((word) => word.length !== 5));
//banana
/*
const fs = require("fs");

const http = require("http");

const express = require("express");
// const app = express();

//write a middleware
app.use((req, res, next) => {
  console.log("in the first middleware");
  next();
});
app.use((req, res, next) => {
  console.log("in the second middleware");
});
app.listen(3000);

//create a routes
// const fs = require("fs");
// const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use("/path", (req, res, next) => {
  console.log(req.body);
});

app.get("/add-product", (req, res, next) => {
  const userId = req.body.userId;
  res.send(`hello from expressJs`);
});

app.use("/", (req, res, next) => {
  console.log(req.body);
});

//get the product and display it on the webpage

Router.get("/post/:postId", async (req, res, next) => {
  const prodId = req.params.postId;
  //finding the product from database
  const product = await db.collection("products").findOne({ prodId: producId });

  if (!product) {
    const error = new Error("product is not found.");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: "Product fetched", product: product });
});

// create a user model  to store the data
const mogoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

// the user details will be stored in the "users" collecction (automatically createed by the node) and
// stored with the email and password as we indicated in the above schema

// STORE USER DATA WITH HASHED PASSWORD

// const fs = require("fs");
// const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("becryptjs");

const jwt = require("jsonwebtoken");

// const User = require("./models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    const error = new Error("validation failed.");
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    //hash the password before storing
    const hashedPW = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPW
    });
    await user.save();

    const storeUser = await db
      .collection("users")
      .insrtOne({ email: email, password: hashedPW });
    if (storeUser === 1) {
      res
        .status(201)
        .json({ message: "user created successfully", user: user });
    } else {
      throw new Error("user creation failed.");
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(statusCode).json({ error: error.message });
  }
  //or
  bcrypt
    .hash(password, 12)
    .then((hashedPW) => {
      const user = new User({
        email: email,
        password: hashedPW
      });
      return user.save();
    })
    .then((res) => {
      res
        .status(201)
        .json({ message: "user created successfully", userId: res._id });
    })
    .catch((Err) => {
      console.log(Err);
    });
};
*/
//PROMISES
//promise is an object which is used to store the future responsse of the api result

// The promises can be constructed using new Promise() keyword this keyword will again
// take one call back function which in turn takes two aruguments
// one for resolve, and reject
// if promise is successed then it prints with resolves
// other it rejects
fetch("https://restcountries.com/v2/name/portugal")
  .then((res) => res.json())
  .then((result) => {
    // console.log("?????", result);
  })
  .catch((err) => {
    console.error(err);
  });

const countryData = async function (country) {
  try {
    const data = await fetch(`https://restcountries.com/v2/name/${country}`);
    const result = await data.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.log("error fetching data", error);
    throw error;
  }
};
// console.log("ind>>>>>", countryData("india"));

// const whereAmI = async function (lat, lng) {
//   try {
//     const data = await fetch(`http://geocode.xyz/${lat},${lng}?geoit=json`);
//     // const result = await data.json();

//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
// whereAmI(52.508, 13.368)
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(".....", result);
//   })
//   .catch((Err) => {
//     console.log(Err);
//   });
const whereAmI = function (lat, lng) {
  fetch(`http://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((res) => res.json())
    .then((result) => {
      // console.log("33333", result);
    })
    .catch((err) => {
      console.error(err);
    });
};
whereAmI(52.508, 13.3681);

const promise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve("you won!");
  } else {
    reject("try again");
  }
});

//handling the promise
promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

//

//write a code to connect with database

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient();

const uri = "connecting string";

const client = new MongoClient(uri);

const db = "bank";

//create a function that connect to the database

const connectToDataBase = async () => {
  try {
    await client.connect();
    console.log(`connect to the ${dbname} database.`);
  } catch (error) {
    console.error(error);
  }
};
//create a main function that call the connectToDatabase function

const main = async () => {
  try {
    await connectToDataBase();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
main();
