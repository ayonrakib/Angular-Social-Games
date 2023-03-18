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

module.exports = router;