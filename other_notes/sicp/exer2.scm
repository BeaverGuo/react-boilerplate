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
;iterative

(define (f n)
  (define (iter a b c count)
    (if (= count 0)
      a
      (iter b c (+ c (* 2 b) (* 3 a)) (- count 1)))) ;; ? b c already computed and the last is the new. eg: 0 1 2 --> 1 2 4 ?
  (iter 0 1 2 n))

;; get the relationship between f(n+1) and f(n)
; f(n+1) = f(n) + 2f(n-1) + 3f(n-2)    --> ? c b  and ? is below
; f(n)   = f(n-1) + 2f(n-2) + 3f(n-3)  --> c b a  ? is f(n) = c+2b+3a

