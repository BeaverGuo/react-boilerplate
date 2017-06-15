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

