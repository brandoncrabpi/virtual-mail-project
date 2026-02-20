// Data (hubs, letters, etc.)
let letters = [];
let hubs = [
  {id: "cpt", name: "Cape Town", connections: ["jnb"]},
  {id: "jnb", name: "Johannesburg", connections: ["cpt", "dur", "pta"]},
  {id: "dur", name: "Durban", connections: ["jnb"]},
  {id: "pta", name: "Pretoria", connections: ["jnb"]}
];

// Login (Step 1 starter)
function login() {
  const name = document.getElementById("username").value.trim();
  if (name) {
    localStorage.setItem("username", name);
    document.getElementById("login-section").style.display = "none";
    document.getElementById("main-section").style.display = "block";
    document.getElementById("welcome").textContent = `Welcome, ${name}!`;
    console.log("Logged in:", name);
  } else {
    alert("Enter a name!");
  }
}

// Auto-login if saved
window.onload = function() {
  const saved = localStorage.getItem("username");
  if (saved) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("main-section").style.display = "block";
    document.getElementById("welcome").textContent = `Welcome back, ${saved}!`;
  }
};

console.log("Project loaded! Open F12 Console to see hubs:", hubs);