document.getElementById("evaluate").onclick = function () {
    mathEval(document.getElementById("equation").value);
}
function mathEval(expt) {
   
    function isMatchingPair(character1, character2) {
        if (character1 == '(' && character2 == ')')
            return 1;
        else if (character1 == '{' && character2 == '}')
            return 1;
        else if (character1 == '[' && character2 == ']')
            return 1;
        else
            return 0;
    }   
    var my;
    function areParenthesisBalanced(exp) {
      /* Declare an empty character stack */
        stack = [];
        /* Traverse the given expression to check matching parenthesis */
        for (var i = 0, len = exp.length; i < len; i++) {
            /*If the exp[i] is a starting parenthesis then push it*/
            if (exp[i] == '{' || exp[i] == '(' || exp[i] == '[') {
                stack.push(exp[i]);
            }
            /* If exp[i] is a ending parenthesis then pop from stack and 
                check if the popped parenthesis is a matching pair*/
            if (exp[i] == '}' || exp[i] == ')' || exp[i] == ']') {
                /*If we see an ending parenthesis without a pair then return false*/
                if (stack == null) {
                    return 0;
                }
                    /* Pop the top element from stack, if it is not a pair 
                       parenthesis of character then there is a mismatch.
                       This happens for expressions like {(}) */
                else if ( !isMatchingPair(stack.pop(), exp[i]))
                { return 0; }
            }            
        }
        my = stack;
        /* If there is something left in expression then there is a starting
           parenthesis without a closing parenthesis */
        if (stack == "")
            return 1; /*balanced*/
        else
            return 0;  /*not balanced*/
    }

    valid = areParenthesisBalanced(expt);

    if (!valid)
        document.getElementById("result").innerText = "Invalid arithmetic expression";
    else if (valid) {
       
        var res = expt.split("=");
        var first = res[0];
        var second = res[1];
        if (second == null) {
            document.getElementById("result").innerText = "Equation is not complete!";
        } else {
            var Equation = algebra.Equation;
            var x1 = algebra.parse(first);
            var x2 = algebra.parse(second);
            var eq = new Equation(x1, x2);
            try{
                var answer = eq.solveFor("x");
                document.getElementById("result").innerText = "x = " + answer.toString();
            }
            catch(e){
                document.getElementById("result").innerText = eq;
            }
        }
    }
}