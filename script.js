// Initialize Google Auth2 client
function start() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com' // Replace with your client ID
        });
    });
}

// Google Sign-In success handler
function onSignIn(googleUser) {
    // Get user details after a successful login
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;

    console.log("ID Token: " + id_token);
    console.log("Full Name: " + profile.getName());
    console.log("Given Name: " + profile.getGivenName());
    console.log("Email: " + profile.getEmail());

    // You can send the token to your server for validation
    // Example: send id_token to your server to verify and authenticate the user
    // fetch('/auth/google', { method: 'POST', body: JSON.stringify({ token: id_token }) });

    // Hide Google Sign-In button and show the sign-out button
    document.getElementById('google-sign-in-btn').style.display = 'none';
    document.getElementById('sign-out-btn').style.display = 'block';

    // Optionally, redirect to a dashboard page or show the user profile
    window.location.href = '/dashboard'; // Redirect to a dashboard or protected page
}

// Sign-out function
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
        document.getElementById('google-sign-in-btn').style.display = 'block';
        document.getElementById('sign-out-btn').style.display = 'none';

        // Redirect to the homepage or login page after sign-out
        window.location.href = '/';
    });
}

// Call start() function once the page has loaded
window.onload = function() {
    start();
};
