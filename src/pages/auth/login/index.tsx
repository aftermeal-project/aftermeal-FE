import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginRequest } from '../../../types/auth';
import { AxiosError } from 'axios';
import { mockLoginAPI } from '../../../mocks/api/auth';
// import { LoginAPI } from '../../../../libs/api/auth';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onValid: SubmitHandler<LoginRequest> = async data => {
    console.log(data);

    try {
      const response = await mockLoginAPI(data);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        // Error Handling
      } else {
        // Unexcepted Error Occurred
      }
    }
  };

  const onInvalid = () => {
    console.log(errors);
  };

  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-600">
      <section className="w-96 rounded-xl bg-white p-8 text-center shadow-lg">
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
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register('email', { required: true })}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register('password', {
                required: '비밀번호는 필수 입력입니다',
                minLength: {
                  value: 8,
                  message: '8자 이상의 비밀번호를 입력해주세요.',
                },
                maxLength: {
                  value: 20,
                  message: '20자 이하 비밀번호를 입력해주세요.',
                },
              })}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 p-3 font-medium text-white transition duration-300 hover:bg-indigo-500"
          >
            로그인
          </button>
        </form>
      </section>
    </main>
  );
}
