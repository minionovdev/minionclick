let score = +localStorage.getItem("score") || 0;
let perClick = +localStorage.getItem("perClick") || 1;
let upgradeCost = +localStorage.getItem("upgradeCost") || 10;
let clicks = +localStorage.getItem("clicks") || 0;
let eventBonus = 1;

/* 🔊 звук */
function playClickSound(){
    let sound = document.getElementById("clickSound");
    if(sound){
        sound.currentTime = 0;
        sound.play().catch(()=>{});
    }
}

/* 👤 имя */
function setName(){
    let input = document.getElementById("username");
    let name = input ? input.value : "Игрок";

    localStorage.setItem("playerName", name);

    let el = document.getElementById("playerName");
    if(el) el.innerText = name;
}

function loadName(){
    let el = document.getElementById("playerName");
    if(el){
        el.innerText = localStorage.getItem("playerName") || "Игрок";
    }
}

/* 🪙 клик */
function clickCoin(e){
    score += perClick * eventBonus;
    clicks++;

    playClickSound();
    spawnFloat(e);
    animateCoin();

    save();
    update();
    checkAchievements();
}

/* 💥 анимация */
function animateCoin(){
    let coin = document.getElementById("coin");
    if(coin){
        coin.style.transform = "scale(0.9)";
        setTimeout(()=> coin.style.transform = "scale(1)", 100);
    }
}

/* ✨ текст + */
function spawnFloat(e){
    let el = document.createElement("div");
    el.className = "float";
    el.innerText = "+" + (perClick * eventBonus);

    el.style.left = (e?.clientX || window.innerWidth/2) + "px";
    el.style.top = (e?.clientY || window.innerHeight/2) + "px";

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

/* 🛍️ магазин */
function buySkin(skin, price){
    if(score >= price){
        score -= price;
        localStorage.setItem("coinSkin", skin);

        save();
        loadSkin();

        alert("Скин куплен!");
    } else {
        alert("Недостаточно монет!");
    }
}

/* 🎨 скин */
function loadSkin(){
    let skin = localStorage.getItem("coinSkin") || "gold";
    let coin = document.getElementById("coin");

    if(coin){
        coin.className = "coin " + skin;
    }
}

/* 🏆 достижения */
let achievements = [
    {id:1, text:"67 кликов", need:67, type:"clicks"},
    {id:2, text:"228 кликов", need:228, type:"clicks"},
    {id:3, text:"1 млн", need:1000000, type:"score"},
];

function checkAchievements(){
    let done = JSON.parse(localStorage.getItem("achievements")) || [];

    achievements.forEach(a=>{
        if(done.includes(a.id)) return;

        if(
            (a.type=="clicks" && clicks>=a.need) ||
            (a.type=="score" && score>=a.need)
        ){
            done.push(a.id);
            alert("🏆 " + a.text);
        }
    });

    localStorage.setItem("achievements", JSON.stringify(done));
}

/* 💾 сохранение */
function save(){
    localStorage.setItem("score", score);
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("perClick", perClick);
    localStorage.setItem("upgradeCost", upgradeCost);
}

/* 🔄 ОБНОВЛЕНИЕ (ВАЖНО!) */
function update(){
    let scoreEl = document.getElementById("score");
    let costEl = document.getElementById("upgradeCost");

    if(scoreEl){
        scoreEl.textContent = score; // 🔥 фикс
    }

    if(costEl){
        costEl.textContent = upgradeCost;
    }
}

/* ⏰ ивенты */
function loadEvent(){
    let last = localStorage.getItem("eventTime");

    if(!last || Date.now() - last > 3600000){
        let events = [
            {text:"🔥 x2", bonus:2},
            {text:"⚡ x3", bonus:3},
            {text:"😴 x1", bonus:1}
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
        if(el) el.innerText = "x" + eventBonus;
    }
}

/* 🚀 запуск после загрузки страницы */
window.onload = function(){
    loadName();
    loadEvent();
    loadSkin();
    update(); // 🔥 ключевой фикс
};
