document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      message.textContent = result.message;

      if (response.status === 200) {
        // Redirect to dashboard or home page
        setTimeout(() => {
          window.location.href = "dashboard.html"; // Change this as per your project
        }, 1500);
      }
    } catch (err) {
      message.textContent = "An error occurred. Please try again.";
      console.error("Login error:", err);
    }
  });
});
