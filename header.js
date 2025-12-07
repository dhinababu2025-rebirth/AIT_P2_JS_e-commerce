function updateCartCount () {
  const existingCartProducts = JSON.parse(localStorage.getItem('products-in-cart')) || [];
  const cartValue = existingCartProducts.length;
  const cartValueContainer = document.getElementById("products-in-cart");
  cartValueContainer.textContent = cartValue;
}
updateCartCount();