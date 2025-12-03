// const header = document.getElementById("main-header");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 0) {
//     header.classList.add("bottom-shade");
//   } else {
//     header.classList.remove("bottom-shade");
//   }
// });

const header = document.getElementById("main-header");
let lastScrollY = window.scrollY;
let products = null;
window.addEventListener("scroll", () => {
    // 1. Get current scroll position
    const currentScrollY = window.scrollY;

    // 2. Determine Direction
    // If current > last, we are scrolling DOWN.
    // We also check if scrollY > 0 to prevent glitching at the very top.
    if (currentScrollY > lastScrollY && currentScrollY > 0) {
        // Apply Tailwind class to move header up (out of view)
        header.classList.add("-translate-y-full"); 
        header.classList.add("bottom-shade");
    } else {
        // We are scrolling UP. Remove the class to bring header back.
        header.classList.remove("-translate-y-full");
        header.classList.remove("bottom-shade");
    }

    // 3. Update last scroll position for the next event loop
    lastScrollY = currentScrollY;
});

const productsLink = document.getElementById("products-link");
productsLink.addEventListener('click', () => {
  document.getElementById("products-title").textContent = "Products";
});
const homeLink = document.getElementById("home-link");
homeLink.addEventListener('click', () => {
  document.getElementById("products-title").textContent = "Latest Products";
});

function createCard(title, img, desc, price) {

    // Get template content
    const template = document.getElementById("product-card-template");
    const card = template.content.cloneNode(true);

    // Insert data
    card.querySelector(".product-title").textContent = title;
    card.querySelector(".product-img").src = img;
    card.querySelector(".product-description").textContent = desc;
    card.querySelector(".product-price").textContent = "$ "+price;

    // Add card to page
    document.getElementById("card-container").appendChild(card);
}

// Example usage
// createCard("Bag", "https://via.placeholder.com/100", "A nice bag.");
// createCard("Watch", "https://via.placeholder.com/100", "Premium watch.");

// Get all products.
// 1. Define an async function
async function getProducts() {
  // Now 'await' is allowed inside here
  // Step 1: Requesting the data
  const response = await fetch('https://fakestoreapi.com/products');
  // Step 2: Parsing the stream
  const data = await response.json();
  products = data; 
  // 'products' now holds the memory address of the Array containing all the objects recieved via api.
  for (let product of products) { // Accesses memory to find all the keys and values in each object
    for(let key in product) {
        console.log(key+": "+product[key]); //not main logic: only to verify data in console log
    } 
    createCard(product.title, product.image, product.description, product.price);
  }
}

// Function to Remove all products form the container
function removeProducts() {
  const clrContainer = document.getElementById("card-container");
  clrContainer.innerHTML = '';
}

// Function to customize the product list
function customProductList(categoryValue) {
  for (let product of products) { // Accesses memory to find all the keys and values in each object
    if(product.category === categoryValue) {
      createCard(product.title, product.image, product.description, product.price);
    }
  }
}

// Load all products on page load
 getProducts();

// List the products based on customized options
// Men's Clothing
  document.getElementById("mens-products").addEventListener('click', () => {
    removeProducts();
    customProductList("men's clothing");
  });
// Women's Clothing
  document.getElementById("womens-products").addEventListener('click', () => {
    removeProducts();
    customProductList("women's clothing");
  });
// Jewelery
 document.getElementById("jewelery-products").addEventListener('click', () => {
    removeProducts();
    customProductList("jewelery");
  });
// Electronics
 document.getElementById("electronic-products").addEventListener('click', () => {
    removeProducts();
    customProductList("electronics");
  });




            