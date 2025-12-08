

// The codes in the following comments is throwing error, some kind of object confusion in local storage 
    // this 'products' variable is meant to always contain the array of all products from the api.
    // page reloads shouldn't nullify the existing data meant for this 'products' variable, 
    // therefore the following condition is established,
// declaring the products variable and initialising with local storage property
// if(localStorage.getItem("all-products-from-api") !== null){
//   const data = localStorage.getItem("all-products-from-api");
//   products = JSON.parse(data);
// } else {
//   products = []; 
//   localStorage.setItem("all-products-from-api",JSON.stringify(products));
// }


// Making product navigation hide/show based on scrollY direction
let lastScrollY = window.scrollY;
const productNavigation = document.getElementById('product-navigation');
// Get the height of the main header/area above the product navigation (16 * 4 = 64px, assuming base 4px rem scale)
// You might need to measure this more accurately if 'top-16' isn't precise enough
const stickyLimit = 600; 
window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Only apply the smart-header logic IF we have scrolled past the point where it would be sticky
    if (currentScrollY > stickyLimit) {
        if (currentScrollY > lastScrollY) {
            // Scrolling DOWN: Hide it completely
            productNavigation.classList.add("-translate-y-full"); 
        } else {
            // Scrolling UP: Show it smoothly
            productNavigation.classList.remove("-translate-y-full");
        }
    } 
    // Optional: Ensure it's always visible when you are back near the top of the page
    else {
         productNavigation.classList.remove("-translate-y-full");
    }

    lastScrollY = currentScrollY;
});


// Dynamic title of "Latest Products / Products"
const productsLink = document.getElementById("products-link");
productsLink.addEventListener('click', () => {
  document.getElementById("products-title").textContent = "Products";
});
const homeLink = document.getElementById("home-link");
homeLink.addEventListener('click', () => {
  document.getElementById("products-title").textContent = "Latest Products";
});

// Function to create a card from templete & append into the container, by getting a product's details. 
function createCard(title, img, desc, price, id) {
    // Get template content - containg the product card
    const template = document.getElementById("product-card-template");
    // create the product card
    const card = template.content.cloneNode(true);
    // Insert data
    card.querySelector(".product-title").textContent = title;
    card.querySelector(".product-img").src = img;
    card.querySelector(".product-description").textContent = desc;
    card.querySelector(".product-price").textContent = "$ "+price;
  // IMPORTANT: Use setAttribute() to assign the product ID to a standard data attribute, for linking with carted products in the local storage.
    card.querySelector(".add-cart-btn").setAttribute('data-product-id', id);
    card.querySelector(".details-btn").setAttribute('data-product-id', id);
    // UPDATE existing cart status for the cart
    if (localStorage.getItem("products-in-cart")) {
      const productsInCart = JSON.parse(localStorage.getItem("products-in-cart"));
      const productInCart = productsInCart.find(obj => obj.id === id);
      if(productInCart !== undefined) {
        //update styling for 'Added To Cart' in button
        const cartedProduct = card.querySelector(".add-cart-btn");
        cartedProduct.textContent = "Added To Cart";
        cartedProduct.disabled = true;
        cartedProduct.classList.add('bg-green-500');
        //update data about quantity & pricing
        let currentCard = card;
        let unitsCount = currentCard.querySelector('.count-units');
          unitsCount.textContent = productInCart.countUnits;
          currentCard.querySelector('.multiply-symbol').textContent = "x";
        let subTotal = currentCard.querySelector('.sub-total');
          let result = productInCart.countUnits * productInCart.price;
          subTotal.textContent = "$ "+result;
        // enable item counter
        // DYNAMIC UPDATE (card data): 
        // DOM traversing to select the parent card (container) of clickedButton
        
          //let unitsCount = currentCard.querySelector('.count-units');
           // unitsCount.textContent = productInCart.countUnits;
           // currentCard.querySelector('.multiply-symbol').textContent = "x";
          //let subTotal = currentCard.querySelector('.sub-total');
           // let result = productInCart.countUnits * productInCart.price;
           // subTotal.textContent = "$ "+result;
          
          // display counters in the card by removing the pre-styled class "hidden" 
          let countUnitsContainer = currentCard.querySelector('.count-units-container');
          countUnitsContainer.hidden = false;
          card.querySelector(".decrease-product-quantity").setAttribute('data-product-id', productInCart.id);
          card.querySelector(".increase-product-quantity").setAttribute('data-product-id', productInCart.id);
          let countUnitsInput = countUnitsContainer.querySelector('.count-units-input');
          countUnitsInput.textContent = productInCart.countUnits;
        
      }
    }
    // Add card to page
    document.getElementById("card-container").appendChild(card);
}

