const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/db.connect");
const app = express();
const Job = require("./model/job.model");

const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

//post an job

app.post("/job", async (req, res) => {
  try {
    const {
      title,
      companyname,
      location,
      salary,
      jobtype,
      jobdescription,
      jobQualification,
    } = req.body;

    if (
      !title ||
      !companyname ||
      !location ||
      !salary ||
      !jobtype ||
      !jobdescription ||
      !jobQualification
    ) {
      return res.status(500).json({ message: "Felids are incomplete  " });
    }

    const newjob = await Job({
      title,
      companyname,
      location,
      salary,
      jobtype,
      jobdescription,
      jobQualification,
    });
    await newjob.save();

    return res
      .status(201)
      .json({ message: "Data is saved Successfully", Job: newjob });
  } catch (error) {
    res.status(404).json({ message: "Error while Posting Job", error });
  }
});

//Api for fetching of Data

app.get("/job", async (req, res) => {
  try {
    const JobData = await Job.find();
    if (JobData) {
      res.status(201).json({ data: JobData });
    } else {
      res.status(500).json({ message: "No Job Found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error in fetching job", error });
  }
});

//Get Data By ID

app.get("/job/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const jobById = await Job.findById(id);
    if (jobById) {
      return res.status(201).json({ data: jobById });
    } else {
      res.status(500).json({ message: "No Job Found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error in fetching job by Id", error });
  }
});

// get Job by title

app.get("/jobBytitle/:title", async (req, res) => {
  try {
    const { title } = req.params;
    if (!title) {
      res.status(500).json({ message: "No title available" });
    }
    const jobsData = await Job.find({ title });
    if (jobsData) {
      return res.status(200).json({ data: jobsData });
    } else {
      return res.status(201).json(jobsData);
    }
  } catch (error) {
    res.status(404).json({ message: "Error in fetching job by Id", error });
  }
});

// ApI for Deleting Data

app.delete("/job/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const DeletedJob = await Job.findByIdAndDelete(id);
    if (DeletedJob) {
      res
        .status(201)
        .json({ message: "Data is Deleted Successfully", DeletedJob });
    }
  } catch (error) {
    res.status(404).json({ message: "Error in deleting job by Id", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is connecting on ${PORT}`);
});
