function checkProbabilityTheory(count) {
    let evenCount = 0; // кількість парних
    let oddCount = 0;  // кількість непарних
        
        for (let i = 0; i < count; i++) {
        let rnd = Math.floor(Math.random() * (1000 - 100 + 1)) + 100; // діапазон від 100 до 1000
        console.log(`${i + 1} випадкове число =`, rnd); //результати циклу "count" разів
        
            if (rnd % 2 === 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }

    let evenPercent = (evenCount / count * 100); // Відсоткове співвідношення
    let oddPercent = (oddCount / count * 100);
        
    console.log('Кількість парних =', evenCount);
    console.log('Кількість непарних =', oddCount);
    console.log(`Відсотки: парні ${evenPercent}% | непарні ${oddPercent}%`);

        if (Math.abs(evenPercent - oddPercent) <= 5) {
            console.log("Співвідношення близьке до 50%50");
        } else {
            console.log("Співвідношення віддалене від 50%50");
        }
}
      
checkProbabilityTheory(5); // Виклик функції

