import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  } = useForm<UserRegistrationRequestDto>();

  const { signup, isLoading } = useSignup({ setError, navigate });

  const handlerUserTypeChange = (type: UserType) => {
    reset();
    setType(type);
  };

  const onValid = async (data: UserRegistrationRequestDto) => {
    data.type = type;
    data.generationNumber = Number(data.generationNumber);

    const GSM_EMAIL_FORMAT = new RegExp('s[0-9]{5}@gsm\\.hs\\.kr');

    if (type === 'STUDENT' && !GSM_EMAIL_FORMAT.test(data.email)) {
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
          selectedType={type}
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
        {type === 'STUDENT' && (
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
            type === 'STUDENT'
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
          등록
        </Button>
      </form>
      <AuthLoadingSpinner loading={isLoading} text={'가입 중'} />
    </>
  );
}
