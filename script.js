
const start_card = document.querySelector('.start-card');                       // start-card
const start_btn = document.querySelector('.btn');                               // start-btn
const question_card = document.querySelector('.questions-card');                // question-card
const footer_btns = document.querySelector('.footer_btns');                     // footer btns
const option_list = document.querySelector('.option-list');                     // option-list
const submit_btn = document.querySelector('.submit_btn');                       // submit button inside question-card
const submit_card = document.querySelector('.submit-card');                     // submit-card
const initial_submit_btn = submit_card.querySelector('.initial-submit-btn');   // submit button for initials
const score = submit_card.querySelector('.score');                              // gets score
const go_back = document.querySelector('.go-back');                             // go-back button from view-high-scores
const highscore_card = document.querySelector('.highscore-card');               // highscore card
// const view_high_scores = document.querySelector('.high-scores');                // view-high-scores option 
const submit_form = document.getElementById('submit-form');                     // form action
const hs_initials = highscore_card.querySelector('.hs_initials');
const hs_scores = highscore_card.querySelector('.hs_scores');
const footer_que_no = document.querySelector('.footer-que-no'); 
const que_no = footer_que_no.querySelector('.que-no');
const total_que = footer_que_no.querySelector('.total-que');

let que_count = 0;
let totalMarks = 0;
let timerID;

// Clicking Start button 

start_btn.onclick = () => {                     // on clicking start btn
    start_card.style.display = "none";           // hide start card
    question_card.style.display = "block";       // show question card
    showQuestions(que_count);                    // start question counter
    footer_btns.style.display = "flex";          // set footer btns active
    timerID = setInterval(countdown, 1000);      // timer 
    countdown();                                 // run countdown function
    // view_high_scores.style.display = 'none';     // hides view-high-scores when submit
}

// Getting questions and options

function showQuestions(index) {                                              // change questions script
    const question = document.querySelector('.question');

    let switch_que = questions[index].questionText;                         // switches questions
    question.innerHTML = switch_que;
    footer_que_no.style.display = 'inline-block';

    let que_number = questions[index].number;                               // switches question number
    que_no.innerHTML = que_number;

    total_que.innerHTML = questions.length;

    let option_switch = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    option_list.innerHTML = option_switch;                                                       // performs DOM manipulation

    const option = option_list.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');      // adds onclick to options class
    }
}



// Correct Answer check script

function optionSelected(answer) {
    let userAns = answer.textContent;                               // saves answer string in userAns
    let correctAns = questions[que_count].answer;                   // gets answer from questions.js file
    let allOptions = option_list.children.length;

    if (userAns == correctAns) {
        answer.classList.add('correct');
        totalMarks += 1;
        // console.log('Answer is correct');
    } else {
        answer.classList.add('wrong');
        time = time - 10;
        // console.log('Answer is wrong');
    }

    for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAns) {                // checks if selected option matches with correctAns
            option_list.children[i].setAttribute('class', 'option correct');
        }
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add('disabled');                     // if any option selected, disabled is added
    }

}

// On clicking next

const next_btn = document.querySelector('.next_btn');

next_btn.onclick = () => {                           // next_btn click
    if (que_count < questions.length - 1) {
        que_count++;
        showQuestions(que_count);
    } else {
        // alert('Last question')
        submit_btn.style.display = "flex";           // set submit btn active
    }

}

// Countdown Script

const time_counter = document.querySelector('.time_counter');
let time = 60;

function countdown() {
    if (time <= -1) {
        clearTimeout(timerID);
        endExam();
        // alert(`Time's Up!!!`)
    } else {
        time_counter.innerHTML = time + ' s';
        time--;
    }
}

function endExam() {                                            // end exam function
    question_card.style.display = "none";
    footer_btns.style.display = "none";
    submit_btn.style.display = "none";
    submit();
    clearTimeout(timerID);
}

// on clicking submit button

submit_btn.onclick = () => {                                    // submit button script
    if (confirm("Are you sure to submit")) {
        endExam();
        // console.log('Total Marks obtained: ' + totalMarks);
        return true;
    } else {
        return false;
    }
}

// after submit 

function submit() {
    submit_card.style.display = "flex";
    footer_que_no.style.display = 'none';
    score.innerHTML = totalMarks;
    // console.log('Total Marks obtained: ' + totalMarks);
}

// click go back

go_back.onclick = () => {
    start_card.style.display = "flex";
    highscore_card.style.display = "none";
}

// on-click View Highscores

// view_high_scores.onclick = () => {
//     start_card.style.display = "none";
//     highscore_card.style.display = "flex";
// }

// onclick submit initials button




initial_submit_btn.onclick = () => {

    let userRecord = new Array();
    let initials = document.getElementById('initials').value;            // get value of initials field

    userRecord = JSON.parse(localStorage.getItem('records')) ? JSON.parse(localStorage.getItem('records')) : []; // if empty dont display else create empty array
    
    userRecord.push({
        'initials': initials,
        'score': totalMarks
    });
    localStorage.setItem('records', JSON.stringify(userRecord));     // use stringify when to store in array
    
    // set single item as below
    // localStorage.setItem('initials', initialsArray);                       // saves initials in Local Storage
    // localStorage.setItem('hs_scores', scoresArray);                       // saves  marks in Local Storage
    // console.log(localStorage.getItem('initials'))

}

// onload function


window.onload = function () {
    getAllItems();
    // localStorage.clear(); 
}

function getAllItems() {
    for (let i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        value = localStorage.getItem(key);
        // console.log(key);
        console.log(value);
    }
}
