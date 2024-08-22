import { useState } from 'react';
import AuthFormContainer from '../../../components/auth/container';
import AuthInput from '../../../components/auth/input';
import { useForm } from 'react-hook-form';
import AuthButton from '../../../components/auth/button';
import { SignupAPI } from '../../../libs/api/user';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { SignupRequest } from '../../../types/user';
import UserTypeSelector from '../../../components/auth/selector';
import AuthErrorMessages from '../../../components/auth/error';
import {
  emailValidationRules,
  passwordValidationRules,
  nameValidationRules,
  generationValidationRules,
} from '../../../constants/rules/signupValidationRules';

type UserType = 'STUDENT' | 'TEACHER';

export default function SignupPage() {
  const [type, setType] = useState<UserType>('STUDENT');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignupRequest>();

  function handleSignupError(error: any) {
    if (error instanceof AxiosError) {
      const { response } = error;

      switch (response?.status) {
        case 400:
          setError('generationNumber', {
            type: 'Range Error',
            message: '기수 범위 오류', // validationMessages.GENERATION_RANGE_ERROR
          });
          break;
        case 404:
          setError('generationNumber', {
            type: 'Not Found Error',
            message: '기수를 찾을 수 없습니다.', // validationMessages.GENERATION_NOT_FOUND_ERROR
          });
          break;
        case 409:
          setError('email', {
            type: 'Duplicate Error',
            message: '이미 존재하는 이메일입니다.', // validationMessages.DUPLICATE_EMAIL
          });
          break;
      }
    }
  }

  function handlerUserTypeChange(type: UserType) {
    reset();
    setType(type);
  }

  async function onValid(data: SignupRequest) {
    data.userType = type;
    data.generationNumber = Number(data.generationNumber);

    const GSM_EMAIL_FORMAT = '@gsm.hs.kr';
    if (type === 'STUDENT' && !data.email.endsWith(GSM_EMAIL_FORMAT)) {
      alert('유효한 학생 이메일을 입력해 주세요.'); // validationMessages.INVALID_STUDENT_EMAIL
      return;
    }

    try {
      await SignupAPI(data);
      alert('가입 되었습니다.');
      navigate('/login');
    } catch (error: unknown) {
      handleSignupError(error);
    }
  }

  return (
    <AuthFormContainer title="애프터밀">
      <form id="registrationForm" onSubmit={handleSubmit(onValid)}>
        <UserTypeSelector
          selectedType={type}
          onChangeType={handlerUserTypeChange}
        />
        <AuthInput<SignupRequest>
          label="이름"
          name="name"
          type="text"
          placeholder="이름"
          register={register}
          validationRules={nameValidationRules}
          margin="mb-4"
          error={errors.name}
        />
        <AuthInput<SignupRequest>
          label="학교 이메일"
          name="email"
          type="email"
          placeholder="학교 이메일"
          register={register}
          validationRules={emailValidationRules}
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
            validationRules={generationValidationRules}
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
          validationRules={passwordValidationRules}
          margin={`${errors.userType || errors.name || errors.email || errors.password || errors.generationNumber ? '' : 'mb-9'}`}
          error={errors.password}
        />
        <AuthErrorMessages
          errors={errors}
          fields={
            type === 'STUDENT'
              ? ['name', 'email', 'generationNumber', 'password']
              : ['name', 'email', 'password']
          }
        />
        <AuthButton text="등록" type="submit" />
      </form>
    </AuthFormContainer>
  );
}
