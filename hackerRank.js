/*
Question1:
Given an array of integers, calculate the ratios of its elements that are positive, negative, and zero. Print the decimal value of each fraction on a new line with  places after the decimal.

Note: This challenge introduces precision problems. The test cases are scaled to six decimal places, though answers with absolute error of up to  are acceptable.

Example

There are  elements, two positive, two negative and one zero. Their ratios are ,  and . Results are printed as:

0.400000
0.400000
0.200000
Function Description

Complete the plusMinus function in the editor below.

plusMinus has the following parameter(s):

int arr[n]: an array of integers
Print
Print the ratios of positive, negative and zero values in the array. Each value should be printed on a separate line with  digits after the decimal. The function should not return a value.

Input Format

The first line contains an integer, , the size of the array.
The second line contains  space-separated integers that describe .

Constraints



Output Format

Print the following  lines, each to  decimals:

proportion of positive values
proportion of negative values
proportion of zeros
Sample Input

STDIN           Function
-----           --------
6               arr[] size n = 6
-4 3 -9 0 4 1   arr = [-4, 3, -9, 0, 4, 1]
Sample Output

0.500000
0.333333
0.166667
Explanation

There are  positive numbers,  negative numbers, and  zero in the array.
The proportions of occurrence are positive:3/3 =0.500000 , negative:2/6=0.333333  and zeros:1/6=0.166667 .
*/

const arr = [-4, 3, -9, 0, 4, 1];
("use strict");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'plusMinus' function below.
 *
 *
 *
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
  // Write your code here
  const minusNums = arr.filter((num) => num < 0);
  const positiveNums = arr.filter((num) => num > 0);
  const zeroNums = arr.filter((num) => num == 0);

  const positiveRatio = (positiveNums.length / arr.length).toFixed(6);
  const negativeRatio = (minusNums.length / arr.length).toFixed(6);
  const zeroRatio = (zeroNums.length / arr.length).toFixed(6);
  console.log(positiveRatio);
  console.log(negativeRatio);
  console.log(zeroRatio);
}
plusMinus(arr);

function main() {
  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  plusMinus(arr);
}
// main();

// or
function minusPlus(arr) {
  let positiveCount = 0;
  let negativeCount = 0;
  let zeroCount = 0;

  for (let num of arr) {
    if (num > 0) positiveCount++;
    else if (num < 0) negativeCount++;
    else zeroCount++;
  }

  const total = arr.length;

  const positiveRatio = positiveCount / total;
  const negativeRatio = negativeCount / total;
  const zeroRatio = zeroCount / total;

  console.log(positiveRatio.toFixed(6));
  console.log(negativeRatio.toFixed(6));
  console.log(zeroRatio.toFixed(6));
}
minusPlus(arr);

/*
// Question 2:
User
Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers. Then print the respective minimum and maximum values as a single line of two space-separated long integers.

Example

The minimum sum is  and the maximum sum is . The function prints

16 24
Function Description

Complete the miniMaxSum function in the editor below.

miniMaxSum has the following parameter(s):

arr: an array of  integers
Print

Print two space-separated integers on one line: the minimum sum and the maximum sum of  of  elements.

Input Format

A single line of five space-separated integers.

Constraints
1<=arr[i]<= pow(10,9);

Output Format

Print two space-separated long integers denoting the respective minimum and maximum values that can be calculated by summing exactly four of the five integers. (The output can be greater than a 32 bit integer.)

Sample Input

1 2 3 4 5
Sample Output

10 14
Explanation

The numbers are , , , , and . Calculate the following sums using four of the five integers:

Sum everything except 1, the sum is . 2+3+4+5=14
Sum everything except 2, the sum is .1+3+4+5 = 13 
Sum everything except 3, the sum is . 1+2+4+5 = 12
Sum everything except 4, the sum is .1+2+3+5 = 11
Sum everything except 5, the sum is . 1+2+3+4 = 10
Hints: Beware of integer overflow! Use 64-bit Integer.  and in the code editor given that           'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// 
//  * Complete the 'miniMaxSum' function below.
//  *
//  * The function accepts INTEGER_ARRAY arr as parameter.
//  

function miniMaxSum(arr) {
    // Write your code here                          }

function main() {

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}   then what is the answer write correct code that also pass sample test cases?
*/
function miniMaxSum(arr) {
  // Write your code here
  let ascendingArr = [];
  // for(let i=0;i<arr.length;i++){
  //     if(arr[i]>arr[i+1]){
  //         arr[i]=arr[i+1];
  //         ascendingArr.push(arr[i+1])
  //     }else if(arr[i]<arr[i+1]){
  //         arr[i]=arr[i];
  //         ascendingArr.push(arr[i]);
  //     }
  // }
  arr.sort((a, b) => a - b);
  arr.forEach((el) => ascendingArr.push(el));

  console.log(arr);
  console.log(ascendingArr);

  let minSum1 = 0;
  let maxSum1 = 0;
  for (let i = 0; i < ascendingArr.length - 1; i++) {
    minSum1 += ascendingArr[i];
  }
  for (let i = 1; i < ascendingArr.length; i++) {
    maxSum1 += ascendingArr[i];
  }
  console.log("1: ", minSum1, maxSum1);

  // arr.sort((a,b)=>a-b)

  const minSum2 = arr.slice(0, 4).reduce((acc, el) => acc + el, 0);
  const maxSum2 = arr.slice(1, 5).reduce((acc, el) => acc + el, 0);
  console.log("2:", minSum2, maxSum2);

  // arr.sort((a, b) => a - b); // Sort the array in ascending order

  let minSum3 = 0,
    maxSum3 = 0;

  // Calculate minimum sum by summing the first four elements
  for (let i = 0; i < 4; i++) {
    minSum3 += arr[i];
  }

  // Calculate maximum sum by summing the last four elements
  for (let i = 1; i < 5; i++) {
    maxSum3 += arr[i];
  }

  console.log("3:", minSum3, maxSum3);
}
miniMaxSum([1, 3, 2, 4, 5]);
miniMaxSum([7, 69, 2, 221, 8974]);
// function main() {

//   const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

//   miniMaxSum(arr);
// }

// question 3;
/*
Given a time in -hour AM/PM format, convert it to military (24-hour) time.

Note: - 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.
- 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.

Example


Return '12:01:00'.


Return '00:01:00'.

Function Description

Complete the timeConversion function in the editor below. It should return a new string representing the input time in 24 hour format.

timeConversion has the following parameter(s):

string s: a time in  hour format
Returns

string: the time in  hour format
Input Format

A single string  that represents a time in -hour clock format (i.e.:  or ).

Constraints

All input times are valid
Sample Input

07:05:45PM
Sample Output

19:05:45
*/

const s = "12:01:00PM"; //output is 12:01:00
const s1 = "12:01:00AM"; //output should ve 00:01:00
// <12PM TIME
// 00am, 01am, 02am, 03am, 04am, 05am, 06am, 07am, 08am, 09am, 10am,
// 11am, 12pm
//01pm, 02pm, 03pm, 04pm, 05pm, 06pm, 07pm, 08pm, 09pm, 10pm, 11pm,12am

function timeConversion(s) {
  // console.log(s, typeof s);//12:01:00PM string
  // console.log("!!!!!", s.slice(0, -2)); //12:01:00
  const time = s.slice(0, -2).split(":");
  const AmorPm = s.slice(-2);
  // let time[0]=time[0]

  // console.log(time, typeof time);
  // console.log(AmorPm, typeof AmorPm);
  // console.log(">>", typeof time[0], Number(time[0]) + 12, time[0] + "12");
  // console.log(time[0] > 3);
  // console.log(time[0] == 12, (time[0]) === 12);//true false
  // console.log(time[0] == 12, Number(time[0]) === 12); //true true

  if (Number(time[0]) < 12 && AmorPm === "PM") {
    time[0] = Number(time[0]) + 12;
  }
  if (Number(time[0]) === 12 && AmorPm === "AM") {
    time[0] = "00";
  }
  // console.log(">>", time[0]);

  const t4Hrstime = [time[0], time[1], time[2]].join(":");
  console.log(">> ", t4Hrstime);
}
timeConversion(s);
timeConversion(s1);
timeConversion("01:32:00PM");
timeConversion("00:12:00AM");
timeConversion("03:12:00PM");
timeConversion("00:12:00AM");
timeConversion("12:15:00AM");
timeConversion("12:15:00PM");
timeConversion("23:59:99PM");
timeConversion("11:59:00PM");

// >>  12:01:00
// >>  00:01:00
// >>  13:32:00
// >>  00:12:00
// >>  15:12:00
// >>  00:12:00
// >>  00:15:00
// >>  12:15:00
// >>  23:59:99
// >>  23:59:00

// function convertTo24HourFormat(time12Hour) {
//   let time = time12Hour.slice(0, -2); // Remove "AM" or "PM"
//   let hours = parseInt(time.split(":")[0]);
//   let minutesSeconds = time.slice(2);

//   if (time12Hour.includes("PM") && hours !== 12) {
//       hours += 12;
//   } else if (time12Hour.includes("AM") && hours === 12) {
//       hours = 0; // 12:XX:XX AM is 00:XX:XX in 24-hour format
//   }

//   // Padding with leading zeros if necessary
//   hours = hours.toString().padStart(2, "0");

//   return hours + minutesSeconds;
// }

// let time12Hour = "01:03:00PM";
// let time24Hour = convertTo24HourFormat(time12Hour);
// console.log(time24Hour); // Output: "13:03:00"

