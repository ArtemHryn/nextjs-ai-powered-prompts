import { Schema, model, models } from "mongoose";

const UserShema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    validate: {
      validator: function (v) {
        return v.length >= 5;
      },
      message: "Username must be at least 5 characters long!",
    },
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserShema);

export default User;
