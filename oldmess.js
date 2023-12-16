// Request the stored list from the background script
chrome.runtime.sendMessage({ action: 'getAllList' }, response => {
    if (response && response.backgroundData) {
        // Received data from the background script
        const retrievedData = response.backgroundData;

        // Displaying the data in the UI
        const dataContainer = document.getElementById('dataContainer');
        retrievedData.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('data-item');

            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date');
            dateDiv.textContent = `Date: ${item.time}`;

            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.textContent = `Message: ${item.list.message}`;

            const numbersDiv = document.createElement('div');
            numbersDiv.classList.add('numbers');
            numbersDiv.textContent = `Numbers: ${item.list.numbers}`;

            div.appendChild(dateDiv);
            div.appendChild(messageDiv);
            div.appendChild(numbersDiv);

            dataContainer.appendChild(div);
        });
    } else {
        console.error('Failed to retrieve data');
    }
});
