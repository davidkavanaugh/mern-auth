export class RegistrationError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.name = "RegistrationError";
    this.errors = errorObject;
  }
}
