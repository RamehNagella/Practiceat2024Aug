//add two numbers
const sumArr = (a, b) => a + b;
console.log(sumArr(2, 3));

console.log(sumDecl(4, 4));
function sumDecl(a, b) {
  return a + b;
}

const sumExpr = function (a, b) {
  return a + b;
};

console.log(sumExpr(2, 2));

// ADD  A NUMBER WITH ITSELF FOR N TIMES

const addNumforNtimes = (num, n) => {
  if (n === 0) return 0;
  return num + addNumforNtimes(num, n - 1);
};
console.log(addNumforNtimes(2, 3));
console.log(addNumforNtimes(12, 4));
// 5
// 8
// 4
// 6
// 48

//ARRAY SUM

function arrSum(arr) {
  //   if (arr.length <= 1) return arr[0];
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  const sum1 = arr.reduce((acc, el) => acc + el, 0);
  return { sum, sum1 };
}

console.log(arrSum([2]));
console.log(arrSum([1, 2, 3, 4, 5]));
console.log(arrSum([3, 2, 1, 4]));

//calculate the sum of the factorials of numbers from 1 to N

//FACTORIAL OF A NUMBER n

function factorial(n) {
  if (n <= 0) return 1;
  return n * factorial(n - 1);
}

// function  for sum of the factorials of numbers from 1 to N
//ex. 4 is given and asked that find  sum of factorials from 1 to the given number

// 1,2,3,4
// 1!=1 2!=2,3!=6, 4!=24
//sum 1+2+6+24 = 33
const factorialSum = function (num) {
  console.log(num);
  if (num === 0 || num === 1) return 1;

  let sum = 0;

  for (let i = 1; i <= num; i++) {
    console.log("!!", i, factorial(i));
    sum += factorial(i);
  }
  return sum;
};
console.log(factorialSum(4));

//find the sum of the fibanoccci series upto a given number

// 0 1 1 2 3 5 8 13 21 34 55

function fibanocciSeries(n) {
  let fibArr = [0, 1];
  for (let i = 2; i <= n; i++) {
    fibArr[i] = fibArr[i - 1] + fibArr[i - 2];
  }
  let output = fibArr.slice(0, n + 1);
  return output;
}

// console.log(fibanocciSeries(2));
// console.log(fibanocciSeries(5));
// console.log(fibanocciSeries(6));

// //RECURSIVE APPROCH

// function fibanocciRecursive(n) {
//   if (n <= 1) return n;
//   //   console.log(fibanocciRecursive(n - 1) + fibanocciRecursive(n - 2));
//   return fibanocciRecursive(n - 1) + fibanocciRecursive(n - 2);
// }
// console.log(fibanocciRecursive(1));
// // console.log(fibanocciRecursive(5));
// // console.log(fibanocciRecursive(6));

// const fibanoccciResultREcursive = Array.from({ length: 10 }, (_, i) =>
//   fibanocciRecursive(i)
// );
// // console.log(...fibanoccciResultREcursive);

//SUM OF THE FIBANOCCI SERIES UPTO GIVEN NUMBER

const sumOfFibanocciSeries = function (num) {
  let fibanoccciSeries = fibanocciSeries(num);
  let sum = 0;
  for (let i = 0; i <= fibanoccciSeries.length - 1; i++) {
    sum += fibanoccciSeries[i];
  }

  return sum;
};
console.log(fibanocciSeries(2), sumOfFibanocciSeries(2));
console.log(fibanocciSeries(3), sumOfFibanocciSeries(3));
console.log(fibanocciSeries(5), sumOfFibanocciSeries(5));
// Odd or Even Sum:

// Separate an array into odd and even numbers and find the sum of each.

function findOdd(num) {
  // console.log("1111 ", num);
  if (num <= 0) return false;
  if (num % 2 === 0) return false;

  return true;
}

function findEven(num) {
  // console.log("222", num);
  if (num < 1) return false;
  if (num % 2 !== 0) return false;

  return true;
}

function addArray(arr) {
  if (arr.length < 1) return 0;

  let sum = 0;
  for (let i = 0; i <= arr.length - 1; i++) {
    sum += arr[i];
  }

  return sum;
}

const seperateArrintoOddndEven = (arr) => {
  // console.log(">>>>>", arr);

  let evenNumsArr = [];
  let oddNumsArr = [];

  for (let i = 0; i < arr.length; i++) {
    // console.log("@@@@@@@@", arr[i]);

    if (findOdd(arr[i])) oddNumsArr.push(arr[i]);
    if (findEven(arr[i])) evenNumsArr.push(arr[i]);
  }

  // console.log("even", evenNumsArr);
  // console.log("Odds", oddNumsArr);

  const evenSum = addArray(evenNumsArr);
  const oddSum = addArray(oddNumsArr);

  return `evenSum: ${evenSum},\noddNumSum: ${oddSum}`;
};

