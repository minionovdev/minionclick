document.getElementById("name").innerText =
    localStorage.getItem("playerName") || "Игрок";

document.getElementById("score").innerText =
    localStorage.getItem("score") || 0;

let container = document.getElementById("achievements");
let done = JSON.parse(localStorage.getItem("achievements")) || [];

let list = [
    "67 кликов",
    "228 кликов",
    "1 млн",
    "10 млн",
    "1 млрд"
];

list.forEach((t,i)=>{
    let div=document.createElement("div");
    div.className="card";
    div.innerText = (done.includes(i+1) ? "✅ " : "❌ ") + t;
    container.appendChild(div);
});
