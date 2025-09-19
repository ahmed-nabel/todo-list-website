# 📌 **Project Overview**

This project is a **To-Do Task Management App** with the following
features:\

- 🔐 **Authentication**: register/login with validation\
- 📋 **Task Dashboard**: add, edit, view, delete, complete tasks\
- 📊 **Task Analytics**: circular progress charts by status\
- 🧍 **User Profile**: avatar upload\
- 🌐 **Multi-language Support**: English & Arabic\
- 💾 **Persistent Storage**: localStorage & sessionStorage\
- 🧭 **Dynamic Navigation**: history state management

---

# 🛠️ **Tech Stack**

Layer Technology

---

**HTML** Semantic HTML5
**CSS** Custom CSS, Flexbox
**JavaScript** Vanilla JS (ES6+)
**Storage** localStorage, sessionStorage
**Internationalization** Manual implementation with JS object
**UI Behavior** Modals, dropdowns, charts, sidebar nav

---

# 🌟 **Key Features**

## 1. **User Authentication**

- Register & login forms with validations:
  - Email format check (RegEx)\
  - Strong password check (RegEx)\
  - Confirm password match\
  - Prevent duplicate username/email\
- "Remember Me" with localStorage/sessionStorage\
- Redirects on success/failure

## 2. **Task Management (CRUD)**

- ➕ **Create**: add task (title, description, priority, status)\
- 👁️ **Read/View**: show details in modal\
- ✏️ **Update**: edit tasks with pre-filled form\
- ❌ **Delete**: remove tasks with confirmation\
- ✅ **Complete**: mark tasks as finished

## 3. **UI & UX Enhancements**

- Modals for add/view tasks\
- Dropdown menus for actions\
- Circular progress charts (CSS-based)\
- Profile image upload (FileReader + CSS vars)

## 4. **Language Support**

- Toggle between English & Arabic\
- Dynamic translations for text, placeholders\
- `dir="rtl"` switch for Arabic

## 5. **Routing Simulation**

- SPA-like navigation with `history.pushState()`\
- Handles back/forward with `popstate`

---

# ⚙️ **Advanced JavaScript Features**

- **Storage & Persistence**: per-user tasks in
  `localStorage/sessionStorage`\
- **Destructuring & Spread Operator**\
- **Regular Expressions**: email & password validation\
- **Form Handling**: FormData API\
- **DOM Manipulation**: `querySelectorAll`, `createElement`, event
  delegation\
- **CSS Integration**: dynamic priority/status, sidebar image with CSS
  vars\
- **Charts**: SVG circular progress\
- **Internationalization**: persistent language & direction toggle\
- **Reusable Functions**: `getUsers()`, `getTasks()`, `saveUsers()`\
- **History API**: SPA behavior

---

# 🔑 **Design Patterns Used**

- **Modularity**: utility functions\
- **Event Delegation**: task actions\
- **Single Source of Truth**: localStorage holds data\
- **Conditional Rendering**: based on `data-page`\
- **Progressive Enhancement**: works without frameworks

---

# 🔒 **Security & Validation**

- ✅ Email validation (RegEx)\
- ✅ Strong password rules\
- ✅ Prevent duplicate users\
- ✅ Terms checkbox before submit\
- ✅ Confirm before logout

---

# 🚀 **Upcoming Updates**

1.  📱 Make the design fully **responsive**\
2.  📝 Handle **error messages in Arabic** for login & register pages\
3.  🔎 Add **search bar** and **notifications** on the home page\
4.  ⏰ **Task reminders** via email or message\
5.  ⚙️ Adjust **user info and settings**\
6.  🧾 Add a **Vital Tasks Page**\
7.  📝 Use **module files** for the main script file\
8.  ⚛️ Create another version using **React, Redux, and Tailwind/SCSS**
    for a full SPA

---

# 🧾 **Summary**

This app demonstrates:\

- ✅ Modern **JavaScript (ES6+)**\
- ✅ DOM manipulation & event handling\
- ✅ SPA-like navigation\
- ✅ Persistent storage\
- ✅ Basic SVG/CSS charts\
- ✅ i18n with RTL support\
- ✅ Reusable, modular functions

👉 A strong example of a **full-featured vanilla JS application**
showing mastery of browser APIs without frameworks.
