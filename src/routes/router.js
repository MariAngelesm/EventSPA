// import of views
import Profile from "../views/profile.js";
import NotFound from "../views/notFound.js";
import Home from "../views/home.js";
import Login from "../views/login.js";
import { isAutenticated, updateAuthButtons, validateGuardedPath } from "../js/auth.js";
import setupLogin from "../views/loginScript.js";
import Register from "../views/register.js";
import setupRegister from "../views/registerScript.js";
import { includeHTML } from "../js/include-html.js";
import ApiUi from "../views/apiUi.js";
import setupApiUi from "../views/apiUiscript.js";




// definition of routes available in the application
const routes = {
  "/": {view: Home, guarded: validateGuardedPath("/")},
  "/apiUi": { view: ApiUi, script: setupApiUi, guarded: validateGuardedPath("/apiUi") },
  "/profile": {view: Profile, guarded: validateGuardedPath("/profile")},
  "/login": {view: Login, guarded: validateGuardedPath("/login"), script: setupLogin},
  "/register": {view: Register, guarded: validateGuardedPath("/register"), script: setupRegister},
};

export async function router() {
  const path = window.location.pathname;
  const route = routes[path] || { view: NotFound, guarded: false };
  updateAuthButtons();

  if (route.guarded && !isAutenticated()) {
    history.pushState(null, null, "/login");
    return router();
  }

  // Wait for the view to be ready (if it's an async function)
  const html = await route.view();
  console.log ("HOLAAA",path)
  document.getElementById("app").innerHTML = html;

  // Wait for the includes to load, then run the script
  await includeHTML();

  if (route.script) route.script();
}