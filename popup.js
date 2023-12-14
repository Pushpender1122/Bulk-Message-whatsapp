chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTabId = tabs[0].id;
    chrome.runtime.sendMessage({ action: 'getAckObj' }, function (response) {
        const ackObjectFromBackground = response.ackObject;
        console.log(ackObjectFromBackground);
        // Use ackObjectFromBackground as needed
        document.getElementById('h1').innerHTML = (ackObjectFromBackground);
    });
});