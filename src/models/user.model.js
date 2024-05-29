const {UserSchema} = require("../schema/schema");
const {model} = require("mongoose");

const User = model("User", UserSchema);

module.exports = {
  User
}
