class CustomError extends Error {
  constructor(message, status, details) {
    super(message);  // Pass the first message to the Error constructor
    this.status = status;
    this.details = details; // Add a second message
  }
}

module.exports = CustomError