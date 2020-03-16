function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
 //   console.log(expr);

    function oper(oper, a, b) {		// простой калькулятор
        if (oper === '+') {
            return +a + +b;
        } else if (oper === '-') {
            return +a - +b;
        } else if (oper === '*') {
            return +a * +b;
        } else if (oper === '/') {
            return +a / +b;
        }
    }
    for (let elem of expr) {					// очистка от пробелов
        if (elem === ' ') {
            expr = expr.replace((' '), '');
        }
    }
//console.log(expr);

    if (expr.includes('/0')) {					// проверка деления на 0 в лоб
        return 'TypeError: Division by zero.';
    }

    let openBrecetsCount = 0;				// проверка парности скобок
    let closeBrecetsCount = 0;

    for (let elem of expr) {
        if (elem === '(') {
            openBrecetsCount++;
        } else if (elem === ')') {
            closeBrecetsCount++;
        }
    }
    if (openBrecetsCount !== closeBrecetsCount) {
        return 'ExpressionError: Brackets must be paired';
    }

    let numbers = expr.split(/[+-/()*_]/).filter(item => item != '');  // цифры в массив

//    console.log('числа', numbers);

    let operators = [];						// операторы в массив
    for (let elem of expr) {
        if (elem === '+' || elem === '-' || elem === '*' || elem === '/' || elem === '(' || elem === ')') {
            operators.push(elem);
        }
    }
 //   console.log('операторы', operators);

    let operatorPriority = [];				// приоритет операторов
    for (let elem of operators) {
        if (elem === '+' || elem === '-') {
            operatorPriority.push(0);
        } else if (elem === '*' || elem === '/') {
            operatorPriority.push(1);
        }
    }
//    console.log('приоритет операторов', operatorPriority);


    let allElements = [];  							// все элементы
    for (let i = 0; i < expr.length; i++) {
        if (isNaN(expr[i])) {
            allElements.push(expr[i]);
        } else if ((!isNaN(expr[i]) && isNaN(expr[i - 1])) || (i === 0) && !isNaN(expr[i])) {
            allElements.push(expr[i]);
        } else if (!isNaN(expr[i])) {
            allElements[allElements.length - 1] += expr[i];
        }
    }
//    console.log('все элементы', allElements);


    let result = 0;						// простое вычисление по порядку (без приоритетов)
    for (let i = 0; i < numbers.length - 1; i++) {
        if (i === 0) {
            result += oper(operators[i], numbers[i], numbers[i + 1])
        } else {
            result = oper(operators[i], result, numbers[i + 1])
        }
    //    console.log(i, 'result', result);
    }

    if (operatorPriority.includes(0) && operatorPriority.includes(1)) {
        operatorPriority.indexOf(1);  // находим номер первого приоритетного в массиве приоритетов
        operators[operatorPriority.indexOf(1)];		// находим его значение
        let indexOfFindedOperator = allElements.indexOf(operators[operatorPriority.indexOf(1)]); // находим его номер в общем массиве
        allElements.splice((indexOfFindedOperator - 1), 3);
    //    console.log(allElements);

    //    console.log('первый приоритет', allElements.indexOf(operators[operatorPriority.indexOf(1)]));
    }


    return result;
}

module.exports = {
    expressionCalculator
}