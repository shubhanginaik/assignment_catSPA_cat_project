'use strict';

const Datastorage = require('./storage/dataStorageLayer');

const storage=new Datastorage();
const newCat = {
    number: 11,
    name: 'Mony',
    breed: 'tiger',
    weightKg: 4,
    yearOfBirth: 2020
};

 storage.insert(newCat).then(console.log).catch(console.log);
// storage.remove(11).then(console.log).catch(console.log);
//storage.update(11,newCat).then(console.log).catch(console.log);
//storage.get(1).then(console.log).catch(console.log);