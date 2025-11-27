const KvizKerdesek = [
    {
        subject: "Matematika",
        questions: "Mikor használunk koszinusztételt?",
        answers: ["Ha a háromszög két oldala és a közbezárt szöge ismert", "Ha a háromszög három oldala ismert", "Ha a háromszög két szöge és egy oldala ismert", "Ha a háromszög egyik szöge 90 fok"],
        correctAns: 0
    },
    {
        subject: "Matematika",
        questions: "Mennyi szögfüggvény van?",
        answers: ["3", "10", "Bitang sok", "Rossz válasz"],
        correctAns: 0
    },
    {
        subject: "Matematika",
        questions: "Melyek szögfüggvények?",
        answers: [" tg, cos, sin", "tg, cos, sus", "tgc, son, cis", "tg, cis, sin"],
        correctAns: 0
    },
    {
        subject: "Történelem",
        questions: "Mikor szentesítették az áprilisi törvényeket?",
        answers: ["1848. április 27", "1848. junius 13 ", "1848. április 11", "1799. április 14"],
        correctAns: 2
    },
    {
        subject: "Történelem",
        questions: "Mikor volt a forradalom?",
        answers: ["1849", "1847", "1848", "1799"],
        correctAns: 2
    },
    {
        subject: "Történelem",
        questions: "Hány törvény cikk van az áprilisi törvényekben?",
        answers: ["12", "31", "100", "53"],
        correctAns: 1
    },
    {
        subject: "Magyar",
        questions: "Melyik évben adták ki Az Ember Tragédiája című művet?",
        answers: ["1860", "1868", "1862", "1902"],
        correctAns: 2
    },
    {
        subject: "Magyar",
        questions: "Hány színből áll az ember tragédiája?",
        answers: ["8", "6", "7", "15"],
        correctAns: 3
    },
    {
        subject: "Magyar",
        questions: "Ki írta Az ember tragédiája című művet?",
        answers: ["VZS", "Kirby", "Madách Imre", "Petőfi Sándor"],
        correctAns: 2
    },
    {
        subject: "Bonus",
        questions: "Kik készítették ezt a quizt?",
        answers: ["VZS és Kirby", "Madách Imre és Petőfi Sándor", "Einstein és Newton", "A quiz maga"],
        correctAns: 0
    }
];

let currentQuestion = 0;
let userAnswers = [];
let quizFinished = false;

const submitBtn = document.getElementById('submitBtn');
const questionTitle = document.getElementById('questionTitle');
const answersContainer = document.getElementById('answersContainer');
const answersList = document.getElementById('answersList');

function clearChildren(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
}

function loadQuestion() {
    quizFinished = false;
    clearChildren(questionTitle);
    clearChildren(answersContainer);
    if (currentQuestion < KvizKerdesek.length) {
        const q = KvizKerdesek[currentQuestion];
        const span = document.createElement('span');
        span.className = 'subject-' + q.subject.toLowerCase();
        span.textContent = q.subject;
        questionTitle.appendChild(span);
        questionTitle.appendChild(document.createTextNode(' ' + q.questions));
        for (let i = 0; i < q.answers.length; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'form-check';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'question';
            input.value = String(i);
            input.id = 'answer' + i;
            input.className = 'form-check-input';
            const label = document.createElement('label');
            label.htmlFor = input.id;
            label.className = 'form-check-label';
            label.textContent = q.answers[i];
            wrapper.appendChild(input);
            wrapper.appendChild(label);
            answersContainer.appendChild(wrapper);
        }
        submitBtn.textContent = currentQuestion < KvizKerdesek.length - 1 ? 'Tovább a következő kérdésre' : 'Befejezés';
    } else {
        showResults();
    }
}

function updateTable() {
    const last = userAnswers[userAnswers.length - 1];
    const tr = document.createElement('tr');
    const tdQ = document.createElement('td');
    tdQ.textContent = last.question;
    const tdA = document.createElement('td');
    tdA.textContent = last.answer;
    if (!last.isCorrect) {
        tdA.appendChild(document.createElement('br'));
        const small = document.createElement('small');
        small.className = 'text-muted';
        small.textContent = 'Helyes válasz: ' + last.correctAnswer;
        tdA.appendChild(small);
    }
    const tdS = document.createElement('td');
    tdS.className = last.isCorrect ? 'text-success' : 'text-danger';
    tdS.textContent = last.isCorrect ? '✓ Helyes' : '✗ Helytelen';
    tr.appendChild(tdQ);
    tr.appendChild(tdA);
    tr.appendChild(tdS);
    answersList.appendChild(tr);
}

function showResults() {
    quizFinished = true;
    clearChildren(questionTitle);
    clearChildren(answersContainer);
    const p = document.createElement('p');
    p.className = 'alert alert-info';
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    p.innerHTML = 'Gratulálunk! Elérted a végét a kvíznek. <strong>' + correctCount + '/' + KvizKerdesek.length + '</strong> helyes válasz.';
    answersContainer.appendChild(p);
    submitBtn.textContent = 'Újra kezdés';
}

function resetQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    quizFinished = false;
    clearChildren(answersList);
    loadQuestion();
}

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (quizFinished) {
        resetQuiz();
        return;
    }
    const selected = document.querySelector('input[name="question"]:checked');
    if (!selected) {
        alert('Kérjük válasszon egy választ!');
        return;
    }
    const selectedIndex = parseInt(selected.value, 10);
    const q = KvizKerdesek[currentQuestion];
    const isCorrect = selectedIndex === q.correctAns;
    const record = {
        question: q.questions,
        answer: q.answers[selectedIndex],
        correctAnswer: q.answers[q.correctAns],
        isCorrect: isCorrect
    };
    userAnswers.push(record);
    updateTable();
    currentQuestion++;
    if (currentQuestion >= KvizKerdesek.length) {
        showResults();
    } else {
        loadQuestion();
    }
});

loadQuestion();










