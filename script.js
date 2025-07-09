function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}
console.log("Basic arithmetic functions loaded successfully.");

// This code is for a simple form-based calculator  that performs basic arithmetic operations.
// var firstNumber, secondNumber, operation;

// function operate(operation, firstNumber, secondNumber) {
//   switch (operation) {
//     case "add":
//       return add(firstNumber, secondNumber);
//     case "subtract":
//       return subtract(firstNumber, secondNumber);
//     case "multiply":
//       return multiply(firstNumber, secondNumber);
//     case "divide":
//       try {
//         return divide(firstNumber, secondNumber);
//       } catch (error) {
//         alert(error.message);
//         return;
//       }
//     default:
//       alert("Please select a valid operation.");
//       return;
//   }
// }

// function calculate() {
//   const firstNumber = parseFloat(document.getElementById("firstNumber").value);
//   const secondNumber = parseFloat(
//     document.getElementById("secondNumber").value
//   );
//   const operation = document.getElementById("operation").value;

//   if (isNaN(firstNumber) || isNaN(secondNumber)) {
//     alert("Please enter valid numbers.");
//     return;
//   }

//   const result = operate(operation, firstNumber, secondNumber);
//   if (result !== undefined) {
//     document.getElementById("result").innerText = `Result: ${result}`;
//   }
// }

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

let currentInput = "";
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => handelButton(button.textContent));
});

function handelButton(value) {
  if (!isNaN(value) || value === ".") {
    appendNumber(value);
  } else if (value === "+" || value === "-" || value === "*" || value === "/") {
    setOperator(value);
  } else if (value === "=") {
    evaluate();
  } else if (value === "C") {
    clearAll();
  } else if (value === "←") {
    deleteLast();
  }
}

function appendNumber(value) {
  if (shouldResetDisplay) {
    currentInput = "";
    shouldResetDisplay = false;
  }

  if (value === "." && currentInput.includes(".")) return;
  currentInput += value;
  updateDisplay();
}

function setOperator(op) {
  if (currentOperator !== null) {
    evaluate();
  }
  firstOperand = currentInput;
  currentOperator = op;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  const result = operate(
    currentOperator,
    parseFloat(firstOperand),
    parseFloat(currentInput)
  );

  currentInput = (
    typeof result === "number" ? roundResult(result) : result
  ).toString();
  updateDisplay();

  firstOperand = null;
  currentOperator = null;
  shouldResetDisplay = true;
}

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function clearAll() {
  currentInput = "";
  firstOperand = null;
  currentOperator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  if (shouldResetDisplay) return;
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}
