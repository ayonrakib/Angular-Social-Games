declare var require: any
const expresAapp = require('express');
const router = expresAapp.Router();
const crypto = require("crypto-js");
// const pollController = require("./controller/PollController");
import pollController from "./controller/PollController";
import userController from "./controller/UserController";

router.get('/', (req:any, res:any) => {
    console.log("reached / url!");
    res.send('Server started!');
    res.end();
})

router.get('/get-polls', async (req:any, res:any) => {
    console.log("reached /get-polls url!");
    const polls = await pollController.getPolls();
    res.send(polls);
})

router.post('/create-poll', async (req:any, res:any) => {
    console.log("reached /create-poll url!");
    console.log("req is: ",req.body);
    let pollDate = req.body.pollDate;
    let pollTime = req.body.pollTime;
    let pollLocation = req.body.pollLocation;
    if(pollDate != "" && pollTime != "" && pollLocation != ""){
        let poll = await pollController.createPoll(pollDate, pollTime, pollLocation);
        res.send(true);
    }
})

router.get('/get-users', async (req:any, res:any) => {
    console.log("reached /get-users url!");
    const users = await userController.getUsers();
    res.send(users);
})

router.post('/get-user', async (req:any, res:any) => {
    console.log("reached /get-user url!");
    console.log("req is: ",req.body);
    const attribute = Number.isInteger(req.body.id) ? req.body.id : req.body.email;
    const user = await userController.getUser(attribute);
    res.send(user);
})

router.post('/create-user', async (req:any, res:any) => {
    console.log("reached /create-user url!");
    console.log("req is: ",req.body);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let salt = getRandomizedString();
    let session = getRandomizedString();
    let hashedPassword = hashPassword(password, salt);
    console.log("hashed pass is: ",hashedPassword);
    if(firstName != "" && lastName != "" && email != "" && password !== "" && salt != "" && session != ""){
        let user = await userController.createUser(firstName, lastName, email, hashedPassword, salt, session);
        res.send(user);
    }
})

router.post('/delete-user', async (req:any, res:any) => {
    console.log("reached /delete-user url!");
    console.log("req is: ",req.body);
    let email = req.body.email;
    if(email != ""){
        
    }
})

function getRandomizedString():string{
    return Math.random().toString(36).substring(2,7);
}

function hashPassword(password:string, salt:string):string{
    return crypto.AES.encrypt(password,salt).toString();
}

module.exports = router;