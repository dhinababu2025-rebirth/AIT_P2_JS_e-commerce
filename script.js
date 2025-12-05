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
// if(cartProducts) {}
//let cartProducts = [];
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
  // IMPORTANT: Use setAttribute() to assign the product ID to a standard data attribute.
    card.querySelector(".add-cart-btn").setAttribute('data-product-id', id);
    card.querySelector(".details-btn").setAttribute('data-product-id', id);

    // Add card to page
    document.getElementById("card-container").appendChild(card);
}

// Function to Remove all products form the container
function removeProducts() {
  const clrContainer = document.getElementById("card-container");
  clrContainer.innerHTML = "";
}

// Function to Get all products, 
  // from external API, and send them to createCard function.
// 1. Define an async function
async function getAllProducts() {
  // Now 'await' is allowed inside here
  //reset the container
  removeProducts();
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
    createCard(product.title, product.image, product.description, product.price, product.id);
  }
}

// Function to customize the product list
function customProductList(categoryValue) {
  for (let product of products) { // Accesses memory to find all the keys and values in each object
    if(product.category === categoryValue) {
      createCard(product.title, product.image, product.description, product.price);
    }
  }
}

// Function
function topViewOfList() {
  const targetElement = document.getElementById('card-container');
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


// Load all products on page load
 getAllProducts();

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
    // 2, 
// Attach one single listener to the static parent container
document.getElementById("card-container").addEventListener('click', (event) => {
    // Check if the element clicked (event.target) has the class 'add-cart-btn'
    if (event.target && event.target.classList.contains('add-cart-btn')) {
      // 'categoryValue' is a non-standard property you assigned, a better practice is to use a data attribute (data-product-id)

      // const productId = parseInt(event.target.dataset.productId);  // another method to get id
      const productId = parseInt(event.target.getAttribute('data-product-id'));

      // Use the globally available 'products' array to find the match
      const product = products.find(obj => obj.id === productId);
 
      if (product) {
        // the existing products will be in json formatted objects as a single string "[{p1},{p2},{p3}..]"
        // so it's required to parse it's value into objects, as the data is fetched from the local storage
        let existingCartProducts = JSON.parse(localStorage.getItem('products-in-cart')) || [];
        // Adding the newly selected product object into the array of existing products in the cart
        existingCartProducts.push(product);
        const updatedCartProductsString = JSON.stringify(existingCartProducts);
        localStorage.setItem('products-in-cart',updatedCartProductsString);
        //cartProductsString += oldCartProductsString; // this is wrong.. json won't support this resulting data format, "[]"+"[]" = "[][]"
      } 
        console.log(`Added product ${productId} to cart.`);
      
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