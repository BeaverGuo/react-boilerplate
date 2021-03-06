;2.1
(define (make-rat n d)
  (let ((g (gcd n d)))
    (cons (/ n g) (/ d g))))
; my answer:
(define (make-rat n d)
  (cond ((and (< n 0) (< d 0)) (define n -n) (define d -d))
        ((< d 0) (define n -n) (define d -d)))
  (let ((g (gcd n d)))
    (cons (/ n g) (/ d g))))


; answer
 (define (numer x) (car x)) 
  
 (define (denom x) (cdr x)) 
  
 (define (print-rat x) 
   (newline) 
   (display (numer x)) 
   (display "/") 
   (display (denom x))) 
  
(define (make-rat n d)
  (let ((g ((if (< d 0) - +) (abs (gcd n d)))))
    (cons (/ n g) (/ d g))))

; 2.2 abstraction
(define (make-point x y)
  cons (x y))
(define (point-x x)
  (car x))
(define (point-y x)
  (cdr x))

(define (make-segment x y)
  cons(x y))
(define (start-segment x)
  (car x))
(define (end-segment x)
  (cdr x))

; answer
 ;; Point 
 (define (make-point x y) (cons x y)) 
 (define (x-point p) (car p)) 
 (define (y-point p) (cdr p)) 
 (define (print-point p) 
   (newline) 
   (display "(") 
   (display (x-point p)) 
   (display ",") 
   (display (y-point p)) 
   (display ")")) 
  
 ;; Segment 
 (define (make-segment start-point end-point) 
   (cons start-point end-point)) 
 (define (start-segment segment) (car segment)) 
 (define (end-segment segment) (cdr segment)) 
  
 (define (midpoint-segment segment) 
   (define (average a b) (/ (+ a b) 2.0)) 
   (let ((a (start-segment segment)) 
         (b (end-segment segment))) 
     (make-point (average (x-point a) 
                          (x-point b)) 
                 (average (y-point a) 
                          (y-point b)))))

;; 2.3 point a b c d clockwise
;; my answer
(define (rectangle a b c d)
  (define (dist x1 x2) ;; dist for (x1-x2)^2
    square(- x1 x2))
  (define (length star end) ;; length for (x1-x2)^2 + (y1-y2)^2
    (+ (dist (car (start)) (car (end))) (dist (cdr (start)) (cdr (end)))))
  (let (long_seg  length (make-segment a b))
       (width_seg length (make-segment b c)))
       (circular (* 2 (+ long_seg width_seg)))
       (area (* long_seg * width_seg)))


