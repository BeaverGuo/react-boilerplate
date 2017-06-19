/*In an interactive language such as Lisp, it is meaningless to speak of the value of an expression such as (+ x 1) without specifying any information about the environment that would provide a meaning for the symbol x (or even for the symbol +).

Now we will learn about procedure definitions, a much more powerful abstraction technique by which a compound operation can be given a name and then referred to as a unit.

Compound procedures are used in exactly the same way as primitive procedures. Indeed, one could not tell by looking at the definition of sum-of-squares given above whether square was built into the interpreter, like + and *, or defined as a compound procedure.

 For compound procedures, the application process is as follows:

* To apply a compound procedure to arguments, evaluate the body of the procedure with each formal parameter replaced by the corresponding argument.
To illustrate this process, let's evaluate the combination

(f 5)

where f is the procedure defined in section 1.1.4. We begin by retrieving the body of f:

(sum-of-squares (+ a 1) (* a 2))

Then we replace the formal parameter a by the argument 5:

(sum-of-squares (+ 5 1) (* 5 2))

Thus the problem reduces to the evaluation of a combination with two operands and an operator sum-of-squares. Evaluating this combination involves three subproblems. We must evaluate the operator to get the procedure to be applied, and we must evaluate the operands to get the arguments. Now (+ 5 1) produces 6 and(* 5 2) produces 10, so we must apply the sum-of-squares procedure to 6 and 10. These values are substituted for the formal parameters x and y in the body of sum-of-squares, reducing the expression to

(+ (square 6) (square 10))

If we use the definition of square, this reduces to

(+ (* 6 6) (* 10 10))

which reduces by multiplication to

(+ 36 100)

and finally to

136


The process we have just described is called the substitution model for procedure application. It can be taken as a model that determines the ``meaning'' of procedure application, insofar as the procedures in this chapter are concerned. However, there are two points that should be stressed:


* The purpose of the substitution is to help us think about procedure application, not to provide a description of how the interpreter really works. Typical interpreters do not evaluate procedure applications by manipulating the text of a procedure to substitute values for the formal parameters. In practice, the ``substitution'' is accomplished by using a local environment for the formal parameters. We will discuss this more fully in chapters 3 and 4 when we examine the implementation of an interpreter in detail.
* Over the course of this book, we will present a sequence of increasingly elaborate models of how interpreters work, culminating with a complete implementation of an interpreter and compiler in chapter 5. The substitution model is only the first of these models -- a way to get started thinking formally about the evaluation process. In general, when modeling phenomena in science and engineering, we begin with simplified, incomplete models. As we examine things in greater detail, these simple models become inadequate and must be replaced by more refined models. The substitution model is no exception. In particular, when we address in chapter 3 the use of procedures with ``mutable data,'' we will see that the substitution model breaks down and must be replaced by a more complicated model of procedure application.15


 An alternative evaluation model would not evaluate the operands until their values were needed. Instead it would first substitute operand expressions for parameters until it obtained an expression involving only primitive operators, and would then perform the evaluation. If we used this method, the evaluation of

(f 5)

would proceed according to the sequence of expansions

(sum-of-squares (+ 5 1) (* 5 2))

(+    (square (+ 5 1))      (square (* 5 2))  )

(+    (* (+ 5 1) (+ 5 1))   (* (* 5 2) (* 5 2)))

followed by the reductions


(+         (* 6 6)             (* 10 10))

(+           36                   100)

                    136



Lisp uses applicative-order evaluation, partly because of the additional efficiency obtained from avoiding multiple evaluations of expressions such as those illustrated with (+ 5 1) and (* 5 2) above and, more significantly, because normal-order evaluation becomes much more complicated to deal with when we leave the realm of procedures that can be modeled by substitution. On the other hand, normal-order evaluation can be an extremely valuable tool, and we will investigate some of its implications in chapters 3 and 4.16

The word predicate is used for procedures that return true or false, as well as for expressions that evaluate to true or false.


Notice that and and or are special forms, not procedures, because the subexpressions are not necessarily all evaluated.

Procedures must be effective.

As a case in point, consider the problem of computing square roots. We can define the square-root function as


This describes a perfectly legitimate mathematical function. We could use it to recognize whether one number is the square root of another, or to derive facts about square roots in general. On the other hand, the definition does not describe a procedure. Indeed, it tells us almost nothing about how to actually find the square root of a given number. It will not help matters to rephrase this definition in pseudo-Lisp:

(define (sqrt x)
  (the y (and (>= y 0)
              (= (square y) x))))


This only begs the question.

The contrast between function and procedure is a reflection of the general distinction between describing properties of things and describing how to do things, or, as it is sometimes referred to, the distinction between declarative knowledge and imperative knowledge.

scheme:
EDIT: In this manual:

	* http://www.gnu.org/software/mit-scheme/documentation/mit-scheme-user.pdf

section 7.5, it says:
When Edwin starts, it has one buffer: a REPL buffer called ‘*scheme*’. The command M-x replselects this buffer, if it exists; otherwise it creates a new REPL buffer. If you want two REPL buffers, just rename the ‘*scheme*’ buffer to something else and run M-x repl again.
You can use the following also (see section 7.4 from the manual):

	* C-x C-e - evaluate s-exp before the cursor
	* M-z - evaluate the whole definition containing the cursor
	* M-: - evaluate from mini-buffer
	* C-M-z - evaluate the whole region
	* M-o - evaluate the whole buffer

(C stands for Ctrl, M for Alt on PC keyboards).
Never used it, but from this:

	* http://www.cs.rpi.edu/academics/courses/fall99/ai/scheme/scheme.html

you should be able to get the prompt by M-x run-scheme (M-x stand for Alt-X on today's keyboards).
After installing and running the MIT-GNU Scheme from the Start menu, you get two windows, Edwin *scheme* and MIT/GNU Scheme. Go to the second window and press Ctrl+U. You should get the 1 ]=> prompt right away.

sicp pdf:
https://github.com/sarabander/sicp-pdf

The contrast between function and procedure is a reflection of the general distinction between describing properties of things and describing how to do things, or, as it is sometimes referred to, the distinction between declarative knowledge and imperative knowledge.

we noted that Scheme is an applicative-order language, namely, that all the arguments to Scheme procedures are evaluated when the procedure is applied. In contrast, normal-order languages delay evaluation of procedure arguments until the actual argument values are needed. Delaying evaluation of procedure arguments until the last possible moment (e.g., until they are required by a primitive operation) is called lazy evaluation.

Consider the procedure

(define (try a b)
  (if (= a 0) 1 b))

Evaluating (try 0 (/ 1 0)) generates an error in Scheme. With lazy evaluation, there would be no error. Evaluating the expression would return 1, because the argument (/ 1 0) would never be evaluated.

An example that exploits lazy evaluation is the definition of a procedure unless

(define (unless condition usual-value exceptional-value)
  (if condition exceptional-value usual-value))

that can be used in expressions such as
(unless (= b 0)
        (/ a b)
        (begin (display "exception: returning 0")
               0))

This won't work in an applicative-order language because both the usual value and the exceptional value will be evaluated before unless is called

Such nesting of definitions, called block structure, is basically the right solution to the simplest name-packaging problem. But there is a better idea lurking here. In addition to internalizing the definitions of the auxiliary procedures, we can simplify them. Since x is bound in the definition of sqrt, the proceduresgood-enough?, improve, and sqrt-iter, which are defined internally to sqrt, are in the scope of x. Thus, it is not necessary to pass x explicitly to each of these procedures. Instead, we allow x to be a free variable in the internal definitions, as shown below. Then x gets its value from the argument with which the enclosing procedure sqrt is called. This discipline is called lexical scoping.

iteration and recursion
n the iterative case, the program variables provide a complete description of the state of the process at any point. If we stopped the computation between steps, all we would need to do to resume the computation is to supply the interpreter with the values of the three program variables. Not so with the recursive process. In this case there is some additional ``hidden'' information, maintained by the interpreter and not contained in the program variables, which indicates ``where the process is'' in negotiating the chain of deferred operations. The longer the chain, the more information must be maintained.