//question 3:
/*
Maria plays college basketball and wants to go pro. Each season she maintains a record of her play. She tabulates the number of times she breaks her season record for most points and least points in a game. Points scored in the first game establish her record for the season, and she begins counting from there.

Example

Scores are in the same order as the games played. She tabulates her results as follows:

                                     Count
    Game  Score  Minimum  Maximum   Min Max
     0      12     12       12       0   0
     1      24     12       24       0   1
     2      10     10       24       1   1
     3      24     10       24       1   1
Given the scores for a season, determine the number of times Maria breaks her records for most and least points scored during the season.

Function Description

Complete the breakingRecords function in the editor below.

breakingRecords has the following parameter(s):

int scores[n]: points scored per game
Returns

int[2]: An array with the numbers of times she broke her records. Index  is for breaking most points records, and index  is for breaking least points records.
Input Format

The first line contains an integer , the number of games.
The second line contains  space-separated integers describing the respective values of .

Constraints
*/
function breakingRecords(scores) {
  // Write your code here
  console.log([...scores]);
  const score = [...scores];

  let leastPonintsArr = [score[0]];
  let mostPointsArr = [score[0]];

  let minScore = score[0];

  if (minScore < score[1]) {
    minScore = score[1];
  } else if (minScore === score[1]) {
    minScore = minScore;
  } else {
    minScore = minScore;
  }

  for (let i = 0; i < score.length; i++) {
    if (score[i] < minScore) {
      leastPonintsArr.push(score[i]);
    } else if (score[i] > minScore) {
      mostPointsArr.push(score[i]);
    }
  }
  console.log("<<", leastPonintsArr);
  console.log(">>", mostPointsArr);

  let minRecords = 0;

  for (let i = 0; i < leastPonintsArr.length; i++) {
    if (leastPonintsArr[0] > leastPonintsArr[i]) {
      minRecords += 1;
      leastPonintsArr[0] = leastPonintsArr[i];
    } else {
      minRecords = minRecords;
    }
  }
  console.log(">>>>", mostPointsArr);

  let maxRecords = 0;

  for (let i = 0; i < mostPointsArr.length; i++) {
    // console.log("/////////", mostPointsArr[i]);
    // console.log("??", mostPointsArr[0] < mostPointsArr[i]);

    if (mostPointsArr[0] < mostPointsArr[i]) {
      console.log("///", mostPointsArr[i]);
      maxRecords += 1;
      mostPointsArr[0] = mostPointsArr[i];
    } else {
      maxRecords = maxRecords;
    }
  }
  console.log(maxRecords);
  console.log(minRecords);
  const result = [maxRecords, minRecords];
  return result;
}
const records = breakingRecords([10, 5, 20, 20, 4, 5, 2, 25, 1]);

console.log(records);

// or
function breakRecords(score) {
  // console.log(score);//[10, 5, 20, 20, 4, 5, 2, 25,  1]
  let minScore = score[0];
  let maxScore = score[0];
  let minCount = 0;
  let maxCount = 0;
  for (let i = 1; i < score.length; i++) {
    if (score[i] < minScore) {
      minScore = score[i];
      minCount++;
    } else if (score[i] > maxScore) {
      maxScore = score[i];
      maxCount++;
    }
  }
  const result = [maxCount, minCount];

  return result;
}

const record1 = breakRecords([10, 5, 20, 20, 4, 5, 2, 25, 1]);
console.log(record1);

// question 4
/*
Camel Case is a naming style common in many programming languages. In Java, method and variable names typically start with a lowercase letter, with all subsequent words starting with a capital letter (example: startThread). Names of classes follow the same pattern, except that they start with a capital letter (example: BlueCar).

Your task is to write a program that creates or splits Camel Case variable, method, and class names.

Input Format

Each line of the input file will begin with an operation (S or C) followed by a semi-colon followed by M, C, or V followed by a semi-colon followed by the words you'll need to operate on.
The operation will either be S (split) or C (combine)
M indicates method, C indicates class, and V indicates variable
In the case of a split operation, the words will be a camel case method, class or variable name that you need to split into a space-delimited list of words starting with a lowercase letter.
In the case of a combine operation, the words will be a space-delimited list of words starting with lowercase letters that you need to combine into the appropriate camel case String. Methods should end with an empty set of parentheses to differentiate them from variable names.
Output Format

For each input line, your program should print either the space-delimited list of words (in the case of a split operation) or the appropriate camel case string (in the case of a combine operation).
Sample Input

S;M;plasticCup()

C;V;mobile phone

C;C;coffee machine

S;C;LargeSoftwareBook

C;M;white sheet of paper

S;V;pictureFrame

Sample Output

plastic cup

mobilePhone

CoffeeMachine

large software book

whiteSheetOfPaper()

picture frame

Explanation

Use Scanner to read in all information as if it were coming from the keyboard.

Print all information to the console using standard output (System.out.print() or System.out.println()).

Outputs must be exact (exact spaces and casing).

function processData(input) {
  console.log(input, typeof input);
  // console.log(input.includes("()"));

  if (input.includes("()")) {
    // splitMethod= input;
    const word = input.split(/(?=[A-Z])/);
    const SMword = [word[0], word[1].slice(0, -2).toLowerCase()].join(" ");

    console.log("111", SMword);
  } else if (input.includes(" ")) {
    const word = input.split(" ");

    let CVWord = [];
    for (let i = 0; i < word.length; i++) {
      CVWord.push(word[i].slice(0, 1).toUpperCase() + word[i].slice(1));
    }
    console.log("222", CVWord.join(""));
  } else {
    const word = input.split(/(?=[A-Z])/);
    const SCWord = word.map((word) => word.toLowerCase()).join(" ");

    console.log("333", SCWord);
  }
}
processData("plasticCup()");
processData("mobile phone");
processData("white sheet of paper");
processData("LargeSoftwreBook");
//111 plastic cup
//222 MobilePhone
//333 large softwre book

//the above code is correct but there is small mistake in taking the input
*/
// the input format is like below

// S;M;plasticCup()

// C;V;mobile phone

// C;C;coffee machine

// S;C;LargeSoftwareBook

// C;M;white sheet of paper

// S;V;pictureFrame
//so the above code will not suit the above question

// Sample Output

// plastic cup

// mobilePhone

// CoffeeMachine

// large software book

// whiteSheetOfPaper()

