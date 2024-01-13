
function verifytheExtensioniSiinstallOrNot() {
    console.log("Extension is installed");
}
const Acknowledgement = {
    'succeed': 0,
    'failed': 0,
    'pending': 0,
    'total': 0,
    'time': '',
    'messages': '',
};
WPP.webpack.onReady(function () {
    console.log('Ready to use WPPConnect WA-JS');
});
var temp = 0;
//Send message and receiving acknowledgement
async function msgsnedfun(number, message) {
    if (temp == 0) {
        const currentTime = new Date().toLocaleString();
        Acknowledgement.time = currentTime;
        Acknowledgement.messages = message;
        temp++;
    }
    try {
        const ack = await WPP.chat.sendTextMessage(number, message, { createChat: true });
        const result = await ack.sendMsgResult;
        console.log('Resolved sendMsgResult:', result);
        if (result.messageSendResult === 'OK') {
            Acknowledgement.succeed += 1;
            Acknowledgement.pending -= 1;
            StoredDataInLocal();
        } else {
            Acknowledgement.failed += 1;
            Acknowledgement.pending -= 1;
            StoredDataInLocal();
        }
    } catch (error) {
        console.error('Error in sendMsgResult promise:', error);
        Acknowledgement.failed += 1;
        // Handle errors if the promise fails to resolve
    }
    console.log(Acknowledgement);
}
function validateAndModifyNumber(originalNumber) {
    if (originalNumber) {
        if (originalNumber.length === 10) {
            return '91' + originalNumber;
        } else if (originalNumber.length === 12) {
            return originalNumber; // No modification needed
        } else if (originalNumber.length === 13 && originalNumber.startsWith('+')) {
            return originalNumber.substring(1); // Remove '+' and keep the rest of the number
        } else {
            console.log("Invalid number:", originalNumber);
            Acknowledgement.failed++;
            Acknowledgement.pending -= 1;
            StoredDataInLocal();
            return null; // Indicate invalid number
        }
    } else {
        console.log("Invalid number:", originalNumber);
        Acknowledgement.failed++;
        Acknowledgement.pending -= 1;
        StoredDataInLocal();
        return null; // Indicate invalid number
    }
}
async function sendmessage(data) {
    try {
        console.log(data.length)
        let completedCount = 0;
        function executeWithDelay(index) {
            if (index < data.length) {
                const { number, message } = data[index];
                let timeout = Math.floor(Math.random() * (12 - 6 + 1)) + 6; // Generate random timeout for each value
                timeout *= 1000; // Convert seconds to milliseconds
                console.log(timeout);
                setTimeout(() => {
                    const modifiedNumber = validateAndModifyNumber(number);
                    if (modifiedNumber !== null) {
                        completedCount++;
                        msgsnedfun(modifiedNumber, message);
                        Acknowledgement.total = data.length;
                        if (completedCount === data.length) {
                            setTimeout(() => {
                                // All messages sent
                                localStorage.setItem('AcknowledgementData', JSON.stringify(Acknowledgement));
                                console.log("Message Sending Done");
                                const event = new Event('storageUpdated');
                                document.dispatchEvent(event);
                                const even = new Event('StoreData');
                                document.dispatchEvent(even);
                                localStorage.setItem('data', '');
                                localStorage.removeItem('AcknowledgementData');
                                data = []; // Clear the array
                            }, 2000);
                        } else {
                            executeWithDelay(index + 1); // Continue with the next index
                        }
                    } else {
                        completedCount++;
                        executeWithDelay(index + 1); // Skip to the next iteration
                    }
                }, timeout);
            }
        }
        executeWithDelay(0);
    } catch (error) {
        console.error('Element not found:', error);
    }
}
const storedData = localStorage.getItem('data');

if (storedData !== '') {
    // If 'data' exists in localStorage, parse it and call sendmessage function
    const parsedData = JSON.parse(storedData);
    Acknowledgement.total = parsedData.numbers.length;
    Acknowledgement.pending = parsedData.numbers.length;
    sendmessage(parsedData.numbers);
    console.log(parsedData);
    StoredDataInLocal();
} else {
    // If 'data' doesn't exist in localStorage, do nothing or handle as needed
    console.log("Data not found in localStorage. No action taken.");
}

function StoredDataInLocal() {
    localStorage.setItem('AcknowledgementData', JSON.stringify(Acknowledgement));
    const event = new Event('StoreData');
    document.dispatchEvent(event);
}