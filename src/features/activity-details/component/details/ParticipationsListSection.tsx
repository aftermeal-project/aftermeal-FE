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
              className="flex items-center max-w-full p-4 space-x-3 border rounded-lg shadow-sm bg-gray-50"
            >
              <div className="max-w-full">
                <p
                  className={`min-[1000px]:text-md text-sm font-bold ${participant.user.type === 'STUDENT' ? 'text-blue-700' : 'text-green-700'}`}
                >
                  {participant.user.type === 'TEACHER' ? '선생님' : '학생'}
                </p>
                <div className="relative cursor-pointer group">
                  <p className="max-w-full overflow-hidden font-medium text-md text-ellipsis whitespace-nowrap">
                    {participant.user.generationNumber}기 -{' '}
                    {participant.user.name}
                  </p>
                  <div className="absolute hidden px-2 py-1 mb-2 text-sm text-white bg-gray-800 rounded bottom-full group-hover:block">
                    {participant.user.generationNumber}기 -{' '}
                    {participant.user.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
