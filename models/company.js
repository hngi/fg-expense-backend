const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
      name: {
         type: String,
         required:true
      },
      tweet_handle: {
         type: String,
         required:true
        },
      DOC: [{
         type: Schema.Types.ObjectId,
         ref: 'Head'
      }],
      Projects: [{
         type: Schema.Types.ObjectId,
         ref: 'Project'
      }], 
      expenses: [{
         type: Schema.Types.ObjectId,
         ref: 'Payment'
      }],
},{
   timestamps: true
}
)

module.exports = mongoose.model("Company", CompanySchema);


