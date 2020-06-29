const express = require("express");
const logger = require("./logger");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(logger());

app.get("/", (req, res) => {
  const appointments = db.get("appointments").value();
  if (!appointments || !appointments.length) {
    res.status(404).json({ message: "No appointments found" });
  } else {
    res.json(appointments);
  }
});

app.post("/appointments", (req, res) => {
  const parameters = req.body.queryResult.parameters;
  //console.log("parameters", parameters);
  const apptObj = {
    date_time: parameters["date-time"].date_time,
    // time: parameters["time"],
  };
  // console.log(apptObj);
  db.get("appointments").push(apptObj).write();
  const fulfillmentMessages = req.body.queryResult.fulfillmentMessages;
  console.log("messages " + fulfillmentMessages);
  res.json({ fulfillmentMessages });
});

module.exports = app;
