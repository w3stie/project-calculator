document.addEventListener('DOMContentLoaded',function (){
    const numberButtons = document.querySelectorAll('[data-number]')
    const currentOperand = document.querySelector('[data-current-operand]')
    const previousOperand = document.querySelector('[data-previous-operand]')
    const signsButtons = document.querySelectorAll('[data-sign]')
    const deleteButton = document.querySelector('[data-delete]')
    const clearButton = document.querySelector('[data-all-clear]')
    const equalsButton = document.querySelector('[data-equals]')

    function add(firstNumber, secondNumber){
        let sum = firstNumber + secondNumber
        return sum
    }

    function subtract(firstNumber, secondNumber){
        let difference = firstNumber - secondNumber
        return difference
    }

    function multiply(firstNumber, secondNumber){
        let product = firstNumber * secondNumber
        return product
    }

    function divide(firstNumber, secondNumber){
        if (secondNumber === 0){
            alert("Syntax Error")
        }
        let quotient = firstNumber / secondNumber
        return quotient
    }

    let firstNumber =  '';
    let secondNumber = '';
    let operator = null;
    let currentInput = '';

    signsButtons.forEach(button => {
        button.addEventListener('click', function(){
            operator = button.textContent
            firstNumber = parseFloat(currentOperand.textContent);  // Assume currentOperand is where the current number is shown
            previousOperand.textContent = `${firstNumber} ${operator}`;  // Display it in previousOperand
            currentOperand.textContent = '';  // Clear current operand for new input
        });
    });

    equalsButton.addEventListener('click', function(){
            secondNumber = parseFloat(currentOperand.textContent)
            const result = operate(firstNumber, operator, secondNumber)
            previousOperand.textContent = `${firstNumber} ${operator} ${secondNumber} =`
            currentOperand.textContent = result;
    });

    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentInput = button.textContent;
            updateDisplay(currentInput);
        });
    });

    function updateDisplay(value){
        currentOperand.textContent += value;
    }

    function operate (firstNumber, operator, secondNumber){
        let result;
        switch (operator){
            case '+':
                return add(firstNumber, secondNumber)
            case '-':
                return subtract(firstNumber, secondNumber)
            case '*':
                return multiply(firstNumber, secondNumber)
            case '/':
                return divide(firstNumber, secondNumber)
            default:
            console.log('Invalid operator');
            return '';
        }
    }
});