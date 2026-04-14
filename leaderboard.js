let container=document.getElementById("leaderboard");
let lb=JSON.parse(localStorage.getItem("leaderboard"))||[];

lb.sort((a,b)=>b.score-a.score);

lb.forEach((p,i)=>{
    let div=document.createElement("div");
    div.className="card";
    div.innerHTML=`#${i+1} ${p.name}<br>💰 ${p.score}`;
    container.appendChild(div);
});
