export const HTTP_ERROR_MESSAGE = {
  400: {
    HEADING: '잘못된 요청입니다.',
    BODY: '확인 후 다시 시도해주세요.',
    BUTTON: '홈으로 돌아가기',
  },
  403: {
    HEADING: '권한 오류',
    BODY: '이 페이지에 접근할 권한이 없습니다. 확인 후 다시 시도해주세요.',
    BUTTON: '홈으로 돌아가기',
  },
  404: {
    HEADING: '404',
    BODY: '요청하신 페이지를 찾을 수 없습니다.',
    BUTTON: '홈으로 돌아가기',
  },
  500: {
    HEADING: '서버 오류가 발생했습니다',
    BODY: '잠시 후 다시 요청해주세요.',
    BUTTON: '새로고침',
  },
} as const;
