import { ActivityDetailResponseDtoParticipationsInner } from '../../../../../types';
import { useCancelParticipation } from '../../../../participations/api/cancel-participation';
import { User } from '../../../../users';

interface ParticipantsTabProps {
  participations: ActivityDetailResponseDtoParticipationsInner[];
}

export default function ParticipantsTab({
  participations,
}: ParticipantsTabProps) {
  const { cancelParticipation, isCancelLoading } = useCancelParticipation();

  const handleDeleteParticipation = (participationId: number) => {
    if (!isCancelLoading) {
      cancelParticipation.mutate(String(participationId));
    }
  };

  return (
    <div>
      <p className="mb-2 font-bold">참가자 목록</p>
      {Array.isArray(participations) && participations.length > 0 ? (
        participations.map(item => (
          <User
            key={item.id}
            user={item.user}
            onDelete={() => handleDeleteParticipation(item.user.id)}
          />
        ))
      ) : (
        <p>아직 참가자가 없습니다</p>
      )}
    </div>
  );
}
