// Content Script for Website B
// Example: Getting data from background on Website B
// function getthedate() {
//     // Create a new Date object
//     var span = document.getElementById('time');
//     const now = new Date();

//     // Get date components
//     const year = now.getFullYear(); // Full year (e.g., 2023)
//     const month = now.getMonth() + 1; // Month (0-11, add 1 for human-readable month)
//     const day = now.getDate(); // Day of the month (1-31)
//     const hours = now.getHours(); // Hours (0-23)
//     const minutes = now.getMinutes(); // Minutes (0-59)
//     const seconds = now.getSeconds(); // Seconds (0-59)

//     // Format date and time
//     const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
//     const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

//     // Full date and time
//     const fullDateTime = `${formattedDate} ${formattedTime}`;

//     console.log(fullDateTime); // Output: YYYY-MM-DD HH:MM:SS
//     // span.innerHTML = 'Started at ' + fullDateTime;
//     chrome.runtime.sendMessage({ setAction: "setTime", startingTime: fullDateTime });
// }
// getthedate();
chrome.runtime.sendMessage({ getAction: "getData" }, function (response) {
    if (response && response.backgroundData) {
        // Assuming you want to display the data in an element with id "dataContainer"
        console.log('bg data');
        console.log(response.backgroundData);
        localStorage.setItem('data', JSON.stringify(response.backgroundData));
        const dataContainer = document.getElementById('dataContainer');
        if (dataContainer) {
            dataContainer.innerText = response.backgroundData;
        }
    }
});
console.log('Content script injected!');

// contentScript.js

// function sendMessage() {
//     // WPP.chat.sendTextMessage('919467592957', 'testing msg');
// }
// Function to inject wppconnect-wa.js
async function injectScript(file, node) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    node.appendChild(script);
}
// Wait for the page to load completely
window.addEventListener('load', () => {
    // Inject wppconnect-wa.js after the page has loaded
    injectScript(chrome.runtime.getURL('wppconnect-wa.js'), document.body);
    injectScript(chrome.runtime.getURL('msgsend.js'), document.body);
});


// For example, inject a script into the webpage
// const script = document.createElement('script');
// script.src = chrome.extension.getURL('injectedScript.js');
// (document.head || document.documentElement).appendChild(script);

// console.log(WPP.chat)
// WPP.webpack.onReady(function () {
//     console.log('Ready to use WPPConnect WA-JS');
// });
setInterval(() => {
    if (localStorage.getItem('GetRecord')) {
        chrome.runtime.sendMessage({ action: 'setAckObj', ackObject: localStorage.getItem('AcknowledgementData') });
        chrome.runtime.sendMessage({ setAction: "setData", data: '' });
    }
}, 1000);