const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyname: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    jobtype: {
      type: String,
      enum: [
        "Full-time (On-site)",
        "Part-time (On-site)",
        "Full-time (Remote)",
        "Part-time (Remote)",
      ],
      required: true,
    },
    jobdescription: {
      type: String,
      required: true,
    },
    jobQualification: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
