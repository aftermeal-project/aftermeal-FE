import { AxiosError } from 'axios';

export function errorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    console.log('asd');
    if (!error.response) {
      alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
    }
  } else if (error instanceof Error && error.message === 'timeout') {
    alert('요청 시간이 초과되었습니다. 다시 시도해 주세요.');
  } else {
    alert('예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
  }
}
