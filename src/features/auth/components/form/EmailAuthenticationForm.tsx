import { useEffect, useState } from 'react';
import { CheckEmailIcon } from '../../../../assets';
import useEmailVerify from '../../api/email-verify';
import { AuthLoadingSpinner } from '../../../../components';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props {
  email: string;
}

const AUTH_CODE_LENGTH = 6;

export default function EmailAuthenticationForm({ email }: Props) {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [codes, setCodes] = useState<string[]>(
    Array(AUTH_CODE_LENGTH).fill(''),
  );

  const { emailVerify, isLoading } = useEmailVerify({
    handleOnSuccess: () => {
      toast.success('인증에 성공했습니다.');
      navigate('/login');
    },
    handleOnError: () => {
      setError(true);

      const firstInput = document.getElementById(`input${1}`);
      firstInput?.focus();
      setCodes(Array(AUTH_CODE_LENGTH).fill(''));
    },
  });

  const convertKoreanToEnglish = (value: string) => {
    return value
      .split('')
      .map(char => koreanToEnglishMap[char] || char)
      .join('');
  };

  const handleChange = (index: number, value: string) => {
    const convertedValue = convertKoreanToEnglish(value);

    if (/^[a-zA-Z0-9]*$/.test(convertedValue)) {
      const newCodes = [...codes];
      newCodes[index] = convertedValue.toUpperCase().charAt(0);
      setCodes(newCodes);

      if (index === AUTH_CODE_LENGTH - 1) {
        emailVerify({ email: email, code: newCodes.join('') });
      }

      if (value && index < AUTH_CODE_LENGTH - 1) {
        const nextInput = document.getElementById(`input${index + 2}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.keyCode === 8 && codes[index] === '') {
      const prevInput = document.getElementById(`input${index}`);
      prevInput?.focus();
    }
  };

  const handleValuePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pastedValue = e.clipboardData?.getData('text') || '';

    if (
      /^[a-zA-Z0-9]*$/.test(pastedValue) &&
      pastedValue.length === AUTH_CODE_LENGTH
    ) {
      const newCodes = pastedValue
        .toUpperCase()
        .split('')
        .slice(0, AUTH_CODE_LENGTH);
      setCodes(newCodes);

      emailVerify({ email: email, code: newCodes.join('') });
    } else {
      toast.error('6자리의 올바른 코드를 붙여넣어주세요.');
    }
  };

  useEffect(() => {
    const firstInput = document.getElementById('input1');
    firstInput?.addEventListener('paste', handleValuePaste as EventListener);

    return () => {
      firstInput?.removeEventListener(
        'paste',
        handleValuePaste as EventListener,
      );
    };
  }, []);

  return (
    <>
      <div className="mb-6 flex items-center justify-center text-3xl">
        <CheckEmailIcon />
      </div>
      <p className="mb-1 text-2xl font-bold">코드를 이메일에서 확인하세요</p>
      <p className="mb-5 text-[15px] text-gray-700">
        <span className="font-bold">{email ? email : 's21065@gsm.hs.kr'}</span>
        에 6자리 코드를 전송했습니다. 코드를 입력하여 인증 절차를 완료해주세요.
      </p>
      <form className="mb-14 flex items-center justify-center space-x-1">
        {codes.map((code, index) => (
          <div key={index} className="relative flex items-center">
            <input
              className={`h-[65px] w-[50px] rounded-lg border text-center text-[1.75rem] font-semibold ring-1 ring-gray-300 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                error && 'border-red-500 ring-red-500 focus:ring-red-500'
              }`}
              id={`input${index + 1}`}
              type="text"
              value={code}
              maxLength={1}
              tabIndex={index + 1}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              autoFocus={index === 0}
            />
            {index === 2 && (
              <span className="ml-2 mr-1 text-xl font-bold text-gray-500">
                -
              </span>
            )}
          </div>
        ))}
      </form>
      {error && (
        <p className="mb-5 text-[14px] font-bold text-red-600">
          입력하신 코드가 올바르지 않습니다. 다시 시도해주세요.
        </p>
      )}
      <p className="text-[13.5px] tracking-tighter text-gray-700">
        이메일이 스팸함에 있을 수 있으니, 스팸함도 함께 확인해주세요.
      </p>
      <AuthLoadingSpinner loading={isLoading} text={'인증 중'} />
    </>
  );
}

const koreanToEnglishMap: { [key: string]: string } = {
  ㄱ: 'r',
  ㄴ: 's',
  ㄷ: 'e',
  ㄹ: 'f',
  ㅁ: 'a',
  ㅂ: 'q',
  ㅅ: 't',
  ㅇ: 'd',
  ㅈ: 'w',
  ㅊ: 'c',
  ㅋ: 'z',
  ㅌ: 'x',
  ㅍ: 'v',
  ㅎ: 'g',
  ㅏ: 'k',
  ㅑ: 'i',
  ㅓ: 'j',
  ㅕ: 'u',
  ㅗ: 'h',
  ㅛ: 'y',
  ㅜ: 'n',
  ㅠ: 'b',
  ㅡ: 'm',
  ㅣ: 'l',
};
