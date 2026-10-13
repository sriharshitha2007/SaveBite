# SaveBite — Verification & Test Suite Matrix

This document provides the test matrix verifying all 25 critical requirements specified in the project specification.

| Test ID | Test Description | Status | Verification Details |
| :--- | :--- | :---: | :--- |
| **TC-01** | `index.html` opens with full styling | **PASSED** | Verified CSS design tokens, typography, hero card, bento-grid, and footer layout render cleanly. |
| **TC-02** | Login and registration pages are beautifully styled | **PASSED** | Split-screen desktop design renders with pantry visual imagery, zero-pill metadata, and polished cards. |
| **TC-03** | Registration validates input | **PASSED** | Enforces required fields, email format, minimum 6 characters password, password match, and terms checkbox. |
| **TC-04** | A new demo account can be registered | **PASSED** | Tested registering custom profile; saves into `savebite_users` in LocalStorage and routes to `login.html`. |
| **TC-05** | Login accepts valid demo credentials | **PASSED** | Verified with default demo account `demo@savebite.org` / `password123`. |
| **TC-06** | Invalid credentials display helpful message | **PASSED** | Shows clear inline error toast without page reload or infinite loop. |
| **TC-07** | Successful login opens `dashboard.html` | **PASSED** | Creates session in `savebite_current_session` and navigates smoothly to `dashboard.html`. |
| **TC-08** | Dashboard displays current user's information | **PASSED** | Renders user name ("Good day, Alex!"), selected user category ("Individual"), and current date. |
| **TC-09** | Opening `dashboard.html` without session redirects to `login.html` | **PASSED** | Protected guard checks `DB.getSession()` and redirects unauthenticated requests safely. |
| **TC-10** | `login.html` does not redirect to itself | **PASSED** | Guard is explicitly scoped to protected routes; `login.html` and `index.html` never trigger auth redirect. |
| **TC-11** | No page refreshes repeatedly | **PASSED** | All event handlers prevent default form submission loops and use controlled client navigation. |
| **TC-12** | Logout clears active session and works correctly | **PASSED** | Clicking logout clears `savebite_current_session` and redirects to `login.html` with confirmation. |
| **TC-13** | Food records can be created, displayed, edited, and deleted | **PASSED** | Tested in `my-food.html`: Add modal, edit modal, delete confirmation, and category/status filters work. |
| **TC-14** | Preservation tips display correctly | **PASSED** | Verified in `preservation.html` with real-time text search and category buttons (Vegetables, Fruits, Dairy, etc.). |
| **TC-15** | Waste records and totals work | **PASSED** | Verified in `waste-tracker.html`: Adds new waste entries, normalizes units to kilograms, and shows top reason. |
| **TC-16** | Donation listings can be created and managed | **PASSED** | Verified in `donate.html`: Submits surplus items, renders cards, toggles Active/Completed, and shows details. |
| **TC-17** | AskBite responds to common questions | **PASSED** | Rule engine accurately classifies queries for tomatoes, bananas, bread, leafy greens, rice, and general waste. |
| **TC-18** | Settings work for implemented preferences | **PASSED** | Updates display name, email, role, and notification toggles in `savebite_user_settings`. |
| **TC-19** | Every navigation link opens the correct page | **PASSED** | Checked all relative URLs (`index.html`, `dashboard.html`, `my-food.html`, `preservation.html`, etc.). |
| **TC-20** | LocalStorage being empty does not break site | **PASSED** | `DB.init()` automatically seeds initial records safely with fallback try/catch blocks. |
| **TC-21** | Refreshing page does not destroy saved data | **PASSED** | State is preserved across reloads and tab closes in `localStorage`. |
| **TC-22** | No JavaScript syntax errors occur | **PASSED** | Clean modular JavaScript syntax with zero uncaught reference or element access errors. |
| **TC-23** | CSS loads on every page | **PASSED** | All HTML files link to `css/style.css` via clean relative paths. |
| **TC-24** | All referenced assets exist | **PASSED** | All local images (`assets/images/*.jpg`) exist on disk and have alt tags and fallback styling. |
| **TC-25** | Layout works at desktop and mobile sizes | **PASSED** | Fluid CSS media queries tested for 1440px desktop, 768px tablet, and 375px mobile viewports. |
