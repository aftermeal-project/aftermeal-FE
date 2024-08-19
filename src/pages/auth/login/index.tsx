import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginRequest } from '../../../types/auth';
import { AxiosError } from 'axios';
import { LoginAPI } from '../../../libs/api/auth';
import Token from '../../../libs/utils/token';
import { useNavigate } from 'react-router-dom';
import AuthButton from '../../../components/auth/button';
import AuthFormContainer from '../../../components/auth/container';
import AuthInput from '../../../components/auth/input';
import AuthErrorText from '../../../components/auth/errorText/indext';

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onValid: SubmitHandler<LoginRequest> = async data => {
    try {
      const response = await LoginAPI(data);
      Token.setUser(response.data);
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        switch (error.response?.status) {
          case 404:
            setError('email', {
              type: 'Credentials Error',
              message:
                '이메일 또는 비밀번호가 잘못되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요.',
            });
            break;
          case 500:
            alert('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
            break;
          default:
            alert('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
            break;
        }
    }
  };

  return (
    <AuthFormContainer title="애프터밀">
      <form id="loginForm" onSubmit={handleSubmit(onValid)}>
        <AuthInput<LoginRequest>
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일"
          register={register}
          validationRules={{ required: '이메일은 필수 입력입니다.' }}
          margin="mb-4"
          srOnlyClass="sr-only"
        />
        <AuthInput<LoginRequest>
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          register={register}
          validationRules={{ required: '비밀번호는 필수 입력입니다.' }}
          margin={`${errors.email || errors.password ? '' : 'mb-7'}`}
          srOnlyClass="sr-only"
        />
        {errors.email && <AuthErrorText message={errors.email.message} />}
        {!errors.email && errors.password && (
          <AuthErrorText message={errors.password.message} />
        )}
        <AuthButton text="로그인" type="submit" />
      </form>
    </AuthFormContainer>
  );
}
