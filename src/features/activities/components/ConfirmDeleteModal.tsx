import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../atoms';
import ModalLayout from '../../../components/@global/layout/ModalLayout';
import { AtomKeys } from '../../../constants';

export default function ConfirmDeleteModal() {
  const setModal = useSetRecoilState(ModalAtomFamily(AtomKeys.DELETE_ACTIVITY));

  function handleModalClose() {
    setModal(false);
  }

  return (
    <ModalLayout setModal={setModal}>
      <div
        className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold">삭제 확인</h2>
        <p>정말 항목을 삭제하시겠습니까?</p>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handleModalClose}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleModalClose}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
