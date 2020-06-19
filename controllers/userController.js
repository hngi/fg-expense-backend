const userModel = require('../models/User');

exports.index = function(req, res) {    
    res.json({ 
    	title: 'All Users'
    });
};
exports.createUser =  async (req, res) => {
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

