import { AuthFormContainer, SEOHelmet } from '../../components';
import { SignupForm } from '../../features/auth';

export default function SignupPage() {
  return (
    <>
      <SEOHelmet
        title="회원가입"
        description="지금 바로 회원가입을 통해 애프터밀을 시작하세요!"
        url="/signup"
      />
      <AuthFormContainer title="애프터밀">
        <SignupForm />
      </AuthFormContainer>
    </>
  );
}
