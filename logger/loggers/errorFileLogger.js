const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

const ensureLogsDirectory = () => {
  const logsDir = path.join(__dirname, "../../logs");
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  return logsDir;
};

const TIMEZONE = "Asia/Jerusalem"; // Change to your desired timezone
const generateLogFileName = () => {
  const now = moment().tz(TIMEZONE);
  return `${now.format("YYYY-MM-DD_HH-mm-ss")}.log`;
};

const parseErrorMessage = (errorMessage, statusCode, method, url) => {
  let category = "Unknown Error";
  let description = errorMessage;
  let userFriendlyMessage = "";
  let technicalDetails = errorMessage;

  // Normalize error message for case-insensitive matching
  const msg = (errorMessage || "").toLowerCase();

  // Parse different types of errors
  if (msg.includes("cast to objectid failed")) {
    category = "Invalid ID Format";
    description =
      "The provided ID is not in the correct MongoDB ObjectId format";
    userFriendlyMessage =
      "The ID you provided is invalid. MongoDB IDs should be 24 characters long.";
  } else if (msg.includes("user already registered")) {
    category = "Duplicate User";
    description = "Attempted to register with an email that already exists";
    userFriendlyMessage = "A user with this email address already exists.";
  } else if (msg.includes("card already exists")) {
    category = "Duplicate Card";
    description = "Attempted to create a card that already exists";
    userFriendlyMessage = "A card with this email already exists.";
  } else if (msg.includes("invalid email or password")) {
    category = "Authentication Failed";
    description = "Login attempt with incorrect credentials";
    userFriendlyMessage = "The email or password provided is incorrect.";
  } else if (
    msg.includes("authentication error") ||
    msg.includes("unauthorized") ||
    msg.includes("jwt") ||
    msg.includes("token")
  ) {
    // Distinguish between missing/invalid token and forbidden
    if (msg.includes("forbidden")) {
      category = "Access Forbidden";
      description = "User lacks proper permissions for this action";
      userFriendlyMessage = "You are not authorized to perform this action.";
    } else if (msg.includes("expired")) {
      category = "Token Expired";
      description = "Authentication token has expired";
      userFriendlyMessage = "Your session has expired. Please log in again.";
    } else if (msg.includes("jwt malformed") || msg.includes("invalid token")) {
      category = "Invalid Token";
      description = "Authentication token is invalid or malformed";
      userFriendlyMessage =
        "Invalid authentication token. Please log in again.";
    } else if (msg.includes("unauthorized")) {
      category = "Authentication Failed";
      description = "Unauthorized user or invalid credentials";
      userFriendlyMessage = "You are not authorized to perform this action.";
    } else {
      category = "Authorization Failed";
      description = "Request made without proper authentication token";
      userFriendlyMessage = "You must be logged in to access this resource.";
    }
  } else if (msg.includes("authorization error")) {
    category = "Permission Denied";
    description = "User does not have permission to perform this action";
    userFriendlyMessage = "You don't have permission to perform this action.";
  } else if (msg.includes("only business users can create cards")) {
    category = "Business User Required";
    description = "Non-business user attempted to create a business card";
    userFriendlyMessage = "Only business users can create business cards.";
  } else if (msg.includes("route not found")) {
    category = "Invalid Endpoint";
    description = "Request made to a non-existent API endpoint";
    userFriendlyMessage = "The requested URL does not exist.";
  } else if (msg.includes("validation failed")) {
    category = "Validation Error";
    description = "Request data does not meet validation requirements";
    userFriendlyMessage = "The data you provided is invalid or incomplete.";
  } else if (statusCode === 404) {
    category = "Resource Not Found";
    description = "Requested resource does not exist in the database";
    userFriendlyMessage = "The requested item could not be found.";
  } else if (statusCode === 403) {
    category = "Access Forbidden";
    description = "User lacks proper permissions for this action";
    userFriendlyMessage = "You are not authorized to perform this action.";
  } else if (statusCode === 401) {
    category = "Authentication Required";
    description = "Request requires user authentication";
    userFriendlyMessage = "Please log in to access this resource.";
  } else if (statusCode >= 500) {
    category = "Server Error";
    description = "Internal server error occurred";
    userFriendlyMessage =
      "Something went wrong on our end. Please try again later.";
  }

  return {
    category,
    description,
    userFriendlyMessage,
    technicalDetails,
  };
};

