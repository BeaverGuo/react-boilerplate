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



