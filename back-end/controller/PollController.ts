const PollModel = require('../models/Poll');
const pollSequelize = require('../mariadb');

class PollController{
    constructor() {

    }

    async getPolls(){
        const polls = await PollModel.findAll();
        return polls;
    }

    async createPoll(pollDate:string, pollTime:string, pollLocation:string):Promise<boolean>{
        const poll = await PollModel.create({pollDate: pollDate, pollTime: pollTime, pollLocation: pollLocation});
        console.log("poll object in createPoll method is poll controller: ",poll);
        return poll.dataValues.isNewRecord === false ? true : false ;
    }
}

const pollController = new PollController();

// pollController.getPolls().then(response => console.log(response));

export default pollController;