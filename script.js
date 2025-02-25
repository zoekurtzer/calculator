let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let shouldResetDisplay = false;

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const decimalButton = document.getElementById("decimal");

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Error" : a / b; }

function operate(operator, num1, num2) {
   num1 = parseFloat(num1);
   num2 = parseFloat(num2);
   switch (operator) {
       case "+": return add(num1, num2);
       case "-": return subtract(num1, num2);
       case "*": return multiply(num1, num2);
       case "/": return divide(num1, num2);
       default: return num2;
   }
}

function updateDisplay(value) {
   display.textContent = value;
}

function resetDisplay() {
   display.textContent = "0";
   firstNumber = "";
   secondNumber = "";
   currentOperator = "";
}

function handleNumberClick(event) {
   if (shouldResetDisplay) {
       display.textContent = "";
       shouldResetDisplay = false;
   }

   if (display.textContent === "0") {
       display.textContent = event.target.dataset.num;
   } else {
       display.textContent += event.target.dataset.num;
   }
}

function handleOperatorClick(event) {
   if (currentOperator !== "") {
       secondNumber = display.textContent;
       display.textContent = operate(currentOperator, firstNumber, secondNumber);
       firstNumber = display.textContent;
   } else {
       firstNumber = display.textContent;
   }

   currentOperator = event.target.dataset.op;
   shouldResetDisplay = true;
}

function handleEqualsClick() {
   if (currentOperator === "" || shouldResetDisplay) return;

   secondNumber = display.textContent;
   display.textContent = operate(currentOperator, firstNumber, secondNumber);
   firstNumber = display.textContent;
   currentOperator = "";
   shouldResetDisplay = true;
}

function handleClear() {
   resetDisplay();
}

function handleBackspace() {
   if (display.textContent.length > 1) {
       display.textContent = display.textContent.slice(0, -1);
   } else {
       display.textContent = "0";
   }
}

function handleDecimal() {
   if (!display.textContent.includes(".")) {
       display.textContent += ".";
   }
}

numberButtons.forEach(button => button.addEventListener("click", handleNumberClick));
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick));
equalsButton.addEventListener("click", handleEqualsClick);
clearButton.addEventListener("click", handleClear);
backspaceButton.addEventListener("click", handleBackspace);
decimalButton.addEventListener("click", handleDecimal);
