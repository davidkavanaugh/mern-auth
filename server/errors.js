class NotFoundError extends Error {
  constructor(message, errorObj) {
    super(message);
    this.name = "NotFoundError";
    this.errors = errorObj;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

module.exports = {
  NotFoundError,
  UnauthorizedError,
};
