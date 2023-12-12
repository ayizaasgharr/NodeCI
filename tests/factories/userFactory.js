const mongooose = require("mongoose");
const User = mongooose.model("User");

module.exports = () => {
  return new User({}).save();
};
