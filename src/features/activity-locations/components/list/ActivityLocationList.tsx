import { ActivityLocationListResponseDto } from '../../../../types';
import { useState } from 'react';
import { ActivityLocationCard } from '../card';

interface ActivityLocationListProps {
  locations: ActivityLocationListResponseDto[];
}

export default function ActivityLocationList({
  locations,
}: ActivityLocationListProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdate = (locationId: number) => {
    alert(`${locationId}번 장소 수정`);
  };

  const handleDelete = (locationId: number) => {
    alert(`${locationId}번 장소 삭제`);
  };

  return (
    <section>
      {/* 컴포넌트화 예정 */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색..."
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {locations.map(location => (
          <ActivityLocationCard
            key={location.id}
            location={location}
            onUpdate={() => handleUpdate(location.id)}
            onDelete={() => handleDelete(location.id)}
          />
        ))}
      </div>
    </section>
  );
}
