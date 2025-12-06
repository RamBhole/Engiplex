document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("application-form");
  const container = document.querySelector(".application-form-container");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const file = document.getElementById("resume").files[0];
    if (!file) return alert("Please upload resume.");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const body = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        whatsapp: document.getElementById("whatsapp").value.trim(),
        position: document.getElementById("position").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value.trim(),
        resumeData: reader.result
      };

      const res = await fetch("/.submitApplication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const result = await res.json();
      if (result.success) {
        container.innerHTML = `
          <div style="text-align:center">
            <h2>Application submitted!</h2>
            <p>Thank you, ${body.name}.</p>
          </div>
        `;
      } else {
        alert("Error submitting application.");
      }
    };
  });
});
