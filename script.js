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

    
    // Event listener for operator buttons
    signsButtons.forEach(button => {
        button.addEventListener('click', function(){
            operator = button.textContent
            firstNumber = parseFloat(currentOperand.textContent);  // Assume currentOperand is where the current number is shown
            previousOperand.textContent = `${firstNumber} ${operator}`;  // Display it in previousOperand
            currentOperand.textContent = '';  // Clear current operand for new input
        });
    });

    
    // Event listener for equals button
    equalsButton.addEventListener('click', function() {
        secondNumber = parseFloat(currentOperand.textContent);

        // First, check if no second number has been entered
        if (isNaN(secondNumber)) {
            if (!isNaN(firstNumber) && operator) {
                // If there is only a first number and operator, leave them on the display
                previousOperand.textContent = `${firstNumber} ${operator}`;
                currentOperand.textContent = '';  // Clear current operand to indicate awaiting second number
                // Do not reset the operator here; await further number input
                return; // Exit the function to avoid further checks
            } else if (!operator && !isNaN(firstNumber)) {
                // If no operator and only first number is there, show the first number as the result again
                currentOperand.textContent = firstNumber;
                previousOperand.textContent = '';
                // Reset the operator and first number
                operator = null;
                firstNumber = undefined;
                return; // Exit the function after handling
            } else {
                alert("Error: No valid input to calculate");
                clearCalculator();
                return;
            }
        }

        // If both numbers and operator are available for operation
        if (!isNaN(firstNumber) && !isNaN(secondNumber) && operator) {
            // Perform the operation
            let result = operate(firstNumber, operator, secondNumber);

            // Check for division by zero
            if (isNaN(result)) {
                alert("Error: Division by zero");
                clearCalculator();
            } else {
                // Round the result to 4 decimal places
                result = Number(result.toFixed(4));
                // Display the result
                previousOperand.textContent = `${firstNumber} ${operator} ${secondNumber}`;
                currentOperand.textContent = result;
            }
        }

        // Optionally reset operator and second number here to prepare for next operation
        operator = null;
        secondNumber = undefined;
    });

    // Function to clear the calculator state and display
    function clearCalculator() {
        firstNumber = '';
        secondNumber = '';
        operator = null;
        currentOperand.textContent = '';
        previousOperand.textContent = '';
    }

    // Select the number buttons and attach event listeners
    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Append the clicked number to the current operand
            currentInput = button.textContent;
            updateDisplay(currentInput);
        });
    });

    clearButton.addEventListener('click', function(){
        previousOperand.textContent = '';
        operator = '';
        currentOperand.textContent = '';
    })

    deleteButton.addEventListener('click', function(){
        if (currentOperand.textContent.length > 0) {
            // Delete from current operand if it's not empty
            currentOperand.textContent = currentOperand.textContent.toString().slice(0, -1);
        } else if (previousOperand.textContent.length > 0) {
            // Handle case when currentOperand is empty but previousOperand is not
            if (operator && currentOperand.textContent === '') {
                // If there is an operator set, assume user is backspacing into previous operand/operator
                operator = null; // Clear the operator
                currentOperand.textContent = previousOperand.textContent.toString().slice(0, -1);
                previousOperand.textContent = ''; // Clear previous operand if it was part of a previous result
            } else {
                // Directly slice the previous operand
                previousOperand.textContent = previousOperand.textContent.toString().slice(0, -1);
            }
        }
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
            case '÷':
                return divide(firstNumber, secondNumber)
            default:
            console.log('Invalid operator');
            return '';
        }
    }
});