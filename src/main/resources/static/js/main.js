"use strict";
let classes = ["first", "second" , "third", "fourth", "fifth", "sixt", "sevent", "eight", "nine", "tenth", "eleven", "twelve", "thirhteen", "fourtheen", "fiftteen", "sixteen", "seventeen", "eightteen", "nineteen", "twenty", "twentyone", "twentytwo", "twentythird", "twentyfour"]
let timeperiod;
let url;
let appointments = new Object()
let appointmentChooser = document.getElementById("appointmentChooser")
let dateInput = document.getElementById("datePicker")


setLeftTable()
setWeekTable()
setWeekOnView()


document.getElementById("table").style.display = "none";
dateInput.addEventListener("change", changeDate)
document.getElementById("delete").addEventListener("click", deleteAppointment)
document.getElementById("weekBefore").addEventListener("click", weekBefore)
document.getElementById("weekAfter").addEventListener("click", weekAfter)

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
    }
}

function setOptionAppointment(appointment){
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
    copyHTML.querySelector("#appointment").textContent = cutTime(appointment.starttime )+ "-" + cutTime(appointment.endtime) + " \n " + appointment.title
    copyHTML.querySelector("#appointment").classList.add(tableclass)
    copyHTML.querySelector("#appointment").classList.add(appointment.id)
    let categoryClass = getCategoryColor(appointment.category)
    copyHTML.querySelector("#appointment").classList.add(categoryClass)
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
    dateInput.value = dateToString() 
}

function dateToString(){
    let date
    if(dateInput.value == ""){
        date = new Date()
    }else{
        date = new Date(dateInput.value)
    }
    let helpdate = date.toISOString()
    let arrayDate = helpdate.split("T")
    return arrayDate[0]
}

function deleteAppointment(){
    let appointmentId = document.getElementById("appointmentChooser").value
    let appointmentIndex = document.getElementById("appointmentChooser").selectedIndex
    let appointment = getAppointmentFromId(appointmentId)
    let data = new FormData();
    data.append('test', "test");


    const xhr = new XMLHttpRequest();
    xhr.open("POST","/delete?id=" + appointmentId);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));

    xhr.onload = function() {
        if (xhr.status == 200){
            appointmentChooser.remove(appointmentIndex)
            removeRightTableElement(appointmentId)
        }
    }
}

function getAppointmentFromId(id){
    for (let i = 0; i<Object.sizes(appointments); i++){
        if(appointments[i].id == id){
            return appointments[i]
        }
    }
}

function changeDate() {
    let inputdate = document.getElementById("datePicker").value
    setWeekOnView(inputdate)
    changeWeek(inputdate)
}

function changeWeek(inputdate){
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

function weekBefore(){
    let inputdate = document.getElementById("datePicker").value
    emptyWeekTable()
    sendDateRequest("before", dateToString(inputdate))
}

function weekAfter(){
    let inputdate = document.getElementById("datePicker").value
    emptyWeekTable()
    sendDateRequest("after", dateToString(inputdate))
}

function sendDateRequest(direction, date){
    let data = new FormData();
    data.append('test', "test");
    
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST","/newWeek?direction=" + direction + "&date=" + date);
    
    xhr.send(JSON.stringify(data));
    
    xhr.onload = function() {
        dateInput.value = this.response
        setWeekOnView(this.response)
        getAppointments(this.response)
    }
}

function setWeekOnView(){
    let data = new FormData();
    data.append('test', "test");
    
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/actualWeek?date=" + dateInput.value);
    
    xhr.send(JSON.stringify(data));
    
    xhr.onload = function() {
        let help = this.response.split('"')
        let start = new Date(help[1]).toLocaleString()
        let end =  new Date(help[3]).toLocaleString()
        let title = localDateToString(start) + " - " + localDateToString(end)
        document.getElementById("timePeriodText").textContent = title
    }
}

function localDateToString(localDate){
    let arrayDate = localDate.split(",")
    return arrayDate[0]
}

function cutTime(time){
    let help = time.split(":")
    return help[0] + ":" +help[1]
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