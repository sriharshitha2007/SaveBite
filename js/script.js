/**
 * SaveBite — Smart Food Preservation & Waste Management System
 * Production-style Client Architecture & LocalStorage Database
 * 
 * NOTE: Browser LocalStorage is used for interactive client demonstration.
 * For production deployments, replace this with a hardened backend API and OAuth/JWT session tokens.
 */

// LocalStorage Keys
const STORAGE_KEYS = {
  USERS: 'savebite_users',
  SESSION: 'savebite_current_session',
  FOOD_ITEMS: 'savebite_food_items',
  WASTE_LOGS: 'savebite_waste_logs',
  DONATIONS: 'savebite_donations',
  SETTINGS: 'savebite_user_settings'
};

// Seed Data for First-Time Demo Users
const DEFAULT_SEED_DATA = {
  users: [
    {
      id: 'usr_demo_1',
      name: 'Alex Morgan',
      email: 'demo@savebite.org',
      password: 'password123',
      userType: 'Individual',
      joinedAt: '2026-09-15'
    }
  ],
  foodItems: [
    {
      id: 'food_1',
      userId: 'usr_demo_1',
      name: 'Organic Spinach',
      category: 'Vegetables',
      quantity: 250,
      unit: 'g',
      storageDate: '2026-10-10',
      expiryDate: '2026-10-14',
      storageMethod: 'Refrigerated crisper with dry paper towel',
      notes: 'Crisp green leaves, ideal for salads or quick freeze'
    },
    {
      id: 'food_2',
      userId: 'usr_demo_1',
      name: 'Whole Grain Sourdough',
      category: 'Grains',
      quantity: 1,
      unit: 'pcs',
      storageDate: '2026-10-09',
      expiryDate: '2026-10-13',
      storageMethod: 'Linen bread bag at room temperature',
      notes: 'Slice and freeze extra portions to prevent staling'
    },
    {
      id: 'food_3',
      userId: 'usr_demo_1',
      name: 'Greek Yogurt (Unsweetened)',
      category: 'Dairy',
      quantity: 500,
      unit: 'g',
      storageDate: '2026-10-05',
      expiryDate: '2026-10-16',
      storageMethod: 'Fridge top shelf (3°C)',
      notes: 'Unopened seal intact, store upright'
    },
    {
      id: 'food_4',
      userId: 'usr_demo_1',
      name: 'Roma Tomatoes',
      category: 'Vegetables',
      quantity: 6,
      unit: 'pcs',
      storageDate: '2026-10-08',
      expiryDate: '2026-10-15',
      storageMethod: 'Countertop stem-down away from direct sun',
      notes: 'Do not refrigerate until fully ripe to preserve aroma'
    },
    {
      id: 'food_5',
      userId: 'usr_demo_1',
      name: 'Atlantic Salmon Fillet',
      category: 'Meat and Seafood',
      quantity: 400,
      unit: 'g',
      storageDate: '2026-10-11',
      expiryDate: '2026-10-13',
      storageMethod: 'Deep chiller bottom drawer or freeze immediately',
      notes: 'Expiring very soon — cook tonight or transfer to freezer'
    }
  ],
  wasteLogs: [
    {
      id: 'waste_1',
      userId: 'usr_demo_1',
      name: 'Strawberries',
      category: 'Fruits',
      quantity: 200,
      unit: 'g',
      reason: 'Spoiled',
      date: '2026-10-08',
      notes: 'Excess moisture inside plastic container caused mould'
    },
    {
      id: 'waste_2',
      userId: 'usr_demo_1',
      name: 'Cooked Jasmine Rice',
      category: 'Cooked Food',
      quantity: 350,
      unit: 'g',
      reason: 'Excess cooking',
      date: '2026-10-04',
      notes: 'Cooked too large a batch for weekday dinner'
    },
    {
      id: 'waste_3',
      userId: 'usr_demo_1',
      name: 'Cheddar Cheese Block',
      category: 'Dairy',
      quantity: 150,
      unit: 'g',
      reason: 'Expired',
      date: '2026-09-28',
      notes: 'Forgotten in back of middle fridge shelf'
    }
  ],
  donations: [
    {
      id: 'don_1',
      userId: 'usr_demo_1',
      donorName: 'Alex Morgan',
      contact: 'alex.m@example.org',
      foodName: 'Fresh Orchard Apples (Honeycrisp)',
      category: 'Fruits',
      quantity: 5,
      unit: 'kg',
      prepDate: '2026-10-10',
      safeDeadline: '2026-10-18',
      location: 'Community Hub — Elmwood Center (Locker 4)',
      notes: 'Surplus harvest from family garden. Washed, firm and unblemished.',
      status: 'Active'
    },
    {
      id: 'don_2',
      userId: 'usr_demo_1',
      donorName: 'Green Hearth Community Kitchen',
      contact: 'kitchen@greenhearth.org',
      foodName: 'Artisan Ciabatta Rolls',
      category: 'Grains',
      quantity: 18,
      unit: 'pcs',
      prepDate: '2026-10-12',
      safeDeadline: '2026-10-14',
      location: 'Downtown Community Food Shelf, Bay 2',
      notes: 'Freshly baked surplus from morning catering batch. Wrapped securely in food paper.',
      status: 'Active'
    }
  ],
  settings: {
    notificationsExpiry: true,
    notificationsDonations: true,
    weeklyDigest: false,
    theme: 'light'
  }
};

