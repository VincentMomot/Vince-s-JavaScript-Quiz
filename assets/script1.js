//JavaScript Questions
// 1 
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },{
        title: "What is DOM:",
        choices: ["A programming interface for web documents",
                  "A method to relay information to web servers",
                  "The standard practice for file naming",
                  "How the computer converts HTML to a webpage"],
        answer: "A programming interface for web documents"
    },{
        title: "The querySelector requires all except",
        choices:["A selector target", "An ID target", 
                "A reference to the document", "querySelector spelled correctly"],
        answer: "An ID target"
    },{
        title: "How do you listen for a click event",
        choices:["document.getElementById('clickme');", ".addEventListener('click',btn)", 
                "Open your ears", "if(button is clicked){...}"],
        answer: ".addEventListener('click',btn)"
    }];

var highScores=[{name: "vince", score:"29"},
                {name: "darrly", score:"15"},
                {name: "smitty", score:"1"},];
localhigh=JSON.stringify(highScores);
localStorage.setItem("localhigh",localhigh);

var scoresEL = document.querySelector("#scores")                
var timeEL = document.querySelector("#countdown");
var startEL = document.querySelector("#start");
var mainEL = document.querySelector('#main');
var q1EL= document.querySelector("#q1");
var q2EL= document.querySelector("#q2");
var q3EL= document.querySelector("#q3");
var q4EL= document.querySelector("#q4");

var questionEL = document.querySelector("#question");
var ansbankEL= document.querySelector("#ansbank");
var highEL=document.querySelector("#high");
startEL.addEventListener("click", setTime);
startEL.addEventListener("click", quiz);
highEL.addEventListener("click", fHighScore);
ansbankEL.addEventListener("click", answerq);
var timeLeft = 30;   
var done=0; //used when quiz timer runs out or 4 questions are answered
var menutoggle=0; //is 0 when ready to start the quiz
var htoggle=1;  // is 1 when high score should be displayed
var complete =0; //used when needed to recieve a high score
var timegoing=0;
var i=0;
var view;

//quiz changes

function quiz(){
    //the main menu
    if(menutoggle==1){
reset()
}
   //the quiz
else if(menutoggle==0 && htoggle==1){
            mainEL.style.visibility='visible';
            ansbankEL.style.visibility='visible';  
            q1EL.style.visibility='visible';
            q2EL.style.visibility='visible';
            q3EL.style.visibility='visible';
            q4EL.style.visibility='visible';

    questionEL.textContent=questions[i].title;
    q1EL.textContent=questions[i].choices[0];
    q2EL.textContent=questions[i].choices[1];
    q3EL.textContent=questions[i].choices[2];
    q4EL.textContent=questions[i].choices[3];
    startEL.style.visibility = 'hidden';
    highEL.style.visibility = 'hidden';
   }}

console.log(questions[0].choices[2]);
    //time functions
    function setTime() {
        //start timer only when starting the quiz, not when resetting
    if(menutoggle==0 && htoggle==1){
    var timerInterval = setInterval(function() {               
     
            //end if questions completed   
            if (timeLeft>0 && done==1){  
            timeEL.style.visibility='hidden';
            questionEL.textContent="Your Score is: "+timeLeft ; 
            q1EL.style.visibility="hidden";
            q2EL.style.visibility="hidden";
            q3EL.style.visibility="hidden";
            q4EL.style.visibility="hidden";
            startEL.style.visibility='visible';
            highEL.style.visibility='visible';
            startEL.textContent="Main Menu";
            highEL.textContent="See High Scores";
            
            ansbankEL.style.visibility='visible';
            mainEL.style.visibility='visible';
            menutoggle = 1;
            htoggle=0;
            clearInterval(timerInterval);}

          //end if time expires
        else if(timeLeft==0 || timeLeft<0){
          clearInterval(timerInterval);
          timeEL.style.visibility='hidden';
          questionEL.textContent="Your Socore is 0";
          q1EL.style.visibility="hidden";
          q2EL.textContent="You didn't answer the questions before the time ran out";
          q3EL.textContent="Finish all questions to submit a high score";
          q4EL.style.visibility="hidden";
          startEL.style.visibility='visible';
          startEL.textContent="Main Menu";
          highEL.style.visibility='visible';
          highEL.textContent="See High Scores";
          menutoggle = 1;
          htoggle=0;
              }
        else{
            timeEL.style.visibility='visible';
            timeLeft--;
            timeEL.textContent = "Time: " +timeLeft;
        }
        timeEL.value=timeLeft;
      },1000);
    }}

    //high scores page
    function fHighScore(){
        q1EL.style.visibility="visible";
            q2EL.style.visibility="visible";
            q3EL.style.visibility="visible";
            view=JSON.parse(localStorage.getItem("localhigh"));
            
        q1EL.textContent= view[0].name + "  " + view[0].score;
        q2EL.textContent= view[1].name + "  " + view[1].score;
        q3EL.textContent= view[2].name + "  " + view[2].score;
        q4EL.textContent="";
        highEL.style.visibility='hidden';
        startEL.textContent="Main Menu";
        htoggle=0;
        menutoggle=1;   
    }
    //resets the text to home page
    function reset(){
        q1EL.style.visibility="visible";
            q2EL.style.visibility="visible";
            q3EL.style.visibility="visible";
            q4EL.style.visibility="visible";
        questionEL.textContent="Java Script Coding Quiz";
        q1EL.textContent= "Try your hand at this quiz and see how well you know the JavaScript fundamentals.";
        q2EL.textContent= "There are four multiple choice questions and a timer.";
        q3EL.textContent="Wrong answers penalize 5 seconds, get the highest score possible!";            q4EL.textContent="Good Luck!";
        highEL.style.visibility="visible";
        highEL.textContent="See High Scores";
        startEL.textContent="Start";

            timeLeft=30;
            done=0;
            menutoggle=0;
            htoggle=1;
            timegoing=0;
            i=0;
    }   



    var questionNum = 0;
    console.log(questions[i].answer);
    

    function answerq(event){
        anscheck=(questions[i].answer);
        console.log(event.target.textContent);  
    if(event.target.textContent==anscheck){
        console.log("vince");
    }
    else{timeLeft=timeLeft-5;}      
     i++
    if(i<4){
         quiz();}
    else{done=1;
        view=JSON.parse(localStorage.getItem("localhigh"));
    var high2= view[1].score;
    var high3=view[2].score;
    var name2=view[1].name;  //second place name
    if(timeLeft>high2){
        high3=high2;
        view[2].name=name2; //makes the name go down a spot when beaten along with the score
        view[1].score=timeLeft;
        view[1].name="VINENY THE WINNER"  ////change this to take in a name
        localhigh=JSON.stringify(view);
        localStorage.setItem("localhigh",localhigh)

        console.log("second place");
    }
    else if(timeLeft>high3){
        console.log("3rdplace");
        view[2].name="TEST" ///change this to take in a name
        view[2].score=timeLeft;
        localhigh=JSON.stringify(view);
        localStorage.setItem("localhigh",localhigh)

    }
    }
        }
        