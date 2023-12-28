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
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "setTheList") {
            // Get the new data from the message
            const newData = message.data;

            // Retrieve old data from chrome.storage
            chrome.storage.local.get(['allnumber'], function (result) {
                const oldData = result.allnumber || [];

                // Merge old and new data
                const updatedData = oldData.concat(newData);

                // Store the updated list back into chrome.storage
                chrome.storage.local.set({ 'allnumber': updatedData }, () => {
                    if (!chrome.runtime.lastError) {
                        console.log('Data stored successfully:', updatedData);
                        sendResponse({ success: true });
                    } else {
                        console.error('Failed to store data:', chrome.runtime.lastError);
                        sendResponse({ success: false });
                    }
                });
            });

            return true; // Required for asynchronous response
        } else if (message.action === "getAllList") {
            // Retrieve the stored list from chrome.storage
            chrome.storage.local.get(['allnumber'], function (result) {
                const storedList = result.allnumber || [];

                // Send the stored list back to the content script
                sendResponse({ backgroundData: storedList });
            });

            return true; // Required for asynchronous response
        }
    });
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === "getTempData") {
            chrome.storage.local.get(['TempData'], function (result) {
                sendResponse({ backgroundData: result.TempData });
            });
            return true; // Required for asynchronous response
        } else if (message.action === "setTempData") {
            const dataToStore = message.TempData;
            chrome.storage.local.set({ 'TempData': dataToStore }, function () {
                sendResponse({ success: true }); // Sending success response
            });
        }
    });
});
