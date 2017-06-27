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

;1.10 star
; both recursive wrong!!
(+ 4 5)
; the second is iterative!!

; the first
 (+ 4 5) 
 (inc (+ (dec 4) 5)) 
 (inc (+ 3 5)) 
 (inc (inc (+ (dec 3) 5))) 
 (inc (inc (+ 2 5))) 
 (inc (inc (inc (+ (dec 2) 5)))) 
 (inc (inc (inc (+ 1 5)))) 
 (inc (inc (inc (inc (+ (dec 1) 5))))) 
 (inc (inc (inc (inc (+ 0 5))))) 
 (inc (inc (inc (inc 5)))) 
 (inc (inc (inc 6))) 
 (inc (inc 7)) 
 (inc 8) 
  
 9 

 ; the second
 (+ 4 5) 
 (+ (dec 4) (inc 5)) 
 (+ 3 6) 
 (+ (dec 3) (inc 6)) 
 (+ 2 7) 
 (+ (dec 2) (inc 7)) 
 (+ 1 8) 
 (+ (dec 1) (inc 8)) 
 (+ 0 9) 
  
 9

;The easiest way to spot that the first process is recursive (without writing out the substitution) is to note that the "+" procedure calls itself at the end while nested in another expression; the second calls itself, but as the top expression.

; 1.11 star
; recursive:
(define f (n)
  if(< n 3)
    n
  else
    (+ f (- n 1) f (- n 2) f(- n 3)))
; iterative: wrong

(define (f n)
  (cond ((< n 3) n)
    (else (+ (f (- n 1))
      (* 2 (f (- n 2)))
      (* 3 (f (- n 3)))))))
;iterative computes f(n + 1) and f( n + 2 ). wasteful!!

(define (f n)
  (define (iter a b c count)
    (if (= count 0)
      a
      (iter b c (+ c (* 2 b) (* 3 a)) (- count 1)))) ;; ? b c already computed and the last is the new. eg: 0 1 2 --> 1 2 4 ?
  (iter 0 1 2 n))

;; get the relationship between f(n+1) and f(n)
; f(n+1) = f(n) + 2f(n-1) + 3f(n-2)    --> ? c b  and ? is below
; f(n)   = f(n-1) + 2f(n-2) + 3f(n-3)  --> c b a  ? is f(n) = c+2b+3a
; The above version does not terminate for n < 0. The following implementation does:
(define (f n) (fi n 0 1 2)) 
 (define (fi i a b c) 
   (cond ((< i 0) i) 
         ((= i 0) a) 
         (else (fi (- i 1) b c (+ c (* 2 b) (* 3 a)))))) 



;does not calculate f(n+1) or f(n+2).
(define (foo n) 
   (define (foo-iter a b c n) 
     ;; a = f(n - 1), b = f(n - 2), c = f(n - 3). 
     ;; return a + 2b + 3c 
     (if (< n 3) 
         a 
         (foo-iter (+ a (* 2 b) (* 3 c)) a b (- n 1)))) 
   (if (< n 3) 
       n 
       (foo-iter 2 1 0 n))) 

(define (f n) 
   ;; Track previous three values. 
   ;; fi-1 is f(i-1) 
   ;; fi-2 is f(i-2) 
   ;; fi-3 is f(i-3) 
   (define (f-iter fi-1 fi-2 fi-3 i) 
     ;; Calculate value at current index i. 
     (define fi (+ fi-1 
                   (* 2 fi-2) 
                   (* 3 fi-3))) 
     (if (= i n) 
         fi 
         (f-iter fi fi-1 fi-2 (+ i 1)))) 
  
   (if (< n 3) 
       n 
       (f-iter 2 1 0 3))) ;; start index i=3, count up until reach n. 

 (define (f n) 
   (define (f-iter n a b c) 
   ;; this makes f(n) = a f(2) + b f(1) + c f(0) for integer n. 
     (if (< n 4) 
     ;; N < 4. cause n-1 < 3 
       (+ (* a (- n 1) ) 
         (* b (- n 2)) 
         (* c (- n 3))) 
       (f-iter (- n 1) (+ b a) (+ c (* 2 a)) (* 3 a)))) 
   (f-iter n 1 2 3)) 
    

