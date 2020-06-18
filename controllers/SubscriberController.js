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
    const { email } = req.body;
    const data = await SubscriberService.unSubscribe({ email });
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

const mailSubscribers = () => async (req, res, next) => {
  try {
    const message = { subject: "", html: "", ...req.body.message };
    const data = await SubscriberService.mailSubscribers(message);
    return res.status(200).json({
      message: "mailed subscribers:",
      status: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  subscribe,
  unSubscribe,
  getAllSubscribers,
  mailSubscribers,
  subscribeRouteValidation,
};
