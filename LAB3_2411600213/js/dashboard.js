// Check if the user is logged in
const username = localStorage.getItem("username");

if (!username) {
    // If no username is found, return to login page
    window.location.href = "index.html";
}


// Display username in the navigation bar
const navUsername = document.getElementById("navUsername");

if (navUsername) {
    navUsername.textContent = username;
}


// Update the greeting based on the time of day
function updateGreeting() {

    const greeting = document.getElementById("greeting");
    const currentHour = new Date().getHours();

    let message;

    if (currentHour < 12) {
        message = "Good Morning";
    } 
    else if (currentHour < 18) {
        message = "Good Afternoon";
    } 
    else {
        message = "Good Evening";
    }

    greeting.textContent = message + ", " + username + "!";
}


// Update statistics
function updateStatistics() {

    const stats = [
        {
            title: "GPA",
            value: "1.75",
            description: "Overall GPA"
        },
        {
            title: "Courses",
            value: "6",
            description: "Enrolled courses"
        },
        {
            title: "Assignments",
            value: "3",
            description: "Pending assignments"
        },
        {
            title: "Attendance",
            value: "95%",
            description: "Attendance rate"
        }
    ];


    stats.forEach(function (stat, index) {

        const number = index + 1;

        document.getElementById(`stat${number}-title`).textContent =
            stat.title;

        document.getElementById(`stat${number}-value`).textContent =
            stat.value;

        document.getElementById(`stat${number}-description`).textContent =
            stat.description;

    });
}


// Populate recent activity table
function populateActivityTable() {

    const activities = [
        {
            date: "August 28, 2026",
            activity: "Submitted Web Systems Activity",
            course: "Web Systems",
            status: "Completed"
        },
        {
            date: "August 27, 2026",
            activity: "Viewed Programming Materials",
            course: "Java Programming",
            status: "Completed"
        },
        {
            date: "August 26, 2026",
            activity: "Submitted Networking Assignment",
            course: "Networking",
            status: "Completed"
        },
        {
            date: "August 25, 2026",
            activity: "New Assignment Posted",
            course: "Database Systems",
            status: "Pending"
        }
    ];


    const table = document.getElementById("activityTable");

    table.innerHTML = "";


    activities.forEach(function (activity) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${activity.date}</td>
            <td>${activity.activity}</td>
            <td>${activity.course}</td>
            <td>
                <span class="badge ${
                    activity.status === "Completed"
                    ? "bg-success"
                    : "bg-warning text-dark"
                }">
                    ${activity.status}
                </span>
            </td>
        `;

        table.appendChild(row);

    });
}


// Logout function
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        // Remove logged-in user
        localStorage.removeItem("username");

        // Return to login page
        window.location.href = "index.html";

    });

}


// Run dashboard functions
updateGreeting();
updateStatistics();
populateActivityTable();