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

