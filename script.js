let score = +localStorage.getItem("score") || 0;
let perClick = +localStorage.getItem("perClick") || 1;
let upgradeCost = +localStorage.getItem("upgradeCost") || 10;
let clicks = +localStorage.getItem("clicks") || 0;

/* клик */
function clickCoin(e){
    score += perClick;
    clicks++;

    spawnFloat(e);
    save();
    update();
    checkAchievements();
}

/* достижения */
let achievements = [
    {id:1, text:"67 кликов", need:67, type:"clicks"},
    {id:2, text:"228 кликов", need:228, type:"clicks"},
    {id:3, text:"1 млн монет", need:1000000, type:"score"},
    {id:4, text:"10 млн монет", need:10000000, type:"score"},
    {id:5, text:"1 млрд монет", need:1000000000, type:"score"},
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
            alert("🏆 Достижение: " + a.text);
        }
    });

    localStorage.setItem("achievements", JSON.stringify(done));
}

/* магазин */
function buySkin(skin, price){
    if(score >= price){
        score -= price;
        localStorage.setItem("coinSkin", skin);
        save();
        alert("Куплено!");
    }
}

/* сохранение */
function save(){
    localStorage.setItem("score", score);
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("perClick", perClick);
    localStorage.setItem("upgradeCost", upgradeCost);
}

/* UI */
function update(){
    let el = document.getElementById("score");
    if(el) el.innerText = score;
}

/* анимация */
function spawnFloat(e){
    let el=document.createElement("div");
    el.className="float";
    el.innerText="+1";

    el.style.left=e.clientX+"px";
    el.style.top=e.clientY+"px";

    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1000);
}

update();
