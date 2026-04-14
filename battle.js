let my = 0;
let enemy = 0;
let time = 60;
let room = "room1";

function startBattle(){
    my = 0;
    time = 60;

    let interval = setInterval(()=>{
        time--;
        document.getElementById("timer").innerText = time;

        if(time <= 0){
            clearInterval(interval);
            endBattle();
        }
    },1000);
}

function battleClick(){
    my++;
    db.ref("battle/"+room+"/p1").set(my);
}

db.ref("battle/"+room+"/p2").on("value", snap=>{
    enemy = snap.val() || 0;
    document.getElementById("enemyScore").innerText = enemy;
});

function endBattle(){
    if(my > enemy) alert("ПОБЕДА");
    else alert("ПОРАЖЕНИЕ");
}
