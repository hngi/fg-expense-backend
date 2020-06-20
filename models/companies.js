const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    twitter_handle: {
      type: String,
    },
    head: { type: String },
    head_handle: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('companies', CompanySchema);
