
use qauto

// Знайти користувачів у яких в імені є послідовність букв qw
db.user_profiles.find({ name: { $regex: "qw", $options: "i" }})

// Знайти користувачів у яких country дорівнює Ukraine
db.user_profiles.find({ country: "Ukraine"})

// Знайти користувачів у яких в профайлі поле country не має значення
db.user_profiles.find({ country: ""})

//Знайти користувачів у яких в профайлі поле name не починається з літери "a" обовязково використовувати $where
db.user_profiles.find({
  $where: function () {
    return this.name && !this.name.toLowerCase().startsWith("a");
  }
})

/* Робота з $lookup
Додайте колекцію car, так як це описано в схемі.
Додайте 10 автівок. */

// Напишіть запит який буде повертати інформацію по машинам та їх власників у яких mileage буде більше або дорівнювати 100 и модель атомобіля ауді

db.cars.aggregate([
  { // приєднуємо car_models
    $lookup: {
      from: "car_models",
      localField: "carModelId",
      foreignField: "carModelId",
      as: "model"
    }
  },
  { $unwind: "$model" },

  { // приєднуємо car_brands
    $lookup: {
      from: "car_brands",
      localField: "carBrandId",
      foreignField: "carBrandId",
      as: "brand"
    }
  },
  { $unwind: "$brand" },

  { // приєднуємо users
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "userId",
      as: "owner"
    }
  },
  { $unwind: "$owner" },

  {
    $match: {
      "brand.title": "Audi",
      mileage: { $gte: 100 }
    }
  },

  {
    $project: {
      _id: 0,
      brand: "$brand.title",
      model: "$model.title",
      mileage: 1,
      ownerEmail: "$owner.email",
      ownerRole: "$owner.role"
    }
  }
])

// Знайти cars у яких бранд BMW або Audi
db.car_brands.find() //подивитися id брендів, наприклад BMW = 2, Audi = 3.
db.cars.find({carBrandId: { $in: [2, 3] }})
