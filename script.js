// const music = document.querySelector('#bg-music')

// music.addEventListener('click', () => {
    // })
    // const music = new Audio('./assets/Study_Relax.mp3')
    // const music = new Audio('./assets/桜の季節.mp3')
    
    
    // Cached Element References
    const startBtn = document.querySelector('.startbtn')
    const questions = document.querySelectorAll('.question')
    const nextBtn = document.querySelector('#nextbtn')
    const backBtn = document.querySelector('#backbtn')
    const howBtn = document.querySelector('.how')
    const howPopup = document.querySelector('#how-popup')
    const closeHow = document.querySelector('#close-how')
    const resultTitle = document.querySelector('#result-title')
    const resultMessage = document.querySelector('#result-message')
    const reviewList = document.querySelector('#review-list')
    // const options = questions.querySelectorAll(`.options button`)
    const playAgainBtn = document.querySelector('#play-again')
    
    // Variables
    let score = 0
    let currentQuestion = 0
    const secondQuiz = window.location.pathname.includes('index5.html')
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


    let userAnswers = Array(questions.length).fill(null) 
    let userAnswers2 = Array(questions.length).fill(null) 
    // if null {
    //     console.log(`No Answer`)
    // }


// Event Listeners
if (startBtn) {
    startBtn.addEventListener('click', () => {
        console.log('moved')
        window.location.href = 'index2.html'
    })
}

if (howBtn) {
    howBtn.addEventListener('click', () => {
        howPopup.classList.remove('hidden')
    })
}

if (closeHow) {
    closeHow.addEventListener('click', () => {
        howPopup.classList.add('hidden')
    })
}

questions.forEach((question,index) => {
    const options = question.querySelectorAll('.options button')

    options.forEach((option) => {
        option.addEventListener('click', () => {
            if (secondQuiz) {
                userAnswers2[index] = option.textContent.trim()
            } else {
                userAnswers[index] = option.textContent.trim()
            }
            console.log(userAnswers)
        })
    })
})

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        questions[currentQuestion].classList.add('hidden')
        currentQuestion++
        // backBtn.disabled = currentQuestion === 0
        if (currentQuestion < questions.length) {
            questions[currentQuestion].classList.remove('hidden')
            if (currentQuestion === questions.length - 1) {
                nextBtn.textContent = 'Submit'
            }
        } else {
            console.log(userAnswers)
            userAnswers.forEach((answer, index) => {
                if (answer === correctAnswers[index]) {
                    score++
                }
            })
            localStorage.setItem("score", score)
            localStorage.setItem("userAnswers", JSON.stringify(userAnswers))
            window.location.href = `index3.html`
            console.log('Quix completed')
        }
    })
}

if (backBtn) {
    // backBtn.disabled = currentQuestion === 0
    backBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            questions[currentQuestion].classList.add('hidden')
            currentQuestion--
            questions[currentQuestion].classList.remove('hidden')
        }
    })
}

if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
        if (score >= 6) {
            window.location.href = 'index5.html'
        } else {
            window.location.href = 'index2.html'
        }
    })
}

// // index5.html
// questions.forEach((question,index) => {
//     const options = question.querySelectorAll('.options button')

//     options.forEach((option) => {
//         option.addEventListener('click', () => {
//             userAnswers2[index] = option.textContent.trim()
//             console.log(userAnswers)
//         })
//     })
// })

// if (nextBtn) {
//     nextBtn.addEventListener('click', () => {
//         questions[currentQuestion].classList.add('hidden')
//         currentQuestion++
//         // backBtn.disabled = currentQuestion === 0
//         if (currentQuestion < questions.length) {
//             questions[currentQuestion].classList.remove('hidden')
//             if (currentQuestion === questions.length - 1) {
//                 nextBtn.textContent = 'Submit'
//             }
//         } else {
//             console.log(userAnswers)
//             userAnswers2.forEach((answer, index) => {
//                 if (answer === correctAnswers2[index]) {
//                     score++
//                 }
//             })
//             localStorage.setItem("score", score)
//             localStorage.setItem("userAnswers2", JSON.stringify(userAnswers))
//             window.location.href = `index3.html`
//             console.log('Quix completed')
//         }
//     })
// }



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






// Result Logic 

if (resultTitle && resultMessage) {
    // const params = new URLSearchParams(window.location.search)
    // const score = Number(params.get('score'))
    score = Number(localStorage.getItem("score"))
    userAnswers = JSON.parse(localStorage.getItem("userAnswers"))
    console.log(score)
    console.log(userAnswers)
    
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

// REVIEW LOGIC 

if (reviewList && userAnswers) {
    correctAnswers.forEach((answer, index) => {
        if (userAnswers[index] !== answer) {
            reviewList.innerHTML += `
                <div>
                    <h3>Question ${index + 1}</h3>
                    <p>Your answer: ${userAnswers[index] || 'No Answer'}</p>
                    <p>Correct answer: ${answer}</p>
                </div>
            `
        }
    })
}

