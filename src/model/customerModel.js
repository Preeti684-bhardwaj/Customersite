const mongoose=require('mongoose');
const uuid=require('uuid')

const customerModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "First name should be at least 2 characters long"],
      validate: [/^[A-Za-z][a-z]/, "First name should contains only letters "],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "First name should be at least 2 characters long"],
      validate: [/^[A-Za-z][a-z]/, "Last name should contains only letters"],
    },
    mobileNumber: {
      type: String,
      unique: true,
      // minLength: [9, "Mobile number must contain atleast 10-digit"],
      // maxLength: [10, "mobile number cannot have more than 10-digit"],
      validate: [/^[0-9]+$/,"mobile number must have digits only"],
    },
    DOB: {
      type: String,
      // required:true
    },
    emailID: {
      type: String,
      required: true,
    },
    address: String,
    customerID: { type: String,default:uuid ,unique: true },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customersList", customerModel);