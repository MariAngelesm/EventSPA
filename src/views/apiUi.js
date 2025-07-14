import { api } from "../js/api.js";

export default async function ApiUi() {
  const auth = JSON.parse(sessionStorage.getItem("auth_token"));
  if (!auth) return `<p class="text-danger">Unauthorized access.</p>`;

  const { role, name } = auth;
  const events = await api.get("/events");

  // Form for admin only
  const formHtml = role === "admin" ? `
    <form id="eventForm" class="mb-4 p-4 border rounded bg-light">
      <input type="hidden" name="id" />
      <div class="mb-3">
        <label class="form-label">Event Name</label>
        <input type="text" class="form-control" name="eventName" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Category</label>
        <input type="text" class="form-control" name="category" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea class="form-control" name="description" rows="2" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Capacity</label>
        <input type="number" class="form-control" name="capacity" required />
      </div>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  ` : '';

  const cards = events.map(event => `
    <div class="card shadow-sm border-0 rounded-4 mb-4">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h4 class="card-title fw-bold text-primary">${event.eventName}</h4>
            <p class="mb-2"><span class="badge bg-info">${event.category}</span></p>
            <p class="text-muted">${event.description}</p>
            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item">Capacity: <strong>${event.capacity} attendance</strong></li>
              <li class="list-group-item">ID: <strong>${event.id}</strong></li>
            </ul>
          </div>
          <div class="d-flex flex-column gap-2">
            ${
              role === "admin"
                ? `
                <button class="btn btn-outline-primary btn-sm rounded-pill" data-accion="edit" data-id="${event.id}">
                  ✏️
                </button>
                <button class="btn btn-outline-danger btn-sm rounded-pill" data-accion="delete" data-id="${event.id}">
                  🗑️
                </button>`
                : `
                <button class="btn btn-outline-success btn-sm rounded-pill subscribe-btn" data-id="${event.id}">
                  enroll
                </button>`
            }
          </div>
        </div>
      </div>
    </div>
  `).join("");

  return `
    <section class="container">
      <h3 class="h3 mt-4">Welcome ${name}</h3>
      ${formHtml}
      ${cards}
    </section>
  `;
}
