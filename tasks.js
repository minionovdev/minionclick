let tasks = [
    {id: 1, text: "Накликай 100", goal: 100, reward: 50},
    {id: 2, text: "Накликай 500", goal: 500, reward: 200}
];

let score = +localStorage.getItem("score") || 0;
let completed = JSON.parse(localStorage.getItem("tasks")) || [];

function render() {
    let container = document.getElementById("tasks");
    container.innerHTML = "";

    tasks.forEach(t => {
        let div = document.createElement("div");
        div.className = "card";

        let done = completed.includes(t.id);

        div.innerHTML = `
            <h3>${t.text}</h3>
            <p>Нужно: ${t.goal}</p>
            <p>Награда: ${t.reward}</p>
            <button ${done ? "disabled" : ""} onclick="complete(${t.id})">
                ${done ? "Выполнено" : "Получить"}
            </button>
        `;

        container.appendChild(div);
    });
}

function complete(id) {
    let t = tasks.find(x => x.id === id);

    if (score >= t.goal) {
        score += t.reward;
        completed.push(id);

        localStorage.setItem("score", score);
        localStorage.setItem("tasks", JSON.stringify(completed));

        render();
    }
}

render();
