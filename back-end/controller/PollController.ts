const PollModel = require('../models/Poll');
const pollSequelize = require('../mariadb');

class PollController{
    constructor() {

    }

    async getPolls(){
        const polls = await PollModel.findAll();
        return polls;
    }
}

const pollController = new PollController();

// pollController.getPolls().then(response => console.log(response));

export default pollController;