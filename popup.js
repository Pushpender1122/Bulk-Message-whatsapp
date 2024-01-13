chrome.runtime.sendMessage({ action: 'getAllList' }, response => {
    if (response && response.backgroundData) {
        // Received data from the background script
        var retrievedData = response.backgroundData;
        const table = document.createElement('table');
        table.classList.add('previous-broadcast');

        // Table header
        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        ['Time', 'Message', 'Status'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        // Table body
        const tbody = table.createTBody();
        retrievedData.forEach(item => {
            const row = tbody.insertRow();
            ['time', 'messages'].forEach(key => {
                const cell = row.insertCell();
                cell.textContent = item.list[key];
                cell.style.border = '1px solid #000';
            });

            const statusCell = row.insertCell();
            statusCell.classList.add('status-count');
            const statusText = `Succeed: ${item.list.succeed}, Failed: ${item.list.failed}`;
            statusCell.textContent = statusText;
            statusCell.style.border = '1px solid #000';
        });

        // Append the table to the container
        const tableContainer = document.getElementById('tableContainer');
        tableContainer.appendChild(table);
    } else {
        console.error('Failed to retrieve data');
    }
});

// });
document.addEventListener('DOMContentLoaded', function () {
    var remove = document.getElementsByClassName('removePreviousHistory')[0];
    remove.addEventListener('click', function () {

        var elementToRemove = document.getElementsByClassName('previous-broadcast')[0];
        elementToRemove.classList.add('remove-transition'); // Add a class for transition
        setTimeout(function () {
            elementToRemove.remove(); // Remove the element after the transition
        }, 500);
        chrome.storage.local.remove('allnumber', function () {
            console.log('Item removed');
        });
    });
});
chrome.runtime.sendMessage({ action: 'getTempData' }, function (response) {
    if (response && response.backgroundData) {
        // Use the retrieved data (response.backgroundData) here
        console.log('Retrieved data:', response.backgroundData);
        var Data = response.backgroundData;
        document.getElementById('send').innerHTML = Data?.succeed
        document.getElementById('failed').innerHTML = Data?.failed
        document.getElementById('time').innerHTML = Data?.time
        document.getElementById('pending').innerHTML = Data?.pending
        document.getElementById('total').innerHTML = Data?.total
    } else {
        console.error('Failed to retrieve data');
    }
});

