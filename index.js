
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const historyDisplay = document.getElementById("history");
    const buttons = document.querySelectorAll(".btn button");
    let currentInput = "";
    let operator = "";
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.innerText;

            if (buttonText === "AC") {
                resetCalculator();
            } else if (buttonText === "DEL") {
                currentInput = currentInput.slice(0, -1);
                input.value = currentInput || "0";
            } else if (buttonText === "=") {
                if (firstOperand !== null && operator && currentInput) {
                    const secondOperand = parseFloat(currentInput);
                    const result = calculate(firstOperand, secondOperand, operator);
                    input.value = result;
                    updateHistory(firstOperand, secondOperand, operator, result);
                    resetCalculator(result);
                }
            } else if (["+", "-", "*", "/"].includes(buttonText)) {
                if (currentInput) {
                    firstOperand = parseFloat(currentInput);
                    operator = buttonText;
                    currentInput = "";
                }
            } else {
                currentInput += buttonText;
                input.value = currentInput;
            }
        });
    });

    function calculate(a, b, op) {
        switch (op) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return b !== 0 ? a / b : "Error";
            case "%":
                return a % b;
            default:
                return b;
        }
    }

    function updateHistory(a, b, op, result) {
        historyDisplay.innerText = `${a} ${op} ${b} = ${result}`;
    }

    function resetCalculator(result = null) {
        currentInput = "";
        operator = "";
        firstOperand = result;
        input.value = result !== null ? result : "0";
    }
});
