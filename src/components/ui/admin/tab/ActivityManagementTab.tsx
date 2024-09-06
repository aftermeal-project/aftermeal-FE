import { Suspense } from 'react';
import {
  ActivityListFetcher,
  ActivityListSkeleton,
  ConfirmDeleteModal,
  CreateActivityModal,
  ActivityListTable,
} from '../../../../features/activities';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import useDeleteActivity from '../../../../features/activities/api/delete-activity';

export default function ActivityManagementTab() {
  const resetActivityId = useResetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );
  const { deleteActivity } = useDeleteActivity();
  const activeId = useRecoilValue(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );

  const deleteModalOpen = useRecoilValue(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY_MODAL),
  );
  const [createModalOpen, setCreateModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY_MODAL),
  );

  function onCreateActivity() {
    setCreateModalOpen(true);
  }

  return (
    <section>
      {createModalOpen && <CreateActivityModal />}
      {deleteModalOpen && (
        <ConfirmDeleteModal
          message="정말 해당 활동을 삭제하시겠습니까?"
          modalKey={AtomKeys.DELETE_ACTIVITY_MODAL}
          request={deleteActivity}
          params={String(activeId)}
          onSettled={resetActivityId}
        />
      )}
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
