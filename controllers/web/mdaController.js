const MDA = require("../../models/MDA");
/* eslint-disable */
const pattern = /(?<=^|(?<=[^a-zA-Z0-9-_\.]))@([A-Za-z]+[A-Za-z0-9-_]+)/; // eslint-disable-line no-use-before-define
/* eslint-enable */
exports.createMda = async (req, res) => {
  const { name, twitter_handle, mda_type, head, head_handle } = req.body;
  let mda = new MDA({ name, twitter_handle, mda_type, head, head_handle });
  const test_mda = await MDA.findOne({ name: name });
  if (!name || !mda_type) {
    //Error message
    res.status(400).send({
      status: false,
      message:
        "Error in creating this MDA. Ensure the name and mda_type fields are not empty",
    });
  } else if (test_mda) {
    //Error message
    res.status(400).send({
      status: false,
      message:
        "Error in creating this MDA. " + name + " exists in the database.",
    });
  }
  //test for twitter_handle
  else if (
    (!pattern.test(twitter_handle) && twitter_handle != "") ||
    (!pattern.test(head_handle) && head_handle != "")
  ) {
    //Error message
    res.status(400).send({
      status: false,
      message:
        "Error in creating this MDA. Ensure Twitter handles are written correctly.",
    });
  } else {
    await mda.save();

    //reponse message
    res.status(200).send({
      status: true,
      message: "MDA created successfully",
    });
  }
};

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
