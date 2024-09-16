import { AuthFormContainer, SEOHelmet } from '../../components';
import { LoginForm } from '../../features/auth';

export default function LoginPage() {
  return (
    <>
      <SEOHelmet
        title="로그인"
        description="지금 바로 로그인을 통해 애프터밀을 이용하세요!"
        url="/login"
      />
      <AuthFormContainer title="애프터밀">
        <LoginForm />
      </AuthFormContainer>
    </>
  );
}
