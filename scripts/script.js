const translations = {
  en: {
    signUp: "Sign Up",
    signIn: "Sign In",
    firstName: "Enter First Name",
    lastName: "Enter Last Name",
    username: "Enter Username",
    email: "Enter Email",
    password: "Enter Password",
    confirmPassword: "Confirm Password",
    agreeTerms: "I agree to all terms",
    alreadyHaveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    createOne: "Create One",
    register: "Register",
    login: "Login",
    rememberMe: "Remember Me",
    orLoginWith: "Or, Login with",
  },
  ar: {
    signUp: "إنشاء حساب",
    signIn: "تسجيل الدخول",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    username: "اسم المستخدم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    agreeTerms: "أوافق على جميع الشروط",
    alreadyHaveAccount: "هل لديك حساب بالفعل؟",
    noAccount: "ليس لديك حساب؟",
    createOne: "إنشاء حساب",
    register: "تسجيل",
    login: "تسجيل الدخول",
    rememberMe: "تذكرني",
    orLoginWith: "أو سجل الدخول باستخدام",
  },
};

// --- Utility Functions ---
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function truncateText(text, maxLength) {
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + "……"
    : text;
}

function escapeNewlines(text) {
  return text.replace(/\n/g, "<br>");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function isStrongPassword(password) {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  return pattern.test(password);
}

function showMessage(msg) {
  alert(msg); // You can replace with custom UI message
}
const page = document.body.dataset.page;
const form = document.querySelector(".register-form");

if (page === "login") {
  // --- Login Form Logic ---
  if (form && document.body.dataset.page === "login") {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const { username, password } = Object.fromEntries(formData);
      const rememberMe = form.querySelector('input[name="remember"]').checked;

      const users = getUsers();

      const user = users.find(
        (u) =>
          (u.username === username || u.email === username) &&
          u.password === password
      );

      if (!user) {
        showMessage("User not found or incorrect password. Please try again");
        //   setTimeout(() => {
        //     window.location.href = "register.html";
        //   }, 1500);
        return;
      }
      if (rememberMe) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      } else {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      }

      showMessage("Login successful!");
      window.location.href = "index.html";
    });
  }
} else if (page === "register") {
  // --- Register Form Logic ---

  if (form && document.body.dataset.page === "register") {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      // Validate 'terms' checkbox:
      if (!form.querySelector('input[name="terms"]').checked) {
        showMessage("You must agree to the terms.");
        return;
      }
      delete data.terms;

      const {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
      } = data;

      const users = getUsers();

      if (!isValidEmail(email)) {
        showMessage("Invalid email format.");
        return;
      }

      if (!isStrongPassword(password)) {
        showMessage(
          "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
        );
        return;
      }

      if (password !== confirmPassword) {
        showMessage("Passwords do not match.");
        return;
      }

      const exists = users.some(
        (user) => user.email === email || user.username === username
      );

      if (exists) {
        showMessage("User already exists. Please log in.");
        window.location.href = "login.html";
        return;
      }

      delete data.confirmPassword;

      users.push(data);
      saveUsers(users);

      showMessage("Registration successful. Redirecting to login...");
      window.location.href = "login.html";
    });
  }
} else if (page === "home" || page === "index" || page === "dashboard") {
  const sidebar = document.querySelector(".sidebar");
  const fileInput = document.getElementById("avatarUpload");

  // ✅ Only run sidebar logic if both elements exist
  if (sidebar && fileInput) {
    sidebar.addEventListener("click", function (e) {
      const sidebarRect = sidebar.getBoundingClientRect();
      const clickY = e.clientY - sidebarRect.top;
      if (clickY < 50) {
        fileInput.click();
      }
    });

    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        sidebar.style.setProperty("--profile-image", `url(${e.target.result})`);
        localStorage.setItem("avatarImage", e.target.result);
      };
      reader.readAsDataURL(file);
    });

    const savedImage = localStorage.getItem("avatarImage");
    if (savedImage) {
      sidebar.style.setProperty("--profile-image", `url(${savedImage})`);
    }
  }

  // Get the logged-in user
  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    // Update sidebar with user's name and email
    document.querySelectorAll(".sidebarName").forEach((e) => {
      e.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    });
    document.getElementById("sidebarEmail").textContent = loggedInUser.email;
  } else {
    // Optionally redirect to login if no user
    window.location.href = "login.html";
  }

  // logging out logic
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Confirm logout (optional)
      if (!confirm("Are you sure you want to log out?")) return;

      // Clear session/local storage
      localStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("loggedInUser");

      // Optional: clear profile image too
      localStorage.removeItem("avatarImage");

      // Redirect to login page
      window.location.href = "login.html";
    });
  }

  // switch between pages as
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  function showPage(targetId) {
    // Remove active state from all
    navLinks.forEach((l) => l.classList.remove("active"));
    pages.forEach((p) => p.classList.remove("active"));

    // Activate matching nav and section
    document
      .querySelector(`.nav-link[href="/${targetId}"]`)
      ?.classList.add("active");
    document.getElementById(targetId)?.classList.add("active");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const sectionId = link.dataset.section;
      const url = link.getAttribute("href");

      // const targetId = this.getAttribute("href").substring(1);
      showPage(sectionId);

      // Update hash in URL (no reload)
      // history.pushState(null, "", `#${targetId}`);
      history.pushState({ section: sectionId }, "", url);
    });
  });

  // Handle direct visits or browser navigation
  // window.addEventListener("load", () => {
  //   const hash = location.hash.replace("#", "") || "dashboard";
  //   showPage(hash);
  // });

  // window.addEventListener("popstate", () => {
  //   const hash = location.hash.replace("#", "") || "dashboard";
  //   showPage(hash);
  // });

  // Handle browser back/forward
  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.section) {
      showPage(e.state.section);
    } else {
      // Default: home
      showPage("dashboard");
    }
  });

  // --- Listen for back navigation ---
  window.addEventListener("popstate", (event) => {
    if (!event.state || event.state.view !== "task") {
      // Reset view back to task list
      const dashboardWrapper = document.querySelector(".dashboard-wrapper");
      dashboardWrapper.innerHTML = ""; // make sure wrapper is empty
      renderTasks();

      // Optionally fix the URL
      history.replaceState(null, "", "/index.html");
    }
  });

  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskModal = document.getElementById("taskModal");
  const closeModal = document.getElementById("closeModal");
  const taskForm = document.getElementById("taskForm");
  const taskList = document.querySelector(".task-list");
  const completedList = document.querySelector(".task-completed ul"); // Completed tasks
  const viewModal = document.getElementById("taskFullViewModal");

  // Submit button inside the form
  const submitBtn = taskForm.querySelector('button[type="submit"]');

  let isEditing = false;
  let editingIndex = null;

  // --- Utility functions for task storage ---

  function getTasks() {
    const user =
      JSON.parse(localStorage.getItem("loggedInUser")) ||
      JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!user) return [];

    const key = `tasks_${user.username}`;
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  function saveTasks(tasks) {
    const user =
      JSON.parse(localStorage.getItem("loggedInUser")) ||
      JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!user) return;

    const key = `tasks_${user.username}`;
    localStorage.setItem(key, JSON.stringify(tasks));
  }

  // --- Formatting helpers ---

  function formatStatus(status) {
    return status
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  // create helping function for toggling modal
  function toggleModal(toggle) {
    taskModal.style.display = toggle ? "flex" : "none";
  }

  // --- Show modal for adding a new task ---
  addTaskBtn.addEventListener("click", () => {
    isEditing = false;
    editingIndex = null;
    taskForm.reset();
    submitBtn.textContent = "Add Task";
    // 👇 Set heading
    document.querySelector(".modal-heading").textContent = "Add Task";

    toggleModal(true);
  });

  // --- Close modal ---
  closeModal.addEventListener("click", () => {
    toggleModal(false);
  });

  // closing modal at negative space
  taskModal.addEventListener("click", (e) => {
    if (e.target.className === "modal-overlay") toggleModal(false);
  });

  // --- Submit form (add or save task) ---
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = this.title.value.trim();
    const description = this.description.value.trim();
    const priority = this.priority.value;
    const status = this.status.value;
    const createdOn = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    if (!title) {
      alert("Title is required!");
      return;
    }

    const tasks = getTasks();

    if (isEditing && editingIndex !== null) {
      // Update existing task but keep original createdOn date
      tasks[editingIndex] = {
        ...tasks[editingIndex],
        title,
        description,
        priority,
        status,
        // Keep original date
      };
    } else {
      // Add new task
      tasks.push({
        title,
        description,
        priority,
        status,
        date: createdOn,
      });
    }

    saveTasks(tasks);
    renderTasks();

    taskForm.reset();
    taskModal.style.display = "none";
    submitBtn.textContent = "Add Task";
    isEditing = false;
    editingIndex = null;
  });

  function applyTaskStyling(prioritySpan, statusSpan, task) {
    if (!task || !prioritySpan || !statusSpan) return;

    // Normalize
    const priority = task.priority?.toLowerCase().trim();
    const status = task.status?.toLowerCase().trim();

    // Clear any existing classes (optional, useful on re-renders)
    prioritySpan.classList.remove(
      "priority-low",
      "priority-moderate",
      "priority-high"
    );
    statusSpan.classList.remove(
      "status-not-started",
      "status-in-progress",
      "status-completed"
    );

    // Apply priority class
    switch (priority) {
      case "low":
        prioritySpan.classList.add("priority-low");
        break;
      case "moderate":
        prioritySpan.classList.add("priority-moderate");
        break;
      case "high":
        prioritySpan.classList.add("priority-high");
        break;
    }

    // Apply status class
    if (status === "not-started") {
      statusSpan.classList.add("status-not-started");
    } else if (status === "in-progress" || status === "in progress") {
      statusSpan.classList.add("status-in-progress");
    } else if (status === "completed") {
      statusSpan.classList.add("status-completed");
    }
  }

  // function createCompletedElement(task) {
  //   const li = document.createElement("li");
  //   const status = task.status.toLowerCase();

  //   li.className = `task ${task.status}`;
  //   li.innerHTML = `
  //    <div class="status-bullet ${status}" title="${formatStatus(status)}"></div>
  //     <h3 class="task-title">${task.title}</h3>
  //     <p class="task-paragraph">${truncateText(task.description, 100)}</p>
  //     <time datetime="${task.date}">Completed on: ${formatDate(task.date)}</time>
  //   `;
  //   return li;
  // }

  // --- Create task list item ---
  function createTaskElement(task, index) {
    const li = document.createElement("li");
    const status = task.status.toLowerCase();
    const isCompleted = status === "completed";
    li.className = `task ${status} ${isCompleted ? "readonly" : ""}`;
    li.dataset.index = index;

    li.innerHTML = `
    <div class="title-wrapper">
      <div class="status-bullet ${status}" title="${formatStatus(
      status
    )}"></div>
      <div class="task-menu">
        <button class="menu-toggle">⋯</button>
        <div class="dropdown-menu">
  <button class="view-task">View</button>
  ${
    !isCompleted
      ? `
    <button class="edit-task">Edit</button>
    <button class="finish-task">Finish</button>
  `
      : ""
  }
  <button class="delete-task">Delete</button>
</div>

      </div>
      <h3 class="task-title">${task.title}</h3>
    </div>
    <p class="task-paragraph">${truncateText(task.description, 70)}</p>
    <div class="task-footer">
      <p>Priority: <span class="priority">${task.priority}</span></p> 
      <p>Status: <span class="status">${formatStatus(task.status)}</span></p>
      <time datetime="${task.date}">
        ${isCompleted ? "Completed on:" : "Created on:"} ${formatDate(
      task.date
    )}
      </time>
    </div>
  `;

    const prioritySpan = li.querySelector(".priority");
    const statusSpan = li.querySelector(".status");

    applyTaskStyling(prioritySpan, statusSpan, task);

    return li;
  }

  function updateStatusCharts(counts, total) {
    const statuses = ["completed", "in-progress", "not-started"];
    statuses.forEach((status) => {
      const container = document.querySelector(
        `.chart-container[data-status="${status}"]`
      );
      if (!container) return;
      const percent = total === 0 ? 0 : (counts[status] / total) * 100;
      const percentRounded = percent.toFixed(2); // or toFixed(1) if you want

      // Update text
      const pctEl = container.querySelector(".percentage");
      pctEl.textContent = `${percentRounded}%`;

      // Update circle
      const circle = container.querySelector(".progress-ring__circle");
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference;

      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;

      // Optionally change color based on status
      if (status === "completed") {
        circle.style.stroke = "#05A301";
      } else if (status === "in-progress") {
        circle.style.stroke = "#0225FF";
      } else if (status === "not-started") {
        circle.style.stroke = "#F21E1E";
      }
    });
  }

  // to allow showing percentage on task chart
  function renderTaskStatus() {
    const tasks = getTasks();
    const total = tasks.length;

    const counts = {
      completed: 0,
      "in-progress": 0,
      "not-started": 0,
    };

    tasks.forEach((task) => {
      const status = task.status.toLowerCase().trim();
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });

    updateStatusCharts(counts, total);
  }

  // --- Render all tasks ---
  function renderTasks() {
    const tasks = getTasks();

    // Get list elements
    const todoList = document.querySelector(".todo .task-list");
    const completedList = document.querySelector(".completed-list");

    // Clear both lists
    todoList.innerHTML = "";
    completedList.innerHTML = "";

    // Render all tasks based on their status
    tasks.forEach((task, index) => {
      const li = createTaskElement(task, index);
      if (task.status.toLowerCase() === "completed") {
        completedList.appendChild(li);
      } else {
        todoList.appendChild(li);
      }
    });

    renderTaskStatus();
  }

  // Attach event listeners for all task-related actions
  function attachTaskActions() {
    setupDropdownMenus(); // Handles showing/hiding the dropdown menus
    setupTaskListEvents(); // Handles clicks on view/edit/delete/finish task buttons
  }

  // Dropdown menu toggling (e.g., ⋯ button)
  function setupDropdownMenus() {
    document.addEventListener("click", (e) => {
      // Close all open dropdowns when clicking anywhere
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.remove("show");
      });

      // If the click is on a ⋯ button, toggle that dropdown
      if (e.target.classList.contains("menu-toggle")) {
        e.stopPropagation(); // Prevents the click from closing dropdown immediately
        const dropdown = e.target.nextElementSibling;
        if (dropdown && dropdown.classList.contains("dropdown-menu")) {
          dropdown.classList.toggle("show");
        }
      }
    });
  }

  // Delegated click handling for task actions (edit/view/delete/finish)
  function setupTaskListEvents() {
    document
      .querySelector(".task-list")
      .addEventListener("click", handleTaskAction);
    document
      .querySelector(".completed-list")
      .addEventListener("click", handleTaskAction);
  }

  // Master function for handling task button actions
  function handleTaskAction(e) {
    const btn = e.target;
    const taskEl = btn.closest("li.task");
    if (!taskEl) return;

    const index = Number(taskEl.dataset.index);
    const tasks = getTasks();
    const task = tasks[index];

    // Delete task
    if (btn.classList.contains("delete-task")) {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks();
    }

    // Mark task as completed
    if (btn.classList.contains("finish-task") && task.status !== "completed") {
      task.status = "completed";
      task.date = new Date().toISOString().split("T")[0];
      saveTasks(tasks);
      renderTasks();
    }

    // Open edit modal
    if (btn.classList.contains("edit-task")) {
      openEditModal(task, index);
      closeOpenDropdown(btn);
    }

    // Open view modal
    if (btn.classList.contains("view-task")) {
      openViewModal(task);
      closeOpenDropdown(btn);
    }
  }

  // Open the modal in edit mode with the task data filled in
  function openEditModal(task, index) {
    taskForm.title.value = task.title;
    taskForm.description.value = task.description;
    taskForm.priority.value = task.priority;
    taskForm.status.value = task.status;

    isEditing = true;
    editingIndex = index;
    submitBtn.textContent = "Save";
    document.querySelector(".modal-heading").textContent = "Edit Task";

    taskModal.style.display = "flex";
  }

  // Show full task in read-only modal
  function openViewModal(task) {
    // const modal = document.getElementById("taskFullViewModal");
    const modalBody = viewModal.querySelector(".modal-body");

    modalBody.innerHTML = `
    <div>
      <h3 class="task-title">${task.title}</h3>
      <p>Priority: <span class="priority">${task.priority}</span></p> 
      <p>Status: <span class="status">${formatStatus(task.status)}</span></p>
      <time datetime="${task.date}">
        ${task.status === "completed" ? "Completed on:" : "Created on:"} 
        ${formatDate(task.date)}
      </time>
    </div>
    <p class="task-paragraph">${escapeNewlines(task.description)}</p>
  `;

    toggleView(true);
    // Apply styling to priority and status badges
    const prioritySpan = modalBody.querySelector(".priority");
    const statusSpan = modalBody.querySelector(".status");
    applyTaskStyling(prioritySpan, statusSpan, task);

    // Close modal on ✕ button
    viewModal.querySelector(".close-modal").addEventListener("click", () => {
      toggleView(false);
    });
  }

  // create helping function for toggling view
  function toggleView(toggle) {
    viewModal.style.display = toggle ? "flex" : "none";
  }

  // close on negative space
  viewModal.addEventListener("click", (e) => {
    if (e.target.className === "modal-overlay") toggleView(false);
  });

  // Utility to close any dropdowns that are open
  function closeOpenDropdown(button) {
    const dropdown = button.closest(".dropdown-menu");
    if (dropdown) dropdown.classList.remove("show");
  }

  // --- Close dropdown menus when clicking outside ---
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((menu) => menu.classList.remove("show"));
  });

  // --- Initial render ---
  document.addEventListener("DOMContentLoaded", () => {
    renderTasks(); // Render existing tasks
    attachTaskActions(); // Attach all menu + button events (once)
  });
}

// logic of arabic - english toggle at login and register

const langToggleBtn = document.getElementById("langToggle");
let currentLang = localStorage.getItem("lang") || "en";

// Apply language on load
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
});

langToggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("lang", currentLang);
  applyLanguage(currentLang);
});

function applyLanguage(lang) {
  const langData = translations[lang];

  // Update button text
  langToggleBtn.textContent = lang === "en" ? "العربية" : "English";

  // Update text content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (langData[key]) el.textContent = langData[key];
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (langData[key]) el.placeholder = langData[key];
  });

  // Optional: Set direction for Arabic
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
}
