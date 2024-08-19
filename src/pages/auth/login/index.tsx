import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginRequest } from '../../../types/auth';
import { AxiosError } from 'axios';
import { LoginAPI } from '../../../libs/api/auth';
import Token from '../../../libs/utils/token';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();
  const navigate = useNavigate();

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

  const onInvalid = () => {};

  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-300 to-indigo-600">
      <section className="p-8 text-center bg-white shadow-lg w-96 rounded-xl">
        <header>
          <h1 className="mb-5 text-2xl font-bold text-gray-800">에프터밀</h1>
        </header>
        <form id="loginForm" onSubmit={handleSubmit(onValid, onInvalid)}>
          <div className="mb-5">
            <label htmlFor="email" className="sr-only">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register('email', { required: '이메일은 필수 입력입니다.' })}
            />
          </div>
          <div className={`${errors.email || errors.password ? '' : 'mb-7'}`}>
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register('password', {
                required: '비밀번호는 필수 입력입니다.',
              })}
            />
          </div>
          {errors.email && (
            <p className="my-5 text-left text-[13px] leading-4 tracking-[-.75px] text-[#ff0101]">
              {errors.email.message}
            </p>
          )}
          {!errors.email && errors.password && (
            <p className="my-5 text-left text-[13px] leading-4 tracking-[-.75px] text-[#ff0101]">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full p-3 font-medium text-white transition duration-300 bg-indigo-600 rounded -md hover:bg-indigo-500"
          >
            로그인
          </button>
          {/* <div className="mt-5">
            <Link
              to="/signup"
              className="text-sm text-[#0b57d0] transition duration-300 hover:underline"
            >
              계정 만들기
            </Link>
          </div> */}
        </form>
      </section>
    </main>
  );
}
