
//sets up some default values and variables
var mode = "addition";
var correctcount= 0; //amount correct
var wrongcount= 0;//amount wrong
var historylist=[];

//these are for changing button colors, assigning the buttons to a variable.
let btnAdd= document.querySelector('#addition');
let btnsub= document.querySelector('#subtraction');
let btnmult= document.querySelector('#multiplication');

//these two are for the displaying history list
listContainer = document.createElement('div');
listContainer.id='listcontainer';
listElement = document.createElement('ul');

//ratio of correct answers. this is the default probably doesnt need to be here 
correctRatio=0;

//starts it off- this function calculates the numbers and answers
refreshQ();

//defualt for the correct answers and ratio
document.getElementById("count").innerHTML='Correct Answers: '+correctcount;
document.getElementById("ratio").innerHTML='ratio: '+correctRatio.toFixed(2);

//only "0-9" , "." , and "-" for inputs also enter key works as a button click
function validate(evt) { 
    var theEvent = evt || window.event;

    var key = theEvent.keyCode || theEvent.which;
    

    key = String.fromCharCode(key);
    if (theEvent.keyCode === 13) {
        answerButtonOnClick();
    }
    if (theEvent.keyCode === 190) {
        answerButtonOnClick();
    }
    var regex = /[0-9]|\.|-/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}
//for when the answer button is clicked -> also called when the enterkey is pressed
function answerButtonOnClick() {
    input=document.getElementById("userInput").value;
    answerTest();
};

//tests if users answer is correct, refreshed if correct and adds question to history. also counts correct/incorrect and calcs ratio
function answerTest() {
    if (input==qanswer){
        document.getElementById("userInput").value='';
        correctcount=correctcount+1;
        historylist.unshift((document.getElementById("question").innerHTML+' = '+qanswer));
        updatehistory(true);
        refreshQ();
    } else {
        wrongcount=wrongcount+1
    }
    correctRatio=correctcount/(wrongcount+correctcount);
    document.getElementById("count").innerHTML='Correct Answers: '+correctcount;
    document.getElementById("ratio").innerHTML='ratio: '+correctRatio.toFixed(2);

}

//calculates 2 random numbers based on limits from input/ changes button colors depending on mode and changes answer depending on mode
//can be called from starting program, getting correct answer, and changing mode.
function refreshQ() {
    var upperL = parseInt(document.getElementById("upperLimit").value)+1;
    var lowerL = parseInt(document.getElementById("lowerLimit").value);

    var qnumber1=Math.floor(Math.random() * (upperL-lowerL))+lowerL;
    var qnumber2=Math.floor(Math.random() * (upperL-lowerL))+lowerL;

    if (mode==="addition"){
        qanswer=qnumber1+qnumber2;
        document.getElementById("question").innerHTML = (qnumber1+' + '+qnumber2);

        btnAdd.style.backgroundColor='#337ab7';
        btnsub.style.backgroundColor='#00bcd4';
        btnmult.style.backgroundColor='#00bcd4';

    }
    if (mode==="subtraction"){
        qanswer=qnumber1-qnumber2;
        document.getElementById("question").innerHTML = (qnumber1+' - '+qnumber2);

        btnAdd.style.backgroundColor='#00bcd4';
        btnsub.style.backgroundColor='#337ab7';
        btnmult.style.backgroundColor='#00bcd4';

    }
    if (mode==="multiplication"){
        qanswer=qnumber1*qnumber2;
        document.getElementById("question").innerHTML = (qnumber1+' * '+qnumber2);

        btnAdd.style.backgroundColor='#00bcd4';
        btnsub.style.backgroundColor='#00bcd4';
        btnmult.style.backgroundColor='#337ab7';

    }
    qanswer=qanswer.toString()
}


//changes mode and refreshQ
const addButtonListeners= () => {
    ['addition','subtraction','multiplication'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('click', () =>{
            
            mode=id;
            refreshQ();

        });
    });
};

//updates and displays the history-
function updatehistory() {


    let listData = historylist,
    // Make a container element for the list
    
    // Make the list
    
    // Set up a loop that goes through the items in listItems one at a time
    
    listItem;
  

    // Add it to the page
    document.getElementsByTagName('body')[0].appendChild(listContainer);
    listContainer.appendChild(listElement);

    //limit the history display to 7
    if(listElement.childNodes.length>6){
        listElement.removeChild(listElement.lastElementChild);
    }

    // create an item for each one
    listItem = document.createElement('li');

    // Add the item text
    listItem.innerHTML = listData[0];

    // Add listItem to the listElement
    listElement.insertBefore(listItem,listElement.childNodes[0]);
    
}




//turns on the button listening for modes.
addButtonListeners();
