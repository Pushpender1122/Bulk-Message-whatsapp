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
// const dataToSend = { numbers: ['7988992911'], message: 'hello' };
// console.log(JSON.parse(localStorage.getItem('activebroadcast')))
// const dataToSend = JSON.parse(localStorage.getItem('activebroadcast'));
// // console.log(dataToSend);
// chrome.runtime.sendMessage({ setAction: "setData", data: dataToSend });
// Function to send data to background script when localStorage changes
function sendDataToBackground() {
    const dataToSend = JSON.parse(localStorage.getItem('activebroadcast'));
    chrome.runtime.sendMessage({ setAction: "setData", data: dataToSend });
}

// Check for changes in localStorage periodically (every 500ms in this example)
setInterval(sendDataToBackground, 500);


// chrome.runtime.sendMessage({ action: 'setAckObj', ackObject: { succeed: 0, failed: 0 } });
console.log("run");

async function injectScript(file, node) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    node.appendChild(script);
}
injectScript(chrome.runtime.getURL('initiate.js'), document.body);

// chrome.runtime.sendMessage({ action: 'getAckObj' }, function (response) {
//     const ackObjectFromBackground = response.ackObject;
//     console.log(ackObjectFromBackground);
//     // Use ackObjectFromBackground as needed
// });