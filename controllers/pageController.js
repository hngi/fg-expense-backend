const MDA = require('../models/mdaInfo');

exports.index = function (req, res) {
  res.json({ title: 'Homepage' });
};

exports.mdaInfo = (req, res, next) => {
  MDA.find({}).then((mda) => {
      res.send({})
  });
};
