export default function Register() {
  return `
    <div class="container mt-5">
      <h2>Create an Acoount</h2>
      <input type="text" id="regName" class="form-control mb-2" placeholder="Full Name" />
      <input type="text" id="regEmail" class="form-control mb-2" placeholder="Email" />
      <input type="password" id="regPassword" class="form-control mb-2" placeholder="Password" />
      <button id="registerBtn" class="btn btn-success">Register</button>
    </div>
  `;
}