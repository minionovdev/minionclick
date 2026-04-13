let score = +localStorage.getItem("score") || 0;
let perClick = +localStorage.getItem("perClick") || 1;
let upgradeCost = +localStorage.getItem("upgradeCost") || 10;

let eventBonus = 1;

function clickCoin(e) {
    score += perClick * eventBonus;
    save();
    update();
}

function buyUpgrade() {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        perClick++;
        upgradeCost *= 1.5;
        save();
        update();
    }
}

function update() {
    document.getElementById("score").innerText = Math.floor(score);
    document.getElementById("upgradeCost").innerText = Math.floor(upgradeCost);
}

function save() {
    localStorage.setItem("score", score);
    localStorage.setItem("perClick", perClick);
    localStorage.setItem("upgradeCost", upgradeCost);
}

/* ⏰ ИВЕНТЫ */
function generateEvent() {
    let events = [
        {text: "x2 клики!", bonus: 2},
        {text: "x3 клики!", bonus: 3},
        {text: "обычный режим", bonus: 1}
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

loadEvent();
update();
