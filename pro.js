// Expanded product list with categories, reviews, and ratings
const products = [
    { id: 1, name: "Wireless Bluetooth Headphones", price: 2999, category: "electronics", image: "shopping.avif", description: "High-quality wireless headphones with noise cancellation.", rating: 4.5, reviews: 128 },
    { id: 2, name: "Smartphone Case", price: 499, category: "electronics", image: "images.jpg", description: "Protective case for your smartphone.", rating: 4.2, reviews: 89 },
    { id: 3, name: "JavaScript Programming Book", price: 1499, category: "books", image: "js book.jpg", description: "Comprehensive guide to JavaScript programming.", rating: 4.8, reviews: 256 },
    { id: 4, name: "Cotton T-Shirt", price: 799, category: "clothing", image: "t-Shirt.jpg", description: "Comfortable cotton t-shirt in various sizes.", rating: 4.0, reviews: 67 },
    { id: 5, name: "Stainless Steel Water Bottle", price: 1299, category: "home", image: "bottle.jpg", description: "Insulated water bottle that keeps drinks cold.", rating: 4.6, reviews: 145 },
    { id: 6, name: "LED Desk Lamp", price: 1899, category: "home", image: "lamp.jpg", description: "Adjustable LED lamp for your workspace.", rating: 4.3, reviews: 92 },
    { id: 7, name: "Fitness Tracker", price: 3499, category: "electronics", image: "smartwatch.jpg", description: "Track your steps, heart rate, and more.", rating: 4.4, reviews: 203 },
    { id: 8, name: "Coffee Maker", price: 2499, category: "home", image: "Coffee.jpg", description: "Automatic coffee maker for perfect brews.", rating: 4.7, reviews: 178 },
    { id: 9, name: "Denim Jeans", price: 1999, category: "clothing", image: "jeans.jpg", description: "Classic denim jeans in multiple fits.", rating: 4.1, reviews: 134 },
    { id: 10, name: "Python Programming Book", price: 1699, category: "books", image: "python.jpg", description: "Learn Python programming from basics to advanced.", rating: 4.9, reviews: 312 },
    { id: 11, name: "Wireless Mouse", price: 899, category: "electronics", image: "wireless.jpg", description: "Ergonomic wireless mouse for productivity.", rating: 4.2, reviews: 76 },
    { id: 12, name: "Yoga Mat", price: 1299, category: "home", image: "yoga.jpg", description: "Non-slip yoga mat for your practice.", rating: 4.5, reviews: 98 },
    { id: 13, name: "Running Shoes", price: 3999, category: "clothing", image: "shoes.jpg", description: "Lightweight running shoes for all terrains.", rating: 4.6, reviews: 187 },
    { id: 14, name: "E-reader", price: 4999, category: "electronics", image: "ereader.jpg", description: "Portable e-reader with high-resolution display.", rating: 4.7, reviews: 234 },
    { id: 15, name: "Blender", price: 2999, category: "home", image: "blender.jpg", description: "High-speed blender for smoothies and more.", rating: 4.4, reviews: 156 },
    { id: 16, name: "Graphic T-Shirt", price: 899, category: "clothing", image: "graphic.jpg", description: "Trendy graphic t-shirt with unique designs.", rating: 4.0, reviews: 45 },
    { id: 17, name: "Data Science Book", price: 1999, category: "books", image: "datascience.jpg", description: "Essential guide to data science concepts and techniques.", rating: 4.8, reviews: 289 },
    { id: 18, name: "Smartwatch", price: 5999, category: "electronics", image: "watch.jpg", description: "Feature-packed smartwatch with fitness tracking.", rating: 4.5, reviews: 267 },
    { id: 19, name: "Ceramic Mug", price: 499, category: "home", image: "mug.jpg", description: "Stylish ceramic mug for your favorite beverages.", rating: 4.3, reviews: 78 },
    { id: 20, name: "Hiking Backpack", price: 3499, category: "clothing", image: "backpack.jpg", description: "Durable backpack designed for hiking and outdoor adventures.", rating: 4.6, reviews: 152 }
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
  const authModal = document.getElementById("auth-modal");
  const authClose = document.getElementById("auth-close");
  const authTabs = document.querySelectorAll(".auth-tab");
  const authForms = document.querySelectorAll(".auth-form");
  const loginForm = document.getElementById("login-form-element");
  const signupForm = document.getElementById("signup-form-element");
  const signInBtn = document.querySelector(".sign-in-btn");
  
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  
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
    const wishlistBtnMobile = document.getElementById('wishlist-btn-mobile');
    const comparisonBtnMobile = document.getElementById('comparison-btn-mobile');
  
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
    if (wishlistBtnMobile) {
      wishlistBtnMobile.addEventListener('click', () => {
        openWishlistModal();
        closeMobileMenu();
      });
    }
    if (comparisonBtnMobile) {
      comparisonBtnMobile.addEventListener('click', () => {
        openComparisonModal();
        closeMobileMenu();
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
  
    // Authentication event listeners
    if (signInBtn) {
      signInBtn.addEventListener('click', openAuthModal);
    }
    if (authClose) {
      authClose.addEventListener('click', closeAuthModal);
    }
    if (authTabs) {
      authTabs.forEach(tab => {
        tab.addEventListener('click', switchAuthTab);
      });
    }
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }
    if (signupForm) {
      signupForm.addEventListener('submit', handleSignup);
    }
  
    // Update UI based on current user
    updateAuthUI();
  
    // Quantity modal event listeners
    document.getElementById('decrease-quantity').addEventListener('click', decreaseQuantity);
    document.getElementById('increase-quantity').addEventListener('click', increaseQuantity);
    document.getElementById('confirm-add-to-cart').addEventListener('click', confirmAddToCart);
    document.getElementById('quantity-close').addEventListener('click', closeQuantityModal);
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
      const discountedPrice = Math.round(product.price * 0.4); // 60% off
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <div class="product-header">
          <input type="checkbox" class="compare-checkbox" data-id="${product.id}" title="Compare this product">
          <button class="wishlist-btn" data-id="${product.id}" title="Add to Wishlist">
            ${isInWishlist(product.id) ? '❤️' : '🤍'}
          </button>
        </div>
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <div class="product-rating">
          ${renderStars(product.rating)} <span>(${product.reviews})</span>
        </div>
        <p><s style="color: red;">₹${product.price}</s> ₹${discountedPrice}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        <button class="view-details" data-id="${product.id}">View Details</button>
      `;
  
      div.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        openQuantityModal(product.id);
      });
  
      div.querySelector(".view-details").addEventListener("click", (e) => {
        e.stopPropagation();
        showProductDetails(product.id);
      });
  
      div.querySelector(".wishlist-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(product.id);
        renderProducts(filteredProducts); // Re-render to update wishlist icon
      });
  
      div.querySelector(".compare-checkbox").addEventListener("change", (e) => {
        e.stopPropagation();
        toggleComparison(product.id, e.target.checked);
      });
  
      productsDiv.appendChild(div);
    });
  }
  
  
  
  // Render star ratings
  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    let starsHTML = '';
  
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '⭐';
    }
  
    // Half star
    if (hasHalfStar) {
      starsHTML += '⭐';
    }
  
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '☆';
    }
  
    return starsHTML;
  }
  
  // Check if product is in wishlist
  function isInWishlist(productId) {
    return wishlist.includes(productId);
  }
  
  // Open quantity selection modal
  function openQuantityModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
  
    // Display product info in modal
    const quantityProductInfo = document.getElementById('quantity-product-info');
    quantityProductInfo.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; margin-bottom: 10px;">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
    `;
  
    // Reset quantity to 1
    document.getElementById('quantity-value').textContent = '1';
  
    // Store current product ID
    document.getElementById('confirm-add-to-cart').dataset.productId = productId;
  
    // Show modal
    document.getElementById('quantity-modal').style.display = 'block';
  }
  
  // Close quantity modal
  function closeQuantityModal() {
    document.getElementById('quantity-modal').style.display = 'none';
  }
  
  // Decrease quantity
  function decreaseQuantity() {
    const quantityValue = document.getElementById('quantity-value');
    let quantity = parseInt(quantityValue.textContent);
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
    }
  }
  
  // Increase quantity
  function increaseQuantity() {
    const quantityValue = document.getElementById('quantity-value');
    let quantity = parseInt(quantityValue.textContent);
    quantity++;
    quantityValue.textContent = quantity;
  }
  
  // Confirm add to cart
  function confirmAddToCart() {
    const confirmBtn = document.getElementById('confirm-add-to-cart');
    const productId = parseInt(confirmBtn.dataset.productId);
    const quantity = parseInt(document.getElementById('quantity-value').textContent);
  
    addToCart(productId, quantity);
    closeQuantityModal();
  }
  
  // Add item to cart with selected quantity
  function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity: quantity });
    }
  
    saveCart();
    updateCartCount();
    showNotification(`${product.name} (${quantity}) added to cart!`);
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
    const cartCountMobile = document.getElementById('cart-count-mobile');
    if (cartCountMobile) {
      cartCountMobile.textContent = totalItems;
    }
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
      <div class="product-rating">
        ${renderStars(product.rating)} <span>(${product.reviews} reviews)</span>
      </div>
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
  function showNotification(message, type = 'success') {
    const notificationsContainer = document.getElementById('notifications-container');
    if (!notificationsContainer) return;
  
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
  
    notificationsContainer.appendChild(notification);
  
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
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
  
  // Load user from localStorage on page load
  function loadUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      currentUser = JSON.parse(userData);
      updateAuthUI();
    }
  }
  
  // Update authentication UI
  function updateAuthUI() {
    const accountText = document.querySelector('.account-text');
    const signInBtn = document.querySelector('.sign-in-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const logoutDivider = document.querySelector('.logout-divider');
  
    if (currentUser) {
      accountText.textContent = `Hello, ${currentUser.name}`;
      signInBtn.style.display = 'none';
      logoutBtn.style.display = 'block';
      logoutDivider.style.display = 'block';
    } else {
      accountText.textContent = 'Hello, Sign in';
      signInBtn.style.display = 'block';
      logoutBtn.style.display = 'none';
      logoutDivider.style.display = 'none';
    }
  }
  
  // Handle login
  function handleLogin(event) {
    event.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      updateAuthUI();
      closeModal('auth-modal');
      showNotification('Login successful!', 'success');
    } else {
      showNotification('Invalid email or password', 'error');
    }
  }
  
  // Handle signup
  function handleSignup(event) {
    event.preventDefault();
  
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      showNotification('User already exists', 'error');
      return;
    }
  
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    updateAuthUI();
    closeModal('auth-modal');
    showNotification('Account created successfully!', 'success');
  }
  
  // Handle logout
  function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Logged out successfully', 'success');
  }
  
  // Wishlist functionality
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  
  function addToWishlist(productId) {
    if (!currentUser) {
      showNotification('Please sign in to add items to wishlist', 'error');
      openModal('auth-modal');
      return;
    }
  
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      showNotification('Added to wishlist!', 'success');
      renderWishlist();
    } else {
      showNotification('Already in wishlist', 'info');
    }
  }
  
  function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist();
    showNotification('Removed from wishlist', 'success');
  }
  
  function renderWishlist() {
    const wishlistItems = document.getElementById('wishlist-items');
    wishlistItems.innerHTML = '';
  
    if (wishlist.length === 0) {
      wishlistItems.innerHTML = '<p>Your wishlist is empty</p>';
      return;
    }
  
    wishlist.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        const item = document.createElement('div');
        item.className = 'wishlist-item';
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover;">
          <div class="wishlist-item-info">
            <h4>${product.name}</h4>
            <p>₹${product.price}</p>
          </div>
          <button onclick="removeFromWishlist(${product.id})" class="remove-btn">Remove</button>
        `;
        wishlistItems.appendChild(item);
      }
    });
  }
  
  // Product reviews and ratings
  let reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
  
  function addReview(productId, rating, comment) {
    if (!currentUser) {
      showNotification('Please sign in to add a review', 'error');
      openModal('auth-modal');
      return;
    }
  
    if (!reviews[productId]) {
      reviews[productId] = [];
    }
  
    reviews[productId].push({
      userId: currentUser.id,
      userName: currentUser.name,
      rating: parseInt(rating),
      comment: comment,
      date: new Date().toISOString()
    });
  
    localStorage.setItem('reviews', JSON.stringify(reviews));
    showNotification('Review added successfully!', 'success');
    renderProductDetails(productId);
  }
  
  function renderReviews(productId) {
    const reviewsContainer = document.getElementById('product-reviews');
    if (!reviewsContainer) return;
  
    const productReviews = reviews[productId] || [];
    reviewsContainer.innerHTML = '';
  
    if (productReviews.length === 0) {
      reviewsContainer.innerHTML = '<p>No reviews yet. Be the first to review this product!</p>';
      return;
    }
  
    productReviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'review-item';
      reviewElement.innerHTML = `
        <div class="review-header">
          <span class="review-author">${review.userName}</span>
          <div class="review-rating">
            ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
          </div>
        </div>
        <p class="review-comment">${review.comment}</p>
        <small class="review-date">${new Date(review.date).toLocaleDateString()}</small>
      `;
      reviewsContainer.appendChild(reviewElement);
    });
  }
  
  // Product pagination
  let currentPage = 1;
  const itemsPerPage = 12;
  
  
  
  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
  
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      pageBtn.textContent = i;
      pageBtn.onclick = () => {
        currentPage = i;
        renderProducts();
      };
      paginationContainer.appendChild(pageBtn);
    }
  
    const productsContainer = document.getElementById('products');
    const existingPagination = productsContainer.querySelector('.pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
    productsContainer.appendChild(paginationContainer);
  }
  
  function getAverageRating(productId) {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / productReviews.length;
  }
  
  function getReviewCount(productId) {
    return (reviews[productId] || []).length;
  }
  
  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    return '★'.repeat(fullStars) +
           (hasHalfStar ? '☆' : '') +
           '☆'.repeat(emptyStars);
  }
  
  // Product comparison
  let comparisonList = JSON.parse(localStorage.getItem('comparison') || '[]');
  
  function addToComparison(productId) {
    if (comparisonList.includes(productId)) {
      showNotification('Already in comparison', 'info');
      return;
    }
  
    if (comparisonList.length >= 4) {
      showNotification('Maximum 4 products can be compared', 'error');
      return;
    }
  
    comparisonList.push(productId);
    localStorage.setItem('comparison', JSON.stringify(comparisonList));
    showNotification('Added to comparison!', 'success');
    renderComparison();
  }
  
  function removeFromComparison(productId) {
    comparisonList = comparisonList.filter(id => id !== productId);
    localStorage.setItem('comparison', JSON.stringify(comparisonList));
    renderComparison();
  }
  
  function renderComparison() {
    const comparisonContainer = document.getElementById('comparison-container');
    if (!comparisonContainer) return;
  
    comparisonContainer.innerHTML = '';
  
    if (comparisonList.length === 0) {
      comparisonContainer.innerHTML = '<p>No products to compare</p>';
      return;
    }
  
    const table = document.createElement('table');
    table.className = 'comparison-table';
  
    // Header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Feature</th>';
    comparisonList.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        headerRow.innerHTML += `
          <th>
            <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover;">
            <h4>${product.name}</h4>
            <button onclick="removeFromComparison(${product.id})" class="remove-btn">Remove</button>
          </th>
        `;
      }
    });
    table.appendChild(headerRow);
  
    // Price row
    const priceRow = document.createElement('tr');
    priceRow.innerHTML = '<td><strong>Price</strong></td>';
    comparisonList.forEach(productId => {
      const product = products.find(p => p.id === productId);
      priceRow.innerHTML += `<td>₹${product ? product.price : 'N/A'}</td>`;
    });
    table.appendChild(priceRow);
  
    // Rating row
    const ratingRow = document.createElement('tr');
    ratingRow.innerHTML = '<td><strong>Rating</strong></td>';
    comparisonList.forEach(productId => {
      const rating = getAverageRating(productId);
      ratingRow.innerHTML += `<td>${renderStars(rating)} (${getReviewCount(productId)})</td>`;
    });
    table.appendChild(ratingRow);
  
    // Category row
    const categoryRow = document.createElement('tr');
    categoryRow.innerHTML = '<td><strong>Category</strong></td>';
    comparisonList.forEach(productId => {
      const product = products.find(p => p.id === productId);
      categoryRow.innerHTML += `<td>${product ? product.category : 'N/A'}</td>`;
    });
    table.appendChild(categoryRow);
  
    comparisonContainer.appendChild(table);
  }
  
  // Order history
  let orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  
  function addToOrderHistory(cartItems, total) {
    if (!currentUser) return;
  
    const order = {
      id: Date.now(),
      userId: currentUser.id,
      items: cartItems,
      total: total,
      date: new Date().toISOString()
    };
  
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }
  
  // Newsletter signup
  function handleNewsletterSignup(event) {
    event.preventDefault();
    const email = document.getElementById('newsletter-email').value;
  
    // Simple email validation
    if (!email || !email.includes('@')) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
  
    // Store newsletter subscribers
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
      showNotification('Successfully subscribed to newsletter!', 'success');
    } else {
      showNotification('Already subscribed!', 'info');
    }
  
    document.getElementById('newsletter-email').value = '';
  }
  
  // Contact form
  function handleContactForm(event) {
    event.preventDefault();
  
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
  
    // Store contact message
    const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    contactMessages.push({
      id: Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
  
    showNotification('Message sent successfully!', 'success');
    document.getElementById('contact-form').reset();
    closeModal('contact-modal');
  }
  
  
  
  // Enhanced modal system
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
  
  // Event listeners for modals
  document.addEventListener('DOMContentLoaded', function() {
    // Authentication
    document.getElementById('login-form-element')?.addEventListener('submit', handleLogin);
    document.getElementById('signup-form-element')?.addEventListener('submit', handleSignup);
  
    // Auth modal tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  
        this.classList.add('active');
        const tabName = this.getAttribute('data-tab');
        document.getElementById(`${tabName}-form`).classList.add('active');
      });
    });
  
    // Newsletter
    document.getElementById('newsletter-form')?.addEventListener('submit', handleNewsletterSignup);
  
    // Contact form
    document.getElementById('contact-form')?.addEventListener('submit', handleContactForm);
  
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
      closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    });
  
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    });
  
    // Load user on page load
    loadUser();
  
    // Initialize wishlist and comparison
    renderWishlist();
    renderComparison();
  });
  
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
  
  // Wishlist modal functions
  function openWishlistModal() {
    const wishlistModal = document.getElementById('wishlist-modal');
    const wishlistItemsDiv = document.getElementById('wishlist-items');
    wishlistItemsDiv.innerHTML = '';
  
    if (wishlist.length === 0) {
      wishlistItemsDiv.innerHTML = '<p>Your wishlist is empty.</p>';
    } else {
      wishlist.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          const div = document.createElement('div');
          div.className = 'wishlist-item';
          div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div>
              <h4>${product.name}</h4>
              <p>₹${product.price}</p>
              <button data-id="${product.id}">Add to Cart</button>
              <button data-id="${product.id}" class="remove-wishlist">Remove</button>
            </div>
          `;
  
          div.querySelector('button[data-id]').addEventListener('click', () => {
            addToCart(product.id);
          });
  
          div.querySelector('.remove-wishlist').addEventListener('click', () => {
            toggleWishlist(product.id);
            openWishlistModal(); // Re-render
          });
  
          wishlistItemsDiv.appendChild(div);
        }
      });
    }
  
    wishlistModal.style.display = "block";
  }
  
  function closeWishlistModal() {
    const wishlistModal = document.getElementById('wishlist-modal');
    wishlistModal.style.display = "none";
  }
  
  // Comparison modal functions
  function openComparisonModal() {
    const comparisonModal = document.getElementById('comparison-modal');
    const comparisonContainer = document.getElementById('comparison-container');
    comparisonContainer.innerHTML = '';
  
    if (comparisonList.length === 0) {
      comparisonContainer.innerHTML = '<p>No products selected for comparison.</p>';
    } else {
      const table = document.createElement('table');
      table.className = 'comparison-table';
  
      // Header row
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = '<th>Feature</th>';
      comparisonList.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          headerRow.innerHTML += `<th>${product.name}</th>`;
        }
      });
      table.appendChild(headerRow);
  
      // Name row
      const nameRow = document.createElement('tr');
      nameRow.innerHTML = '<td>Name</td>';
      comparisonList.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          nameRow.innerHTML += `<td>${product.name}</td>`;
        }
      });
      table.appendChild(nameRow);
  
      // Price row
      const priceRow = document.createElement('tr');
      priceRow.innerHTML = '<td>Price</td>';
      comparisonList.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          priceRow.innerHTML += `<td>₹${product.price}</td>`;
        }
      });
      table.appendChild(priceRow);
  
      // Rating row
      const ratingRow = document.createElement('tr');
      ratingRow.innerHTML = '<td>Rating</td>';
      comparisonList.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          ratingRow.innerHTML += `<td>${renderStars(product.rating)} (${product.reviews})</td>`;
        }
      });
      table.appendChild(ratingRow);
  
      // Category row
      const categoryRow = document.createElement('tr');
      categoryRow.innerHTML = '<td>Category</td>';
      comparisonList.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          categoryRow.innerHTML += `<td>${product.category}</td>`;
        }
      });
      table.appendChild(categoryRow);
  
      // Action row
      const actionRow = document.createElement('tr');
      actionRow.innerHTML = '<td>Action</td>';
      comparisonList.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          actionRow.innerHTML += `<td><button data-id="${product.id}">Add to Cart</button></td>`;
        }
      });
      table.appendChild(actionRow);
  
      comparisonContainer.appendChild(table);
  
      // Add event listeners to buttons
      comparisonContainer.querySelectorAll('button[data-id]').forEach(button => {
        button.addEventListener('click', () => {
          addToCart(parseInt(button.dataset.id));
        });
      });
    }
  
    comparisonModal.style.display = "block";
  }
  
  function closeComparisonModal() {
    const comparisonModal = document.getElementById('comparison-modal');
    comparisonModal.style.display = "none";
  }
  
  // Authentication functions
  function openAuthModal() {
    authModal.style.display = "block";
  }
  
  function closeAuthModal() {
    authModal.style.display = "none";
  }
  
  function switchAuthTab(e) {
    const tab = e.target;
    const tabName = tab.dataset.tab;
  
    // Update tab active state
    authTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  
    // Update form active state
    authForms.forEach(form => form.classList.remove('active'));
    document.getElementById(`${tabName}-form`).classList.add('active');
  }
  
  function handleLogin(e) {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    // Simple validation
    if (!email || !password) {
      showNotification('Please fill in all fields');
      return;
    }
  
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateAuthUI();
      closeAuthModal();
      showNotification(`Welcome back, ${user.name}!`);
    } else {
      showNotification('Invalid email or password');
    }
  }
  
  function handleSignup(e) {
    e.preventDefault();
  
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    // Simple validation
    if (!name || !email || !password) {
      showNotification('Please fill in all fields');
      return;
    }
  
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);
  
    if (existingUser) {
      showNotification('User with this email already exists');
      return;
    }
  
    // Create new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    // Auto login
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    closeAuthModal();
    showNotification(`Welcome, ${name}! Your account has been created.`);
  }
  
  function updateAuthUI() {
    const accountText = document.querySelector('.account-text');
    const accountArrow = document.querySelector('.account-arrow');
  
    if (currentUser) {
      accountText.textContent = `Hello, ${currentUser.name}`;
      accountArrow.textContent = '▼';
    } else {
      accountText.textContent = 'Hello, Sign in';
      accountArrow.textContent = '▼';
    }
  }
  
  function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('You have been logged out');
  }
  
  // Initialize the app
  init();
  startSlideshow();
  
