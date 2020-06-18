const NodeMailer = require("nodemailer");

const UserModel = require("../models/User");

const subscribe = async (param) => {
  try {
    let user = await UserModel.findOne(param);
    if (user) {
      user.isSubscribed = true;
      const subscribedUser = await user.save();
      return subscribedUser;
    }
    const newUser = await UserModel.create({ ...param, isSubscribed: true });
    return newUser;
  } catch (error) {
    throw error;
  }
};

const unSubscribe = async (param) => {
  try {
    let user = await UserModel.findOne(param);
    if (user) {
      user.isSubscribed = false;
      const unSubscribedUser = await user.save();
      return unSubscribedUser;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const getAllSubscribers = async () => {
  try {
    const data = await UserModel.find({ isSubscribed: true });
    return data;
  } catch (error) {
    throw error;
  }
};

const mailSubscribers = async (message) => {
  const transporter = NodeMailer.createTransport({
    service: process.env.MailService || "gmail", // service should be set on process
    auth: {
      user: process.env.MailUser || "appsemail@gmail.com", // Should be set on env
      pass: process.env.MailPass || "appspassword", // Should be set on env
    },
  });
  try {
    const subscribers = await getAllSubscribers();
    return await subscribers.reduce(async (acc, cur) => {
      acc = await acc;
      const mailOptions = {
        from: "Fgn-tracker@noreply.com",
        to: cur.email,
        subject: message.subject,
        html: message.html,
      };
      return [...acc, await transporter.sendMail(mailOptions)];
    }, []);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  subscribe,
  unSubscribe,
  getAllSubscribers,
  mailSubscribers,
};
