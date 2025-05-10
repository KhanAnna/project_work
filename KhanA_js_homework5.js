var services = {
    "стрижка": "60 грн",
    "гоління": "80 грн",
    "Миття голови": "100 грн",

    price: function () { // метод, який обчислює та повертає загальну вартість наданих послуг.
        let sum = 0;

        for (let key in this) {
            if (typeof this[key] === "string" && this[key].includes("грн")) {
                let price = parseFloat(this[key]);
                if (!isNaN(price)) {
                    sum += price;
                }
            }
        }

        if (sum === 0) {
            return "Немає доступних послуг";
        }

        return sum.toFixed(2) + " грн";
    },

    minPrice: function () { // метод, який повертає мінімальну ціну.
        let min = Infinity;

        for (let key in this) {
            if (typeof this[key] === "string" && this[key].includes("грн")) {
                let price = parseFloat(this[key]);
                if (price < min) {
                    min = price;
                }
            }
        }

        if (min === Infinity) {
            return "Немає доступних послуг";
        }

        return min.toFixed(2) + " грн";
    },

    maxPrice: function () { // метод, який повертає максимальну ціну.
        let max = -Infinity;

        for (let key in this) {
            if (typeof this[key] === "string" && this[key].includes("грн")) {
                let price = parseFloat(this[key]);
                if (price > max) {
                    max = price;
                }
            }
        }

        if (max === -Infinity) {
            return "Немає доступних послуг";
        }

        return max.toFixed(2) + " грн";
    }
};

// Додаємо нову послугу
services["Розбити скло"] = "200 грн";

// Результат
console.log("Загальна вартість: ", services.price());
console.log("Мінімальна ціна: ", services.minPrice());
console.log("Максимальна ціна: ", services.maxPrice());