// picture frame
const processData = function (input) {
  const [method, type, word] = input.split(";");
  // console.log(method, type, word);
  let words;

  if (method === "S") {
    if (type === "C" || type === "V") {
      words = word
        .split(/(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join(" ");
      console.log("111", words);
    } else if (type === "M") {
      // console.log(word);
      const requieWord = word
        .replace(/\(\)$/, "")
        .split(/(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join(" ");
      console.log("222", requieWord);
    }
  } else if (method === "C") {
    // console.log("%%%%%%%", type, word);
    if (type === "V") {
      const words = word.split(" ");
      const CVwrod = words
        .map((word, i, arr) => {
          if (i === 0) {
            return word;
          } else {
            return word[0].toUpperCase() + word.slice(1);
          }
        })
        .join("");

      console.log("333", CVwrod);
    } else if (type === "C") {
      const camelCase = word
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join("");
      console.log("444", camelCase);
    } else if (type === "M") {
      // console.log("3##", word);
      const wordMethod =
        word
          .split(" ")
          .map((word, i) => {
            if (i === 0) {
              return word;
            }
            return word[0].toUpperCase() + word.slice(1);
          })
          .join("") + "()";
      console.log("555", wordMethod);
    }
  }
};
processData("S;V;pictureFrame");
processData("S;C;LargeSoftwareBook");
processData("S;M;plasticCup()");
processData("C;V;mobile phone");
processData("C;C;coffee machine");
processData("C;M;white sheet of paper");
// 111 picture frame
// 111 large software book
// 222 plastic cup
// 333 mobilePhone
// 444 CoffeeMachine
// 555 whiteSheetOfPaper()

processData("S;V;iPad");
processData("C;M;mouse pad");
processData("C;C;code swarm");
processData("S;C;OrangeHighlighter");
processData("C;V;mobile phone");

///////////////////////////////////////

// Every student receives a  in the inclusive range from 0 to 100 .
// Any grade less than 40 is a failing grade.
// Sam is a professor at the university and likes to round each student's  grade according to these rules:

// If the difference between the grade and the next multiple of 5 is less than 3 , round  up to the next multiple of 5.
// If the value of grade is less than 38, no rounding occurs as the result will still be a failing grade.
// Examples

// grade = 84 round to  (85 - 84 is less than 3)
//  grade = 38 do not round (result is less than 40)
//  grade = 57 do not round (60 - 57 is 3 or higher)
function gradingStudents(grades) {
  // Write your code here
  console.log("input", grades);
  const output1 = grades
    .filter((marks) => marks > 37)
    .map((marks) => {
      const roundedTo = Math.ceil(marks / 5) * 5; //22/5 = 4*5 = 20, 45/5= 9*5 = 45
      console.log(">>", roundedTo);
      return roundedTo - marks < 3 ? roundedTo : marks;
    });
  const output2 = grades.filter((marks) => marks < 38);
  console.log("222222", output1);
  console.log("///////", output2);
  const output = [...output1, ...output2];
  console.log("ooooooo ", output);
  return output;
}
// gradingStudents([22, 45, 67, 58, 26]);
// //[ 45, 67, 60, 22, 26 ]
// gradingStudents([
//   23, 80, 96, 18, 73, 78, 60, 60, 15, 45, 15, 10, 5, 46, 87, 33, 60, 14, 71, 65
// ]);
// myoutput: [ 80, 96, 75, 80, 60, 60, 45, 46, 87, 60, 71, 65, 23, 18, 15, 15, 10,  5, 33, 14]
//Expectedoutput: [80, 96, 18, 75, 80, 60, 60, 15, 45, 15, 10, 5, 46, 87, 33, 60, 14, 71, 65];

function roundTo(num) {
  return Math.ceil(num / 5) * 5;
}
function gradingStudents1(grades) {
  return grades.map((num) => {
    //23
    // console.log(typeof num);
    if (num > 37) {
      const roundTo = Math.ceil(num / 5) * 5; //23/5 = 4.6 = 5*5 = 25  ,73/5 = 14.6 = 15*5 =75
      const output = roundTo - num < 3 ? roundTo : num; // 25-23 = 2<3 return 25, 75-73 = 2<3 return 75
      console.log("/////////", output);
      return output;
    } else if (num < 38) {
      return num;
    }
  });
}
// console.log("11111 ", gradingStudents1([22, 45, 67, 58, 26]));
console.log(
  "2222",
  gradingStudents1([
    23, 80, 96, 18, 73, 78, 60, 60, 15, 45, 15, 10, 5, 46, 87, 33, 60, 14, 71,
    65
  ])
);
// [23, 80, 96, 18, 75, 80, 60, 60, 15, 45, 15, 10,  5, 46, 87, 33, 60, 14, 71, 65]
//  // [80, 96, 18, 75, 80, 60, 60, 15, 45, 15, 10, 5, 46, 87, 33, 60, 14, 71, 65];

///

//You will be given a list of 32 bit unsigned integers. Flip all the bits (1->0 and 0->1 ) and return the result as an unsigned integer.

// example
//9(decimal)---->> 1001(binary);
//sine we are taking about 32 bit convert that binary form to 32 bit binary form
// 00000000000000000000000000001001(binary form of 9 in 32 bit decimal format) in the output flip this bits
// 11111111111111111111111111110110 its equivalant value is 4294967286 print this value in that output

function decimalToBinary(decimalNumber) {
  let binaryNumber = "";
  let quotient = decimalNumber;
  while (quotient > 0) {
    let remainder = quotient % 2;
    console.log("11", remainder);
    binaryNumber = remainder + binaryNumber;
    console.log("22", binaryNumber);
    quotient = Math.floor(quotient / 2);
    console.log("33", quotient);
  }
  console.log("oooo ", binaryNumber, quotient);
  return binaryNumber || "0";
}
console.log(decimalToBinary(9));
/*
11 1
22 1
33 4
11 0
22 01
33 2
11 0
22 001
33 1
11 1
22 1001
33 0
oooo  1001 0
1001

*/
// 9%2 =1   4
// 4%2 = 0  2
// 2%2 = 0  1
// 1%2 = 1  1
// //  1001
// 15
// 15%2 = 1  7
// 7%2  = 1  3
// 3%2 = 1   1
// // 1111

//******************* FLIPPING THE BITS AND CONVERT TO DECIMAL  */

function flippingBits(n) {
  const binaryNumber = n.toString(2);
  // console.log("bbb", binaryNumber);
  // console.log(binaryNumber, binaryNumber.length);
  // const appendBits = 32 - binaryNumber.length;
  // console.log(appendBits, typeof appendBits);
  // const binaryNum32Format = binaryNumber.padStart(appendBits, "0");
  // console.log(binaryNum32Format);    **************** that is wrong approch
  const binaryIn32Bit = binaryNumber.padStart(32, 0); //32 is totalLength of the padding, and 0 is number to be used for pad
  console.log("3232bi", binaryIn32Bit); //3232bi 00000000000000000000000000001101

  const arrOf32bit = [...binaryIn32Bit];
  // console.log("3232arr", arrOf32bit);
  const flipBitsArr = arrOf32bit.map((el) =>
    el === "0" ? 1 : el === "1" ? 0 : ""
  );
  // console.log("flipBb", flipBitsArr);
  const flipBitsInString = flipBitsArr.join("");
  console.log("flipStr ", flipBitsInString); //flipStr  11111111111111111111111111110010

  //converrting binary to decimal using parseInt operator;
  const requiredOutput = parseInt(flipBitsInString, 2);
  return requiredOutput;
}
console.log(">>", flippingBits(13)); //>> 4294967282
console.log(">>>", flippingBits(4522342)); //>>> 4290444953
// // console.log(String(23).padStart(6, 1));
// // console.log(String(23).padEnd(7, 9));
// // console.log(String(23).padStart(4, 8, 0));
// // console.log(String(23).padEnd(5, 11, 7));
// 111123
// 2399999
// 8823
// 23111

//************************** caluculate sum of the diagonal elements of the array and calculate the difference between the two sums of a diagonals */
// Given a square matrix, calculate the absolute difference between the sums of its diagonals.

// For example, the square matrix arr  is shown below:
// [1,2,3
//  4,5,6,
//  4.3,2]

// writing positions of the array in square matrix

//       columns
// rows  11  12  13
//       21  22  23
//       31  32  31

// in a given square matrix of order n*n how can find the length of the row and column
const matrix = [
  [11, 2, -3],
  [4, 5, 6],
  [7, 8, 9]
];
// finding the length of the rows and length of the columns in the square matrix //******************************************************************* */
let n = matrix.length;
const rowLength = +n; //******************************************************************************************************************************/
const columnLength = +n; //********************************************************************************************************************** */

//****************************************************************** */
// how to detect the position of the n*n matrix element is it  a 11 12 22 etc or 1 2 3

//     MATRIX POSITONS IN JAVASCRIPT ARE 0 (zero) BASED INDEX

console.log("r1c1el", matrix[0][0]);
console.log("r1c2el", matrix[0][1]);
console.log("r1c3el", matrix[0][2]);

console.log("r2c1el", matrix[1][0]);
console.log("r2c2el", matrix[1][0]);
console.log("r2c3el", matrix[1][0]);

console.log("r3c1el", matrix[2][0]);
console.log("r3c2el", matrix[2][1]);
console.log("r3c3el", matrix[2][2]);
// r1c1el 1
// r1c2el 2
// r1c3el 3

// r2c1el 4
// r2c2el 4
// r2c3el 4

// r3c1el 7
// r3c2el 8
// r3c3el 9

console.log("lll", matrix.length);
3;
console.log(matrix[1].length); //3

//how to print the indexposition numbers of the array and its values
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix.length; j++) {
    console.log(
      `Matrix row position is ${i} and column position is ${j} and the value of matrix[${i}][${j}]: ${matrix[i][j]}`
    );
  }
}
// Matrix row position is 0 and column position is 0 and the value of matrix[0][0]: 1
// Matrix row position is 0 and column position is 1 and the value of matrix[0][1]: 2
// Matrix row position is 0 and column position is 2 and the value of matrix[0][2]: 3
// Matrix row position is 1 and column position is 0 and the value of matrix[1][0]: 4
// Matrix row position is 1 and column position is 1 and the value of matrix[1][1]: 5
// Matrix row position is 1 and column position is 2 and the value of matrix[1][2]: 6
// Matrix row position is 2 and column position is 0 and the value of matrix[2][0]: 7
// Matrix row position is 2 and column position is 1 and the value of matrix[2][1]: 8
// Matrix row position is 2 and column position is 2 and the value of matrix[2][2]: 9

const diagonalElArr = [];
for (let i = 0; i < rowLength; i++) {
  for (let j = 0; j < columnLength; j++) {
    if (i === j) diagonalElArr.push(matrix[i][j]);
  }
}
console.log("dd", diagonalElArr);
console.log(
  "sum of the diagonal elements or the array ",
  diagonalElArr.reduce((acc, el) => acc + el, 0)
);
// dd [ 1, 5, 9 ]
// sum of the diagonal elements or the array  15

//********************************************************************************* */
// backward Diagonal
// for 3*3
// 02
// 11
// 21

// lenth of the row:3
//first row(index value is 0) && column: 2 (3-1-0(0th row) = 2) matrix[0][2]
//second row( index value is 1) && column:1(3-1-1(1st row) = 1) matrix[1][1]
//third row (index value is 2) && column :0(3-1-2(3rd row) = 0) matrix[3][0]
// (3-1-0(0th row) = 2)
// in the above calculation 3 is length of the row or length of the matrix,
//                          1 is standard value and
// the last decresing nmber are current calculating number (ex: 0,1,2,3,.. )
//HNCE THIS IS THE CRITERIA TO FIND THE ELEMENTS IN THE BACKWARD DIAGONAL ELEMENTS
//programmatically

const backwardDiagElArr = [];
for (let i = 0; i < rowLength; i++) {
  let columnPosition = rowLength - 1 - i;
  console.log("backwrdDig: ", columnPosition);
  backwardDiagElArr.push(matrix[i][columnPosition]);
}
console.log("backWardDiagonalElArr", backwardDiagElArr);
//****************************************************************************************************************************************************************** */
//*************************************************************************************************************************** */
function diagonalDifference(arr) {
  // Write your code here
  // console.log(arr)
  let n = arr.length;
  // console.log("ll", n);
  const rowLength = +n;
  const columnLength = +n;
  // console.log("rrr", rowLength, "ccc",columnLength)
  let forwardDiagElArr = [];
  let backwardDiagElArr = [];
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < columnLength; j++) {
      if (i === j) forwardDiagElArr.push(arr[i][j]);
    }
    const j = n - 1 - i;
    // console.log("jj",j);
    backwardDiagElArr.push(arr[i][j]);
  }
  // console.log("ff",forwardDiagElArr)
  // console.log("bb",backwardDiagElArr)

  const forwardDiagSum = forwardDiagElArr.reduce((acc, el) => acc + el, 0);
  const backwardDiagSum = backwardDiagElArr.reduce((acc, el) => acc + el, 0);
  // console.log("???????",forwardDiagSum,backwardDiagSum)
  const output = Math.abs(forwardDiagSum - backwardDiagSum);
  // console.log("/////",Math.abs(forwardDiagSum-backwardDiagSum))
  return output;
}
console.log("mm", matrix);
console.log(diagonalDifference(matrix));
// mm [ [ 11, 2, -3 ],
//    [ 4, 5, 6 ],
//    [ 7, 8, 9 ] ]
// 16
// or

function diagonalDifference1(arr) {
  console.log("in>>", arr);
  let n = arr.length;
  let forwardDiagSum = 0;
  let backwardDiagSum = 0;

  for (let i = 0; i < n; i++) {
    forwardDiagSum += arr[i][i]; // Sum of forward diagonal (top-left to bottom-right)
    backwardDiagSum += arr[i][n - 1 - i]; // Sum of backward diagonal (top-right to bottom-left)
  }
  console.log("fff", forwardDiagSum);
  console.log("bbb", backwardDiagSum);

  return Math.abs(forwardDiagSum - backwardDiagSum);
}

