const fs = require("fs");
const path = require("path");
const {
  ensureLogsDirectory,
  generateLogFileName,
  getUniqueFilePath,
  getCurrentTimestamp,
} = require("./logHelpers");
const { parseErrorMessage, getActionContext } = require("./errorParsing");
const { getPossibleCauses, getSuggestedFixes } = require("./troubleshooting");

const writeErrorLog = (req, res, status, errorMessage) => {
  try {
    const logsDir = ensureLogsDirectory();
    const fileName = generateLogFileName();
    const finalFilePath = getUniqueFilePath(logsDir, fileName);

    const requestDate = getCurrentTimestamp();
    const { action, resource } = getActionContext(
      req.method,
      req.originalUrl || req.url
    );
    const errorDetails = parseErrorMessage(
      errorMessage,
      status,
      req.method,
      req.originalUrl || req.url
    );

    const logEntry = {
      timestamp: requestDate,
      requestInfo: {
        method: req.method,
        url: req.originalUrl || req.url,
        userAgent: req.get("User-Agent") || "Unknown",
        clientIP: req.ip || req.connection.remoteAddress || "Unknown",
      },
      errorSummary: {
        statusCode: status,
        category: errorDetails.category,
        action: action,
        resource: resource,
        description: errorDetails.description,
      },
      errorMessage: errorDetails.userFriendlyMessage,
      technicalDetails: errorDetails.technicalDetails,
      troubleshooting: {
        possibleCauses: getPossibleCauses(errorDetails.category, req.method),
        suggestedFixes: getSuggestedFixes(errorDetails.category, req.method),
      },
    };

    const logContent = JSON.stringify(logEntry, null, 2) + "\n";

    fs.writeFileSync(finalFilePath, logContent, "utf8");
    console.log(
      `📋 Error log created: ${path.basename(finalFilePath)} - ${
        errorDetails.category
      }`
    );
  } catch (error) {
    console.error("Failed to write error log:", error.message);
  }
};

module.exports = { writeErrorLog };
