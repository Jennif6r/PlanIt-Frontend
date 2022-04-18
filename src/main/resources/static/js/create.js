let eventName;
let startDate;
let startTime;
let endDate;
let endTime;
let category;
let flexible = false;

// let appointment = new Object([]);

document.getElementById("submit").addEventListener("click", createEvent)
document.getElementById("inputflexible").addEventListener("click", changeFlexible)

function createEvent() {
    readInput();
    checkCorrectness();
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

function checkCorrectness(){
}

let foo;
let lorem;

const appointment = {
    "foo": "bla",
    "lorem": "ipsum"
};

function sendRequest(){
    const appointment = {
        "title": eventName,
        // "category": category,
        "startdate": startDate,
        "starttime": startTime,
        "endtime": endTime,
        "enddate": endDate,
        "flexible":flexible
    };
    console.log(JSON.stringify(appointment));
    const xhr = new XMLHttpRequest();
    xhr.open("POST","/create");
    xhr.setRequestHeader("content-Type", "application/json");
    xhr.send(JSON.stringify(appointment));
}