// Example usage:
const matrix1 = [
  [11, 2, -3],
  [4, 5, 6],
  [7, 8, 9]
];
// console.log(diagonalDifference1(matrix1)); // Output: 16
const matrix2 = [
  [6, 6, 7, -10, 9, -3, 8, 9, -1],
  [9, 7, -10, 6, 4, 1, 6, 1, 1],
  [-1, -2, 4, -6, 1, -4, -6, 3, 9],
  [-8, 7, 6, -1, -6, -6, 6, -7, 2],
  [-10, -4, 9, 1, -7, 8, -5, 3, -5],
  [-8, -3, -4, 2, -3, 7, -5, 1, -5],
  [-2, -7, -4, 8, 3, -1, 8, 2, 3],
  [-3, 4, 6, -7, -7, -8, -3, 9, -6],
  [-2, 0, 5, 4, 4, 4, -3, 3, 0]
];
console.log("22", diagonalDifference1(matrix2)); //52

// ****************************
/*

Comparison Sorting
Quicksort usually has a running time of n*log(n), but is there an algorithm
that can sort even faster? In general, this is not possible. Most sorting
algorithms are comparison sorts, i.e. they sort a list just by comparing 
the elements to one another. A comparison sort algorithm cannot beat n*log(n),  
(worst-case) running time, since n*log(n) represents the minimum number of
comparisons needed to know where to place each element. For more details,
you can see these notes (PDF).

Alternative Sorting
Another sorting method, the counting sort, does not require comparison. 
Instead, you create an integer array whose index range covers the entire 
range of values in your array to sort. Each time a value occurs in the 
original array, you increment the counter at that index. At the end, run 
through your counting array, printing the value of each non-zero valued 
index that number of times.

Example
arr =[1,1,3,2,1]

All of the values are in the range [0...3], so create an array of zeros, 
reqult = [0,0,0,0]. The results of each iteration follow:

i	  arr[i]	  result
0	  1	      [0, 1, 0, 0]
1	  1	      [0, 2, 0, 0]
2	  3	      [0, 2, 0, 1]
3	  2	      [0, 2, 1, 1]
4	  1	      [0, 3, 1, 1]
The frequency array is . These values can be used to create the sorted array as well: .

Note
For this exercise, always return a frequency array with 100 elements. 
The example above shows only the first 4 elements, the remainder being zeros.

Challenge
Given a list of integers, count and return the number of times each value appears 
as an array of integers.

Function Description

Complete the countingSort function in the editor below.

countingSort has the following parameter(s):

arr[n]: an array of integers

Returns

int[100]: a frequency array
*/
function countingSort(arr) {
  // Write your code here
  let frequencyArray = new Array(100).fill(0);
  console.log("fff", frequencyArray.length);
  // Iterate through the input array
  for (let i = 0; i < arr.length; i++) {
    // Increment the value at the index corresponding to the element in arr
    frequencyArray[arr[i]]++;
  }

  return frequencyArray;
}
const sortArr = [1, 1, 3, 2, 1];
const result = countingSort(sortArr);
console.log(result);
/* output 
[ 0, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0
]
*/
/*
An avid hiker keeps meticulous records of their hikes. During the last hike that took exactly  steps, 
for every step it was noted if it was an uphill, , or a downhill,  step. Hikes always start and end at sea level, 
and each step up or down represents a  unit change in altitude. We define the following terms:

*A mountain is a sequence of consecutive steps above sea level, starting with a step up from 
sea level and ending with a step down to sea level.
*A valley is a sequence of consecutive steps below sea level, starting with a step down from 
sea level and ending with a step up to sea level.
Given the sequence of up and down steps during a hike, find and print the number of valleys walked through.

Example

 steps = 8 path = [DDUUUUDD]   D =\ & U- 

                      _\
 [DDUUUDD]          _   \
            \     _
             \ _

The hiker first enters a valley  2 units deep. Then they climb out and up onto a 
mountain 2 units high. Finally, the hiker returns to sea level and ends the hike.

Function Description

Complete the countingValleys function in the editor below.

countingValleys has the following parameter(s):

* int steps: the number of steps on the hike
* string path: a string describing the path

Returns

int: the number of valleys traversed
*/
// DDUUUUDD;
//
// if hiker is get value as D then he start to go for down untill he gets one up U (that is the vally condition given in question)
//after that
//if hiker gets value as U he starts to walk for up untill he gets D after that  (mountain condition )
// if he gets D he goes to down if he gets U he goes to up

//from the above coclusions  we can write as

// 1. if one up(U) was started from there onwards we need to count the value
// untill he gets D. If he gets D we dont have to count the value as minus.There
// we need to stop counting for that D. after what happened for that we need to
// start counting. Because the counting will start at U and end at D for mountain
// otherwise counting will start at D and stop at U for valley
//at stoping point we dont have to count

//i have two strings U&D, what I want is when word start with D the count has to decrease from 0 untill
// it reaches to U, once it reached to U then it stop the counting. and subsequenctly if the next word start
// with U after thr stoping word U in the previous count  then again count has to increase in positive direction.
// for that write a javascript code if I have the string like UDDDUDUU
/*
Sure! Let’s break down the question in detail.

### Problem Description:
You’re given a sequence of steps taken during a hike, and each step is either an uphill (`U`) or a downhill (`D`). The hiker starts and ends the hike at sea level, which means the elevation is 0 at the beginning and the end of the hike.

### Terms to Understand:

1. **Sea Level**: 
   - The hiker's altitude starts at 0, which represents sea level.

2. **Uphill (`U`)**: 
   - Every time the hiker takes an uphill step, their altitude increases by 1 unit.

3. **Downhill (`D`)**: 
   - Every time the hiker takes a downhill step, their altitude decreases by 1 unit.

4. **Mountain**:
   - A mountain is defined as a sequence of consecutive steps where the hiker starts from sea level (0), climbs up to a point above sea level, and then returns back to sea level.

5. **Valley**:
   - A valley is defined as a sequence of consecutive steps where the hiker starts from sea level (0), descends below sea level (altitude becomes negative), and then eventually returns back to sea level.

### Example Breakdown:
Let’s consider the example given:

- **Steps**: `8`
- **Path**: `"DDUUUUDD"`

This is the sequence of steps the hiker took:
- **`D`**: Downhill (altitude decreases)
- **`D`**: Downhill (altitude decreases further)
- **`U`**: Uphill (altitude increases)
- **`U`**: Uphill (altitude increases further)
- **`U`**: Uphill (altitude increases further)
- **`U`**: Uphill (altitude increases further)
- **`D`**: Downhill (altitude decreases)
- **`D`**: Downhill (altitude decreases further)

### Altitude Changes:
Let’s track the altitude step by step:

1. Start at sea level: `0`
2. First `D`: Downhill to `-1`
3. Second `D`: Downhill to `-2` (the hiker is now below sea level, inside a valley)
4. First `U`: Uphill to `-1`
5. Second `U`: Uphill to `0` (the hiker has come back to sea level, so the valley ends here)
6. Third `U`: Uphill to `1` (the hiker is now above sea level, possibly starting a mountain)
7. Fourth `U`: Uphill to `2` (still above sea level, inside the mountain)
8. First `D`: Downhill to `1`
9. Second `D`: Downhill to `0` (back to sea level, ending the mountain)

### Counting Valleys:
- **Valley 1**: The hiker starts going down with the first two `D` steps (reaching `-2`), then 
comes back up to sea level with the next two `U` steps.
- The rest of the steps take the hiker up a mountain and back to sea level, but we’re only 
interested in counting valleys.

**Total Valleys**: `1`

### Function Goal:
The function `countingValleys` is supposed to calculate how many such valleys the hiker goes through 
based on the provided sequence of steps (`path`). 

### Summary:
The hiker’s path is represented by a string where `U` and `D` indicate changes in altitude. 
Your task is to count how many valleys (periods where the hiker goes below sea level and then 
returns to sea level) occur during the hike. The hike always starts and ends at sea level.
*/
function countingValleys(steps, path) {
  let altitude = 0;
  let valleys = 0;
  let inValley = false;

  for (let i = 0; i < steps; i++) {
    if (path[i] === "U") {
      altitude++;
    } else if (path[i] === "D") {
      altitude--;
    }
    // console.log("Start hiking");
    // console.log("aa11", altitude);

    // console.log("vv11", valleys);
    // console.log(">>>>>>>>>", altitude < 0 && !inValley);

    // Check if the hiker is entering a valley
    if (altitude < 0 && !inValley) {
      inValley = true;
    }

    // Check if the hiker is leaving a valley
    if (altitude === 0 && inValley) {
      valleys++;
      inValley = false;
    }
    // console.log("vvc", inValley);
    // console.log("vv", valleys);
  }
  // console.log("aa", altitude);
  return valleys;
}

// Example usage:
const steps = 8;
const path = "DDUUUUDD";
const result2 = countingValleys(steps, path);
console.log(result2); // Output: 1
/*
Start hiking
aa11 -1
vv11 0
>>>>>>>>> true
vvc true
vv 0
Start hiking
aa11 -2
vv11 0
>>>>>>>>> false
vvc true
vv 0
Start hiking
aa11 -1
vv11 0
>>>>>>>>> false
vvc true
vv 0
Start hiking
aa11 0
vv11 0
>>>>>>>>> false
vvc false
vv 1
Start hiking
aa11 1
vv11 1
>>>>>>>>> false
vvc false
vv 1
Start hiking
aa11 2
vv11 1
>>>>>>>>> false
vvc false
vv 1
Start hiking
aa11 1
vv11 1
>>>>>>>>> false
vvc false
vv 1
Start hiking
aa11 0
vv11 1
>>>>>>>>> false
vvc false
vv 1
aa 0
1
*/
//
//1. altitude hike will be increased if hiker goes U (uphiii)
//2. Altitude hike will be decreased if hiker goes D (downhill)
//3. if alttitude is less than see level  and valley condition is true
// then valley count will increased
// valley condition: initially valley is set to false because at that point
// of time hiker is at see level and he is not in the valley so inValley: false
// inValley turned true when hiker is below the see level && !isValley

// valley count is increased when altitude is equal to 0 and invalley condition is true
//
//
function countingValleys1(steps, path) {
  // Write your code here
  let altitude = 0;
  let valleys = 0;
  let inValley = false; //(it gets true if altitude is less thatn 1)

  for (let i = 0; i < steps; i++) {
    if (path[i] === "D") {
      altitude--;
    } else if (path[i] === "U") {
      altitude++;
    }
    //check hiker is in valley or not. If hiker is in valley change inValley to true otherwise dont
    if (altitude < 0 && !inValley) {
      inValley = true;
    }
    // increase the valley count if hiker goes down and come to see level and inValley is true;
    if (altitude === 0 && inValley) {
      valleys++;
      inValley = false; // becasue after count we need to start from begining,since hiker is at see level not in under the see level
    }
  }
  return valleys;
}
console.log("cv", countingValleys1(10, "UUDDDUDUDD"));
//2
//

