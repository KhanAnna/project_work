function pow(x, y) {

    //  Перевірка x 
    if (typeof x !== "number") { // Відкидаємо: String, Boolean (false, true), Object (null), undefined.
        console.log("Помилка: x має бути числом!");
        return; 
        }
    if (isNaN(x)) { // Виявлення "нечислові значення" у числовому типі (undefined, NaN).
        console.log("Помилка: x не є дійсним числом (NaN)!");
        return; 
        }

    // Перевірка y
    if (typeof y !== "number") {
        console.log("Помилка: y має бути числом!");
        return; 
        }
    if (isNaN(y)) {
        console.log("Помилка: y не є дійсним числом (NaN)!");
        return; 
        }g
        
        let powX = 1;
        for (let i = 0; i < y; i++) {
            powX *= x;
        }
        console.log(powX); // виводимо результат
    }

// Умова за д/з
    pow(2, 3); // 8 викликаємо функцію

// Basic cases
    pow(7, 2); // 49
    pow(7, 3); // 343
    pow(2, 10); // 1024

// Перевірка: typeof x !== "number"
    pow("2", 5); // Помилка: x має бути числом!
    pow(true, 3); // Помилка: x має бути числом!
    pow(null, 2); // Помилка: x має бути числом!

// Перевірка: typeof y !== "number"
    pow(3, "2"); // Помилка: y має бути числом!
    pow(3, false); // Помилка: y має бути числом!

// Перевірка: isNaN(x)
    pow(NaN, 4); // Помилка: x не є дійсним числом (NaN)!
    pow(Number("abc"), 2); //  Помилка: x не є дійсним числом (NaN)!

// Перевірка: isNaN(y)
    pow(4, NaN); // Помилка: y не є дійсним числом (NaN)!
    pow(5, Number(undefined)); // Помилка: y не є дійсним числом (NaN)!
