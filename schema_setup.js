use qauto;

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'email',
        'password',
        'role',
        'createdAt',
        'updatedAt'
      ],
      properties: {
        email: {
          bsonType: 'string'
        },
        password: {
          bsonType: 'string'
        },
        role: {
          bsonType: 'string'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        }
      }
    }
  
});

db.createCollection("user_profiles", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'userId',
        'name',
        'lastName',
        'dateBirth',
        'country',
        'createdAt',
        'updatedAt'
      ],
      properties: {
        userId: {
          bsonType: 'int'
        },
        name: {
          bsonType: 'string'
        },
        lastName: {
          bsonType: 'string'
        },
        dateBirth: {
          bsonType: 'date'
        },
        country: {
          bsonType: 'string'
        },
        photoFilename: {
          bsonType: 'string'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        }
      }
    }
  }
});

db.createCollection("car_brands", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'title',
        'createdAt',
        'updatedAt'
      ],
      properties: {
        title: {
          bsonType: 'string'
        },
        logoFilename: {
          bsonType: 'string'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        }
      }
    }
  }
});

db.createCollection("car_models", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'carBrandId',
        'title',
        'createdAt',
        'updatedAt'
      ],
      properties: {
        carBrandId: {
          bsonType: 'int'
        },
        title: {
          bsonType: 'string'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        }
      }
    }
  }
});

db.createCollection("cars", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'carBrandId',
        'carModelId',
        'userId',
        'mileage',
        'initialMileage',
        'createdAt',
        'updatedAt'
      ],
      properties: {
        carBrandId: {
          bsonType: 'int'
        },
        carModelId: {
          bsonType: 'int'
        },
        userId: {
          bsonType: 'int'
        },
        mileage: {
          bsonType: 'int'
        },
        initialMileage: {
          bsonType: 'int'
        },
        updatedMileageAt: {
          bsonType: 'date'
        },
        carCreatedAt: {
          bsonType: 'date'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        }
      }
    }
  }
});
