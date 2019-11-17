/* Your Code Here */


function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title:employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents : [],
        timeOutEvents : []
    }
}

function createEmployeeRecords(employeeDB){
    return employeeDB.map(createEmployeeRecord)
}

function createTimeInEvent(dateTimeStr){
    this.timeInEvents.push({
        type:"TimeIn",
        date:dateTimeStr.split(" ")[0],
        hour:parseInt(dateTimeStr.split(" ")[1])
    })
    return this
}

function createTimeOutEvent(dateTimeStr){
    this.timeOutEvents.push({
        type:"TimeOut",
        date:dateTimeStr.split(" ")[0],
        hour:parseInt(dateTimeStr.split(" ")[1])
    })
    return this
}

function hoursWorkedOnDate(dateStr){
    let timeInObj = this.timeInEvents.find(timeIn=>timeIn.date == dateStr)
    let timeOutObj = this.timeOutEvents.find(timeOut=>timeOut.date==dateStr)
    return (timeOutObj.hour-timeInObj.hour)/100
}

function wagesEarnedOnDate(dateStr){
    return hoursWorkedOnDate.call(this,dateStr)*this.payPerHour
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee=>employee.firstName==firstName)
}

function calculatePayroll(srcArray){
    return srcArray.reduce(function(wages, employee ){
        return wages+ allWagesFor.call(employee)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}