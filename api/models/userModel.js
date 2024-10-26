import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      min: 3,
      validate: [validator.isAlpha, "Name should contains only alpha char"]
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: [validator.isEmail, "Please provide a valid email"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please provide valid password"],
      select: false
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: "The two password should match"
      }
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkPassword = function (password, userPassword) {
  return bcrypt.compare(password, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
