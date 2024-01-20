const display = document.querySelector(".value");
const history = document.getElementById("history");
const operationArray = ['+', '-', '/', '^'];
let calculationHistory = [];

window.addEventListener('load', () => {
  display.value = '0';
});

function updateHistory() {
    history.value = calculationHistory.join('\n');
    history.scrollTop = history.scrollHeight;  // Scroll to the bottom
  }

function getDisplay(){
    return display.value
}

function getDisplayLast(){
    const len = display.value.length
    return display.value[len-1]
}

function isOperation(character){
    return operationArray.some(op => op === character)
}

function clearDisplay(){
    display.value = '0'
}

function deleteLast(){
    display.value = display.value.slice(0,-1)
}

function appendCharacter(character){
    let result = character
    if(getDisplay() == '0' ){
        display.value = ''
    }
    display.value += result
}

    function calculateResult() {
      const result = eval(display.value);
      calculationHistory.push(`${display.value} = ${result}`);
      display.value = result;
      updateHistory();
    }


function appendOperation(op){
    if(!isOperation(getDisplayLast())){
        display.value += op
    }
}
