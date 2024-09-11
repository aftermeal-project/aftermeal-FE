import { ActivityLocationListResponseDto } from '../../../../types';
import { useState } from 'react';
import { ActivityLocationCard } from '../card';
import { useSetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import useUpdateActivityLocation from '../../api/update-activity-location';
import { SearchBar } from '../../../../components';

interface ActivityLocationListProps {
  locations: ActivityLocationListResponseDto[];
}

export default function ActivityLocationList({
  locations,
}: ActivityLocationListProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { updateActivityLocation } = useUpdateActivityLocation();

  const setActiveLocationId = useSetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_LOCATION_ID),
  );

  const setDeleteModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY_LOCATION_MODAL),
  );

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdate = (updatedData: ActivityLocationListResponseDto) => {
    updateActivityLocation.mutate(updatedData);
  };

  const handleDelete = (locationId: number) => {
    setActiveLocationId(locationId);
    setDeleteModalOpen(true);
  };

  return (
    <section>
      <SearchBar
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        placeholder="장소 검색 ..."
      />
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
