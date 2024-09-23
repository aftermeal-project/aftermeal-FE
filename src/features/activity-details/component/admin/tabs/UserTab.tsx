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
      {Array.isArray(participations) && participations.length > 0 ? (
        participations.map(item => (
          <User
            key={item.id}
            user={item.user}
            onDelete={() => console.log('d')}
          />
        ))
      ) : (
        <p>아직 참가자가 없습니다</p>
      )}
    </div>
  );
}
