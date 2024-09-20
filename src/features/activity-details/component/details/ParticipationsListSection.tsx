import { ActivityDetailResponseDtoParticipationsInner } from '../../../../types';

interface ParticipationsListSectionProps {
  participations: ActivityDetailResponseDtoParticipationsInner[];
}

export default function ParticipationsListSection({
  participations,
}: ParticipationsListSectionProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">참가자 목록</h2>
      <div className="grid grid-cols-1 gap-4 min-[1000px]:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(participations) &&
          participations.map(participant => (
            <div className="flex max-w-full items-center space-x-3 rounded-lg border bg-gray-50 p-4 shadow-sm">
              <div className="max-w-full">
                <p
                  className={`min-[1000px]:text-md text-sm font-bold ${participant.user.type === 'STUDENT' ? 'text-blue-700' : 'text-green-700'}`}
                >
                  {participant.user.type === 'TEACHER' ? '선생님' : '학생'}
                </p>
                <div className="group relative cursor-pointer">
                  <p className="text-md max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                    {participant.user.generationNumber}기 -{' '}
                    {participant.user.name}
                  </p>
                  <div className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-sm text-white group-hover:block">
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
