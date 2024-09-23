import { ActivityDetailResponseDtoParticipationsInner } from '../../../../../types';
import { User } from '../../../../users';

interface ParticipantsTabProps {
  participations: ActivityDetailResponseDtoParticipationsInner[];
}

export default function ParticipantsTab({
  participations,
}: ParticipantsTabProps) {
  return (
    <div>
      <p className="mb-2 font-bold">참가자 목록</p>
      {participations.map(item => (
        <User
          key={item.id}
          user={item.user}
          onDelete={() => console.log('d')}
        />
      ))}
    </div>
  );
}
