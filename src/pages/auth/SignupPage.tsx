import { useState } from 'react';
import { AuthFormContainer, SEOHelmet } from '../../components';
import { SignupForm } from '../../features/auth';
import EmailAuthenticationForm from '../../features/auth/components/form/EmailAuthenticationForm';

export type CurrentStepType = 'signup' | 'email-verify';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState<CurrentStepType>('signup');

  return (
    <>
      <SEOHelmet
        title="회원가입"
        description="지금 바로 회원가입을 통해 애프터밀을 시작하세요!"
        url="/signup"
      />
      <AuthFormContainer title="애프터밀">
        {currentStep === 'signup' ? (
          <SignupForm setEmail={setEmail} setCurrentStep={setCurrentStep} />
        ) : (
          <EmailAuthenticationForm email={email} />
        )}
      </AuthFormContainer>
    </>
  );
}
