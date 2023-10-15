// Your code here
function createEmployeeRecord(employeeArray){
    if (employeeArray.length > 0){
        const employeeRecord = {
            firstName: employeeArray[0],
            familyName: employeeArray[1],
            title: employeeArray[2],
            payPerHour: employeeArray[3],
            timeInEvents:[],
            timeOutEvents:[]
        }
        return employeeRecord
    } else {
        console.log('Error: empty array provided for employeedata.')
        return null
    }
} 

const createEmployeeRecords = function(employeeRowData){
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(employee, dataStamp){
    let[date, hour] = dataStamp.split(' ')
   
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function createTimeOutEvent (employee, dataStamp){
    let [date, hour] = dataStamp.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour:parseInt(hour, 10),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

const employee = {
    timeInEvents: [
      { date: "2023-10-15", hour: 900 }, 
    ],
    timeOutEvents: [
      { date: "2023-10-15", hour: 1100 }, 
    ],
  };
  
  const soughtDate = "2023-10-15";  
  const hoursWorked = hoursWorkedOnDate(employee, soughtDate);
  
  if (hoursWorked === 2) {
    console.log("The employee worked 2 hours on the specified date.");
  } else {
    console.log("The employee did not work 2 hours on the specified date.");
  }
  

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())}

    let allWagesFor = function(employee){
        let eligibleDates = employee.timeInEvents.map(function(e){
            return e.date
        })
    
        let payable = eligibleDates.reduce(function(memo, d){
            return memo + wagesEarnedOnDate(employee, d)
        }, 0)
    
        return payable
    }
    
    let findEmployeeByFirstName = function(srcArray, firstName) {
      return srcArray.find(function(rec){
        return rec.firstName === firstName
      })
    }
    
    let calculatePayroll = function(arrayOfEmployeeRecords){
        return arrayOfEmployeeRecords.reduce(function(memo, rec){
            return memo + allWagesFor(rec)
        }, 0)
    }