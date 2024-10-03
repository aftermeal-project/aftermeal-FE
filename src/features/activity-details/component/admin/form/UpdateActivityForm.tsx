import {
  ActivityDetailResponseDto,
  ActivityDetailResponseDtoParticipationsInner,
  ActivityListResponseDto,
} from '../../../../../types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ModeType, TabType } from '../details/AdminActivityDetails';
import { UserTab } from '../tabs';
import { UseFormReturn } from 'react-hook-form';
import { SelectField } from '../../../../activities';
import { typeOptions } from '../../../../activities/constants/options';
import { Input } from '../../../../../components';
import moment from 'moment';
import { validationMessages } from '../../../../../constants';
import { formatTime } from '../../../../../utils';
import useUpdateActivty from '../../../../activities/api/update-activity';
import { ButtonField } from '../button';
import 'react-tabs/style/react-tabs.css';

function validateActivity(data: ActivityListResponseDto): string | null {
  const isTitleInValid = data.title.length > 20 || data?.title.length < 2;
  const isLocationInValid = !data.activityLocationId;
  const isStartAfterEnd = moment(data.applicationStartAt).isAfter(
    data.applicationEndAt,
  );

  const isLunchPM =
    data.type === 'LUNCH' &&
    moment(data.applicationStartAt).format('A') === 'PM';
  const isDinnerAM =
    data.type === 'DINNER' &&
    moment(data.applicationStartAt).format('A') === 'AM';
  const isMaxParticipantsLess = data.maxParticipants < data.currentParticipants;

  if (isStartAfterEnd) return validationMessages.START_BEFORE_END;
  if (isLunchPM) return validationMessages.LUNCH_PM_ERROR;
  if (isDinnerAM) return validationMessages.DINNER_AM_ERROR;
  if (isMaxParticipantsLess)
    return validationMessages.MAX_PARTICIPANTS_LESS_THAN_CURRENT;
  if (isTitleInValid) return validationMessages.TITLE_LENGTH_ERROR;
  if (isLocationInValid) return validationMessages.INVALID_LOCATION;

  return null;
}

interface UpdateActivityFormProps {
  useForm: UseFormReturn<ActivityDetailResponseDto>;
  participations: ActivityDetailResponseDtoParticipationsInner[];
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
}

export default function UpdateActivityForm({
  useForm,
  participations,
  setTab,
  setMode,
}: UpdateActivityFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm;

  const { updateActivity } = useUpdateActivty();

  const onValid = (data: ActivityDetailResponseDto) => {
    data.applicationStartAt = formatTime({
      type: 'restore',
      time: String(data.applicationStartAt),
    });
    data.applicationEndAt = formatTime({
      type: 'restore',
      time: String(data.applicationEndAt),
    });

    const submitData: ActivityListResponseDto = {
      id: data.id,
      title: data.title,
      activityLocationId: Number(data.location),
      maxParticipants: data.maxParticipants,
      currentParticipants: data.participations.length,
      type: data.type,
      scheduledDate: data.scheduledDate,
      applicationStartAt: data.applicationStartAt,
      applicationEndAt: data.applicationEndAt,
    };

    const validationError = validateActivity(submitData);

    if (validationError) {
      alert(validationError);
    } else {
      updateActivity.mutate(submitData);
      setMode('Read');
      setTab('Basic');
      reset();
    }
  };

  const handleTabClick = (tab: TabType) => {
    setTab(tab);
  };

  const handleCancelUpdate = () => {
    setMode('Read');
    setTab('Basic');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Tabs>
        <TabList className="border-b border-gray-300 gap-x-2">
          <Tab onClick={() => handleTabClick('Basic')}>기본 정보</Tab>
          <Tab onClick={() => handleTabClick('Schedule')}>일정 정보</Tab>
          <Tab onClick={() => handleTabClick('User')}>참가자 목록</Tab>
        </TabList>

        <TabPanel className="px-3 mt-8">
          <Input<ActivityDetailResponseDto>
            label="활동명"
            name="title"
            type="text"
            placeholder="활동명"
            register={register}
            margin="mb-4"
            error={errors.title}
          />
          <div className="mb-4">
            <label htmlFor="location" className="inline-block mb-2 text-base">
              장소
            </label>
            <SelectField<ActivityDetailResponseDto>
              title="location"
              options={[]}
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="inline-block mb-2 text-base">
              활동 유형
            </label>
            <SelectField<ActivityDetailResponseDto>
              title="type"
              options={typeOptions}
              register={register}
            />
          </div>
          <Input<ActivityDetailResponseDto>
            label="최대 참가자"
            name="maxParticipants"
            type="number"
            placeholder="최대 참가자"
            register={register}
            margin="mb-4"
            error={errors.maxParticipants}
          />
        </TabPanel>

        <TabPanel className="px-3">
          <Input<ActivityDetailResponseDto>
            label="일정"
            name="scheduledDate"
            type="date"
            placeholder="일정"
            register={register}
            margin="mb-4"
            error={errors.scheduledDate}
          />
          <Input<ActivityDetailResponseDto>
            label="신청 시작 시간"
            name="applicationStartAt"
            type="time"
            placeholder="신청 시작 시간"
            register={register}
            margin="mb-4"
            error={errors.applicationStartAt}
          />
          <Input<ActivityDetailResponseDto>
            label="신청 마감 시간"
            name="applicationEndAt"
            type="time"
            placeholder="신청 마감 시간"
            register={register}
            margin="mb-4"
            error={errors.applicationEndAt}
          />
        </TabPanel>

        <TabPanel className="px-3">
          <UserTab participations={participations} />
        </TabPanel>
      </Tabs>

      <ButtonField mode={'Update'} onCancel={handleCancelUpdate} />
    </form>
  );
}
