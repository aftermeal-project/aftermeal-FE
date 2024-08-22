import { useForm } from 'react-hook-form';
import { LoginRequest } from '../../../types/auth';
import { AxiosError } from 'axios';
import { LoginAPI } from '../../../libs/api/auth';
import { Link, useNavigate } from 'react-router-dom';
import AuthButton from '../../../components/auth/button';
import AuthFormContainer from '../../../components/auth/container';
import AuthInput from '../../../components/auth/input';
import token from '../../../libs/utils/token';
import AuthErrorMessages from '../../../components/auth/error';
import { emailValidationRules } from '../../../constants/validations/loginValidationRules';
import { passwordValidationRules } from '../../../constants/validations/loginValidationRules';
import { validationMessages } from '../../../constants/validations/validationMessages';

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();

  function handleLoginError(error: unknown) {
    if (error instanceof AxiosError) {
      const code = error.response?.status;

      if (code === 404) {
        setError('email', {
          type: 'Credentials Error',
          message: validationMessages.INVALID_CREDENTIALS,
        });
      }
    }
  }

  async function onValid(data: LoginRequest) {
    try {
      const response = await LoginAPI(data);
      token.setUser(response);
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error: unknown) {
      handleLoginError(error);
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
          validationRules={emailValidationRules}
          margin="mb-4"
          srOnlyClass="sr-only"
        />
        <AuthInput<LoginRequest>
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          register={register}
          validationRules={passwordValidationRules}
          margin={`${errors.email || errors.password ? '' : 'mb-7'}`}
          srOnlyClass="sr-only"
        />
        <AuthErrorMessages errors={errors} fields={['email', 'password']} />
        <AuthButton text="로그인" type="submit" />
        <div className="mt-5">
          <Link
            to="/signup"
            className="text-sm text-[#0b57d0] transition duration-300 hover:underline"
          >
            계정 만들기
          </Link>
        </div>
      </form>
    </AuthFormContainer>
  );
}
