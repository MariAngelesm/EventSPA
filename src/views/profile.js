import { api } from "../js/api.js";

export default async function Profile() {
  const auth = JSON.parse(sessionStorage.getItem("auth_token"));
  if (!auth) {
    return `<p class="text-danger">You must be logged in to view your profile.</p>`;
  }

  // Bring user registration records
  const registrations = await api.get(`/registrations?userEmail=${auth.email}`);
  
  // Bring all events (to relate them by ID)
  const events = await api.get(`/events`);

  // Filter events by those in the user's registrations
  const enrolledEvents = registrations.map(reg => {
    const course = events.find(c => c.id === reg.courseId);
    return course
      ? `<li class="list-group-item">
          <strong>${course.eventName}</strong> - ${course.capacity}
          <br><small class="text-muted">Enrollment date: ${new Date(reg.registeredAt).toLocaleDateString()}</small>
        </li>`
      : '';
  }).join("");

  return `
    <section class="container mt-5">
      <h2 class="mb-4">👤 User Profile</h2>
      <ul class="list-group mb-3">
        <li class="list-group-item"><strong>Name:</strong> ${auth.name}</li>
        <li class="list-group-item"><strong>Email:</strong> ${auth.email}</li>
        <li class="list-group-item"><strong>Role:</strong> ${auth.role}</li>
      </ul>

      <h4 class="mt-4">Enrollments</h4>
      <ul class="list-group">
        ${enrolledEvents || '<li class="list-group-item text-muted">You are not registered in any events yet</li>'}
      </ul>
    </section>
  `;
}