///

/// ****************************************************************************
/*
There is a collection of input strings and a collection of query strings. For each query string, determine how many times it occurs in the list of input strings. Return an array of the results.

Example

strings = ["ab","ab","aba"];
queries = ["ab","abc","bc"];



There are 2 instances of "ab", 1 of 'abc' and 0 of 'bc'. For each query, add an element to the return array,results =[2,1,0].

Function Description

Complete the function matchingStrings in the editor below. The function must return an array of integers representing the frequency of occurrence of each query string in strings.

matchingStrings has the following parameters:

string strings[n] - an array of strings to search
string queries[q] - an array of query strings
Returns

int[q]: an array of results for each query

Input Format

The first line contains and integer n , the size of strings.
Each of the next n lines contains a string strings[i] .
The next line contains q, the size of strings.
Each of the next q lines contains a string queries[i] .
The problem is asking you to determine how many times each query string appears in a given list of input strings. Here's a breakdown of the question:

Problem Breakdown:
Input Strings (strings):

You are given a list (or array) of strings. These are the strings that you will search through.
Query Strings (queries):

You are also given a list of query strings. For each query string, you need to find out how many times it appears in the list of input strings.
Task:

For each query string, count how many times it is found in the list of input strings.
Output:

Return an array where each element corresponds to the number of times the corresponding query string appears in the input strings.
Example:
Input:
strings = ["ab", "ab", "aba"]
queries = ["ab", "abc", "bc"]
Output:
[2, 0, 0]
Explanation:
"ab" appears 2 times in strings.
"abc" appears 0 times in strings.
"bc" appears 0 times in strings.
What You Need to Do:
For each query string:

Look through the list of input strings.
Count how many times that query string appears.
Store the count in a result array.
Finally, return the result array.

In simple terms, the problem is about counting how often specific words 
appear in a list of words.function matchingStrings(strings, queries) {
  // Initialize an empty array to store the results
  const results = [];

  // Iterate over each query in the queries array
  for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      
      // Count the occurrences of the query in the strings array
      let count = 0;
      for (let j = 0; j < strings.length; j++) {
          if (strings[j] === query) {
              count++;
          }
      }

      // Add the count to the results array
      results.push(count);
  }

  // Return the results array
  return results;
}

// Example usage:
const strings = ["ab", "ab", "aba"];
const queries = ["ab", "abc", "bc"];
const results = matchingStrings(strings, queries);
console.log(results); // Output: [2, 0, 0]

Explanation:
Function matchingStrings:

Parameters:
strings: An array of input strings.
queries: An array of query strings.
Returns: An array of integers where each integer represents the number of times a query string appears in the input strings.
Logic:

For each query string, the code loops through the strings array to count how many times the query appears.
The count for each query is added to the results array.
The function returns the results array containing the count for each query.
Example Output:
Given the strings array ["ab", "ab", "aba"] and the queries array ["ab", "abc", "bc"], the output is [2, 0, 0] because:

"ab" appears twice in strings.
"abc" does not appear in strings.
"bc" does not appear in strings.
This solution iterates through the queries and then iterates through the strings for each query, resulting in a time complexity of O(n * q), where n is the length of the strings array, and q is the length of the queries array.
*/
// code
function matchingStrings(strings, queries) {
  const inputStr = strings;
  const inputQur = queries;
  // console.log(inputStr, inputQur);
  // create empty array  to stroe the count of the matching strng times
  let output = [];
  // write a code to compare the inputQur elements with inputStr elements
  for (let i = 0; i < inputQur.length; i++) {
    let count = 0;
    for (let j = 0; j < inputStr.length; j++) {
      if (inputQur[i] === inputStr[j]) {
        count++;
      }
    }
    output.push(count);
  }
  return output;
}

const strings = ["ab", "ab", "aba"];
const queries = ["ab", "abc", "bc"];

console.log("mmm", matchingStrings(strings, queries)); //mmm [ 2, 0, 0 ]
// *************** CODE TO FIND SENTANCE IS A PANGRAM OR NOT ************/

function isPangram(sentance) {
  //converting the given sentnce into lowerCase letters of array without having any space.
  const inputStrArr = sentance.toLowerCase().split(" ").join("");
  // console.log(">>>", inputStrArr);
  //create lowerCase letters array to compare with the input sentace letters array
  const lowerCaseLetters = Array.from(Array(26)).map((e, i) =>
    String.fromCharCode(i + 97)
  );

  // console.log(">>", lowerCaseLetters);
  //write logic do compare the both array elements
  for (let i = 0; i < lowerCaseLetters.length; i++) {
    // console.log(">>", !inputStrArr.includes(lowerCaseLetters[i]));
    if (!inputStrArr.includes(lowerCaseLetters[i])) {
      return "not pangram";
    }
  }
  return "pangram";
}
console.log(
  isPangram("We promptly judged antique ivory buckles for the next prize")
);
console.log(isPangram("qmExzBIJmdELxyOFWv LOCmefk TwPhargKSPEqSxzveiun"));
/*
Given an array of integers and a positive integer k, determine the number 
of (i,k)  pairs where i<j and ar[i] + ar[j] is divisible by k.

Example

ar =[1,2,3,4,5,6];
k=5;


Three pairs meet the criteria:[1,4],[2,3]  and[4,6] .

Function Description

Complete the divisibleSumPairs function in the editor below.

divisibleSumPairs has the following parameter(s):

int n: the length of array 
int ar[n]: an array of integers
int k: the integer divisor

Returns
- int: the number of pairs

Input Format:

The first line contains  space-separated integers,  and .
The second line contains  space-separated integers, each a value of arr[i].

Constraints

Sample Input
*/
function divisibleSumPairs(n, k, ar) {
  let count = 0;
  for (let i = 0; i < ar.length; i++) {
    for (let j = i + 1; j < ar.length; j++) {
      if ((ar[i] + ar[j]) % k === 0) {
        count++;
      }
    }
  }
  return count;
}
ar = [1, 2, 3, 4, 5, 6];
k = 3;
n = 6;
console.log("//////>>", divisibleSumPairs(n, k, ar));
//5

//

//

function birthday(s, d, m) {
  // Write your code here
  console.log(s, "\n", d, "\n", m);

  // [ 1, 2, 1, 3, 2 ] >>>. sides of square
  //  3    >>>>>>>>>>>>>. Ron's birthday
  //  2    >>>>>>>>>>>>> Ron's birth Month
  // [1,2],[2,1]>>>>>> posibble ways
  let outputArr = [];
  for (let i = 0; i < s.length - 1; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (j > s.length) {
        break;
      }

      let sumOfsides = s[i] + s[j] === d ? true : false;
      let length = s[i] === m || s[j] === m ? true : false;
      let adjescent = j - i === 1 ? true : false;

      if (length && sumOfsides && adjescent) {
        console.log("we can devide");
        outputArr.push([s[i], s[j]]);
      }
    }
  }
  console.log(outputArr);
  return outputArr.length;
}
/*
this is the code i have then how can i make it for different lengths of array, and different values of d and m

ChatGPT said:
ChatGPT
To generalize your function birthday for different lengths of arrays and different values of d and m, we can consider the following adjustments:

Problem Restatement:
s: Array of integers representing the values of each square segment.
d: Target sum of the segment values.
m: Length of the subarray (the number of segments you are looking for).
The goal is to find how many ways you can select m consecutive elements from the array s that add up to d.

Approach:
Sliding Window Technique: Use a sliding window of size m to check consecutive elements.
Sum Check: For each subarray of size m, check if the sum equals d.
Multiple Lengths: Handle different lengths by adjusting the sliding window size.
Code Implementation:
Here’s a refactored version of your function:
*/
function birthday(s, d, m) {
  let outputArr = [];

  for (let i = 0; i <= s.length - m; i++) {
    // Sliding window: sum of m consecutive elements starting from i
    let subArray = s.slice(i, i + m);
    let sum = subArray.reduce((acc, val) => acc + val, 0);

    if (sum === d) {
      outputArr.push(subArray);
    }
  }

  console.log(outputArr);
  return outputArr.length;
}

