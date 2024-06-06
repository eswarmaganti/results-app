import Vote from "../models/vote.js";

export const getResultsController = async (req, res) => {
  try {
    const bikeCompanies = [
      "yamaha",
      "bmw",
      "honda",
      "hero",
      "royal enfield",
      "bajaj",
    ];
    const totalVotes = await Vote.countDocuments({});
    const votes = [];

    for (let bike of bikeCompanies) {
      const vote_count = await Vote.countDocuments({ vote: bike });
      votes.push({ itemName: bike, value: vote_count });
    }
    return res.status(200).json({
      votes,
      totalVotes,
      message: "Successfully fetched the votes",
      status: "success",
    });
  } catch (err) {
    console.error(
      `*** Error: Something went wrong in runtime: ${err.message} ***`
    );
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      status: "error",
      votes: [],
      totalVotes: 0,
    });
  }
};