// Safe Database Helpers
const DB = {
  init() {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_SEED_DATA.users));
      }
      if (!localStorage.getItem(STORAGE_KEYS.FOOD_ITEMS)) {
        localStorage.setItem(STORAGE_KEYS.FOOD_ITEMS, JSON.stringify(DEFAULT_SEED_DATA.foodItems));
      }
      if (!localStorage.getItem(STORAGE_KEYS.WASTE_LOGS)) {
        localStorage.setItem(STORAGE_KEYS.WASTE_LOGS, JSON.stringify(DEFAULT_SEED_DATA.wasteLogs));
      }
      if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
        localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(DEFAULT_SEED_DATA.donations));
      }
      if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SEED_DATA.settings));
      }
    } catch (e) {
      console.warn('LocalStorage error during initialization:', e);
    }
  },

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    } catch { return []; }
  },

  saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getSession() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION) || 'null');
    } catch { return null; }
  },

  setSession(user) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  getFoodItems(userId) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_ITEMS) || '[]');
      if (!userId) return all;
      return all.filter(item => item.userId === userId || !item.userId);
    } catch { return []; }
  },

  saveFoodItems(items) {
    localStorage.setItem(STORAGE_KEYS.FOOD_ITEMS, JSON.stringify(items));
  },

  getWasteLogs(userId) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.WASTE_LOGS) || '[]');
      if (!userId) return all;
      return all.filter(item => item.userId === userId || !item.userId);
    } catch { return []; }
  },

  saveWasteLogs(logs) {
    localStorage.setItem(STORAGE_KEYS.WASTE_LOGS, JSON.stringify(logs));
  },

  getDonations() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || '[]');
    } catch { return []; }
  },

  saveDonations(donations) {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  },

  getSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify(DEFAULT_SEED_DATA.settings));
    } catch { return DEFAULT_SEED_DATA.settings; }
  },

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  resetAllData() {
    localStorage.clear();
    DB.init();
  }
};

// Toast Notification Manager
const Toast = {
  show(message, type = 'success') {
    let container = document.getElementById('savebite-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'savebite-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span style="font-weight: 700;">${type === 'success' ? '✓' : '⚠️'}</span>
      <span>${escapeHtml(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }
};

// Utilities
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

function getDaysRemaining(expiryDateStr) {
  if (!expiryDateStr) return 999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(expiryDateStr);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getExpiryBadge(days) {
  if (days < 0) {
    return `<span class="status-badge status-danger">Expired (${Math.abs(days)}d ago)</span>`;
  } else if (days === 0) {
    return `<span class="status-badge status-danger">Expires Today</span>`;
  } else if (days <= 3) {
    return `<span class="status-badge status-warning">Expiring in ${days}d</span>`;
  } else {
    return `<span class="status-badge status-fresh">Fresh (${days}d left)</span>`;
  }
}

// Page Identifier
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  return page.toLowerCase();
}

// Authentication Guard (Runs STRICTLY on protected pages)
function enforceAuthGuard() {
  const protectedPages = [
    'dashboard.html',
    'my-food.html',
    'waste-tracker.html',
    'donate.html',
    'settings.html'
  ];
  const currentPage = getCurrentPage();
  if (protectedPages.includes(currentPage)) {
    const session = DB.getSession();
    if (!session) {
      // Guard redirect to login with a friendly message stored in sessionStorage
      sessionStorage.setItem('savebite_login_notice', 'Please sign in to access your SaveBite dashboard.');
      window.location.replace('login.html');
      return false;
    }
  }
  return true;
}

// Global UI Setup (User Info in Sidebar / Banner Download / Logout)
function setupCommonUI() {
  const session = DB.getSession();
  
  // Render user info in sidebar if present
  const userNameEls = document.querySelectorAll('.user-info-name');
  const userRoleEls = document.querySelectorAll('.user-info-role');
  if (session) {
    userNameEls.forEach(el => el.textContent = session.name);
    userRoleEls.forEach(el => el.textContent = session.userType || 'Individual');
  }

  // Bind logout buttons
  const logoutButtons = document.querySelectorAll('.btn-logout, #logout-btn');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to sign out of SaveBite?')) {
        DB.clearSession();
        window.location.replace('login.html');
      }
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const sidebar = document.querySelector('.app-sidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }
}

/* ==========================================================================
   Page Initializers
   ========================================================================== */

// 1. LOGIN PAGE (login.html)
function initLoginPage() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  // Never redirect if already on login.html unless user explicitly submits
  // Check notice from protected guard
  const notice = sessionStorage.getItem('savebite_login_notice');
  if (notice) {
    Toast.show(notice, 'error');
    sessionStorage.removeItem('savebite_login_notice');
  }

  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  const togglePassBtn = document.getElementById('toggle-password-btn');
  const demoFillBtn = document.getElementById('fill-demo-credentials');
  const forgotPassLink = document.getElementById('forgot-password-link');

  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passInput.setAttribute('type', type);
      togglePassBtn.textContent = type === 'password' ? 'Show' : 'Hide';
    });
  }

  if (demoFillBtn && emailInput && passInput) {
    demoFillBtn.addEventListener('click', () => {
      emailInput.value = 'demo@savebite.org';
      passInput.value = 'password123';
      Toast.show('Demo credentials loaded! Click "Login to SaveBite" to proceed.');
    });
  }

  if (forgotPassLink) {
    forgotPassLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Demo Notice: Password recovery is simulated for demonstration. Use the pre-configured demo account (demo@savebite.org / password123) or register a new local account.');
    });
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;

    if (!email || !password) {
      Toast.show('Please fill in both email and password.', 'error');
      return;
    }

    const users = DB.getUsers();
    const matchedUser = users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (matchedUser) {
      // Create session
      DB.setSession({
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        userType: matchedUser.userType
      });
      Toast.show(`Welcome back, ${matchedUser.name}! Opening dashboard...`);
      setTimeout(() => {
        window.location.replace('dashboard.html');
      }, 500);
    } else {
      Toast.show('Invalid email or password. You can click "Fill Demo Account" or register a new profile.', 'error');
    }
  });
}

