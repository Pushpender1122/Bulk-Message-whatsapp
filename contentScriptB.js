// Content Script for Website B
// Example: Getting data from background on Website B
chrome.runtime.sendMessage({ getAction: "getData" }, function (response) {
    if (response && response.backgroundData) {
        // Assuming you want to display the data in an element with id "dataContainer"
        console.log(response.backgroundData);
        const dataContainer = document.getElementById('dataContainer');
        if (dataContainer) {
            dataContainer.innerText = response.backgroundData;
        }
    }
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
async function exampleUsage() {
    try {
        const myElement = await waitForElementById('#app > div > div.two._1jJ70 > div._2Ts6i._3RGKj > header > div._604FD > div > span > div:nth-child(4) > div > span');
        // Do something with myElement when it's found
        console.log(myElement);
        // myElement.click();
        // console.log(WPP);
        // const test = await waitForElementById('#app > div > div.two._1jJ70 > div._2QgSC > div._2Ts6i._3RGKj._318SY > span > div > span > div > div._3wQ5i.o7fBL > div._1EUay > div._2vDPL > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt.qh0vvdkp > p');

        // console.log(test);   

    } catch (error) {
        // Handle error if element is not found within the specified time
        console.error('Element not found:', error);
    }
}

// Call the function



// Function to simulate key press


// contentScript.js

// Your script logic to inject goes here


console.log('Content script injected!');

// contentScript.js

// function sendMessage() {
//     // WPP.chat.sendTextMessage('919467592957', 'testing msg');
// }
// Function to inject wppconnect-wa.js
async function injectScript(file, node) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    node.appendChild(script);
}

// Wait for the page to load completely
window.addEventListener('load', () => {
    // Inject wppconnect-wa.js after the page has loaded
    injectScript(chrome.runtime.getURL('wppconnect-wa.js'), document.body);
    injectScript(chrome.runtime.getURL('msgsend.js'), document.body);
});


// For example, inject a script into the webpage
// const script = document.createElement('script');
// script.src = chrome.extension.getURL('injectedScript.js');
// (document.head || document.documentElement).appendChild(script);

// console.log(WPP.chat)
// WPP.webpack.onReady(function () {
//     console.log('Ready to use WPPConnect WA-JS');
// });