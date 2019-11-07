let createEmployeeRecord = array => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = arr => {
    return arr.map(record => createEmployeeRecord(record))
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return this
}

let hoursWorkedOnDate = function(dateStamp) {
    let timeIn = this.timeInEvents.find(timeIn => timeIn.date === dateStamp).hour
    let timeOut = this.timeOutEvents.find(timeOut => timeOut.date === dateStamp).hour
    return (timeOut - timeIn) / 100
}

let wagesEarnedOnDate = function(dateStamp) {
    let wage = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
    return wage
}


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(record => record.firstName === firstName)
}

let calculatePayroll = employeeArray => {
    return employeeArray.map(employeeRecord => allWagesFor.call(employeeRecord)).reduce((a,b) => a + b, 0)
}