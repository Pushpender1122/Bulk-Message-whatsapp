// Content Script for Website B
chrome.runtime.sendMessage({ getAction: "getData" }, function (response) {
    if (response && response.backgroundData) {
        // Assuming you want to display the data in an element with id "dataContainer"
        console.log('bg data');
        console.log(response.backgroundData);
        localStorage.setItem('data', JSON.stringify(response.backgroundData));
    }
});

console.log('Content script injected!');
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
async function injectScript(file, node) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', file);
        node.appendChild(script);
        script.onload = resolve;
        script.onerror = reject;
    });
}

async function loadMsgSendScript() {
    await injectScript(chrome.runtime.getURL('msgsend.js'), document.body);

    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            // Check if Acknowledgement has changed from null
            const Acknowledgement = JSON.parse(localStorage.getItem('AcknowledgementData'));
            if (Acknowledgement !== null) {
                // Clear the interval if Acknowledgement is not null
                clearInterval(intervalId);
                resolve();
            }
        }, 1000);
    });
}

async function CheckWhatsappLoad() {
    const myElement = await waitForElementById('#app > div > div.two._1jJ70 > div._2Ts6i._3RGKj > header > div._604FD > div > span > div:nth-child(4) > div > span');

    if (myElement) {
        await injectScript(chrome.runtime.getURL('wppconnect-wa.js'), document.body);
        await loadMsgSendScript();
        await injectScript(chrome.runtime.getURL('initiate.js'), document.body);
    }
}

CheckWhatsappLoad();
document.addEventListener('StoreData', function (event) {
    chrome.runtime.sendMessage({ action: 'setTempData', TempData: JSON.parse(localStorage.getItem('AcknowledgementData')) }, function (response) {
    });
});
document.addEventListener('storageUpdated', () => {
    console.log("Data stored");

    chrome.runtime.sendMessage({ action: 'setTheList', data: { list: JSON.parse(localStorage.getItem('AcknowledgementData')) } }, response => {

    });
});
chrome.runtime.sendMessage({ setAction: "setData", data: '' });