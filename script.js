let score = +localStorage.getItem("score") || 0;
let perClick = +localStorage.getItem("perClick") || 1;
let upgradeCost = +localStorage.getItem("upgradeCost") || 10;
let eventBonus = 1;

/* имя */
function setName(){
    let name = document.getElementById("username").value || "Игрок";
    localStorage.setItem("playerName", name);
    document.getElementById("playerName").innerText = name;
}

function loadName(){
    document.getElementById("playerName").innerText =
        localStorage.getItem("playerName") || "Игрок";
}

/* клик */
function clickCoin(e){
    score += perClick * eventBonus;
    spawnFloat(e);
    animateCoin();
    save();
    update();
}

/* анимация */
function animateCoin(){
    let coin = document.getElementById("coin");
    coin.style.transform="scale(0.9)";
    setTimeout(()=>coin.style.transform="scale(1)",100);
}

/* частицы */
function spawnFloat(e){
    let el=document.createElement("div");
    el.className="float";
    el.innerText="+"+(perClick*eventBonus);

    el.style.left=e.clientX+"px";
    el.style.top=e.clientY+"px";

    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1000);
}

/* апгрейд */
function buyUpgrade(){
    if(score>=upgradeCost){
        score-=upgradeCost;
        perClick++;
        upgradeCost=Math.floor(upgradeCost*1.5);
        save();
        update();
    }
}

/* сохранение */
function save(){
    localStorage.setItem("score",score);
    localStorage.setItem("perClick",perClick);
    localStorage.setItem("upgradeCost",upgradeCost);

    let name=localStorage.getItem("playerName")||"Игрок";
    let lb=JSON.parse(localStorage.getItem("leaderboard"))||[];

    let p=lb.find(x=>x.name===name);
    if(p) p.score=score;
    else lb.push({name,score});

    lb.sort((a,b)=>b.score-a.score);
    lb=lb.slice(0,10);

    localStorage.setItem("leaderboard",JSON.stringify(lb));
}

/* обновление */
function update(){
    document.getElementById("score").innerText=score;
    document.getElementById("upgradeCost").innerText=upgradeCost;
}

/* ивенты */
function loadEvent(){
    let last=localStorage.getItem("eventTime");

    if(!last||Date.now()-last>3600000){
        let e=[
            {text:"🔥 x2",bonus:2},
            {text:"⚡ x3",bonus:3},
            {text:"😴 x1",bonus:1}
        ][Math.floor(Math.random()*3)];

        eventBonus=e.bonus;
        localStorage.setItem("eventTime",Date.now());
        localStorage.setItem("eventBonus",eventBonus);
        document.getElementById("eventText").innerText=e.text;
    } else {
        eventBonus=localStorage.getItem("eventBonus");
        document.getElementById("eventText").innerText="x"+eventBonus;
    }
}

/* скин */
function loadSkin(){
    let skin=localStorage.getItem("coinSkin")||"gold";
    document.getElementById("coin").className="coin "+skin;
}

/* запуск */
loadName();
loadEvent();
loadSkin();
update();
