const inputArr = [];
let op;
let opPressed = false;
let justOperated = false;
let displayNum;


const display = document.querySelector(".number-display");
const allButtons = document.querySelectorAll("button"); // Only use to lose focus with blur()
const numberButtons = document.querySelectorAll(".btn-num");
const operationButtons = document.querySelectorAll(".btn-operation");

const clearBtn = document.getElementById("btn-clear");
const deleteBtn = document.getElementById("btn-delete");
const equalBtn = document.getElementById("btn-equal");

/* **** FUNCTIONALITY OF CALCULATOR **** */

// Give all num buttons event listeners
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
        inputArr.push(parseFloat(display.textContent));
        if (inputArr.length > 1) {
            operate(inputArr[inputArr.length - 2], inputArr[inputArr.length - 1], op);
            displayNum = parseFloat(display.textContent);
            inputArr.push(displayNum);
            let inp1 = inputArr.splice(0, 2);
            console.log(inp1);
        }
        
        console.table(inputArr);
        opPressed = true;
    })
}

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
    inputArr.push(parseFloat(display.textContent));
    if (inputArr.length > 1) {
        operate(inputArr[inputArr.length - 2], inputArr[inputArr.length - 1], op);
        let inp1 = inputArr.splice(0, 2);
        console.log(inp1);
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



/* **** MAKING THINGS INTERACTIVE **** */


// Remove focus from all buttons after 2.5 secs 
for (let i = 0; i < allButtons.length; i++) { 
    allButtons[i].addEventListener("click", () => {
        if (Array.from(display.textContent).length > 60) {
            display.style.fontSize = "45px";
            display.textContent = "...Really?!";
        }
        else if (Array.from(display.textContent).length > 42) {
            display.style.fontSize = "15px";
            display.style.paddingBottom = "15px";
        } else if (Array.from(display.textContent).length > 14) {
            display.style.fontSize = "20px";
            display.style.paddingBottom = "10px";
        } else if (Array.from(display.textContent).length > 9) {
            display.style.fontSize = "30px";
        } else {
            display.style.fontSize = "45px";
        }
    });
}