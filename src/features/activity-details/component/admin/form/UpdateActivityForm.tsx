import {
  ActivityDetailResponseDto,
  ActivityDetailResponseDtoParticipationsInner,
  ActivityResponseDto,
} from '../../../../../types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ModeType, TabType } from '../details/AdminActivityDetails';
import { UserTab } from '../tabs';
import { UseFormReturn } from 'react-hook-form';
import { SelectField } from '../../../../activities';
import {
  typeOptions,
  statusOptions,
} from '../../../../activities/constants/options';
import { Input } from '../../../../../components';
import moment from 'moment';
import { validationMessages } from '../../../../../constants';
import { formatTime } from '../../../../../utils';
import useUpdateActivty from '../../../../activities/api/update-activity';
import { ButtonField } from '../button';
import 'react-tabs/style/react-tabs.css';

function validateActivity(data: ActivityResponseDto): string | null {
  const isTitleInValid = data.title.length > 20 || data?.title.length < 2;
  const isLocationInValid = data.location === 'none';
  const isStartAfterEnd = moment(data.applicationStartDate).isAfter(
    data.applicationEndDate,
  );
  const isLunchPM =
    data.type === 'LUNCH' &&
    moment(data.applicationStartDate).format('A') === 'PM';
  const isDinnerAM =
    data.type === 'DINNER' &&
    moment(data.applicationStartDate).format('A') === 'AM';
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
    data.applicationStartDate = formatTime({
      type: 'restore',
      time: String(data.applicationStartDate),
    });
    data.applicationEndDate = formatTime({
      type: 'restore',
      time: String(data.applicationEndDate),
    });

    const submitData: ActivityResponseDto = {
      id: data.id,
      title: data.title,
      location: String(data.location),
      maxParticipants: data.maxParticipants,
      currentParticipants: data.participations.length,
      status: data.status,
      type: data.type,
      scheduledDate: data.scheduledDate,
      applicationStartDate: data.applicationStartDate,
      applicationEndDate: data.applicationEndDate,
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
        <TabList className="gap-x-2 border-b border-gray-300">
          <Tab onClick={() => handleTabClick('Basic')}>기본 정보</Tab>
          <Tab onClick={() => handleTabClick('Schedule')}>일정 정보</Tab>
          <Tab onClick={() => handleTabClick('User')}>참가자 목록</Tab>
        </TabList>

        <TabPanel className="mt-8 px-3">
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
            <label htmlFor="location" className="mb-2 inline-block text-base">
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
            <label htmlFor="location" className="mb-2 inline-block text-base">
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
          <div className="mb-4">
            <label htmlFor="status" className="mb-2 inline-block text-base">
              진행 상태
            </label>
            <SelectField<ActivityDetailResponseDto>
              title="status"
              options={statusOptions}
              register={register}
            />
          </div>
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
            name="applicationStartDate"
            type="time"
            placeholder="신청 시작 시간"
            register={register}
            margin="mb-4"
            error={errors.applicationStartDate}
          />
          <Input<ActivityDetailResponseDto>
            label="신청 마감 시간"
            name="applicationEndDate"
            type="time"
            placeholder="신청 마감 시간"
            register={register}
            margin="mb-4"
            error={errors.applicationEndDate}
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
