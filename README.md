# SaveBite — Smart Food Preservation & Waste Management System
> **Tagline:** Save Food. Save Tomorrow.

SaveBite is a comprehensive, production-style web application designed to help households, culinary creators, and community food initiatives preserve groceries longer, track discard root causes, eliminate preventable food waste, and share surplus harvest and bakery batches with local neighbors and shelters.

---

## 🚀 Quick Start with Visual Studio Code & Live Server

SaveBite is architected with modern **HTML5, CSS3, and vanilla JavaScript** with **zero external framework dependencies** or backend installation requirements. It runs instantly out-of-the-box.

### 1. Extract the Archive
Extract `SaveBite_Complete_Project.zip` on your machine. You will find the root folder:
```
SaveBite/
├── index.html
├── register.html
├── login.html
├── dashboard.html
├── my-food.html
├── preservation.html
├── waste-tracker.html
├── donate.html
├── askbite.html
├── settings.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── icons/
├── README.md
└── TESTING.md
```

### 2. Open in VS Code
1. Launch **Visual Studio Code**.
2. Click **File → Open Folder...** and select the extracted `SaveBite` folder.

### 3. Run with Live Server
1. Ensure the **Live Server** extension by *Ritwick Dey* is installed in VS Code.
2. Right-click `index.html` in the file explorer.
3. Select **"Open with Live Server"** (or click **Go Live** on the bottom status bar).
4. Your browser will automatically open `http://127.0.0.1:5500/index.html`.

---

## 🔑 Demo Account Credentials

A pre-seeded demonstration account is ready to use immediately:

- **Email Address:** `demo@savebite.org`
- **Password:** `password123`
- **User Role:** Individual / Household
- **One-Click Autofill:** On the `login.html` page, click the **"Load Demo Credentials"** button to automatically fill these details!

*Alternatively, you can navigate to `register.html` and create any number of custom local profiles.*

---

## 🌟 Core Features Implemented

1. **Landing Page (`index.html`)**:
   - High-impact hero section with genuine food storage photography.
   - 3-Zone Top Bar contract with working responsive navigation.
   - Interactive bento-grid feature showcase.
   - 4-step workflow explaining inventory, preservation, waste auditing, and surplus sharing.
   - Global project banner with direct downloadable ZIP export link.

2. **SaaS-Style Split-Screen Authentication (`login.html` & `register.html`)**:
   - Modern split-screen layout with visual branding showcase.
   - Inline form validation, show/hide password toggle, and duplicate email prevention.
   - Protected route authentication guard that strictly prevents infinite redirect loops.
   - Graceful demo alerts for password recovery.

3. **Personalized Dashboard (`dashboard.html`)**:
   - Dynamic time-of-day greeting ("Good morning / afternoon / evening, [User]!").
   - 4 Live KPI metric cards calculated dynamically from user LocalStorage records.
   - Expiry urgency banner highlighting items expiring within 72 hours.
   - Recent inventory preview table with color-coded freshness badges.
   - Dynamic Preservation Tip of the Day rule engine.

4. **Food Pantry Inventory (`my-food.html`)**:
   - Complete CRUD operations (Add, Edit, Delete with modal confirmation).
   - Categorized by Vegetables, Fruits, Dairy, Grains & Bakery, Meat & Seafood, Cooked Food, and Pantry.
   - Search input and double filter controls (Category and Freshness status).
   - One-click workflow triggers: **"Donate"** (transfers surplus directly to community board) and **"Waste"** (logs item to waste tracker).

5. **Food Preservation Encyclopedia (`preservation.html`)**:
   - Comprehensive refrigerator anatomy diagram (Top, Middle, Bottom, Crisper zones).
   - Practical storage guides for leafy greens, whole tomatoes, berries, artisan bread, cooked rice, and raw meats.
   - Interactive live category filter and search bar.

6. **Waste Tracker & Root-Cause Analytics (`waste-tracker.html`)**:
   - Discard logging by food name, category, quantity, normalized unit (g, kg, pcs), reason, date, and notes.
   - Cumulative waste weight calculation in kilograms.
   - Root-cause identification (Expired, Spoiled, Excess cooking, Improper storage, Leftovers).
   - Contextual behavioral recommendations generated dynamically based on the user's top waste factor.

7. **Surplus Food Sharing & Donation (`donate.html`)**:
   - Peer community board for extra orchard harvests, bakery batches, or unopened dry goods.
   - Safe collection deadline dates and pickup hub locations.
   - Active vs. Completed status filters, listing details modal, and donor management.
   - Transparent food safety guidelines and volunteer pickup reminders.

8. **AskBite AI Assistant (`askbite.html`)**:
   - Conversational chat interface with quick question chips.
   - Intelligent client-side rule-based food preservation expert engine.
   - Instant answers for tomatoes, bananas, leafy greens, bread staling, cooked rice safety, freezing rules, and FIFO practices.

9. **Settings & Preferences (`settings.html`)**:
   - Profile editor for display name, email, and user role.
   - Simulated notification toggles for expiry warnings and community donation alerts.
   - Factory reset button to restore default sample records with safety confirmation.

---

## 🔒 Security & LocalStorage Limitations Disclosure

- **Demonstration Scope:** This project utilizes the browser's `localStorage` API to provide an interactive, stateful client-side experience without requiring a database server.
- **Not for Production:** Client-side LocalStorage credentials are not encrypted and must **never** be used for sensitive production passwords.
- **Client AI Engine:** AskBite AI runs on a curated local rule-based JavaScript engine. It operates completely offline in the user's browser without calling external paid LLM APIs or transmitting private data.
