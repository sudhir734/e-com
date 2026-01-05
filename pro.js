
// Expanded product list with categories
const products = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: 2999, category: "electronics", image: "shopping.avif", description: "High-quality wireless headphones with noise cancellation." },
  { id: 2, name: "Smartphone Case", price: 499, category: "electronics", image: "images.jpg", description: "Protective case for your smartphone." },
  { id: 3, name: "JavaScript Programming Book", price: 1499, category: "books", image: "js book.jpg", description: "Comprehensive guide to JavaScript programming." },
  { id: 4, name: "Cotton T-Shirt", price: 799, category: "clothing", image: "t-Shirt.jpg", description: "Comfortable cotton t-shirt in various sizes." },
  { id: 5, name: "Stainless Steel Water Bottle", price: 1299, category: "home", image: "bottle.jpg", description: "Insulated water bottle that keeps drinks cold." },
  { id: 6, name: "LED Desk Lamp", price: 1899, category: "home", image: "lamp.jpg", description: "Adjustable LED lamp for your workspace." },
  { id: 7, name: "Fitness Tracker", price: 3499, category: "electronics", image: "smartwatch.jpg", description: "Track your steps, heart rate, and more." },
  { id: 8, name: "Coffee Maker", price: 2499, category: "home", image: "Coffee.jpg", description: "Automatic coffee maker for perfect brews." },
  { id: 9, name: "Denim Jeans", price: 1999, category: "clothing", image: "jeans.jpg", description: "Classic denim jeans in multiple fits." },
  { id: 10, name: "Python Programming Book", price: 1699, category: "books", image: "python.jpg", description: "Learn Python programming from basics to advanced." },
  { id: 11, name: "Wireless Mouse", price: 899, category: "electronics", image: "wireless.jpg", description: "Ergonomic wireless mouse for productivity." },
  { id: 12, name: "Yoga Mat", price: 1299, category: "home", image: "yoga.jpg", description: "Non-slip yoga mat for your practice." },
{ id: 13, name: "Running Shoes", price: 3999, category: "clothing", image: "shoes.jpg", description: "Lightweight running shoes for all terrains." },
  { id: 14, name: "E-reader", price: 4999, category: "electronics", image: "ereader.jpg", description: "Portable e-reader with high-resolution display." },
  { id: 15, name: "Blender", price: 2999, category: "home", image: "blender.jpg", description: "High-speed blender for smoothies and more." },
  { id: 16, name: "Graphic T-Shirt", price: 899, category: "clothing", image: "graphic.jpg", description: "Trendy graphic t-shirt with unique designs." },
  { id: 17, name: "Data Science Book", price: 1999, category: "books", image: "datascience.jpg", description: "Essential guide to data science concepts and techniques." },
  { id: 18, name: "Smartwatch", price: 5999, category: "electronics", image: "watch.jpg", description: "Feature-packed smartwatch with fitness tracking." },
  { id: 19, name: "Ceramic Mug", price: 499, category: "home", image: "mug.jpg", description: "Stylish ceramic mug for your favorite beverages." },
  { id: 20, name: "Hiking Backpack", price: 3499, category: "clothing", image: "backpack.jpg", description: "Durable backpack designed for hiking and outdoor adventures." }
];

let cart = JSON.parse(localStorage.getItem('amazonCart')) || [];
let filteredProducts = [...products];

const productsDiv = document.getElementById("products");
const cartCountSpan = document.getElementById("cart-count");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const voiceSearchBtn = document.getElementById("voice-search-btn");
const advancedSearchBtn = document.getElementById("advanced-search-btn");
const advancedSearchPanel = document.getElementById("advanced-search-panel");
const categoryFilter = document.getElementById("category-filter");
const priceMinInput = document.getElementById("price-min");
const priceMaxInput = document.getElementById("price-max");
const sortBySelect = document.getElementById("sort-by");
const searchInSelect = document.getElementById("search-in");
const recentSearchesList = document.getElementById("recent-searches-list");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartClose = document.getElementById("cart-close");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotalDiv = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const productModal = document.getElementById("product-modal");
const productClose = document.getElementById("product-close");
const productDetailsDiv = document.getElementById("product-details");
const darkModeToggle = document.getElementById("dark-mode-toggle");

let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Initialize the app
function init() {
  updateCartCount();
  renderProducts(filteredProducts);
  setupEventListeners();
  loadDarkMode();
  addTooltips();
  addLoadingStates();
}

