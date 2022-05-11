"use strict";
let classes = ["first", "second" , "third", "fourth", "fifth", "sixt", "sevent", "eight", "nine", "tenth", "eleven", "twelve", "thirhteen", "fourtheen", "fiftteen", "sixteen", "seventeen", "eightteen", "nineteen", "twenty", "twentyone", "twentytwo", "twentythird", "twentyfour"]
let timeperiod;
let months30Days = ["3", "5", "8", "10"]
let months31Days = ["0", "2", "4", "6", "7", "9"]
let url;
let appointments = new Object()
let appointmentChooser = document.getElementById("appointmentChooser")

setLeftTable()
setWeekTable()

// changeDate()

document.getElementById("table").style.display = "none";
document.getElementById("datePicker").addEventListener("change", setWeekTable)
document.getElementById("delete").addEventListener("click", deleteAppointment)


function getAppointments(){
    let data = new FormData();
    data.append('test', "test");


    const xhr = new XMLHttpRequest();
    xhr.open("POST","/getAppointments?startdate=2022-04-17&enddate=2022-04-24");

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));

    xhr.onload = function() {
        appointments = JSON.parse(xhr.response)
        let number = Object.sizes(appointments)
        for (let i = 0; i<number; i++){
            setRightTableElement(appointments[i])
            setOptionAppointment(appointments[i])
        }
        console.log(appointments)
    }
}

function setOptionAppointment(appointment){
    // let select = document.getElementById("appointmentChooser")
    let option = document.createElement("option")
    option.value = appointment.id 
    option.text = appointment.startdate + " " +  appointment.starttime + " " +appointment.title
    // option.setAttribute("id", appointment.id)
    appointmentChooser.add(option)
}

function setRightTableElement(appointment){
    let tableclass = getTableClass(appointment.startdate, appointment.starttime)
    let template = document.getElementById("templateAppointment").content
    let copyHTML = document.importNode(template, true)
    copyHTML.querySelector("#appointment").textContent = appointment.starttime + "-" + appointment.endtime + " " + appointment.title
    copyHTML.querySelector("#appointment").classList.add(tableclass)
    let categoryClass = getCategoryColor(appointment.category)
    copyHTML.querySelector("#appointment").classList.add(categoryClass)
    // let button = document.createElement("button")
    // button.setAttribute("id")
    document.getElementById("week").appendChild(copyHTML)
}

function getCategoryColor(category){
    if(category == "Family"){
        return "family"
    }else if (category == "Friends"){
        return "friends"
    }else if (category == "Doctor") {
        return "doctor"
    }else if(category == "Sports") {
        return "sports"
    }else if(category == "Other"){
        return "other"
    }
}

function getTableClass(day, time) {
    return getFristClass(day)+getSecondClass(time)
}

function getFristClass(day) {
    let Day = new Date(day).getDay()
    return classes[Day]
}

function getSecondClass(time) {
    let help = time.split(":")
    let number = parseInt(help[0])
    return classes[number-1]
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

function deleteAppointment(){
    console.log(appointments)
    let appointmentId = document.getElementById("appointmentChooser").value
    let appointmentIndex = document.getElementById("appointmentChooser").selectedIndex
    let appointment = getAppointmentFromId(appointmentId)
    console.log(appointment)
    let data = new FormData();
    data.append('test', "test");


    const xhr = new XMLHttpRequest();
    xhr.open("POST","/delete?id=" + appointmentId);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));

    xhr.onload = function() {
        console.log(appointmentIndex)
        // console.log(xhr.response)
        if (xhr.status == 200){
            appointmentChooser.remove(appointmentIndex)
            let className = getTableClass(appointment.startdate, appointment.starttime)
            document.getElementsByClassName(className)[0].remove()
            // $("#select1 option[value='basic']").remove(); 
        }
    }
}



function getAppointmentFromId(id){
    for (let i = 0; i<Object.sizes(appointments); i++){
        console.log(appointments[i].id)
        if(appointments[i].id == id){
            return appointments[i]
        }
    }
}

function changeDate() {
    let inputtime = document.getElementById("datePicker").value
    // console.log(inputtime)
    let askDate = new Date(inputtime)
    // console.log(askDate)
    let day = askDate.getDay()
    // console.log(day)
    url = geturl(day, askDate)
}

function geturl(day, askDate){
    let startDay = getStartDay(day, askDate)
    let endDay = getEndDay(startDay)
    // console.log(startDay + "\n" + endDay) 
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
            // console.log("else")
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
    // console.log(startDay)   
    let helpDate = new Date(startDay)
    // console.log(helpDate)
    helpDate = new Date(helpDate.getFullYear(), helpDate.getMonth(), helpDate.getDate()+7).toISOString()
    let arrayDate = helpDate.split("T")
    return arrayDate[0]
}

//Count elements of Objekt
Object.sizes = function(obj){
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
             size++;
    }
    return size;
};