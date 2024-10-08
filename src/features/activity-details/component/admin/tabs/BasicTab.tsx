import {
  ActivityDetailResponseDtoStatus,
  ActivityDetailResponseDtoType,
} from '../../../../../types';
import { getStatusLabel, getTypeLabel } from '../../../../../utils';

interface BasicTabProps {
  title: string;
  location?: string;
  type: ActivityDetailResponseDtoType;
  status: ActivityDetailResponseDtoStatus;
  maxParticipants: number;
}

export default function BasicTab({
  title,
  location,
  type,
  status,
  maxParticipants,
}: BasicTabProps) {
  return (
    <div className="grid grid-cols-1 gap-y-2">
      <div className="bg-white rounded-lg">
        <p className="font-semibold">활동명</p>
        <span className="text-gray-700">{title}</span>
        <hr className="my-2" />
      </div>
      <div className="bg-white rounded-lg">
        <p className="font-semibold">장소</p>
        <span className="text-gray-700">{location}</span>
        <hr className="my-2" />
      </div>
      <div className="bg-white rounded-lg">
        <p className="font-semibold">활동 유형</p>
        <span className="text-gray-700">{getTypeLabel(type)}</span>
        <hr className="my-2" />
      </div>
      <div className="bg-white rounded-lg">
        <p className="font-semibold">진행 상태</p>
        <span className="text-gray-700">{getStatusLabel(status)}</span>
        <hr className="my-2" />
      </div>
      <div className="bg-white rounded-lg">
        <p className="font-semibold">최대 참가자</p>
        <span className="text-gray-700">{maxParticipants}</span>
      </div>
    </div>
  );
}
