import { includeHTML } from "./include-html.js";
import { router } from "../routes/router.js";
import { logout } from "./auth.js";

// First, load dynamic components like header and footer
includeHTML(); // Triggers 'includes-loaded' event when done

// Once includes are loaded, initialize router and other listeners
document.addEventListener("includes-loaded", () => {
  // Initial route rendering
  router();

  // Handle navigation clicks within the app
  document.addEventListener("click", (e) => {
    const $btnLogout = document.getElementById("btnLogout");

    // Intercept internal SPA links
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
    }

    // Handle logout button
    if (e.target === $btnLogout) {
      console.log("Logout clicked");
      logout();
    }
  });

  // Handle browser navigation (back/forward buttons)
  window.addEventListener("popstate", router);
});