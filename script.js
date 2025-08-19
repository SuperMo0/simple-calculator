
let empty = Number.MIN_SAFE_INTEGER;
let operand1 = empty;
let operand2 = empty;
let operator = '';
let active_operator = false;
let screen = document.querySelector(".text");
let clear = document.querySelector(".clear");
let get_ans = document.querySelector(".get_ans");
let not_expecting_digit = false;



function evaluate(op1, op, op2) {
    if (op == '+') {
        return +op1 + +op2;
    }
    else if (op == '-') {
        return (+op1) - (+op2);
    }
    else if (op == '*') {
        return (+op1 * +op2);
    }
    else {
        return (+op1 / +op2);
    }
}

function add_to_screen(character) {
    screen.textContent += character;
}
function clear_screen() {
    screen.textContent = "";
}

let digit_list = document.querySelectorAll(".digit");
let operator_list = document.querySelectorAll(".operator");

function handle_digit(char) {
    if (!active_operator) {
        if (operand1 == empty) operand1 = 0;
        else if (not_expecting_digit) {
            clear_screen();
            operand1 = 0;
            not_expecting_digit = false;
        }
        operand1 *= 10;
        operand1 += (+char);
    }
    else {
        if (operand2 == empty) operand2 = 0;
        operand2 *= 10;
        operand2 += (+char);
    }
    add_to_screen(char);
}
function check_valid() {
    if (operand1 == empty || operand2 == empty || operator == empty) return false;
    return true;
}

function handle_operator(char) {
    if (active_operator) {
        if (!check_valid()) { alert('wrong input format please stick to x+y format only'); return; }
        operand1 = evaluate(operand1, operator, operand2);
        clear_screen();
        add_to_screen(operand1 + char);
        operand2 = empty;
        operator = char;
    }
    else {
        add_to_screen(char);
        active_operator = true;
        operator = char;
    }
}

digit_list.forEach(digit => {
    digit.addEventListener("click", function (e) { handle_digit(digit.textContent) });
})

operator_list.forEach(digit => {
    // console.log(digit.textContent);
    digit.addEventListener("click", function (e) { handle_operator(digit.textContent) });
})


clear.addEventListener("click", function () {
    clear_screen();
    operand1 = operand2 = operator = empty;
    active_operator = false;
})

get_ans.addEventListener("click", function () {
    if (!check_valid()) { alert('wrong input format please stick to x+y format only'); return; }
    operand1 = evaluate(operand1, operator, operand2);
    clear_screen();
    add_to_screen(operand1);
    active_operator = false;
    operator = empty;
    operand2 = empty;
    not_expecting_digit = true;
})











