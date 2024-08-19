import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginRequest } from '../../../types/auth';
import { AxiosError } from 'axios';
import { LoginAPI } from '../../../libs/api/auth';
import Token from '../../../libs/utils/token';
import { Link, useNavigate } from 'react-router-dom';
import AuthButton from '../../../components/auth/button';
import AuthFormContainer from '../../../components/auth/container';
import AuthInput from '../../../components/auth/input';
import AuthErrorText from '../../../components/auth/errorText/indext';
import { validationMessages } from '../../../constants/validationMessages';

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
      Token.setUser(response);
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        switch (error.response?.status) {
          case 404:
            setError('email', {
              type: 'Credentials Error',
              message: validationMessages.INVALID_CREDENTIALS,
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
          validationRules={{
            required: validationMessages.REQUIRED_EMAIL,
          }}
          margin="mb-4"
          srOnlyClass="sr-only"
        />
        <AuthInput<LoginRequest>
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          register={register}
          validationRules={{
            required: validationMessages.REQUIRED_PASSWORD,
          }}
          margin={`${errors.email || errors.password ? '' : 'mb-7'}`}
          srOnlyClass="sr-only"
        />
        {errors.email && <AuthErrorText message={errors.email.message} />}
        {!errors.email && errors.password && (
          <AuthErrorText message={errors.password.message} />
        )}
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
