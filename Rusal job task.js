https://jsfiddle.net/do5mu9v3/176/
https://ifmo.su/js-modules

//Задание:
//разобрать строку с уравнением (не используя функции, например eval)
//Пользователь вводит строку содержащую функцию (например, 2x^2+3),
//выражение может содержать сложение, вычитание, умножение, деление, возведение в степень (степенью является целое положительное число), //скобки.
//Пользователь вводит значение переменной.
//Программа выдает результат.
//выполнить  на JavaScript
//и
// WPF приложение на С#.
// Оценивается внешний вид программы и исходный код.


//var r =Eval(exp);
//console.log('My result: '+ r);
//console.log('JS eval result: '+ eval(exp));


var app = function () {

    function Result(acc, rest) {
        this.acc = acc;
        this.rest = rest;
    };

    var Operator = {
        GetOperator: function (sign) {
            for (var i = 0; i < this.allowedOperators.length; i++) {
                if (this.allowedOperators[i].operatorChar === sign) {
                    return this.allowedOperators[i];
                }
            }
            return null;
        },

        IsOperator: function (char) {
            if (this.GetOperator(char) == null) {
                return false;
            }
            return true;
        },
        PerformOperator: function (operatorChar, operand1, operand2) {
            var op = this.GetOperator(operatorChar);
            var ev = op.func(operand1, operand2);
            return ev;
        },

        allowedOperators:
        [
            {
                operatorChar: '+',
                func: function (operand1, operand2) {
                    return operand1 + operand2;
                }
            },
            {
                operatorChar: '-',
                func: function (operand1, operand2) {
                    return operand1 - operand2;
                }
            },
            {
                operatorChar: '*',
                func: function (operand1, operand2) {
                    return operand1 * operand2;
                }
            },
            {
                operatorChar: '/',
                func: function (operand1, operand2) {
                    return operand1 / operand2;
                }
            },
            {
                operatorChar: '^',
                func: function (operand1, operand2) {
                    return Math.pow(operand1, operand2);
                }
            }
        ]
    }


    function IsDigit(s) {
        if (!isNaN(parseFloat(s)) && isFinite(s)) {
            return true;
        }
        return false;
    }

    function GetNextNumber(exp) {
        var isNegative = exp[0] === '-';
        var acc = '';
        var i = 0;
        if (isNegative) i = 1;
        do {
            acc = acc + exp[i];
            i = i + 1;
        } while (exp[i] === '.' || IsDigit(exp[i]))
        var rest = exp.substring(i);
        var result = new Result(parseFloat(acc), rest);
        if (isNegative) {
            result.acc = 0 - result.acc;
        }
        return result;
    }

    function Eval(exp) {
        if (exp[0] === '(') {
            var expInBrackets = '';
            i = 1;
            do {
                expInBrackets = expInBrackets + exp[i];
                i = i + 1;
            } while (exp[i] !== ')')
            var rest = exp.substring(i + 1);
            var acc = Eval(expInBrackets);
            var result = new Result(acc, rest);
        }
        else {
            var result = GetNextNumber(exp);
        }
        var sign = result.rest[0];
        if (Operator.IsOperator(sign)) {
            var rest = result.rest.substring(1);
            var eval = Eval(rest);
            result.acc = Operator.PerformOperator(sign, result.acc, eval);
        }
        return result.acc;
    }

    function extractVars(str) {
        var vars = [];
        for (var i = 0; i < str.length; i++) {
            if (!IsDigit(str[i]) && !Operator.IsOperator(str[i]) && str[i] !== '(' && str[i] !== ')') {
                if (vars.indexOf(str[i]) === -1) {
                    vars.push(str[i]);
                }
            }
        }
        return vars;
    };
    
    var initComponents = function(){
       var form = document.createElement("form");
       var input = document.createElement("input");
       input.setAttribute("placeholder", "Âûðàæåíèå");
       form.appendChild(input)
       document.body.appendChild(form);
    }
    
    var run = function(){
        initComponents();
        var exp = '2x^2+3y+45z+x+y+d';
        var vars = extractVars(exp);
        console.log(vars);
    };
    return {
        run: run
    };
}();
app.run();
