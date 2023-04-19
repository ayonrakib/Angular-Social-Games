import faker from "faker";

for (let i = 0; i < 1; i++) {
  var randomName = faker.name.findName(); // Generates a random name
  var randomEmail = faker.internet.email(); // Generates a random email
  var randomProduct = faker.commerce.productName(); // Generates a random product name
  var randomCompany = faker.company.companyName(); // Will give back a random company name
  var randomCard = faker.helpers.createCard(); // It's output is a random contact card containing many properties
  var randomPassword = faker.internet.password(); //random pass
  var randomSalt = faker.random.alphaNumeric(10); //generates a random salt
  var randomNumber = faker.finance.amount(0, 4, 0);
  var randomDate = faker.date
    .between(new Date(), "2023-04-09T00:00:00.000Z")
    .toLocaleDateString();
  var randomTime = faker.date
    .between(new Date(), "2030-04-09T00:00:00.000Z")
    .toLocaleTimeString();
  console.log("randomTime: ", randomTime); // Outputs a random randomNumber
  console.log("randomTime type: ", typeof randomTime);
  console.log("randomDate: ", randomDate); // Outputs a random randomNumber
  console.log("randomDate type: ", typeof randomDate);

  console.log("randomNumber: ", randomNumber); // Outputs a random randomNumber
  console.log("randomName: ", randomName); // Outputs a random name
  console.log("randomEmail: ", randomEmail); // Outputs a random email
  console.log("randomProduct: ", randomProduct); // Outputs the random product name generated
  console.log("randomCompany: ", randomCompany); // Produces a random company name
  // console.log("randomCard: ",randomCard); // Gives back a random card
  console.log("past date: ", faker.date.past()); // Generates a random past date
  console.log("randomPassword: ", randomPassword); // Gives back a random card
  console.log("randomSalt: ", randomSalt); // Gives back a random card
}

// console.log("current time: ", new Date().to);
