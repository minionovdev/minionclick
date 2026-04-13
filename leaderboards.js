function renderLeaderboard() {
    let container = document.getElementById("leaderboard");
    container.innerHTML = "";

    let lb = JSON.parse(localStorage.getItem("leaderboard")) || [];

    lb.sort((a, b) => b.score - a.score);

    lb.forEach((p, index) => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>#${index + 1} ${p.name}</h3>
            <p>💰 ${p.score}</p>
        `;

        container.appendChild(div);
    });
}

renderLeaderboard();
