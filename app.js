/**
 * AMARA BOTANICAL ROASTERY & CAFÉ — BENGALURU
 * Clean, lightweight client logic for navigation, editorial menu, and table reservations.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. PRELOADER
     ========================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.getElementById('preloaderProgress');
  const preloaderText = document.getElementById('preloaderText');

  let progress = 0;
  const timer = setInterval(() => {
    progress += 8;
    if (preloaderProgress) preloaderProgress.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');
      }, 250);
    }
  }, 20);

  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  }, 1200);


  /* ==========================================================
     2. HEADER SCROLL & PROGRESS BAR
     ========================================================== */
  const header = document.getElementById('mainHeader');
  const scrollProgressBar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > 30) {
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
     4. EDITORIAL MENU (CLASSIC CAFÉ DOT-LEADER FORMAT)
     ========================================================== */
  const menuData = {
    coffee: [
      {
        name: 'AMARA Flat White',
        price: '₹260',
        badge: 'Signature',
        desc: 'Double shot estate Arabica with velvety microfoam.'
      },
      {
        name: 'Cardamom & Jaggery Cortado',
        price: '₹280',
        badge: 'House Special',
        desc: 'Equal parts espresso and warm milk with organic Coorg jaggery.'
      },
      {
        name: 'Estate Cappuccino',
        price: '₹250',
        badge: '',
        desc: 'Rich extraction with dark chocolate and roasted hazelnut notes.'
      },
      {
        name: 'Balur Estate V60 Pour-Over',
        price: '₹320',
        badge: 'Single Origin',
        desc: 'Washed Arabica highlighting delicate sweet lime and honey floral notes.'
      },
      {
        name: 'Honey-Sun Aeropress',
        price: '₹340',
        badge: 'Rare Lot',
        desc: 'Naturally dried Western Ghats beans with ripe stone fruit notes.'
      },
      {
        name: '24-Hour Cold Drip',
        price: '₹330',
        badge: '',
        desc: 'Slow drop-by-drop extraction over hand-cut crystal ice.'
      }
    ],
    bakery: [
      {
        name: 'French Butter Croissant',
        price: '₹240',
        badge: 'Fresh Daily',
        desc: 'Golden flaky layers baked fresh every morning with Normandy butter.'
      },
      {
        name: 'Pistachio Almond Croissant',
        price: '₹320',
        badge: '',
        desc: 'Twice-baked with roasted nut frangipane and powdered sugar.'
      },
      {
        name: 'Dark Chocolate Sea Salt Babka',
        price: '₹280',
        badge: '',
        desc: 'Braided brioche infused with 70% Indian cacao and Maldon salt.'
      },
      {
        name: 'Truffle Poached Egg Brioche',
        price: '₹440',
        badge: 'Brunch',
        desc: 'Avocado mash, free-range poached egg, and truffle emulsion on brioche.'
      },
      {
        name: 'Whipped Ricotta & Fig Toast',
        price: '₹390',
        badge: '',
        desc: 'Wild honey, seasonal fresh figs, and toasted artisan sourdough.'
      },
      {
        name: 'Wild Forest Mushroom Tartine',
        price: '₹410',
        badge: 'Vegetarian',
        desc: 'Pan-seared mushrooms, thyme garlic cream, and fresh garden herbs.'
      }
    ],
    teas: [
      {
        name: 'Espresso Tonic & Sweet Orange',
        price: '₹320',
        badge: 'Chilled',
        desc: 'Chilled espresso poured over botanical tonic and dehydrated citrus.'
      },
      {
        name: 'Ceremonial Uji Iced Matcha',
        price: '₹360',
        badge: 'First Harvest',
        desc: 'Whisked Japanese green tea with cold oat milk and light agave.'
      },
      {
        name: 'Cascara Sparkling Spritz',
        price: '₹290',
        badge: 'Zero Waste',
        desc: 'Brewed coffee cherry husk infusion with sparkling soda and rosemary.'
      },
      {
        name: 'Silver Needle White Tea',
        price: '₹280',
        badge: 'Whole Leaf',
        desc: 'Gentle whole-leaf steep with delicate floral notes and honey aroma.'
      }
    ]
  };

  const menuContainer = document.getElementById('editorialMenuContainer');
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  let currentCategory = 'coffee';

  function renderEditorialMenu() {
    if (!menuContainer) return;

    const items = menuData[currentCategory] || [];
    menuContainer.innerHTML = `
      <div class="menu-dual-columns">
        ${items.map(item => `
          <div class="editorial-menu-item">
            <div class="item-top-row">
              <span class="item-name">
                ${item.name}
                ${item.badge ? `<span class="item-badge">${item.badge}</span>` : ''}
              </span>
              <span class="item-dots"></span>
              <span class="item-price">${item.price}</span>
            </div>
            <p class="item-desc">${item.desc}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderEditorialMenu();

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderEditorialMenu();
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
            <span>Booking Ref:</span>
            <strong>#${bookingRef}</strong>
          </div>
          <div class="ticket-item">
            <span>Guest Name:</span>
            <strong>${name}</strong>
          </div>
          <div class="ticket-item">
            <span>Phone:</span>
            <strong>${phone}</strong>
          </div>
          <div class="ticket-item">
            <span>When:</span>
            <strong>${formattedDate} · ${time}</strong>
          </div>
          <div class="ticket-item">
            <span>Party & Area:</span>
            <strong>${guests} ${guests === '1' ? 'Guest' : 'Guests'} (${area})</strong>
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
      showToast(`Reservation #${bookingRef} confirmed for ${name}!`);
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
     7. SCROLL ACTIVE LINK & REVEALS
     ========================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

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
