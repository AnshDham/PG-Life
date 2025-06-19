document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      message.textContent = result.message;

      if (response.status === 201) {
        // Redirect to login after successful signup
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      }
    } catch (err) {
      message.textContent = "An error occurred. Please try again.";
      console.error("Signup error:", err);
    }
  });
});
