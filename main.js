const inputArr = [];
let op;
let opPressed = false;
let displayNum;


const display = document.querySelector(".number-display");
const numberButtons = document.querySelectorAll(".btn-num");
const operationButtons = document.querySelectorAll(".btn-operation");

const clearBtn = document.getElementById("btn-clear");
const deleteBtn = document.getElementById("btn-delete");
const equalBtn = document.getElementById("btn-equal");



// Give all num buttons event listeners
// Store input in variables
for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", () => {
        if (display.textContent === "0" || opPressed) {
            display.textContent = "";
            opPressed = false; // To not append string to 0, display string needs to be cleared -> ""
        }
        display.textContent += numberButtons[i].textContent; // Append pressed string value to value in display
        displayNum = parseFloat(display.textContent);
    })
}

// Give all operation buttons event listeners
for (let i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener("click", () => {
        op = operationButtons[i].textContent;
        if (inputArr.length < 2) {
            inputArr.push(displayNum);
            console.log(inputArr);
        } else if (inputArr.length > 1) {
            operate(inputArr[0], inputArr[1], op);
            inputArr.splice(0, inputArr.length);
            inputArr.push(parseFloat(display.textContent));
            console.table(inputArr);
        }
        opPressed = true;
    })
}

// [8, 2]
// Operate
// Push display value to input arr
// Splice 0
// [2, 10]

// Special buttons CLEAR , DELETE, EQUAL
clearBtn.addEventListener("click", () => {
    display.textContent = "0";
    inputArr.splice(0, inputArr.length);
    console.log(inputArr);
})

deleteBtn.addEventListener("click", () => {
    if (display.textContent !== "0") {
        const text = Array.from(display.textContent);
        text.pop();
        if (text.length == 0) {
            text.push("0");
        }
        display.textContent = text.join("");
        displayNum = parseFloat(display.textContent);
    }
})

equalBtn.addEventListener("click", () => {
    inputArr.push(displayNum);
        if (inputArr.length > 1) {
            operate(inputArr[0], inputArr[1], op);
            inputArr.splice(0, inputArr.length);
            inputArr.push(parseFloat(display.textContent));
            console.table(inputArr);
        }
    opPressed = true;
})


function operate(num1, num2, operator) {
    switch(operator) {
        case "+":
            add(num1, num2);
            break;
        case "−":
            substract(num1, num2);
            break;
        case "×":
            multiply(num1, num2);
            break;
        case "÷":
            divide(num1, num2);
            break;
        case "%":
            modulo(num1, num2);
            break;
    }
}

// Functions to calculate

function add(num1, num2) {
    display.textContent = (num1 + num2).toString();
}

function substract(num1, num2) {
    display.textContent = (num1 - num2).toString();
}

function multiply(num1, num2) {
    display.textContent = (num1 * num2).toString();
}

function divide(num1, num2) {
    display.textContent = (num1 / num2).toString();
}

function modulo(num1, num2) {
    display.textContent = (num1 % num2).toString();
}