;1.12 Pascal triangle r for row and c for column
; use definition
(define (pascal r c)
 (if (or (= c 1) (= r c))
  1
  (+ (pascal (- r 1) (- c 1)) (pascal (- r 1) c))))

;Computes an entry in the Pascal triangle given the row and column. Rows start from 1, counting from above; columns start from 1 too, counting from left to right.

(define (pascal-triangle row col) 
   (cond ((> col row) 0) 
         ((< col 0) 0) 
         ((= col 1) 1) 
         ((+ (pascal-triangle (- row 1) (- col 1)) 
             (pascal-triangle (- row 1) col))))) 
 ;;; Represent pascal-triangle in coordination: the point 1 is at (0, 0); 
 ;;; (-1, 0) is occupied by 0, and other potential blank places are 
 ;;; also 0. Then 
 ;;;                         |- yanghui(r+1, c-1) + yanghui(r+1, c+1), if r < 0 
 ;;; yanghui(r, c) =    | 1, if r = 0, c = 0 
 ;;;                         |- 0, otherwise 
 (define (yanghui r c) 
   (cond 
    ((< r 0) 
     (+ (yanghui (+ r 1) (- c 1)) 
                 (yanghui (+ r 1) (+ c 1)))) 
    ((and (= r 0) (= c 0)) 1) 
    (else 0))) 

 ;;;Left-aligned triangle, assuming the top most is at (col=0, depth=0) 
 ;;;1 
 ;;;1  1 
 ;;;1  2  1 
 ;;;1  3  3  1 
 ;;;1  4  6  4  1 
 ;;;1  5  10 10 5  1 
  
 (define (pascal col depth) 
   (cond  
     ((= col 0) 1) 
     ((= col depth) 1) 
     (else (+ (pascal (- col 1) (- depth 1))  
              (pascal col ( - depth 1)))))) 

; Left-aligned triangale with start at row=0 and col=0 
 ; 1 
 ; 1  5 
 ; 1  4 10 
 ; 1  3  6 10 
 ; 1  2  3  4  5 
 ; 1  1  1  1  1  1 
 (define (pascal row col) 
   (if (or (= row 0) (= col 0)) 
     1 
     (+ (pascal (- row 1) col) (pascal row (- col 1))))) 
 ;; This is wrong. One error is (pascal row (- col 1)) because it means 
 ;; using an element of the same row, which is not what the construction rule 
 ;; says. Another error is not handling out-of-bounds as zero and instead 
 ;; yielding one. This procedure only works for row=0, col=0. 

;1.14 count change
(define (count-change amount) 
   (cc amount 5)) 
 (define (cc amount kinds-of-coins) 
   (cond ((= amount 0) 1) 
         ((or (< amount 0) (= kinds-of-coins 0)) 0) ;amount can not be minus
         (else (+ (cc amount 
                      (- kinds-of-coins 1)) 
                  (cc (- amount 
                         (first-denomination kinds-of-coins)) 
                      kinds-of-coins))))) 
 (define (first-denomination kinds-of-coins) 
   (cond ((= kinds-of-coins 1) 50) 
         ((= kinds-of-coins 2) 25) 
         ((= kinds-of-coins 3) 10) 
         ((= kinds-of-coins 4) 5) 
         ((= kinds-of-coins 5) 1))) 

                                11 => 50 25 10 5 1
                                       4|0
                             +----------+---------+
                             |                    |
                        11 => 25 10 5 1      -39 => 50 25 10 5 1
                            4|0
                    +--------+-------+
                    |                |
               11 => 10 5 1    -14 => 25 10 5 1
                   3|1
            +-------+--------------------------------------+
            |                                              |
      11 => 5 1                                       1=> 10 5 1
           1|2                                            1|0
    +-------+-------+                                 +----+---------+
    |               |                                 |              |
 11=> 1          6 => 5 1                           1=> 5 1      -9 => 10 5 1
                   1|1                               1|0
           +--------+----+                      +-----+---+
           |             |                      |         |
        6 => 1        1 => 5 1               1 => 1     -4=> 5 1
                        1|0
                    +----+----+
                    |         |
                1 => 1     -4=> 5 1
