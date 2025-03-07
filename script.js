// declaring variables
let firstNumber = ""; // initializes an empty string for the first number input
let secondNumber = ""; // initializes an empty string for the second number input
let currentOperator = ""; // initializes an empty string for the current operator
let shouldResetDisplay = false; // flag to determine if the display should be reset

// selecting elements from the dom
const display = document.getElementById("display"); // gets the display element where numbers and results are shown
const numberButtons = document.querySelectorAll(".number"); // selects all elements with the "number" class (number buttons)
const operatorButtons = document.querySelectorAll(".operator"); // selects all elements with the "operator" class (operator buttons)
const equalsButton = document.getElementById("equals"); // gets the "equals" button element
const clearButton = document.getElementById("clear"); // gets the "clear" button element
const backspaceButton = document.getElementById("backspace"); // gets the "backspace" button element
const decimalButton = document.getElementById("decimal"); // gets the "decimal" button element

// defining the math functions
function add(a, b) { return a + b; } // function to add two numbers
function subtract(a, b) { return a - b; } // function to subtract two numbers
function multiply(a, b) { return a * b; } // function to multiply two numbers
function divide(a, b) { return b === 0 ? "Error" : a / b; } // function to divide two numbers with error handling for division by zero

// operating function using switch statement since everything is the same group
function operate(operator, num1, num2) { // function to perform the operation based on the operator
    num1 = parseFloat(num1); // convert num1 to a floating point number
    num2 = parseFloat(num2); // convert num2 to a floating point number
    let result;

    switch (operator) { // switch based on the operator
        case "+":
            result = add(num1, num2); // calls the add function for "+" operator
            break; // to end processing
        case "-":
            result = subtract(num1, num2); // calls the subtract function for "-" operator
            break; // to end processing
        case "*":
            result = multiply(num1, num2); // calls the multiply function for "*" operator
            break; // to end processing
        case "/":
            result = divide(num1, num2); // calls the divide function for "/" operator
            break; // to end processing
        default:
            result = num2; // if no operator is provided, returns the second number
            break; // to end processing
    }

    // if the result is a number, format it to two decimal places
    if (typeof result === 'number') {
        result = result.toFixed(2); // formats result to 2 decimal places
    }

    return result; // returns the result in correct form
}

// display update function
function updateDisplay(value) { // function to update the display with a given value
    display.textContent = value; // sets the display text to the given value
}

// clear button to reset the function
function resetDisplay() { // function to reset the display to its initial state
    display.textContent = "0"; // sets the display to "0"
    firstNumber = ""; // clears the first number
    secondNumber = ""; // clears the second number
    currentOperator = ""; // clears the operator
}

// handling number button clicks
function handleNumberClick(event) { // function to handle clicks on number buttons
    if (shouldResetDisplay) { // if the display should be reset
        display.textContent = ""; // clears the display
        shouldResetDisplay = false; // resets the flag
    }

    if (display.textContent === "0") { // if the display is currently showing "0"
        display.textContent = event.target.dataset.num; // sets the display to the clicked number
    } else { // otherwise, append the clicked number to the display
        display.textContent += event.target.dataset.num; // appends the clicked number to the current display value
    }
}

// handling operator button clicks
function handleOperatorClick(event) { // function to handle clicks on operator buttons
    if (currentOperator !== "") { // if there's already an operator selected
        secondNumber = display.textContent; // set the second number to the current display value
        display.textContent = operate(currentOperator, firstNumber, secondNumber); // perform the operation
        firstNumber = display.textContent; // set the first number to the result
    } else { // if no operator is selected
        firstNumber = display.textContent; // set the first number to the current display value
    }

    currentOperator = event.target.dataset.op; // set the current operator to the clicked operator
    shouldResetDisplay = true; // flag to reset the display after the operator is clicked
}

// handling equals click
function handleEqualsClick() { // function to handle the click on the equals button
    if (currentOperator === "" || shouldResetDisplay) return; // if there's no operator or the display should be reset, do nothing

    secondNumber = display.textContent; // set the second number to the current display value
    display.textContent = operate(currentOperator, firstNumber, secondNumber); // perform the operation and update the display with the result
    firstNumber = display.textContent; // set the first number to the result
    currentOperator = ""; // reset the operator
    shouldResetDisplay = true; // flag to reset the display after the result is shown
}

// handling clear button
function handleClear() { // function to handle the clear button click
    resetDisplay(); // reset the display and numbers
}

// handling backspace so the screen shows 0 after reset and not just a blank screen
function handleBackspace() { // function to handle the backspace button click
    if (display.textContent.length > 1) { // if the display has more than one character
        display.textContent = display.textContent.slice(0, -1); // remove the last character
    } else { // if the display has only one character
        display.textContent = "0"; // reset the display to "0"
    }
}

// handling decimal button so only one can be added
function handleDecimal() { // function to handle the decimal button click
    if (!display.textContent.includes(".")) { // if the display doesn't already contain a decimal point
        display.textContent += "."; // append a decimal point to the display
    }
}

// add event listeners for each button
numberButtons.forEach(button => button.addEventListener("click", handleNumberClick)); // number buttons
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick)); // operator buttons
equalsButton.addEventListener("click", handleEqualsClick); // equals button
clearButton.addEventListener("click", handleClear); // clear button
backspaceButton.addEventListener("click", handleBackspace); // backspace button
decimalButton.addEventListener("click", handleDecimal); // decimal button
