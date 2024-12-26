import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AuthUserTypeSelector,
  AuthLoadingSpinner,
  Button,
} from '../../../../components';
import {
  validationMessages,
  signupValidationRules,
} from '../../../../constants';
import useSignup from '../../api/signup';
import { FormErrorMessages, Input } from '../../../../components';
import { UserRegistrationRequestDto } from '../../../../types';
import { CurrentStepType } from '../../../../pages/auth/SignupPage';

type UserType = 'STUDENT' | 'TEACHER';

interface Props {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<CurrentStepType>>;
}

export default function SignupForm({ setEmail, setCurrentStep }: Props) {
  const [userType, setUserType] = useState<UserType>('STUDENT');

  const {
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UserRegistrationRequestDto>();

  const handleOnSignupSuccess = () => {
    setEmail(getValues('email'));
    setCurrentStep('email-verify');
  };

  const { signup, isLoading } = useSignup({
    setError,
    handleOnSuccess: handleOnSignupSuccess,
  });

  const handlerUserTypeChange = (type: UserType) => {
    reset();
    setUserType(type);
  };

  const onValid = async (data: UserRegistrationRequestDto) => {
    data.type = userType;
    data.generationNumber = Number(data.generationNumber);

    const GSM_EMAIL_FORMAT = new RegExp('s[0-9]{5}@gsm\\.hs\\.kr');

    if (userType === 'STUDENT' && !GSM_EMAIL_FORMAT.test(data.email)) {
      setError('email', {
        message: validationMessages.IS_NOT_SCHOOL_EMAIL,
      });
      return;
    }

    signup(data);
  };

  return (
    <>
      <form id="registrationForm" onSubmit={handleSubmit(onValid)}>
        <AuthUserTypeSelector
          selectedType={userType}
          onChangeType={handlerUserTypeChange}
        />
        <Input<UserRegistrationRequestDto>
          label="이름"
          name="name"
          type="text"
          placeholder="이름"
          register={register}
          validationRules={signupValidationRules.nameValidationRules}
          margin="mb-4"
          error={errors.name}
        />
        <Input<UserRegistrationRequestDto>
          label="학교 이메일"
          name="email"
          type="email"
          placeholder="학교 이메일"
          register={register}
          validationRules={signupValidationRules.emailValidationRules}
          margin="mb-4"
          error={errors.email}
        />
        {userType === 'STUDENT' && (
          <Input<UserRegistrationRequestDto>
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
        <Input<UserRegistrationRequestDto>
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          register={register}
          validationRules={signupValidationRules.passwordValidationRules}
          margin={`${errors.type || errors.name || errors.email || errors.password || errors.generationNumber ? '' : 'mb-9'}`}
          error={errors.password}
        />
        <FormErrorMessages
          errors={errors}
          fields={
            userType === 'STUDENT'
              ? ['name', 'email', 'generationNumber', 'password']
              : ['name', 'email', 'password']
          }
        />
        <Button
          type="submit"
          className="py-3"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          이메일 인증
        </Button>
      </form>
      <AuthLoadingSpinner loading={isLoading} text={'가입 중'} />
    </>
  );
}
