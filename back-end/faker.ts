import faker from 'faker';

var randomName = faker.name.findName(); // Generates a random name
var randomEmail = faker.internet.email(); // Generates a random email
var randomProduct = faker.commerce.productName(); // Generates a random product name
var randomCompany = faker.company.companyName(); // Will give back a random company name
var randomCard = faker.helpers.createCard(); // It's output is a random contact card containing many properties
var randomPassword = faker.internet.password(); //random pass
var randomSalt = faker.random.alphaNumeric(10)

for (let i = 0; i < 3; i++) {
	console.log("randomName: ",randomName); // Outputs a random name
	console.log("randomEmail: ",randomEmail); // Outputs a random email
	console.log("randomProduct: ",randomProduct); // Outputs the random product name generated
	console.log("randomCompany: ",randomCompany); // Produces a random company name
	console.log("randomCard: ",randomCard); // Gives back a random card
	console.log("past date: ",faker.date.past()); // Generates a random past date
    console.log("randomPassword: ",randomPassword); // Gives back a random card
    console.log("randomSalt: ",randomSalt); // Gives back a random card
}