;; answer
;; ex 2.3.  Not bothering with error/sanity checking. 
  
 ;; Point 
 (define (make-point x y) (cons x y)) 
 (define (x-point p) (car p)) 
 (define (y-point p) (cdr p)) 
  
 ;; Rectangle - 1st implementation 
  
 (define (make-rect bottom-left top-right) 
   (cons bottom-left top-right)) 
  
 ;; "Internal accessors", not to be used directly by clients.  Not sure 
 ;; how to signify this in scheme. 
 (define (bottom-left rect) (car rect)) 
 (define (bottom-right rect) 
   (make-point (x-point (cdr rect)) 
               (y-point (car rect)))) 
 (define (top-left rect) 
   (make-point (x-point (car rect)) 
               (y-point (cdr rect)))) 
 (define (top-right rect) (cdr rect)) 
  
 (define (width-rect rect) 
   (abs (- (x-point (bottom-left rect)) 
           (x-point (bottom-right rect))))) 
 (define (height-rect rect) 
   (abs (- (y-point (bottom-left rect)) 
           (y-point (top-left rect))))) 
  
 ;; Public methods. 
 (define (area-rect rect) 
   (* (width-rect rect) (height-rect rect))) 
 (define (perimeter-rect rect) 
   (* (+ (width-rect rect) (height-rect rect)) 2)) 
  
  
 ;; Usage: 
 (define r (make-rect (make-point 1 1) 
                      (make-point 3 7))) 
 (area-rect r) 
 (perimeter-rect r) 
  
  
 ;; --------- 
  
 ;; Alternate implementation of rectangle.  Note that this would screw 
 ;; up clients that call make-rect directly, since it uses a different 
 ;; number of args and different arg meanings, but it's generally bad 
 ;; form for clients to call constructors directly anyway, they should 
 ;; call some kind of factory method (cf "Domain Driven Design"). 
  
 ;; assuming, not checking width, height > 0. 
 (define (make-rect bottom-left width height) 
   (cons bottom-left (cons width height))) 
  
 (define (height-rect rect) (cdr (cdr rect)))  
 (define (width-rect rect) (car (cdr rect))) 
  
 ;; area and perimeter ops remain unchanged.  The internal methods from 
 ;; the first implementation won't work now. 
  
  
 ;; Usage for second implementation: 
 (define r (make-rect (make-point 1 1) 2 6)) 
 (area-rect r) 
 (perimeter-rect r) 
  
 ;; Alternative Implementation II 
 ;; ----------------------------- 
 ;; 
 ;; The above implementations are limited to rectangles that have sides 
 ;; parallel to the major axes of the plane. This implementation generalizes 
 ;; to allow all rectangles. Conveniently enough, you can still use the above  
 ;; area and perimeter definitions. Abstraction barrier for the win! 
 ;; 
 ;; DO NOTE -- As above all sanity/error checking has been ignored. IRL, you 
 ;; you would want to ensure that parallel sides are actually parallel, etc. 
  
 ;; Helpful to have this 
 (define (square x) (* x x)) 
  
 ;; Point library 
 (define (make-point x y) (cons x y)) 
 (define (x-point p) (car p)) 
 (define (y-point p) (cdr p)) 
 (define (point-dist p1 p2) 
   (sqrt (+ (square (- (x-point p1) (x-point p2))) 
            (square (- (y-point p1) (y-point p2)))))) 
  
 ;; Segment library 
 (define (make-segment p1 p2) (cons p1 p2)) 
 (define (start-seg p) (car p)) 
 (define (end-seg p) (cdr p)) 
 (define (seg-len seg) (point-dist (start-seg seg) 
                                   (end-seg seg))) 
  
 ;; Rectangle library 
 (define (make-rect side parallel-side)  
   (cons side parallel-side))  
 (define (side1 rect) (car rect)) 
 (define (side2 rect) (cdr rect)) 
 (define (side-legths rect) 
   (cons (seg-len (side1 rect)) 
         (min (abs (point-dist (start-seg (side1 rect)) 
                          (start-seg (side2 rect)))) 
              (abs (point-dist (start-seg (side1 rect)) 
                          (end-seg (side2 rect))))))) 
  
 ;; Same as above 
 (define (width-rect rect) (car (side-legths rect))) 
 (define (height-rect rect) (cdr (side-legths rect))) 
  
 ;; Usage 
 (define r (make-rect (make-segment (make-point 0 1)  
                                 (make-point 0 0)) 
                   (make-segment (make-point 1 0) 
                                 (make-point 1 1))))  
  
 ;; As an alternative to this alternative, You can define you rectangles  
 ;; as a pair of perpendicular segments: 
  
 (define (make-rect side perpendicular-side)  
   (cons side perpendicular-side))  
 (define (side-legths rect) 
   (cons (seg-len (side1 rect)) 
         (seg-len (side2 rect)))) 
  
 ;; And everything should still work.  
  
 ;; Thus we now have 4 representations for rectangles, all of which can use the  
 ;; same area and perimeter functions. 

