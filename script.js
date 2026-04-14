let score = +localStorage.getItem("score") || 0;
let perClick = +localStorage.getItem("perClick") || 1;
let upgradeCost = +localStorage.getItem("upgradeCost") || 10;
let eventBonus = 1;

/* 👤 имя */
function setName(){
    let name = document.getElementById("username").value || "Игрок";
    localStorage.setItem("playerName", name);
    document.getElementById("playerName").innerText = name;
}

function loadName(){
    document.getElementById("playerName").innerText =
        localStorage.getItem("playerName") || "Игрок";
}

/* 🪙 клик */
function clickCoin(e){
    score += perClick * eventBonus;
    spawnFloat(e);
    animateCoin();
    save();
    update();
}

/* 💥 анимация */
function animateCoin(){
    let coin = document.getElementById("coin");
    coin.style.transform = "scale(0.9)";
    setTimeout(()=> coin.style.transform = "scale(1)", 100);
}

/* ✨ частицы */
function spawnFloat(e){
    let el = document.createElement("div");
    el.className = "float";
    el.innerText = "+" + (perClick * eventBonus);

    el.style.left = e.clientX + "px";
    el.style.top = e.clientY + "px";

    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1000);
}

/* 🛒 апгрейд */
function buyUpgrade(){
    if(score >= upgradeCost){
        score -= upgradeCost;
        perClick++;
        upgradeCost = Math.floor(upgradeCost * 1.5);
        save();
        update();
    }
}

/* 🛍️ МАГАЗИН СКИНОВ */
function buySkin(skin, price){
    if(score >= price){
        score -= price;

        let owned = JSON.parse(localStorage.getItem("skins")) || [];
        if(!owned.includes(skin)){
            owned.push(skin);
            localStorage.setItem("skins", JSON.stringify(owned));
        }

        localStorage.setItem("coinSkin", skin);
        save();
        loadSkin();

        alert("Скин куплен и применён!");
    } else {
        alert("Недостаточно очков!");
    }
}

/* 🎨 загрузка скина */
function loadSkin(){
    let skin = localStorage.getItem("coinSkin") || "gold";
    let coin = document.getElementById("coin");

    if(coin){
        coin.className = "coin " + skin;
    }
}

/* 💾 сохранение + лидерборд */
function save(){
    localStorage.setItem("score", score);
    localStorage.setItem("perClick", perClick);
    localStorage.setItem("upgradeCost", upgradeCost);

    let name = localStorage.getItem("playerName") || "Игрок";
    let lb = JSON.parse(localStorage.getItem("leaderboard")) || [];

    let p = lb.find(x => x.name === name);

    if(p) p.score = score;
    else lb.push({name, score});

    lb.sort((a,b)=>b.score-a.score);
    lb = lb.slice(0,10);

    localStorage.setItem("leaderboard", JSON.stringify(lb));

    saveOnline(); // 🌍 онлайн
}

/* 🌍 онлайн лидерборд */
function saveOnline(){
    if(typeof db !== "undefined"){
        let name = localStorage.getItem("playerName") || "Игрок";

        db.ref("leaderboard/" + name).set({
            score: score
        });
    }
}

/* 🔄 обновление UI */
function update(){
    let scoreEl = document.getElementById("score");
    let costEl = document.getElementById("upgradeCost");

    if(scoreEl) scoreEl.innerText = score;
    if(costEl) costEl.innerText = upgradeCost;
}

/* ⏰ ивенты */
function loadEvent(){
    let last = localStorage.getItem("eventTime");

    if(!last || Date.now() - last > 3600000){
        let events = [
            {text:"🔥 x2 клики!", bonus:2},
            {text:"⚡ x3 клики!", bonus:3},
            {text:"😴 обычный режим", bonus:1}
        ];

        let e = events[Math.floor(Math.random()*events.length)];
        eventBonus = e.bonus;

        localStorage.setItem("eventTime", Date.now());
        localStorage.setItem("eventBonus", eventBonus);

        let el = document.getElementById("eventText");
        if(el) el.innerText = e.text;
    } else {
        eventBonus = localStorage.getItem("eventBonus");

        let el = document.getElementById("eventText");
        if(el) el.innerText = "Бонус x" + eventBonus;
    }
}

/* 🚀 запуск */
loadName();
loadEvent();
loadSkin();
update();
