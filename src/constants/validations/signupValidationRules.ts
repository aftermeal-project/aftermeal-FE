import { validationMessages } from './validationMessages';

export const nameValidationRules = {
  required: validationMessages.REQUIRED_NAME,
  maxLength: {
    value: 40,
    message: validationMessages.MAX_LENGTH_NAME,
  },
};

export const emailValidationRules = {
  required: validationMessages.REQUIRED_EMAIL,
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: validationMessages.INVALID_EMAIL,
  },
};

export const generationValidationRules = {
  required: validationMessages.REQUIRED_GENERATION,
  min: {
    value: 1,
    message: validationMessages.POSITIVE_GENERATION,
  },
};

export const passwordValidationRules = {
  required: validationMessages.REQUIRED_PASSWORD,
  maxLength: {
    value: 20,
    message: validationMessages.MAX_LENGTH_PASSWORD,
  },
  minLength: {
    value: 8,
    message: validationMessages.MIN_LENGTH_PASSWORD,
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: validationMessages.INVALID_PASSWORD,
  },
};