// Setup event listeners
function setupEventListeners() {
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  searchInput.addEventListener('input', showSearchSuggestions);
  voiceSearchBtn.addEventListener('click', handleVoiceSearch);
  advancedSearchBtn.addEventListener('click', toggleAdvancedSearchPanel);
  categoryFilter.addEventListener('change', handleCategoryFilter);
  priceMinInput.addEventListener('input', applyAdvancedFilters);
  priceMaxInput.addEventListener('input', applyAdvancedFilters);
  sortBySelect.addEventListener('change', applyAdvancedFilters);
  searchInSelect.addEventListener('change', applyAdvancedFilters);
  cartBtn.addEventListener('click', openCartModal);
  cartClose.addEventListener('click', closeCartModal);
  productClose.addEventListener('click', closeProductModal);
  checkoutBtn.addEventListener('click', handleCheckout);

  // Mobile menu event listeners
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', toggleMobileMenu);
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) closeMobileMenu();
    });
  }

  // Dark mode toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }

  // Hide search suggestions and advanced panel when clicking outside
  document.addEventListener('click', (e) => {
    hideSearchSuggestions(e);
    hideAdvancedSearchPanel(e);
  });

  window.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCartModal();
    if (e.target === productModal) closeProductModal();
  });

  // Initialize recent searches display
  renderRecentSearches();
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

// Handle voice search functionality
function handleVoiceSearch() {
  // Check if running on HTTPS (required for speech recognition in most browsers)
  // Allow localhost for development
  if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    alert('Voice search requires HTTPS. Please access the site over HTTPS or use localhost/127.0.0.1.');
    return;
  }

  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Voice search is not supported in this browser. Please use Chrome, Edge, or Safari.');
    return;
  }

  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      voiceSearchBtn.textContent = '🎤 Listening...';
      voiceSearchBtn.disabled = true;
      showNotification('Listening... Speak now');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      if (transcript) {
        searchInput.value = transcript;
        handleSearch();
        showNotification(`Searching for: "${transcript}"`);
      } else {
        showNotification('No speech detected. Please try again.');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      let errorMessage = 'Voice search failed. ';
      switch(event.error) {
        case 'not-allowed':
          errorMessage += 'Microphone permission denied. Please allow microphone access.';
          break;
        case 'no-speech':
          errorMessage += 'No speech detected. Please try again.';
          break;
        case 'network':
          errorMessage += 'Network error. Check your connection.';
          break;
        default:
          errorMessage += 'Please try again.';
      }
      showNotification(errorMessage);
    };

    recognition.onend = () => {
      voiceSearchBtn.textContent = '🎤';
      voiceSearchBtn.disabled = false;
    };

    recognition.start();
  } catch (error) {
    console.error('Speech recognition setup error:', error);
    showNotification('Voice search is not available. Please use text search.');
  }
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

// Dark mode functionality
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDarkMode);
}

function loadDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }
}

// Slideshow variables
let slideIndex = 1;
let slideInterval;

// Slideshow functions
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Auto slideshow every 10 seconds
function startSlideshow() {
  showSlides(slideIndex);
  slideInterval = setInterval(() => {
    plusSlides(1);
  }, 10000); // 10 seconds
}

// Add tooltips to buttons
function addTooltips() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = button.textContent;
    button.appendChild(tooltip);

    button.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
    });

    button.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
    });
  });
}

// Add loading states
function addLoadingStates() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (!button.classList.contains('loading')) {
        // Store original innerHTML if not already stored
        if (!button.dataset.originalHtml) {
          button.dataset.originalHtml = button.innerHTML;
        }
        button.classList.add('loading');
        button.innerHTML = '<div class="spinner"></div> Loading...';

        setTimeout(() => {
          button.classList.remove('loading');
          button.innerHTML = button.dataset.originalHtml;
        }, 2000);
      }
    });
  });
}

// Mobile menu functions
function toggleMobileMenu() {
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  if (mobileMenuOverlay) {
    mobileMenuOverlay.classList.add('show');
  }
}

function closeMobileMenu() {
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  if (mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove('show');
  }
}

