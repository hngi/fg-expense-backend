const commentModel = require('../models/comment');
const userModel = require('../models/User');

exports.index = function(req, res) {    
    res.json({ 
    	title: 'All Users'
    });
};
exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    try{
        const newUser = new userModel({name, email});
        await newUser.save()
        res.json({status: 'Success', message: 'New user created!', data: newUser})
    }
    catch(err){
        res.status(400).json({
            status: 'Failed', 
            message: err.message,
            data: null
        })
    }
};
exports.postCommentByEmail = async(req, res) =>{
    const {comment, name, email}  = req.body;
    try{
    const newComment = new commentModel({comment, name, email});
    await newComment.save()
    .then(comment => {
      const user = userModel.findOne({email: req.body.email})
      console.log(user)
      user.comments.push(comment)
      user.save();
    })
    .then(comment =>{
        res.status(200).json({
            status: 'Successful',
            data: comment
        })    
    })
    .catch(err => res.status(400).json({
        status: 'Failed', 
        message: err.message,
        data: null
    }))
    }
    catch(e) {
        res.status(400).json({status: 'Failed', message: `${e.message}`, data: null})
    }
}
