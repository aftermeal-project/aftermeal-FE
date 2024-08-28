import { SetterOrUpdater } from 'recoil';
import ModalLayout from '../../@global/layout/ModalLayout';

interface ConfirmDeleteModalProps {
  setModal: SetterOrUpdater<boolean>;
}

export default function ConfirmDeleteModal({
  setModal,
}: ConfirmDeleteModalProps) {
  function handleModalClose() {
    setModal(false);
  }

  return (
    <ModalLayout setModal={setModal}>
      <div className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">삭제 확인</h2>
        <p>정말 항목을 삭제하시겠습니까?</p>
        <div className="mt-4 flex w-full justify-between">
          <button
            onClick={handleModalClose}
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleModalClose}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
