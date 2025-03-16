// Simulating the user profile and points system
let userPoints = 15; // Initial points for the logged-in user (this would come from the backend in a real app)
const userProfile = {
    username: 'john_doe', // Logged in user
    points: userPoints,
};

// Display the user's current points on the profile page
document.getElementById('user-points').textContent = userPoints;

// Handle points transfer form submission
document.getElementById('transfer-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const recipientUsername = document.getElementById('recipient-username').value;
    const pointsToTransfer = parseInt(document.getElementById('transfer-points').value);

    if (userPoints < 10) {
        document.getElementById('transfer-status').textContent = 'You need at least 10 points to transfer.';
        return;
    }

    if (pointsToTransfer <= 0 || pointsToTransfer > userPoints) {
        document.getElementById('transfer-status').textContent = 'Invalid transfer amount. You don\'t have enough points.';
        return;
    }

    // Simulate transferring points to another user (this would be sent to the backend in a real app)
    userPoints -= pointsToTransfer;

    // Update the points in the profile
    document.getElementById('user-points').textContent = userPoints;

    // Success message
    document.getElementById('transfer-status').textContent = `Successfully transferred ${pointsToTransfer} points to ${recipientUsername}.`;
});
