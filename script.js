let score = 0;
let perClick = 1;
let upgradeCost = 10;

let auto = 0;
let autoCost = 50;

let player = "Игрок";

function saveProfile() {
    player = document.getElementById("username").value || "Игрок";
    localStorage.setItem("playerName", player);
    document.getElementById("nameDisplay").innerText = player;
}

function clickCoin(e) {
    score += perClick;
    spawnFloat(e);
    animateClick();
    saveGame();
    updateUI();
}

function spawnFloat(e) {
    let el = document.createElement("div");
    el.className = "float";
    el.innerText = "+" + perClick;

    el.style.left = e.clientX + "px";
    el.style.top = e.clientY + "px";

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 1000);
}

function animateClick() {
    let btn = document.getElementById("clickBtn");
    btn.style.boxShadow = "0 0 30px gold";
    setTimeout(() => btn.style.boxShadow = "none", 100);
}

function buyUpgrade() {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        perClick++;
        upgradeCost = Math.floor(upgradeCost * 1.4);
        saveGame();
        updateUI();
    }
}

function buyAuto() {
    if (score >= autoCost) {
        score -= autoCost;
        auto++;
        autoCost = Math.floor(autoCost * 1.7);
        saveGame();
        updateUI();
    }
}

setInterval(() => {
    score += auto;
    updateUI();
    saveGame();
}, 1000);

function setSkin(color) {
    document.body.className = color;
    localStorage.setItem("skin", color);
}

function updateUI() {
    document.getElementById("score").innerText = score;
    document.getElementById("upgradeCost").innerText = upgradeCost;
    document.getElementById("autoCost").innerText = autoCost;
    updateLeaderboard();
}

function saveGame() {
    localStorage.setItem("score", score);
    localStorage.setItem("perClick", perClick);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("auto", auto);
    localStorage.setItem("autoCost", autoCost);

    let lb = JSON.parse(localStorage.getItem("leaderboard")) || [];

    let p = lb.find(x => x.name === player);
    if (p) p.score = score;
    else lb.push({name: player, score: score});

    lb.sort((a,b)=>b.score-a.score);
    lb = lb.slice(0,10);

    localStorage.setItem("leaderboard", JSON.stringify(lb));
}

function updateLeaderboard() {
    let list = document.getElementById("leaderboard");
    list.innerHTML = "";

    let lb = JSON.parse(localStorage.getItem("leaderboard")) || [];

    lb.forEach(p => {
        let li = document.createElement("li");
        li.innerText = p.name + " — " + p.score;
        list.appendChild(li);
    });
}

function loadGame() {
    player = localStorage.getItem("playerName") || "Игрок";
    score = +localStorage.getItem("score") || 0;
    perClick = +localStorage.getItem("perClick") || 1;
    upgradeCost = +localStorage.getItem("upgradeCost") || 10;
    auto = +localStorage.getItem("auto") || 0;
    autoCost = +localStorage.getItem("autoCost") || 50;

    document.getElementById("nameDisplay").innerText = player;
}

function loadSkin() {
    let skin = localStorage.getItem("skin");
    if (skin) document.body.className = skin;
}

loadGame();
loadSkin();
updateUI();
