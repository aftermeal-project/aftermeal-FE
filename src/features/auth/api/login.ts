import { useMutation } from '@tanstack/react-query';
import { LoginAPI } from '../../../libs/api/auth';
import Token from '../../../libs/utils/token';
import { errorMessages, validationMessages } from '../../../constants';
import { FieldError, UseFormSetError } from 'react-hook-form';
import { NavigateFunction } from 'react-router-dom';
import { LoginRequestDto, LoginResponseDto } from '../../../types';
import toast from 'react-hot-toast';
import { HTTPError } from '../../../libs/utils/http-error';

interface handleLoginErrorProps {
  error: any;
  setError: UseFormSetError<LoginRequestDto>;
}

function handleLoginError({ error, setError }: handleLoginErrorProps) {
  if (error instanceof HTTPError) {
    const { statusCode } = error;

    const errorMapping: Record<number, FieldError> = {
      400: {
        type: 'manual',
        message: validationMessages.WRONG_PASSWORD,
      },
      404: {
        type: 'manual',
        message: validationMessages.INVALID_CREDENTIALS,
      },
    };

    const fieldError = errorMapping[Number(statusCode)] || {
      type: 'manual',
      message: errorMessages.UNKNOWN_ERROR,
    };

    setError(statusCode === 400 ? 'password' : 'email', fieldError);
  } else {
    setError('email', {
      type: 'Unknown Error',
      message: errorMessages.UNKNOWN_ERROR,
    });
  }
}

interface handleLoginSuccessProps {
  data: LoginResponseDto;
  navigate: NavigateFunction;
}

const token = new Token();

function handleOnSuccess({ data, navigate }: handleLoginSuccessProps) {
  let onlyToken = JSON.parse(JSON.stringify(data));
  delete onlyToken.user;

  token.setUser(onlyToken);
  toast.success('로그인에 성공했습니다');
  navigate('/');
}

interface useLoginProps {
  setError: UseFormSetError<LoginRequestDto>;
  navigate: NavigateFunction;
}

export default function useLogin({ setError, navigate }: useLoginProps) {
  const mutation = useMutation({
    mutationFn: (data: LoginRequestDto) => LoginAPI(data),
    onSuccess: (data: LoginResponseDto) => handleOnSuccess({ data, navigate }),
    onError: error => handleLoginError({ error, setError }),
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
