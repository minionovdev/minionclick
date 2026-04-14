document.getElementById("name").innerText =
    localStorage.getItem("playerName") || "Игрок";

document.getElementById("score").innerText =
    localStorage.getItem("score") || 0;

function setSkin(skin){
    localStorage.setItem("coinSkin", skin);
    alert("Скин применён!");
}
