// Content Script for Website A
// Example: Setting data from Website A to background
// contentScriptA.js
// contentScriptA.js

// Function definition

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString(); // Get date in a formatted string
const formattedTime = currentDate.toLocaleTimeString();
// console.log(formattedDate + " " + formattedTime)
// localStorage.setItem('time', JSON.stringify(formattedDate + ' ' + formattedTime))
// const dataToSend = { numbers: ['7015880549'], message: 'hello' };
// console.log(JSON.parse(localStorage.getItem('activebroadcast')))
const dataToSend = JSON.parse(localStorage.getItem('activebroadcast'));
console.log(dataToSend);
chrome.runtime.sendMessage({ setAction: "setData", data: dataToSend });
function sendTimeToBackground(time) {
    chrome.runtime.sendMessage({ action: 'setTime', time: time }, function (response) {
        if (response && response.success) {
            console.log("Time successfully set in background");
        } else {
            console.error("Failed to set time in background");
        }
    });
}
const currentTime = new Date().toLocaleString(); // Get current time
sendTimeToBackground(currentTime);
chrome.runtime.sendMessage({ action: 'setAckObj', ackObject: { succeed: 0, failed: 0 } });
console.log("run");


chrome.runtime.sendMessage({ action: 'getAckObj' }, function (response) {
    const ackObjectFromBackground = response.ackObject;
    console.log(ackObjectFromBackground);
    // Use ackObjectFromBackground as needed
});