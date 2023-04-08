import Vote_Table from "../models/VoteTable";
const sequelize = require("../mariadb");
import ApiError from "../utils/exception";
import Response from "../utils/rest";

class VoteTableController{
    constructor(){

    }

    async castVote(pollAndVoteDetails:any):Promise<Response>{
        console.log("came in cast vote vote controller");
        let currentPoll = pollAndVoteDetails.pollId;
        let currentButton = pollAndVoteDetails.voteType;
        console.log("currentPoll and current vote: ",currentPoll, currentButton);
        const response = new Response(true, null);
        return response;
    }

    async getVotes():Promise<{}>{
        console.log("came in get votes vote table controller!");
        const votes = {yesVoters: 10, noVoters: 15, maybeVoters: 69};
        const response = new Response(votes, null);
        return response;
    }
}

export default new VoteTableController();