// 2. REGISTRATION PAGE (register.html)
function initRegisterPage() {
  const regForm = document.getElementById('register-form');
  if (!regForm) return;

  regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const userType = document.getElementById('reg-user-type').value;
    const terms = document.getElementById('reg-terms').checked;

    if (!name || !email || !password || !confirmPassword) {
      Toast.show('Please complete all required fields.', 'error');
      return;
    }

    if (!terms) {
      Toast.show('Please accept the SaveBite community guidelines and terms.', 'error');
      return;
    }

    if (password.length < 6) {
      Toast.show('Password must be at least 6 characters.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      Toast.show('Passwords do not match. Please verify.', 'error');
      return;
    }

    const users = DB.getUsers();
    if (users.some(u => u.email === email)) {
      Toast.show('An account with this email already exists. Please log in.', 'error');
      return;
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password,
      userType,
      joinedAt: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    DB.saveUsers(users);

    Toast.show('Account created successfully! Redirecting to login...');
    setTimeout(() => {
      window.location.replace('login.html');
    }, 1000);
  });
}

// 3. DASHBOARD (dashboard.html)
function initDashboardPage() {
  const session = DB.getSession();
  if (!session) return;

  // Header Greeting
  const greetingEl = document.getElementById('dashboard-greeting');
  if (greetingEl) {
    const firstName = session.name.split(' ')[0] || 'Friend';
    const hours = new Date().getHours();
    const timeOfDay = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
    greetingEl.textContent = `${timeOfDay}, ${firstName}!`;
  }

  const currentDateEl = document.getElementById('current-date-display');
  if (currentDateEl) {
    currentDateEl.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Load User Data & Calculate Statistics
  const foodItems = DB.getFoodItems(session.id);
  const wasteLogs = DB.getWasteLogs(session.id);
  const donations = DB.getDonations();

  // KPIs
  const totalFoodEl = document.getElementById('kpi-total-food');
  const expiringSoonEl = document.getElementById('kpi-expiring-soon');
  const totalWasteEl = document.getElementById('kpi-total-waste');
  const totalDonationsEl = document.getElementById('kpi-total-donations');

  const expiringItems = foodItems.filter(item => {
    const days = getDaysRemaining(item.expiryDate);
    return days >= 0 && days <= 3;
  });

  const expiredItems = foodItems.filter(item => getDaysRemaining(item.expiryDate) < 0);

  // Total waste in kg (normalized)
  let totalWasteKg = 0;
  wasteLogs.forEach(w => {
    const q = parseFloat(w.quantity) || 0;
    if (w.unit === 'kg') totalWasteKg += q;
    else if (w.unit === 'g') totalWasteKg += q / 1000;
    else totalWasteKg += q * 0.2; // approx 200g per piece
  });

  if (totalFoodEl) totalFoodEl.textContent = foodItems.length;
  if (expiringSoonEl) expiringSoonEl.textContent = expiringItems.length;
  if (totalWasteEl) totalWasteEl.textContent = `${totalWasteKg.toFixed(1)} kg`;
  if (totalDonationsEl) totalDonationsEl.textContent = donations.filter(d => d.status === 'Active').length;

  // Render Urgency Banner if items expiring
  const urgencyAlert = document.getElementById('urgency-alert-container');
  if (urgencyAlert) {
    if (expiringItems.length > 0 || expiredItems.length > 0) {
      urgencyAlert.style.display = 'block';
      urgencyAlert.innerHTML = `
        <div style="background: var(--color-warning-bg); border: 1px solid var(--color-warning-border); padding: 1rem 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div>
            <strong style="color: #92400e;">Expiry Attention Required:</strong>
            <span style="color: #78350f; font-size: 0.875rem; margin-left: 0.5rem;">
              You have ${expiringItems.length} item(s) nearing expiry and ${expiredItems.length} expired item(s).
            </span>
          </div>
          <a href="my-food.html" class="btn btn-sm btn-primary">Review Pantry</a>
        </div>
      `;
    } else {
      urgencyAlert.style.display = 'none';
    }
  }

  // Render Recent Inventory Table Preview
  const inventoryTbody = document.getElementById('dashboard-inventory-tbody');
  if (inventoryTbody) {
    if (foodItems.length === 0) {
      inventoryTbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">
            No food items logged yet. Click "Add Food" to track your first item!
          </td>
        </tr>
      `;
    } else {
      inventoryTbody.innerHTML = foodItems.slice(0, 5).map(item => {
        const days = getDaysRemaining(item.expiryDate);
        return `
          <tr>
            <td><strong>${escapeHtml(item.name)}</strong></td>
            <td>${escapeHtml(item.category)}</td>
            <td class="tabular-nums">${item.quantity} ${item.unit}</td>
            <td class="tabular-nums">${item.expiryDate}</td>
            <td>${getExpiryBadge(days)}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // Dynamic Rule-Based Daily Preservation Tip
  const tipEl = document.getElementById('daily-preservation-tip');
  if (tipEl) {
    const tips = [
      'Store fresh herbs like a flower bouquet: trim stems and place in a glass with 1 inch of water, covering loosely with a reusable bag.',
      'Separate bananas and apples from leafy greens. They release natural ethylene gas which accelerates ripening of nearby produce.',
      'Store onions and potatoes in separate, cool, dark baskets with good airflow. Storing them together causes moisture buildup and early sprouting.',
      'Practice First In, First Out (FIFO): When restocking your fridge, place newly bought items behind existing ones.',
      'Revive wilted celery and carrots: submerge cut stems in cold ice water for 25 minutes to restore natural cell crispness.'
    ];
    const dayIndex = new Date().getDate() % tips.length;
    tipEl.textContent = tips[dayIndex];
  }
}

// 4. MY FOOD INVENTORY (my-food.html)
function initMyFoodPage() {
  const session = DB.getSession();
  if (!session) return;

  let currentItems = DB.getFoodItems(session.id);
  let editingItemId = null;

  const tableBody = document.getElementById('food-table-tbody');
  const searchInput = document.getElementById('food-search-input');
  const categoryFilter = document.getElementById('food-category-filter');
  const statusFilter = document.getElementById('food-status-filter');

  // Modal Elements
  const modal = document.getElementById('food-modal');
  const modalTitle = document.getElementById('food-modal-title');
  const modalForm = document.getElementById('food-modal-form');
  const openModalBtn = document.getElementById('open-add-food-btn');
  const closeModalBtns = document.querySelectorAll('.close-modal-btn');

  function openModal(itemToEdit = null) {
    editingItemId = itemToEdit ? itemToEdit.id : null;
    modalTitle.textContent = itemToEdit ? 'Edit Food Item' : 'Add Food Item to Inventory';
    
    document.getElementById('modal-food-name').value = itemToEdit ? itemToEdit.name : '';
    document.getElementById('modal-food-category').value = itemToEdit ? itemToEdit.category : 'Vegetables';
    document.getElementById('modal-food-qty').value = itemToEdit ? itemToEdit.quantity : '1';
    document.getElementById('modal-food-unit').value = itemToEdit ? itemToEdit.unit : 'pcs';
    document.getElementById('modal-food-storage-date').value = itemToEdit ? itemToEdit.storageDate : new Date().toISOString().split('T')[0];
    document.getElementById('modal-food-expiry-date').value = itemToEdit ? itemToEdit.expiryDate : '';
    document.getElementById('modal-food-notes').value = itemToEdit ? (itemToEdit.notes || '') : '';
    
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
    modalForm.reset();
    editingItemId = null;
  }

  if (openModalBtn) openModalBtn.addEventListener('click', () => openModal());
  closeModalBtns.forEach(b => b.addEventListener('click', closeModal));

  // Save / Update Food Item
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-food-name').value.trim();
      const category = document.getElementById('modal-food-category').value;
      const quantity = parseFloat(document.getElementById('modal-food-qty').value) || 1;
      const unit = document.getElementById('modal-food-unit').value;
      const storageDate = document.getElementById('modal-food-storage-date').value;
      const expiryDate = document.getElementById('modal-food-expiry-date').value;
      const notes = document.getElementById('modal-food-notes').value.trim();

      if (!name || !expiryDate) {
        Toast.show('Please provide both food name and expiry date.', 'error');
        return;
      }

      const allItems = DB.getFoodItems();

      if (editingItemId) {
        // Edit existing
        const idx = allItems.findIndex(i => i.id === editingItemId);
        if (idx !== -1) {
          allItems[idx] = {
            ...allItems[idx],
            name,
            category,
            quantity,
            unit,
            storageDate,
            expiryDate,
            notes
          };
          DB.saveFoodItems(allItems);
          Toast.show(`Updated "${name}" in inventory.`);
        }
      } else {
        // Add new
        const newItem = {
          id: 'food_' + Date.now(),
          userId: session.id,
          name,
          category,
          quantity,
          unit,
          storageDate,
          expiryDate,
          notes
        };
        allItems.unshift(newItem);
        DB.saveFoodItems(allItems);
        Toast.show(`Added "${name}" to your pantry inventory!`);
      }

      closeModal();
      currentItems = DB.getFoodItems(session.id);
      renderTable();
    });
  }

  // Delete Action
  window.deleteFoodItem = function(id) {
    const item = currentItems.find(i => i.id === id);
    if (!item) return;
    if (confirm(`Are you sure you want to remove "${item.name}" from your inventory?`)) {
      const allItems = DB.getFoodItems().filter(i => i.id !== id);
      DB.saveFoodItems(allItems);
      Toast.show(`"${item.name}" removed.`);
      currentItems = DB.getFoodItems(session.id);
      renderTable();
    }
  };

  // Quick Action: Convert to Waste Log
  window.logItemAsWaste = function(id) {
    const item = currentItems.find(i => i.id === id);
    if (!item) return;
    const reason = prompt(`Log "${item.name}" as food waste.\nEnter waste reason (e.g. Expired, Spoiled, Leftovers):`, 'Expired');
    if (!reason) return;

    const wasteLogs = DB.getWasteLogs();
    wasteLogs.unshift({
      id: 'waste_' + Date.now(),
      userId: session.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      reason: reason,
      date: new Date().toISOString().split('T')[0],
      notes: 'Logged directly from pantry inventory'
    });
    DB.saveWasteLogs(wasteLogs);

    // Remove from inventory
    const allItems = DB.getFoodItems().filter(i => i.id !== id);
    DB.saveFoodItems(allItems);
    currentItems = DB.getFoodItems(session.id);

    Toast.show(`Logged "${item.name}" in Waste Tracker.`);
    renderTable();
  };

  // Quick Action: Convert to Donation Listing
  window.donateFoodItem = function(id) {
    const item = currentItems.find(i => i.id === id);
    if (!item) return;
    const location = prompt(`Create surplus food donation for "${item.name}".\nEnter pickup location / hub notes:`, 'Community Food Locker');
    if (!location) return;

    const donations = DB.getDonations();
    donations.unshift({
      id: 'don_' + Date.now(),
      userId: session.id,
      donorName: session.name,
      contact: session.email,
      foodName: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      prepDate: item.storageDate || new Date().toISOString().split('T')[0],
      safeDeadline: item.expiryDate,
      location: location,
      notes: 'Listed directly from personal pantry inventory',
      status: 'Active'
    });
    DB.saveDonations(donations);

    // Remove from inventory
    const allItems = DB.getFoodItems().filter(i => i.id !== id);
    DB.saveFoodItems(allItems);
    currentItems = DB.getFoodItems(session.id);

    Toast.show(`"${item.name}" listed as surplus donation!`);
    renderTable();
  };

  window.editFoodItem = function(id) {
    const item = currentItems.find(i => i.id === id);
    if (item) openModal(item);
  };

  function renderTable() {
    if (!tableBody) return;

    const search = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const cat = categoryFilter ? categoryFilter.value : 'all';
    const status = statusFilter ? statusFilter.value : 'all';

    const filtered = currentItems.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search) || (item.notes && item.notes.toLowerCase().includes(search));
      const matchCat = cat === 'all' || item.category === cat;
      const days = getDaysRemaining(item.expiryDate);
      
      let matchStatus = true;
      if (status === 'fresh') matchStatus = days > 3;
      else if (status === 'expiring') matchStatus = days >= 0 && days <= 3;
      else if (status === 'expired') matchStatus = days < 0;

      return matchSearch && matchCat && matchStatus;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 3rem 1.5rem;">
            <div style="color: var(--color-text-muted);">
              <p style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">No matching food records found</p>
              <p style="font-size: 0.875rem;">Try adjusting your search terms or add a new food item.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(item => {
      const days = getDaysRemaining(item.expiryDate);
      return `
        <tr>
          <td>
            <div style="font-weight: 700; color: var(--color-text-main);">${escapeHtml(item.name)}</div>
            ${item.notes ? `<div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 2px;">${escapeHtml(item.notes)}</div>` : ''}
          </td>
          <td><span style="font-size: 0.8125rem; color: var(--color-text-body);">${escapeHtml(item.category)}</span></td>
          <td class="tabular-nums font-semibold">${item.quantity} ${item.unit}</td>
          <td class="tabular-nums" style="font-size: 0.8125rem;">${item.expiryDate}</td>
          <td>${getExpiryBadge(days)}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
              <button onclick="editFoodItem('${item.id}')" class="btn btn-sm btn-secondary" title="Edit Item">Edit</button>
              <button onclick="donateFoodItem('${item.id}')" class="btn btn-sm btn-outline-primary" title="Share Surplus">Donate</button>
              <button onclick="logItemAsWaste('${item.id}')" class="btn btn-sm btn-secondary" style="color: #92400e;" title="Log as Waste">Waste</button>
              <button onclick="deleteFoodItem('${item.id}')" class="btn btn-sm btn-danger" title="Delete">✕</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  if (searchInput) searchInput.addEventListener('input', renderTable);
  if (categoryFilter) categoryFilter.addEventListener('change', renderTable);
  if (statusFilter) statusFilter.addEventListener('change', renderTable);

  renderTable();
}

// 5. WASTE TRACKER (waste-tracker.html)
function initWasteTrackerPage() {
  const session = DB.getSession();
  if (!session) return;

  let wasteLogs = DB.getWasteLogs(session.id);

  const tbody = document.getElementById('waste-table-tbody');
  const form = document.getElementById('waste-log-form');
  const reasonFilter = document.getElementById('waste-reason-filter');

  function calculateAnalytics() {
    let totalKg = 0;
    const reasonCounts = {};
    const catCounts = {};

    wasteLogs.forEach(w => {
      const q = parseFloat(w.quantity) || 0;
      let kgVal = q;
      if (w.unit === 'g') kgVal = q / 1000;
      else if (w.unit === 'pcs') kgVal = q * 0.2;
      totalKg += kgVal;

      reasonCounts[w.reason] = (reasonCounts[w.reason] || 0) + 1;
      catCounts[w.category] = (catCounts[w.category] || 0) + kgVal;
    });

    const totalKgEl = document.getElementById('stat-total-waste-kg');
    const totalCountEl = document.getElementById('stat-total-waste-count');
    const topReasonEl = document.getElementById('stat-top-waste-reason');
    const adviceEl = document.getElementById('waste-insight-advice');

    if (totalKgEl) totalKgEl.textContent = `${totalKg.toFixed(1)} kg`;
    if (totalCountEl) totalCountEl.textContent = `${wasteLogs.length} logs`;

    // Find top reason
    let topReason = 'None';
    let maxCount = 0;
    for (const [r, count] of Object.entries(reasonCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topReason = r;
      }
    }
    if (topReasonEl) topReasonEl.textContent = topReason;

    // Generate contextual action advice
    if (adviceEl) {
      if (topReason === 'Expired') {
        adviceEl.innerHTML = '<strong>Actionable Recommendation:</strong> Most waste occurred from food expiring before use. Try arranging your pantry with the FIFO (First In, First Out) method and schedule a 5-minute Sunday audit using the My Food dashboard.';
      } else if (topReason === 'Excess cooking') {
        adviceEl.innerHTML = '<strong>Actionable Recommendation:</strong> High leftover discard detected. Consider single-portion meal prep freezing or reducing dry grain batches (e.g. 1/2 cup dry rice yields ~1.5 cups cooked).';
      } else if (topReason === 'Spoiled') {
        adviceEl.innerHTML = '<strong>Actionable Recommendation:</strong> Produce spoilage detected. Check refrigerator humidity sliders: high humidity for leafy greens and low humidity for fruits releasing ethylene.';
      } else {
        adviceEl.innerHTML = '<strong>Actionable Recommendation:</strong> Consistent waste monitoring reduces household grocery losses by an average of 28% over 60 days.';
      }
    }
  }

  function renderTable() {
    if (!tbody) return;
    const filter = reasonFilter ? reasonFilter.value : 'all';
    const filtered = wasteLogs.filter(w => filter === 'all' || w.reason === filter);

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--color-text-muted);">
            No waste records found for this filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(w => `
      <tr>
        <td><strong>${escapeHtml(w.name)}</strong></td>
        <td>${escapeHtml(w.category)}</td>
        <td class="tabular-nums font-semibold">${w.quantity} ${w.unit}</td>
        <td><span class="status-badge status-warning">${escapeHtml(w.reason)}</span></td>
        <td class="tabular-nums">${w.date}</td>
        <td>
          <button onclick="deleteWasteRecord('${w.id}')" class="btn btn-sm btn-danger" title="Delete Log">✕</button>
        </td>
      </tr>
    `).join('');
  }

  window.deleteWasteRecord = function(id) {
    if (confirm('Delete this waste entry?')) {
      const all = DB.getWasteLogs().filter(w => w.id !== id);
      DB.saveWasteLogs(all);
      wasteLogs = DB.getWasteLogs(session.id);
      Toast.show('Waste record removed.');
      calculateAnalytics();
      renderTable();
    }
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('waste-food-name').value.trim();
      const category = document.getElementById('waste-category').value;
      const quantity = parseFloat(document.getElementById('waste-quantity').value) || 1;
      const unit = document.getElementById('waste-unit').value;
      const reason = document.getElementById('waste-reason').value;
      const date = document.getElementById('waste-date').value || new Date().toISOString().split('T')[0];
      const notes = document.getElementById('waste-notes').value.trim();

      if (!name) {
        Toast.show('Please enter the food name.', 'error');
        return;
      }

      const all = DB.getWasteLogs();
      all.unshift({
        id: 'waste_' + Date.now(),
        userId: session.id,
        name,
        category,
        quantity,
        unit,
        reason,
        date,
        notes
      });
      DB.saveWasteLogs(all);

      form.reset();
      document.getElementById('waste-date').value = new Date().toISOString().split('T')[0];
      Toast.show(`Recorded ${quantity} ${unit} of "${name}" in waste tracker.`);
      wasteLogs = DB.getWasteLogs(session.id);
      calculateAnalytics();
      renderTable();
    });
  }

  if (reasonFilter) reasonFilter.addEventListener('change', renderTable);

  calculateAnalytics();
  renderTable();
}

