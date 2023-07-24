import Vote_Table from "../models/VoteTable";
const sequelize = require("../mariadb");
import ApiError from "../utils/exception";
import Response from "../utils/rest";
import userController from "../controller/UserController";

class VoteTableController {
  constructor() {}

  async checkIfVoteAlreadyCast(
    pollId: number,
    userId: number
  ): Promise<Response> {
    console.log("came inside checkIfVoteAlreadyCast!");
    const isVoteCast = await Vote_Table.findOne({
      where: {
        pollId: pollId,
        userId: userId,
      },
    });
    if (isVoteCast === null) {
      const voteIsNotCastResponse = new Response(false, null);
      return voteIsNotCastResponse;
    }
    const voteIsCastResponse = new Response(isVoteCast, null);
    return voteIsCastResponse;
  }

  async castVote(
    pollId: number,
    voteType: string,
    session: string
  ): Promise<Response> {
    console.log("came in cast vote vote controller");
    const user = await userController.getUserWithSession(session);
    const userId = user.data.dataValues.id;
    const isVoteCast = await this.checkIfVoteAlreadyCast(pollId, userId);
    console.log("is vote already cast: ", isVoteCast);
    if (!isVoteCast.data) {
      const castVote = await Vote_Table.create({
        pollId: pollId,
        userId: userId,
        voteType: voteType,
      });
      console.log("cast vote response from table is: ", castVote);
      const newVoteCastResponse = new Response(true, null);
      return newVoteCastResponse;
    }
    await isVoteCast.data.update({ voteType: voteType });
    await isVoteCast.data.save();
    const voteUpdatedResponse = new Response(true, null);
    return voteUpdatedResponse;
  }

  async getVotes(): Promise<{}> {
    console.log("came in get votes vote table controller!");
    const votes = await Vote_Table.findAll();
    const response = new Response(votes, null);
    return response;
  }

  async getVoters(pollId: number): Promise<{}> {
    console.log("came in get votes vote table controller!");
    const votes = await Vote_Table.findAll({
      where: {
        pollId: pollId,
      },
    });
    const voters = await userController.getUsersWithVoteRecords(votes);
    console.log("voters in getVoters method in votetablecontroller: ", voters);
    return voters;
  }
}

export default new VoteTableController();