const getActionContext = (method, url) => {
  let action = "Unknown Action";
  let resource = "Unknown Resource";

  // Parse the URL to understand what action was being performed
  if (url.includes("/users/login")) {
    action = "User Login Attempt";
    resource = "Authentication System";
  } else if (url.includes("/users") && method === "POST") {
    action = "User Registration";
    resource = "User Account";
  } else if (url.includes("/users") && method === "GET") {
    action = "Fetch User Data";
    resource = "User Information";
  } else if (url.includes("/users") && method === "PUT") {
    action = "Update User Profile";
    resource = "User Account";
  } else if (url.includes("/users") && method === "DELETE") {
    action = "Delete User Account";
    resource = "User Account";
  } else if (url.includes("/users") && method === "PATCH") {
    action = "Toggle Business Status";
    resource = "User Account";
  } else if (url.includes("/cards/my-cards")) {
    action = "Fetch User's Cards";
    resource = "Personal Business Cards";
  } else if (url.includes("/cards") && method === "POST") {
    action = "Create Business Card";
    resource = "Business Card";
  } else if (url.includes("/cards") && method === "GET") {
    action = "Fetch Business Card(s)";
    resource = "Business Card";
  } else if (url.includes("/cards") && method === "PUT") {
    action = "Update Business Card";
    resource = "Business Card";
  } else if (url.includes("/cards") && method === "PATCH") {
    action = "Like/Unlike Business Card";
    resource = "Business Card";
  } else if (url.includes("/cards") && method === "DELETE") {
    action = "Delete Business Card";
    resource = "Business Card";
  }

  return { action, resource };
};

const writeErrorLog = (req, res, status, errorMessage) => {
  try {
    const logsDir = ensureLogsDirectory();
    const fileName = generateLogFileName();
    const filePath = path.join(logsDir, fileName);

    // Check if file already exists, if so, append a counter
    let finalFilePath = filePath;
    let counter = 1;
    while (fs.existsSync(finalFilePath)) {
      const nameWithoutExt = path.parse(fileName).name;
      const ext = path.parse(fileName).ext;
      finalFilePath = path.join(logsDir, `${nameWithoutExt}_${counter}${ext}`);
      counter++;
    }

    const requestDate = moment().tz(TIMEZONE).format("YYYY-MM-DD HH:mm:ss");
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

const getPossibleCauses = (category, method) => {
  const causes = {
    "Invalid ID Format": [
      "ID parameter is missing characters (should be 24 characters)",
      "ID contains invalid characters (only hexadecimal allowed)",
      "Client is sending malformed requests",
    ],
    "Duplicate User": [
      "User trying to register with an existing email",
      "Previous registration was not completed properly",
      "User forgot they already have an account",
    ],
    "Authentication Failed": [
      "User entered wrong email or password",
      "Account may not exist",
      "Password may have been changed",
    ],
    "Authorization Failed": [
      "No authentication token provided",
      "Token has expired (24-hour limit)",
      "Token is malformed or invalid",
    ],
    "Permission Denied": [
      "User role insufficient for action",
      "Trying to modify another user's data",
      "Non-business user trying to create cards",
    ],
    "Resource Not Found": [
      "Item was deleted after client cached the ID",
      "Wrong ID provided in request",
      "Database connection issues",
    ],
    "Validation Error": [
      "Required fields are missing",
      "Data format doesn't match schema",
      "Field values are outside allowed ranges",
    ],
  };

  return causes[category] || ["Unknown cause - check technical details"];
};

const getSuggestedFixes = (category, method) => {
  const fixes = {
    "Invalid ID Format": [
      "Verify the ID is exactly 24 characters long",
      "Ensure ID contains only hexadecimal characters (0-9, a-f)",
      "Check if the ID was copied correctly",
    ],
    "Duplicate User": [
      "Try logging in instead of registering",
      "Use a different email address",
      "Contact support if you believe this is an error",
    ],
    "Authentication Failed": [
      "Double-check email and password",
      "Try resetting password if forgotten",
      "Ensure account exists before logging in",
    ],
    "Authorization Failed": [
      "Include 'x-auth-token' header in request",
      "Login again to get fresh token",
      "Verify token format is correct",
    ],
    "Permission Denied": [
      "Login with appropriate user role",
      "Request admin privileges if needed",
      "Upgrade to business account for card creation",
    ],
    "Resource Not Found": [
      "Verify the item still exists",
      "Check the ID is correct",
      "Refresh data from server",
    ],
    "Validation Error": [
      "Review required fields and data formats",
      "Check field length and type requirements",
      "Ensure all required fields are provided",
    ],
  };

  return fixes[category] || ["Check API documentation for requirements"];
};

module.exports = { writeErrorLog };
