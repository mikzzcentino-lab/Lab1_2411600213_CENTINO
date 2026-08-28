// Get the login button
const loginButton = document.getElementById("loginButton");

// Add click event listener
loginButton.addEventListener("click", function () {

    // Get username and password values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Get the alert element
    const loginAlert = document.getElementById("loginAlert");

    // Demo credentials
    const correctUsername = "admin";
    const correctPassword = "password123";

    // Check login credentials
    if (username === correctUsername && password === correctPassword) {

        // Save username to localStorage
        localStorage.setItem("username", username);

        // Redirect to dashboard
        window.location.href = "dashboard.html";

    } else {

        // Show error message
        loginAlert.classList.remove("d-none");
        loginAlert.textContent = "Invalid username or password.";
    }
});