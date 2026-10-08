/**
 * L'AURA ROASTERY & CAFÉ — CLIENT JAVASCRIPT
 * Interactive Experience, Menu Filtering, Tasting Tray, Lightbox & Table Reservations
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. PRELOADER & PAGE INITIALIZATION
     ========================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.getElementById('preloaderProgress');
  const preloaderText = document.getElementById('preloaderText');

  let progress = 0;
  const loadingSteps = [
    { target: 30, text: 'Selecting micro-lot green beans...' },
    { target: 65, text: 'Warming vintage Probat roaster...' },
    { target: 90, text: 'Calibrating espresso extraction...' },
    { target: 100, text: 'Welcome to L\'Aura.' }
  ];

  let stepIndex = 0;
  const interval = setInterval(() => {
    if (stepIndex < loadingSteps.length) {
      const current = loadingSteps[stepIndex];
      progress += 4;
      if (progress >= current.target) {
        if (preloaderText) preloaderText.textContent = current.text;
        stepIndex++;
      }
      if (preloaderProgress) preloaderProgress.style.width = `${Math.min(progress, 100)}%`;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('fade-out');
          document.body.classList.remove('lock-scroll');
        }
      }, 450);
    }
  }, 35);

  // Fallback safety timeout for preloader
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      document.body.classList.remove('lock-scroll');
    }
  }, 2400);


  /* ==========================================================
     2. HEADER SCROLL & PROGRESS BAR
     ========================================================== */
  const header = document.getElementById('mainHeader');
  const scrollProgressBar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header frosted glass on scroll
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll progress line
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }
  });


  /* ==========================================================
     3. MOBILE DRAWER NAVIGATION
     ========================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const drawerReserveBtn = document.getElementById('drawerReserveBtn');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.classList.add('lock-scroll');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  if (drawerReserveBtn) {
    drawerReserveBtn.addEventListener('click', () => {
      closeDrawer();
      const visitSection = document.getElementById('visit');
      if (visitSection) visitSection.scrollIntoView({ behavior: 'smooth' });
    });
  }


  /* ==========================================================
     4. ACTIVE NAVIGATION LINK HIGHLIGHTING
     ========================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(section => navObserver.observe(section));


  /* ==========================================================
     5. LIVE OPENING HOURS & TIME INDICATOR
     ========================================================== */
  function updateLiveHours() {
    const liveTimeDisplay = document.getElementById('liveTimeDisplay');
    const currentStatusText = document.getElementById('currentStatusText');
    const liveClosingNotice = document.getElementById('liveClosingNotice');
    const liveStatusBadge = document.getElementById('liveStatusBadge');

    // Get current New York (Eastern) time
    const now = new Date();
    const nyTimeStr = now.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const nyDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const day = nyDate.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday
    const hours = nyDate.getHours();
    const minutes = nyDate.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    let openingTime = 7 * 60; // 7:00 AM
    let closingTime = 20 * 60; // 8:00 PM Mon-Thu

    if (day === 5) {
      // Friday
      closingTime = 22 * 60; // 10:00 PM
    } else if (day === 0 || day === 6) {
      // Weekend
      openingTime = 8 * 60; // 8:00 AM
      closingTime = 22 * 60; // 10:00 PM
    }

    const isOpen = timeInMinutes >= openingTime && timeInMinutes < closingTime;

    if (liveTimeDisplay) {
      liveTimeDisplay.textContent = `New York: ${nyTimeStr}`;
    }

    if (isOpen) {
      if (currentStatusText) currentStatusText.textContent = 'Open Now';
      if (liveClosingNotice) {
        const closesAt = (day === 5 || day === 0 || day === 6) ? '10:00 PM' : '8:00 PM';
        liveClosingNotice.textContent = `Open today until ${closesAt} · Walk-ins welcomed`;
      }
      if (liveStatusBadge) {
        liveStatusBadge.innerHTML = `<span class="pulse-dot"></span><span class="status-text">Open Today</span>`;
      }
    } else {
      if (currentStatusText) currentStatusText.textContent = 'Closed Now';
      if (liveClosingNotice) {
        liveClosingNotice.textContent = 'Reopening at 7:00 AM tomorrow · Reservations open online';
      }
      if (liveStatusBadge) {
        liveStatusBadge.innerHTML = `<span class="pulse-dot" style="background:#f59e0b;box-shadow:none;"></span><span class="status-text">Opens 7:00 AM</span>`;
      }
    }
  }

  updateLiveHours();
  setInterval(updateLiveHours, 60000);


  /* ==========================================================
     6. CURATED MENU DATA & DYNAMIC RENDERING
     ========================================================== */
  const menuItems = [
    {
      id: 'item-1',
      name: 'Smoked Vanilla Flat White',
      category: 'coffee',
      price: 8.50,
      origin: 'Huila, Colombia · Single Origin',
      desc: 'Double shot espresso infused with cold-smoked Madagascar bourbon vanilla bean, steamed Jersey whole milk, and microfoam swan art.',
      dietary: ["Chef's Pick"],
      notes: 'Tasting: Praline, smoked vanilla, dark cacao',
      image: 'assets/images/latte-art.jpg'
    },
    {
      id: 'item-2',
      name: 'Panama Geisha Reserve',
      category: 'pourover',
      price: 18.00,
      origin: 'Boquete, Panama · 1,750m Altitude',
      desc: 'Extracted manually via Hario V60 with custom mineral water. SCA Score 95.2. An exquisite tea-like cup with delicate floral complexity.',
      dietary: ["Chef's Pick", "Plant-Based", "Gluten-Free"],
      notes: 'Tasting: Bergamot flower, white peach, jasmine nectar',
      image: 'assets/images/hero.jpg'
    },
    {
      id: 'item-3',
      name: 'Cardamom Pistachio Cortado',
      category: 'coffee',
      price: 7.75,
      origin: 'Yirgacheffe, Ethiopia · Natural Process',
      desc: 'Equal parts textured oat milk and floral espresso, spiced with freshly crushed green cardamom and crowned with bronzed Sicilian pistachio crumble.',
      dietary: ["Plant-Based"],
      notes: 'Tasting: Sweet spice, marzipan, blackberry preserve',
      image: 'assets/images/latte-art.jpg'
    },
    {
      id: 'item-4',
      name: 'Kyoto 24-Hour Cold Drip',
      category: 'coffee',
      price: 9.50,
      origin: 'Nariño, Colombia · Double Ferment',
      desc: 'Slow drop-by-drop extraction through a 6-foot glass tower over 24 hours. Served over hand-carved crystal clear ice with an orange twist.',
      dietary: ["Plant-Based", "Gluten-Free"],
      notes: 'Tasting: Dark cherry liqueur, cocoa nibs, cedar wood',
      image: 'assets/images/hero.jpg'
    },
    {
      id: 'item-5',
      name: 'Raspberry Rose Croissant',
      category: 'bakery',
      price: 7.50,
      origin: 'Normandy Beurre d\'Isigny · 72h Lamination',
      desc: 'Golden crisp 24-layer French pastry folded with organic freeze-dried raspberry confiture and edible Persian rose petals.',
      dietary: ["Chef's Pick"],
      notes: 'Freshly baked at 5:00 AM daily',
      image: 'assets/images/brunch-croissant.jpg'
    },
    {
      id: 'item-6',
      name: 'Truffle Egg Brioche Tartine',
      category: 'brunch',
      price: 18.50,
      origin: 'Hearth Kitchen · Local Heritage Grain',
      desc: 'Organic pasture poached egg over toasted buttery brioche, whipped Hass avocado, Perigord black truffle emulsion, and garden herbs.',
      dietary: ["Chef's Pick"],
      notes: 'Served with pickled shallots and Maldon sea salt',
      image: 'assets/images/brunch-croissant.jpg'
    },
    {
      id: 'item-7',
      name: 'Twice-Baked Almond Frangipane',
      category: 'bakery',
      price: 8.00,
      origin: 'House Patisserie Craft',
      desc: 'Classic croissant steeped in spiced espresso simple syrup, filled with roasted Marcona almond cream, and dusted with powdered sugar.',
      dietary: [],
      notes: 'Pairs harmoniously with our Pour-Over flight',
      image: 'assets/images/brunch-croissant.jpg'
    },
    {
      id: 'item-8',
      name: 'Ceremonial Kyoto Matcha Latte',
      category: 'elixirs',
      price: 9.00,
      origin: 'Uji, Kyoto, Japan · First Harvest',
      desc: 'Stone-ground ceremonial grade matcha whisked with organic bamboo chasen, paired with creamy oat milk and a touch of agave nectar.',
      dietary: ["Plant-Based", "Gluten-Free"],
      notes: 'Rich umami, vibrant emerald hue, zero bitterness',
      image: 'assets/images/latte-art.jpg'
    },
    {
      id: 'item-9',
      name: 'Sparkling Cascara Tonic',
      category: 'elixirs',
      price: 8.00,
      origin: 'Finca El Paraiso, Colombia',
      desc: 'Infusion of sun-dried coffee cherry husk with artisanal Indian tonic, fresh rosemary sprig, and dehydrated Meyer lemon wheel.',
      dietary: ["Plant-Based", "Gluten-Free"],
      notes: 'Refreshing, tart hibiscus notes, light natural caffeine',
      image: 'assets/images/hero.jpg'
    },
    {
      id: 'item-10',
      name: 'Smoked Salmon Rye Tartine',
      category: 'brunch',
      price: 19.50,
      origin: 'Wild King Salmon · 48h Cured',
      desc: 'Dill-cured wild salmon atop house-baked dense rye sourdough, whipped chive mascarpone, crispy capers, and watermelon radish ribbons.',
      dietary: [],
      notes: 'Accompanied by petite organic greens',
      image: 'assets/images/brunch-croissant.jpg'
    },
    {
      id: 'item-11',
      name: 'Ethiopia Yirgacheffe Washed',
      category: 'pourover',
      price: 13.00,
      origin: 'Gedeo Zone, Ethiopia · 2,100m',
      desc: 'Clean and intensely aromatic slow pour-over. Notes of candied lemon peel, elderflower blossom, and a silky honeyed finish.',
      dietary: ["Plant-Based", "Gluten-Free"],
      notes: 'SCA 93.5 · Direct farm-gate trade',
      image: 'assets/images/hero.jpg'
    },
    {
      id: 'item-12',
      name: 'Valrhona Chocolate Babka Knot',
      category: 'bakery',
      price: 7.25,
      origin: 'Single-Estate French Chocolate',
      desc: 'Rich twisted brioche ribbons infused with 70% Guanaja dark chocolate fudge, Ceylon cinnamon swirl, and Maldon salt crystals.',
      dietary: [],
      notes: 'Flaky crust with an ultra-tender decadent core',
      image: 'assets/images/brunch-croissant.jpg'
    }
  ];

  const menuGrid = document.getElementById('menuGrid');
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  const menuSearchInput = document.getElementById('menuSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const dietaryFilters = document.querySelectorAll('.dietary-filter');

  let currentCategory = 'all';
  let currentDietary = 'all';
  let searchQuery = '';

  function renderMenuItems() {
    if (!menuGrid) return;

    const filtered = menuItems.filter(item => {
      // Category match
      const categoryMatch = currentCategory === 'all' || item.category === currentCategory;

      // Dietary match
      const dietaryMatch = currentDietary === 'all' || (item.dietary && item.dietary.includes(currentDietary));

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const searchMatch = !q ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.origin.toLowerCase().includes(q) ||
        item.notes.toLowerCase().includes(q);

      return categoryMatch && dietaryMatch && searchMatch;
    });

    if (filtered.length === 0) {
      menuGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--cream-muted);">
          <i class="fa-solid fa-mug-saucer" style="font-size: 2.5rem; color: var(--border-active); margin-bottom: 16px; display: block;"></i>
          <h4 style="font-size: 1.4rem; color: var(--cream-pure); margin-bottom: 8px;">No artisanal selections found</h4>
          <p style="font-size: 0.9rem;">Try selecting another category or refining your search term.</p>
        </div>
      `;
      return;
    }

    menuGrid.innerHTML = filtered.map(item => {
      let badgeHtml = '';
      if (item.dietary && item.dietary.includes("Chef's Pick")) {
        badgeHtml = `<span class="menu-card-badge tag-chef"><i class="fa-solid fa-star"></i> Signature</span>`;
      } else if (item.dietary && item.dietary.includes("Plant-Based")) {
        badgeHtml = `<span class="menu-card-badge tag-vegan"><i class="fa-solid fa-leaf"></i> Vegan</span>`;
      } else if (item.dietary && item.dietary.length > 0) {
        badgeHtml = `<span class="menu-card-badge">${item.dietary[0]}</span>`;
      }

      return `
        <article class="menu-card" data-id="${item.id}">
          <div class="menu-card-img-wrap">
            <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy">
            ${badgeHtml}
          </div>
          <div class="menu-card-content">
            <div class="menu-card-header">
              <h3 class="menu-card-title">${item.name}</h3>
              <span class="menu-card-price">$${item.price.toFixed(2)}</span>
            </div>
            <div class="menu-card-origin">
              <i class="fa-solid fa-compass"></i>
              <span>${item.origin}</span>
            </div>
            <p class="menu-card-desc">${item.desc}</p>
            <div class="menu-card-actions">
              <span class="menu-card-notes">${item.notes}</span>
              <button class="btn-add-tray" data-id="${item.id}" aria-label="Add ${item.name} to tasting tray">
                <i class="fa-solid fa-plus"></i> Add to Tray
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click handlers to "+ Add to Tray" buttons
    menuGrid.querySelectorAll('.btn-add-tray').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        addToTastingBag(id);
      });
    });
  }

  // Initial render
  renderMenuItems();

  // Category tab listener
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderMenuItems();
    });
  });

  // Dietary filter pills
  dietaryFilters.forEach(pill => {
    pill.addEventListener('click', () => {
      dietaryFilters.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentDietary = pill.getAttribute('data-dietary');
      renderMenuItems();
    });
  });

  // Search input
  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (searchQuery.length > 0) {
          clearSearchBtn.classList.add('visible');
        } else {
          clearSearchBtn.classList.remove('visible');
        }
      }
      renderMenuItems();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (menuSearchInput) {
        menuSearchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.remove('visible');
        renderMenuItems();
      }
    });
  }


  /* ==========================================================
     7. TASTING TRAY / ORDER CART LOGIC
     ========================================================== */
  let tastingBag = [];

  const openTastingBagBtn = document.getElementById('openTastingBagBtn');
  const closeBagBtn = document.getElementById('closeBagBtn');
  const tastingBagDrawer = document.getElementById('tastingBagDrawer');
  const bagBackdrop = document.getElementById('bagBackdrop');
  const bagItemsList = document.getElementById('bagItemsList');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const bagSubtotal = document.getElementById('bagSubtotal');
  const bagTax = document.getElementById('bagTax');
  const bagGrandTotal = document.getElementById('bagGrandTotal');
  const clearBagBtn = document.getElementById('clearBagBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function openBagDrawer() {
    tastingBagDrawer.classList.add('open');
    bagBackdrop.classList.add('open');
    document.body.classList.add('lock-scroll');
  }

  function closeBagDrawer() {
    tastingBagDrawer.classList.remove('open');
    bagBackdrop.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  }

  if (openTastingBagBtn) openTastingBagBtn.addEventListener('click', openBagDrawer);
  if (closeBagBtn) closeBagBtn.addEventListener('click', closeBagDrawer);
  if (bagBackdrop) bagBackdrop.addEventListener('click', closeBagDrawer);

  function addToTastingBag(itemId) {
    const product = menuItems.find(item => item.id === itemId);
    if (!product) return;

    const existingIndex = tastingBag.findIndex(item => item.id === itemId);
    if (existingIndex > -1) {
      tastingBag[existingIndex].quantity += 1;
    } else {
      tastingBag.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    updateBagUI();
    showToast(`Added "${product.name}" to your tasting tray`, 'fa-mug-hot');
  }

  function updateBagUI() {
    const totalCount = tastingBag.reduce((acc, item) => acc + item.quantity, 0);
    if (cartCountBadge) cartCountBadge.textContent = totalCount;

    if (!bagItemsList) return;

    if (tastingBag.length === 0) {
      bagItemsList.innerHTML = `
        <div class="bag-empty-state">
          <i class="fa-solid fa-mug-saucer"></i>
          <p>Your tasting tray is empty.</p>
          <span style="font-size:0.8rem;color:var(--cream-dim);">Explore our handcrafted pour-overs and fresh morning viennoiserie to build your selection.</span>
        </div>
      `;
      if (bagSubtotal) bagSubtotal.textContent = '$0.00';
      if (bagTax) bagTax.textContent = '$0.00';
      if (bagGrandTotal) bagGrandTotal.textContent = '$0.00';
      return;
    }

    bagItemsList.innerHTML = tastingBag.map(item => {
      return `
        <div class="bag-item-card">
          <img src="${item.image}" alt="${item.name}" class="bag-item-thumb">
          <div class="bag-item-info">
            <h4 class="bag-item-title">${item.name}</h4>
            <div class="bag-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="bag-item-qty-control">
              <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
              <span class="qty-count">${item.quantity}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="bag-item-remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
        </div>
      `;
    }).join('');

    // Attach qty and remove listeners
    bagItemsList.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const action = e.currentTarget.getAttribute('data-action');
        const item = tastingBag.find(i => i.id === id);
        if (!item) return;

        if (action === 'increase') {
          item.quantity += 1;
        } else if (action === 'decrease') {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            tastingBag = tastingBag.filter(i => i.id !== id);
          }
        }
        updateBagUI();
      });
    });

    bagItemsList.querySelectorAll('.bag-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        tastingBag = tastingBag.filter(i => i.id !== id);
        updateBagUI();
      });
    });

    // Calculate totals
    const subtotal = tastingBag.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08875; // 8.875% NYC sales tax
    const grandTotal = subtotal + tax;

    if (bagSubtotal) bagSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (bagTax) bagTax.textContent = `$${tax.toFixed(2)}`;
    if (bagGrandTotal) bagGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;
  }

  if (clearBagBtn) {
    clearBagBtn.addEventListener('click', () => {
      if (tastingBag.length > 0) {
        tastingBag = [];
        updateBagUI();
        showToast('Tasting tray cleared', 'fa-trash');
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (tastingBag.length === 0) {
        showToast('Your tasting tray is empty. Add items from the menu first.', 'fa-circle-exclamation');
        return;
      }
      closeBagDrawer();
      showToast('Order received! Our barista is preparing your selection for table/pickup.', 'fa-bell-concierge', true);
      tastingBag = [];
      updateBagUI();
    });
  }

  updateBagUI();


  /* ==========================================================
     8. ATMOSPHERE / GALLERY & LIGHTBOX
     ========================================================== */
  const galleryItems = [
    {
      id: 'g-1',
      title: 'The Calacatta Marble Bar & Espresso Island',
      category: 'ambience',
      categoryLabel: 'Space & Architecture',
      image: 'assets/images/hero.jpg',
      span: true
    },
    {
      id: 'g-2',
      title: 'Artisanal Swan Cappuccino in Olive Stoneware',
      category: 'coffee',
      categoryLabel: 'Barista Craft',
      image: 'assets/images/latte-art.jpg',
      span: false
    },
    {
      id: 'g-3',
      title: '72-Hour Laminated French Pastry & Hearth Poached Egg',
      category: 'culinary',
      categoryLabel: 'Culinary Bakery',
      image: 'assets/images/brunch-croissant.jpg',
      span: false
    },
    {
      id: 'g-4',
      title: 'Slow Bar Pour-Over Station with Hario V60 Craft',
      category: 'coffee',
      categoryLabel: 'Barista Craft',
      image: 'assets/images/hero.jpg',
      span: false
    },
    {
      id: 'g-5',
      title: 'Sunlit Reading Corner & Velvet Armchairs',
      category: 'ambience',
      categoryLabel: 'Space & Architecture',
      image: 'assets/images/hero.jpg',
      span: false
    },
    {
      id: 'g-6',
      title: 'Morning Viennoiserie Fresh from the Bakehouse',
      category: 'culinary',
      categoryLabel: 'Culinary Bakery',
      image: 'assets/images/brunch-croissant.jpg',
      span: true
    }
  ];

  const galleryGrid = document.getElementById('galleryGrid');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  let currentGalleryFilter = 'all';

  function renderGallery() {
    if (!galleryGrid) return;

    const filtered = galleryItems.filter(item => {
      return currentGalleryFilter === 'all' || item.category === currentGalleryFilter;
    });

    galleryGrid.innerHTML = filtered.map((item, index) => {
      const spanClass = item.span ? 'span-2' : '';
      return `
        <div class="gallery-item ${spanClass}" data-index="${index}">
          <img src="${item.image}" alt="${item.title}" class="gallery-item-img" loading="lazy">
          <div class="gallery-item-overlay">
            <span class="gallery-item-category">${item.categoryLabel}</span>
            <h4 class="gallery-item-title">${item.title}</h4>
            <div class="gallery-item-zoom-icon">
              <i class="fa-solid fa-expand"></i>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach lightbox triggers
    galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        openLightbox(filtered[idx], filtered, idx);
      });
    });
  }

  renderGallery();

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGalleryFilter = btn.getAttribute('data-gallery-filter');
      renderGallery();
    });
  });

  // Lightbox Implementation
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let activeGalleryList = [];
  let currentLightboxIndex = 0;

  function openLightbox(item, list, index) {
    activeGalleryList = list;
    currentLightboxIndex = index;
    lightboxImg.src = item.image;
    lightboxCaption.textContent = item.title;
    lightboxModal.classList.add('open');
    document.body.classList.add('lock-scroll');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  }

  function showNextLightbox() {
    if (activeGalleryList.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryList.length;
    const item = activeGalleryList[currentLightboxIndex];
    lightboxImg.src = item.image;
    lightboxCaption.textContent = item.title;
  }

  function showPrevLightbox() {
    if (activeGalleryList.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
    const item = activeGalleryList[currentLightboxIndex];
    lightboxImg.src = item.image;
    lightboxCaption.textContent = item.title;
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightbox);

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextLightbox();
    if (e.key === 'ArrowLeft') showPrevLightbox();
  });


  /* ==========================================================
     9. TABLE RESERVATIONS SYSTEM
     ========================================================== */
  const reservationForm = document.getElementById('reservationForm');
  const resDateInput = document.getElementById('resDate');
  const confirmationModal = document.getElementById('confirmationModal');
  const confirmModalClose = document.getElementById('confirmModalClose');
  const dismissTicketBtn = document.getElementById('dismissTicketBtn');
  const saveTicketBtn = document.getElementById('saveTicketBtn');
  const ticketDetailsBox = document.getElementById('ticketDetailsBox');
  const openReserveBtn = document.getElementById('openReserveBtn');
  const heroBookBtn = document.getElementById('heroBookBtn');

  // Set default reservation date to tomorrow
  if (resDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    resDateInput.value = `${yyyy}-${mm}-${dd}`;
    resDateInput.min = new Date().toISOString().split('T')[0];
  }

  function scrollToReservation() {
    const visitSec = document.getElementById('visit');
    if (visitSec) visitSec.scrollIntoView({ behavior: 'smooth' });
  }

  if (openReserveBtn) openReserveBtn.addEventListener('click', scrollToReservation);
  if (heroBookBtn) heroBookBtn.addEventListener('click', scrollToReservation);

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const location = document.getElementById('resLocation').value;
      const guests = document.getElementById('resGuests').value;
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const name = document.getElementById('resName').value.trim();
      const contact = document.getElementById('resPhone').value.trim();
      const seatingElem = document.querySelector('input[name="seatingPref"]:checked');
      const seating = seatingElem ? seatingElem.value : 'Sunlit Atrium';
      const notes = document.getElementById('resNotes').value.trim();

      // Generate random luxury reference code
      const refCode = `AURA-${Math.floor(1000 + Math.random() * 9000)}`;

      // Format date nicely
      const dateObj = new Date(date + 'T00:00:00');
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      if (ticketDetailsBox) {
        ticketDetailsBox.innerHTML = `
          <div class="ticket-row">
            <span>Reference ID</span>
            <strong class="ticket-ref-code">#${refCode}</strong>
          </div>
          <div class="ticket-row">
            <span>Guest Name</span>
            <strong>${name}</strong>
          </div>
          <div class="ticket-row">
            <span>Sanctuary</span>
            <strong>${location}</strong>
          </div>
          <div class="ticket-row">
            <span>Date & Time</span>
            <strong>${formattedDate} · ${time}</strong>
          </div>
          <div class="ticket-row">
            <span>Party Size</span>
            <strong>${guests} ${guests === '1' ? 'Guest' : 'Guests'} (${seating})</strong>
          </div>
          <div class="ticket-row">
            <span>Contact</span>
            <strong>${contact}</strong>
          </div>
          ${notes ? `
          <div class="ticket-row" style="border-top: 1px dashed var(--border-light); padding-top: 8px;">
            <span>Special Request</span>
            <strong style="font-size:0.82rem;font-weight:400;color:var(--cream-soft);">${notes}</strong>
          </div>` : ''}
        `;
      }

      confirmationModal.classList.add('open');
      document.body.classList.add('lock-scroll');
      showToast(`Reservation #${refCode} confirmed for ${name}!`, 'fa-circle-check', true);
      reservationForm.reset();
    });
  }

  function closeConfirmModal() {
    confirmationModal.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  }

  if (confirmModalClose) confirmModalClose.addEventListener('click', closeConfirmModal);
  if (dismissTicketBtn) dismissTicketBtn.addEventListener('click', closeConfirmModal);

  if (saveTicketBtn) {
    saveTicketBtn.addEventListener('click', () => {
      showToast('Reservation details copied to clipboard & downloaded to calendar!', 'fa-calendar-plus', true);
      closeConfirmModal();
    });
  }


  /* ==========================================================
     10. NEWSLETTER & CONTACT
     ========================================================== */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (email) {
        showToast(`Thank you! Welcome to The Roasters Circle (${email})`, 'fa-envelope-open-text', true);
        newsletterForm.reset();
      }
    });
  }


  /* ==========================================================
     11. TOAST NOTIFICATION UTILITY
     ========================================================== */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, iconClass = 'fa-circle-info', isSuccess = false) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${isSuccess ? 'toast-success' : ''}`;
    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, 3800);
  }


  /* ==========================================================
     12. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

});
