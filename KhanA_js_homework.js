var a = 'number' + 3 + 3; 
// 'number' + '3' + '3' --> конкантенація
console.log(a); //number33

var b = null + 3; 
// 0 + 3 = 3 --> в арифметичних операціях null=0
console.log(b); //3

var c = 5 && "qwerty"; // 5 та "qwerty" істина тому && повертає останнє
console.log(c);//qwerty

var d = +'40' + +'2' + "hillel"; 
/* 
+'40' = 40 --> унарний плюс
+'2' = 2 --> унарний плюс 
40 + 2 + "hillel"
42 + "hillel"
'42' + "hillel"*/
console.log(d);//42hillel

var e = '10' - 5 === 6; 
// 10 - 5 === 6 -->  в арифметичних операціях віднімання '10' стає 10
// 5 === 6  --> значення не рівні та мають однаковий тип, виконана 1 умова з 2
console.log(e);//false

var f = true + false; 
/* true=1, false=0
1 + 0 = 1 --> арифметична операція */
console.log(f);//1

var g = '4px' - 3; 
/* '4px' = NaN --> '4px' не може конвертуватися в число тому стає NaN,
NaN - 3 = NaN -->  будь-які операциї з NaN повертають NaN */
console.log(g);//NaN

var h = '4' - 3; 
// 4 - 3 = 1  --> в арифметичних операциях віднімання '4' string стає number
console.log(h);//1

var i = '6' + 3 ** 0; 
// "6" + 1 --> 3 ** 0 це 1
// "6" + '1' --> відбувається конкантенація
console.log(i);//61

var j = 12 / '6'; 
// 12 / 6 = 2 --> в арифметичних операциях ділення '6' string стає number
console.log(j);//2

var k = '10' + (5 === 6); 
/* 
5 === 6 виходить folse --> значення не рівні та мають однаковий тип, виконана 1 умова з 2
'10' + folse
'10' + 'folse' --> відбувається конкантенація */
console.log(k);//10false

var l = null == ''; // з null не відбувається переведення типу даних, object == string
console.log(l);//false

var m = 3 ** (9 / 3); 
/* 
знаходимо степінь 9 / 3 = 3
3 ** 3 = 27 --> підносемо до степіня  */
console.log(m);//27

var n = !!'false' == !!'true'; 
/* true == true --> оператор ! конвертує string (не порожний) в boolean  
true == true --> порівнюємо */
console.log(n);//true 

var o = 0 || '0' && 1;//&& вище || тому поченаємо з нього
/* 
'0' && 1 --> де '0' та 1 є true, тому && повертає останнє: 1 
0 || 1 --> де 0 - false, 1 - true,|| буде false та повертає останнє: 1 */
console.log(o);// 1

var p = (+null == false) < 1; 
/* 
+null = 0
false = 0
(0 == 0) = true
true < 1
true = 1
1 < 1 = false */
console.log(p);//false

var q = false && true || true; // && вище || тому поченаємо з нього
/* 
false && true --> буде false тому що воно хибне
false || true --> буде true тому що перше хибне */
console.log(q);//true

var r = false && (false || true); // спочатку розкриємо дужки
/* 
false || true --> буде true тому що перше хибне
false && true --> буде false тому що перше значення хибне */
console.log(r);//false

var s = (+null == false) < 1 ** 5; 
/* 
+null = 0
false = 0
(0 == 0) = true
1 ** 5 = 1
true < 1
true = 1
1 < 1 = false */
console.log(s);//false
