/**
 * export.method = req, res function
 *
 */

const MDA = require("../../models/MDA");

exports.getAllMdas = async (req, res) => {
  try {
    const allMDAs = await MDA.find()
      .populate("Head", "_id name tweet_handle head_category")
      .populate(
        "Projects",
        "_id name Companies Companies.name Companies.tweet_handle"
      )
      .populate("expenses")
      .select("-__v");

    return res.status(200).json({
      status: "success",
      message: `${allMDAs.length} ${
        allMDAs.length > 1 ? `MDA records` : `MDA record`
      } found`,
      data: allMDAs,
    });
  } catch (error) {
    console.log("Error in fetching all MDAs >>>> \n", error);
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong. Try again.",
    });
  }
};

exports.getAllHeads = async (req, res) => {
  try {
    const MdaHandle = await MDA.find({}, { head: 1, head_handle: 1 }); //.populate(
    //   "Head",
    //   "name tweet_handle"
    // )
    if (!MdaHandle.length) {
      return res.status(400).json({
        status: "False",
        message: "There is no data to display yet",
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "Record Found",
      data: MdaHandle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};
