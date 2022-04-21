"use strict";
let data = new FormData();
data.append('test', "test");


const xhr = new XMLHttpRequest();
xhr.open("POST","/test?startdate=2022-04-18&enddate=2022-04-24");

xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(JSON.stringify(data));

xhr.onload = function() {
    console.log(xhr.status);
    console.log(xhr.response);
}
