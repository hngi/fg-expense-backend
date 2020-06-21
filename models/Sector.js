const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mdas: [
      {
        type: Schema.Types.ObjectId,
        ref: "mdas",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sector", SectorSchema);
