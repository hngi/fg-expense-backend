// create a controller method in the mdaController that will return all 
//ministries and their twiiter handle,
// all ministers and their twitter handle
// one for ministries and their handle
// another for ministers and their handle

// create a controller method in the mdaController that will return all mdas 
// and their twiiter handle, all mda heads and their twitter handle. 
// use the model as guide.

const MDA=require("../../models/MDA")

  exports.getMinistries = (req, res,next)=>{
 MDA.find({},'name tweet_handle').then((result)=>{
if (!result){
    return res.send({status:"false",message:"No Mda found"})
}
return res.send({status:"True",message:result})
 }).catch((err)=>console.log(err))
  }
  //User.findOne({_id: userId}).select("-password")
  