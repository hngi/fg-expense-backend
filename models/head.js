const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const HeadSchema = new Schema({
      name: {
         type: String,
         required:true
      },
      tweet_handle: {
         type: String,
         required: true
      },
      head_category: {
         type: String,
         enum: [ 'minister', 'DOC', 'HOD', 'DOA' ],
         required: true
      },
      Company: {
         type: Schema.Types.ObjectId,
         ref: 'Company'
      },
      MDA: {
         type: Schema.Types.ObjectId,
         ref: 'MDA'
      },
},{
   timestamps: true
});

module.exports = mongoose.model("Head", HeadSchema);


