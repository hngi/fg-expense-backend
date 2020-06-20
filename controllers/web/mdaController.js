/**
 * export.method = req, res function
 *
 */

const MDA = require("../../models/MDA");
const mongoose = require("mongoose");

exports.createMda = async (req, res) => {
  const { name, twitter_handle, head, head_handle } = req.body;
  let mda = new MDA({ name, twitter_handle, head, head_handle });
  await mda.save();

  //reponse message
  res.status(200).send({
    status: true,
    message: "Expenses created successfully",
  });
};

exports.getAllMdas = async (req, res) => {
  try {
    const allMDAs = await MDA.find();
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

exports.getMda = async (req, res) => {
  try {
    const { mdaId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(mdaId)) {
      return res.status(400).json({
        status: "Error",
        message: "A valid MDA id is required",
      });
    }
    const mdaRecord = await MDA.findById(mdaId);
    if (!mdaRecord) {
      return res.status(404).json({
        status: "Error",
        message: "MDA record not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "MDA record found",
      data: mdaRecord,
    });
  } catch (error) {
    console.log("Error in fetching an MDA >>>> \n", error);
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong. Try again.",
    });
  }
};

exports.getAllHandle = async (req, res) => {
  try {
    const MdaHandle = await MDA.find({}, { name: 1, tweet_handle: 1 })
      .populate("Head", "name", "tweet_handle")
      .exec();
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
      message: "Something went wrong try again later",
    });
  }
};
