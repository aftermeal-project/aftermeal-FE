import { Suspense } from 'react';
import {
  ActivityListFetcher,
  ActivityListSkeleton,
  ConfirmDeleteModal,
  CreateActivityModal,
  ActivityListTable,
} from '../../../../features/activities';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { ActiveIdAtom, ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import useDeleteActivity from '../../../../features/activities/api/delete-activity';

export default function ActivityManagementTab() {
  const resetActivityId = useResetRecoilState(ActiveIdAtom);
  const { deleteActivity } = useDeleteActivity();
  const activeId = useRecoilValue(ActiveIdAtom);

  const deleteModalOpen = useRecoilValue(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY),
  );
  const [createModalOpen, setCreateModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY),
  );

  function onCreateActivity() {
    setCreateModalOpen(true);
  }

  return (
    <section>
      {deleteModalOpen && (
        <ConfirmDeleteModal
          message="삭제 확인"
          modalKey={AtomKeys.DELETE_ACTIVITY}
          request={deleteActivity}
          params={String(activeId)}
          onSettled={resetActivityId}
        />
      )}
      {createModalOpen && <CreateActivityModal />}
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
