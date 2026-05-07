// models/Employee/Employee.js

const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    // BASIC INFO
    profileImage: {
      type: String,
      default: "",
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      enum: ["Admin", "Manager", "Staff"],
      default: "Staff",
    },

    language: {
      type: String,
      default: "India",
    },

    verified: {
      type: Boolean,
      default: true,
    },

    // LOCATION
    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    zipCode: {
      type: String,
      default: "",
    },

    // EMPLOYEE DETAILS
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      default: "Staff",
    },

    salary: {
      type: Number,
      default: 0,
    },

    shift: {
      type: String,
      enum: ["Morning", "Evening", "Night"],
      default: "Morning",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    // BANK DETAILS
    bankName: {
      type: String,
      default: "",
    },

    accountHolderName: {
      type: String,
      default: "",
    },

    accountNumber: {
      type: String,
      default: "",
    },

    ifscCode: {
      type: String,
      default: "",
    },

    // DOCUMENTS
    aadhaarCard: {
      type: String,
      default: "",
    },

    panCard: {
      type: String,
      default: "",
    },

    drivingLicense: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);