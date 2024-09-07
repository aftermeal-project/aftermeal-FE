import { UseMutationResult } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../atoms';
import ModalLayout from '../../components/layout/ModalLayout';
import { errorMessages } from '../../constants';

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
        className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold">삭제 확인</h2>
        <p>{message}</p>
        <div className="mt-4 flex w-full justify-between">
          <button
            onClick={handleModalClose}
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={onDelete}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
