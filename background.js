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
});
