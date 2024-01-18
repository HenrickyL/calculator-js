

const display = document.getElementById('display')
const operationArray = ['+','-','*','/']
let calculationHistory = [];
window.addEventListener('load',()=>{
    display.textContent = 0
})

function getDisplay(){
    return display.textContent
}

function getDisplayLast(){
    const len = display.textContent.length
    return display.textContent[len-1]
}

function updateHistory() {
    history.innerHTML = calculationHistory.map((calculation, index) => `<div key=${index}>${calculation}</div>`).join('');
}

function isOperation(character){
    return operationArray.some(op => op === character)
}

function clearDisplay(){
    display.textContent = '0'
}

function deleteLast(){
    display.textContent = display.textContent.slice(0,-1)
}

function appendCharacter(character){
    let result = character
    if(getDisplay() == '0' ){
        display.textContent = ''
    }
    display.textContent += result
}


function calculateResult(){
    const result = eval(display.textContent)
    calculationHistory.push(`${display.textContent} = ${result}`);
    display.textContent = result
    updateHistory();
}


function appendOperation(op){
    if(!isOperation(getDisplayLast())){
        display.textContent += op
    }
}
