function getSelectedPhoneNumbers() {
    const checkboxes = document.querySelectorAll('.checkbox');
    const selectedPhoneNumbers = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const phoneNumber = checkbox.parentNode.parentNode.querySelector('td:nth-child(2)').textContent;
            selectedPhoneNumbers.push(phoneNumber);
        }
    });

    if (selectedPhoneNumbers.length > 0) {
        alert('Selected Phone Numbers:\n' + selectedPhoneNumbers.join('\n'));
    } else {
        alert('No phone numbers selected.');
    }
}