import validationMessages from '../messages/validationMessages';

const loginValidationRules = {
  emailValidationRules: {
    required: validationMessages.REQUIRED_EMAIL,
  },
  passwordValidationRules: {
    required: validationMessages.REQUIRED_PASSWORD,
  },
};

export default loginValidationRules;
