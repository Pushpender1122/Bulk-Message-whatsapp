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
    if (message.action === 'setTime') {
        const timeToSet = message.time;

        // Store the received time in chrome.storage.local
        chrome.storage.local.set({ 'startingTime': timeToSet }, function () {
            console.log("Time set in storage: " + timeToSet);
            sendResponse({ success: true }); // Respond back indicating success
        });
        return true; // Indicates asynchronous response
    } else if (message.action === 'getTime') {
        chrome.storage.local.get('startingTime', function (data) {
            const startedTime = data.startingTime || "N/A"; // Set default if undefined
            sendResponse({ 'startedTime': startedTime });
        });
        return true; // Indicates asynchronous response
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


});
