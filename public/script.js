
// Function to switch tabs
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Function to simulate sending an SMS
function sendSMS() {
    const sender = document.getElementById("sender").value;
    const numbers = document.getElementById("numbers").value;
    const message = document.getElementById("message").value;

    if (!numbers || !message) {
        alert("Please enter recipient numbers and a message.");
        return;
    }

    alert(`SMS sent from ${sender || "Default"} to ${numbers}: ${message}`);
}

// Function to simulate making a call
function makeCall() {
    const number = document.getElementById("call-number").value;
    if (!number) {
        alert("Please enter a phone number to call.");
        return;
    }

    alert(`Calling ${number}...`);
}




function addToDialer(value) {
    let dialerInput = document.getElementById("call-number");
    if (dialerInput.value.length < 15) {  // Limit max digits
        dialerInput.value += value;
    }
}

function clearDialer() {
    document.getElementById("call-number").value = "";
}

function makeCall() {
    let number = document.getElementById("call-number").value;
    if (number) {
        alert("Calling " + number + "...");
    } else {
        alert("Enter a number first.");
    }
}
