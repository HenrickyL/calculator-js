const display = document.querySelector(".value");
const history = document.getElementById("history");
const operationArray = ['+', '-', '/',];
const advancedOperationArray = [
    {display:'√', apply:`Math.sqrt`},
    {display:'Sin', apply:`Math.sin`},
    {display:'Cos', apply:`Math.cos`},
    {display:'Tan', apply:`Math.tan`},
];

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
    return operationArray.some(op => op === character) || 
        advancedOperationArray.some(op => op.display === character)
}

function inAdvancedOperation(character){
    return advancedOperationArray.some(op => op.display === character)
}

function clearDisplay(){
    if(display.classList.contains('error')){
        display.classList.toggle('error')
        display.classList.toggle('ok')
    }
    display.value = '0'
}

function deleteLast(){
    display.value = display.value.slice(0,-1)
}

function appendCharacter(character){
    if(getDisplayLast() === ')') return
    let result = character
    const strDisplay = getDisplay()
    if( strDisplay == '0' && character !== '.'){
        display.value = ''
    }
    display.value += result
}

function calculateResult() {
    try{

        let strDisplay = display.value

        if(strDisplay.includes('/0')) throw new Error('Division by zero Error')

        advancedOperationArray.forEach(op=>{
            if(strDisplay.includes(op.display)){
                strDisplay =  strDisplay.replace(op.display, op.apply)
            }
                
        })
        const result = eval(strDisplay);
        calculationHistory.push(`${display.value} = ${result}`);
        display.value = result;
        updateHistory();
    }catch(err){
        display.classList.toggle('error')
        display.classList.toggle('ok')

        display.value = err
    }
}

function getOperationFormat(op){
    calculateResult()
    return `${op}(${display.value})`
}


function appendOperation(op){
    const last = getDisplayLast()
    if((!isOperation(last)) && last !== '.'){
        if(inAdvancedOperation(op)){
            display.value = getOperationFormat(op)
        }else{
            if(!(last === '*' && op !== '*'))
            display.value += op
        }
    }
}
