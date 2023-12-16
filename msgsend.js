console.log("Start");
function verifytheExtensioniSiinstallOrNot() {
    console.log("Extension is installed");
}
const Acknowledgement = { 'succeed': 0, 'failed': 0 };
WPP.webpack.onReady(function () {
    alert('Ready to use WPPConnect WA-JS');
});
function waitForElementById(elementId, interval = 1000) {
    return new Promise((resolve) => {
        const checkExistence = () => {
            const element = document.querySelector(elementId);
            console.log("Searching (:");
            if (element) {
                console.log("Found");
                resolve(element);
            } else {
                setTimeout(checkExistence, interval);
            }
        };
        checkExistence();
    });
}
//Send message and receiving acknowledgement
async function msgsnedfun(number, message) {
    try {
        const ack = await WPP.chat.sendTextMessage(number, message, { createChat: true });
        const result = await ack.sendMsgResult;
        console.log('Resolved sendMsgResult:', result);

        if (result.messageSendResult === 'OK') {
            Acknowledgement.succeed += 1;
            localStorage.setItem('AcknowledgementData', JSON.stringify(Acknowledgement));
        } else {
            Acknowledgement.failed += 1;
            localStorage.setItem('AcknowledgementData', JSON.stringify(Acknowledgement));
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
        const myElement = await waitForElementById('#app > div > div.two._1jJ70 > div._2Ts6i._3RGKj > header > div._604FD > div > span > div:nth-child(4) > div > span');
        console.log(myElement);
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
                            console.log("invalid number");
                        }
                    } else {
                        console.log("String found in the number. Invalid number:", value);
                    }
                    completedCount++;
                    if (completedCount === data.numbers.length) {
                        console.log("done");
                        data = { numbers: [], message: '' };
                        //All msg send
                        localStorage.setItem('data', '');
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
        setInterval(() => {
            if (data.numbers.length == Acknowledgement.succeed + Acknowledgement.failed) {
                localStorage.setItem('GetRecord', true);
            }
            else {
                localStorage.setItem('GetRecord', false);
            }
        }, 1000);

    } catch (error) {
        console.error('Element not found:', error);
    }
}
const storedData = localStorage.getItem('data');

if (storedData !== '') {
    // If 'data' exists in localStorage, parse it and call sendmessage function
    const parsedData = JSON.parse(storedData);
    sendmessage(parsedData);
    console.log(parsedData);
} else {
    // If 'data' doesn't exist in localStorage, do nothing or handle as needed
    console.log("Data not found in localStorage. No action taken.");
}
console.log(WPP);
console.log("End");