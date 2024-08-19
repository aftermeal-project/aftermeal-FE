import { useState } from 'react';
import AuthFormContainer from '../../../components/auth/container';
import AuthInput from '../../../components/auth/input';
import { SignupRequest } from '../../../types/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthButton from '../../../components/auth/button';
import AuthErrorText from '../../../components/auth/errorText/indext';
import { SignupAPI } from '../../../libs/api/user';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { validationMessages } from '../../../constants/validationMessages';

type UserType = 'STUDENT' | 'TEACHER';

export default function SignupPage() {
  const [type, setType] = useState<UserType>('STUDENT');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupRequest>();

  const onValid: SubmitHandler<SignupRequest> = async data => {
    data.type = type;

    const GSM_EMAIL_FORMAT = '@gsm.hs.kr';
    if (type === 'STUDENT' && !data.email.endsWith(GSM_EMAIL_FORMAT)) {
      alert(validationMessages.INVALID_STUDENT_EMAIL);
      return;
    }

    try {
      await SignupAPI(data);
      alert('가입 되었습니다.');
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        switch (error.response?.status) {
          case 400:
            setError('generationNumber', {
              type: 'Range Error',
              message: validationMessages.GENERATION_RANGE_ERROR,
            });
            break;
          case 409:
            setError('email', {
              type: 'Duplicate Error',
              message: validationMessages.DUPLICATE_EMAIL,
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
      <form id="registrationForm" onSubmit={handleSubmit(onValid)}>
        <fieldset className="mb-5">
          <legend className="sr-only">유저 유형 선택</legend>
          <div className="flex items-center justify-center w-full gap-5">
            <label className="flex flex-col items-center cursor-pointer">
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
            <label className="flex flex-col items-center cursor-pointer">
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
        <AuthInput<SignupRequest>
          label="이름"
          name="name"
          type="text"
          placeholder="이름"
          register={register}
          validationRules={{
            required: validationMessages.REQUIRED_NAME,
            maxLength: {
              value: 40,
              message: validationMessages.MAX_LENGTH_NAME,
            },
          }}
          margin="mb-4"
          error={errors.name}
        />
        <AuthInput<SignupRequest>
          label="학교 이메일"
          name="email"
          type="email"
          placeholder="학교 이메일"
          register={register}
          validationRules={{
            required: validationMessages.REQUIRED_EMAIL,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: validationMessages.INVALID_EMAIL,
            },
          }}
          margin="mb-4"
          error={errors.email}
        />
        {type === 'STUDENT' && (
          <AuthInput<SignupRequest>
            label="기수"
            name="generationNumber"
            type="number"
            placeholder="기수"
            register={register}
            validationRules={{
              required: validationMessages.REQUIRED_GENERATION,
              min: {
                value: 1,
                message: validationMessages.POSITIVE_GENERATION,
              },
            }}
            margin="mb-4"
            error={errors.generationNumber}
          />
        )}
        <AuthInput<SignupRequest>
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          register={register}
          validationRules={{
            required: validationMessages.REQUIRED_PASSWORD,
            maxLength: {
              value: 20,
              message: validationMessages.MAX_LENGTH_PASSWORD,
            },
            minLength: {
              value: 8,
              message: validationMessages.MIN_LENGTH_PASSWORD,
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: validationMessages.INVALID_PASSWORD,
            },
          }}
          margin={`${errors.type || errors.name || errors.email || errors.password || errors.generationNumber ? '' : 'mb-7'}`}
          error={errors.password}
        />
        {errors.name && <AuthErrorText message={errors.name.message} />}
        {!errors.name && errors.email && (
          <AuthErrorText message={errors.email.message} />
        )}
        {!errors.name && !errors.email && errors.generationNumber && (
          <AuthErrorText message={errors.generationNumber.message} />
        )}
        {!errors.name &&
          !errors.email &&
          !errors.generationNumber &&
          errors.password && (
            <AuthErrorText message={errors.password.message} />
          )}
        <AuthButton text="등록" type="submit" />
      </form>
    </AuthFormContainer>
  );
}
