import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { loginValidationRules } from '../../../../constants';
import useLogin from '../../api/login';
import {
  FormErrorMessages,
  Input,
  AuthLoadingSpinner,
  Button,
} from '../../../../components';
import { LoginRequestDto } from '../../../../types';

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequestDto>();

  const { login, isLoading } = useLogin({ setError, navigate });

  const onValid = (data: LoginRequestDto) => {
    login(data);
  };

  return (
    <>
      <form id="loginForm" onSubmit={handleSubmit(onValid)}>
        <Input<LoginRequestDto>
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일"
          register={register}
          validationRules={loginValidationRules.emailValidationRules}
          margin="mb-4"
          srOnlyClass="sr-only"
        />
        <Input<LoginRequestDto>
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          register={register}
          validationRules={loginValidationRules.passwordValidationRules}
          margin={`${errors.email || errors.password ? '' : 'mb-7'}`}
          srOnlyClass="sr-only"
        />
        <FormErrorMessages errors={errors} fields={['email', 'password']} />
        <Button
          type="submit"
          className="py-3"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          로그인
        </Button>
        <div className="mt-5">
          <Link
            to="/signup"
            className="text-sm text-[#0b57d0] transition duration-300 hover:underline"
          >
            계정 만들기
          </Link>
        </div>
      </form>
      <AuthLoadingSpinner loading={isLoading} text={'로그인 중'} />
    </>
  );
}