/*
// Example usage:
let s = [1, 2, 1, 3, 2];
let d = 3;  // Target sum
let m = 2;  // Length of subarray

console.log(birthday(s, d, m)); // Output: 2
Explanation:
Sliding Window: The loop iterates from 0 to s.length - m, ensuring the subarray doesn’t exceed the bounds of the array.

Subarray and Sum: For each position i, a subarray of length m is created using slice(i, i + m). The sum of this subarray is calculated using reduce.

Condition Check: If the sum matches d, the subarray is stored in outputArr.

Result: The function returns the length of outputArr, representing the number of valid subarrays.

Example:
Given s = [1, 2, 1, 3, 2], d = 3, and m = 2:

The subarrays of length 2 are [1, 2], [2, 1], [1, 3], and [3, 2].
The valid subarrays with a sum of 3 are [1, 2] and [2, 1].
The function returns 2.
This solution is flexible and will handle different values for d, m, and arrays of varying lengths.
*/
/*
where is the difference between priviously written code and above chat gpt printed code

ChatGPT said:
ChatGPT
Let's compare the two versions to understand the differences:

Your Original Code:
javascript
Copy code
function birthday(s, d, m) {
    let outputArr = [];
    for(let i = 0; i < s.length - 1; i++) {
        for(let j = i + 1; j < s.length; j++) {
            
            if(j > s.length) {
                break;
            }

            let sumOfsides = s[i] + s[j] === d ? true : false;
            let length = (s[i] === m) || (s[j] === m) ? true : false;
            let adjescent = j - i === 1 ? true : false;
            
            if(length && sumOfsides && adjescent) {
                console.log("we can divide");
                outputArr.push([s[i], s[j]]);
            }
        }
    }
    console.log(outputArr);
    return outputArr.length;
}
Refactored Code:
javascript
Copy code
function birthday(s, d, m) {
    let outputArr = [];
    
    for (let i = 0; i <= s.length - m; i++) { 
        // Sliding window: sum of m consecutive elements starting from i
        let subArray = s.slice(i, i + m);
        let sum = subArray.reduce((acc, val) => acc + val, 0);
        
        if (sum === d) {
            outputArr.push(subArray);
        }
    }
    
    console.log(outputArr);
    return outputArr.length;
}
Key Differences:
Sliding Window Approach:

Original Code: You used two nested loops to check pairs of elements (s[i] and s[j]) and their sum, specifically focusing on pairs of elements with adjacent indices.
Refactored Code: The sliding window approach uses a single loop to create subarrays of size m directly and checks if their sum matches d.
Sum Calculation:

Original Code: You checked the sum of exactly two elements (s[i] + s[j]) and compared it with d.
Refactored Code: The refactored version generalizes this by calculating the sum of m consecutive elements, which makes it more flexible for varying subarray lengths (m).
Condition on Length:

Original Code: You checked if one of the elements (s[i] or s[j]) was equal to m and also ensured that j - i === 1 (elements were adjacent).
Refactored Code: There is no such check because the sliding window inherently handles consecutive elements. The length variable is no longer needed since the window size is defined by m.
Handling Subarrays:

Original Code: You were pushing pairs of elements (s[i] and s[j]) into outputArr.
Refactored Code: The entire subarray is pushed into outputArr, not just pairs. This makes the solution general for any subarray length m.
Generalization:

Original Code: The solution was tailored specifically for pairs of adjacent elements.
Refactored Code: The solution is generalized for any subarray length m, making it more flexible for different problem constraints.
Conclusion:
The refactored code is more flexible, scalable, and easier to adapt to different problem constraints because it uses a sliding window approach rather than focusing on pairs of elements. It eliminates the need for nested loops and makes the logic clearer and more general for varying values of m.

*/
/*
In this challenge, the task is to debug the existing code to successfully execute all provided test files.

Given two strings consisting of digits 0 and 1 only, find the XOR of the two strings.

To know more about XOR Click Here

Debug the given function strings_xor to find the XOR of the two given strings appropriately.

Note: You can modify at most three lines in the given code and you cannot add or remove lines to the code.

To restore the original code, click on the icon to the right of the language selector.

Input Format

The input consists of two lines. The first line of the input contains the first string, , and the second line contains the second string, .

Constraints

Output Format

Print the string obtained by the XOR of the two input strings in a single line.

Sample Input

10101
00101
Sample Output

10000
Explanation

The XOR of the two strings 10101 and 00101 is 
10000 . for this question write a code here process.stdin.on("end", function () {
    // now we can read/parse input
}
*/
// my code is
function exOrOperation(input) {
  // now we can read/parse input
  console.log(input);
  const inputArr = input;
  // console.log(inputArr);//[ '10101', '00101' ]

  const arrays = inputArr.map((el, i, arr) => {
    return [...el];
  });
  console.log(arrays);
  if (arrays.length < 2) {
    console.log("Invalid input, requires at least two binary  strings.");
    return;
  }

  let arr1 = arrays[0];
  let arr2 = arrays[1];
  if (arrays.length - 1 === 2) {
    let arr3 = arrays[2];
  }

  console.log(arr1, arr2);

  let output = [];
  for (let i = 0; i < arr1.length; i++) {
    if (Number(arr1[i]) === 0 && Number(arr2[i]) === 1) {
      output.push(1);
    } else if (Number(arr1[i]) === 1 && Number(arr2[i]) === 0) {
      output.push(1);
    } else {
      output.push(0);
    }
  }
  let reqOutput = output.join("");
  console.log(reqOutput);

  return reqOutput;
}
console.log(exOrOperation(["10101", "00101"]));
console.log(">>>", exOrOperation(["10101", "10101"]));
console.log(">33", exOrOperation(["00101", "10111"]));
// console is
// 10101
// 00101
// [ [ '1', '0', '1', '0', '1' ], [ '0', '0', '1', '0', '1' ] ]
// [ '1', '0', '1', '0', '1' ] [ '0', '0', '1', '0', '1' ]
// 10000
// >>> 00000
// >33 10010
//  for multiple lines
function exOrOperationMul(input) {
  // Log the input to see what we're working with
  console.log(input);

  // Convert each string in the input array to an array of characters
  const arrays = input.map((el) => [...el]);
  console.log("aa", arrays);

  // Check if we have at least two binary strings
  if (arrays.length < 2) {
    console.log("Invalid input, requires at least two binary strings.");
    return;
  }

  // Initialize the result with the first binary string
  let result = arrays[0];

  // Loop through the remaining arrays and XOR each with the result
  for (let i = 1; i < arrays.length; i++) {
    let currentArr = arrays[i];
    let tempResult = [];

    for (let j = 0; j < result.length; j++) {
      // XOR operation: if bits are the same, push 0; if different, push 1
      tempResult.push(Number(result[j]) === Number(currentArr[j]) ? "0" : "1");
    }

    // Update the result with the XOR of the current array
    result = tempResult;
  }

  // Join the array back into a string
  let reqOutput = result.join("");
  console.log(reqOutput);

  return reqOutput;
}

// Test the function with multiple binary strings
console.log("//", exOrOperationMul(["10101", "00101", "11111"])); // Output will be XOR of all three strings
// 01111
console.log("//>>", exOrOperationMul(["10101", "00101", "11111", "01010"])); // Output will be XOR of all three strings
//>> 00101

//writing EX-NOR operation

function exNorOPeration(input) {
  console.log("input", input);
  let inputArrays = input.map((arr) => [...arr]);

  // console.log("////", inputArrays);
  //check input arrays are greater than 2 or not for posible operation

  if (inputArrays.length < 2) {
    return "operation is not possible, requires atleast two binary strings.";
  }

  let result = inputArrays[0];
  // console.log("333", result);

  for (let i = 1; i < inputArrays.length; i++) {
    let tempResult = [];
    let operatingArr = inputArrays[i];
    // console.log("444", operatingArr);

    for (let j = 0; j < result.length; j++) {
      // if (Number(result[j]) === Number(operatingArr[j])) {
      //   tempResult.push(1);
      // } else {
      //   tempResult.push(0);
      // }
      tempResult.push(
        Number(result[j]) === Number(operatingArr[j]) ? "1" : "0"
      );
    }
    result = tempResult;
  }
  // console.log("rr", result);
  return result;
}
console.log("nn1", exNorOPeration(["100101", "110111"]));
console.log("nn2", exNorOPeration(["10101", "00101", "11111"]));
// input [ '100101', '110111' ]
// nn1 [ 1, 0, 1, 1, 0, 1 ]
// input [ '10101', '00101', '11111' ]
// nn2 [ 0, 1, 1, 1, 1 ]

/*
There are two -element arrays of integers, A  and B . Permute them 
into some A' and B'  such that the relation A'[i] + B'[i] >= k  holds for
 all i where 0<=i<n .

There will be  queries consisting of A,B , and k. For each query,
 return YES if some permutation A',B'  satisfying the relation 
 exists. Otherwise, return NO.

Example
 
A = [0,1];
B= [0,2]


A valid A', B'is A' =[1,0]   and : B' =[0,2] 1+0>=1 and 0+2>=1. 
Return YES.

Function Description

Complete the twoArrays function in the editor below. It should
 return a string, either YES or NO.
 parameter(s):

int k: an integer
int A[n]: an array of integers
int B[n]: an array of integers
Returns
- string: either YES or NO

Input Format

The first line contains an integer q, the number of queries.

The next q sets of 3 lines are as follows:

The first line contains two space-separated integers n and  k, 
the size of both arrays A and B, and the relation variable.
The second line contains n space-separated integers A[i] .
The third line contains n space-separated integers B[i].

Sample Input

STDIN       Function
-----       --------
2           q = 2
3 10        A[] and B[] size n = 3, k = 10
2 1 3       A = [2, 1, 3]
7 8 9       B = [7, 8, 9]
4 5         A[] and B[] size n = 4, k = 5
1 2 2 1     A = [1, 2, 2, 1]
3 3 3 4     B = [3, 3, 3, 4]

*/
//this funcitons are correct for not permuted queries.
//but in the question convert the arrays into permuted array and
// then do the operation

function twoArrays(k, A, B) {
  console.log(k, A, B);
  if (k < 0) {
    return "Invalid k value";
  }
  for (i = 0; i < A.length; i++) {
    return A[i] + B[i] >= k ? "YES" : "NO";
  }
}
console.log(twoArrays(10, [2, 1, 3], [7, 8, 9]));
console.log(twoArrays(15, [2, 1, 3], [7, 8, 9]));
console.log(twoArrays(1, [2, 1, 3], [7, 8, 9]));

// 10 [ 2, 1, 3 ] [ 7, 8, 9 ]
// NO
// 15 [ 2, 1, 3 ] [ 7, 8, 9 ]
// NO
// 1 [ 2, 1, 3 ] [ 7, 8, 9 ]
// YES

function processInput(input) {
  console.log("////", input);
  const lines = input.trim().split("\n");
  let result = [];

  for (let i = 0; i < lines.length; i += 3) {
    const [n, k] = lines[i].split(" ").map(Number);
    const A = lines[i + 1].split(" ").map(Number);
    const B = lines[i + 2].split(" ").map(Number);

    result.push(twoArrays(k, A, B));
    // result.push(twoArraysPerm(k, A, B));
  }
  return result;
}

const input = `
5 10
7 6 8 4 2
5 2 6 3 1
3 10
2 1 3
7 8 9
4 5
1 2 2 1
3 3 3 4
`;
console.log("///>>", processInput(input)); //using twoArrays function
///>> [ 'YES', 'NO', 'NO' ]
console.log("perm", processInput(input)); //using twoArraysPerm function for the same input;
//perm [ 'NO', 'YES', 'NO' ]
const input2 = `
3 10
2 1 3
7 8 9
4 5
1 2 2 1
3 3 3 4
`;
// console.log("22>", processInput(input2));

