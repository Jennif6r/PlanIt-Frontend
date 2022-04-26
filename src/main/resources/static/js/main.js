"use strict";
let classes = ["first", "second" , "third", "fourth", "fifth", "sixt", "sevent", "eight", "nine", "tenth", "eleven", "twelve", "thirhteen", "fourtheen", "fiftteen", "sixteen", "seventeen", "eightteen", "nineteen", "twenty", "twentyone", "twentytwo", "twentythird", "twentyfour"]
let timeperiod;
let months30Days = ["3", "5", "8", "10"]
let months31Days = ["0", "2", "4", "6", "7", "9"]
let url;

setLeftTable()
setWeekTable()

document.getElementById("datePicker").addEventListener("change", changeDate)
changeDate()

function getAppointments(){
    let data = new FormData();
    data.append('test', "test");


    const xhr = new XMLHttpRequest();
    xhr.open("POST","/getAppointments?startdate=2022-04-17&enddate=2022-04-24");

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));

    xhr.onload = function() {
        console.log(xhr.status);
        console.log(xhr.response);
    }
}

function setLeftTable() {
    let timestamp = 1;
    let tableclass;
    let text;
    for (let i=0; i<11; i++) {
        tableclass = classes[0]+classes[i]
        text = timestamp+" AM:"
        timestamp++
        setLeftTableElement(text, tableclass)
    }
    tableclass = classes[0]+classes[11]
    text = timestamp+" PM:"
    setLeftTableElement(text, tableclass)
    timestamp=1;
    for (let i=12; i<23; i++){
        let tableclass = classes[0]+classes[i]
        let text = timestamp+" PM:"
        timestamp++
        setLeftTableElement(text, tableclass)
    }
    tableclass = classes[0]+classes[23]
    text = timestamp+" AM:"
    setLeftTableElement(text, tableclass)
}

function setLeftTableElement(text, tableclass) {
    let template = document.getElementById("templateWeek").content
    let copyHTML = document.importNode(template, true)
    copyHTML.querySelector("#time").textContent = text
    copyHTML.querySelector("#time").classList.add(tableclass)
    document.getElementById("week").appendChild(copyHTML)
}

function setWeekTable() {
    getAppointments()
}

function changeDate() {
    let inputtime = document.getElementById("datePicker").value
    console.log(inputtime)
    let askDate = new Date(inputtime)
    console.log(askDate)
    let day = askDate.getDay()
    console.log(day)
    url = geturl(day, askDate)
}

function geturl(day, askDate){
    let startDay = getStartDay(day, askDate)
    let endDay = getEndDay(startDay)
    console.log(startDay + "\n" + endDay) 
    return "/getAppointments?startdate=" + startDay + "&enddate=" + endDay
}

function getStartDay(day, askDate) {
    if (day == 1){
        let helpdate = askDate.toISOString()
        let arrayDate =helpdate.split("T")
        return arrayDate[0]
    }
    else {
        //kein monatswechsel
        if (day < askDate.getDate()){
            let dayOfMonth
            if (day == 0){
                dayOfMonth = askDate.getDate() - 5;
            }else{
                dayOfMonth = askDate.getDate() - day + 2;
            }
            // console.log(askDate.getFullYear(), askDate.getMonth() +1);
            // console.log(askDate.getDate() + 1);
            // console.log(dayOfMonth);
            let helpdate = new Date(
                askDate.getFullYear(),
                askDate.getMonth(),
                dayOfMonth
                ).toISOString();
            let arrayDate = helpdate.split("T")
            return arrayDate[0]
        }
        //monatswechsel
        else{
            console.log("else")
            let helpMonth = (askDate.getMonth() - 1).toString()
            let actualDay = askDate.getDate()
            if (months31Days.includes(helpMonth)){
                return getMonthoverflow(31, actualDay, askDate)
            }else if(months30Days.includes(helpMonth)){
                return getMonthoverflow(30, actualDay, askDate)
            }else if(helpMonth == "11") {
                let helpdate = new Date(askDate.getFullYear()-1, 1, actualDay + 31 -6)
            }else {

            }
        }
    }
}

function getMonthoverflow(number, actualDay, askDate){
    let helpdate = new Date(askDate.getFullYear(), askDate.getMonth() -1, actualDay + number - 4 ).toISOString()
    let arrayDate = helpdate.split("T")
    return arrayDate[0]    
}

function getEndDay(startDay){
    console.log(startDay)   
    let helpDate = new Date(startDay)
    console.log(helpDate)
    helpDate = new Date(helpDate.getFullYear(), helpDate.getMonth(), helpDate.getDate()+7).toISOString()
    let arrayDate = helpDate.split("T")
    return arrayDate[0]
}