"use strict";

function openWindow() {
    let window = Window.open("create.html", "CreateAppointment");
    
}

document.getElementById("submit").addEventListener("click", createEvent)

function createEvent() {
    console.log("test");
}