//now write the same function for permutedArray;

// Permuted means changing the position of the elements of the Array
// if you given two arrays both array elements position should not be change in same order
// one should be ascending other should be descending.

function twoArraysPerm(k, A, B) {
  if (k < 0) return "Invalid value of k";

  const C = A.sort((a, b) => a - b);
  const D = B.sort((a, b) => b - a);

  for (let i = 0; i < C.length; i++) {
    if (C[i] + D[i] < k) {
      return "NO";
    }
  }
  return "YES";
}
const twoInput = `

10
[7 6 8 4 2]
[5 2 6 3 1]
`;
// console.log(twoArraysPerm(15, [2, 1, 3], [7, 8, 9]));
// console.log(twoArraysPerm(10, [7, 6, 8, 4, 2], [5, 2, 6, 3, 1]));
// console.log("/////", twoArraysPerm(5, [1, 2, 2, 1], [3, 3, 3, 4]));
//twoArraysPerm ouput
// NO;
// NO;
// NO;

///// NO
// twoArrays fn ouput
// NO;
// NO;
// YES;

//

//

/*
There is a large pile of socks that must be paired by color. Given an array of integers representing the color of each sock, determine how many pairs of socks with matching colors there are.

Example
n= 7 
ar = [1,2,1,2,1,3,2]
There is one pair of color 1 and one of color 2 . There are three odd socks left, one of each color. The number of pairs is 2 .

Function Description

Complete the sockMerchant function in the editor below.

sockMerchant has the following parameter(s):

int n: the number of socks in the pile
int ar[n]: the colors of each sock
Returns

int: the number of pairs
Input Format

The first line contains an integer n , the number of socks represented in ar.
The second line contains n  space-separated integers ar[i], , the colors of the socks in the pile.
constraints: 1<=n<=100, a<= ar[i] <=100 where 0<i<100  Sample Input

STDIN                       Function
-----                       --------
9                           n = 9
10 20 20 10 10 30 50 10 20  ar = [10, 20, 20, 10, 10, 30, 50, 10, 20]

Sample Output

3   for this write a javascript code that could also satisfy some other hidden test cases  
*/
function sockMerchant(n, ar) {
  // Write your code here
  console.log(n, ar);
  let sockCount = {}; //{10,20,20,10,10,30,20,10}
  // sockCount[10]

  let pairs = 0;

  for (let i = 0; i < n; i++) {
    let color = ar[i];
    if (sockCount[color]) {
      sockCount[color]++;
    } else {
      sockCount[color] = 1;
    }
    console.log("//", sockCount);
  }
  for (let count in sockCount) {
    console.log(
      "22",
      count,
      sockCount[count],
      Math.floor(sockCount[count] / 2)
    );
    pairs += Math.floor(sockCount[count] / 2);
  }
  return pairs;
}
PairArrLength = 9;
pairArr = [10, 20, 20, 10, 10, 30, 50, 10, 20];
console.log(sockMerchant(PairArrLength, pairArr));

// { '10': 1 }
// { '10': 1, '20': 1 }
// { '10': 1, '20': 2 }
// { '10': 2, '20': 2 }
// { '10': 3, '20': 2 }
// { '10': 3, '20': 2, '30': 1 }
// { '10': 3, '20': 2, '30': 1, '50': 1 }
// { '10': 4, '20': 2, '30': 1, '50': 1 }
// { '10': 4, '20': 3, '30': 1, '50': 1 }

// 22 10 4 2
// 22 20 3 1
// 22 30 1 0
// 22 50 1 0
// function main() {
//     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

//     const n = parseInt(readLine().trim(), 10);

//     const ar = readLine().replace(/\s+$/g, '').split(' ').map(arTemp => parseInt(arTemp, 10));

//     const result = sockMerchant(n, ar);

//     ws.write(result + '\n');

//     ws.end();
// }

function migratoryBirds(arr) {
  // Write your code here
  console.log(arr);
  let maximumCountIds = {};

  for (let i = 0; i < arr.length; i++) {
    let birdId = arr[i];

    if (maximumCountIds[birdId]) {
      maximumCountIds[birdId]++;
    } else {
      maximumCountIds[birdId] = 1;
    }
  }
  console.log(">>", maximumCountIds);
  //>> { '1': 1, '3': 1, '4': 3, '5': 1 }

  let requiredArr = [];
  for (let key in maximumCountIds) {
    console.log("11", key);

    if (Number(maximumCountIds[key]) > 1) {
      //    console.log("22",key);
      console.log("33", maximumCountIds[key]);
      console.log("///", key);
      requiredArr.push(Number(key));
    }
  }
  console.log(requiredArr);
  const sortedArr = requiredArr.sort((a, b) => a - b);
  console.log(">>", sortedArr);
  const output = sortedArr[0];
  return output;
  // let maximumCountIds = {};

  // // Step 1: Count occurrences of each bird ID
  // for (let i = 0; i < arr.length; i++) {
  //   let birdId = arr[i];
  //   if (maximumCountIds[birdId]) {
  //     maximumCountIds[birdId]++;
  //   } else {
  //     maximumCountIds[birdId] = 1;
  //   }
  // }

  // // Step 2: Find the bird with the highest frequency
  // let mostFrequentBird = null;
  // let highestFrequency = 0;

  // for (let key in maximumCountIds) {
  //   let frequency = maximumCountIds[key];
  //   key = Number(key); // Convert string key to number

  //   // Update if we find a bird with a higher frequency or a tie with a smaller bird ID
  //   if (frequency > highestFrequency || (frequency === highestFrequency && key < mostFrequentBird)) {
  //     mostFrequentBird = key;
  //     highestFrequency = frequency;
  //   }
  // }

  // return mostFrequentBird;
}

console.log("11>", migratoryBirds([1, 4, 4, 4, 5, 3]));
console.log("22>", migratoryBirds([1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 4]));

function migratoryBirds1(arr) {
  let countMap = {}; // To store the frequency of each bird ID

  // Count occurrences of each bird ID
  for (let i = 0; i < arr.length; i++) {
    let birdId = arr[i];
    countMap[birdId] = (countMap[birdId] || 0) + 1;
  }

  let mostFrequentBird = null;
  let highestFrequency = 0;

  // Find the bird with the highest frequency, and in case of a tie, pick the smaller ID
  for (let birdId in countMap) {
    let frequency = countMap[birdId];
    console.log("fff", frequency);
    birdId = Number(birdId); // Convert the string key back to number

    if (
      frequency > highestFrequency ||
      (frequency === highestFrequency && birdId < mostFrequentBird)
    ) {
      mostFrequentBird = birdId;
      highestFrequency = frequency;
    }
  }

  return mostFrequentBird;
}
console.log(migratoryBirds1([1, 4, 4, 4, 5, 3]));

function pageCount(n, p) {
  // // Write your code here
  // console.log(p,n)
  // console.log([1,2,3].includes(2))
  // let pageNumArr=[];
  // //creating page numbers
  // for(let i=0;i<=(n/2);i++){
  //         pageNumArr.push([2*i, 2*i+1])
  // }

  // console.log(pageNumArr)
  // const output = [];
  // //counting from left to right:
  // // const countLeftToRight = pageNumArr.filter((el, i,arr)=>{
  // //     if(arr[i].includes(p)){
  // //         // console.log("fff",i)
  // //         return `${i}`
  // //     }})
  // for(let i=0;i<pageNumArr.length;i++){
  //     if(pageNumArr[i].includes(p)){
  //         console.log(">>",i);
  //         output.push(i)
  //     }
  // }
  // console.log("ooo",output)
  // console.log("left>>",countLeftToRight)
  // for(let i=(pageNumArr.length-1);i>=0;i--){
  //     if(pageNumArr[i].includes(p)){
  //         console.log("///",i,pageNumArr.length-i-1)
  //         output.push(pageNumArr.length-i-1);
  //     }
  // }
  // const minLength = output.sort((a,b)=>a-b);
  // console.log(minLength)
  // return minLength[0];
  // // i=0 >> 1
  // // i=1 >> 2,3
  // // i=2 >> 4,5
  // // i=3 >> 6,7
  // // i=4 >> 8,9
  // // i=5 >> 10,11
  const front = Math.floor(p / 2);
  const back = Math.floor(n / 2 - p / 2);

  console.log(front, back);
  return Math.min(front, back);
}
console.log(pageCount(15, 3));
console.log(pageCount(16, 3));

function processData1(input) {
  //Enter your code here

  const [i, n, array] = input.split("\n");
  // console.log(i,n, array);
  // console.log(typeof i, typeof n, typeof array);
  // console.log(array.split(" ").reverse().join(" "))
  const permutedArr = array.split(" ");
  console.log(permutedArr);
  let k = Math.floor((Number(n) + 1) / 2);
  console.log("kk", k);
  const outputArr = [];
  // const output = permutedArr.map((el,i, arr)=>{
  //     let ele;
  //     if(arr[i]<arr[i+1] && i<(k-1)){
  //         return arr[i];
  //     }else if(arr[i]< arr[i+1] && i>k){
  //         ele = arr[i+1];
  //         return ele;
  //     }else{
  //         ele = arr[i];
  //         return ele;
  //     }
  // })
  // console.log(output)
  for (let i = 0; i < k - 1; i++) {
    console.log(i);
    if (permutedArr[i] < permutedArr[i + 1]) {
      outputArr.push(permutedArr[i]);
    } // }else{
    //     permutedArr[i] =permutedArr[i+1];
    //     outputArr.push(permutedArr[i]);
    // }
  }
  for (let i = permutedArr.length - 1; i >= k - 1; i--) {
    console.log(">>", i);
    console.log(permutedArr[i]);
    let ele;
    if (permutedArr[i] > permutedArr[i - 1]) {
      ele = permutedArr[i];
      outputArr.push(ele);
    } else {
      ele = permutedArr[i - 1];
      outputArr.push(ele);
    }
  }
  console.log("ooo", outputArr.join(" "));
  return outputArr.join(" ");
}
const input1 = `1
7
1 2 3 4 5 6 7
`;
const input21 = `1
5
2 3 5 1 4`;
console.log(processData1(input1));
console.log(processData1(input21));
// A left rotation operation on an array of size n  shifts
//  each of the array's elements 1  unit to the left. Given an
//   integer, d, rotate the array that many steps left and return
//   the result.
// ex
// d=2
// arr= [1,2,3,4,5];
// // after 2 iterations
// // arr' = [3,4,5]