;; Here's another one: This allows arbitrary rotated rectangles, and the representation is the easiest in my opinion. The rectangle is represented by the "base" - i.e. the segment with 2 bottom points, and the left side. To keep it simple, the input is the base, and the "height" from the base. Here height is in the direction perpendicular to the base, and not along Y-axis.  
  
 ;; This doesn't require error-checking as these parameters can't go wrong (base and height) and a rectangle is uniquely defined by them. 
  
 (define (perimeter-r r) 
   (let ((width (width-r r)) 
         (height (height-r r))) 
     (* 2 (+ height width)))) 
  
 (define (area-r r) 
   (let ((width (width-r r)) 
         (height (height-r r))) 
     (* width height))) 
  
 (define (width-r r) 
   (length-seg (base-seg r))) 
  
 (define (height-r r) 
   (length-seg (left-side r))) 
  
 (define (length-seg seg) 
   (let ((p1 (start-segment seg)) 
         (p2 (end-segment seg))) 
     (let ((x1 (x-point p1)) 
           (y1 (y-point p1)) 
           (x2 (x-point p2)) 
           (y2 (y-point p2))) 
       (sqrt (+ (square (- x1 x2)) 
                (square (- y1 y2))))))) 
  
 (define (square x) 
   (* x x)) 
  
 (define (base-seg r) 
   (car r)) 
  
 (define (left-side r) 
   (cdr r)) 
  
 (define (make-rectangle base-seg height) 
   (let ((p1 (start-segment base-seg)) 
         (p2 (end-segment base-seg))) 
     (let ((x1 (x-point p1)) 
           (y1 (y-point p1)) 
           (x2 (x-point p2)) 
           (y2 (y-point p2))) 
       (let ((theta (atan (/ (- y2 y1) 
                             (- x2 x1))))) 
         (let ((new-x (- x1 (* height (sin theta)))) 
               (new-y (+ y1 (* height (cos theta))))) 
           (cons base-seg 
                 (make-segment 
                  p1 
                  (make-point new-x new-y))))))))

;; Representation 1: (cons (bottom-left point) (top-right point)) 
 (define (make-rect p1 p2) 
   (let ((x1 (x-point p1)) 
         (x2 (x-point p2)) 
         (y1 (y-point p1)) 
         (y2 (y-point p2))) 
     (cond ((and (< x1 x2) (< y1 y2)) (cons p1 p2)) 
           ((and (> x1 x2) (> y1 y2)) (cons p2 p1)) 
           ((and (< x1 x2) (> y1 y2)) (cons (make-point x1 y2) (make-point x2 y1))) 
           (else (cons (make-point x2 y1) (make-point x1 y2)))))) 
  
 (define (bottom-left r) 
   (car r)) 
  
 (define (top-right r) 
   (cdr r)) 
  
 ;; Representation 2: (cons (bottom-left point) (cons width height)) 
 (define (make-rect p1 p2) 
   (let ((x1 (x-point p1)) 
         (x2 (x-point p2)) 
         (y1 (y-point p1)) 
         (y2 (y-point p2))) 
     (let ((width (abs (- x1 x2))) 
           (height (abs (- y1 y2)))) 
       (cond ((and (< x1 x2) (< y1 y2)) (cons p1 (cons width height))) 
             ((and (> x1 x2) (> y1 y2)) (cons p2 (cons width height))) 
             ((and (< x1 x2) (> y1 y2)) (cons (make-point x1 y2) (cons width height))) 
             (else (cons (make-point x2 y1) (cons width height))))))) 
  
 (define (bottom-left r) 
   (car r)) 
  
 (define (top-right r) 
   (let ((x (x-point (car r))) 
         (y (y-point (car r))) 
         (w (car (cdr r))) 
         (h (cdr (cdr r)))) 
     (make-point (+ x w) (+ y h))))


;; return a procedure
 (define (cons x y)
  (define (dispatch m)
    (cond ((= m 0) x)
      ((= m 1) y)
      (else (error 'Argument not 0 or 1 -- CONS' m))))
  dispatch)

 (define (car z) (z 0))
 (define (cdr z) (z 1))
;; in js


;;2.4 

(define (cons x y)
  (lambda (m) (m x y)))

;; z is a function accept argument function m and apply arguments x y and return x
(define (car z)
  (z (lambda (p q) p)))

