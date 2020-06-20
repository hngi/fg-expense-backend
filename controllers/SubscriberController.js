/* eslint-disable no-useless-escape */
const SubscriberService = require("../services/subscriberService");

const subscribeRouteValidation = () => (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return res.status(422).json({
      message: "email is required",
      status: 422,
    });
  return next();
};

const subscribe = () => async (req, res, next) => {
  try {
    const { email } = req.body;
    if (
      !email ||
      !email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    ) {
      return res.status(400).json("please provide a valid email");
    }
    const data = await SubscriberService.subscribe({ email });
    return res.status(200).json({
      message: "subscribed successfully:",
      status: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const unSubscribe = () => async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await SubscriberService.unSubscribe({ _id: id });
    if (!data) {
      res.status(404).json({ message: "no subscriber with that ID" });
    }
    return res.status(200).json({
      message: "unsubscribed successfully:",
      status: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSubscribers = () => async (req, res, next) => {
  try {
    const subscribers = await SubscriberService.getAllSubscribers();
    return res.status(200).json({
      message: "all subscribers:",
      status: 200,
      data: subscribers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  subscribe,
  unSubscribe,
  getAllSubscribers,
  subscribeRouteValidation,
};
