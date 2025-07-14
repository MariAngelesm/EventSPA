import { api } from "../js/api.js";

export default function setupApiUi() {
  // user subscription
  const buttons = document.querySelectorAll(".subscribe-btn");

  buttons.forEach($btn => {
    $btn.addEventListener("click", async () => {
      const eventId = Number($btn.dataset.id);
      const auth = JSON.parse(localStorage.getItem("auth_token"));

      const registration = {
        courseId,
        userEmail: auth.email,
        userName: auth.name,
        registeredAt: new Date().toISOString()
      };

      try {
        const existing = await api.get(`/registrations?courseId=${eventId}&userEmail=${auth.email}`);
        if (existing.length > 0) {
          alert("You are already subscribed to this event.");
          return;
        }

        await api.post("/registrations", registration);
        alert("You have successfully subscribed!");
      } catch (error) {
        console.error(error);
        alert("The subscription could not be registered.");
      }
    });
  });

  // CRUD ADMIN
  const $form = document.getElementById("eventForm");
  if ($form) {
    const $id = $form.querySelector("[name='id']");

    $form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData($form).entries());
      formData.capacity = Number(formData.capacity);

      try {
        if ($id.value) {
          await api.put(`/events/${$id.value}`, formData);
        } else {
          await api.post("/events", formData);
        }
        location.reload();
      } catch (error) {
        alert("Error al guardar el curso");
      }
    });

    document.querySelectorAll("[data-accion='edit']").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        try {
          const data = await api.get(`/events/${id}`);
          for (let key in data) {
            if ($form[key]) $form[key].value = data[key];
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
          console.error("The event to be edited could not be loaded.");
        }
      });
    });

    document.querySelectorAll("[data-accion='delete']").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (confirm("Do you want to delete this event?")) {
          try {
            await api.del(`/events/${id}`);
            location.reload();
          } catch (err) {
            console.error("The event could not be deleted");
          }
        }
      });
    });
  }
}
