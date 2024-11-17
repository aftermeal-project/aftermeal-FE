import { CheckEmailIcon } from '../../../../assets';

interface Props {
  email: string;
}

export default function EmailAuthenticationForm({ email }: Props) {
  return (
    <>
      <div className="rounded-lg p-4 text-center">
        <div className="mb-5 flex items-center justify-center text-xl">
          <CheckEmailIcon />
        </div>
        <p className="mb-4 text-gray-700">
          인증 메일이{' '}
          <span className="font-bold">
            {email ? email : 's21065@gsm.hs.kr'}
          </span>
          (으)로 발송되었습니다.
        </p>
        <p className="text-gray-500">
          메일을 확인하여 인증 절차를 완료해주세요.
        </p>
      </div>
    </>
  );
}
