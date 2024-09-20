import { validationMessages } from '../messages';

const signupValidationRules = {
  nameValidationRules: {
    required: validationMessages.REQUIRED_NAME,
    maxLength: {
      value: 10,
      message: validationMessages.MAX_LENGTH_NAME,
    },
  },
  emailValidationRules: {
    required: validationMessages.REQUIRED_EMAIL,
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: validationMessages.INVALID_EMAIL,
    },
  },
  generationValidationRules: {
    required: validationMessages.REQUIRED_GENERATION,
    min: {
      value: 1,
      message: validationMessages.POSITIVE_GENERATION,
    },
  },
  passwordValidationRules: {
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
  },
};

export default signupValidationRules;
