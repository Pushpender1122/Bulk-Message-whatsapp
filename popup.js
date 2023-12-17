chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTabId = tabs[0].id;
    chrome.runtime.sendMessage({ action: 'getAckObj' }, function (response) {
        var ackObjectFromBackground = JSON.parse(response.ackObject);
        console.log(ackObjectFromBackground);
        // Check if ackObjectFromBackground exists and has the 'succeed' and 'failed' properties
        if (ackObjectFromBackground && ackObjectFromBackground.succeed !== undefined && ackObjectFromBackground.failed !== undefined) {
            // Access the 'succeed' and 'failed' properties and update innerHTML
            document.getElementById('send').innerHTML = ackObjectFromBackground.succeed;
            document.getElementById('failed').innerHTML = ackObjectFromBackground.failed;
        } else {
            // Handle cases where the properties are missing or undefined
            document.getElementById('send').innerHTML = "N/A";
            document.getElementById('failed').innerHTML = "N/A";
        }
    });
    // function getTimeFromBackground() {
    chrome.runtime.sendMessage({ action: 'getTime' }, function (response) {
        var currentTime = response.startedTime || "N/A"; // Set default if undefined
        console.log("Retrieved time: " + currentTime);
        // Use 'currentTime' as needed in your content script
        // For example, update an HTML element with the retrieved time
        document.getElementById('time').innerHTML = currentTime;
    });
    // }

});

function getthedate() {
    // Create a new Date object
    var span = document.getElementById('time');
    const now = new Date();

    // Get date components
    const year = now.getFullYear(); // Full year (e.g., 2023)
    const month = now.getMonth() + 1; // Month (0-11, add 1 for human-readable month)
    const day = now.getDate(); // Day of the month (1-31)
    const hours = now.getHours(); // Hours (0-23)
    const minutes = now.getMinutes(); // Minutes (0-59)
    const seconds = now.getSeconds(); // Seconds (0-59)

    // Format date and time
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // Full date and time
    const fullDateTime = `${formattedDate} ${formattedTime}`;

    console.log(fullDateTime); // Output: YYYY-MM-DD HH:MM:SS
    span.innerHTML = 'Started at ' + fullDateTime;
}
getthedate();