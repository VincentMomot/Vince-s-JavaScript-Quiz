//list of 4 questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    }, {
        title: "What is DOM:",
        choices: ["A programming interface for web documents",
            "A method to relay information to web servers",
            "The standard practice for file naming",
            "How the computer converts HTML to a webpage"],
        answer: "A programming interface for web documents"
    }, {
        title: "The querySelector requires all except",
        choices: ["A selector target", "An ID target",
            "A reference to the document", "querySelector spelled correctly"],
        answer: "An ID target"
    }, {
        title: "How do you listen for a click event",
        choices: ["document.getElementById('clickme');", ".addEventListener('click',btn)",
            "Open your ears", "if(button is clicked){...}"],
        answer: ".addEventListener('click',btn)"
    }];

//checks if storage has been overwritten yet to local storage
var savevince123 = 0;
savevince123 = localStorage.getItem("savevince123")

//if storage is not overwritten, use default hisgh score board
if (savevince123 != 1) {
    var highScores = [{ name: "vince", score: "29" },
    { name: "darrly", score: "15" },
    { name: "smitty", score: "1" }];
    localhigh = JSON.stringify(highScores);
    localStorage.setItem("localhigh", localhigh);
}

//defines variables and elements in JS
var scoresEL = document.querySelector("#scores")
var timeEL = document.querySelector("#countdown");
var startEL = document.querySelector("#start");
var mainEL = document.querySelector('#main');
var q1EL = document.querySelector("#q1");
var q2EL = document.querySelector("#q2");
var q3EL = document.querySelector("#q3");
var q4EL = document.querySelector("#q4");
var usernameEL = document.querySelector("#username");
usernameEL.style.display = "block";
startEL.addEventListener("click", grabUserName)
var questionEL = document.querySelector("#question");
var ansbankEL = document.querySelector("#ansbank");
var highEL = document.querySelector("#high");
startEL.addEventListener("click", setTime);
startEL.addEventListener("click", quiz);
highEL.addEventListener("click", fHighScore);
var timeLeft = 30;
var done = 0; //used when quiz timer runs out or 4 questions are answered
var menutoggle = 0; //is 0 when ready to start the quiz
var htoggle = 1;  // is 1 when high score should be displayed
var complete = 0; //used when needed to recieve a high score
var timegoing = 0;
var i = 0;
var view;
var questionNum = 0;

//stores the username in case the user gets a high score
function grabUserName() {
    var usernameEL = document.querySelector("#username");
    var highname = usernameEL.value
    return highname;
}

function quiz() {
    //the main menu 
    if (menutoggle == 1) {
        reset()
    }
    //the quiz
    else if (menutoggle == 0 && htoggle == 1) {
        ansbankEL.addEventListener("click", answerq);

        //displays the questions and hides the buttons
        mainEL.style.visibility = 'visible';
        ansbankEL.style.visibility = 'visible';
        q1EL.style.visibility = 'visible';
        q2EL.style.visibility = 'visible';
        q3EL.style.visibility = 'visible';
        q4EL.style.visibility = 'visible';
        questionEL.textContent = questions[i].title;
        q1EL.textContent = questions[i].choices[0];
        q2EL.textContent = questions[i].choices[1];
        q3EL.textContent = questions[i].choices[2];
        q4EL.textContent = questions[i].choices[3];
        startEL.style.visibility = 'hidden';
        highEL.style.visibility = 'hidden';
    }
}