;1.15 (ceiling(/ (log (/ 12.15 0.1)) (log 3)))
;In other words we have O(log(x)) order of growth.

;1.16

(define (fast-exponent b n)
 (define iter(a b n)
  (cond ((= n 0) a)
        ((even? n) (iter a (square b) (/ n 2)))
        (else (iter (* a b) b (- n 1)))))
 (iter 1 b n))

(define (square x)
 (* x x))

 ;; Assume double and halve are defined by the language 
 (define (double x) (+ x x)) 
 (define (halve x) (floor (/ x 2))) 
  
 (define (* a b) 
   (define (iter accumulator a b) 
     (cond ((= b 0) accumulator) 
           ((even? b) (iter accumulator (double a) (halve b))) 
           (else (iter (+ accumulator a) a (- b 1))))) 
   (iter 0 a b)) 
 ;; Alternate version, which makes more complete use of the  
 ;; Russian Peasant Algorithm in footnote 40.  Uses roughly half 
 ;; the steps of the above 
 (define (double a) (+ a a)) 
 (define (halve a) (/ a 2)) 
  
 (define (mult3 a b) 
   (define (mult-iter accumulator b c) 
     (cond ((= c 0) accumulator) 
           ((even? c) (mult-iter accumulator (double b) (halve c))) 
           (else (mult-iter (+ accumulator b) (double b) (- (halve c) 0.5))))) 
   (mult-iter 0 a b)) 

;a' = qb +qa + pa = (p + q)a + bq
;b' = qa + pb

;;a" = qb' +qa' + pa' = (p + q)a' + b'q = ... = (p^2 + 2pq + 2q^2)a + (2pq + q^2)b
;;b" = qa' + pb' = ... = (2pq + q^2)a + (p^2 + q^2)b

(define (fib n) 
   (fib-iter 1 0 0 1 n)) 
 (define (fib-iter a b p q count) 
   (cond ((= count 0) b) 
         ((even? count) 
          (fib-iter a 
                    b 
                    (+ (square p) (square q)) 
                    (+ (* 2 p q) (square q)) 
                    (/ count 2))) 
         (else (fib-iter (+ (* b q) (* a q) (* a p)) 
                         (+ (* b p) (* a q)) 
                         p 
                         q 
                         (- count 1))))) 
  
 (define (square x) (* x x)) 

#|
Consider the fibonacci numbers as the result of applying the following transformation:
T(a, b) = (a + b, a)
a <- a + b
b <- a
Starting with (a, b) = (0, 1) as first input and applied n times.

This can be thought of as a special case of the following transformation Tpq, defined below, with p = 0 and q = 1:

Tpq(a, b) = (bq + aq + ap, bp + aq)
a <- (bq + aq + ap)
b <- (bp + aq)

T01(a, b) = (b1 + a1 + a0, b0 + a1) = (a + b, a)

Now we need to calculate how to successively apply a particular Tpq twice. In other words, given Tpq and Txy, compute p' and q' such that Tp'q'(a, b) = Tpq(Txy(a, b))

Tpq(Txy(a, b))
Tpq(by + ay + ax, bx + ay)
((bx + ay)q + (by + ay + ax)q + (by + ay + ax)p, (bx + ay)p + (by + ay + ax)q)

Calculation for a <- (bq + aq + ap):
(bx + ay)q + (by + ay + ax)q + (by + ay + ax)p
bxq + ayq + byq + ayq + axq + byp + ayp + axp
b(xq + yp + yq) + a(xq + yp + yq) + a(xp + yq)

Calculation for b <- (bp + aq):
(bx + ay)p + (by + ay + ax)q
bxp + ayp + byq + ayq + axq
b(xp + yq) + a(xq + yp + yq)

Both calculations confirm:
p' = xp + yq
q' = xq + yp + yq

For the special case of x = p and y = q, we get:
p' = pp + qq
q' = 2pq + qq

Also note that T is commutative. Swap p<->x and q<->y and you get the same result:
p' = px + qy
q' = py + qx + qy

Finally, calculate pi and qi, the identity values such that Tpiqi(Txy) = Txy:
x = xpi + yqi
yq' = xqi + ypi + yqi
clearly (pi, qi) = (1, 0)
These identity values will form the first parameters of our "accumulator" T.

