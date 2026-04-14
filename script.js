/* ===== ОСНОВА ===== */
body {
    margin:0;
    font-family: 'Segoe UI', Arial;
    background: radial-gradient(circle at top,#0f2027,#203a43,#2c5364);
    color:white;
    text-align:center;
    overflow-x:hidden;
}

/* ===== НАВИГАЦИЯ ===== */
.nav {
    display:flex;
    justify-content:center;
    gap:20px;
    padding:12px;
    background:rgba(0,0,0,0.4);
    backdrop-filter: blur(10px);
}

.nav a {
    font-size:22px;
    text-decoration:none;
    color:white;
    transition:0.2s;
}

.nav a:hover {
    transform:scale(1.2);
}

/* ===== ЗАГОЛОВОК ===== */
.logo {
    margin:10px 0;
    letter-spacing:2px;
    text-shadow:0 0 15px gold;
}

/* ===== КАРТОЧКИ ===== */
.card {
    background:rgba(255,255,255,0.08);
    margin:15px auto;
    padding:15px;
    border-radius:20px;
    width:90%;
    max-width:340px;
    backdrop-filter: blur(15px);
    box-shadow:0 0 20px rgba(0,0,0,0.5);
    word-wrap: break-word;
}

/* ===== ИГРА ===== */
.game {
    margin-top:10px;
}

/* ===== МОНЕТА ===== */
.coin {
    width:130px;
    height:130px;
    margin:20px auto;
    border-radius:50%;
    position:relative;
    cursor:pointer;
    transition:0.1s;
    box-shadow:0 0 40px gold;
}

/* свечение */
.shine {
    position:absolute;
    width:100%;
    height:100%;
    border-radius:50%;
    background:linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent);
    animation:shine 2s infinite;
}

@keyframes shine {
    from {transform:translateX(-100%);}
    to {transform:translateX(100%);}
}

.coin:active {
    transform:scale(0.9);
    box-shadow:0 0 60px yellow;
}

/* ===== СКИНЫ ===== */
.coin.gold { background: radial-gradient(circle, gold, orange); }
.coin.blue { background: radial-gradient(circle, #00c6ff, #0072ff); }
.coin.red { background: radial-gradient(circle, #ff4b2b, #ff0000); }

.coin.rainbow {
    background: linear-gradient(45deg, red, orange, yellow, green, blue);
    animation:rainbow 3s infinite linear;
}

@keyframes rainbow {
    0%{filter:hue-rotate(0deg);}
    100%{filter:hue-rotate(360deg);}
}

/* ===== СЧЁТ ===== */
.score {
    font-size:32px;
    font-weight:bold;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:8px;
    flex-wrap:wrap;
}

/* ===== КНОПКИ ===== */
.btn {
    width:100%;
    padding:12px;
    border:none;
    border-radius:12px;
    background:linear-gradient(45deg,gold,orange);
    font-size:16px;
    cursor:pointer;
    transition:0.2s;
}

.btn:hover {
    transform:scale(1.05);
}

/* ===== МОНЕТКИ (ИКОНКИ) ===== */
.coinIcon {
    width:28px;
    vertical-align:middle;
}

.coinIconSmall {
    width:16px;
    vertical-align:middle;
}

/* ===== МАГАЗИН ===== */
.shopItem {
    background:rgba(255,255,255,0.1);
    margin:10px 0;
    padding:12px;
    border-radius:12px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    cursor:pointer;
    transition:0.2s;
}

.shopItem:hover {
    background:rgba(255,255,255,0.2);
    transform:scale(1.02);
}

/* ===== ДОСТИЖЕНИЯ ===== */
.card h3 {
    margin-bottom:10px;
}

/* ===== ЧАСТИЦЫ ===== */
.float {
    position:absolute;
    color:gold;
    font-weight:bold;
    pointer-events:none;
    animation:float 1s forwards;
}

@keyframes float {
    to {
        opacity:0;
        transform:translateY(-80px);
    }
}

/* ===== ТЕКСТ (чтобы не ломался) ===== */
p, span, h1, h2, h3 {
    word-break: break-word;
}

/* ===== АДАПТАЦИЯ (МОБИЛКА) ===== */
@media (max-width:600px){

    .coin {
        width:100px;
        height:100px;
    }

    .score {
        font-size:24px;
    }

    .nav a {
        font-size:18px;
    }

    .btn {
        font-size:14px;
    }
}
