declare var require: any
const expresAapp = require('express');
const router = expresAapp.Router();
const crypto = require("crypto-js");
const fs = require('fs');
import Response from "./utils/rest";
import ApiError from "./utils/exception";
import pollController from "./controller/PollController";
import userController from "./controller/UserController";
import voteTableController from "./controller/VoteTableController";


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

router.get('/read-file', async(req:any, res:any) => {
    fs.readFile('D:/Coding/angular/login-register/back-end/db-seed/users.csv', 'utf8', (err:any, data:any) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(data)
      });
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

router.post('/update-password', async (req:any, res:any) => {
    console.log("reached /update-password url!");
    console.log("req is: ",req.body);
    let email = req.body.email;
    if(email != ""){
        const isPasswordUpdated = await userController.updatePassword(email, "password");
        console.log("is password updated: ",isPasswordUpdated);
        res.send(isPasswordUpdated)
    }
})

router.post('/cast-vote', async (req:any, res:any) => {
    console.log("came in cast vote url.");
    console.log("req is: ",req.body);
    const isVoteCast = await voteTableController.castVote(req.body);
    const response = new Response(true, null);
    res.send(response);
})

router.get('/get-votes', async (req:any, res:any) => {
    console.log("came in get votes url!");
    const votes = await voteTableController.getVotes();
    const response = new Response(votes, null);
    res.send(response);
})

router.post('/login', async (req:any, res:any) => {
    console.log("came to login url!");
    let email = req.body.email;
    let password = req.body.password;
    const loginResponse = await userController.getUser(email);
    
})

function getRandomizedString():string{
    return Math.random().toString(36).substring(2,7);
}

function hashPassword(password:string, salt:string):string{
    return crypto.AES.encrypt(password,salt).toString();
}

module.exports = router;