let player = {
    name: "Developer",
    xp: 0,
    level: 1,
    correct: 0,
    total: 0,
    streak: 0,
    title: "Beginner"
};

let achievements = [];

let stats = {
    quizzes: 0,
    correct: 0,
    streak: 0
};

const quizData = [
{
question: "When was the first high-level programming language (Fortran) released?",
options: ["1945", "1957", "1969", "1981"],
answer: "1957"
},
{
question: "Who created the C programming language?",
options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Guido van Rossum"],
answer: "Dennis Ritchie"
},
{
question: "What year was JavaScript created?",
options: ["1995", "1991", "2000", "1989"],
answer: "1995"
},
{
question: "What does CPU stand for?",
options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing Unit"],
answer: "Central Processing Unit"
},
{
question: "Which language was first created?",
options: ["Assembly", "Python", "C", "Java"],
answer: "Assembly"
},
{
question: "What does HTML stand for?",
options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Tool Markup Language", "None"],
answer: "HyperText Markup Language"
},
{
question: "Which tag is used for a paragraph?",
options: ["<p>", "<para>", "<text>", "<h>"],
answer: "<p>"
},
{
question: "Which tag creates a link?",
options: ["<a>", "<link>", "<href>", "<url>"],
answer: "<a>"
},
{
question: "Which tag is used for images?",
options: ["<img>", "<image>", "<pic>", "<src>"],
answer: "<img>"
},
{
question: "HTML files usually end with?",
options: [".html", ".ht", ".web", ".doc"],
answer: ".html"
},
{
question: "What does CSS stand for?",
options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Color Style Sheet"],
answer: "Cascading Style Sheets"
},
{
question: "Which property changes text color?",
options: ["color", "font-color", "text-style", "text-color"],
answer: "color"
},
{
question: "Which CSS property changes background color?",
options: ["background-color", "bgcolor", "color-background", "background-style"],
answer: "background-color"
},
{
question: "Which unit is relative in CSS?",
options: ["px", "em", "cm", "mm"],
answer: "em"
},
{
question: "Which keyword declares a variable in JS?",
options: ["let", "define", "varx", "int"],
answer: "let"
},
{
question: "Which symbol is used for comments in JS?",
options: ["//", "<!-- -->", "#", "**"],
answer: "//"
},
{
question: "What does DOM stand for?",
options: ["Document Object Model", "Data Object Model", "Digital Output Map", "None"],
answer: "Document Object Model"
},
{
question: "Which function prints to console?",
options: ["console.log()", "print()", "echo()", "write()"],
answer: "console.log()"
},
{
question: "Which is a correct array?",
options: ["[1,2,3]", "(1,2,3)", "{1,2,3}", "<1,2,3>"],
answer: "[1,2,3]"
},
{
question: "Who created Python?",
options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Linus Torvalds"],
answer: "Guido van Rossum"
},
{
question: "Which symbol is used for comments in Python?",
options: ["#", "//", "<!--", "**"],
answer: "#"
},
{
question: "What is used to define a function in Python?",
options: ["def", "function", "fun", "define"],
answer: "def"
},
{
question: "Which data type is immutable?",
options: ["tuple", "list", "dict", "set"],
answer: "tuple"
},
{
question: "Who created Java?",
options: ["James Gosling", "Dennis Ritchie", "Guido van Rossum", "Bjarne Stroustrup"],
answer: "James Gosling"
},
{
question: "Java is platform?",
options: ["Independent", "Dependent", "Hardware based", "None"],
answer: "Independent"
},
{
question: "Which keyword defines a class in Java?",
options: ["class", "Class", "define", "struct"],
answer: "class"
},
{
question: "C is a _ level language?",
options: ["Middle", "High", "Low", "Very High"],
answer: "Middle"
},
{
question: "Which symbol ends a statement in C?",
options: [";", ":", ".", ","],
answer: ";"
},
{
question: "C++ supports?",
options: ["OOP", "Only procedural", "Only scripting", "None"],
answer: "OOP"
},
{
question: "Binary system uses?",
options: ["0 and 1", "0 to 9", "A to Z", "1 to 10"],
answer: "0 and 1"
},
{
question: "Which memory is fastest?",
options: ["Cache", "RAM", "HDD", "SSD"],
answer: "Cache"
},
{
question: "HTTP stands for?",
options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "Hyper Tool Transfer Process", "None"],
answer: "HyperText Transfer Protocol"
}
];

while (quizData.length < 100) {
quizData.push({
question: "Programming knowledge question #" + quizData.length,
options: ["Option A", "Option B", "Option C", "Option D"],
answer: "Option A"
});
}


let quizPool = [];
let currentQuestion = 0;

