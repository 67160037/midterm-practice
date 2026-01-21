/* ========= Global Variables ========= */
let display = "0";
let operand1 = null;
let operand2 = null;
let operator = null;
let history = [];

/* ========= Utility ========= */
function updateDisplay() {
  document.getElementById("display").textContent = display;
}

/* ========= 1. Append Digit ========= */
// FIX: ป้องกัน leading zero
function appendDigit(digit) {
  if (display === "0" && digit === 0) return;

  if (display === "0") {
    display = String(digit);
  } else {
    display += digit;
  }
  updateDisplay();
}

/* ========= 2. Select Operator ========= */
// FIX: reset display เป็น ""
function selectOperator(op) {
  if (operator !== null) {
    calculate();
  }
  operand1 = Number(display);
  operator = op;
  display = "";
}

/* ========= 3. Decimal ========= */
function appendDecimal() {
  if (!display.includes(".")) {
    display = display === "" ? "0." : display + ".";
    updateDisplay();
  }
}

/* ========= 4. Calculate ========= */
// FIX: check division by zero
function calculate() {
  if (operator === null || display === "") return;

  operand2 = Number(display);

  if (operator === "÷" && operand2 === 0) {
    alert("Cannot divide by zero!");
    display = "0";
    updateDisplay();
    return;
  }

  let result;
  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "×":
      result = operand1 * operand2;
      break;
    case "÷":
      result = operand1 / operand2;
      break;
  }

  history.push(`${operand1} ${operator} ${operand2} = ${result}`);

  display = String(result);
  operator = null;
  operand1 = result;

  updateDisplay();
  updateHistoryDisplay();
}

/* ========= 5. Clear All ========= */
function clearAll() {
  display = "0";
  operand1 = null;
  operand2 = null;
  operator = null;
  updateDisplay();
}

/* ========= 6. History ========= */
function updateHistoryDisplay() {
  const historyDiv = document.getElementById("history-list");
  historyDiv.innerHTML = "";

  history
    .slice(-10)
    .reverse()
    .forEach((item) => {
      const div = document.createElement("div");
      div.textContent = "• " + item;
      historyDiv.appendChild(div);
    });
}

/* ========= Event Listeners ========= */
// Numbers
for (let i = 0; i <= 9; i++) {
  document
    .getElementById(`btn-${i}`)
    .addEventListener("click", () => appendDigit(i));
}

// Operators
document
  .getElementById("btn-add")
  .addEventListener("click", () => selectOperator("+"));
document
  .getElementById("btn-subtract")
  .addEventListener("click", () => selectOperator("-"));
document
  .getElementById("btn-multiply")
  .addEventListener("click", () => selectOperator("×"));
document
  .getElementById("btn-divide")
  .addEventListener("click", () => selectOperator("÷"));

// Others
document.getElementById("btn-decimal").addEventListener("click", appendDecimal);
document.getElementById("btn-equals").addEventListener("click", calculate);
document.getElementById("btn-clear").addEventListener("click", clearAll);

// Bonus: Keyboard Enter
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") calculate();
});