(define (cdr z)
  (z (lambda (p q) q)))


 ;; given: 
  
 (define (cons a b) 
   (lambda (m) (m a b))) 
  
 ;; Commentary: cons returns a function that takes a function of 2 
 ;; args, a and b.  The function will receive the values of a and b 
 ;; passed to cons when cons was called initially. 
  
 ;; z is a function that takes a 2-arg function.  That inner function 
 ;; will be passed p and q in that order, so just return the first arg, p. 
 (define (car z) 
   (z (lambda (p q) p))) 
  
  
 ;; ... so this is obvious. 
 (define (cdr z) 
   (z (lambda (p q) q))) 


;;Using applicative-order evaluation, verify that (car (cons x y)) yields x for any objects x and y:
(car (cons x y)) 
 (car (lambda (m) (m x y))) 
 ((lambda (m) (m x y)) (lambda (p q) p)) 
 ((lambda (p q) p) x y) 
 x

;;substitution rule
 (car (cons a b)) 
 ;-> ((cons a b) (lambda (p q) p)) 
 ;-> ((lambda (m) (m a b)) (lambda (p q) p)) 
 ;-> ((lambda (p q) p) a b) 
 ;-> a 


;; 2.5
;; my answer. I mean x is a function to accept a b and apply 2^a and 3^b and return the result of
;; 2^a * 3^b
(define (exp_2_3 a b)
  (lambda(x) (x a b)))

(define (car z)
  z((lambda(a b) a))
  )

(define (cdr z)
  z((lambda(a b) b))
  )

;; self answer

(define (exp base n)
  (define (iter x result)
    (if (> x 0)
      (iter (- x 1) (* result base)) ;;iterative reduce an assignment `result = result * base`
      result))
  (iter n 1))

(define (count-0-remainder-divisions n divisor) ;; can not figure out this solution
  (define (iter try-exp)
    (if (= (remainder n (exp divisor try-exp)) 0)
      (iter (+ try-exp 1))
      (- try-exp 1)))
  (iter 1))

;; ex 2.5, pairs of integers. 
  
 ;; Pair a, b can be stored as a single integer 2^a * 3^b, provided a 
 ;; and b are both non-negative integers.  The first part will be even, 
 ;; the last odd.  Getting rid of the even part will leave the odd, and 
 ;; vice versa. 
  
 ;; Helpers. 
  
 (define (exp base n) 
   (define (iter x result) 
     ;; invariant: base^x * result is constant. 
     (if (= 0 x) 
         result 
         (iter (- x 1) (* base result)))) 
   (iter n 1)) 
  
  
 (define (count-0-remainder-divisions n divisor) 
   (define (iter try-exp) 
     (if (= 0 (remainder n (exp divisor try-exp))) 
         (iter (+ try-exp 1))  ;; Try another division. 
         (- try-exp 1))) 
  
   ;; We don't need to try 0 divisions, as that will obviously pass. 
   (iter 1)) 
  
  
 ;; cons, car, cdr 
 (define (my-cons a b) (* (exp 2 a) (exp 3 b))) 
 (define (my-car z) (count-0-remainder-divisions z 2)) 
 (define (my-cdr z) (count-0-remainder-divisions z 3)) 

  ;; Another way to define count-0-remainder-divisions 
  
 (define (divides? a b) 
   (= 0 (remainder b a))) 
  
 (define (count-0-remainder-divisions n divisor) 
   (define (iter x divisions) 
     (if (divides? divisor x) 
         (iter (/ x divisor) (+ divisions 1)) 
         divisions)) 
   (iter n 0)) 


;; Constructor  chekkal's answer 
 (define (cons a b) (* (expt 2 a) (expt 3 b))) 
 ;; Enables us to calculate the log of n in base b 
 (define (logb b n) (floor (/ (log n) (log b)))) 
 ;; Selectors 
 (define (car x) (logb 2 (/ x (gcd x (expt 3 (logb 3 x)))))) 
 (define (cdr x) (logb 3 (/ x (gcd x (expt 2(logb 2 x)))))) 

