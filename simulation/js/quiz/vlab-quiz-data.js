/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var quizJSON = {
    "info": {
        "name": "Test Your Knowledge!!",
        "main": "<p>Think you're smart enough to be on Jeopardy? Find out with this super crazy knowledge quiz!</p>",
        "results": "<p>Learn More.</p>",
        "level1": "Jeopardy Ready",
        "level2": "Jeopardy Contender",
        "level3": "Jeopardy Amateur",
        "level4": "Jeopardy Newb",
        "level5": "Stay in school, kid..." // no comma here
    },
    "questions": [
        {// Question 1 - Multiple Choice, Single True Answer
            "q": "Which statement about a series RC circuit is true? ",
            "a": [
                {"option": "The capacitor's voltage drop is in phase with the resistor's voltage drop", "correct": false},
                {"option": "The current leads the source voltage", "correct": true},
                {"option": " The current lags the source voltage", "correct": false},
                {"option": "The resistor voltage lags the current", "correct": false} // no comma here
            ],
            "correct": "",
            "incorrect": "" // no comma here
        },
        {// Question 2 - Multiple Choice, Multiple True Answers, Select Any
            "q": "If the frequency increases in the given circuit, how would the total current change?<br/><p style=\"text-align:center\"><img src=\"image/quiz1.png \" style=\"width:350px;height:200px\"></p>  ",
            "a": [
                {"option": " The total current would increase ", "correct":true},
                {"option": " The total current would decrease", "correct": false},
                {"option": "The total current would remain the same ", "correct": false},
                {"option": "More information is needed in order to predict how the total current would change", "correct": false} // no comma here
            ],
            "correct": "",
            "incorrect": "" // no comma here
        },
        {// Question 3 - Multiple Choice, Single True Answer
            "q": "What is the effect of increasing the resistance in a series RC circuit? ",
            "a": [
                {"option": "There will be no effect at all", "correct": false},
                {"option": "The current will increase", "correct": false},
                {"option": "The input voltage will increase", "correct": false},
                {"option": " The phase shift will decrease", "correct": true} // no comma here
            ],
            "correct": "",
            "incorrect": "" // no comma here
        }
      
    ]
};


