// Expanded product list with categories
const products = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: 2999, category: "electronics", image: "shopping.avif", description: "High-quality wireless headphones with noise cancellation." },
  { id: 2, name: "Smartphone Case", price: 499, category: "electronics", image: "images.jpg", description: "Protective case for your smartphone." },
  { id: 3, name: "JavaScript Programming Book", price: 1499, category: "books", image: "https://via.placeholder.com/200x150?text=JS+Book", description: "Comprehensive guide to JavaScript programming." },
  { id: 4, name: "Cotton T-Shirt", price: 799, category: "clothing", image: "https://via.placeholder.com/200x150?text=T-Shirt", description: "Comfortable cotton t-shirt in various sizes." },
  { id: 5, name: "Stainless Steel Water Bottle", price: 1299, category: "home", image: "https://via.placeholder.com/200x150?text=Water+Bottle", description: "Insulated water bottle that keeps drinks cold." },
  { id: 6, name: "LED Desk Lamp", price: 1899, category: "home", image: "https://via.placeholder.com/200x150?text=Desk+Lamp", description: "Adjustable LED lamp for your workspace." },
  { id: 7, name: "Fitness Tracker", price: 3499, category: "electronics", image: "https://via.placeholder.com/200x150?text=Fitness+Tracker", description: "Track your steps, heart rate, and more." },
  { id: 8, name: "Coffee Maker", price: 2499, category: "home", image: "https://via.placeholder.com/200x150?text=Coffee+Maker", description: "Automatic coffee maker for perfect brews." },
  { id: 9, name: "Denim Jeans", price: 1999, category: "clothing", image: "https://via.placeholder.com/200x150?text=Jeans", description: "Classic denim jeans in multiple fits." },
  { id: 10, name: "Python Programming Book", price: 1699, category: "books", image: "https://via.placeholder.com/200x150?text=Python+Book", description: "Learn Python programming from basics to advanced." },
  { id: 11, name: "Wireless Mouse", price: 899, category: "electronics", image: "https://via.placeholder.com/200x150?text=Mouse", description: "Ergonomic wireless mouse for productivity." },
  { id: 12, name: "Yoga Mat", price: 1299, category: "home", image: "https://via.placeholder.com/200x150?text=Yoga+Mat", description: "Non-slip yoga mat for your practice." }
];

let cart = JSON.parse(localStorage.getItem('amazonCart')) || [];
let filteredProducts = [...products];

const productsDiv = document.getElementById("products");
const cartCountSpan = document.getElementById("cart-count");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const categoryFilter = document.getElementById("category-filter");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartClose = document.getElementById("cart-close");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotalDiv = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const productModal = document.getElementById("product-modal");
const productClose = document.getElementById("product-close");
const productDetailsDiv = document.getElementById("product-details");

// Initialize the app
function init() {
  updateCartCount();
  renderProducts(filteredProducts);
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  categoryFilter.addEventListener('change', handleCategoryFilter);
  cartBtn.addEventListener('click', openCartModal);
  cartClose.addEventListener('click', closeCartModal);
  productClose.addEventListener('click', closeProductModal);
  checkoutBtn.addEventListener('click', handleCheckout);
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCartModal();
    if (e.target === productModal) closeProductModal();
  });
}

// Handle search functionality
function handleSearch() {
  const query = searchInput.value.toLowerCase();
  filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
  renderProducts(filteredProducts);
}

// Handle category filtering
function handleCategoryFilter() {
  const category = categoryFilter.value;
  if (category === 'all') {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(product => product.category === category);
  }
  renderProducts(filteredProducts);
}

// Render products
function renderProducts(productList) {
  productsDiv.innerHTML = '';
  productList.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button data-id="${product.id}">Add to Cart</button>
      <button class="view-details" data-id="${product.id}">View Details</button>
    `;

    div.querySelector("button[data-id]").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product.id);
    });

    div.querySelector(".view-details").addEventListener("click", (e) => {
      e.stopPropagation();
      showProductDetails(product.id);
    });

    productsDiv.appendChild(div);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCartItems();
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountSpan.textContent = totalItems;
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('amazonCart', JSON.stringify(cart));
}

// Open cart modal
function openCartModal() {
  renderCartItems();
  cartModal.style.display = "block";
}

// Close cart modal
function closeCartModal() {
  cartModal.style.display = "none";
}

// Render cart items
function renderCartItems() {
  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
      </div>
      <button data-id="${item.id}">Remove</button>
    `;

    div.querySelector('button').addEventListener('click', () => {
      removeFromCart(item.id);
    });

    cartItemsDiv.appendChild(div);
  });

  cartTotalDiv.textContent = `Total: ₹${total}`;
}

// Show product details modal
function showProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  productDetailsDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>₹${product.price}</p>
    <button data-id="${product.id}">Add to Cart</button>
  `;

  productDetailsDiv.querySelector('button').addEventListener('click', () => {
    addToCart(product.id);
    closeProductModal();
  });

  productModal.style.display = "block";
}

// Close product details modal
function closeProductModal() {
  productModal.style.display = "none";
}

// Handle checkout
function handleCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Checkout functionality would be implemented here. Thank you for shopping!');
  cart = [];
  saveCart();
  updateCartCount();
  closeCartModal();
}

// Show notification
function showNotification(message) {
  // Simple notification - could be enhanced with a proper notification system
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 1000;
    animation: slideIn 0.3s;
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s';
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

// Add notification animations to CSS (via JS for simplicity)
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize the app
init();
