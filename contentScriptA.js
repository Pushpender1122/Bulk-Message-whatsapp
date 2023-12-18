// Content Script for Website A
// Function definition
function sendDataToBackground() {
    const dataToSend = JSON.parse(localStorage.getItem('activebroadcast'));
    chrome.runtime.sendMessage({ setAction: "setData", data: dataToSend });
}

// Check for changes in localStorage periodically (every 500ms in this example)
setInterval(sendDataToBackground, 500);

console.log("run");

async function injectScript(file, node) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    node.appendChild(script);
}
injectScript(chrome.runtime.getURL('initiate.js'), document.body);