// seperateArrintoOddndEven([1, 2, 3, 4, 5, 6, 0]);
// console.log(seperateArrintoOddndEven([1, 2, 3, 4, 5, 6, 0]));
console.log(
  seperateArrintoOddndEven([1, 2, 3, 4, 5, 6, 0, 12, 32, 11, 21, 10, 9, 64, 43])
);
// even [
//   2,  4,  6, 12,
//  32, 10, 64
// ]
// Odds [
//   1, 3,  5, 11,
//  21, 9, 43
// ]
// evenSum: 130,
// oddNumSum: 93

const seperateArrintoOddndEven1 = (arr) => {
  const isOdd = (num) => num % 2 !== 0;
  const isEven = (num) => num % 2 === 0;

  const sumArr = (arr) => arr.reduce((acc, num) => num + acc, 0);

  const oddNumsArr = arr.filter(isOdd);
  const evenNumsArr = arr.filter(isEven); // <<<<<<<<<<<<<<<<<<<<<<<<<< see how filter method is used

  const oddNumsSum = sumArr(oddNumsArr);
  const evenNumsSum = sumArr(evenNumsArr);

  return ` OddNumsArray: ${oddNumsArr} OddNumsSum: ${oddNumsArr} \n EvenNumsArr: ${evenNumsArr}    EvenNumsSum ${evenNumsSum}`;
};

console.log(seperateArrintoOddndEven1([1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 11]));

// OddNumsArray: 1,3,5,7,9,11 OddNumsSum: 1,3,5,7,9,11
// EvenNumsArr: 2,4,6,8,12    EvenNumsSum 32

// Squared Sum:

// Write a function to calculate the sum of squares of numbers in an array.

function squareArrNums(arr) {
  return arr.map((el) => el ** 2);
}

const calcSquaredSum = (array) => {
  const squaredArr = array.map((el) => el ** 2);

  const sumOfSquaredArr = squaredArr.reduce((acc, el) => acc + el, 0);

  return ` squredArray: ${squaredArr} sum is: ${sumOfSquaredArr}`;
};

console.log(calcSquaredSum([1, 2, 3, 4, 5]));

// squredArray: 1,4,9,16,25 sum is: 55

// Two Arrays Sum:

// Given two arrays, find the sum of corresponding elements.

const twoArraysSum = (arr1, arr2) => {
  if (arr1.length !== arr2.length)
    return "please enter same lengths of two arrays";

  const sum = arr1.map((el, i) => el + arr2[i]);
  // console.log(sum);
  return sum;
};
console.log(twoArraysSum([1, 2, 3, 4], [1, 2, 3, 4]));
console.log(twoArraysSum([1, 2, 3, 4], [1, 2, 3, 4, 5]));
// [ 2, 4, 6, 8 ]
// please enter same lengths of two arrays

// Subset Sum:

// Determine if there is a subset of elements in an array that adds up to a given sum.
// Consecutive Sum:

// Find the sum of consecutive numbers from 1 to N.
// Power Sum:

// Calculate the sum of powers of a given number up to a certain limit.
// Alternate Element Sum:

// Find the sum of alternate elements in an array.
// Prime Sum:

// Calculate the sum of prime numbers within a given range.
// Digit Sum:

// Write a function to find the sum of digits of a given number.
// Triangular Sum:

// Find the sum of triangular numbers up to a specified term.
// Geometric Sum:

// Calculate the sum of a geometric series.
// Difference of Squares Sum:

// Find the sum of squares of the first N natural numbers and square of the sum, then calculate the difference.
// Palindrome Sum:

// Determine if the sum of digits of a number is a palindrome.
// Subset with Given Sum:

// Find if there is a subset in an array with a sum equal to a given value.

function linearSearch(arr, targetEl) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === targetEl)
      return `targetEl is found and its position is ${i}`;
  }
  return "targetEl not found";
}

console.log(linearSearch([1, 3, 2, 4, 5, 65], 4));
console.log(linearSearch([1, 3, 2, 4, 5, 6, 15, 99], 0));
// targetEl is found and its position is 3
// targetEl not found

function binarySearch(arr, targetEl) {
  let i = 0;
  let n = arr.length - 1;

  while (i <= n) {
    let mid = Math.floor((i + n) / 2);

    if (arr[mid] === targetEl) {
      return `targetEl is found and its position is ${mid}`;
    } else if (arr[mid] < targetEl) {
      i = mid + 1;
    } else {
      n = mid - 1;
    }
  }
  return ` target element is not found.`;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 6));
console.log(binarySearch([1, 2, 3, 4, 5, 6], 2));
console.log(binarySearch([1, 2, 3, 4, 5, 6], 21));

//Bubble Sort

function bubbleSort(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      arr[i] = arr[i + 1];
    }
  }
}
