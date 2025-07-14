import { tryLogin, validateCredentials } from "../js/auth.js";
import { router } from "../routes/router.js";

export default function setupLogin() {
  const $btn = document.getElementById("loginBtn");
  if (!$btn) return;

  $btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    const isValid = validateCredentials(user, pass);
    if (!isValid) return;

    const success = await tryLogin(user, pass);
    if (success) {
      history.pushState(null, null, "/apiUi");
      router();
    }
  });
}
