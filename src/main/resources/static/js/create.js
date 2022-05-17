let eventName;
let startDate;
let startTime;
let endDate;
let endTime;
let category;
let flexible = false;

document.getElementById("submit").addEventListener("click", createEvent)
document.getElementById("inputflexible").addEventListener("click", changeFlexible)
document.getElementById("edit").addEventListener("click", editAppointmentInput)
document.getElementById("editAppointment").addEventListener("click", editAppointment)

function createEvent() {
    readInput();
    // checkCorrectness();
    sendRequest();
}

function changeFlexible() {
    if(flexible) {
        flexible = false;
    } else {
        flexible = true;
    }
}

function readInput(){
    eventName = document.getElementById("inputname").value;
    startDate = document.getElementById("inputstartdate").value;
    startTime = document.getElementById("inputstarttime").value;
    endDate = document.getElementById("inputenddate").value;
    endTime = document.getElementById("inputendtime").value;
    category = document.getElementById("inputcategory").value;
}

// function checkCorrectness(){
    
// }

function sendRequest(){
    const appointment = {
        "id": "",
        "title": eventName,
        "category": category,
        "startdate": startDate,
        "starttime": startTime +":00",
        "endtime": endTime +":00",
        "enddate": endDate,
        "flexible":flexible
    };
    const xhr = new XMLHttpRequest();
    xhr.open("POST","/create");
    xhr.setRequestHeader("content-Type", "application/json");
    xhr.send(JSON.stringify(appointment));
    xhr.onload = function(){
        self.close()
    }
}

function editAppointmentInput(){
    let appointmentId = document.getElementById("appointmentChooser").value
    let appointment = getAppointmentFromId(appointmentId)
    // show create appointment
    setInput(appointment)
    document.getElementById("table").style.display = "initial";
}

function editAppointment(){
    let appointmentId = document.getElementById("appointmentChooser").value
    readInput()
    
    const appointmentchanged = {
        "id": appointmentId,
        "title": eventName,
        "category": category,
        "startdate": startDate,
        "starttime": startTime,
        "endtime": endTime,
        "enddate": endDate,
        "flexible":flexible
    };

    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/edit?id="+ appointmentId)
    
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(JSON.stringify(appointmentchanged));
    
    xhr.onload = function (){
        // document.getElementById("table").style.display = "none";
        self.location.reload(true)
    }
}

function setInput(appointment){
    document.getElementById("inputname").value = appointment.title  
    document.getElementById("inputstartdate").value = appointment.startdate
    document.getElementById("inputstarttime").value = appointment.starttime
    document.getElementById("inputenddate").value = appointment.enddate
    document.getElementById("inputendtime").value = appointment.endtime
    document.getElementById("inputcategory").value = appointment.category
    if(appointment.flexible == true){
        document.getElementById("inputflexible").checked = "checked";
    }
}