// 6. FOOD DONATIONS & SHARING (donate.html)
function initDonatePage() {
  const session = DB.getSession();
  const listContainer = document.getElementById('donations-list-grid');
  const form = document.getElementById('donation-form');
  const statusFilter = document.getElementById('donation-status-filter');

  function renderDonations() {
    if (!listContainer) return;
    const filter = statusFilter ? statusFilter.value : 'all';
    const allDonations = DB.getDonations();
    const filtered = allDonations.filter(d => filter === 'all' || d.status === filter);

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="grid-column: 1 / -1;" class="empty-state">
          <h3>No surplus food listings found</h3>
          <p>Be the first in your community to list surplus food or adjust your filter.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered.map(d => {
      const isOwner = session && (d.userId === session.id || d.donorName === session.name);
      return `
        <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.75rem;">
              <h3 style="font-size: 1.125rem;">${escapeHtml(d.foodName)}</h3>
              <span class="status-badge ${d.status === 'Active' ? 'status-fresh' : 'status-info'}">${d.status}</span>
            </div>
            
            <div class="metadata-line" style="margin-bottom: 1rem;">
              <span>${escapeHtml(d.category)}</span>
              <span class="metadata-separator">·</span>
              <strong class="tabular-nums">${d.quantity} ${d.unit}</strong>
              <span class="metadata-separator">·</span>
              <span>Pickup by: ${d.safeDeadline}</span>
            </div>

            <div style="background: var(--color-bg-subtle); padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.8125rem; margin-bottom: 1rem;">
              <div style="color: var(--color-text-main); font-weight: 600; margin-bottom: 2px;">📍 ${escapeHtml(d.location)}</div>
              <div style="color: var(--color-text-muted);">Offered by: ${escapeHtml(d.donorName)} (${escapeHtml(d.contact)})</div>
            </div>

            ${d.notes ? `<p style="font-size: 0.875rem; color: var(--color-text-body); margin-bottom: 1rem;">${escapeHtml(d.notes)}</p>` : ''}
          </div>

          <div style="border-top: 1px solid var(--color-border); padding-top: 0.875rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
            <button onclick="viewDonationDetails('${d.id}')" class="btn btn-sm btn-secondary">Details</button>
            ${isOwner ? `
              <div style="display: flex; gap: 0.35rem;">
                <button onclick="toggleDonationStatus('${d.id}')" class="btn btn-sm btn-outline-primary">
                  ${d.status === 'Active' ? 'Mark Completed' : 'Reactivate'}
                </button>
                <button onclick="deleteDonation('${d.id}')" class="btn btn-sm btn-danger">✕</button>
              </div>
            ` : `
              <button onclick="claimDonationDemo('${d.id}')" class="btn btn-sm btn-primary">Connect for Pickup</button>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  window.toggleDonationStatus = function(id) {
    const all = DB.getDonations();
    const target = all.find(d => d.id === id);
    if (target) {
      target.status = target.status === 'Active' ? 'Completed' : 'Active';
      DB.saveDonations(all);
      Toast.show(`Listing marked as ${target.status}.`);
      renderDonations();
    }
  };

  window.deleteDonation = function(id) {
    if (confirm('Delete this surplus food listing?')) {
      const all = DB.getDonations().filter(d => d.id !== id);
      DB.saveDonations(all);
      Toast.show('Listing deleted.');
      renderDonations();
    }
  };

  window.viewDonationDetails = function(id) {
    const d = DB.getDonations().find(i => i.id === id);
    if (d) {
      alert(`Surplus Food Listing Details:\n\nItem: ${d.foodName}\nQuantity: ${d.quantity} ${d.unit}\nDonor: ${d.donorName} (${d.contact})\nLocation: ${d.location}\nSafe Collection Deadline: ${d.safeDeadline}\nNotes: ${d.notes || 'None'}`);
    }
  };

  window.claimDonationDemo = function(id) {
    const d = DB.getDonations().find(i => i.id === id);
    if (d) {
      alert(`Demo Coordination Notice:\n\nYou are requesting pickup for "${d.foodName}". In this demo, contact details are: ${d.contact}.\n\nAlways adhere to standard food handling safety standards: inspect packaging, ensure proper temperature during transit, and verify seal integrity.`);
    }
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const foodName = document.getElementById('don-food-name').value.trim();
      const category = document.getElementById('don-category').value;
      const quantity = parseFloat(document.getElementById('don-quantity').value) || 1;
      const unit = document.getElementById('don-unit').value;
      const safeDeadline = document.getElementById('don-safe-deadline').value;
      const location = document.getElementById('don-location').value.trim();
      const contact = document.getElementById('don-contact').value.trim() || (session ? session.email : 'volunteer@savebite.org');
      const notes = document.getElementById('don-notes').value.trim();

      if (!foodName || !safeDeadline || !location) {
        Toast.show('Please complete item name, pickup deadline, and location.', 'error');
        return;
      }

      const all = DB.getDonations();
      all.unshift({
        id: 'don_' + Date.now(),
        userId: session ? session.id : 'usr_guest',
        donorName: session ? session.name : 'Community Donor',
        contact,
        foodName,
        category,
        quantity,
        unit,
        prepDate: new Date().toISOString().split('T')[0],
        safeDeadline,
        location,
        notes,
        status: 'Active'
      });
      DB.saveDonations(all);

      form.reset();
      Toast.show(`Surplus listing for "${foodName}" posted to community board!`);
      renderDonations();
    });
  }

  if (statusFilter) statusFilter.addEventListener('change', renderDonations);

  renderDonations();
}

// 7. ASKBITE ASSISTANT (askbite.html)
function initAskBitePage() {
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const promptChips = document.querySelectorAll('.chip-btn');
  const clearChatBtn = document.getElementById('clear-chat-btn');

  if (!chatMessages) return;

  // Local Rule-Based Knowledge Engine
  const KNOWLEDGE_BASE = [
    {
      keywords: ['tomato', 'tomatoes'],
      response: 'Store ripe tomatoes stem-down on your countertop at room temperature away from direct sunlight. Refrigeration degrades their cell structure and volatile aromas, making them mealy. Only refrigerate once cut, placed in an airtight container for up to 3 days.'
    },
    {
      keywords: ['banana', 'bananas'],
      response: 'Keep bananas at room temperature. Wrap their crowns (stems) in beeswax wrap or foil to slow the release of ethylene gas. Store bananas away from avocados, apples, and leafy greens unless you deliberately want to ripen them quickly.'
    },
    {
      keywords: ['spinach', 'greens', 'lettuce', 'leafy', 'kale', 'salad'],
      response: 'Moisture is the enemy of leafy greens! Line your container or crisper drawer with clean, dry paper towels or a cotton tea towel to absorb excess condensation. If greens start to wilt, soak them in an ice-water bath for 20 minutes to restore turgor pressure.'
    },
    {
      keywords: ['bread', 'sourdough', 'loaf'],
      response: 'Never refrigerate bread — refrigerator temperatures accelerate retrogradation (starch crystallization), causing it to stale 3x faster than room temp! Store crusty loaves cut-side down in a paper or linen bag. For long-term preservation, slice and freeze; toast straight from frozen.'
    },
    {
      keywords: ['rice', 'cooked rice'],
      response: 'Cooked rice can harbor Bacillus cereus spores. Cool cooked rice rapidly (spread on a clean tray within 1 hour) and refrigerate at 4°C or below. Consume within 3–4 days, or freeze in meal-sized portions for up to 3 months. Always reheat until steaming hot throughout.'
    },
    {
      keywords: ['apple', 'apples'],
      response: 'Apples last up to 6–8 weeks when stored in the crisper drawer of your refrigerator. Because they produce high amounts of ethylene gas, keep them in their own drawer or ventilated bag away from ethylene-sensitive vegetables like broccoli and carrots.'
    },
    {
      keywords: ['potato', 'potatoes', 'onion', 'onions'],
      response: 'Keep potatoes in a cool, dark, well-ventilated cupboard (not in plastic bags). Crucially, store potatoes and onions in separate baskets! Onions emit gases that trigger early sprouting in potatoes, while potato moisture causes onions to turn soft.'
    },
    {
      keywords: ['freeze', 'freezer', 'freezing'],
      response: 'Most foods freeze well if sealed airtight to prevent freezer burn. Key tips: 1) Blanch vegetables (1–3 mins in boiling water, then ice bath) before freezing to deactivate enzymes. 2) Leave 1/2 inch headspace in jars for liquid expansion. 3) Freeze berries on a baking sheet first before bagging so they don’t clump.'
    },
    {
      keywords: ['fifo', 'organization', 'refrigerator', 'fridge'],
      response: 'Follow the FIFO principle: First In, First Out. Label items with storage dates and place newly bought groceries behind older ones. Fridge zones: Top shelf (ready-to-eat, leftovers), Middle shelf (dairy, eggs), Bottom shelf (raw meats — coldest and prevents drips), Crisper drawers (fruits & veg).'
    },
    {
      keywords: ['waste', 'reduce', 'leftovers'],
      response: 'Three high-impact waste reduction habits: 1) Take a 30-second "Pantry Photo" before grocery shopping to avoid duplicates. 2) Designate an "Eat Me First" bin on the top fridge shelf for items nearing expiry. 3) Turn vegetable scraps (onion skins, celery leaves, carrot ends) into rich homemade vegetable stock.'
    }
  ];

  function getAssistantResponse(query) {
    const lower = query.toLowerCase();
    for (const entry of KNOWLEDGE_BASE) {
      if (entry.keywords.some(k => lower.includes(k))) {
        return entry.response;
      }
    }
    return `Great question regarding "${query}". For maximum shelf-life: ensure airtight sealing, keep refrigeration strictly between 1°C and 4°C, and monitor humidity. You can also log this item into your SaveBite "My Food" pantry to receive automatic countdown alerts before it expires!`;
  }

  function appendMessage(text, sender = 'bot') {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${sender === 'bot' ? 'message-bot' : 'message-user'}`;
    bubble.innerHTML = `
      <p>${escapeHtml(text)}</p>
      <span class="message-timestamp">${time}</span>
    `;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      appendMessage(text, 'user');
      chatInput.value = '';

      // Simulate thoughtful answering
      setTimeout(() => {
        const reply = getAssistantResponse(text);
        appendMessage(reply, 'bot');
      }, 350);
    });
  }

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt') || chip.textContent.trim();
      appendMessage(promptText, 'user');
      setTimeout(() => {
        const reply = getAssistantResponse(promptText);
        appendMessage(reply, 'bot');
      }, 350);
    });
  });

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="message-bubble message-bot">
          <p>Hello! I am your <strong>AskBite Preservation Assistant</strong>. Ask me any practical question about storing groceries, freezing leftovers, pantry shelf-life, or preventing food waste.</p>
          <span class="message-timestamp">Just now</span>
        </div>
      `;
      Toast.show('Conversation reset.');
    });
  }
}

