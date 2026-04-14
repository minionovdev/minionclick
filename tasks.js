let tasks=[
    {id:1,text:"Накликай 100",goal:100,reward:50},
    {id:2,text:"Накликай 500",goal:500,reward:200}
];

let score=+localStorage.getItem("score")||0;
let done=JSON.parse(localStorage.getItem("tasks"))||[];

let container=document.getElementById("tasks");

tasks.forEach(t=>{
    let div=document.createElement("div");
    div.className="card";

    let completed=done.includes(t.id);

    div.innerHTML=`
    <h3>${t.text}</h3>
    <button ${completed?"disabled":""} onclick="complete(${t.id})">
    ${completed?"Готово":"Получить"}
    </button>
    `;

    container.appendChild(div);
});

function complete(id){
    let t=tasks.find(x=>x.id===id);
    if(score>=t.goal){
        score+=t.reward;
        done.push(id);
        localStorage.setItem("tasks",JSON.stringify(done));
        localStorage.setItem("score",score);
        location.reload();
    }
}
