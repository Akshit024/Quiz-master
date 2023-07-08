const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)


nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (4 > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'If you drop me, I"m sure to crack, but give me a smile and I"ll always smile back. What am I?',
    answers: [
      { text: 'Egg', correct: false },
      { text: 'Mirror', correct: true },
      { text: 'Phone screen', correct: false },
      { text: 'Window', correct: false }
    ]
  },
  {
    question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
    answers: [
      { text: 'Cloud', correct: false },
      { text: 'Echo', correct: true },
      { text: 'Lightning', correct: false },
      { text: 'Whistle', correct: false }
    ]
  },
  {
    question: 'I am taken from a mine and shut in a wooden case, from which I am never released. What am I?',
    answers: [
      { text: 'Diamond', correct: false },
      { text: 'Gold', correct: false },
      { text: 'Coal', correct: false },
      { text: 'Pencil lead', correct: true }
    ]
  },
  {
    question: 'What has keys but can"t open locks, space but no room, and you can enter but can"t go inside?',
    answers: [
      { text: 'Keyboard', correct: false },
      { text: 'Calculator', correct: false },
      { text: 'Internet', correct: true },
      { text: 'Email', correct: false }
    ]
  },
  {
    question: 'If you have me, you want to share me. If you share me, you no longer have me. What am I?',
    answers: [
      { text: 'Secret', correct: true },
      { text: 'Money', correct: false },
      { text: 'Love', correct: false },
      { text: 'Knowledge', correct: false }
    ]
  }
]