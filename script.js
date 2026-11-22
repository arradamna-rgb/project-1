// const music = document.querySelector('#bg-music')

// music.addEventListener('click', () => {
    // })
    
let score = 0
const trackAnswers = [];

const music = new Audio('./assets/Study_Relax.mp3')
// const music = new Audio('./assets/桜の季節.mp3')

const startBtn = document.querySelector('.startbtn')
if (startBtn) {
    startBtn.addEventListener('click', () => {
        console.log('moved')
        window.location.href = 'index2.html'
    })
}

const questions = document.querySelectorAll('.question')

const nextBtn = document.querySelector('#nextbtn')
const backBtn = document.querySelector('#backbtn')
let currentQuestion = 0



const howBtn = document.querySelector('.how')
const howPopup = document.querySelector('#how-popup')
const closeHow = document.querySelector('#close-how')

if (howBtn && howPopup && closeHow) {
    howBtn.addEventListener('click', () => {
        howPopup.classList.remove('hidden')
    })

    closeHow.addEventListener('click', () => {
        howPopup.classList.add('hidden')
    })
}


// nextBtn.addEventListener('click', () => {
//     questions[currentQuestion].classList.add('hidden')
//     currentQuestion++
//     if (currentQuestion < questions.length) {
//         questions[currentQuestion].classList.remove('hidden')
//     } else {
    //         console.log('Quix completed')
    //     }
    // })

    // backBtn.addEventListener('click', () => {
        //     if (currentQuestion > 0) {
            //         questions[currentQuestion].classList.add('hidden')
            //         currentQuestion--
            //         questions[currentQuestion].classList.remove('hidden')
            //     }
            // })
            
            // CORRECT ANS
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

let userAnswers = Array(questions.length).fill(null)

questions.forEach((question,index) => {
    const options = question.querySelectorAll('.options button')

    options.forEach((option) => {
        option.addEventListener('click', () => {
            userAnswers[index] = option.textContent.trim()
        })
    })
})


if (nextBtn) {
    nextBtn.addEventListener('click', () => {
    questions[currentQuestion].classList.add('hidden')
    currentQuestion++
    backBtn.disabled = currentQuestion === 0
    if (currentQuestion < questions.length) {
        questions[currentQuestion].classList.remove('hidden')
        if (currentQuestion === questions.length - 1) {
            nextBtn.textContent = 'Submit'
        }
    } else {
        userAnswers.forEach((answer, index) => {
            if (answer === correctAnswers[index]) {
                score++
            }
            trackAnswers.push(answer === correctAnswers[index])
        })
        window.location.href = `index3.html?score=${score}`
        // console.log('Quix completed')
    }
})
}

if (backBtn) {
    backBtn.disabled = currentQuestion === 0
    backBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            questions[currentQuestion].classList.add('hidden')
            currentQuestion--
            questions[currentQuestion].classList.remove('hidden')
        }
    })
}

//RESULT 

const resultTitle = document.querySelector('#result-title')
const resultMessage = document.querySelector('#result-message')


if (resultTitle && resultMessage) {
    const params = new URLSearchParams(window.location.search)
    const score = Number(params.get('score'))
    console.log(trackAnswers)
    
    if (score >= 6) {
        resultTitle.textContent = 'すごい! (Sugoi!)'
        resultMessage.textContent = `You scored ${score}/10! Great job!`
    } else {
        resultTitle.textContent = 'もういちど Mouichido'
        resultMessage.textContent = `You scored ${score}/10. Don't give up! Try again and learn more Japanese!(*^▽^*)`
    }
    if (score === 10) {
        resultTitle.textContent = '天才だね! まんてんだ(≧▽≦)'
        resultMessage.textContent = `You scored ${score}/10! Great job!`
    }
    if (score === 0) {
        resultTitle.textContent = 'Oops!(T_T)'
        resultMessage.textContent = `You scored ${score}/10! がんばって! (Ganbatte!)`
    }
}






// to show first q
// questions[currentQuestion].classList.add('active')

// // next q
// nextBtn.addEventListener('click', () => {
//     questions[currentQuestion].classList.remove('active')

//     currentQuestion++

//     if (currentQuestion < questions.length) {
//         questions[currentQuestion].classList.add('active')
//     } else {
//         console.log('Quiz Completed')
//     }
// })

