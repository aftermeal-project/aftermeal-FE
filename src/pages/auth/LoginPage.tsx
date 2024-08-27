import { AuthFormContainer } from '../../components/ui/auth';
import { LoginForm } from '../../features/auth';

export default function LoginPage() {
  return (
    <AuthFormContainer title="애프터밀">
      <LoginForm />
    </AuthFormContainer>
  );
}