// Search suggestions functionality
function showSearchSuggestions() {
  const query = searchInput.value.toLowerCase().trim();
  const suggestionsDiv = document.getElementById('search-suggestions');

  if (!suggestionsDiv) return;

  if (query.length < 2) {
    suggestionsDiv.classList.remove('show');
    return;
  }

  // Get matching products and categories
  const matchingProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  ).slice(0, 5);

  const categories = [...new Set(products.map(p => p.category))].filter(cat =>
    cat.toLowerCase().includes(query)
  );

  let suggestionsHTML = '';

  // Add category suggestions
  if (categories.length > 0) {
    suggestionsHTML += '<div class="suggestion-section"><h4>Categories</h4>';
    categories.forEach(category => {
      suggestionsHTML += `<div class="suggestion-item" data-type="category" data-value="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</div>`;
    });
    suggestionsHTML += '</div>';
  }

  // Add product suggestions
  if (matchingProducts.length > 0) {
    suggestionsHTML += '<div class="suggestion-section"><h4>Products</h4>';
    matchingProducts.forEach(product => {
      suggestionsHTML += `<div class="suggestion-item" data-type="product" data-value="${product.id}">${product.name}</div>`;
    });
    suggestionsHTML += '</div>';
  }

  if (suggestionsHTML) {
    suggestionsDiv.innerHTML = suggestionsHTML;
    suggestionsDiv.classList.add('show');

    // Add click handlers for suggestions
    const suggestionItems = suggestionsDiv.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
      item.addEventListener('click', () => {
        const type = item.dataset.type;
        const value = item.dataset.value;

        if (type === 'category') {
          categoryFilter.value = value;
          handleCategoryFilter();
        } else if (type === 'product') {
          showProductDetails(parseInt(value));
        }

        searchInput.value = item.textContent;
        suggestionsDiv.classList.remove('show');
      });
    });
  } else {
    suggestionsDiv.classList.remove('show');
  }
}

function hideSearchSuggestions(e) {
  const suggestionsDiv = document.getElementById('search-suggestions');
  const searchContainer = document.querySelector('.search-container');

  if (suggestionsDiv && searchContainer && !searchContainer.contains(e.target)) {
    suggestionsDiv.classList.remove('show');
  }
}

// Advanced search functionality
function toggleAdvancedSearchPanel() {
  advancedSearchPanel.classList.toggle('show');
}

function hideAdvancedSearchPanel(e) {
  if (advancedSearchPanel && !advancedSearchPanel.contains(e.target) && e.target !== advancedSearchBtn) {
    advancedSearchPanel.classList.remove('show');
  }
}

function applyAdvancedFilters() {
  const minPrice = parseFloat(priceMinInput.value) || 0;
  const maxPrice = parseFloat(priceMaxInput.value) || Infinity;
  const sortBy = sortBySelect.value;
  const searchIn = searchInSelect.value;
  const query = searchInput.value.toLowerCase();

  // Start with all products
  let filtered = [...products];

  // Apply search query based on search scope
  if (query) {
    if (searchIn === 'name') {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(query));
    } else if (searchIn === 'description') {
      filtered = filtered.filter(product => product.description.toLowerCase().includes(query));
    } else if (searchIn === 'all') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
  }

  // Apply price filter
  filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);

  // Apply category filter
  const category = categoryFilter.value;
  if (category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }

  // Apply sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  filteredProducts = filtered;
  renderProducts(filteredProducts);
}

// Recent searches functionality
function addToRecentSearches(query) {
  if (!query.trim()) return;

  // Remove if already exists
  recentSearches = recentSearches.filter(item => item !== query);

  // Add to beginning
  recentSearches.unshift(query);

  // Keep only last 5
  recentSearches = recentSearches.slice(0, 5);

  // Save to localStorage
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

  // Re-render recent searches
  renderRecentSearches();
}

function renderRecentSearches() {
  recentSearchesList.innerHTML = '';

  recentSearches.forEach(search => {
    const item = document.createElement('div');
    item.className = 'recent-search-item';
    item.textContent = search;
    item.addEventListener('click', () => {
      searchInput.value = search;
      handleSearch();
      advancedSearchPanel.classList.remove('show');
    });
    recentSearchesList.appendChild(item);
  });
}

// Update handleSearch to include advanced filters and recent searches
function handleSearch() {
  const query = searchInput.value.toLowerCase();

  // Add to recent searches
  addToRecentSearches(searchInput.value);

  // Apply advanced filters
  applyAdvancedFilters();
}

// Initialize the app
init();
startSlideshow();
