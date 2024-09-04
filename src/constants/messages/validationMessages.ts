const validationMessages = {
  REQUIRED_NAME: '이름은 필수 입력입니다.',
  MAX_LENGTH_NAME: '이름은 최대 40자 이하여야 합니다.',
  REQUIRED_EMAIL: '이메일은 필수 입력입니다.',
  INVALID_EMAIL: '유효한 이메일 주소를 입력해주세요.',
  INVALID_STUDENT_EMAIL: '학생은 학교 이메일을 입력해야 합니다.',
  REQUIRED_GENERATION: '기수는 필수 입력입니다.',
  POSITIVE_GENERATION: '기수는 양수여야 합니다.',
  REQUIRED_PASSWORD: '비밀번호는 필수 입력입니다.',
  MAX_LENGTH_PASSWORD: '비밀번호는 최대 20자 이하여야 합니다.',
  MIN_LENGTH_PASSWORD: '비밀번호는 최소 8자 이상이어야 합니다.',
  INVALID_PASSWORD:
    '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.',
  GENERATION_RANGE_ERROR: '재학 중인 학생이어야 합니다.',
  GENERATION_NOT_FOUND_ERROR: '존재하지 않는 기수입니다.',
  DUPLICATE_EMAIL: '이미 가입된 이메일입니다.',
  INVALID_CREDENTIALS:
    '이메일 또는 비밀번호가 잘못되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요.',
  WRONG_PASSWORD: '비밀번호가 올바르지 않습니다.',
  IS_NOT_SCHOOL_EMAIL: '학생은 학교 이메일을 사용해야 합니다.',
  REQUIRED_TITLE: '활동명은 필수 항목입니다.',
  TITLE_MIN_LENGTH: '활동명은 최소 2자 이상이어야 합니다.',
  TITLE_MAX_LENGTH: '활동명은 최대 20자 이하여야 합니다.',
  REQUIRED_LOCATION: '장소는 필수 항목입니다.',
  REQUIRED_MAX_PARTICIPANTS: '최대 참가자는 필수 항목입니다.',
  MAX_PARTICIPANTS_MIN: '최대 참가자는 최소 2명이어야 합니다.',
  MAX_PARTICIPANTS_MAX: '최대 참가자는 최대 20명이어야 합니다.',
  REQUIRED_SCHEDULED_DATE: '일정은 필수 항목입니다.',
  SCHEDULED_DATE_NOT_PAST: '날짜는 과거가 될 수 없습니다.',
  START_BEFORE_END: '신청 시작 시간은 신청 종료 시간보다 빨라야 합니다.',
  LUNCH_PM_ERROR: '점심 시간은 오후일 수 없습니다.',
  DINNER_AM_ERROR: '저녁 시간은 오전일 수 없습니다.',
  MAX_PARTICIPANTS_LESS_THAN_CURRENT:
    '최대 참가자는 현재 참가자 수보다 적을 수 없습니다.',
  TITLE_LENGTH_ERROR: '활동명은 최소 2자, 최대 20자여야 합니다.',
  INVALID_LOCATION: '올바른 장소를 선택해주세요.',
};

export default validationMessages;