// Function to Remove all products form the container
function removeProducts() {
  const clrContainer = document.getElementById("card-container");
  clrContainer.innerHTML = "";
}

// Function to Get all products, from external API, and send them to createCard function.
let products = null;  // it works automatically, 
    // as all products are already loaded before "Add To Cart" can be clicked.
// Define an async function
async function getAllProducts() {
  // Now 'await' is allowed inside here
  //reset the container
  removeProducts();
  // Step 1: Requesting the data
  const response = await fetch('https://fakestoreapi.com/products');
      // connecting the variable named products with local storage to initialize it globally.
  localStorage.setItem("all-products-from-api", response); 
  // Step 2: Parsing the stream
  const data = await response.json();
  products = data; 
  // 'products' now holds the memory address of the Array containing all the objects recieved via api.
  for (let product of products) { // Accesses memory to find all the keys and values in each object
    for(let key in product) {
        console.log(key+": "+product[key]); //not main logic: only to verify data in console log
    } 
    createCard(product.title, product.image, product.description, product.price, product.id);
  }
}

// Function to customize the product list
function customProductList(categoryValue) {
  for (let product of products) { // Accesses memory to find all the keys and values in each object
    if(product.category === categoryValue) {
      createCard(product.title, product.image, product.description, product.price, product.id);
    }
  }
}

// Function to show the customised product list from top 
function topViewOfList() {
  const targetElement = document.getElementById('card-container');
  if (targetElement) {
// Get the element's position relative to the viewport
    const elementPosition = targetElement.getBoundingClientRect().top;
    
    // Calculate the desired final scroll position
    // window.scrollY gives current vertical position
    // We add the element's position (which might be negative if already scrolled past)
    // and subtract the desired offset (130px)
    const offsetPosition = elementPosition + window.scrollY - 130;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });  
  }
}

// funtion to update the no of products already added to the cart, gets the length of products in cart from local storage.
function updateCartCount () {
  const existingCartProducts = JSON.parse(localStorage.getItem('products-in-cart')) || [];
  const cartValue = existingCartProducts.length;
  const cartValueContainer = document.getElementById("products-in-cart");
  cartValueContainer.textContent = cartValue;
}

// Load all products on page load
getAllProducts();
updateCartCount();
// List the products based on customized options
// All Products
  document.getElementById("all-products").addEventListener('click', () => {
    removeProducts();
    getAllProducts();
    topViewOfList();
  });
// Men's Clothing
  document.getElementById("mens-products").addEventListener('click', () => {
    removeProducts();
    customProductList("men's clothing");
    topViewOfList();
  });
// Women's Clothing
  document.getElementById("womens-products").addEventListener('click', () => {
    removeProducts();
    customProductList("women's clothing");
    topViewOfList();
  });
// Jewelery
 document.getElementById("jewelery-products").addEventListener('click', () => {
    removeProducts();
    customProductList("jewelery");
    topViewOfList();
  });
// Electronics
 document.getElementById("electronic-products").addEventListener('click', () => {
    removeProducts();
    customProductList("electronics");
    topViewOfList();
  });


// ADD TO CART : 
    // 1, get the data-product-id of selected card
    // 2, track no of products in cart, with a cart-value key in local storage
    // 3, Attach one single listener to the static parent container
