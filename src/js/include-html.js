/**
Dynamically loads HTML components into elements with the 'data-include' attribute.
for reusable components: header and footer.*/

export async function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");
  
    for (const el of elements) {
      const file = el.getAttribute("data-include");
  
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failedtoload ${file}`);
        const html = await res.text();
        el.innerHTML = html;
      } catch (err) {
        el.innerHTML = `<p>Error loading ${file}</p>`;
        console.error(err);
      }
    }
  }