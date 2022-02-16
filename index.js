// I have done this using simple logic. I have not used any data structure.
// Although I also do Competitive Programming in C++ .

var fs = require("fs");

const readFile = fs.readFile;
const writeFile = fs.writeFile;

let json = require('./2-input.json');
let expenseArray = json.expenseData;
let revenueArray = json.revenueData;

let arr = [];
let brr = [];

var minDate = "9999-99-01T00:00:00.000Z";
var maxDate = "0000-00-01T00:00:00.000Z";

for ( let i=0; i<revenueArray.length; i++ ){
    if (maxDate<revenueArray[i].startDate)  maxDate=revenueArray[i].startDate;
    if (minDate>revenueArray[i].startDate)  minDate=revenueArray[i].startDate;
    for (let j=i+1; j<revenueArray.length; j++ ){
        if (revenueArray[j].startDate===revenueArray[i].startDate) {
            revenueArray[i].amount+=revenueArray[j].amount;
            revenueArray[j].amount=0;
        }
    }
    arr.push(revenueArray[i]);
}

for ( var i=0; i<expenseArray.length; i++ ){
    var x = 0;
    if (maxDate<expenseArray[i].startDate)  maxDate=expenseArray[i].startDate;
    if (minDate>expenseArray[i].startDate)  minDate=expenseArray[i].startDate;
    for (var j=0; j<arr.length; j++ ){
        if (arr[j].startDate===expenseArray[i].startDate) {
            arr[j].amount+= -1*expenseArray[i].amount;
            x=1;
        }
    }
    if (x===0)  {
        expenseArray[i].amount = -1*expenseArray[i].amount;
        arr.push(expenseArray[i]);
    }
}

var x = Number(minDate[5])*10+Number(minDate[6]);
var y = Number(minDate[0])*1000+Number(minDate[1])*100+Number(minDate[2])*10+Number(minDate[3]);

// console.log(minDate);
// console.log(maxDate);

while(minDate<maxDate){
    if (x<10)  minDate = y+"-0"+x+"-01T00:00:00.000Z";
    else  minDate = y+"-"+x+"-01T00:00:00.000Z";
    // console.log(minDate);
    var count = 0;
    for ( var i=0; i<arr.length; i++ ){
        if (arr[i].startDate==minDate)  {
            brr.push(arr[i]);
            count=1;
            break;
        }
    }
    if (count===0) {
        brr.push({"amount": 0, "startDate": minDate});
    }
    if (x==12){
        x=0;
        y=y+1;
    }
    x=x+1;
}

console.log(brr);
