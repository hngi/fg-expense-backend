const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', UserSchema);

exports.index = function (req, res) {
  res.json({
    title: 'All Users',
  });
};

exports.newUser = (req, res, next) => {
  User.create({ name: 'Oscar', email: 'test@test.com' })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
