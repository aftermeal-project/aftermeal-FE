import { useState } from 'react';
import { ActivityLocationListResponseDto } from '../../../../types';
import { Button } from '../../../../components';
import { UseMutationResult } from '@tanstack/react-query';

interface ActivityLocationCardProps {
  location: ActivityLocationListResponseDto;
  onUpdate: UseMutationResult<void, Error, ActivityLocationListResponseDto>;
  onDelete: (id: number) => void;
}

export default function ActivityLocationCard({
  location,
  onUpdate,
  onDelete,
}: ActivityLocationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(location.name);

  const handleSave = () => {
    setIsEditing(false);
    const updatedData = { ...location, name: name };
    onUpdate.mutate(updatedData);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-md transition-shadow hover:shadow-lg">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between gap-x-8">
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              size="small"
              variant="secondary"
              fullWidth
            >
              취소
            </Button>
            <Button type="button" onClick={handleSave} size="small" fullWidth>
              저장
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-700">
            {location.name}
          </h3>
          <div className="flex justify-between gap-x-8">
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              variant="yellow"
              size="small"
              fullWidth
            >
              수정
            </Button>
            <Button
              type="button"
              onClick={() => onDelete(location.id)}
              variant="danger"
              size="small"
              fullWidth
            >
              삭제
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
