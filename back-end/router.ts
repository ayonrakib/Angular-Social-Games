const expresAapp = require('express');
const router = expresAapp.Router();
// const pollController = require("./controller/PollController");
import pollController from "./controller/PollController";

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

module.exports = router;