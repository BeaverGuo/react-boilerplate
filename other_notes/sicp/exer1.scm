;;1.2
(/ (+ 5
	  4
	  (- 2 (- 3 (+ 6 (/ 4 5)))))
    (* 3
       (- 6 2)
       (- 2 7)))

;;1.3 star
;;my answer is:

(define (<= x y)
    (not (> x y)))

(define (bigSumOfTwo a b c)
    (if (and (<= a b) (<= a c)))
        (+ b c)
    (if (and (<= b a) (<= b c)))
        (+ a c)
    (if (and (<= c a) (<= c b)))
        (+ b a))

 ;; In short, I did this starting with the pseudo code procedure  
 ;; to accomplish the task at hand then built the helpers needed 
 ;; to make it work. The only thing in this example that is out 
 ;; of sync with the thought process was the >= and <= procedures 
 ;; that I added after wrestling with too many parenthesis. 
  
 (define (exercise1.3 x y z) 
     (sum (sqr (first x y z)) 
          (sqr (second x y z)))) 
  
 (define (>= x y) 
     (not (< x y))) 
  
 (define (<= x y) 
     (not (> x y)))

 (define (first x y z) 
     (cond ((and (>= x y) (>= x z)) x) 
           ((and (>= y x) (>= y z)) y) 
           (else z))) 
  
 (define (second x y z) 
     (cond ((or (and (<= x y) (>= x z)) 
                (and (>= x y) (<= x z))) x) 
           ((or (and (<= y x) (>= y z)) 
                (and (>= y x) (<= y z))) y) 
           (else z))) 
  
 (define (sqr x) 
     (* x x)) 
  
 (define (sum x y) 
     (+ x y))




;;another
 (define  
     (largest-two-square-sum x y z)  
         (if (= x (larger x y))  
             (sum-of-squares x (larger y z))  
             (sum-of-squares y (larger x z)) 
         ) 
 ) 
  
 (define  
     (larger x y)  
         (if (> x y) x y) 
 ) 
  
 (define  
     (sum-of-squares x y)  
         (+ (square x) (square y)) 
 ) 
  
 (define  
     (square x)  
         (* x x) 
 )


 ;;  ex1.3: Define a procedure that takes three numbers as arguments  
 ;;  and returns the sum of the squares of the two larger numbers. 
  
 (define (square x) (* x x)) 
  
 (define (sum-of-squares x y) (+ (square x) (square y))) 
  
 (define (sum-of-squared-largest-two x y z) 
         (cond ((= (min x y z) x) (sum-of-squares y z)) 
               ((= (min x y z) y) (sum-of-squares x z)) 
               ((= (min x y z) z) (sum-of-squares x y)))) 
  
 ;; Testing 
 (sum-of-squared-largest-two 1 3 4) 
 (sum-of-squared-largest-two 4 1 3) 
 (sum-of-squared-largest-two 3 4 1) 


  ;; ex 1.3 
 ;; implemented using only techniques covered to this point 
  
 (define (square x) (* x x)) 
  
 (define (sum-of-squares x y) 
   (+ (square x) (square y))) 
  
 (define (largest-two-of-three x y z) 
   (if (>= x y) 
       (sum-of-squares x (if (>= y z) y z)) 
       (sum-of-squares y (if (>= x z) x z)))) 
  
 ;; tests 
 (largest-two-of-three 2 3 4) 
 (largest-two-of-three 4 2 3) 
 (largest-two-of-three 3 4 2)

;; another
  (define (smallest-two-of-three a b c) 
   (if (< a b)  
     (if (< a c) a c) 
     (if (< b c) b c))) 
  
 (define (square a) 
   (* a a)) 
  
 (define (sum-of-squares-largest-two-of-three a b c)  
   (+ (square a) (square b) (square c) (- (square (smallest-two-of-three a b c))))) 


; 1.5 applicative-order evaluation compute multi times. but normal-order evaluation
; is lazy compute onece. right?
Using applicative-order evaluation, the evaluation of (test 0 (p)) never terminates, because (p) is infinitely expanded to itself:

 (test 0 (p)) 
  
 (test 0 (p)) 
  
 (test 0 (p)) 
... and so on.

