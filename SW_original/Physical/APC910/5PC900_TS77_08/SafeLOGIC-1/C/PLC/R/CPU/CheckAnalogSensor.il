. a s s e m b l y   e x t e r n   m s c o r l i b   { }  
 . a s s e m b l y   e x t e r n   _ _ F i e l d A t t r i b u t e   { }  
 . a s s e m b l y   e x t e r n   ' M a i n '   { }  
 . a s s e m b l y   e x t e r n   ' S c a l e S A F E I N T '   { }  
 . a s s e m b l y   e x t e r n   ' S R '   { }  
 . a s s e m b l y   e x t e r n   ' A C T F '   { }  
 . a s s e m b l y   ' C h e c k A n a l o g S e n s o r '   { }  
 . m o d u l e   ' C h e c k A n a l o g S e n s o r ' . d l l  
  
 . c l a s s   p u b l i c   a u t o   a n s i   b e f o r e f i e l d i n i t   ' C h e c k A n a l o g S e n s o r '   e x t e n d s   [ m s c o r l i b ] S y s t e m . O b j e c t  
 {  
 . m e t h o d   p u b l i c   h i d e b y s i g   s p e c i a l n a m e   r t s p e c i a l n a m e  
         i n s t a n c e   v o i d     . c t o r ( )   c i l   m a n a g e d  
 {  
 . m a x s t a c k     8  
  
 l d c . i 4 . 0  
 s t s f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 l d c . i 4   0  
 s t s f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E I N T _ 0 '  
 r e t  
 }  
  
  
 / /   l o c a l   v a r i a b l e s  
 . f i e l d   p u b l i c   b o o l   ' i S e n s o r M u t e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' i S e n s o r O k '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   i n t 1 6   ' i S e n s o r V a l u e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' i R e s e t '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   i n t 1 6   ' i P a r P r e O f f s e t '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   i n t 1 6   ' i P a r M u l t '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   i n t 1 6   ' i P a r D i v '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   i n t 1 6   ' o V a l u e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 3   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' o S e n s o r O k '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 3   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' o E r r o r '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 3   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' m S e n s o r A c t i v e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 9   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
  
 / /   F B   i n s t a n c e s  
 . f i e l d   p u b l i c   c l a s s   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T '   ' m S c a l e S A F E I N T '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 D   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   c l a s s   [ ' S R ' ] ' S R '   ' S R _ S _ S e n s o r E r r o r '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 C   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
  
 . f i e l d   p u b l i c   s t a t i c   b o o l   ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 A   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   s t a t i c   i n t 1 6   ' _ _ C O N S T _ S A F E I N T _ 0 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 A   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
  
 . m e t h o d   p u b l i c   h i d e b y s i g   i n s t a n c e   v o i d   _ _ c o l d s t a r t ( )   c i l   m a n a g e d  
 {  
 . m a x s t a c k     8  
  
 l d a r g . 0  
 l d s f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E I N T _ 0 '  
 s t f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' i P a r D i v '  
 l d a r g . 0  
 l d s f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E I N T _ 0 '  
 s t f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' i P a r M u l t '  
 l d a r g . 0  
 l d s f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E I N T _ 0 '  
 s t f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' i P a r P r e O f f s e t '  
 l d a r g . 0  
 l d s f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 s t f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' i R e s e t '  
 l d a r g . 0  
 l d s f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 s t f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' i S e n s o r M u t e '  
 l d a r g . 0  
 l d s f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 s t f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' i S e n s o r O k '  
 l d a r g . 0  
 l d s f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E I N T _ 0 '  
 s t f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' i S e n s o r V a l u e '  
 l d a r g . 0  
 l d s f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 s t f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' m S e n s o r A c t i v e '  
 l d a r g . 0  
 l d s f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 s t f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' o E r r o r '  
 l d a r g . 0  
 l d s f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 s t f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' o S e n s o r O k '  
 l d a r g . 0  
 l d s f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E I N T _ 0 '  
 s t f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' o V a l u e '  
 l d a r g . 0  
 l d f l d   c l a s s   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T '   ' C h e c k A n a l o g S e n s o r ' : : ' m S c a l e S A F E I N T '  
 c a l l   i n s t a n c e   v o i d   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T ' : : _ _ c o l d s t a r t ( )  
 l d a r g . 0  
 l d f l d   c l a s s   [ ' S R ' ] ' S R '   ' C h e c k A n a l o g S e n s o r ' : : ' S R _ S _ S e n s o r E r r o r '  
 c a l l   i n s t a n c e   v o i d   [ ' S R ' ] ' S R ' : : _ _ c o l d s t a r t ( )  
 r e t  
 }  
  
 . m e t h o d   p u b l i c   h i d e b y s i g   i n s t a n c e   v o i d   ' _ _ C h e c k A n a l o g S e n s o r ' ( )   c i l   m a n a g e d  
 {  
     . m a x s t a c k   2 0  
  
 . l o c a l s   ( [ 0 ]   b o o l   _ _ l 0 )  
  
     / /   N E T W O R K   0  
     I L _ 0 0 0 0 _ 0 0 0 0 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 0 1 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 0 2 :     l d f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' i S e n s o r M u t e '  
     I L _ 0 0 0 0 _ 0 0 0 3 :     n o t  
     I L _ 0 0 0 0 _ 0 0 0 4 :     s t f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' m S e n s o r A c t i v e '  
  
     / /   N E T W O R K   1  
     I L _ 0 0 0 1 _ 0 0 0 0 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 0 1 :     l d f l d   c l a s s   [ ' S R ' ] ' S R '   ' C h e c k A n a l o g S e n s o r ' : : ' S R _ S _ S e n s o r E r r o r '  
     I L _ 0 0 0 1 _ 0 0 0 2 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 0 3 :     l d f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' i S e n s o r O k '  
     I L _ 0 0 0 1 _ 0 0 0 4 :     n o t  
     I L _ 0 0 0 1 _ 0 0 0 5 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 0 6 :     l d f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' m S e n s o r A c t i v e '  
     I L _ 0 0 0 1 _ 0 0 0 7 :     a n d  
     I L _ 0 0 0 1 _ 0 0 0 8 :     s t f l d   b o o l   [ ' S R ' ] ' S R ' : : ' S E T 1 '  
     I L _ 0 0 0 1 _ 0 0 0 9 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 1 0 :     l d f l d   c l a s s   [ ' S R ' ] ' S R '   ' C h e c k A n a l o g S e n s o r ' : : ' S R _ S _ S e n s o r E r r o r '  
     I L _ 0 0 0 1 _ 0 0 1 1 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 1 2 :     l d f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' i R e s e t '  
     I L _ 0 0 0 1 _ 0 0 1 3 :     s t f l d   b o o l   [ ' S R ' ] ' S R ' : : ' R E S E T '  
     I L _ 0 0 0 1 _ 0 0 1 4 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 1 5 :     l d f l d   c l a s s   [ ' S R ' ] ' S R '   ' C h e c k A n a l o g S e n s o r ' : : ' S R _ S _ S e n s o r E r r o r '  
     I L _ 0 0 0 1 _ 0 0 1 6 :     c a l l   i n s t a n c e   v o i d   [ ' S R ' ] ' S R ' : : _ _ S R ( )  
     I L _ 0 0 0 1 _ 0 0 1 7 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 1 8 :     l d f l d   c l a s s   [ ' S R ' ] ' S R '   ' C h e c k A n a l o g S e n s o r ' : : ' S R _ S _ S e n s o r E r r o r '  
     I L _ 0 0 0 1 _ 0 0 1 9 :     l d f l d   b o o l   [ ' S R ' ] ' S R ' : : ' Q 1 '  
     I L _ 0 0 0 1 _ 0 0 2 0 :     s t l o c . s   ' _ _ l 0 '  
     I L _ 0 0 0 1 _ 0 0 2 1 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 2 2 :     l d l o c . s   ' _ _ l 0 '  
     I L _ 0 0 0 1 _ 0 0 2 3 :     n o t  
     I L _ 0 0 0 1 _ 0 0 2 4 :     s t f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' o S e n s o r O k '  
     I L _ 0 0 0 1 _ 0 0 2 5 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 2 6 :     l d l o c . s   ' _ _ l 0 '  
     I L _ 0 0 0 1 _ 0 0 2 7 :     s t f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' o E r r o r '  
  
     / /   N E T W O R K   2  
     I L _ 0 0 0 2 _ 0 0 0 0 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 0 1 :     l d f l d   c l a s s   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T '   ' C h e c k A n a l o g S e n s o r ' : : ' m S c a l e S A F E I N T '  
     I L _ 0 0 0 2 _ 0 0 0 2 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 0 3 :     l d f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' m S e n s o r A c t i v e '  
     I L _ 0 0 0 2 _ 0 0 0 4 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 0 5 :     l d f l d   b o o l   ' C h e c k A n a l o g S e n s o r ' : : ' o S e n s o r O k '  
     I L _ 0 0 0 2 _ 0 0 0 6 :     a n d  
     I L _ 0 0 0 2 _ 0 0 0 7 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 0 8 :     l d f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' i S e n s o r V a l u e '  
     I L _ 0 0 0 2 _ 0 0 0 9 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 1 0 :     l d f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' i P a r P r e O f f s e t '  
     I L _ 0 0 0 2 _ 0 0 1 1 :     c a l l   i n t 1 6   [ ' A C T F ' ] ' A C T F ' : : ' _ _ A C T F ' ( b o o l ,   i n t 1 6 ,   i n t 1 6 )  
     I L _ 0 0 0 2 _ 0 0 1 2 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 1 3 :     l d f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' i P a r P r e O f f s e t '  
     I L _ 0 0 0 2 _ 0 0 1 4 :     s u b  
     I L _ 0 0 0 2 _ 0 0 1 5 :     s t f l d   i n t 1 6   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T ' : : ' i R a w V a l u e '  
     I L _ 0 0 0 2 _ 0 0 1 6 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 1 7 :     l d f l d   c l a s s   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T '   ' C h e c k A n a l o g S e n s o r ' : : ' m S c a l e S A F E I N T '  
     I L _ 0 0 0 2 _ 0 0 1 8 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 1 9 :     l d f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' i P a r M u l t '  
     I L _ 0 0 0 2 _ 0 0 2 0 :     s t f l d   i n t 1 6   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T ' : : ' i M u l t '  
     I L _ 0 0 0 2 _ 0 0 2 1 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 2 2 :     l d f l d   c l a s s   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T '   ' C h e c k A n a l o g S e n s o r ' : : ' m S c a l e S A F E I N T '  
     I L _ 0 0 0 2 _ 0 0 2 3 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 2 4 :     l d f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' i P a r D i v '  
     I L _ 0 0 0 2 _ 0 0 2 5 :     s t f l d   i n t 1 6   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T ' : : ' i D i v '  
     I L _ 0 0 0 2 _ 0 0 2 6 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 2 7 :     l d f l d   c l a s s   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T '   ' C h e c k A n a l o g S e n s o r ' : : ' m S c a l e S A F E I N T '  
     I L _ 0 0 0 2 _ 0 0 2 8 :     l d s f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' _ _ C O N S T _ S A F E I N T _ 0 '  
     I L _ 0 0 0 2 _ 0 0 2 9 :     s t f l d   i n t 1 6   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T ' : : ' i O f f s e t '  
     I L _ 0 0 0 2 _ 0 0 3 0 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 3 1 :     l d f l d   c l a s s   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T '   ' C h e c k A n a l o g S e n s o r ' : : ' m S c a l e S A F E I N T '  
     I L _ 0 0 0 2 _ 0 0 3 2 :     c a l l   i n s t a n c e   v o i d   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T ' : : _ _ S c a l e S A F E I N T ( )  
     I L _ 0 0 0 2 _ 0 0 3 3 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 3 4 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 3 5 :     l d f l d   c l a s s   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T '   ' C h e c k A n a l o g S e n s o r ' : : ' m S c a l e S A F E I N T '  
     I L _ 0 0 0 2 _ 0 0 3 6 :     l d f l d   i n t 1 6   [ ' S c a l e S A F E I N T ' ] ' S c a l e S A F E I N T ' : : ' o S c a l e d V a l u e '  
     I L _ 0 0 0 2 _ 0 0 3 7 :     s t f l d   i n t 1 6   ' C h e c k A n a l o g S e n s o r ' : : ' o V a l u e '  
  
     / /   N E T W O R K   3  
     I L _ 0 0 0 3 _ 0 0 0 0 :     r e t  
  
 }  
 }  
 