/**
 * AMARA BOTANICAL ROASTERY & CAFÉ — BENGALURU
 * Clean, lightweight client logic for navigation, menu filtering, and table reservations.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. PRELOADER
     ========================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.getElementById('preloaderProgress');
  const preloaderText = document.getElementById('preloaderText');

  let progress = 0;
  const steps = [
    { target: 40, text: 'Selecting Chikmagalur estate beans...' },
    { target: 80, text: 'Small-batch roasting in Indiranagar...' },
    { target: 100, text: 'Welcome to AMARA.' }
  ];

  let stepIdx = 0;
  const timer = setInterval(() => {
    if (stepIdx < steps.length) {
      progress += 5;
      if (progress >= steps[stepIdx].target) {
        if (preloaderText) preloaderText.textContent = steps[stepIdx].text;
        stepIdx++;
      }
      if (preloaderProgress) preloaderProgress.style.width = `${Math.min(progress, 100)}%`;
    }

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');
      }, 350);
    }
  }, 25);

  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  }, 1800);


  /* ==========================================================
     2. HEADER SCROLL & PROGRESS BAR
     ========================================================== */
  const header = document.getElementById('mainHeader');
  const scrollProgressBar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

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

  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
  if (drawerReserveBtn) drawerReserveBtn.addEventListener('click', closeDrawer);


  /* ==========================================================
     4. CONCISE BENGALURU-BASED MENU (CLEAN & SHORT)
     ========================================================== */
  const menuItems = [
    // Espresso & Milk
    {
      category: 'espresso',
      name: 'AMARA Signature Flat White',
      tag: 'Best Seller',
      desc: 'Double shot Chikmagalur Arabica with textured creamy whole milk.',
      price: '₹260'
    },
    {
      category: 'espresso',
      name: 'Cardamom & Jaggery Cortado',
      tag: 'Signature',
      desc: 'Equal parts estate espresso and warm milk with organic Coorg jaggery.',
      price: '₹280'
    },
    {
      category: 'espresso',
      name: 'Classic Estate Cappuccino',
      tag: '',
      desc: 'Silky microfoam over dark chocolate and hazelnut noted espresso.',
      price: '₹250'
    },
    {
      category: 'espresso',
      name: 'Iced Vanilla Bean Latte',
      tag: '',
      desc: 'Madagascar vanilla syrup, cold milk, and slow-poured espresso over ice.',
      price: '₹310'
    },

    // Single Estate Manual Brews
    {
      category: 'pourover',
      name: 'Chikmagalur Balur Estate V60',
      tag: 'Single Origin',
      desc: 'Washed Arabica with bright notes of sweet lime, honey, and jasmine.',
      price: '₹320'
    },
    {
      category: 'pourover',
      name: 'Coorg Honey-Sun Natural Aeropress',
      tag: 'Rare Lot',
      desc: 'Naturally processed hill coffee with deep blackcurrant and cacao notes.',
      price: '₹340'
    },
    {
      category: 'pourover',
      name: '24-Hour Cold Drip Kaapi',
      tag: 'Slow Brew',
      desc: 'Cold extracted drop-by-drop through glass towers. Served neat over clear ice.',
      price: '₹330'
    },

    // Artisanal Bakes
    {
      category: 'bakery',
      name: 'French Butter Croissant',
      tag: 'Fresh Daily',
      desc: 'Golden flaky layers baked fresh every morning with Normandy butter.',
      price: '₹240'
    },
    {
      category: 'bakery',
      name: 'Twice-Baked Pistachio Almond Croissant',
      tag: 'Chef Pick',
      desc: 'Filled with roasted nut frangipane and dusted with powdered sugar.',
      price: '₹320'
    },
    {
      category: 'bakery',
      name: 'Dark Chocolate Sea Salt Babka',
      tag: '',
      desc: 'Braided brioche infused with 70% Indian dark chocolate and Maldon salt.',
      price: '₹280'
    },

    // Hearth Brunch
    {
      category: 'brunch',
      name: 'Truffle Poached Egg Brioche',
      tag: 'Signature',
      desc: 'Avocado mash, free-range poached egg, and truffle oil on toasted brioche.',
      price: '₹440'
    },
    {
      category: 'brunch',
      name: 'Whipped Ricotta & Fig Toast',
      tag: '',
      desc: 'Local wild honey, fresh figs, and house-made sourdough toast.',
      price: '₹390'
    },
    {
      category: 'brunch',
      name: 'Wild Mushroom Tartine',
      tag: 'Vegetarian',
      desc: 'Pan-seared forest mushrooms, garlic thyme cream, and microgreens.',
      price: '₹410'
    },

    // Cold Sips & Botanicals
    {
      category: 'refreshers',
      name: 'Espresso Tonic with Sweet Orange',
      tag: 'Refreshing',
      desc: 'Chilled estate espresso floated over artisanal tonic and citrus slice.',
      price: '₹320'
    },
    {
      category: 'refreshers',
      name: 'Ceremonial Uji Iced Matcha Latte',
      tag: 'Japanese Grade',
      desc: 'First harvest green tea whisked fresh with oat milk and agave.',
      price: '₹360'
    },
    {
      category: 'refreshers',
      name: 'Bengaluru Cascara Sparkling Spritz',
      tag: 'Zero Waste',
      desc: 'Brewed coffee-cherry husk with sparkling soda and rosemary.',
      price: '₹290'
    }
  ];

  const menuGrid = document.getElementById('menuGrid');
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  let currentCategory = 'all';

  function renderMenu() {
    if (!menuGrid) return;

    const filtered = menuItems.filter(item => {
      return currentCategory === 'all' || item.category === currentCategory;
    });

    menuGrid.innerHTML = filtered.map(item => `
      <div class="menu-item-row">
        <div class="menu-item-details">
          <div class="menu-item-title">
            <span>${item.name}</span>
            ${item.tag ? `<span class="menu-tag-badge">${item.tag}</span>` : ''}
          </div>
          <p class="menu-item-desc">${item.desc}</p>
        </div>
        <div class="menu-item-price">${item.price}</div>
      </div>
    `).join('');
  }

  renderMenu();

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderMenu();
    });
  });


  /* ==========================================================
     5. EASY TABLE RESERVATION FORM
     ========================================================== */
  const easyReserveForm = document.getElementById('easyReserveForm');
  const bookDateInput = document.getElementById('bookDate');
  const confirmationModal = document.getElementById('confirmationModal');
  const confirmModalClose = document.getElementById('confirmModalClose');
  const dismissTicketBtn = document.getElementById('dismissTicketBtn');
  const ticketDetailsBox = document.getElementById('ticketDetailsBox');

  // Set default date to tomorrow
  if (bookDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    bookDateInput.value = tomorrow.toISOString().split('T')[0];
    bookDateInput.min = new Date().toISOString().split('T')[0];
  }

  if (easyReserveForm) {
    easyReserveForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value;
      const guests = document.getElementById('bookGuests').value;
      const area = document.getElementById('bookArea').value;
      const note = document.getElementById('bookNote').value.trim();

      const bookingRef = `AMR-${Math.floor(1000 + Math.random() * 9000)}`;
      const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      if (ticketDetailsBox) {
        ticketDetailsBox.innerHTML = `
          <div class="ticket-item">
            <span>Booking ID:</span>
            <strong>#${bookingRef}</strong>
          </div>
          <div class="ticket-item">
            <span>Guest Name:</span>
            <strong>${name}</strong>
          </div>
          <div class="ticket-item">
            <span>Contact (WhatsApp/SMS):</span>
            <strong>${phone}</strong>
          </div>
          <div class="ticket-item">
            <span>When:</span>
            <strong>${formattedDate} at ${time}</strong>
          </div>
          <div class="ticket-item">
            <span>Party Size & Seating:</span>
            <strong>${guests} ${guests === '1' ? 'Guest' : 'Guests'} · ${area}</strong>
          </div>
          ${note ? `
          <div class="ticket-item">
            <span>Note:</span>
            <strong>${note}</strong>
          </div>` : ''}
        `;
      }

      confirmationModal.classList.add('open');
      document.body.classList.add('lock-scroll');
      showToast(`Table confirmed for ${name}! Ref: #${bookingRef}`);
      easyReserveForm.reset();
    });
  }

  function closeModal() {
    confirmationModal.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  }

  if (confirmModalClose) confirmModalClose.addEventListener('click', closeModal);
  if (dismissTicketBtn) dismissTicketBtn.addEventListener('click', closeModal);


  /* ==========================================================
     6. TOAST NOTIFICATION UTILITY
     ========================================================== */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }


  /* ==========================================================
     7. SCROLL REVEAL ANIMATIONS
     ========================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
});