//d = 2 means two elements need to rotate to left
//d = 3 means three elements need to rotate to left

//if d = 3, after 3 iterations
function leftRotation(d, arr) {
  if (d > arr.length - 1) {
    return "rotation is not possible";
  }
  // arr.forEach((el, i, arr) => {
  //   // console.log(i, el);
  //   let k;
  //   let ouput;
  //   while (i > 0) {
  //     output = arr[arr.length - d];
  //   }
  //   console.log("//", ouput);
  // });
  // for (let i of arr) {
  //   console.log(i, arr);
  //   let d = i;
  //   console.log(arr[i]);
  // }
  // function leftRotation(d, arr) {

  // let output = [];
  // for (let i = d; i < arr.length; i++) {
  //   output.push(arr[i]);
  // }
  // console.log(d);
  // while (d > 0) {
  //   output.push(arr[d - 1]);
  //   d--;
  // }
  // console.log(">>", output);
  const requiredOutput = arr.slice(d).concat(arr.slice(0, d));
  console.log("rr", requiredOutput);

  //or

  // const output1 = arr.filter((_, i, arr) => i >= d);
  const output1 = arr.filter((el, i, arr) => {
    if (i >= d) {
      return arr[i];
    }
  });
  console.log(output1);
  const output2 = arr.filter((_, i, arr) => i < d);
  // const output2 = arr.filter((el, i, arr) => {
  //   if (i < d) {
  //     return arr[i];
  //   }
  // });
  // console.log("22", output2);
  console.log(output1.concat(output2));
  // or
  //using for of loop
  // in for loop we cannot write index and arr like thid for(let [el,i,arr]){}
  let index = 0;
  let result1 = [];
  for (const el of arr) {
    if (index < d) {
      //0,1,2,3,4 :2
      result1.push(el);
    }
    index++;
  }
  //reset index
  index = 0;
  let result2 = [];
  for (const el of arr) {
    if (index >= d) {
      result2.push(el);
    }
    index++;
  }
  // console.log("forOf loop:", result1, result2);
  console.log("for of loop", d, result2.concat(result1));

  console.log("using for in loop");
  let result3 = [];
  let result4 = [];
  for (const i in arr) {
    // console.log(i); //0 1 2 3 4
    if (i < d) {
      result3.push(arr[i]);
    } else {
      result4.push(arr[i]);
    }
  }
  console.log("for in loop:", d, result4.concat(result3));
}
leftRotation(2, [1, 2, 3, 4, 5]);
leftRotation(4, [1, 2, 3, 4, 5]);
leftRotation(5, [1, 2, 3, 4, 5]);
leftRotation(6, [1, 2, 3, 4, 5]);
// d =1 ,o/p>> [2,3,4,5,1]
// d = 2, o/p >> [3,4,5,1,2];
// //make arry of length

// light 200,
//  dall 160,
// dustbin 100,
// sinkcleaner 100,
// soap 85,
// anna 200,

function calcIntrest(principle, totalMoney, years) {
  // totalMoney = principle+interest
  // interest = % of interest/yannam * totalYears
  const interest = totalMoney - principle;
  const oneYearIntrest = interest / years;

  // const percentageIntrest =
}
// A numeric string, , is beautiful if it can be split
//  into a sequence of two or more positive integers,a[1],
//  a[2],...,a[n] , satisfying the following conditions:

//  1. a[i] - a[i-1] = 1 for any1<i<=n  (i.e., each element
// in the sequence is 1 more than the previous element).
// 2. No a[i] contains a leading zero. For example,s = 10203
// we can split  into the sequence{1,02,03} , but it is not beautiful because 02 and 03  have leading zeroes.
// 3. The contents of the sequence cannot be rearranged.
// For example,s = 312 we can split  into the sequence
//  {3,1,2} , but it is not beautiful because it breaks
// our first constraint (i.e.,  1 -3 != 1).  Perform q
// queries where each query consists of some integer string
// s . For each query, print whether or not the string is beautiful
//  on a new line. If it is beautiful, print YES x, where x  is the first
// number of the increasing sequence. If there are multiple such values of ,
// x choose the smallest. Otherwise, print NO.

function isBeautiful(s) {
  //try different lengths of first number(upto half the length of the string)
  // let s = "1234"
  for (let length = 1; length <= Math.floor(s.length / 2); length++) {
    // let firstNum = parseInt(s.slice(0, length),10);
    let firstNum = parseInt(s.substring(0, length), 10); // 1
    let valid = true;
    let expectedNum = firstNum; //1
    let i = length; // 1, s.length = 4

    //check if the rest of the string follws the pattern
    while (i < s.length) {
      expectedNum++; //2
      const expectedStr = expectedNum.toString();
      const expectedLen = expectedStr.length; //1

      if (s.substring(i, i + expectedLen) !== expectedStr) {
        // s.substring(1,(1+1) !== "12")
        // "1234".substring(1,2) !== "12";
        //  "12" !== "12"
        valid = false;
        break;
      }
      i += expectedLen;
    }
    // If valid seqence found, return YES with the first number
    if (valid) {
      return `YES ${firstNum}`;
    }
  }
  //if no valid sequence found, return  NO
  return "NO";
}
function beautifulStrings(queries) {
  return queries.map(isBeautiful);
}
const queries1 = ["1234", "91011", "99100", "101103", "010203"];
const results = beautifulStrings(queries1);
results.forEach((result) => console.log(result));

// console.log("ramesh".substring(0, 2));
// console.log("ramesh".substring(0, 2), 10);
// console.log(parseInt("123".substring(0, 2), 10));
// console.log(parseInt("123".slice(0, 2), 10));
function closestNumbers(arr) {
  // Write your code here
  // console.log(arr)
  const sortArr = arr.sort((a, b) => a - b);

  // let diffArr= [];
  let minDiff = Infinity;
  let output = [];
  let diff;

  for (let i = sortArr.length - 1; i > 0; i--) {
    diff = sortArr[i] - sortArr[i - 1];
    // 1.       = 10
    // 2.       = 20
    console.log("d", diff);
    if (diff < minDiff) {
      minDiff = diff;
      //minD = 10;
      console.log("oo", sortArr[i], sortArr[i - 1]);
    } else if (diff === minDiff) {
      console.log([sortArr[i], sortArr[i - 1]]);
    }

    // diffArr.push(diff);
  }
  console.log("ddd", diff);

  sortArr.forEach((el, i, arr) => {
    if (arr[i + 1] - el === diff) {
      output.push(el, arr[i + 1]);
    }
  });
  console.log(output);
  return output;
  // let minDiff = Infinity;
  // let output = [];
  // for(let i=1;i<arr.length;i++){
  //     let diff = sortArr[i-1]-sortArr[i];

  //     if(diff<minDiff){
  //         minDiff = diff
  //         output = [sortArr[i-1],sortArr[i]]
  //     }else if(diff === minDiff){
  //         output.push(sortArr[i-1], sortArr[i])
  //     }
  // }
  // return output;
}

function closestNumbers(arr) {
  // Write your code here
  // console.log(arr)
  const sortArr = arr.sort((a, b) => a - b);

  let diffArr = [];
  let diff = 0;
  let output = [];

  for (let i = sortArr.length - 1; i > 0; i--) {
    diff = sortArr[i] - sortArr[i - 1];
    diffArr.push(diff);
  }
  const diffrence = diffArr.sort((a, b) => a - b)[0];
  console.log(diffrence);
  sortArr.forEach((el, i, arr) => {
    if (arr[i + 1] - el === diffrence) {
      output.push(el, arr[i + 1]);
    }
  });
  console.log(output);
  return output;
  // let minDiff = Infinity;
  // let output = [];
  // for(let i=1;i<arr.length;i++){
  //     let diff = sortArr[i-1]-sortArr[i];

  //     if(diff<minDiff){
  //         minDiff = diff
  //         output = [sortArr[i-1],sortArr[i]]
  //     }else if(diff === minDiff){
  //         output.push(sortArr[i-1], sortArr[i])
  //     }
  // }
  // return output;
}

// Write your code here
// Two players are playing a game of Tower Breakers! Player 1  always moves first, and both players always play optimally.The rules of the game are as follows:

// Initially there are n towers.
// Each tower is of height m.
// The players move in alternating turns.
// In each turn, a player can choose a tower of height x and reduce its height to y, where 1<y<=x and y evenly divides x.
// If the current player is unable to make a move, they lose the game.
// Given the values of n and m, determine which player will win. If the first player wins, return 1. Otherwise, return 2.
function towerBreakers(n, m) {
  // console.log(n, m);
  if (m === 1) {
    return 2;
  }
  if (n % 2 === 0) {
    return 2;
  }
  return 1;
}
console.log("++++++");
console.log(towerBreakers(2, 4));
console.log(towerBreakers(2, 4));
console.log(towerBreakers(3, 1));
console.log(towerBreakers(3, 2));
// 2
// 2
// 2
// 1
// Explanation:
// 1. If m === 1: The first player has no valid moves, so the second player automatically wins.
// 2. If n % 2 === 0: With an even number of towers, the second player can mirror the first player's
// moves and win the game by reducing the last remaining towers to the smallest possible value.
// 3. If n % 2 !== 0: With an odd number of towers, the first player can always make the first move on
//  one of the towers, leaving the second player in a situation where they can't mirror, eventually
// leading to the first player's victory.

//here the second statment is taken in consider because
//lets say we have even no of towers
//if player1 moves first for total units of one tower then player2 will also move for same no of units of second tower
// so that player1 cannot make move, and hence player 2 will become winner.

// lets say we have odd no of towers
//if player1 moves for total units of tower then player 2 also do for second tower and they left with 1 more tower
// for that tower player1 has to make a move and he will make for entire tower units hence
// player 2 not have any more moves hence he loss

// so  if(n%2 === 0) player 2 will win if player 1 will start the game
