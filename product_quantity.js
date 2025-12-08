// --- CORRECT DATA SETUP ---

// 1. Get the string from localStorage (synchronous)
const localCollectionString = localStorage.getItem('products-in-cart'); 
  
// 2. Parse the string into a real JavaScript Array of Objects (synchronous)
//    Use || [] to ensure it's an empty array if nothing is stored yet.
let productsInCart = JSON.parse(localCollectionString) || [];
console.log(productsInCart);
// productsInCart is now an ARRAY, and all subsequent code should work.


// --- EVENT LISTENER FOR DECREMENT BUTTONS  ---
// for(let i=0; i<2; i++) {
const container = document.getElementsByClassName("card-container")
container[0].addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('decrease-product-quantity')) {
        const productId = parseInt(event.target.getAttribute('data-product-id'));
        console.log("Product Id is : "+productId);
        // This line now works because 'productsInCart' is guaranteed to be an Array
        let productInCart = productsInCart.find(obj => obj.id === productId);
        console.log("event triggered");
        if (productInCart && productInCart.countUnits > 1) { // Added safety check
            productInCart.countUnits -= 1;
            console.log("product count is on"+productInCart.countUnits);
            let clickedButton = event.target;
            let currentCard = clickedButton.closest('.product-card');
            if (currentCard) {
                // ... (rest of your DOM update logic with safety checks) ...
                let countUnits = currentCard.querySelector('.count-units');
                if (countUnits) countUnits.textContent = productInCart.countUnits;

                let subTotal = currentCard.querySelector('.sub-total');
                if (subTotal) subTotal.textContent = "$ "+(productInCart.countUnits * productInCart.price).toFixed(2);
                
                let productPrice = currentCard.querySelector('.product-price');
                if (productPrice) productPrice.textContent = "$ "+productInCart.price;
                // ... other updates ...

                let countUnitsInput = currentCard.querySelector('.count-units-input');
                if (countUnitsInput) countUnitsInput.textContent = productInCart.countUnits;
            }
            // CRITICAL: Update localStorage after changing the array
            localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
        } 
         else if (productInCart && productInCart.countUnits === 1) { // Added safety check
                productInCart.countUnits = 0;
                let clickedButton = event.target;
                let currentCard = clickedButton.closest('.product-card');
                if (currentCard) {
                    // ... (rest of your DOM update logic with safety checks) ...
                    let countUnitsContainer = currentCard.querySelector('.count-units-container');
                    if (countUnitsContainer) countUnitsContainer.hidden = true;
                    
                    let addToCartButton = currentCard.querySelector('.add-cart-btn');
                    if (addToCartButton) {
                        addToCartButton.disabled = false;
                        addToCartButton.textContent = "Add To Cart";
                        addToCartButton.classList.remove('bg-green-500');
                    } 
                    let productPrice = currentCard.querySelector('.product-price');
                    if (productPrice) productPrice.textContent = "$ "+productInCart.price;
                    // ... other updates ..

                    let countUnits = currentCard.querySelector('.count-units');
                    if (countUnits) countUnits.textContent = "";

                    let multiplySymbol = currentCard.querySelector('.multiply-symbol');
                    if (multiplySymbol) multiplySymbol.textContent = "";

                    let subTotal = currentCard.querySelector('.sub-total');
                    if (subTotal) subTotal.textContent = "";
                }
                
                // CRITICAL: Update localStorage after changing the array
                const removeProductUsingId = productId;
                productsInCart = productsInCart.filter((item) => item.id !== removeProductUsingId);
                localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));

                // removing the card in order summary
                if (currentCard.classList.contains('product-card-in-cart')) currentCard.remove();

                function updateCartCount () {
                    const existingCartProducts = JSON.parse(localStorage.getItem('products-in-cart')) || [];
                    const cartValue = existingCartProducts.length;
                    const cartValueContainer = document.getElementById("products-in-cart");
                    cartValueContainer.textContent = cartValue;
                    return cartValue;
                    }
                //updateCartCount();
                let productsInOrderSummary = document.getElementById("no-of-products-order-summary");
                if(productsInOrderSummary) productsInOrderSummary.textContent = updateCartCount();

            }
    }
   
        
        
    if (event.target && event.target.classList.contains('increase-product-quantity')) {
        const productId = parseInt(event.target.getAttribute('data-product-id'));
        console.log("Product Id is : "+productId);
        // This line now works because 'productsInCart' is guaranteed to be an Array
        let productInCart = productsInCart.find(obj => obj.id === productId);
        console.log("event triggered");
        if (productInCart && productInCart.countUnits < 1000) { // Added safety check
            productInCart.countUnits += 1;
            console.log("product count is on"+productInCart.countUnits);
            let clickedButton = event.target;
            let currentCard = clickedButton.closest('.product-card');

            if (currentCard) {
                // ... (rest of your DOM update logic with safety checks) ...
                let countUnitsContainer = currentCard.querySelector('.count-units');
                if (countUnitsContainer) countUnitsContainer.textContent = productInCart.countUnits;
                
                let subTotal = currentCard.querySelector('.sub-total');
                if (subTotal) subTotal.textContent = "$ "+(productInCart.countUnits * productInCart.price).toFixed(2);
                // ... other updates ...

                let countUnitsInput = currentCard.querySelector('.count-units-input');
                if (countUnitsInput) countUnitsInput.textContent = productInCart.countUnits;
            }
            
            // CRITICAL: Update localStorage after changing the array
            localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
        }
    }
});
// }


// // --- EVENT LISTENER FOR INCREMENT BUTTONS  ---
// for(let i=0; i<2; i++) {
// const container = document.getElementsByClassName("card-container")
// container[0].addEventListener('click', (event) => {
//     if (event.target && event.target.classList.contains('increase-product-quantity')) {
//         const productId = parseInt(event.target.getAttribute('data-product-id'));
//         console.log("Product Id is : "+productId);
//         // This line now works because 'productsInCart' is guaranteed to be an Array
//         let productInCart = productsInCart.find(obj => obj.id === productId);
//         console.log("event triggered");
//         if (productInCart && productInCart.countUnits < 1000) { // Added safety check
//             productInCart.countUnits += 1;
//             console.log("product count is on"+productInCart.countUnits);
//             let clickedButton = event.target;
//             let currentCard = clickedButton.closest('.product-card');

//             if (currentCard) {
//                 // ... (rest of your DOM update logic with safety checks) ...
//                 let countUnitsContainer = currentCard.querySelector('.count-units');
//                 if (countUnitsContainer) countUnitsContainer.textContent = productInCart.countUnits;
                
//                 // ... other updates ...

//                 let countUnitsInput = currentCard.querySelector('.count-units-input');
//                 if (countUnitsInput) countUnitsInput.textContent = productInCart.countUnits;
//             }
            
//             // CRITICAL: Update localStorage after changing the array
//             localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
//         }
//     }
// });
// }