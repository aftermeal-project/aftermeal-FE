import { useMutation } from '@tanstack/react-query';
import { LoginAPI } from '../../../libs/api/auth';
import Token from '../../../libs/utils/token';
import { AxiosError } from 'axios';
import { errorMessages, validationMessages } from '../../../constants';
import { FieldError, UseFormSetError } from 'react-hook-form';
import { NavigateFunction } from 'react-router-dom';
import { LoginRequestDto, LoginResponseDto } from '../../../types';

const token = new Token();

interface useLoginProps {
  setError: UseFormSetError<LoginRequestDto>;
  navigate: NavigateFunction;
}

interface handleLoginErrorProps {
  error: any;
  setError: UseFormSetError<LoginRequestDto>;
}

function handleLoginError({ error, setError }: handleLoginErrorProps) {
  if (error instanceof AxiosError) {
    const { response } = error;

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

    const fieldError = errorMapping[Number(response?.status)] || {
      type: 'manual',
      message: errorMessages.UNKNOWN_ERROR,
    };

    setError(response?.status === 400 ? 'password' : 'email', fieldError);
  } else {
    setError('email', {
      type: 'Unknown Error',
      message: errorMessages.UNKNOWN_ERROR,
    });
  }
}

function handleOnSuccess(data: LoginResponseDto, navigate: NavigateFunction) {
  let onlyToken = JSON.parse(JSON.stringify(data));
  delete onlyToken.user;

  token.setUser(onlyToken);
  navigate('/');
}

export default function useLogin({ setError, navigate }: useLoginProps) {
  const mutation = useMutation({
    mutationFn: (data: LoginRequestDto) => LoginAPI(data),
    onSuccess: (data: LoginResponseDto) => handleOnSuccess(data, navigate),
    onError: (error: any) => handleLoginError({ error, setError }),
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