// 8. PRESERVATION ENCYCLOPEDIA (preservation.html)
function initPreservationPage() {
  const searchInput = document.getElementById('preservation-search');
  const catButtons = document.querySelectorAll('.preservation-cat-btn');
  const cards = document.querySelectorAll('.preservation-card');

  if (!cards.length) return;

  let activeCat = 'all';

  function filterCards() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();
      const matchCat = activeCat === 'all' || cardCat === activeCat;
      const matchSearch = !q || text.includes(q);

      if (matchCat && matchSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterCards);

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('btn-primary'));
      catButtons.forEach(b => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
      activeCat = btn.getAttribute('data-category') || 'all';
      filterCards();
    });
  });
}

// 9. SETTINGS (settings.html)
function initSettingsPage() {
  const session = DB.getSession();
  if (!session) return;

  const nameInput = document.getElementById('settings-name');
  const emailInput = document.getElementById('settings-email');
  const roleSelect = document.getElementById('settings-role');
  const notifyExpiry = document.getElementById('settings-notify-expiry');
  const notifyDonations = document.getElementById('settings-notify-donations');
  const weeklyDigest = document.getElementById('settings-weekly-digest');
  const profileForm = document.getElementById('settings-profile-form');
  const resetDataBtn = document.getElementById('reset-demo-data-btn');

  // Populate
  if (nameInput) nameInput.value = session.name;
  if (emailInput) emailInput.value = session.email;
  if (roleSelect) roleSelect.value = session.userType || 'Individual';

  const settings = DB.getSettings();
  if (notifyExpiry) notifyExpiry.checked = settings.notificationsExpiry !== false;
  if (notifyDonations) notifyDonations.checked = settings.notificationsDonations !== false;
  if (weeklyDigest) weeklyDigest.checked = settings.weeklyDigest === true;

  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = nameInput.value.trim();
      const newEmail = emailInput.value.trim().toLowerCase();
      const newRole = roleSelect.value;

      if (!newName || !newEmail) {
        Toast.show('Please provide valid name and email.', 'error');
        return;
      }

      // Update session
      const updatedSession = { ...session, name: newName, email: newEmail, userType: newRole };
      DB.setSession(updatedSession);

      // Update user in DB
      const users = DB.getUsers();
      const uIndex = users.findIndex(u => u.id === session.id);
      if (uIndex !== -1) {
        users[uIndex] = { ...users[uIndex], name: newName, email: newEmail, userType: newRole };
        DB.saveUsers(users);
      }

      // Update preferences
      DB.saveSettings({
        notificationsExpiry: notifyExpiry ? notifyExpiry.checked : true,
        notificationsDonations: notifyDonations ? notifyDonations.checked : true,
        weeklyDigest: weeklyDigest ? weeklyDigest.checked : false,
        theme: 'light'
      });

      Toast.show('Profile & preferences saved successfully!');
      setupCommonUI();
    });
  }

  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', () => {
      if (confirm('CAUTION: Reset all local storage data back to original seed defaults?\n\nThis will restore default food items, sample waste logs, and demo user Alex Morgan.')) {
        DB.resetAllData();
        Toast.show('All demo records reset to seed defaults.');
        setTimeout(() => window.location.reload(), 700);
      }
    });
  }
}

