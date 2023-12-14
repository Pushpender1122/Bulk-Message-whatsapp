console.log("Start");
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
async function sendmessage(data) {
    try {
        const myElement = await waitForElementById('#app > div > div.two._1jJ70 > div._2Ts6i._3RGKj > header > div._604FD > div > span > div:nth-child(4) > div > span');
        console.log(myElement);

        function executeWithDelay(index) {
            if (index < data.numbers.length) {
                const value = data.numbers[index];
                let timeout = Math.floor(Math.random() * (12 - 6 + 1)) + 6; // Generate random timeout for each value
                timeout *= 1000; // Convert seconds to milliseconds
                console.log(timeout);
                setTimeout(() => {
                    if (/^\d+$/.test(value)) { // Check if the value consists only of digits
                        if (value.length === 10) {
                            console.log("it run 1");
                            data.numbers[index] = '91' + value;
                            console.log(data.numbers[index], data.message);
                            // WPP.chat.sendTextMessage(data.numbers[index], data.message);
                        } else if (value.length === 12) {
                            console.log("it run 2");
                            console.log(data.numbers[index], data.message);
                            // WPP.chat.sendTextMessage(data.numbers[index], data.message);
                        } else if (value.length === 13 && value.startsWith('+')) {
                            console.log("it run 3");
                            data.numbers[index] = value.substring(1); // Remove '+' and keep the rest of the number
                            console.log(data.numbers[index], data.message);
                            // WPP.chat.sendTextMessage(data.numbers[index], data.message);
                        } else {
                            console.log("invalid number");
                        }
                    } else {
                        console.log("String found in the number. Invalid number:", value);
                    }
                    executeWithDelay(index + 1); // Call the function for the next index
                }, timeout);
            }
        }

        // Start execution from the first index (index 0)
        executeWithDelay(0);

    } catch (error) {
        console.error('Element not found:', error);
    }
}

sendmessage({ numbers: ['9467592957', '123abc4567'], message: 'Hello' });

console.log(WPP);
console.log("End");