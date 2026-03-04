// main.js

// Данные для викторины
const quizData = [
    {
        question: "Какой язык программирования используется для создания интерактивных веб-страниц?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correct: 1
    },
    {
        question: "Что такое CSS?",
        options: ["Язык программирования", "Фреймворк", "Каскадные таблицы стилей", "База данных"],
        correct: 2
    },
    {
        question: "Какой тег используется для вставки JavaScript в HTML?",
        options: ["<js>", "<javascript>", "<script>", "<code>"],
        correct: 2
    },
    {
        question: "Что означает аббревиатура HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    }
];

const questionEl = document.getElementById('question');
const options = document.querySelectorAll('.option');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const numberQuestion = document.getElementById('number-of-question');
const numberAllQuestion = document.getElementById('number-of-all-question');
const numberAllQuestions2 = document.getElementById('number-of-all-questions-2');
const correctAnswer = document.getElementById('correct-answer');
const btnNext = document.getElementById('btn-next');
const btnTryAgain = document.getElementById('btn-try-again');
const quizOverModal = document.querySelector('.quiz-over-modal');
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const img3 = document.querySelector('.img3');
const img4 = document.querySelector('.img4');

let currentQuestion = 0;
let score = 0;
let answerSelected = false;

numberAllQuestion.textContent = quizData.length;
numberAllQuestions2.textContent = quizData.length;

// Инициализация викторины
function loadQuestion() {
    quizOverModal.classList.add('hidden');

    options.forEach(option => {
        option.classList.remove('correct', 'wrong', 'disabled');
    });
    
    // Загружаем текущий вопрос
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    numberQuestion.textContent = currentQuestion + 1;
    
    option1.textContent = currentQuiz.options[0];
    option2.textContent = currentQuiz.options[1];
    option3.textContent = currentQuiz.options[2];
    option4.textContent = currentQuiz.options[3];
    
    img1.style.display = 'none';
    img2.style.display = 'none';
    img3.style.display = 'none';
    img4.style.display = 'none';
    
    answerSelected = false;
    btnNext.disabled = true;
    btnNext.style.opacity = '0.5';
}

// Функция для проверки ответа
function checkAnswer(selectedOption, correctIndex) {
    if (!answerSelected) {
        answerSelected = true;
        btnNext.disabled = false;
        btnNext.style.opacity = '1';
        
        const selectedId = parseInt(selectedOption.getAttribute('data-id'));
        
        options.forEach(option => {
            option.classList.add('disabled');
        });
        
        options[correctIndex].classList.add('correct');
        
        if (selectedId === correctIndex) {
            score++;
            selectedOption.classList.add('correct');
        } else {
            selectedOption.classList.add('wrong');
        }
    }
}

option1.addEventListener('click', () => checkAnswer(option1, quizData[currentQuestion].correct));
option2.addEventListener('click', () => checkAnswer(option2, quizData[currentQuestion].correct));
option3.addEventListener('click', () => checkAnswer(option3, quizData[currentQuestion].correct));
option4.addEventListener('click', () => checkAnswer(option4, quizData[currentQuestion].correct));

// Обработчик для кнопки "Next"
btnNext.addEventListener('click', () => {
    if (answerSelected) {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            // Показываем результаты
            showResults();
        }
    }
});

// Функция показа результатов
function showResults() {
    correctAnswer.textContent = score;
    quizOverModal.classList.remove('hidden');
}

// Обработчик для кнопки "Попробуй снова"
btnTryAgain.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
});

// Инициализируем первый вопрос
loadQuestion();

// Дополнительно: делаем кнопку Next неактивной при загрузке
btnNext.style.opacity = '0.5';
btnNext.disabled = true;
