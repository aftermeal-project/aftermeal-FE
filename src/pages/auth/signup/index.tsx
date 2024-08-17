import { useState } from 'react';

type UserType = 'STUDENT' | 'TEACHER';

export default function SignupPage() {
  const [type, setType] = useState<UserType>('STUDENT');

  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-600">
      <section className="w-96 rounded-xl bg-white p-8 text-center shadow-lg">
        <header>
          <h1 className="mb-5 text-2xl font-bold text-gray-800">에프터밀</h1>
        </header>
        <form id="registrationForm">
          <fieldset className="mb-5">
            <legend className="sr-only">유저 유형 선택</legend>
            <div className="flex w-full items-center justify-center gap-5">
              <label className="flex cursor-pointer flex-col items-center">
                <input
                  type="radio"
                  name="type"
                  value="STUDENT"
                  checked={type === 'STUDENT'}
                  onChange={() => setType('STUDENT')}
                  className="hidden"
                />
                <span
                  className={`block border px-5 py-2 ${type === 'STUDENT' ? 'bg-indigo-600 text-white' : 'bg-gray-100'} rounded-md`}
                >
                  학생
                </span>
              </label>
              <label className="flex cursor-pointer flex-col items-center">
                <input
                  type="radio"
                  name="type"
                  value="TEACHER"
                  checked={type === 'TEACHER'}
                  onChange={() => setType('TEACHER')}
                  className="hidden"
                />
                <span
                  className={`block border px-5 py-2 ${type === 'TEACHER' ? 'bg-indigo-600 text-white' : 'bg-gray-100'} rounded-md`}
                >
                  선생님
                </span>
              </label>
            </div>
          </fieldset>

          <div className="mb-5 text-left">
            <label
              htmlFor="name"
              className="mb-2 block font-bold text-gray-700"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              maxLength={40}
              required
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-5 text-left">
            <label
              htmlFor="email"
              className="mb-2 block font-bold text-gray-700"
            >
              학교 이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {type === 'STUDENT' && (
            <div className="mb-5 text-left">
              <label
                htmlFor="generationNumber"
                className="mb-2 block font-bold text-gray-700"
              >
                기수
              </label>
              <input
                type="number"
                id="generationNumber"
                name="generationNumber"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="mb-5 text-left">
            <label
              htmlFor="password"
              className="mb-2 block font-bold text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 p-3 font-medium text-white transition duration-300 hover:bg-indigo-500"
          >
            등록
          </button>
        </form>
      </section>
    </main>
  );
}
