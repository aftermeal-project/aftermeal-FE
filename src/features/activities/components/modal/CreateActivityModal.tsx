import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import { FormErrorMessages, Input } from '../../../../components/@global';
import ModalLayout from '../../../../components/@global/layout/ModalLayout';
import {
  AtomKeys,
  createActivityValidationRules,
  errorMessages,
} from '../../../../constants';
import { ActivityCreationRequestDto } from '../../../../types';
import useCreateActivity from '../../api/create-activitiy';
import SelectField from '../select/SelectField';
import { typeOptions } from '../constants/options';

export default function CreateActivityModal() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ActivityCreationRequestDto>({
    defaultValues: {
      title: '',
      maxParticipants: 2,
    },
  });

  const { createActivity } = useCreateActivity();

  const setModal = useSetRecoilState(ModalAtomFamily(AtomKeys.CREATE_ACTIVITY));

  function onValid(data: ActivityCreationRequestDto) {
    createActivity.mutate(data, {
      onError: () => {
        alert(errorMessages.UNKNOWN_ERROR);
      },
      onSettled: () => {
        setModal(false);
        reset();
      },
    });
  }

  function handleModalClose() {
    setModal(false);
    reset();
  }

  return (
    <ModalLayout setModal={setModal}>
      <div
        className="mx-auto w-80 rounded-lg bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-8 text-lg font-bold">활동 추가</h2>
        <form onSubmit={handleSubmit(onValid)}>
          <Input<ActivityCreationRequestDto>
            label="활동명"
            name="title"
            type="text"
            placeholder="활동명"
            register={register}
            validationRules={createActivityValidationRules.titleValidationRules}
            margin="mb-4"
            error={errors.title}
          />
          <div className="mb-4">
            <label htmlFor="location" className="mb-2 inline-block text-base">
              장소
            </label>
            <SelectField<ActivityCreationRequestDto>
              title="location"
              options={[]}
              register={register}
              setValue={setValue}
            />
          </div>
          <Input<ActivityCreationRequestDto>
            label="최대 참가자"
            name="maxParticipants"
            type="number"
            placeholder="최대 참가자"
            register={register}
            validationRules={
              createActivityValidationRules.maxParticipantsValidationRules
            }
            margin="mb-4"
            error={errors.maxParticipants}
          />
          <div className="mb-4">
            <label htmlFor="location" className="mb-2 inline-block text-base">
              세션 유형
            </label>
            <SelectField<ActivityCreationRequestDto>
              title="type"
              options={typeOptions}
              register={register}
            />
          </div>
          <Input<ActivityCreationRequestDto>
            label="일정"
            name="scheduledDate"
            type="date"
            placeholder="일정"
            register={register}
            validationRules={
              createActivityValidationRules.scheduledDateValidationRules
            }
            margin="mb-4"
            error={errors.scheduledDate}
          />
          <FormErrorMessages
            errors={errors}
            fields={[
              'title',
              'location',
              'maxParticipants',
              'type',
              'scheduledDate',
            ]}
          />
          <div className="mt-11 flex w-full justify-between">
            <button
              type="button"
              onClick={handleModalClose}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
