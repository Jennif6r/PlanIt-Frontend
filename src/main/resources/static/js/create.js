let eventName;
let startDate;
let startTime;
let endDate;
let endTime;
let category;
let flexible = false;

document.getElementById("submit").addEventListener("click", createEvent)
document.getElementById("inputflexible").addEventListener("click", changeFlexible)

function createEvent() {
    readInput();
    checkCorrecktness()
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
    console.log(eventName);
    startDate = document.getElementById("inputstartdate").value;
    console.log(startDate);
    startTime = document.getElementById("inputstarttime").value;
    console.log(startTime);
    endDate = document.getElementById("inputenddate").value;
    console.log(endDate);
    endTime = document.getElementById("inputendtime").value;
    console.log(endTime);
    category = document.getElementById("inputcategory").value;
    console.log(category);
    console.log(flexible);
}

function checkCorrecktness(){
    
}