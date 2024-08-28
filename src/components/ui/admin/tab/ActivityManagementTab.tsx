import { useRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import { Activity } from '../../../../pages/admin/AdminPage';
import ActivityManagementTable from '../table/ActivityManagementTable';
import ConfirmDeleteModal from '../../modal/ConfirmDeleteModal';
import CreateActivityModal from '../../modal/CreateActivityModal';

interface ActivityManagementTabProps {
  activities: Activity[];
}

export default function ActivityManagementTab({
  activities,
}: ActivityManagementTabProps) {
  const [deleteModal] = useRecoilState(ModalAtomFamily('confirm_delete'));
  const [createModal, setCreateModal] = useRecoilState(
    ModalAtomFamily('create_activity'),
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
          <ActivityManagementTable activities={activities} />
        </div>
      </div>
    </>
  );
}
