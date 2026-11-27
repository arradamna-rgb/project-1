// const music = document.querySelector('#bg-music')

// music.addEventListener('click', () => {
    // })
    // const music = new Audio('./assets/Study_Relax.mp3')
    // const music = new Audio('./assets/桜の季節.mp3')
    
    
// CACHED ELEMENT REFERENCES
const homePage = document.querySelector('#home-page')
const questions = document.querySelectorAll('.question')
const questions2 = document.querySelectorAll('.question2')
const nextBtn = document.querySelector('#nextbtn');
const nextBtn2 = document.querySelector('#nextbtn2')
const backBtn = document.querySelector('#backbtn')
const howBtn = document.querySelector('button.how')
const howPopup = document.querySelector('#how-popup')
const closeHow = document.querySelector('#close-how')
const resultTitle = document.querySelector('#result-title')
const resultMessage = document.querySelector('#result-message')
const reviewList = document.querySelector('#review-list')
const playAgainBtn = document.querySelector('#play-again')




// VARIABLES
const secondQuiz = window.location.pathname.includes('index5.html')
const activeQuestions = secondQuiz ? questions2 : questions
const activeNextBtn = secondQuiz ? nextBtn2 : nextBtn
const answerKey = secondQuiz ? 'userAnswers2' : 'userAnswers'
const scoreKey = secondQuiz ? 'score2' : 'score'
const quizType = secondQuiz ? 'quiz2' : 'quiz1'

let currentQuestion = 0
let score = 0



//ANSWERS
const correctAnswers = [
    'Cat',
    'True',
    'Ohayou',
    'Hai',
    'Water',
    '日本',
    'Sensei',
    'False',
    'False',
    'True'
]

const correctAnswers2 = [
    'Mountain "Yama"',
    'False',
    'Daijoubu',
    'Book',
    'Rice balls',
    'Ringo "りんご"',
    'True',
    'True',
    'Flower',
    '森'
]

const activeCorrectAnswers = secondQuiz
    ? correctAnswers2
    : correctAnswers

let userAnswers = Array(activeQuestions.length).fill(null)



if (homePage) {
    const startBtn = homePage.querySelector('.startbtn')

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            window.location.href = 'index2.html'
        });
    }
}


if (howBtn && howPopup) {
    howBtn.addEventListener('click', () => {
        howPopup.classList.remove('hidden')
    })
}

if (closeHow && howPopup) {
    closeHow.addEventListener('click', () => {
        howPopup.classList.add('hidden')
    })
}




// SELECT ANSWERS
activeQuestions.forEach((question, index) => {

    const options = question.querySelectorAll(
        secondQuiz ? '.options2 button' : '.options button'
    )
    options.forEach((option) => {
        option.addEventListener('click', () => {
            userAnswers[index] = option.textContent.trim()
            options.forEach((btn) => {
                btn.classList.remove('selected')
            })
            option.classList.add('selected')
            console.log('Saved answers:', userAnswers)
        })
    })
})



// UPDATE NAVIGATION BUTTONS
function updateNavigation() {
    if (backBtn) {
        backBtn.disabled = currentQuestion === 0
    }
    if (activeNextBtn) {
        activeNextBtn.textContent =
            currentQuestion === activeQuestions.length - 1
                ? 'Submit'
                : 'Next'
    }
}



// NEXT BUTTON
if (activeNextBtn && activeQuestions.length > 0) {

    activeNextBtn.addEventListener('click', () => {

        // To hide current question
        activeQuestions[currentQuestion].classList.add('hidden')
        currentQuestion++


        // To move to next question
        if (currentQuestion < activeQuestions.length) {
            activeQuestions[currentQuestion].classList.remove('hidden')
            updateNavigation()
        } else {
            score = 0

            userAnswers.forEach((answer, index) => {

                if (answer === activeCorrectAnswers[index]) {
                    score++
                }

            })

            // Save quiz  separately
            localStorage.setItem(scoreKey, score)
            localStorage.setItem(answerKey, JSON.stringify(userAnswers))
            localStorage.setItem('quizType', quizType)
            console.log('Final score:', score)
            console.log('Final answers:', userAnswers)



            // Go to result page
            window.location.href = 'index3.html'

        }

    })

}


// BACK BUTTON

if (backBtn && activeQuestions.length > 0) {
    backBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            activeQuestions[currentQuestion].classList.add('hidden')
            currentQuestion--
            activeQuestions[currentQuestion].classList.remove('hidden')
            updateNavigation();
        }
    });
}
updateNavigation();



// RESULT PAGE
if (resultTitle && resultMessage) {

    const savedQuizType = localStorage.getItem('quizType');

    const isSecondResult = savedQuizType === 'quiz2'

    const resultScore = Number(
        localStorage.getItem(isSecondResult ? 'score2' : 'score')
    )
    const savedAnswers = JSON.parse(
        localStorage.getItem(isSecondResult ? 'userAnswers2' : 'userAnswers')) || []
    const resultCorrectAnswers = isSecondResult
        ? correctAnswers2
        : correctAnswers
    score = resultScore


    // Display result
    if (score >= 6) {
        resultTitle.textContent = 'すごい! (Sugoi!)'
        resultMessage.textContent =`You scored ${score}/10! Great job!`
    } else {
        resultTitle.textContent = 'もういちど Mouichido'
        resultMessage.textContent =`You scored ${score}/10. Don't give up! Try again and learn more Japanese! (*^▽^*)`
    }
    if (score === 10) {
        resultTitle.textContent = '天才だね! まんてんだ(≧▽≦)'
        resultMessage.textContent =
            `You scored ${score}/10! Great job!`
    }
    if (score === 0) {
        resultTitle.textContent = 'Oops! (T_T)'
        resultMessage.textContent =`You scored ${score}/10! がんばって! (Ganbatte!)`
    }



    // REVIEW WRONG ANSWERS
    if (reviewList) {

        reviewList.innerHTML = ''

        resultCorrectAnswers.forEach((answer, index) => {

            if (savedAnswers[index] !== answer) {

                reviewList.innerHTML += `
                    <div>
                        <h3>Question ${index + 1}</h3>
                        <p>Your answer: ${savedAnswers[index] || 'No Answer'}</p>
                        <p>Correct answer: ${answer}</p>
                    </div>
                    `
            }
        })
        if (reviewList.innerHTML === '') {
            reviewList.innerHTML = '<p>Perfect! All answers are correct! 🎉</p>';
        }
    }


    // RESULT BUTTON
    if (playAgainBtn) {

        if (!isSecondResult && score >= 6) {

            playAgainBtn.textContent = 'Start Second Quiz'

        } else if (isSecondResult) {
            playAgainBtn.textContent = 'Try Second Quiz Again'

        } else {
            playAgainBtn.textContent = 'Retake Quiz'
        }
        playAgainBtn.addEventListener('click', () => {

            if (!isSecondResult && score >= 6) {

                window.location.href = 'index5.html'

            } else if (isSecondResult) {

                window.location.href = 'index5.html'

            } else {

                window.location.href = 'index2.html'

            }
        });

    }
}
