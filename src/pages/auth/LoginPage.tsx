import { useRecoilValue, useResetRecoilState } from 'recoil';
import { AuthFormContainer, SEOHelmet } from '../../components';
import { LoginForm } from '../../features/auth';
import { UserAtom } from '../../atoms';
import { useEffect } from 'react';
import Token from '../../libs/utils/token';

export default function LoginPage() {
  const user = useRecoilValue(UserAtom);
  const resetUser = useResetRecoilState(UserAtom);
  const token = new Token();

  useEffect(() => {
    const clearUserOnTokenInvalidation = () => {
      if (user && !token.getUser()) {
        resetUser();
      }
    };

    clearUserOnTokenInvalidation();
  }, [resetUser, user]);

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
