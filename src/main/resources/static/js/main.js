"use strict"
let classes = ["one", "two" , "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourtheen", "fiveteen", "sixteen", "seventeen", "eightteen", "nineteen", "twenty", "twentyone", "twentytwo", "twentythree", "twentyfour"]
let timeperiod
let url
let appointments = new Object()
let appointmentChooser = document.getElementById("appointmentChooser")
let dateInput = document.getElementById("datePicker")


setLeftTable()
setWeekTable()
setWeekOnView()


document.getElementById("table").style.display = "none"
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
            setRightTableElement(appointments[i], false)
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

function setRightTableElement(appointment, append){
    let template = document.getElementById("templateAppointment").content
    let appointmentTemplate = document.importNode(template, true).querySelector("#appointment")
    let tableclass
    let start = parseInt(getHourOfTime(appointment.starttime))
    let end = parseInt(getHourOfTime(appointment.endtime))
    if (checkDayChange(appointment.startdate, appointment.enddate)){
        if(append){
            appointmentTemplate.style["border-top-left-radius"] = 0
            appointmentTemplate.style["border-top-right-radius"] = 0
            appointmentTemplate.style["grid-row-start"] = 1
            appointmentTemplate.style["grid-row-end"] = ++end
            appointmentTemplate.classList.add(getDayClass(appointment.enddate))
        }else{
            appointmentTemplate.style["grid-row-start"] = ++start
            appointmentTemplate.style["grid-row-end"] = 25
            appointmentTemplate.style["border-bottom-left-radius"] = 0
            appointmentTemplate.style["border-bottom-right-radius"] = 0
            appointmentTemplate.classList.add(getDayClass(appointment.startdate))
            setRightTableElement(appointment, true)
        } 
    }else{
        if(checkstartIsEndHour(start,end)){
            tableclass = getLine(appointment.starttime)
            appointmentTemplate.classList.add("start")
            appointmentTemplate.classList.add(tableclass)
        }else{
            appointmentTemplate.style["grid-row-start"] = ++start
            appointmentTemplate.style["grid-row-end"] = ++end
        }
        appointmentTemplate.classList.add(getDayClass(appointment.startdate))
    }

    appointmentTemplate.textContent = cutTime(appointment.starttime )+ "-" + cutTime(appointment.endtime) + " \n " + appointment.title
    appointmentTemplate.classList.add(appointment.id)
    let categoryClass = getCategoryColor(appointment.category)
    appointmentTemplate.classList.add(categoryClass)
    document.getElementById("week").appendChild(appointmentTemplate)
}

function checkDayChange(start, end){
    return (start !== end)
}

function checkstartIsEndHour(start, end){
    return (start == (end-1) || end == start)
}

function getHourOfTime (time){
    let help = cutTime(time)
    return cutHour(help)
}

function cutHour(time){
    let help = time.split(":")
    return help[0]
}

function getCategoryColor(category){
    return category.toLowerCase()
}

function getDayClass(day) {
    let Day = new Date(day).getDay()
    if (Day == 0){
        return "Sunday"
    }else if(Day == 1){
        return "Monday"
    }else if(Day == 2){
        return "Thuesday"
    }else if(Day == 3){
        return "Wednesday"
    }else if(Day == 4){
        return "Thursday"
    }else if(Day == 5){
        return "Friday"
    }else if(Day == 6){
        return "Saturday"
    }
}

function getLine(time) {
    let help = time.split(":")
    let number = parseInt(help[0])
    return classes[number]
}

function setLeftTable() {
    let timestamp = 12;
    let tableclass;
    let text;
    tableclass = classes[0]
    text = timestamp+" AM:"
    setLeftTableElement(text, tableclass)
    timestamp = 1;
    for (let i=1; i<12; i++) {
        tableclass = classes[i]
        text = timestamp+" AM:"
        timestamp++
        setLeftTableElement(text, tableclass)
    }
    tableclass = classes[12]
    text = timestamp+" PM:"
    setLeftTableElement(text, tableclass)
    timestamp=1;
    for (let i=13; i<24; i++){
        let tableclass = classes[i]
        let text = timestamp+" PM:"
        timestamp++
        setLeftTableElement(text, tableclass)
    }
    
}

function setLeftTableElement(text, tableclass) {
    let template = document.getElementById("templateWeek").content
    let timeTemplate = document.importNode(template, true).querySelector("#time")
    timeTemplate.textContent = text
    timeTemplate.classList.add(tableclass)
    timeTemplate.classList.add("first")
    document.getElementById("week").appendChild(timeTemplate)
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
    let arrayDate = date.toISOString().split("T")
    return arrayDate[0]
}

function deleteAppointment(){
    let appointmentId = document.getElementById("appointmentChooser").value
    let appointmentIndex = document.getElementById("appointmentChooser").selectedIndex
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
    console.log(element)
    let length = Object.sizes(element)
    for (let i = 0; i<length;i++){
        console.log(element[i])
        div.removeChild(element[0])
    }
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
}
