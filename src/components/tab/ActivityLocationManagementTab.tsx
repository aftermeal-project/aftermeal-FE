import { Suspense } from 'react';
import { FiPlus } from 'react-icons/fi';
import {
  ActivityLocationList,
  ActivityLocationListFetcher,
  ActivityLocationListSkeleton,
  CreateActivityLocationModal,
} from '../../features/activity-locations';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../atoms';
import { AtomKeys } from '../../constants';
import { Button } from '../button';
import useDeleteActivityLocation from '../../features/activity-locations/api/delete-activity-location';
import { ConfirmDeleteModal } from '../modal';

export default function ActivityLocationManagementTab() {
  const [createLocationModalOpen, setCreateLocationModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY_LOCATION_MODAL),
  );

  const deleteModalOpen = useRecoilValue(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY_LOCATION_MODAL),
  );

  const { deleteActivityLocation } = useDeleteActivityLocation();

  const activeLocationId = useRecoilValue(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_LOCATION_ID),
  );
  const resetActiveLocationId = useResetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_LOCATION_ID),
  );

  const handleCreateLocation = () => {
    setCreateLocationModalOpen(true);
  };

  return (
    <div>
      {createLocationModalOpen && <CreateActivityLocationModal />}
      {deleteModalOpen && (
        <ConfirmDeleteModal
          message="정말 해당 장소를 삭제하시겠습니까?"
          modalKey={AtomKeys.DELETE_ACTIVITY_LOCATION_MODAL}
          request={deleteActivityLocation}
          params={String(activeLocationId)}
          onSettled={resetActiveLocationId}
        />
      )}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">장소 관리</h1>
        <Button type="button" icon={<FiPlus />} onClick={handleCreateLocation}>
          장소 추가
        </Button>
      </div>
      <Suspense fallback={<ActivityLocationListSkeleton />}>
        <ActivityLocationListFetcher>
          {locations => <ActivityLocationList locations={locations} />}
        </ActivityLocationListFetcher>
      </Suspense>
    </div>
  );
}
