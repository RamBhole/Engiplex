document.addEventListener("DOMContentLoaded", () => {
  const loginOverlay = document.getElementById("login-overlay");
  const loginBtn = document.getElementById("login-button");

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/.adminLogin", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();

    if (result.success) {
      localStorage.setItem("admin", "true");
      loginOverlay.classList.add("hidden");
      alert("Logged in!");
    } else {
      alert("Invalid credentials.");
    }
  });
});
