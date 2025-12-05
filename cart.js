function createCardInCart(img, title, price) {
    // Get template content - containg the product card
    const template = document.getElementById("product-card-in-cart");
    // create the product card
    const card = template.content.cloneNode(true);
    // Insert data
    card.querySelector(".product-image-in-cart").src = img;
    card.querySelector(".product-title-in-cart").textContent = title;
    // card.querySelector(".product-description").textContent = desc;
    card.querySelector(".unit-price-of-current-product").textContent = "  *  $ "+price;
    // Add card to page
    document.getElementById("products-in-cart-container").appendChild(card);
}



// Function to remove all products from the container (reuse from previous page if possible)
function removeCartProducts() {
  const clrCartContainer = document.getElementById("products-in-cart-container");
  if (clrCartContainer) {
    clrCartContainer.innerHTML = '';
  }
}

// --- Main Logic to Load Cart on Page Load ---

// Use DOMContentLoaded to ensure the container and template exist before running the logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Retrieve the JSON string from localStorage
    const storedCartString = localStorage.getItem('products-in-cart');

    const cartContainer = document.getElementById("products-in-cart-container");

    if (storedCartString && cartContainer) {
        // 2. Parse the JSON string back into a JavaScript Array of Objects
        const cartProducts = JSON.parse(storedCartString);

        if (cartProducts.length > 0) {
            removeCartProducts(); // Clear any placeholder content

            // 3. Loop through the array and create HTML elements for each product
            cartProducts.forEach(product => {
                createCardInCart(product.image, product.title, product.price);
            });
        } else {
            cartContainer.innerHTML = "<p>Your cart is currently empty.</p>";
        }

    } else if (cartContainer) {
        // Handle the case where localStorage item doesn't exist
        cartContainer.innerHTML = "<p>Your cart is currently empty.</p>";
    }
});




// // Add to Cart - button - logics..