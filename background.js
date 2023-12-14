// Background Script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.getAction === "getData") {
        chrome.storage.local.get(['storedData'], function (result) {
            sendResponse({ backgroundData: result.storedData });
        });
        return true; // Required for asynchronous response
    } else if (message.setAction === "setData") {
        const dataToStore = message.data;
        chrome.storage.local.set({ 'storedData': dataToStore });
    }
    if (message.action === 'setAckObj') {
        // Retrieve 'ackobj' from the content script
        const ackObjectFromContentScript = message.ackObject;

        // Store 'ackobj' in background script's storage (e.g., chrome.storage.local)
        chrome.storage.local.set({ 'ackObject': ackObjectFromContentScript }, function () {
            console.log('ackobj has been stored in background.');
        });
    } else if (message.action === 'getAckObj') {
        // Retrieve 'ackobj' from storage
        chrome.storage.local.get('ackObject', function (data) {
            const ackObjectFromStorage = data.ackObject;
            // Send the stored ackObject back to the content script
            sendResponse({ ackObject: ackObjectFromStorage });
        });
        return true; // Indicates asynchronous response
    }
});
