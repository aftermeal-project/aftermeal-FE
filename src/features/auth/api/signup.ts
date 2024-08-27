import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { errorMessages, validationMessages } from '../../../constants';
import { UseFormSetError } from 'react-hook-form';
import { NavigateFunction } from 'react-router-dom';
import { SignupAPI } from '../../../libs/api/user';
import { SignupRequest } from '../../../types/user';

interface useSignupProps {
  setError: UseFormSetError<SignupRequest>;
  navigate: NavigateFunction;
}

interface HandleSignupErrorProps {
  error: any;
  setError: UseFormSetError<SignupRequest>;
}

function handleSignupError({ error, setError }: HandleSignupErrorProps) {
  if (error instanceof AxiosError) {
    const { response } = error;

    const errorMapping: Record<
      number,
      { field: keyof SignupRequest; message: string }
    > = {
      400: {
        field: 'generationNumber',
        message: validationMessages.GENERATION_RANGE_ERROR,
      },
      404: {
        field: 'generationNumber',
        message: validationMessages.GENERATION_NOT_FOUND_ERROR,
      },
      409: {
        field: 'email',
        message: validationMessages.DUPLICATE_EMAIL,
      },
    };

    const errorDetail = errorMapping[Number(response?.status)];

    if (errorDetail) {
      setError(errorDetail.field, {
        type: 'manual',
        message: errorDetail.message,
      });
    } else {
      setError('email', {
        type: 'manual',
        message: errorMessages.UNKNOWN_ERROR,
      });
    }
  } else {
    setError('email', {
      type: 'manual',
      message: errorMessages.UNKNOWN_ERROR,
    });
  }
}

export default function useSignup({ setError, navigate }: useSignupProps) {
  const mutation = useMutation({
    mutationFn: (data: SignupRequest) => SignupAPI(data),
    onSuccess: data => {
      navigate('/login');
    },
    onError: (error: any) => {
      handleSignupError({ error, setError });
    },
  });

  return {
    signup: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
