import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  AuthUserTypeSelector,
  AuthErrorMessages,
  AuthButton,
  AuthLoadingSpinner,
} from '../../../components/ui/auth';
import { validationMessages, signupValidationRules } from '../../../constants';
import { SignupRequest } from '../../../types/user';
import useSignup from '../api/signup';
import { Input } from '../../../components/@global';

type UserType = 'STUDENT' | 'TEACHER';

export default function SignupForm() {
  const [type, setType] = useState<UserType>('STUDENT');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignupRequest>();

  const { signup, isLoading } = useSignup({ setError, navigate });

  function handlerUserTypeChange(type: UserType) {
    reset();
    setType(type);
  }

  async function onValid(data: SignupRequest) {
    data.userType = type;
    data.generationNumber = Number(data.generationNumber);

    const GSM_EMAIL_FORMAT = new RegExp('s[0-9]{5}@gsm\\.hs\\.kr');

    if (type === 'STUDENT' && !GSM_EMAIL_FORMAT.test(data.email)) {
      setError('email', {
        message: validationMessages.IS_NOT_SCHOOL_EMAIL,
      });
      return;
    }

    signup(data);
  }
  return (
    <>
      <form id="registrationForm" onSubmit={handleSubmit(onValid)}>
        <AuthUserTypeSelector
          selectedType={type}
          onChangeType={handlerUserTypeChange}
        />
        <Input<SignupRequest>
          label="이름"
          name="name"
          type="text"
          placeholder="이름"
          register={register}
          validationRules={signupValidationRules.nameValidationRules}
          margin="mb-4"
          error={errors.name}
        />
        <Input<SignupRequest>
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
          <Input<SignupRequest>
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
        <Input<SignupRequest>
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
      <AuthLoadingSpinner loading={isLoading} text={'가입 중'} />
    </>
  );
}
