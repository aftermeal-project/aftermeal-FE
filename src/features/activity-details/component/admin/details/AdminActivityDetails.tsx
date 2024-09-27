import { ActivityDetailResponseDto } from '../../../../../types';
import moment from 'moment';
import { getTypeLabel } from '../../../../../utils';
import { useState } from 'react';
import { ActivityDetailsTabsContainer } from '../tabs';
import { ButtonField } from '../button';
import { UpdateActivityForm } from '../form';
import { useForm } from 'react-hook-form';
import { useUpdateActivityForm } from '../../../../../hooks/useUpdateActivityForm';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../../atoms';
import { AtomKeys } from '../../../../../constants';
import { ConfirmDeleteModal } from '../../../../../components';
import useDeleteActivity from '../../../../activities/api/delete-activity';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export type ModeType = 'Read' | 'Update';
export type TabType = 'Basic' | 'Schedule' | 'User';

interface AdminActivityDetailsProps {
  activity: ActivityDetailResponseDto;
}

function getFormattedTitle(date: string, type: string, title: string) {
  const formattedDate = moment(date).format('YYYY년 MM월 DD일 dddd');
  const typeLabel = getTypeLabel(type);
  return `${formattedDate} ${typeLabel} ${title}`;
}

export default function AdminActivityDetails({
  activity,
}: AdminActivityDetailsProps) {
  const navigate = useNavigate();
  const formMethods = useForm<ActivityDetailResponseDto>();
  const { handleUpdate } = useUpdateActivityForm(formMethods);

  const [mode, setMode] = useState<ModeType>('Read');
  const [tab, setTab] = useState<TabType>('Basic');

  const [deleteModalOpen, setDeleteModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY_MODAL),
  );
  const [activeId, setActiveId] = useRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );
  const resetActivityId = useResetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );

  const { deleteActivity } = useDeleteActivity();

  const handleUpdateActivity = () => {
    handleUpdate(activity);
    setMode('Update');
  };

  const handleDeleteActivity = (activityId: number) => {
    setActiveId(activityId);
    setDeleteModalOpen(true);
  };

  const handleSettled = () => {
    resetActivityId();
    navigate('/admin');
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1000px] rounded-lg bg-white p-6 shadow-lg">
      {deleteModalOpen && (
        <ConfirmDeleteModal
          message="정말 해당 활동을 삭제하시겠습니까?"
          modalKey={AtomKeys.DELETE_ACTIVITY_MODAL}
          request={deleteActivity}
          params={String(activeId)}
          onSettled={handleSettled}
        />
      )}
      <div className="mb-9 flex w-full items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">
          {getFormattedTitle(
            activity.scheduledDate,
            activity.type,
            activity.title,
          )}
        </h2>
        <FaArrowLeft
          onClick={handleSettled}
          className="cursor-pointer text-3xl text-blue-500"
        />
      </div>

      {mode === 'Read' ? (
        <ActivityDetailsTabsContainer activity={activity} setTab={setTab} />
      ) : (
        <UpdateActivityForm
          useForm={formMethods}
          participations={activity.participations}
          setTab={setTab}
          setMode={setMode}
        />
      )}
      {tab !== 'User' && mode === 'Read' && (
        <ButtonField
          mode={'Read'}
          onUpdate={handleUpdateActivity}
          onDelete={() => handleDeleteActivity(activity.id)}
        />
      )}
    </main>
  );
}
