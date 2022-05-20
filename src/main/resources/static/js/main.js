"use strict";
let classes = ["first", "second" , "third", "fourth", "fifth", "sixt", "sevent", "eight", "nine", "tenth", "eleven", "twelve", "thirhteen", "fourtheen", "fiftteen", "sixteen", "seventeen", "eightteen", "nineteen", "twenty", "twentyone", "twentytwo", "twentythird", "twentyfour"]
let timeperiod;
let url;
let appointments = new Object()
let appointmentChooser = document.getElementById("appointmentChooser")
let dateInput = document.getElementById("datePicker")


setLeftTable()
setWeekTable()


document.getElementById("table").style.display = "none";
document.getElementById("datePicker").addEventListener("change", changeDate)
document.getElementById("delete").addEventListener("click", deleteAppointment)


function getAppointments(date){
    let data = new FormData();
    data.append('test', "test");


    const xhr = new XMLHttpRequest();
    xhr.open("POST","/get?date=" + date);

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
    option.setAttribute("id", "id"+appointment.id)
    appointmentChooser.add(option)
}

function setRightTableElement(appointment){
    let tableclass = getTableClass(appointment.startdate, appointment.starttime)
    let template = document.getElementById("templateAppointment").content
    let copyHTML = document.importNode(template, true)
    copyHTML.querySelector("#appointment").textContent = appointment.starttime + "-" + appointment.endtime + " " + appointment.title
    copyHTML.querySelector("#appointment").classList.add(tableclass)
    copyHTML.querySelector("#appointment").classList.add(appointment.id)
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
    if (Day == 0){
        return classes[7]
    }else{
        return classes[Day]
    }
}

function getSecondClass(time) {
    let help = time.split(":")
    let number = parseInt(help[0])
    return classes[number]
}

function setLeftTable() {
    let timestamp = 12;
    let tableclass;
    let text;
    tableclass = classes[0]+classes[0]
    text = timestamp+" AM:"
    setLeftTableElement(text, tableclass)
    timestamp = 1;
    for (let i=1; i<12; i++) {
        tableclass = classes[0]+classes[i]
        text = timestamp+" AM:"
        timestamp++
        setLeftTableElement(text, tableclass)
    }
    tableclass = classes[0]+classes[12]
    text = timestamp+" PM:"
    setLeftTableElement(text, tableclass)
    timestamp=1;
    for (let i=13; i<24; i++){
        let tableclass = classes[0]+classes[i]
        let text = timestamp+" PM:"
        timestamp++
        setLeftTableElement(text, tableclass)
    }
    
}

function setLeftTableElement(text, tableclass) {
    let template = document.getElementById("templateWeek").content
    let copyHTML = document.importNode(template, true)
    copyHTML.querySelector("#time").textContent = text
    copyHTML.querySelector("#time").classList.add(tableclass)
    document.getElementById("week").appendChild(copyHTML)
}

function setWeekTable() {
    if(dateInput.value == ""){
        setDateInput()
    }
    getAppointments(dateInput.value)
}

function setDateInput(){
    let today = new Date()
    let helpdate = today.toISOString()
    let arrayDate =helpdate.split("T")
    dateInput.value = arrayDate[0] 
}

function deleteAppointment(){
    // console.log(appointments)
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
            removeRightTableElement(appointmentId)
            // let className = getTableClass(appointment.startdate, appointment.starttime)
            // document.getElementsByClassName(className)[0].remove()
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
    let inputdate = document.getElementById("datePicker").value
    emptyWeekTable()
    getAppointments(inputdate)
}

function emptyWeekTable(){
    let number = Object.sizes(appointments)
    for (let i = 0; i<number; i++){
        removeRightTableElement(appointments[i].id)
        removeOptionAppointment(appointments[i].id)
    }
}

function removeRightTableElement(appointmentId){
    let div = document.getElementById("week")
    let element = document.getElementsByClassName(appointmentId)
    div.removeChild(element[0])
}

function removeOptionAppointment(appointmentId){
    document.getElementById("id"+appointmentId).remove()
}

//Count elements of Objekt
Object.sizes = function(obj){
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
             size++;
    }
    return size;
};