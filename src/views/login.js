// login
export default function Login() {
    return `
      <div class="container mt-5">
        <h2>Login</h2>
        <input type="email" id="email" class="form-control mb-2" placeholder="Email" />
        <input type="password" id="password" class="form-control mb-2" placeholder="Password" />
        <button id="loginBtn" class="btn btn-primary">Log In</button>
      </div>
    `;
  }