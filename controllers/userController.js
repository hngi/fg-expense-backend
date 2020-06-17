const commentModel = require('../models/Comment');
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
exports.postCommentByEmail = (req, res) =>{

    const newComment = new commentModel({comment: req.body.comment, name: req.body.name, email: req.body.email});
    newComment.save()
    .then(comment => {
      return userModel.findOne({email: req.body.email})
    })
    .then(user => {
        user.comments.unshift(comment)
        return user.save();
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
