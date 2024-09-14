import { ActivityDetailResponseDtoParticipantsInner } from '../../../../types';

interface ParticipantsListSectionProps {
  participants: ActivityDetailResponseDtoParticipantsInner[];
}

export default function ParticipantsListSection({
  participants,
}: ParticipantsListSectionProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">참가자 목록</h2>
      <div className="grid grid-cols-1 gap-4 min-[1000px]:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(participants) &&
          participants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center p-4 space-x-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-200 rounded-full">
                {String(participant.displayName).charAt(0)}
              </div>
              <p className="text-lg font-medium">{participant.displayName}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
