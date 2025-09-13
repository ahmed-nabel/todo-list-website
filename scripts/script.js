// --- Utility Functions ---
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
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

// --- Register Form Logic ---
const form = document.querySelector(".register-form");

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

    const { firstName, lastName, username, email, password, confirmPassword } =
      data;

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

// --- Home Page Greeting ---
// if (document.body.dataset.page === "home") {
//   const welcome = document.getElementById("welcomeMessage");
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   if (user && welcome) {
//     welcome.textContent = `Hello again, ${user.firstName} ${user.lastName}`;
//   } else {
//     window.location.href = "login.html";
//   }
// }

// --- Auto Redirect If Already Logged In ---
// if (
//   (document.body.dataset.page === "login" ||
//     document.body.dataset.page === "register") &&
//   localStorage.getItem("loggedInUser")
// ) {
//   window.location.href = "index.html";
// }