To compute fib(n), apply T01 n times to (1, 0), and take the *second* value, i.e. b

Now we can implement a logarithmic fibonacci procedure using this idea.

To understand this, think of the exponentiation example where we did a logarithmic+iterative implementation. We had an accumulator for the "odd" factors and we successively doubled the base while halving the exponent.
An example is a^15. Each number in the text below represents a power of a, so 1 means a^1, 2 means a^2, etc:

accumulator is on the left, rest is on the right:
0 111111111111111 (acc = 1,    base = a^1, exp = 15)
1 11111111111111  (acc = a,    base = a^1, exp = 14)
1 2222222         (acc = a,    base = a^2, exp =  7)
12 222222         (acc = a^3,  base = a^2, exp =  6)
12 444            (acc = a^3,  base = a^4, exp =  3)
124 44            (acc = a^7,  base = a^4, exp =  2)
124 8             (acc = a^7,  base = a^8, exp =  1)
1248              (acc = a^15, base = a^8, exp =  0)

We can apply the same idea.
Each time you replace Tpq with Tp'q', you get to halve the number of times you apply it (halving the exponent), since you're doubling the "power" of each application (squaring the base).
In other words T^n = (T^2) ^ (n/2)

Our "accumulator" is simply p-acc and q-acc that represent the parameters for the accumulated T function. Our "base" is p and q that change as we "double" the base function.
At the end we'll have p-acc and q-acc equivalent to applying T01 n times. We can compute the actual fibonacci number by taking our p-acc and q-acc, applying them to (1, 0), and taking the second value:

a <- (bq + aq + ap) = (0q + 1q + 1p) = p + q   <-- we don't care about this one at the end (it's fib(n+1))
b <- (bp + aq) = (0p + 1q) = q   <--- this is the final value fib(n)

|#

(define (fib n)
  (define (even? x)
    (= (remainder x 2) 0))
  (define (fib-iter p-acc q-acc p q n)
    (cond ((= n 0) q-acc)
          ((even? n) (fib-iter
                      p-acc
                      q-acc
                      (+ (* p p) (* q q))
                      (+ (* 2 p q) (* q q))
                      (/ n 2)))
          (else (fib-iter
                 (+ (* p p-acc) (* q q-acc))
                 (+ (* p q-acc) (* q p-acc) (* q q-acc))
                 p
                 q
                 (- n 1)))))
  (fib-iter 1 0 0 1 n))

;1.20 interpreter gcd

(define (gcd a b)
 (if(= b 0) 
  a
  (gcd b (remainder a b))))

; r for remainder

gcd 206 40
40!=0
gcd 40 r(206 40)
r(206 40) = 6 != 0
gcd r(206 40) r(40 r(206 40))
r(40 r(206 40)) = 4 != 0
gcd r(40 r(206 40)) r(r(206 40) r(40 r(206 40)))
r(r(206 40) r(40 r(206 40))) = 2 != 0
gcd r(r(206 40) r(40 r(206 40))) r(r(40 r(206 40)) r(r(206 40) r(40 r(206 40))))
r(r(40 r(206 40)) r(r(206 40) r(40 r(206 40)))) = 0 end

the last judge f n use the result f n-1 + f n-2 then call r. means f n-1 + f n-2 + 1
f 0 = 0 f 1 = 1 and is fibonacci.
0 1 2 4 7

;R = SUM(i from 1 to n, fib(i) + fib(i - 1)) - 1

(define (count-remainders n) 
     (define (loop n sum) 
         (if (= 0 n) (- sum 1) 
             (loop (- n 1) (+ sum (fib n) (fib (- n 1)))))) 
     (loop n 0)) 

It seems that the formula

         R = SUM(i from 1 to n, fib(i) + fib(i - 1)) - 1 
is incorrect. One can easy check this by letting n=2. The correct count should be 1 while the formula gives 2.

Let b_i be the value of b at the n'th invocation of gcd(a,b). Let b(i) be the count of remainder procedure needed to calculate b_i. Similarly, define a_i and a(i). It is easy to check that

1. a_i=b_(i-1) and thus a(i)=b(i-1).

2. b(i+1) = a(i) + b(i) + 1 = b(i-1) + b(i) + 1 because b_(i+1) = a_i mod b_i

