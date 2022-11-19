'use strict';


const toArrayInsert = cat =>[
    +cat.number, cat.name, cat.breed, +cat.weightKg, +cat.yearOfBirth
];

// returns for example: [100,'abc','laptop','x1z',23]
const toArrayUpdate = cat =>[
     cat.name, cat.breed, +cat.weightKg, +cat.yearOfBirth,+cat.number
];

module.exports={toArrayInsert,toArrayUpdate}