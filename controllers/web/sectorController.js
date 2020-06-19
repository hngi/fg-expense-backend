var mongoose = require("mongoose");
const sector = require("../../models/Sector");
var getASector = async function (req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      msg: "id is required",
    });
  }
  try {
    const fsector = await sector
      .findById(id)
      .populate("MAD")
      .populate("Budget")
      .populate("Payment");
    if (fsector) {
      res.json(fsector);
    } else {
      res.json({
        msg: "no sector found",
      });
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  getASector,
};