Using normal-order evaluation, the expression evaluates, step by step, to 0:

 (test 0 (p)) 
  
 (if (= 0 0) 0 (p)) 
  
 (if #t 0 (p)) 
  
 0

 ;1.6
 ;;The default if statement is a special form which means that even when an interpreter follows applicative substitution, it only evaluates one of it's parameters- not both. However, the newly created new-if doesn't have this property and hence, it never stops calling itself due to the third parameter passed to it in sqrt-iter.
 ;;I believe this solution is incorrect.

;;new-if does not use normal order evaluation, it uses applicative order evaluation. That is, the interpreter first evaluates the operator and operands and then applies the resulting procedure to the resulting arguments. As with Excercise 1.5, this results in an infinite recursion because the else-clause is always evaluated, thus calling the procedure again ad infinitum.

;;The if statement is a special form and behaves differently. if first evalutes the predictate, and then evaluates either the consequent (if the predicate evalutes to #t) or the alternative (if the predicate evalues to #f). This is key difference from new-if -- only one of the two consequent expressions get evaluated when using if, while both of the consequent expressions get evaluated with new-if.

;1.7 If good-enough? uses the alternative strategy (a relative tolerance of 0.001 times the difference between one guess and the next), sqrt works better both for small and large numbers.

;; Modified version to look at diff between iterations
 (define (good-enough? guess x) 
  (< (abs (- (improve guess x) guess)) 
     (* guess .001)))

;;Alternate version, which adds an "oldguess" variable to the main function. 
 (define (sqrt-iter guess oldguess x) 
   (if (good-enough? guess oldguess) 
       guess 
       (sqrt-iter (improve guess x) guess 
                  x))) 
  
  
 (define (good-enough? guess oldguess) 
   (< (abs (- guess oldguess)) 
      (* guess 0.001))) 
  
 (define (sqrt x) 
   (sqrt-iter 1.0 2.0 x)) 

 ;[atoy]: The above solutions fail for x = 0. It hangs and never finishes evaluating. Does anybody know why?Figured out why the procedure hangs on 0. It hangs because when the guess reaches 0, the delta between guess and oldguess can never be less than (* guess 0.001) because that evaluates to 0. If you change the '<' operator to '<=', the procedure will properly evaluate 0.

;[random person]: I don't see why (* guess 0.001) is used. Just '0.001' or whatever tolerance desired seems to work fine. It would be nice if someone explained above if there is a reason why the (* guess 0.001) is better.

;Another take on the good-enough? function 
  
 (define (good-enough? guess x) 
  (< (/ (abs (- (square guess) x)) guess) (* guess 0.0001))) 
  
[tnvu]: One way to "watch how guess changes from one iteration to the next and to stop when the change is a very small fraction of the guess" is to see it as a rate of change using the classic (X1 - X0) / X0. In this case X1 = (improve guess x) and X0 = guess. This is equivalent to the first solution (multiply the numerator and denominator by guess) but is more explicit about calculating the rate of change.

  
 ; A guess is good enough when: 
 ;    abs(improved-guess - original-guess) / original-guess < 0.001 
  
 (define (good-enough? guess x) 
   (< (abs (/ (- (improve guess x) guess) 
              guess)) 
      0.001)) 


;; ex 1.8. Based on the solution of ex 1.7. 
  
 (define (square x) (* x x)) 
  
 (define (cube-root-iter guess prev-guess x) 
   (if (good-enough? guess prev-guess) 
       guess 
       (cube-root-iter (improve guess x) guess x))) 
  
 (define (improve guess x) 
   (average3 (/ x (square guess)) guess guess)) 
  
 (define (average3 x y z) 
   (/ (+ x y z) 3)) 
  
 ;; Stop when the difference is less than 1/1000th of the guess 
 (define (good-enough? guess prev-guess) 
   (< (abs (- guess prev-guess)) (abs (* guess 0.001)))) 
  
 (define (cube-root x) 
   (cube-root-iter 1.0 0.0 x)) 
  
 ;; Testing 
 (cube-root 1) 
 (cube-root -8) 
 (cube-root 27) 
 (cube-root -1000) 
 (cube-root 1e-30) 
 (cube-root 1e60) 
 ;; this fails for -2 due to zero division :( 
  
 ;; Fix: take absolute cuberoot and return with sign 
  
 ;;(define (cube-root x) 
 ;;  ((if (< x 0) - +)(cube-root-iter (improve 1.0 (abs x)) 1 (abs x)))) 
  
 (define (cube x) 
   (* x x x)) 
 (define (improve guess x) 
   (/ (+ (/ x (square guess)) (* 2 guess)) 3)) 
 (define (good-enough? guess x) 
   (< (abs (- (cube guess) x)) 0.001)) 
 (define (cube-root-iter guess x) 
   (if (good-enough? guess x) 
       guess 
       (cube-root-iter (improve guess x) 
                       x))) 
 (define (cube-root x) 
   (cube-root-iter 1.0 x)) 
 (define (cube-root x) 
   (cube-root-iter 1.0 x)) 
  
 (define (cube-root-iter guess x) 
   (if (good-enough? guess x) 
       guess 
       (cube-root-iter (improve guess x) 
                       x))) 
  
 (define (good-enough? guess x) 
   (< (relative-error guess (improve guess x)) error-threshold)) 
  
 (define (relative-error estimate reference) 
   (/ (abs (- estimate reference)) reference)) 
  
 (define (improve guess x) 
   (average3 (/ x (square guess)) guess guess)) 
  
 (define (average3 x y z) 
   (/ (+ x y z) 3)) 
  
 (define error-threshold 0.01) 
This solution makes use of the fact that (in LISP) procedures are also data.

 (define (square x) (* x x)) 
 (define (cube x) (* x x x)) 
  
 (define (good-enough? guess x improve) 
   (< (abs (- (improve guess x) guess)) 
      (abs (* guess 0.001)))) 
  
 (define (root-iter guess x improve) 
   (if (good-enough? guess x improve) 
       guess 
       (root-iter (improve guess x) x improve))) 
  
 (define (sqrt-improve guess x) 
   (/ (+ guess (/ x guess)) 2)) 
  
 (define (cbrt-improve guess x) 
   (/ (+ (/ x (square guess)) 
         (* 2 guess)) 
      3)) 
  
 (define (sqrt x) 
   (root-iter 1.0 x sqrt-improve)) 
  
 (define (cbrt x) 
   (root-iter 1.0 x cbrt-improve)) 
Use the improved good-enough?:

 (define (cube-roots-iter guess prev-guess input) 
   (if (good-enough? guess prev-guess) 
       guess 
       (cube-roots-iter (improve guess input) guess input))) 
  
 (define (good-enough? guess prev-guess input) 
   (> 0.001 (/ (abs (- guess prev-guess)) 
               input))) ;; this should be (abs input) to handle negative inputs. Example: (cube-roots -1) should be -1. Before change, output was 0.33. After fix, output is corrected to -1.000000001794607. 
  
 (define (improve guess input) 
   (/ (+ (/ input (square guess)) 
      (* 2 guess)) 
    3)) 
  
 (define (square x) 
   (* x x)) 
  
 ;;to make sure the first input of guess and prev-guess does not pass the predicate accidentally, use improve here once: 
 ;;to make sure float number is implemented, use 1.0 instead of 1: 
 (define (cube-roots x) 
   (cube-roots-iter (improve 1.0 x) 1 x)) 
Chan : I just added one procedure. (But I just made this procedure with low precision. I think you can fix this.) Give me a feedback please.

 (define (cube-root-iter guess x) 
    (if (good-enough? guess x) 
      guess 
      (cube-root-iter (improve guess x) x))) 
  
 (define (improve guess x) 
    (average (/ x (square guess)) (* 2 guess))) 
  
 (define (average x y) 
    (/ (+ x y) 3)) 
                  
 (define (square x) (* x x)) 
  
 (define (good-enough? guess x) 
    (< (abs (- (cube guess) x)) (* guess 0.001))) 
  
 (define (cube x) (* x x x)) 
  
 (define (cube-root x)  
    (if (< x 0)  
      (* -1 (cube-root-iter 1.0 (abs x)))  
      (cube-root-iter 1.0 x))) 
  
 (cube-root 27) 
 3.0000005410641766 
  
 (cube-root -27) 
 -3.0000005410641766 

