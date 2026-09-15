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


// Display inventory
function displayInventory(products) {

    const table = document.getElementById("inventoryTable");

    table.innerHTML = "";

    products.forEach(function(product) {

        const row = document.createElement("tr");

        let status;

        if (product.quantity === 0) {
            status = "Out of Stock";
        } 
        else if (product.quantity <= product.reorder_level) {
            status = "Low Stock";
        } 
        else {
            status = "In Stock";
        }

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.sku}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>₱${product.unit_price.toLocaleString()}</td>
            <td>${status}</td>
        `;

        table.appendChild(row);
    });
}


// Load categories
function loadCategories() {

    const categoryFilter = document.getElementById("categoryFilter");

    const products = getProducts();

    const categories = [...new Set(
        products.map(product => product.category)
    )];

    categories.forEach(function(category) {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


// Initial display
displayInventory(getProducts());

loadCategories();

document.getElementById("categoryFilter").addEventListener("change", function() {

    const selectedCategory = this.value;

    const products = getProducts();

    if (selectedCategory === "all") {

        displayInventory(products);

    } else {

        const filteredProducts = products.filter(function(product) {

            return product.category === selectedCategory;

        });

        displayInventory(filteredProducts);
    }
});

document.getElementById("stockFilter").addEventListener("change", function() {

    const selectedStatus = this.value;

    const products = getProducts();

    if (selectedStatus === "all") {

        displayInventory(products);

    } else {

        const filteredProducts = products.filter(function(product) {

            if (selectedStatus === "in stock") {
                return product.quantity > product.reorder_level;
            }

            if (selectedStatus === "low stock") {
                return product.quantity > 0 &&
                       product.quantity <= product.reorder_level;
            }

            if (selectedStatus === "out of stock") {
                return product.quantity === 0;
            }

        });

        displayInventory(filteredProducts);
    }
});

document.getElementById("searchInput").addEventListener("input", function() {

    const searchValue = this.value.toLowerCase();

    const products = getProducts();

    const filteredProducts = products.filter(function(product) {

        return product.name.toLowerCase().includes(searchValue) ||
               product.sku.toLowerCase().includes(searchValue);

    });

    displayInventory(filteredProducts);
});

function updateLowStockAlert() {

    const alert = document.getElementById("lowStockAlert");

    const products = getProducts();

    const lowStockProducts = products.filter(function(product) {

        return product.quantity > 0 &&
               product.quantity <= product.reorder_level;

    });

    if (lowStockProducts.length > 0) {

        alert.textContent =
            "⚠️ " + lowStockProducts.length +
            " low stock item(s) detected!";

        alert.style.display = "block";

    } else {

        alert.style.display = "none";
    }
}

updateLowStockAlert();

function createStockChart() {

    const products = getProducts();

    const productNames = products.map(function(product) {
        return product.name;
    });

    const quantities = products.map(function(product) {
        return product.quantity;
    });

    const ctx = document.getElementById("stockChart");

    new Chart(ctx, {
        type: "bar",

        data: {
            labels: productNames,

            datasets: [{
                label: "Stock Quantity",
                data: quantities
            }]
        },

        options: {
            responsive: true,

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

createStockChart();

function createCategoryChart() {

    const products = getProducts();

    const categories = {};

    products.forEach(function(product) {

        if (categories[product.category]) {
            categories[product.category]++;
        } else {
            categories[product.category] = 1;
        }

    });

    const categoryNames = Object.keys(categories);
    const categoryCounts = Object.values(categories);

    const ctx = document.getElementById("categoryChart");

    new Chart(ctx, {
        type: "doughnut",

        data: {
            labels: categoryNames,

            datasets: [{
                label: "Products",
                data: categoryCounts
            }]
        },

        options: {
            responsive: true
        }
    });
}

createCategoryChart();

function exportCSV() {

    const products = getProducts();

    let csv = "Product,SKU,Category,Quantity,Unit Price,Status\n";

    products.forEach(function(product) {

        let status;

        if (product.quantity === 0) {
            status = "Out of Stock";
        } 
        else if (product.quantity <= product.reorder_level) {
            status = "Low Stock";
        } 
        else {
            status = "In Stock";
        }

        csv += `"${product.name}","${product.sku}","${product.category}",${product.quantity},${product.unit_price},"${status}"\n`;
    });

    const blob = new Blob([csv], {
        type: "text/csv"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "inventory.csv";

    link.click();

    URL.revokeObjectURL(url);
}

document.getElementById("exportCSVButton").addEventListener("click", function() {
    exportCSV();
});

setInterval(function() {

    updateLowStockAlert();

    displayInventory(getProducts());

}, 5000);