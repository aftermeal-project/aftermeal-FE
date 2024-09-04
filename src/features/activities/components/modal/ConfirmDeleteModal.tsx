import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { ActiveIdAtom, ModalAtomFamily } from '../../../../atoms';
import ModalLayout from '../../../../components/@global/layout/ModalLayout';
import { AtomKeys, errorMessages } from '../../../../constants';
import useDeleteActivity from '../../api/delete-activity';

export default function ConfirmDeleteModal() {
  const activeId = useRecoilValue(ActiveIdAtom);
  const resetActivityId = useResetRecoilState(ActiveIdAtom);
  const deleteModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY),
  );

  const { deleteActivity, error } = useDeleteActivity();

  if (error) {
    deleteModalOpen(false);
    alert(errorMessages.UNKNOWN_ERROR);
  }

  function handleModalClose() {
    deleteModalOpen(false);
    resetActivityId();
  }

  const onDelete = () => {
    deleteActivity.mutate(activeId.toString());
    deleteModalOpen(false);
    resetActivityId();
  };

  return (
    <ModalLayout setModal={deleteModalOpen}>
      <div
        className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
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
