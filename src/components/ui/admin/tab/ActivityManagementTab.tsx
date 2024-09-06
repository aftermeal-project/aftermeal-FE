import { Suspense } from 'react';
import {
  ActivityListFetcher,
  ActivityListSkeleton,
  ConfirmDeleteModal,
  CreateActivityModal,
  ActivityListTable,
} from '../../../../features/activities';
import { useRecoilValue, useRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';

export default function ActivityManagementTab() {
  const deleteModal = useRecoilValue(ModalAtomFamily(AtomKeys.DELETE_ACTIVITY));
  const [createModal, setCreateModal] = useRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY),
  );

  function onCreateActivity() {
    setCreateModal(true);
  }

  return (
    <section>
      {deleteModal && <ConfirmDeleteModal />}
      {createModal && <CreateActivityModal />}
      <div className="h-full overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">활동 관리</h1>
          <button
            className="rounded-md bg-green-500 px-3 py-[0.4rem] text-white"
            onClick={onCreateActivity}
          >
            활동 추가
          </button>
        </div>
        <div className="overflow-x-auto">
          <Suspense fallback={<ActivityListSkeleton type="Table" />}>
            <ActivityListFetcher>
              {activities => <ActivityListTable activities={activities} />}
            </ActivityListFetcher>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
