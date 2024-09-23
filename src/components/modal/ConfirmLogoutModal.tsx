import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../atoms';
import ModalLayout from '../../components/layout/ModalLayout';
import { AtomKeys } from '../../constants';
import { Button } from '../../components';
import Token from '../../libs/utils/token';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ConfirmLogoutModal() {
  const token = new Token();
  const navigate = useNavigate();

  const setLogoutModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.LOGOUT_MODAL),
  );

  const handleModalClose = () => {
    setLogoutModalOpen(false);
  };

  const handleLogout = () => {
    token.removeUser();
    toast.success('로그아웃 되었습니다');
    navigate('/login');
    setLogoutModalOpen(false);
  };

  return (
    <ModalLayout setModal={setLogoutModalOpen}>
      <div
        className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold">로그아웃 확인</h2>
        <p>정말 로그아웃 하시겠습니까?</p>

        <div className="mt-4 flex w-full justify-between">
          <Button type="button" onClick={handleModalClose} variant="secondary">
            취소
          </Button>
          <Button type="button" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
