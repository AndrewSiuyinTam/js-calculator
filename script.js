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
let operands = [];
let operators = [];

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
function evaluate(expression){
    const stack = [];

  for (let token of expression) {
    console.log(token);
    let countOfOperandsInStack = stack.reduce((acc, val) => {
        if (typeof val === 'number') {
          acc++;
        }
        return acc;
      }, 0);
      if(!isNumber(token)){
        stack.push(token);
      }
    if (isNumber(token) || countOfOperandsInStack == 1) { // if token is an operand and there is only 1 operand in the stack [1+2]
      token = Number(token);
      const operator = stack.pop();
      const operand1 = stack.pop();
      stack.push(operate(operator, operand1, token));
      return stack.pop();
    } 
    // else if(isNumber(token) || countOfOperandsInStack == 0) { // if token is operator and there are2 operands already
    //   stack.push(Number(token));
    // };
    // else if(!isNumber(token)){
    //     stack.push(token);
    // }
  
}

}

// have an operand stack and an operator 
// as the user inputs something, add to the respective stack. Like 5 + 3 * 2(which should equal 11). operand stack = [5,3,2]. operator stack = [+]
// when the user hits equal
numbers_btns.forEach(element => {
        element.addEventListener('click',() =>{
        let value = element.value;
        operands.push(value);
        number_display.textContent+=value;
        
    })
});
operator_btns.forEach(element => {
    element.addEventListener('click',() =>{
        if(number_display.textContent == ''){

        }
        number_display.textContent += element.value;
        
    })
});

// have an ooperands stack and a operattors 
// when the user presses  =, then
equals.addEventListener('click',()=>{
    // const input = number_display.textContent;
    // console.log(input);
    // const input_split = input.split(expr);
    // let user_input = input_split.map(str => str.trim());
   
    // for( const oper of user_input){
    //     if(oper =='+' || oper == '-' || oper == '*' || oper == '/'){
    //         operators.push(oper);
    //     }
    //     else{
    //         operands.push(Number(oper));
    //     }

    //     } 
    // res = operate(operators.pop(),operands[0],operands[1]);
    // number_display.textContent = res;
    // operands = [res];
    // operators = [];
    // user_input = [];
    // console.log(res);
    }
    );
    clear.addEventListener('click',() => {
        clearCalculator()
    });
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