const challenges = [
"Reverse a string in JavaScript",
"Build a calculator",
"Create a login form",
"Write a prime checker",
"Build a to-do app",
"Create a navbar",
"Make a quiz app"
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* ---------------- STORAGE ---------------- */

function loadData() {
    const saved = localStorage.getItem("codequest");

    if (saved) {
        const data = JSON.parse(saved);

        player = data.player || player;
        achievements = data.achievements || [];

        stats = {
            quizzes: data.stats?.quizzes || 0,
            correct: data.stats?.correct || 0,
            streak: data.stats?.streak || 0
        };
    }
}

function saveData() {
    localStorage.setItem("codequest", JSON.stringify({
        player,
        achievements,
        stats
    }));
}

/* ---------------- PROFILE ---------------- */

function saveProfile() {
    const name = document.getElementById("nameInput").value;

    if (name && name.trim()) {
        player.name = name.trim();
    }

    updateUI();
    saveData();
    showToast("Profile saved");
}

/* ---------------- PLAYER SYSTEM ---------------- */

function updateTitle() {
    if (player.level < 5) player.title = "Beginner";
    else if (player.level < 10) player.title = "Apprentice";
    else if (player.level < 20) player.title = "Developer";
    else player.title = "Master";
}

function addXP(amount) {
    player.xp += amount;

    while (player.xp >= player.level * 1000) {
        player.xp -= player.level * 1000;
        player.level++;
        showToast("Level Up! Now Level " + player.level);
    }

    updateTitle();
    saveData();
    updateUI();
}

/* ---------------- ACHIEVEMENTS ---------------- */

function addAchievement() {
    const input = document.getElementById("achievementInput");
    const value = input.value.trim();

    if (!value) return;

    if (achievements.includes(value)) {
        showToast("Already added");
        return;
    }

    achievements.push(value);
    input.value = "";

    saveData();
    renderAchievements();
    showToast("Achievement added");
}

function renderAchievements() {
    const list = document.getElementById("achievementList");
    list.innerHTML = "";

    achievements.forEach(a => {
        const li = document.createElement("li");
        li.textContent = a;
        list.appendChild(li);
    });
}

/* ---------------- STATS ---------------- */

function updateStats(correct) {
    stats.quizzes++;

    if (correct) {
        stats.correct++;
        stats.streak++;
    } else {
        stats.streak = 0;
    }

    saveData();
    updateUI();
}

/* ---------------- UI ---------------- */

function updateUI() {
    document.getElementById("playerName").textContent = player.name;
    document.getElementById("playerLevel").textContent = player.level;
    document.getElementById("playerXP").textContent = player.xp;
    document.getElementById("playerTitle").textContent = player.title;

    document.getElementById("statQuizzes").textContent = stats.quizzes;
    document.getElementById("statCorrect").textContent = stats.correct;
    document.getElementById("statStreak").textContent = stats.streak;

    let accuracy = stats.quizzes === 0 ? 0 : Math.round((stats.correct / stats.quizzes) * 100);
    document.getElementById("statAccuracy").textContent = accuracy + "%";

    const xpPercent = Math.min(
        (player.xp / Math.max(player.level * 1000, 1)) * 100,
        100
    );

    document.getElementById("xpBar").style.width = xpPercent + "%";
}

/* ---------------- CHALLENGES ---------------- */

function loadChallenges() {
    const container = document.getElementById("challengeContainer");
    container.innerHTML = "";

    shuffleArray([...challenges]).forEach((c, i) => {
        const div = document.createElement("div");
        div.className = "challenge";

        div.innerHTML = `
            <strong>Challenge ${i + 1}</strong>
            <p>${c}</p>
        `;

        div.style.cursor = "pointer";
        div.onclick = () => openChallenge(c);

        container.appendChild(div);
    });
}

/* ---------------- CODE EDITOR ---------------- */

function openChallenge(challengeText) {
    const win = window.open("", "_blank");

    win.document.write(`
<!DOCTYPE html>
<html>
<head>
<title>Code Challenge</title>
<style>
body {
    margin: 0;
    display: flex;
    height: 100vh;
    font-family: Arial;
}

.left {
    width: 50%;
    display: flex;
    flex-direction: column;
    border-right: 2px solid #ddd;
}

textarea {
    flex: 1;
    padding: 12px;
    font-family: monospace;
    font-size: 14px;
    border: none;
    outline: none;
    resize: none;
}

button {
    padding: 12px;
    background: #111;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

.right {
    width: 50%;
}

iframe {
    width: 100%;
    height: 100%;
    border: none;
}
</style>
</head>
<body>

<div class="left">
    <button onclick="runCode()">▶ Run</button>
    <textarea id="code">
// Challenge: ${challengeText}

document.body.innerHTML = "<h1>Start coding here...</h1>";
    </textarea>
</div>

<div class="right">
    <iframe id="preview"></iframe>
</div>

<script>
function runCode() {
    const code = document.getElementById("code").value;
    const iframe = document.getElementById("preview");

    iframe.contentDocument.open();
    iframe.contentDocument.write(code);
    iframe.contentDocument.close();
}
</script>

</body>
</html>
    `);
}

/* ---------------- QUIZ ---------------- */

function initQuiz() {
    quizPool = shuffleArray([...quizData]);
    currentQuestion = 0;
    loadQuestion();
}

function loadQuestion() {
    if (!quizPool || quizPool.length === 0) {
        quizPool = shuffleArray([...quizData]);
        currentQuestion = 0;
    }

    const q = quizPool[currentQuestion];

    document.getElementById("question").textContent = q.question;

    const options = document.getElementById("options");
    options.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = opt;

        btn.onclick = () => checkAnswer(opt, btn);

        options.appendChild(btn);
    });
}

function checkAnswer(answer, button) {
    if (!quizPool || !quizPool[currentQuestion]) return;

    const correct = quizPool[currentQuestion].answer;

    document.querySelectorAll(".option").forEach(b => b.disabled = true);

    if (answer === correct) {
        button.classList.add("correct");
        addXP(100);
        updateStats(true);
        showToast("Correct");
    } else {
        button.classList.add("wrong");

        document.querySelectorAll(".option").forEach(b => {
            if (b.textContent === correct) {
                b.classList.add("correct");
            }
        });

        updateStats(false);
        showToast("Wrong");
    }
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= quizPool.length) {
        quizPool = shuffleArray([...quizData]);
        currentQuestion = 0;
        showToast("New randomized quiz started");
    }

    loadQuestion();
}

/* ---------------- TOAST ---------------- */

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2000);
}

/* ---------------- INIT ---------------- */

function init() {
    loadData();
    renderAchievements();
    loadChallenges();
    updateUI();
    initQuiz();
}

init();