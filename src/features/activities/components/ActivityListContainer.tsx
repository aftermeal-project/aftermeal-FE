import { useRecoilState, useRecoilValue } from 'recoil';
import { ModalAtomFamily } from '../../../atoms';
import ConfirmDeleteModal from '../../../components/ui/modal/ConfirmDeleteModal';
import CreateActivityModal from '../../../components/ui/modal/CreateActivityModal';
import { AtomKeys } from '../../../constants';
import { ActivityListResponseDto } from '../../../types';
import { ActivityListTable } from '../../../components/ui/admin';

interface ActivityListContainerProps {
  activities: ActivityListResponseDto[];
}

export default function ActivityListContainer({
  activities,
}: ActivityListContainerProps) {
  const deleteModal = useRecoilValue(ModalAtomFamily(AtomKeys.DELETE_ACTIVITY));
  const [createModal, setCreateModal] = useRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY),
  );

  function onCreateActivity() {
    setCreateModal(true);
  }

  return (
    <>
      {deleteModal && <ConfirmDeleteModal />}
      {createModal && <CreateActivityModal />}
      <div className="h-full overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">활동 관리</h1>
          <button
            className="rounded-md bg-green-500 px-3 py-[0.4rem] text-white"
            onClick={onCreateActivity}
          >
            활동 추가
          </button>
        </div>
        <div className="overflow-x-auto">
          <ActivityListTable activities={activities} />
        </div>
      </div>
    </>
  );
}
