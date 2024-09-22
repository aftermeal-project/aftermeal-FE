import { ActivityDetailResponseDto } from '../../../../../types';
import moment from 'moment';
import { getTypeLabel } from '../../../../../utils';
import { useState } from 'react';
import { ActivityDetailsTabsContainer } from '../tabs';
import { ButtonField } from '../button';
import { UpdateActivityForm } from '../form';
import { useForm } from 'react-hook-form';
import { useUpdateActivityForm } from '../../../../../hooks/useUpdateActivityForm';

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
  const formMethods = useForm<ActivityDetailResponseDto>();

  const [mode, setMode] = useState<ModeType>('Read');
  const [tab, setTab] = useState<TabType>('Basic');

  const { handleUpdate } = useUpdateActivityForm(formMethods);

  const handleUpdateActivity = () => {
    handleUpdate(activity);
    setMode('Update');
  };

  const handleCancelUpdateActivity = () => {
    setMode('Read');
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1000px] rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-9">
        {getFormattedTitle(
          activity.scheduledDate,
          activity.type,
          activity.title,
        )}
      </h2>

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
          onDelete={() => console.log('')}
          onSave={() => console.log('')}
          onCancel={handleCancelUpdateActivity}
        />
      )}
    </main>
  );
}
