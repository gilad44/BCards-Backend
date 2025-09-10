const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

// Get system timezone dynamically
const getSystemTimezone = () => {
  return moment.tz.guess() || "UTC";
};

const ensureLogsDirectory = () => {
  const logsDir = path.join(__dirname, "../../logs");
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  return logsDir;
};

const generateLogFileName = () => {
  const timezone = getSystemTimezone();
  const now = moment().tz(timezone);
  return `${now.format("YYYY-MM-DD_HH-mm-ss")}.log`;
};

const getUniqueFilePath = (logsDir, fileName) => {
  const filePath = path.join(logsDir, fileName);
  let finalFilePath = filePath;
  let counter = 1;

  while (fs.existsSync(finalFilePath)) {
    const nameWithoutExt = path.parse(fileName).name;
    const ext = path.parse(fileName).ext;
    finalFilePath = path.join(logsDir, `${nameWithoutExt}_${counter}${ext}`);
    counter++;
  }

  return finalFilePath;
};

const getCurrentTimestamp = () => {
  const timezone = getSystemTimezone();
  return moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");
};

module.exports = {
  ensureLogsDirectory,
  generateLogFileName,
  getUniqueFilePath,
  getCurrentTimestamp,
};
