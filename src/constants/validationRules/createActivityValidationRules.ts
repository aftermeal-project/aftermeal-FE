import validationMessages from '../messages/validationMessages';
import { formatDate } from '../../utils';

const today = formatDate(new Date().toISOString());

const createActivityValidationRules = {
  titleValidationRules: {
    required: validationMessages.REQUIRED_TITLE,
    minLength: {
      value: 2,
      message: validationMessages.TITLE_MIN_LENGTH,
    },
    maxLength: {
      value: 20,
      message: validationMessages.TITLE_MAX_LENGTH,
    },
  },
  maxParticipantsValidationRules: {
    required: validationMessages.REQUIRED_MAX_PARTICIPANTS,
    min: {
      value: 2,
      message: validationMessages.MAX_PARTICIPANTS_MIN,
    },
    max: {
      value: 20,
      message: validationMessages.MAX_PARTICIPANTS_MAX,
    },
  },

  scheduledDateValidationRules: {
    required: validationMessages.REQUIRED_SCHEDULED_DATE,
    validate: (value: string) => {
      const isDateNotPast =
        value >= today || validationMessages.SCHEDULED_DATE_NOT_PAST;
      return isDateNotPast;
    },
  },
};

export default createActivityValidationRules;
