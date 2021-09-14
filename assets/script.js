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

var time = document.getElementById("countdown");
var begin = document.querySelector('#Start');
var main = document.getElementById('main');
var q1EL= document.querySelector("#q1");
var q2EL= document.querySelector("#q2");
var q3EL= document.querySelector("#q3");
var q4EL= document.querySelector("#q4");
begin.addEventListener("click", quiz);
var timeLeft = 3;  
var done=0;
var ans=0;

//quiz changes
function quiz(){
    for(i=0; i<4;){
    question.textContent=questions[i].title;
    q1.textContent=questions[i].choices[0];
    q2.textContent=questions[i].choices[1];
    q3.textContent=questions[i].choices[2];
    q4.textContent=questions[i].choices[3];
    document.getElementById('Start').style.visibility = 'hidden';


    document.querySelector('ansbank').addEventListener('click');{
    i++;
    }
    
    }}
    

    //time functions
    var timeInterval = setInterval(function (){
        
        if (timeLeft>0 && done==1){
            main.textContent="Your Score is: "+timeLeft;    
    
        }
        else if(timeLeft==0){
          clearInterval(timeInterval);
          main.textContent="Your Socore is 0";
        
        }
        else{
            timeLeft--;
            time.textContent = "Time: " +timeLeft;
        }
    
      },1000);
    
      document.getElementById("countdown").value=timeLeft;
    }
