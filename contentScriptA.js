// Content Script for Website A

// Function definition
let intervalId;

function sendDataToBackground() {
    if (chrome.runtime && chrome.runtime.sendMessage) {
        const dataToSend = JSON.parse(localStorage.getItem('activebroadcast'));
        if (dataToSend) {
            chrome.runtime.sendMessage({ setAction: "setData", data: dataToSend }, function (ack) {
                if (ack) {
                    // Clear data from local storage if acknowledgment is received
                    localStorage.removeItem('activebroadcast');
                }
            });
        }
    } else {
        // If extension context is not valid, stop the interval
        clearInterval(intervalId);
        console.error("Refresh the page ");
    }
}

// Check for changes in localStorage periodically (every 500ms in this example)
intervalId = setInterval(sendDataToBackground, 500);


console.log("run");

async function injectScript(file, node) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    node.appendChild(script);
}

injectScript(chrome.runtime.getURL('initiate.js'), document.body);
