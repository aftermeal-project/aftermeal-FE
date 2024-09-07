import { ActivityLocationListResponseDto } from '../../../../types';
import { useState } from 'react';
import { ActivityLocationCard } from '../card';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import useDeleteActivityLocation from '../../api/delete-activity-location';
import { ConfirmDeleteModal } from '../../../modals';
import useUpdateActivityLocation from '../../api/update-activity-location';

interface ActivityLocationListProps {
  locations: ActivityLocationListResponseDto[];
}

export default function ActivityLocationList({
  locations,
}: ActivityLocationListProps) {
  const { deleteActivityLocation } = useDeleteActivityLocation();
  const { updateActivityLocation } = useUpdateActivityLocation();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeLocationId, setActiveLocationId] = useRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_LOCATION_ID),
  );
  const resetActiveLocationId = useResetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_LOCATION_ID),
  );
  const [deleteModalOpen, setDeleteModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY_LOCATION_MODAL),
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleUpdate = (updatedData: ActivityLocationListResponseDto) => {
    updateActivityLocation.mutate(updatedData);
  };

  const handleDelete = (locationId: number) => {
    setActiveLocationId(locationId);
    setDeleteModalOpen(true);
  };

  return (
    <section>
      {deleteModalOpen && (
        <ConfirmDeleteModal
          message="정말 해당 장소를 삭제하시겠습니까?"
          modalKey={AtomKeys.DELETE_ACTIVITY_LOCATION_MODAL}
          request={deleteActivityLocation}
          params={String(activeLocationId)}
          onSettled={resetActiveLocationId}
        />
      )}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색..."
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredLocations.length > 0 ? (
          filteredLocations.map(location => (
            <ActivityLocationCard
              key={location.id}
              location={location}
              onUpdate={() => handleUpdate(location)}
              onDelete={() => handleDelete(location.id)}
            />
          ))
        ) : (
          <h1 className="py-3 font-bold text-md">검색 결과가 없습니다!</h1>
        )}
      </div>
    </section>
  );
}
