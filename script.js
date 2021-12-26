const previousOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");

const clearButton = document.querySelector(".ac");
const deleteButton = document.querySelector(".del");
const equalsButton = document.querySelector(".equals");

const operations = document.querySelectorAll("[data-operation]");
const numbers = document.querySelectorAll("[data-number]");

class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
  }

  clear() {
    this.previousOperand.innerText = "";
    this.currentOperand.innerText = "";
  }

  delete() {
    let characters = this.currentOperand.innerText.split("");
    characters.pop();
    this.currentOperand.innerText = characters.join("");
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.innerText.includes(".")) return;
    this.currentOperand.innerText += number;
  }

  chooseOperation(operation) {
    if (this.currentOperand.innerText === "") return;
    this.previousOperand.innerText = `${this.currentOperand.innerText} ${operation}`;
    this.currentOperand.innerText = "";
  }

  compute() {
    if (
      this.previousOperand.innerText === "" ||
      this.currentOperand.innerText === ""
    )
      return;

    let computation;
    const operation = this.previousOperand.innerText.split("").at(-1);

    let previousOperandWithoutOeration;
    //remove the operation symbol out of previousOperand value to be ready for the computation,
    // for Example => 5461+ ==> 5461
    let previousOperand = this.previousOperand.innerText.split("");
    previousOperand.pop();
    previousOperandWithoutOeration = parseFloat(previousOperand.join(""));

    let currentOperand = parseFloat(this.currentOperand.innerText);

    switch (operation) {
      case "/":
        computation = previousOperandWithoutOeration / currentOperand;
        break;
      case "*":
        computation = previousOperandWithoutOeration * currentOperand;
        break;
      case "+":
        computation = previousOperandWithoutOeration + currentOperand;
        break;
      case "-":
        computation = previousOperandWithoutOeration - currentOperand;
        break;
    }

    this.previousOperand.innerText = "";
    this.currentOperand.innerText = computation;
  }
}

const calculator = new Calculator(previousOperand, currentOperand);

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
  });
});

operations.forEach((op) => {
  op.addEventListener("click", () => {
    calculator.chooseOperation(op.innerText);
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
});