Based on my own derivation, R should be

b(1)+b(2)+...+b(n)+b(n-1) with b(1)=0, b(2)=1 and b(n)=b(n-1)+b(n-2)+1, which is not equivalent with the above R formula

; 1.29 my answer:
(define (sim-integ f a b n)
  (define (coe k)
    (cond ((= n k) 1)
          ((= k 0) 1)
          ((even? k) 2)
          (else 4)))
  (define h (/ (- a b) (* 3 n)))
  (define (sum f coe n)
    (cond ((= n 0) f(a))
     (else (+ (* (coe n) (f (+ a (* n h)) )) sum(f coe (- n 1)))))
    )
  sum(f coe n))

; answer here:
(define (round-to-next-even x)
  (+ x (remainder x 2)))

(define (simpson f a b n)
  (define fixed-n (round-to-next-even n))
  (define h (/ (- b a) fixed-n))
  (define (simpson-term k)
    (define y (f (+ a (* k h))))
    (if (or (= k 0) (= k fixed-n))
      (* 1 y)
      (if (even? k)
        (* 2 y)
        (* 4 y))))
  (*(/ h 3) sum( simpson-term 0 inc fixed-n)))
;There is a third way which approaches the solution by breaking the problem into four parts: (f y0), (f yn) and two sums,one over even k and another over odd k.
(define (another-simpson-integral f a b n) 
   (define h (/ (- b a) n))  
   (define (add-2h x) (+ x (* 2 h))) 
   (* (/ h 3.0) (+ (f a)  
                   (* 4.0 (sum f (+ a h) add-2h (- b h)))  
                   (* 2.0 (sum f (add-2h a) add-2h (- b h)))  
                   (f (+ a (* h n)))))) 

;1.30 iterative

(define (itersum term a next b) 
  (define (iter a result) 
          (if (> a b) 
              result 
              (iter (next a) (+ result (term a))))) 
  (iter a 0))

;1.31
(define sum(term a next b)
  (if(< b a)
    0
    (+ (term a) (sum(term (next a) next b)))))

;easy just as before
(define product(term a next b)
  (if(< b a)
    1
    (* (term a) (product term (next a) next b))))

;how to define factorial
(define (term a)
  (if (= a 0)
    1
    a))

(define (factorial n)
  product(term 0 inc n))

  ;answer:
     (define (product term a next b) 
     (if (> a b) 1 
        (* (term a) (product term (next a) next b)))) 
  (define (identity x) x) 
  
 (define (next x) (+ x 1)) 
  
 (define (factorial n) 
 (product identity 1 next n)) 

 (define (pi n) 
   (define (term x) (* x x)) 
   (define (next x) (+ x 2)) 
   ; since we are increasing the numbers by two on every iteration 
   (define limit (* n 2)) 
   ; upper term: - 2 always goes first, start building product from 4 
   ;             - as 2 numbers are skipped, the limit must respect that, too 
   ;             - since we are squaring one time too often at the end, 
   ;               we have to divide that back out of the result 
   ; lower term: start with 3, which is 1 more than the upper term 
   ;             -> so increase limit by 1 
   ;  
   (* 4 (/ (/ (* 2 (product term 4 next (+ limit 2))) 
              (+ limit 2)) 
           (product term 3 next (+ limit 1))))) 

;1.32
; right fold 
  (define (accumulate combiner null-value term a next b) 
    (if (> a b) null-value 
        (combiner (term a) (accumulate combiner null-value term (next a) next b)))) 

(define (sum term a next b) (accumulate + 0 term a next b)) 
  
  (define (product term a next b) (accumulate * 1 term a next b)) 
; left fold 
  (define (accumulate combiner null-value term a next b) 
    (define (iter a res) 
      (if (> a b) res 
          (iter (next a) (combiner res (term a))))) 
    (iter a null-value)) 

