// Global variable to track if the user has already requested a reset today
let resetRequestCount = 0;

document.getElementById("reset-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const userInput = document.getElementById("user-input").value;
    if (!userInput) {
        alert("Please enter your email or phone number.");
        return;
    }

    // Check if the user has already requested a reset today
    if (resetRequestCount >= 1) {
        document.getElementById("warning-message").style.display = "block";
        return;
    }

    // Send the password reset request (here we simulate sending a request)
    resetRequestCount++;
    document.getElementById("warning-message").style.display = "none";
    document.getElementById("success-message").style.display = "block";

    // Simulate backend call (reset request has been successfully processed)
    console.log("Password reset request for: " + userInput);
    // Here, you would make an actual API call to your backend to send a reset link/code.
});

// Generate random password without special characters or numbers
function generatePassword() {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let password = '';
    
    for (let i = 0; i < 10; i++) { // Password length = 10
        const randomIndex = Math.floor(Math.random() * letters.length);
        password += letters[randomIndex];
    }

    // Display the generated password
    document.getElementById("generated-password").textContent = password;
}
