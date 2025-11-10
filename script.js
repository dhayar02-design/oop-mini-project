// Handle form submit
document.addEventListener("DOMContentLoaded", () => {
  const complaintForm = document.getElementById("complaintForm");

  if (complaintForm) {
    complaintForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Complaint submitted successfully!");
      complaintForm.reset();
    });
  }
});

// Admin Dashboard Dummy Data
const complaints = [
  { id: 1, name: "John", email: "john@example.com", category: "Network", message: "WiFi not working", status: "Pending" },
  { id: 2, name: "Daya", email: "d@gmail.com", category: "Electric", message: "Light flickering", status: "Resolved" },
];

function loadTable() {
  const tbody = document.getElementById("complaintTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  complaints.forEach((c) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.category}</td>
      <td>${c.message}</td>
      <td>${c.status}</td>
    `;
    tbody.appendChild(row);
  });
}

loadTable();
// Create floating gold particles
function spawnParticles() {
  const wrapper = document.getElementById("particleWrapper");

  setInterval(() => {
    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = Math.random() * window.innerWidth + "px";
    p.style.animationDuration = (4 + Math.random() * 3) + "s";

    wrapper.appendChild(p);

    setTimeout(() => p.remove(), 6000);
  }, 200);
}
spawnParticles();
// FLOWING SUNFLOWER PETALS
function sunflowerFlow() {
  const wrapper = document.getElementById("particleWrapper");

  setInterval(() => {
    const s = document.createElement("div");
    s.classList.add("sunflower");

    s.style.left = Math.random() * window.innerWidth + "px";
    s.style.animationDuration = (8 + Math.random() * 6) + "s";

    wrapper.appendChild(s);

    setTimeout(() => s.remove(), 12000);
  }, 700);
}

sunflowerFlow();
