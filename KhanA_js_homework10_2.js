var re = /^[^aA]{6,}$/;

console.log(re.test("Wonderful")); // true 
console.log(re.test("Joyful"));     // true 
console.log(re.test("Happiness"));  // false (є "a")
console.log(re.test("Time"));       // false (менше 6 символів)
console.log(re.test("Task"));       // false (є "a" і менше 6 символів)
console.log(re.test("Apple"));      // false (є "A" і менше 6 символі)

