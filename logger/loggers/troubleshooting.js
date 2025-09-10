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
    "Duplicate Card": [
      "Card with this email already exists in the system",
      "Previous card creation may not have been completed properly",
      "Business trying to create multiple cards with same email",
    ],
    "Business User Required": [
      "User account is not set as business type",
      "User permissions have not been updated",
      "Account upgrade to business status is required",
    ],
    "Invalid Endpoint": [
      "URL path is incorrect or misspelled",
      "API endpoint has been deprecated or moved",
      "Client is using outdated API documentation",
    ],
    "Token Expired": [
      "Authentication token has exceeded its lifespan",
      "User session has been inactive too long",
      "Server clock may be out of sync",
    ],
    "Invalid Token": [
      "Token format is corrupted or incomplete",
      "Token was generated with different secret key",
      "Token payload has been tampered with",
    ],
    "Access Forbidden": [
      "User does not have required role or permissions",
      "Resource access is restricted to certain user types",
      "Account may be suspended or restricted",
    ],
    "Server Error": [
      "Database connection issues",
      "Internal application logic error",
      "Server resource exhaustion (memory, disk space)",
      "Third-party service dependency failure",
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
    "Duplicate Card": [
      "Use a different email address for the card",
      "Check if card already exists before creating",
      "Update existing card instead of creating new one",
    ],
    "Business User Required": [
      "Upgrade account to business type",
      "Contact admin to change account permissions",
      "Ensure user is logged in with business account",
    ],
    "Invalid Endpoint": [
      "Check API documentation for correct endpoint",
      "Verify URL path and method are correct",
      "Update client to use current API version",
    ],
    "Token Expired": [
      "Login again to get fresh authentication token",
      "Implement automatic token refresh in client",
      "Check if system clocks are synchronized",
    ],
    "Invalid Token": [
      "Obtain new token by logging in again",
      "Ensure token is passed correctly in headers",
      "Verify token hasn't been modified or corrupted",
    ],
    "Access Forbidden": [
      "Request appropriate permissions from administrator",
      "Ensure account is active and not suspended",
      "Login with account that has required privileges",
    ],
    "Server Error": [
      "Try the request again after a short delay",
      "Contact system administrator if error persists",
      "Check server status and try again later",
    ],
  };

  return fixes[category] || ["Check API documentation for requirements"];
};

module.exports = {
  getPossibleCauses,
  getSuggestedFixes,
};
