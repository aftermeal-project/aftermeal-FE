import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import ModalLayout from '../../../../components/@global/layout/ModalLayout';
import { errorMessages } from '../../../../constants';
import { UseMutationResult } from '@tanstack/react-query';

type MutationRequest<T> = UseMutationResult<void, Error, T>;

interface ConfirmDeleteModalProps<T> {
  message: string;
  modalKey: string;
  request: MutationRequest<T>;
  params: T;
  onSettled?: () => void;
}

export default function ConfirmDeleteModal<T>({
  message,
  modalKey,
  request,
  params,
  onSettled,
}: ConfirmDeleteModalProps<T>) {
  const modalOpen = useSetRecoilState(ModalAtomFamily(modalKey));

  const { mutate, error } = request;

  if (error) {
    modalOpen(false);
    alert(errorMessages.UNKNOWN_ERROR);
  }

  function handleModalClose() {
    modalOpen(false);
    onSettled && onSettled();
  }

  const onDelete = () => {
    mutate(params);
    onSettled && onSettled();
    modalOpen(false);
  };

  return (
    <ModalLayout setModal={modalOpen}>
      <div
        className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold">삭제 확인</h2>
        <p>{message}</p>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handleModalClose}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
