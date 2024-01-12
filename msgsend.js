
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
            StoredDataInLocal();
        }
    } catch (error) {
        console.error('Error in sendMsgResult promise:', error);
        Acknowledgement.failed += 1;
        // Handle errors if the promise fails to resolve
    }
    console.log(Acknowledgement);
}
async function sendmessage(data) {
    try {
        let completedCount = 0;
        function executeWithDelay(index) {
            if (index < data.numbers.length) {
                const value = data.numbers[index];
                let timeout = Math.floor(Math.random() * (12 - 6 + 1)) + 6; // Generate random timeout for each value
                timeout *= 1000; // Convert seconds to milliseconds
                console.log(timeout);
                setTimeout(() => {
                    if (/^\d+$/.test(value)) { // Check if the value consists only of digits
                        if (value.length === 10) {
                            data.numbers[index] = '91' + value;
                            msgsnedfun(data.numbers[index], data.message);
                        } else if (value.length === 12) {
                            msgsnedfun(data.numbers[index], data.message);
                        } else if (value.length === 13 && value.startsWith('+')) {
                            data.numbers[index] = value.substring(1); // Remove '+' and keep the rest of the number
                            msgsnedfun(data.numbers[index], data.message);
                        } else {
                            Acknowledgement.failed++;
                            StoredDataInLocal();
                            console.log("invalid number");
                        }
                    } else {
                        Acknowledgement.failed++;
                        StoredDataInLocal();
                        console.log("String found in the number. Invalid number:", value);
                    }
                    completedCount++;
                    if (completedCount === data.numbers.length) {
                        setTimeout(() => {
                            localStorage.setItem('AcknowledgementData', JSON.stringify(Acknowledgement));
                            console.log("done");
                            const event = new Event('storageUpdated');
                            document.dispatchEvent(event);
                            const even = new Event('StoreData');
                            document.dispatchEvent(even);
                            localStorage.setItem('data', '');
                            localStorage.removeItem('AcknowledgementData');
                            data = { numbers: [], message: '' };
                            //All msg send
                        }, 2000);
                    } else {
                        // If not all operations are completed, continue with the next index
                        executeWithDelay(index + 1);
                    }
                }, timeout);
            }
        }
        // Start execution from the first index (index 0)
        executeWithDelay(0);
        // console.log(localStorage.getItem('some'));

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
    sendmessage(parsedData);
    console.log(parsedData);
} else {
    // If 'data' doesn't exist in localStorage, do nothing or handle as needed
    console.log("Data not found in localStorage. No action taken.");
}

function StoredDataInLocal() {
    localStorage.setItem('AcknowledgementData', JSON.stringify(Acknowledgement));
    const event = new Event('StoreData');
    document.dispatchEvent(event);
}