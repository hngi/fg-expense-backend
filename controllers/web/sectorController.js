var mongoose = require("mongoose");
const sector=require('../../models/Sector')
var getASector=async function(req,res){
    const id=req.params.id;
    var sectors=await sector.find()
    console.log(sectors)

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     res.status(400).json({
    //         msg:'id is required'
    //     })
    // }
    // try {
    //     const fsector=await sector.findById(id).populate('MAD').populate('Budget').populate('Payment')
    //     if(fsector){
    //         res.json(fsector)
    //     }else{
    //         res.json({
    //             msg:'no sector found'
    //         })
    //     }
       

        
    // } catch (error) {
    //     throw error
    // }


}







module.exports={
    getASector
}