// Global Master Dispatcher
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Database
  DB.init();

  // 2. Enforce Authentication Guard where appropriate
  if (!enforceAuthGuard()) return;

  // 3. Setup Shared UI
  setupCommonUI();

  // 4. Scoped Page Execution based on unique DOM markers
  const currentPage = getCurrentPage();

  if (document.getElementById('login-form')) {
    initLoginPage();
  }
  if (document.getElementById('register-form')) {
    initRegisterPage();
  }
  if (document.getElementById('dashboard-inventory-tbody') || currentPage === 'dashboard.html') {
    initDashboardPage();
  }
  if (document.getElementById('food-table-tbody') || currentPage === 'my-food.html') {
    initMyFoodPage();
  }
  if (document.getElementById('waste-table-tbody') || currentPage === 'waste-tracker.html') {
    initWasteTrackerPage();
  }
  if (document.getElementById('donations-list-grid') || currentPage === 'donate.html') {
    initDonatePage();
  }
  if (document.getElementById('chat-messages') || currentPage === 'askbite.html') {
    initAskBitePage();
  }
  if (document.getElementById('preservation-search') || currentPage === 'preservation.html') {
    initPreservationPage();
  }
  if (document.getElementById('settings-profile-form') || currentPage === 'settings.html') {
    initSettingsPage();
  }
});
