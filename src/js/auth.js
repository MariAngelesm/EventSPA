// crypto library for password encryptation
import CryptoJS from "crypto-js";

// function to validate if user is authenticated
export function isAutenticated(){
    
    return sessionStorage.getItem("auth_token") !== null;
}

export function updateAuthButtons() {
  const $btnLogin = document.getElementById("btnLogin");
  const $btnLogout = document.getElementById("btnLogout");
  const $btnRegister = document.getElementById("btnRegister");
  const $btnProfile = document.getElementById("btnProfile");
  const $welcomeUser = document.getElementById("welcomeUser");

  // Existence validation
  if (!$btnLogin || !$btnLogout || !$welcomeUser || !$btnRegister || !$btnProfile) {
    console.warn("Missing DOM elements in updateAuthButtons");
    return;
  }

  const auth = JSON.parse(sessionStorage.getItem("auth_token"));

  if (auth) {
    // authenticated user
    $btnLogin.style.display = "none";
    $btnLogout.style.display = "inline";
    $btnRegister.style.display = "none";
    $btnProfile.style.display = "inline";
    $welcomeUser.style.display = "inline";
    $welcomeUser.textContent = `Hola, ${auth.name} 👋`;


  } else {
    // NO authenticated user
    $btnLogin.style.display = "inline";
    $btnLogout.style.display = "none";
    $btnRegister.style.display = "inline";
    $btnProfile.style.display = "none";
    $welcomeUser.style.display = "none";
    $welcomeUser.textContent = "";
  }
}

// Login function
export function login(token,email,name,role){
    sessionStorage.setItem("auth_token", JSON.stringify({token, email, name, role}))
    updateAuthButtons();
}

// Logout function
export function logout(){
    sessionStorage.removeItem("auth_token")
    updateAuthButtons();
    window.location.reload()
}

// function to validate credentials
export function validateCredentials(user,pass){
    // to validate empty spaces
    if(!user.trim() && !pass.trim()){
        alert("Please enter your username and password");
        return false
    }
    // validate if the name is empty
    if(!user.trim()){
        alert("please enter user");
        return false
    }
    // validate if the password is empty
    if(!pass.trim()){
        alert("please enter password");
        return false
    }
    // if it passes all validations
    return true
}

// Function to hash our password with SHA-256 algorithm and crypto library
export function hashPassword(password){
    const clave = "Clavesecreta123"
    // We encrypt the message using AES
    const passCifrada =  CryptoJS.AES.encrypt(password,clave).toString();
    return passCifrada;
}

// validate if the route is protected
export function validateGuardedPath(path) {
  const auth = JSON.parse(sessionStorage.getItem("auth_token"));

  switch (path) {
    case "/":
    case "/login":
    case "/register":
      return false; // public

    case "/apiUi":
    case "/profile":
      return true; // protected, any logged in user can access.

    default:
      return false;
  }
}


export async function tryLogin(user, password) {
    const clave = "Clavesecreta123";

    try {
        const res = await fetch(`http://localhost:3000/users?email=${user}`);
        const data = await res.json();

        if (!data.length) {
            alert("User no detected");
            return false;
        }

        const userData = data[0];
        const decryptedPass = CryptoJS.AES.decrypt(userData.password, clave).toString(CryptoJS.enc.Utf8);

        if (decryptedPass !== password) {
            alert("Wrong password or user, please enter the correct data");
            return false;
        }

        login("fake_token", userData.email, userData.name, userData.role);
        return true;

    } catch (error) {
        console.error("Error en tryLogin:", error);
        alert("Server error");
        return false;
    }
}

