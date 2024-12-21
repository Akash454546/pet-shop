// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Handle Buy Now button click
    const buyNowButton = document.getElementById('buyNowButton');
    if (buyNowButton) {
        buyNowButton.addEventListener('click', () => {
            window.location.href = 'address.html';
        });
    }

    // Handle address form submission
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
        addressForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(addressForm);
            const orderData = {};
            formData.forEach((value, key) => {
                orderData[key] = value;
            });

            // Generate an order ID
            const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
            orderData.orderId = orderId;
            orderData.status = 'Processing';

            // Save order data to localStorage
            localStorage.setItem('orderData', JSON.stringify(orderData));

            // Redirect to order confirmation page
            window.location.href = 'confirm_order.html';
        });
    }

    // Display order details on confirmation page
    const orderDetailsElement = document.getElementById('orderDetails');
    if (orderDetailsElement) {
        const orderData = JSON.parse(localStorage.getItem('orderData'));
        if (orderData) {
            orderDetailsElement.innerHTML = `
                <p>Name: ${orderData.name}</p>
                <p>Address: ${orderData.address}</p>
                <p>City: ${orderData.city}</p>
                <p>State: ${orderData.state}</p>
                <p>ZIP Code: ${orderData.zip}</p>
                <p>Order ID: ${orderData.orderId}</p>
                <p>Status: ${orderData.status}</p>
            `;
        } else {
            orderDetailsElement.innerHTML = '<p>No order details found.</p>';
        }
    }

    // Display order status on order status page
    const orderIdElement = document.getElementById('orderId');
    const orderStatusElement = document.getElementById('orderStatus');
    if (orderIdElement && orderStatusElement) {
        const orderData = JSON.parse(localStorage.getItem('orderData'));
        if (orderData) {
            orderIdElement.innerText = orderData.orderId;
            orderStatusElement.innerHTML = `
                <p>Status: ${orderData.status}</p>
            `;
        } else {
            orderStatusElement.innerHTML = '<p>No order details found.</p>';
        }
    }
});