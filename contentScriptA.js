// Content Script for Website A
// Example: Setting data from Website A to background
const dataToSend = { numbers: ['9467592957', '9671099771'], message: 'Hello' };
chrome.runtime.sendMessage({ setAction: "setData", data: dataToSend });

chrome.runtime.sendMessage({ action: 'getAckObj' }, function (response) {
    const ackObjectFromBackground = response.ackObject;
    console.log(ackObjectFromBackground);
    // Use ackObjectFromBackground as needed

});