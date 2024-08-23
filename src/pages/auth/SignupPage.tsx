import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignupAPI } from '../../libs/api/user';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { SignupRequest } from '../../types/user';
import { signupValidationRules } from '../../constants';
import {
  AuthFormContainer,
  AuthInput,
  AuthErrorMessages,
  AuthButton,
  AuthLoadingSpinner,
  AuthUserTypeSelector,
} from '../../components/auth';

type UserType = 'STUDENT' | 'TEACHER';

export default function SignupPage() {
  const [type, setType] = useState<UserType>('STUDENT');
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    data.userType = type;
    data.generationNumber = Number(data.generationNumber);

    const GSM_EMAIL_FORMAT = '@gsm.hs.kr';
    if (type === 'STUDENT' && !data.email.endsWith(GSM_EMAIL_FORMAT)) {
      alert('유효한 학생 이메일을 입력해 주세요.'); // validationMessages.INVALID_STUDENT_EMAIL
      return;
    }

    try {
      await SignupAPI(data);
      navigate('/login');
    } catch (error: unknown) {
      handleSignupError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthFormContainer title="애프터밀">
      <form id="registrationForm" onSubmit={handleSubmit(onValid)}>
        <AuthUserTypeSelector
          selectedType={type}
          onChangeType={handlerUserTypeChange}
        />
        <AuthInput<SignupRequest>
          label="이름"
          name="name"
          type="text"
          placeholder="이름"
          register={register}
          validationRules={signupValidationRules.nameValidationRules}
          margin="mb-4"
          error={errors.name}
        />
        <AuthInput<SignupRequest>
          label="학교 이메일"
          name="email"
          type="email"
          placeholder="학교 이메일"
          register={register}
          validationRules={signupValidationRules.emailValidationRules}
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
            validationRules={signupValidationRules.generationValidationRules}
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
          validationRules={signupValidationRules.passwordValidationRules}
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
      <AuthLoadingSpinner loading={loading} text={'가입 중'} />
    </AuthFormContainer>
  );
}
