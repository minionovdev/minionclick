let score = +localStorage.getItem("score") || 0;
let perClick = +localStorage.getItem("perClick") || 1;
let upgradeCost = +localStorage.getItem("upgradeCost") || 10;

let eventBonus = 1;

/* 👤 имя игрока */
function setName() {
    let name = document.getElementById("username").value || "Игрок";
    localStorage.setItem("playerName", name);
    document.getElementById("playerName").innerText = name;
}

function loadName() {
    let name = localStorage.getItem("playerName") || "Игрок";
    document.getElementById("playerName").innerText = name;
}

/* 💰 клик */
function clickCoin(e) {
    score += perClick * eventBonus;
    save();
    update();
}

/* 🛒 апгрейд */
function buyUpgrade() {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        perClick++;
        upgradeCost = Math.floor(upgradeCost * 1.5);
        save();
        update();
    }
}

/* 💾 сохранение + лидерборд */
function save() {
    localStorage.setItem("score", score);
    localStorage.setItem("perClick", perClick);
    localStorage.setItem("upgradeCost", upgradeCost);

    let player = localStorage.getItem("playerName") || "Игрок";

    let lb = JSON.parse(localStorage.getItem("leaderboard")) || [];

    let p = lb.find(x => x.name === player);

    if (p) {
        p.score = score;
    } else {
        lb.push({ name: player, score: score });
    }

    lb.sort((a, b) => b.score - a.score);
    lb = lb.slice(0, 10);

    localStorage.setItem("leaderboard", JSON.stringify(lb));
}

/* 🔄 обновление UI */
function update() {
    document.getElementById("score").innerText = Math.floor(score);
    document.getElementById("upgradeCost").innerText = upgradeCost;
}

/* ⏰ ИВЕНТЫ */
function generateEvent() {
    let events = [
        {text: "🔥 x2 клики!", bonus: 2},
        {text: "⚡ x3 клики!", bonus: 3},
        {text: "😴 обычный режим", bonus: 1}
    ];

    let e = events[Math.floor(Math.random() * events.length)];
    eventBonus = e.bonus;

    document.getElementById("eventText").innerText = e.text;

    localStorage.setItem("eventTime", Date.now());
    localStorage.setItem("eventBonus", eventBonus);
}

function loadEvent() {
    let last = localStorage.getItem("eventTime");
    let savedBonus = localStorage.getItem("eventBonus");

    if (!last || Date.now() - last > 3600000) {
        generateEvent();
    } else {
        eventBonus = savedBonus;
        document.getElementById("eventText").innerText = "Бонус x" + eventBonus;
    }
}

/* 🚀 запуск */
loadName();
loadEvent();
update();
