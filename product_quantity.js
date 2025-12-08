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
                let unitsCount = currentCard.querySelector('.count-units');
                if (unitsCount) unitsCount.textContent = productInCart.countUnits;
                
                // ... other updates ...

                let countUnitsInput = currentCard.querySelector('.count-units-input');
                if (countUnitsInput) countUnitsInput.textContent = productInCart.countUnits;
            }
            
            // CRITICAL: Update localStorage after changing the array
            localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
        }
    }
    else if (event.target && event.target.classList.contains('increase-product-quantity')) {
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
                let unitsCount = currentCard.querySelector('.count-units');
                if (unitsCount) unitsCount.textContent = productInCart.countUnits;
                
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
//                 let unitsCount = currentCard.querySelector('.count-units');
//                 if (unitsCount) unitsCount.textContent = productInCart.countUnits;
                
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