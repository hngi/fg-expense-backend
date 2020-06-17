const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SectorSchema = new Schema({
    name: {
       type: String,
       required:true
    },
    MDAs: [{
       type: Schema.Types.ObjectId,
       ref: 'MDA'
    }],
    // Projects: [{
    // type: Schema.Types.ObjectId,
    // ref: 'Project'
    // }], Since the MDA has Projects in them...
    budgets: [{
    type: Schema.Types.ObjectId,
    ref: 'Budget'
    }],
    expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
    }],
},{
   timestamps: true 
})

module.exports = mongoose.model("Sector", SectorSchema);


