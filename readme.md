# Message-sender-whatsapp

A Chrome extension designed to streamline message delivery by automating the process of sending messages to multiple numbers.

## Features

- **Automated Messaging:** Easily send messages to multiple numbers without manual input for each recipient.
- **User-Friendly Interface:** The interface is designed for easy usage.

## How to Use

1. **Installation:**
    - Clone this repository or download the ZIP file.
    - Open Chrome and go to `chrome://extensions/`.
    - Enable Developer mode.
    - Click on "Load unpacked" and select the downloaded extension folder.

2. **Setup:**
    - Open any website and press F12 to enter inspect mode.
    - Access the console tab in the Developer Tools.
    - Verify if the extension is installed by typing `isExInstalled`. If it returns true, the extension is installed.

3. **Sending Messages:**
    - Use the `senddata()` function to set messages and numbers for sending.
    - Example: `senddata({ numbers: ['12312345', '123123123'], message: "Hello" })`.

## Troubleshooting

- If you encounter any issues during setup or usage, ensure that the extension is enabled in Chrome extensions.
- Check for any error messages in the console that might indicate issues with the setup.
- If problems persist, consider reinstalling the extension or restarting the browser.