;;This is probably similar to chekkal's answer at the end of the day. One downside is it returns floats, but this could probably be remedied via a round procedure (not yet introduced in course).
 (define (cons a b) 
   (* (expt 2 a) (expt 3 b))) 
  
 ; once we factor out the 3s, then: 
 ; 2^a = z 
 ; log(2^a) = log(z) 
 ; a*log(2) = log(z) 
 ; a = log(z) / log (2) 
  
 (define (car z) 
   (define (divisble-by-3? a) 
     (= (remainder a 3) 0)) 
   (if (divisble-by-3? z) 
     (car (/ z 3)) 
     (/ (log z) (log 2)))) 
  
 ; once we factor out the 2s, then: 
 ; 3^b = z 
 ; log(3^b) = log(z) 
 ; b * log(3) = log(z) 
 ; b = log(z) / log(3) 
  
 (define (cdr z) 
   (define (even? a) 
     (= (remainder a 2) 0)) 
   (if (even? z) 
     (cdr (/ z 2)) 
     (/ (log z) (log 3)))) 

 ;;there exist some mistakes in chekkal's code, which leads to wrong results in some condition. For example, (cdr (cons 11 17) will get 16 as output. Below are my codes,

 (define (cons a b) (* (expt 2 a) (expt 3 b) ) ) 
 (define (logb b n) 
  (ceiling (/ (log n) (log b) ) 
  ) 
  ) 
 (define (car n) 
  (logb 2  
                   (gcd 
                    n 
                    (expt 2 (logb 2 n) ) 
                   ) 
  ) 
  ) 
 (define (cdr n) 
  (logb 3  
                   (gcd 
                    n 
                    (expt 3 (logb 3 n) ) 
                   ) 
  ) 
  ) 
                                 ;test 
                                 (define x (cons 11 17) ) 
                                 (car x) 
                                 (cdr x) 

  
 ;;;Helpers 
 ;;Computes b^n ref: SICP -section 1.2.4 
 ;; b^n  = 1 if n = 0 
 ;;      = (b^(n/2))^2 if n even 
 ;;      = b.b^(n-1)  o.w. 
 (define (expt b n) 
   (define (even? n) (= (remainder n 2) 0)) 
   (define (square x) (* x x)) 
   (cond ((= n 0) 1) 
        ((even? n) (square (expt b (/ n 2)))) 
        (else (* b (expt b (- n 1)))))) 
  
 ;;return p where n = (k^p).q such that k does not divide q 
 (define (pow k n) 
     (if (not (= 0 (remainder n k)))  0  (+ 1 (pow k (quotient n k))))) 
  
 ;;test pow 
 (pow 2 (* (expt 2 3) (expt 7 11))) 
 (pow 7 (* (expt 2 3) (expt 7 11))) 
 (pow 5 (* (expt 2 3) (expt 7 11))) 
  
 ;;;represent pairs of non-negative integers as 2^a.3^b 
 (define (cons a b)  (* (expt 2 a) (expt 3 b))) 
 (define (car p) (pow 2 p)) 
 (define (cdr p) (pow 3 p))


  (define (cons x y) 
   (* (expt 2 x) (expt 3 y))) 
  
 (define (car z)            
   (if (= (gcd z 2) 1)      
     0                      
     (+ 1 (car (/ z 2))))) 
  
 (define (cdr z)           
   (if (= (gcd z 3) 1)     
     0                     
     (+ 1 (cdr (/ z 3))))) 


;; The last solution can be abstracted further:
(define (largest-power-of a z) 
   (if (= (remainder z a) 0) 
     (+ 1 (largest-power-of a (/ z a))) 
     0)) 
  
 (define (car z) 
   (largest-power-of 2 z)) 
  
 (define (cdr z) 
   (largest-power-of 3 z)) 


;; 2.6

(define zero (lambda(f) (lambda(x) x)))
(define (add-1 n)
  (lambda(f) (lambda (x) (f ((n f) x)))))