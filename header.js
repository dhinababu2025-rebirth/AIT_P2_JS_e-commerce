function updateCartCount () {
  const existingCartProducts = JSON.parse(localStorage.getItem('products-in-cart')) || [];
  const cartValue = existingCartProducts.length;
  const cartValueContainer = document.getElementById("products-in-cart");
  cartValueContainer.textContent = cartValue;
}
updateCartCount();

// const btn = document.getElementById('mobile-menu-btn');
//         const sidebar = document.getElementById('sidebar');

//         btn.addEventListener('click', () => {
//             sidebar.classList.toggle('-translate-x-full');
//         });
function toggleSidebar() {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    // Toggle the sidebar position (slide in/out)
    // We remove the negative translate to show it
    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
        
        // Show overlay
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        sidebar.classList.remove('translate-x-0');
        
        // Hide overlay
        overlay.classList.add('hidden');
    }
}