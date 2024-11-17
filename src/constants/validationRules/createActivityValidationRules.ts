import validationMessages from '../messages/validationMessages';
import { format } from 'date-fns';

const today = format(new Date(), 'yyyy-MM-dd');

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
    validate: (value: string) =>
      value >= today || validationMessages.SCHEDULED_DATE_NOT_PAST,
  },
};

export default createActivityValidationRules;
