import CryptoJS from "crypto-js";

export default function setupRegister() {
  const $btn = document.getElementById("registerBtn");
  if (!$btn) return;

  $btn.addEventListener("click", async () => {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const clave = "Clavesecreta123";

    if (!email || !password) {
      return alert("Please complete all fields.");
    }

    // Encrypt the password
    const passwordEncrypted = CryptoJS.AES.encrypt(password, clave).toString();

    try {
      // Check if the email already exists
      const res = await fetch(`http://localhost:3000/users?email=${email}`);
      const data = await res.json();
      if (data.length) return alert("This user is already registered.");

      // Register the new user
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: passwordEncrypted,
          name, 
          role: "user", 
        }),
      });

      alert("Registration successful. You may now log in.");
      history.pushState(null, null, "/login");
      window.dispatchEvent(new Event("popstate"));
    } catch (err) {
      console.error(err);
      alert("Error registering user.");
    }
  });
}
