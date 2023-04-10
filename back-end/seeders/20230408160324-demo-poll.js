const faker = require("faker");
'use strict';

/** @type {import('sequelize-cli').Migration} */

let polls = [];
const currentDate = new Date();
console.log("current date: ",currentDate);

const currentTime = currentDate.getTime();
console.log("currentTime: ",currentTime);

const fiveYearsTimeDifference = getMSInADay() * getDaysInYears(5);

const oldTime = currentTime - fiveYearsTimeDifference;
const oldDate = new Date(oldTime);
console.log("five years ago date: ",oldDate);
// 1st bracket (24 * 60 * 60 * 1000) defines milliseconds in a day

// getMSInADay
// input: nothing
// return: number
// method:
//  1. return the total milliseconds in a day as number
function getMSInADay(){
  return 24 * 60 * 60 * 1000;
}

// 2nd bracket (30 * 12 * 5) defines how many days in 5 years
// getDaysInYears
// input: number of years
// return: number of days in that many years
// it doesnt consider leap year
// method:
function getDaysInYears(nYears){
  return nYears * 12 * 30;
}

// let fiveYears
// for(let index = 0; index < 10; index++){
//   polls.push({
//     pollDate: new Date(faker.date.between(new Date(), '2023-04-09T00:00:00.000Z').toLocaleDateString()),
//     pollTime: faker.date.between(new Date(), '2030-04-09T00:00:00.000Z').toTimeString(),
//     pollLocation: faker.finance.amount(0,4,0)
//   })
// }

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Polls', polls);
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Polls', null, {});
//   }
// };