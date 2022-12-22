const numbers = document.querySelectorAll('.number-button');
const numbers_btns = Array.from(numbers);
const operatorClass = document.querySelectorAll('.operator');
const operator_btns = Array.from(operatorClass);
let number_display = document.querySelector('.user-input');
let display = number_display.textContent;
const expr = new RegExp("(?<=[-+*/])|(?=[-+*/])")  
let res =  0;
const equals = document.getElementById('=');
const clear = document.getElementById('clear');
const delete_btn = document.getElementById('delete');
let operands = [];
let operators = [];
let pressedEqual = false;

const add = (a,b) => {
    return a + b;
}
const subtract = (a,b) => {
    return a - b;
}
const multiply = (a,b) => {
    return a * b;
}
const divide = (a,b) => {
    return a / b;
}
const operate = (operator,num1,num2) => {
    if(operator == '+'){
        return add(num1,num2);
    }
    else if(operator == '-'){
        return subtract(num1,num2);
    }
    else if(operator == '*'){
        return multiply(num1,num2);
    }
    else if(operator == '/'){
        return divide(num1,num2);
}
}
// 8 * 6 - 3 WORKS
// 8 + 6 - 3 WORKS
// 8 - 6 - 3 WORKS
function evaluate(expression){
    let stack = [];

  for (let token of expression.split(/(\d+)/)) {

    let countOfOperandsInStack = stack.reduce((acc, val) => { // count number of operandss
        if (isNumber(val)) {
          acc++;
        }
        return acc;
      }, 0);
    
      if(!isNumber(token) && countOfOperandsInStack == 0){
        stack.push(token);
      }
      if(isNumber(token) && countOfOperandsInStack == 0){ // the first number the user enters
        stack.push(token);
      }
     else if(isNumber(token) && countOfOperandsInStack == 1){// second number in the system
        token = Number(token);
        const operator = stack.pop();
        const operand1 = stack.pop();
        stack.push(operate(operator, Number(operand1), token));
        stack = [stack.pop()];
      }
      else if(!isNumber(token) && countOfOperandsInStack == 1){     // there is already a number in the system and there is another operation now.
        stack.push(token);
       
}

console.log(stack);
}
return stack[0];
}
// have an operand stack and an operator 
// as the user inputs something, add to the respective stack. Like 5 + 3 * 2(which should equal 11). operand stack = [5,3,2]. operator stack = [+]
// when the user hits equal
numbers_btns.forEach(element => {
        element.addEventListener('click',() =>{
         if(pressedEqual){
            clearCalculator();
            pressedEqual = false;
         }
        let value = element.value;
        operands.push(value);
        number_display.textContent = number_display.textContent+ value;
        
    })
});
operator_btns.forEach(element => {
    element.addEventListener('click',() =>{
        if(number_display.textContent == ''){

        }
        number_display.textContent = number_display.textContent+ element.value;
        
    })
});

// have an ooperands stack and a operattors 
// when the user presses  =, then
equals.addEventListener('click',()=>{
    pressedEqual = true;
   let finalResult = evaluate(number_display.textContent);
   if(finalResult == 'Infinity'){
    number_display.textContent = 'ERROR! Cannot divide by ZERO!';
   
   }
   else{
    number_display.textContent = finalResult.toFixed(4);

   }

    }
    );
    clear.addEventListener('click',() => {
        clearCalculator()
    });
    delete_btn.addEventListener('click',() => {
        let newStr = number_display.textContent;
        let newStrSub = newStr.substring(0,newStr.length-1);
        number_display.textContent = newStrSub;
    })
    function clearCalculator(){
        res = 0
        number_display.textContent = '';
        operands = [];
        operators = [];
    }
    function isNumber(token) {
        return !isNaN(parseInt(token, 10));
      }

      

    // do work on the stack
    // number_display.textContent = eval(number_display.textContent)
    // console.log(eval(number_display.textContent)); cant use this!! Eval() poses huge security risks