document.getElementById("card-container").addEventListener('click', (event) => {
    // Check if the element clicked (event.target) has the class 'add-cart-btn'
    if (event.target && event.target.classList.contains('add-cart-btn')) {
      // 'categoryValue' is a non-standard property you assigned, a better practice is to use a data attribute (data-product-id)
      // const productId = parseInt(event.target.dataset.productId);  // another method to get data-product-id
      const productId = parseInt(event.target.getAttribute('data-product-id'));

      // Use the globally available 'products' array to find the match
      const product = products.find(obj => obj.id === productId);
 
      if (product) { 
        // adding additional data to the selected product, to keep track of the number of units in the product's order.
        product.countUnits = 1;
        // the existing products will be in json formatted objects as a single string "[{p1},{p2},{p3}..]"
        // so it's required to parse it's value into objects, as the data is fetched from the local storage
        let existingCartProducts = JSON.parse(localStorage.getItem('products-in-cart')) || [];
        // Adding the newly selected product object into the array of existing products in the cart
        existingCartProducts.push(product);
        const updatedCartProductsString = JSON.stringify(existingCartProducts);
        localStorage.setItem('products-in-cart',updatedCartProductsString);
        //cartProductsString += oldCartProductsString; // this is wrong.. json won't support this resulting data format, "[]"+"[]" = "[][]"

    //Dynamic Update : really exhausting me here
        let clickedButton = event.target;
      // DYNAMIC UPDATE (card data): 
        // DOM traversing to select the parent card (container) of clickedButton
        let currentCard = clickedButton.closest('.product-card');
        if (currentCard) {
          let unitsCount = currentCard.querySelector('.count-units');
            unitsCount.textContent = product.countUnits;
            currentCard.querySelector('.multiply-symbol').textContent = "x";
          let subTotal = currentCard.querySelector('.sub-total');
            let result = product.countUnits * product.price;
            subTotal.textContent = "$ "+result;
          
          // display counters in the card by removing the pre-styled class "hidden" 
          let countUnitsContainer = currentCard.querySelector('.count-units-container');
          countUnitsContainer.hidden = false;
          let countUnitsInput = countUnitsContainer.querySelector('.count-units-input');
          countUnitsInput.textContent = product.countUnits;
          currentCard.querySelector(".decrease-product-quantity").setAttribute('data-product-id', product.id);
          currentCard.querySelector(".increase-product-quantity").setAttribute('data-product-id', product.id);
        }

      // DYNAMIC UPDATE (card styling):
        // change the state of "Add To Cart" button
        clickedButton.disabled = true; // disable the clicked button
        clickedButton.textContent = "Added to Cart"; 
        //change background color of disabled button
          //clickedButton.classList.remove('bg-black');
        clickedButton.classList.add('bg-green-500');
        // change the state of "cart(0)" icon in the header section of cart.html
        let cartValue = existingCartProducts.length;
        let cartValueContainer = document.getElementById("products-in-cart");
        cartValueContainer.textContent = cartValue;
       // let AddToCartButton = document.getElementsByClassName 
      } 
    }
  });



// let addToCartBtn = null;
// document.addEventListener("DOMContentLoaded", function() {
//   addToCartBtn = document.getElementsByClassName("add-cart-btn");
//  // Or querySelector('.your-class')

//   if (addToCartBtn) {
//     addToCartBtn.addEventListener('click', () => {
//     // Your add to cart logic
//       const productId = addToCartBtn.categoryValue;
//       const product = products.find(obj => obj.id === productId);

//       // add the new product as json formated object to 'cartProducts' Array
//       // convert the 'cartProducts' array into string and save it in local storage
//       // then retrive this string on the other DOM, and jason.parse(the stored string) to array of objects.
//       // then pass each product key as arguement to createCardInCart(.......);
//       createCardInCart(product.img,product.title,product.price);
//     });
//   }
//   else {
//     console.error("No Products loaded yet!");
//   }
//   });

    // // On page1.html
    // document.getElementById('myButton').addEventListener('click', () => {
    //     localStorage.setItem('messageForNextPage', 'Hello from Page 1!');
    //     window.location.href = 'page2.html'; // Navigate to the next page
    // });

    // // On page2.html
    // document.addEventListener('DOMContentLoaded', () => {
    //     const message = localStorage.getItem('messageForNextPage');
    //     if (message) {
    //         document.getElementById('displayArea').textContent = message;
    //         localStorage.removeItem('messageForNextPage'); // Clean up
    //     }
    // });        