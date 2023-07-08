const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_currentOperand) || isNaN(_previousOperand)) return;

    switch (this.operator) {
      case "+":
        result = _currentOperand + _previousOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operator = undefined;
    this.previousOperand = "";
  }
  chooseOperator(operator) {
    if (this.currentOperand === "") return;
    if (this.previousOperand != "") {
      this.calculate();
    }
    this.operator = operator;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
  }
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.previousOperand} ${
      this.operator || ""
    }`;
    this.currentOperandTextElement.innerText = `${this.currentOperand}`;
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});
for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}
for (const operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", () => {
    calculator.chooseOperator(operatorButton.innerText);
    calculator.updateDisplay();
  });
}
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
