const sector = require("../../models/Sector");
const mongoose = require("mongoose");
var getASector = async function (req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      msg: "id is required",
    });
  }
  try {
    const fsector = await sector.findById(id).populate('mdas').populate('Expense')
     
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
