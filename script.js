
let empty = "";
let operand1 = empty;
let operand2 = empty;
let operator = empty;
let active_operator = false;
let screen = document.querySelector(".text");
let clear = document.querySelector(".clear");
let get_ans = document.querySelector(".get_ans");
let back = document.querySelector(".back");
let not_expecting_digit = false;
let dot = false;
let obj = {
    operand1: "",
    operand2: "",
    operator: "",
    active_operator: false,
    not_expecting_digit: false,
    dot: false
}
let persistent = [];


function check_point() {
    let obj1 = {
        operand1: operand1,
        operand2: operand2,
        operator: operator,
        active_operator: active_operator,
        not_expecting_digit: not_expecting_digit,
        dot: dot
    }
    persistent.push(obj1);
}
check_point();

function evaluate(op1, op, op2) {
    if (op == '+') {
        return op1 + op2;
    }
    else if (op == '-') {
        return (op1) - (op2);
    }
    else if (op == '*') {
        return (op1 * op2);
    }
    else {
        return (op1 / op2);
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

function fix_check_point() {
    persistent = [];
    check_point();
}

function handle_digit(char) {
    if (!active_operator) {
        if (not_expecting_digit) {
            clear_screen();
            dot = false;
            operand1 = "";
            not_expecting_digit = false;
            if (char == '.') dot = true;
            operand1 += char;
            fix_check_point();
            add_to_screen(char);
            return true;
        }
        if (char == '.' && dot) { alert("can't use 2 dots in one number"); return false; }
        operand1 += (char);
        if (char == '.') dot = true;
    }
    else {
        if (char == '.' && dot) { alert("can't use 2 dots in one number"); return false; }
        operand2 += (char);
        if (char == '.') dot = true;
    }

    add_to_screen(char);
    return true;
}

function check_valid() {
    if ((operand1 === empty) || (operand1 === '-') || (operand1 === '.') || (operand2 === empty) || (operand2 === '-') || (operand2 === '.') || (operator === empty)) return false;
    return true;
}

function handle_operator(char) {
    if (active_operator) {
        if (!check_valid() && (char != '-' || operand2 == "-")) { alert('wrong input format please stick to x+y format only'); return false; }
        else if (!check_valid()) {
            // clear_screen();
            operand2 = "-";
            add_to_screen(char);
            return true;
        }

        operand1 = evaluate(+operand1, operator, +operand2);
        if ((+operand1) % 1 != 0) operand1 = (+operand1).toFixed(3);
        fix_check_point();

        clear_screen();
        add_to_screen(operand1 + char);
        dot = false;
        operator = char;
        operand2 = empty;
    }
    else {
        if (operand1 === empty && char != '-') { alert('wrong input format please stick to x+y format only'); return false; }
        else if (operand1 == empty) {
            operand1 = "-";
            add_to_screen(char);
            return true;
        }
        add_to_screen(char);
        active_operator = true;
        dot = false;
        operator = char;
    }
    return true;
}

digit_list.forEach(digit => {
    digit.addEventListener("click", function (e) { if (handle_digit(digit.textContent)) { check_point(); } });
})

operator_list.forEach(digit => {
    digit.addEventListener("click", function (e) { if (handle_operator(digit.textContent)) { check_point(); } });
})

clear.addEventListener("click", function () {
    clear_screen();
    operand1 = operand2 = operator = empty;
    active_operator = false;
    dot = false;
    not_expecting_digit = false;
    persistent = [];
    persistent.push(obj);
})

get_ans.addEventListener("click", function () {

    if (!check_valid()) { alert('wrong input format please stick to x+y format only'); return; }
    operand1 = evaluate(+operand1, operator, +operand2);
    if ((+operand1) % 1 != 0) operand1 = (+operand1).toFixed(3);

    clear_screen();
    add_to_screen(operand1);
    active_operator = false;
    operator = empty;
    operand2 = empty;
    not_expecting_digit = true;
    dot = false;
    persistent = [];
    check_point();
})

back.addEventListener("click", function () {
    if (persistent.length == 1) return;
    persistent.pop();
    operand1 = persistent[persistent.length - 1].operand1;
    operand2 = persistent[persistent.length - 1].operand2;
    operator = persistent[persistent.length - 1].operator;
    active_operator = persistent[persistent.length - 1].active_operator;
    not_expecting_digit = persistent[persistent.length - 1].not_expecting_digit;
    dot = persistent[persistent.length - 1].dot;
    let text = screen.textContent;
    text = text.slice(0, -1);
    clear_screen();
    add_to_screen(text);
})
