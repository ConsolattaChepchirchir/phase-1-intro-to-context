//createEmployeeRecord
function createEmployeeRecord(data) {
/* populates a firstName field from the 0th element
 populates a familyName field from the 1th element
 populates a title field from the 2th element
 populates a payPerHour field from the 3th element
 initializes a field, timeInEvents, to hold an empty Array
 initializes a field, timeOutEvents, to hold an empty Array*/
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// process an Array of Arrays into an Array of employee records
//has a function called createEmployeeRecords

function createEmployeeRecords(data) {
    return data.map(subArray => createEmployeeRecord(subArray));
}
//this adds a timeIn event Object to an employee's record of timeInEvents 
//when provided an employee record and Date/Time String and returns the updated record

function createTimeInEvent(record, timeIn) {
    let [ date, hour ] = timeIn.split(" ");//this splits a string into an array of substrings
    hour = parseInt(hour);
    record.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: date,
    });
    return record;
}
//adds a timeOut event Object to an employee's record of timeOutEvents
// when provided an employee record and Date/Time String and returns the updated record

function createTimeOutEvent(record, timeOut) {
    let [ date, hour ] = timeOut.split(" ");
    hour = parseInt(hour);// the hour as an interger
    record.timeOutEvents.push({//update 
        type: "TimeOut",
        hour: hour,
        date: date,
    });
    return record;
}
//calculates the hours worked when given an employee record and a date
//having record and date as our variables
function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(event => {
        return event.date === date;
    })
    const timeOut = record.timeOutEvents.find(event => {
        return event.date === date;
    })
    return (timeOut.hour - timeIn.hour)/100;//lets now calculate the hours worked
}
//calculates that the employee earned 54 dollars
function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}
//calculates that the employee earned 378 dollars
//we expect it to calculate 54 dollars of on date * by the days of the week , which is 54*7
function allWagesFor(record) {
    const reducer = (accumulator, timeIn) => accumulator + wagesEarnedOnDate(record, timeIn.date);
    return record.timeInEvents.reduce(reducer, 0);
}
// this calculate the payroll records expected 770 dollars
//returns all the data
function calculatePayroll(records) {
    const reducer = (accumulator, record) => accumulator + allWagesFor(record);
    return records.reduce(reducer, 0);
}
// this returns data needed in the array
function findEmployeeByFirstName(employes, name) {
    return employes.find(emp => emp.firstName === name);
}