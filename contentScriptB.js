// Content Script for Website B
chrome.runtime.sendMessage({ getAction: "getData" }, function (response) {
    if (response && response.backgroundData) {
        // Assuming you want to display the data in an element with id "dataContainer"
        console.log('bg data');
        console.log(response.backgroundData);
        localStorage.setItem('data', JSON.stringify(response.backgroundData));
    }
});

console.log('Content script injected!');

// contentScript.js
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
    injectScript(chrome.runtime.getURL('initiate.js'), document.body);
});
document.addEventListener('StoreData', function (event) {
    console.log('localStorage was updated');
    chrome.runtime.sendMessage({ action: 'setTempData', TempData: JSON.parse(localStorage.getItem('AcknowledgementData')) }, function (response) {
        if (response && response.success) {
            console.log('Temp store');
        } else {
            console.error('Failed to store temp');
        }
    });
    // Request the stored list from the background script
});
document.addEventListener('storageUpdated', () => {
    console.log("Data stored");
    chrome.runtime.sendMessage({ action: 'setTheList', data: { list: JSON.parse(localStorage.getItem('AcknowledgementData')) } }, response => {
        if (response && response.success) {
            console.log('Data successfully sent to background');
        } else {
            console.error('Failed to send data to background');
        }
    });
});
chrome.runtime.sendMessage({ setAction: "setData", data: '' });