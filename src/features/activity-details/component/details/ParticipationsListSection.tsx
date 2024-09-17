import { ActivityDetailResponseDtoParticipationsInner } from '../../../../types';

interface ParticipationsListSectionProps {
  participations: ActivityDetailResponseDtoParticipationsInner[];
}

export default function ParticipationsListSection({
  participations,
}: ParticipationsListSectionProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">참가자 목록</h2>
      <div className="grid grid-cols-1 gap-4 min-[1000px]:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(participations) &&
          participations.map(participant => (
            <div
              key={participant.id}
              className="flex items-center p-4 space-x-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-200 rounded-full">
                {String(participant.user.name).charAt(0)}
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${participant.user.type === 'STUDENT' ? 'text-blue-700' : 'text-green-700'}`}
                >
                  {participant.user.type === 'TEACHER' ? '선생님' : '학생'}
                </p>
                <p className="font-medium text-md">
                  {participant.user.generationNumber}기 -{' '}
                  {participant.user.name}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