//time functions
function setTime() {
    //start timer only when starting the quiz, not when resetting
    if (menutoggle == 0 && htoggle == 1) {
        usernameEL.style.display = "none";
        var timerInterval = setInterval(function () {

            //end if questions completed   
            if (timeLeft > 0 && done == 1) {
                usernameEL.style.display = "none";
                timeEL.style.visibility = 'hidden';
                questionEL.textContent = "Your Score is: " + timeLeft;
                q1EL.style.visibility = "hidden";
                //in order to display the q1EL if a high score is attained
                if (timeLeft > view[2].score) {
                    usernameEL.style.display = "none";
                    q1EL.style.visibility = "visible";
                }
                q2EL.style.visibility = "hidden";
                q3EL.style.visibility = "hidden";
                q4EL.style.visibility = "hidden";
                startEL.style.visibility = 'visible';
                highEL.style.visibility = 'visible';
                startEL.textContent = "Main Menu";
                highEL.textContent = "See High Scores";
                ansbankEL.style.visibility = 'visible';
                mainEL.style.visibility = 'visible';
                menutoggle = 1;
                htoggle = 0;
                clearInterval(timerInterval); 
                ansbankEL.removeEventListener("click", answerq) //so that ordianry text is not clickable
            }

            //end if time expires
            else if (timeLeft == 0 || timeLeft < 0) {
                usernameEL.style.display = "none";
                clearInterval(timerInterval);
                timeEL.style.visibility = 'hidden';
                questionEL.textContent = "Your Socore is 0";
                q1EL.style.visibility = "hidden";
                q2EL.textContent = "You didn't answer the questions before the time ran out";
                q3EL.textContent = "Finish all questions to submit a high score";
                q4EL.style.visibility = "hidden";
                startEL.style.visibility = 'visible';
                startEL.textContent = "Main Menu";
                highEL.style.visibility = 'visible';
                highEL.textContent = "See High Scores";
                menutoggle = 1;
                htoggle = 0;
                ansbankEL.removeEventListener("click", answerq)
            }
            //if the quiz is not done
            else {
                timeEL.style.visibility = 'visible';
                usernameEL.style.display = "none";
                timeLeft--;
                timeEL.textContent = "Time: " + timeLeft;
            }
            timeEL.value = timeLeft;
        }, 1000);
    }
}

//high scores page
function fHighScore() {
    q1EL.style.visibility = "visible";
    q2EL.style.visibility = "visible";
    q3EL.style.visibility = "visible";
    view = JSON.parse(localStorage.getItem("localhigh"));
    q1EL.textContent = view[0].name + "  " + view[0].score;
    q2EL.textContent = view[1].name + "  " + view[1].score;
    q3EL.textContent = view[2].name + "  " + view[2].score;
    q4EL.textContent = "";
    highEL.style.visibility = 'hidden';
    startEL.textContent = "Main Menu";
    htoggle = 0;
    menutoggle = 1;
    usernameEL.style.display = "none";

}
//resets the text to home page
function reset() {
    q1EL.style.visibility = "visible";
    q2EL.style.visibility = "visible";
    q3EL.style.visibility = "visible";
    q4EL.style.visibility = "visible";
    questionEL.textContent = "Java Script Coding Quiz";
    q1EL.textContent = "Try your hand at this quiz and see how well you know the JavaScript fundamentals.";
    q2EL.textContent = "There are four multiple choice questions and a timer.";
    q3EL.textContent = "Wrong answers penalize 5 seconds, get the highest score possible!";
    q4EL.textContent = "Add your username below to savevince123 your score.";
    highEL.style.visibility = "visible";
    highEL.textContent = "See High Scores";
    startEL.textContent = "Start";
    usernameEL.style.display = "block";
    timeLeft = 30;
    done = 0;
    menutoggle = 0;
    htoggle = 1;
    timegoing = 0;
    i = 0;
}

//upon quiz completion
function answerq(event) {
    usernameEL.style.display = "none";
    //if all questions aren't answered yet, check if the clicked item matches the answer
    if (i < 4) {
        anscheck = (questions[i].answer);
    }
    if (event.target.textContent == anscheck) {
        //correct ANS
    }
    else {
        timeLeft = timeLeft - 5;
        //wrong ANS
    }
    i++; //move to next question
    if (i < 4) {
        quiz();
    }
    //mark quiz as done, and work within the local storage to check if there is a new high score
    else {
        done = 1;
        view = JSON.parse(localStorage.getItem("localhigh"));
        var high2 = view[1].score; //new high score for 2nd place
        var high3 = view[2].score; //high score moves down
        var name2 = view[1].name;  //second place name

        //if taking the 2nd place spot
        if (timeLeft > high2) {
            usernameEL.style.display = "none";
            view[2].score = high2;
            q1EL.textContent = "You got on the Leader Board!!"
            view[2].name = name2; //makes the name go down a spot when beaten along with the score
            view[1].score = timeLeft;
            view[1].name = grabUserName()
            localhigh = JSON.stringify(view);
            savevince123 = 1;
            localStorage.setItem("savevince123", savevince123);
            localStorage.setItem("localhigh", localhigh)
        }

        //if taking the 3rd place spot
        else if (timeLeft > high3) {
            usernameEL.style.display = "none";
            q1EL.textContent = "You got on the Leader Board!!"
            view[2].score = timeLeft;
            view[2].name = grabUserName()
            localhigh = JSON.stringify(view);
            savevince123 = 1;
            localStorage.setItem("savevince123", savevince123);
            localStorage.setItem("localhigh", localhigh)

        }
    }
}



