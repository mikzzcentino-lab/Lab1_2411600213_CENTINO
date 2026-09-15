let products = [
    {
        id: 1,
        name: "Laptop",
        sku: "LAP001",
        category: "Electronics",
        quantity: 10,
        unit_price: 35000,
        reorder_level: 5
    },
    {
        id: 2,
        name: "Mouse",
        sku: "MOU001",
        category: "Accessories",
        quantity: 4,
        unit_price: 500,
        reorder_level: 5
    },
    {
        id: 3,
        name: "Keyboard",
        sku: "KEY001",
        category: "Accessories",
        quantity: 8,
        unit_price: 1200,
        reorder_level: 5
    },
    {
        id: 4,
        name: "Monitor",
        sku: "MON001",
        category: "Electronics",
        quantity: 2,
        unit_price: 8500,
        reorder_level: 5
    },
    {
        id: 5,
        name: "Printer",
        sku: "PRI001",
        category: "Office",
        quantity: 0,
        unit_price: 6500,
        reorder_level: 2
    }
];

function getProducts() {
    return products;
}

function getProductById(id) {
    return products.find(product => product.id === id);
}

function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

function getLowStockProducts() {
    return products.filter(
        product => product.quantity <= product.reorder_level
    );
}
console.log("dataManager.js is working");