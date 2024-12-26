import { useMutation } from '@tanstack/react-query';
import { EmailVerifyRequestDto } from '../../../types';
import { EmailVerifyAPI } from '../../../libs/api/auth';

interface useSignupProps {
  handleOnSuccess: () => void;
  handleOnError: () => void;
}

export default function useEmailVerify({
  handleOnSuccess,
  handleOnError,
}: useSignupProps) {
  const mutation = useMutation({
    mutationFn: (data: EmailVerifyRequestDto) => EmailVerifyAPI(data),
    onSuccess: () => {
      handleOnSuccess();
    },
    onError: (error: any) => {
      handleOnError();
    },
  });

  return {
    emailVerify: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