;1.33
  (define (smallest-div n) 
    (define (divides? a b) 
      (= 0 (remainder b a))) 
    (define (find-div n test) 
       (cond ((> (sq test) n) n) ((divides? test n) test) 
             (else (find-div n (+ test 1))))) 
    (find-div n 2)) 
  
   (define (prime? n) 
     (if (= n 1) false (= n (smallest-div n)))) 

  (define (filtered-accumulate combiner null-value term a next b filter) 
  (if (> a b) null-value 
      (if (filter a) 
          (combiner (term a) (filtered-accumulate combiner null-value term (next a) next b filter)) 
          (combiner null-value (filtered-accumulate combiner null-value term (next a) next b filter))))) 

 (define (filtered-accumulator filter combiner null-value term a next b) 
   (if (> a b) null-value 
     (combiner (if (filter a) (term a) 
                 null-value) 
               (filtered-accumulator filter combiner null-value term (next a) next b)))) 

 (define (filtered-accumulate combiner null-value term a next b filter) 
   (define (iter a result) 
     (cond ((> a b) result) 
           ((filter a) (iter (next a) (combiner result (term a)))) 
           (else (iter (next a) result)))) 
   (iter a null-value)) 
;1.34
First invocation of f will attempt to apply its argument (which is f) to 2. This second invocation will attempt to apply its argument (which is 2) to 2, resulting in error.

 (f f) 
 (f 2) 
 (2 2) 
 ; Error 
 ; MIT Scheme reports: The object 2 is not applicable. 

 ;1.35
 (fixed-point (lambda (x) (+ 1 (/ 1 x))) 1.0)

 ; 1.37
 ; my answer
 (define (cont-frac n d k)
  (if(= k 0)
    0
    (/ n (+ d (cont-frac n d (-k 1)))))



 (define (cont-frac n d k) 
   (define (loop result term) 
     (if (= term 0) 
         result 
         (loop (/ (n term) 
                  (+ (d term) result)) 
               (- term 1)))) 
  
   (loop 0 k))

;1.39
(define (tan-cf x k) 
   (define (iter i result) 
     (if (= i 0) 
         result 
         (iter (-1+ i) 
               (/ (if (= i 1) x (square x)) 
                  (- (- (* 2 i) 1) 
                     result))))) 
   (iter k 0))
; 1.41
; my answer
(define (double f)
  (define (fn f)
    f)
    fn)

(define (double f)
  (define (fn x)
    f (f x))
    fn)

; why not use lambda

 (define (double f) 
         (lambda (x) (f (f x))))

2^4 + 5 = 21

;1.42

(define (compose (f g)
  (lambda (x) (f g(x)))))

 (define (compose f g) 
    (lambda (x) (f (g x)))) 
;1.43
 (define (repeat f n) 
    (if (< n 1) 
        (lambda (x) x) 
        (compose f (repeat f (- n 1))))) 

; 1.44
(define (smooth compute-f f)
  (lambda (x) (compute-f f x)))

; answer

(define dx 0.00001)

(define dx 0.00001) 
  
 (define (smooth f) 
   (lambda (x) 
     (/ (+ (f (- x dx)) 
           (f x) 
           (f (+ x dx))) 
        3))) 
  
 (define (n-fold-smooth f n) 
   ((repeated smooth n) f))

; The above answer for n-fold-smooth is incorrect. The function "repeated" is not used correctly in the function. Repeated should be defined as:
(define (repeated f n) 
   (lambda (x) (cond ((= n 0) x) 
                     (else 
                      ((compose (repeated f (- n 1)) f) x)))))


 (define (n-smooth f n) 
   ((repeated (smooth f) n)))

;1.46
 (define (close-enough? v1 v2) 
   (define tolerance 1.e-6) 
   (< (/ (abs (- v1 v2)) v2)  tolerance)) 
  
 (define (iterative-improve improve close-enough?) 
   (lambda (x) 
     (let ((xim (improve x))) 
       (if (close-enough? x xim) 
           xim 
         ((iterative-improve improve close-enough?) xim)) 
       ))) 
  
 ; (a) rewrite sqrt using iterative-improve 
 (define (sqrt x) 
   ((iterative-improve   
     (lambda (y) 
       (/ (+ (/ x y) y) 2)) 
     close-enough?) 1.0)) 
  
 ; (b) rewrite fixed-point using iterative-improve 
 (define (fixed-point f first-guess) 
   ((iterative-improve 
     ; improve function is nothing but the 
     ; function f whose fixed point is to be found! 
     f 
     close-enough?) first-guess))


