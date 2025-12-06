document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiry-form");
  const container = document.querySelector(".enquiry-form-container");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      details: document.getElementById("project-details").value.trim()
    };

    const res = await fetch("/.submitEnquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (result.success) {
      container.innerHTML = `
        <div style="text-align:center">
          <h2>Thank you, ${data.name}!</h2>
          <p>Your enquiry has been submitted.</p>
        </div>
      `;
    } else {
      alert("Something went wrong.");
    }
  });
});
