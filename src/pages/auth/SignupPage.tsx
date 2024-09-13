import { AuthFormContainer } from '../../components';
import { SignupForm } from '../../features/auth';

export default function SignupPage() {
  return (
    <AuthFormContainer title="애프터밀">
      <SignupForm />
    </AuthFormContainer>
  );
}
