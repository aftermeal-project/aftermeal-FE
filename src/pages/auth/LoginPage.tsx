import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginRequest } from '../../types/auth';
import { AxiosError } from 'axios';
import { LoginAPI } from '../../libs/api/auth';
import { Link, useNavigate } from 'react-router-dom';
import Token from '../../libs/utils/token';
import { loginValidationRules, validationMessages } from '../../constants';
import {
  AuthFormContainer,
  AuthInput,
  AuthErrorMessages,
  AuthButton,
  AuthLoadingSpinner,
} from '../../components/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const token = new Token();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();

  function handleLoginError(error: any) {
    if (error instanceof AxiosError) {
      const { response } = error;

      switch (response?.status) {
        case 400:
          setError('password', {
            type: 'Password Error',
            message: validationMessages.WRONG_PASSWORD,
          });
          break;
        case 404:
          setError('email', {
            type: 'Credentials Error',
            message: validationMessages.INVALID_CREDENTIALS,
          });
          break;
      }
    }
  }

  async function onValid(data: LoginRequest) {
    setLoading(true);
    try {
      const response = await LoginAPI(data);
      token.setUser(response);
      navigate('/');
    } catch (error: unknown) {
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthFormContainer title="애프터밀">
      <form id="loginForm" onSubmit={handleSubmit(onValid)}>
        <AuthInput<LoginRequest>
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일"
          register={register}
          validationRules={loginValidationRules.emailValidationRules}
          margin="mb-4"
          srOnlyClass="sr-only"
        />
        <AuthInput<LoginRequest>
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          register={register}
          validationRules={loginValidationRules.passwordValidationRules}
          margin={`${errors.email || errors.password ? '' : 'mb-7'}`}
          srOnlyClass="sr-only"
        />
        <AuthErrorMessages errors={errors} fields={['email', 'password']} />
        <AuthButton text={'로그인'} type="submit" disabled={loading} />
        <div className="mt-5">
          <Link
            to="/signup"
            className="text-sm text-[#0b57d0] transition duration-300 hover:underline"
          >
            계정 만들기
          </Link>
        </div>
      </form>
      <AuthLoadingSpinner loading={loading} text={'로그인 중'} />
    </AuthFormContainer>
  );
}
