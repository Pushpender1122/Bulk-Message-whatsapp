document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('Submit');
    let inputNumber;
    let csvFile;

    btn.addEventListener('click', () => {
        SubmitData(inputNumber, csvFile);
    });

    const numberInput = document.getElementById('numbers');
    numberInput.addEventListener('input', handleNumberInputChange);

    const fileInput = document.getElementById('csvFileInput');
    fileInput.addEventListener('change', handleFileInputChange);

    function handleNumberInputChange(event) {
        const input = event.target.value;
        inputNumber = input.replace(/[^0-9,]/g, '');
        if (input !== inputNumber) {
            event.target.value = inputNumber;
        }
    }

    function handleFileInputChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                csvFile = event.target.result;
                console.log(csvFile);
            };
            reader.readAsText(file);
        }
    }
});

function SubmitData(numbers, csvData) {
    const messageTag = document.getElementById('message');
    const errorMessage = document.getElementById('errorMessage');
    const messageError = document.getElementById('messageError');
    const fileInput = document.getElementById('csvFileInput');
    const numberInput = document.getElementById('numbers');
    const successMessage = document.getElementById('successText');
    var message = messageTag.value.trim();
    const numbersEmpty = !numbers || numbers === '';
    const csvEmpty = !csvData;

    errorMessage.style.display = (numbersEmpty && csvEmpty) ? 'block' : 'none';
    messageError.style.display = (message === '') ? 'block' : 'none';

    if (message && (numbers || csvData)) {
        let numbersArray = [];
        if (csvData) {
            numbersArray = parseCSV(csvData).map(String);
            numbersArray = numbersArray.toString().split(',');
            // console.log(numbersArray);
        } else {
            numbersArray = numbers.split(',').map(String);
            // console.log(numbersArray);
        }

        const dataObject = {
            numbers: numbersArray,
            message: message
        };
        sendDataToBackground(dataObject);
        successMessage.style.display = 'block'
        messageTag.innerHTML = "";
        fileInput.innerHTML = "";
        numberInput.innerHTML = "";
    }
}


function parseCSV(csvContent) {
    const lines = csvContent.split(/\r?\n/);
    const numbers = lines.flatMap(line => line.split('\t')).filter(num => num.trim());
    return numbers;
}

function sendDataToBackground(dataToSend) {
    chrome.runtime.sendMessage({ setAction: "setData", data: dataToSend });
    // window.location.href = 'data.html';
}
