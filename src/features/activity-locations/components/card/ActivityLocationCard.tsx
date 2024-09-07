import React, { useState } from 'react';
import { ActivityLocationListResponseDto } from '../../../../types';
import { Button } from '../../../../components';

interface ActivityLocationCardProps {
  location: ActivityLocationListResponseDto;
  onUpdate: (updatedData: ActivityLocationListResponseDto) => void;
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
    onUpdate({ id: location.id, name: name });
    setIsEditing(false);
  };

  return (
    <div className="p-4 transition-shadow border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
