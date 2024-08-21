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
  const binaryIn32Bit = binaryNumber.padStart(32, 0);
  // console.log("3232bi", binaryIn32Bit);
  const arrOf32bit = [...binaryIn32Bit];
  // console.log("3232arr", arrOf32bit);
  const flipBitsArr = arrOf32bit.map((el) =>
    el === "0" ? 1 : el === "1" ? 0 : ""
  );
  // console.log("flipBb", flipBitsArr);
  const flipBitsInString = flipBitsArr.join("");
  // console.log("flipStr ", flipBitsInString);
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
// in the above calculation 3 is length of the row or length of the matrix, 1 is standard value and
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
// mm [ [ 11, 2, -3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
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
console.log(countingValleys1(10, "UUDDDUDUDD"));
//

///

/// ****************************************************************************

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
I have document like this, I want to create a index called text index on gender,  I created index like {gender:1}, then in the disc how the mongodb will create the indexed collection for gender as the gender is male and female and index is text index
ChatGPT said:
ChatGPT
When you create an index in MongoDB, such as { gender: 1 }, it's a B-tree index rather than a text index. Let's break down what this means and how it behaves:

1. Creating a B-tree Index on gender:
When you create an index like { gender: 1 }, MongoDB organizes the values in a B-tree structure. This index allows for efficient querying of the gender field.
The 1 specifies that the index is in ascending order. If you used -1, it would be descending.
2. How MongoDB Stores Indexed Data:
For the gender field, MongoDB will store the field values (e.g., "male", "female") in a sorted manner in the B-tree.
The index will map these sorted values to their corresponding document locations on disk.
3. What Happens in the B-tree Index:
If you have documents with gender values like "male" and "female", the B-tree index will contain entries like this:
rust
Copy code
"female" -> ObjectId("66c34517ad083f11eb00a05e")
"male"   -> ObjectId("66c34517ad083f11eb00a05f")
This allows MongoDB to quickly locate all documents where gender is "male" or "female" by traversing the index rather than scanning the entire collection.
4. Text Indexes vs. B-tree Indexes:
A text index in MongoDB is different and is used for full-text search, allowing you to search within string content across multiple fields.
Creating a text index looks like this:
javascript
Copy code
db.collection.createIndex({ gender: "text" });
Text indexes are typically used for search functionality, like finding documents that contain specific keywords.
5. Behavior on Disk:
B-tree Index (like {gender: 1}): The index is stored as a B-tree, where each node represents a range of values, making searches for specific values (like "male" or "female") very fast.
Text Index: If you created a text index on gender, MongoDB would tokenize the values and store them in a format optimized for text search. However, a text index on a simple field like gender is less common since gender typically contains discrete values (like "male" or "female").
6. Example Query Using the Index:
After creating the B-tree index on gender, you could run:
javascript
Copy code
db.collection.find({ gender: "male" });
MongoDB would use the index to quickly locate all documents where gender is "male".
Summary:
B-tree Index: Efficient for equality checks on discrete values (e.g., "male", "female").
Text Index: More suitable for full-text searches across large textual content.
If you intended to create a text index for searching within text content, you would use {gender: "text"}, but for most use cases involving discrete values like gender, a B-tree index {gender: 1} is appropriate.


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
//using same index for finding gener based
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

//BUT NOT WORK AS  //*********************************************************** */
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
]; //**************************************************************** */
//  I have indexes like this, but I want to create a index on only for males
// like indexName: gender_male instead of gender_1 can I do like that

// In MongoDB, indexes are created on fields, not on specific values within
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
// 	"errmsg" : "Index build failed: 8ec660c0-8170-4266-a47e-b7a264e86682: Collection practice.persons ( d695c41e-45c7-4665-a681-c479f3c8ac4e ) :: caused by :: E11000 duplicate key error collection: practice.persons index: email_1 dup key: { email: null }",
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
docs wher gender is anything other than 'male' or where gender is not present
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
	"errmsg" : "Error in specification { key: { email: 1.0 }, name: \"email_1\", partialFilteExpression: { email: { $exits: true, $eq: null } } } :: caused by :: The field 'partialFilteExpression' is not valid for an index specification. Specification: { key: { email: 1.0 }, name: \"email_1\", partialFilteExpression: { email: { $exits: true, $eq: null } } }",
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
    "errmsg" : "Error in specification { key: { email: 1.0 }, name: \"email_1\", partialFilterExpression: { email: { $exists: true, $ne: null } }, v: 2 } :: caused by :: Expression not supported in partial index: $not\n    email $eq null\n",
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
// INDEXES AND AS WE MENTIONED IT WORKS ON DTA OBJECTS ONLY.
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
but iif wrote query like this mongodb using collection scan even I have indexes db.persons.getIndexes()
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
// Ensure that the winningPlan section shows an IXSCAN stage indicating that the index is being used.

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
// { "_id" : ObjectId("66c34517ad083f11eb00a05e"), "name" : { "title" : "miss", "first" : "sandra", "last" : "lorenzo" }, "dob" : { "date" : "1975-03-23T17:01:45Z", "age" : 43 } }
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
          
              in the query  i made _id:0 , the totalDocsExamined:1 but it has to come for 1 right, then why it is came 1, here iam working on covered query 
ChatGPT said:
ChatGPT
In MongoDB, a "covered query" is a query where the fields requested in the query and the fields returned are all present in the index used. This means that MongoDB can satisfy the query using only the index and doesn't need to fetch the actual documents from the collection, which can improve performance.

In your case, you are querying with {"name.first": "sandra", "name.last": "lorenzo"} and projecting only the name field while excluding _id. The query uses an index on name.first and name.last, and the executionStats indicates that:

totalKeysExamined: 1 — This reflects that MongoDB examined one key from the index.
totalDocsExamined: 1 — This indicates that even though it’s a covered query, MongoDB still had to look at one document.
This can happen because while the index covers the fields needed for the query, the query engine still needs to validate the documents in the index to ensure they match the query criteria. In this case, the document matching the query condition was examined to confirm it meets the criteria.

So, despite the query being covered, MongoDB may still examine the document associated with the index key to ensure it matches the query's conditions. This is why totalDocsExamined shows 1 even in a covered query.

then how can i make the totalDocsExamined:0
To ensure that totalDocsExamined is 0 in a covered query, you need to ensure that your query is fully covered by the index, meaning that MongoDB should be able to answer the query using only the index data without needing to fetch the actual documents.
*/
//
//**************************************************************************** */
// Since your index is name.first_1_name.last_1, it’s already covering the query. However,
//  you need to ensure that the projection is also covered.

db.persons.createIndex({ "name.first": 1, "name.last": 1, name: 1 });
