chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTabId = tabs[0].id;
    chrome.runtime.sendMessage({ action: 'getAllList' }, response => {
        if (response && response.backgroundData) {
            // Received data from the background script
            const retrievedData = response.backgroundData;
            console.log(retrievedData);
            // Access the 'succeed' and 'failed' properties and update innerHTML
            document.getElementById('send').innerHTML = retrievedData[retrievedData.length - 1].list.succeed;
            document.getElementById('failed').innerHTML = retrievedData[retrievedData.length - 1].list.failed;
            document.getElementById('time').innerHTML = retrievedData[retrievedData.length - 1].list.time;

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

});
