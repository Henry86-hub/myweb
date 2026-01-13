// ===============================
// BANK SOAL (BEBAS TAMBAH)
// ===============================
let username = "";
let userAnswers = [];
let timeLeft = 5;
let timerInterval;

const questionBank = [
    {
        question: "Tag HTML untuk JavaScript?",
        options: ["<js>", "<javascript>", "<script>", "<code>"],
        answer: 2
    },
    {
        question: "Fungsi utama CSS adalah?",
        options: ["Logika program", "Desain tampilan", "Mengelola database", "Backend"],
        answer: 1
    },
    {
        question: "Bahasa untuk membuat halaman web?",
        options: ["Python", "HTML", "C++", "Java"],
        answer: 1
    },
    {
        question: "Simbol komentar satu baris di JavaScript?",
        options: ["<!-- -->", "//", "/* */", "#"],
        answer: 1
    },
    {
        question: "Ekstensi file JavaScript?",
        options: [".java", ".js", ".html", ".css"],
        answer: 1
    },
    {
        question: "Tag HTML untuk membuat link?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: 0
    },
    {
        question: "Properti CSS untuk mengubah warna teks?",
        options: ["font-color", "text-color", "color", "background"],
        answer: 2
    },
    {
        question: "Perintah untuk menampilkan output di JavaScript?",
        options: ["print()", "echo()", "console.log()", "output()"],
        answer: 2
    },
    {
        question: "Ekstensi file CSS?",
        options: [".style", ".css", ".design", ".html"],
        answer: 1
    },
    {
        question: "HTML termasuk bahasa?",
        options: ["Pemrograman", "Markup", "Database", "Scripting"],
        answer: 1
    },
    {
        question: "Properti CSS untuk mengatur ukuran teks?",
        options: ["text-size", "font-size", "size", "font-style"],
        answer: 1
    },
    {
        question: "Simbol komentar di CSS?",
        options: ["//", "<!-- -->", "/* */", "#"],
        answer: 2
    },
    {
        question: "JavaScript berjalan di sisi?",
        options: ["Server", "Database", "Client", "Compiler"],
        answer: 2
    },
    {
        question: "Fungsi `document.getElementById()`?",
        options: [
            "Menghapus elemen",
            "Mengambil elemen HTML",
            "Menambah style",
            "Menjalankan event"
        ],
        answer: 1
    },
    {
        question: "Framework JavaScript?",
        options: ["Laravel", "Bootstrap", "React", "MySQL"],
        answer: 2
    }
];

// ===============================
// SHUFFLE (FISHER-YATES)
// ===============================
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ===============================
// GAME STATE
// ===============================
let questions = [...questionBank];
shuffle(questions);

let index = 0;
let score = 0;

// ===============================
// ELEMENT
// ===============================
const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".options button");
const scoreEl = document.getElementById("score");
const optionsBox = document.querySelector(".options");

// ===============================
// LOAD QUESTION
// ===============================
function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 5;
    document.getElementById("time").textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);

            userAnswers.push({
                question: questions[index].question,
                selected: "Tidak menjawab",
                correct: questions[index].options[questions[index].answer],
                isCorrect: false
            });

            nextQuestion();
        }

    }, 1000);

    const q = questions[index];
    questionEl.textContent = q.question;

    optionBtns.forEach((btn, i) => {
        btn.textContent = q.options[i];
        btn.disabled = false;
    });
}

// ===============================
// CHECK ANSWER
// ===============================
function checkAnswer(choice) {
    clearInterval(timerInterval);
    optionBtns.forEach(btn => btn.disabled = true);

    userAnswers.push({
        question: questions[index].question,
        selected: questions[index].options[choice],
        correct: questions[index].options[questions[index].answer],
        isCorrect: choice === questions[index].answer
    });

    if (choice === questions[index].answer) {
        score++;
        scoreEl.textContent = score;
    }

    setTimeout(nextQuestion, 400);
}

// ===============================
// NEXT QUESTION
// ===============================
function nextQuestion() {
    index++;

    if (index < questions.length) {
        loadQuestion();
    } else {
        gameOver();
    }
}

// ===============================
// GAME OVER
// ===============================
function gameOver() {
    clearInterval(timerInterval);

    const wrapper = document.querySelector(".game-wrapper");
    wrapper.innerHTML = `
        <h2>RESULT</h2>
        <p>Player: <b>${username}</b></p>
        <p>Score: <b>${score} / ${questions.length}</b></p>
        <div id="review"></div>
        <button class="restart-btn" onclick="restartGame()">RESTART</button>
    `;

    const reviewBox = document.getElementById("review");

    userAnswers.forEach((item, i) => {
        reviewBox.innerHTML += `
            <div class="review-item">
                <p><b>Soal ${i + 1}</b></p>
                <p>${item.question}</p>
                <p>
                    Jawaban kamu: 
                    <span class="${item.isCorrect ? 'correct' : 'wrong'}">
                        ${item.selected}
                    </span>
                </p>
                ${
                    item.isCorrect
                        ? ""
                        : `<p>Jawaban benar: <span class="correct">${item.correct}</span></p>`
                }
                <hr>
            </div>
        `;
    });
}


// ===============================
// RESTART (ACAK LAGI)
// ===============================
function restartGame() {
    location.reload();
}

// ===============================
// START
// ===============================
function startGame() {
    const input = document.getElementById("username");

    if (input.value.trim() === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }

    username = input.value;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    document.getElementById("user-display").textContent =
        "Player: " + username;

    loadQuestion();
}

