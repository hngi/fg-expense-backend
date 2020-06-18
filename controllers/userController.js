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
      userModel.findOne({email: req.body.email})
      .then((user) =>{
        user.comments = user.comments.push(comment)
        user.save();
      })
      
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
};

exports.getAllUsers = (req, res) =>{
    userModel.find()
          .then((users) => {
              res.json({
                status: 'Success',
                message: 'All Users', 
                data: users
            })
        })
          .catch(err => {
              res.status(400).json({
                  status: 'Failed', 
                  message: err.message, 
                  data: null
                })
            });
};

exports.getAllComments = (req, res) =>{
    commentModel.find()
          .then((comments) =>{
                  const filteredComments  = comments.reduce((a, o) => (!o.flag && a.push({ comment : o.comment, name: o.name, email: o.email, flag: o.flag, numOfFlags: o.numOfFlags, upVotes: o.upVotes, downVotes: o.downVotes}), a), [])
                  return res.json({status: 'Success', message: 'All Clean Comments', data: filteredComments})
            })
          .catch(err => res.status(400).json({status: 'Failed', message: err.message, data: null}));
};

exports.flagComment = async (req, res) =>{
    try{
        const flagComment = await commentModel.findById({_id: req.params.id});
        if(!flagComment) return res.status(404).json({status: 'Failed', message: "No comment found", data: null });
        flagComment.flag = true;
        flagComment.numOfFlags +=1;
        flagComment.save();
        res.json({status: 'Success', message: "Comment Flagged", data: flagComment})
    }
    catch(e) {
        res.status(400).json({status: 'Failed', message: `${e.message}`, data: null})
    }
};
