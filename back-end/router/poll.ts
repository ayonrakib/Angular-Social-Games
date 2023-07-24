import express from "express";
const router = express.Router();
import playerController from "../controller/PlayerController";
import userController from "../controller/UserController";
import voteTableController from "../controller/VoteTableController";
import pollController from "../controller/PollController";
import ApiError from "../utils/exception";
import Response from "../utils/rest";
import verifyInput from "../utils/VerifyInput";
import dotenv from "dotenv";
dotenv.config();

router.get("/get-polls", async (req: any, res: any) => {
  console.log("reached /get-polls url!");
  const polls = await pollController.getPolls();
  res.send(polls);
});

router.post("/create-poll", async (req: any, res: any) => {
  console.log("reached /create-poll url!");
  console.log("req is: ", req.body);
  let pollDate = req.body.pollDate;
  let pollTime = req.body.pollTime;
  let pollLocation = req.body.pollLocation;
  let owner_id = req.body.owner_id;
  if (pollDate != "" && pollTime != "" && pollLocation != "") {
    let poll = await pollController.createPoll(
      pollDate,
      pollTime,
      pollLocation,
      owner_id
    );
    res.send(poll);
  }
});

router.post("/cast-vote", async (req: any, res: any) => {
  console.log("came in cast vote url.");
  console.log("req is: ", req.body);
  const pollId = req.body.pollId;
  const voteType = req.body.voteType;
  const session = req.body.session;
  const isVoteCast = await voteTableController.castVote(
    pollId,
    voteType,
    session
  );
  const response = new Response(true, null);
  res.send(response);
});

router.get("/vote/get-votes", async (req: any, res: any) => {
  console.log("came in get votes url!");
  const votes = await voteTableController.getVotes();
  const response = new Response(votes, null);
  res.send(response);
});

router.post("/vote/get-voters", async (req: any, res: any) => {
  console.log("came in get voters url!");
  console.log("req.body: ", req.body);
  const pollId = req.body.pollId;
  const voters = await voteTableController.getVoters(pollId);
  res.send(voters);
});

module.exports = router;
