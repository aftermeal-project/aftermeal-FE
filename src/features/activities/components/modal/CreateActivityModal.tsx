import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import { FormErrorMessages, Input, ModalLayout } from '../../../../components';
import {
  AtomKeys,
  createActivityValidationRules,
  errorMessages,
} from '../../../../constants';
import { ActivityCreationRequestDto } from '../../../../types';
import useCreateActivity from '../../api/create-activitiy';
import { SelectField } from '../select';
import { typeOptions } from '../../constants/options';

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

  const createActivityModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY_MODAL),
  );

  function onValid(data: ActivityCreationRequestDto) {
    createActivity.mutate(data, {
      onError: () => {
        alert(errorMessages.UNKNOWN_ERROR);
      },
      onSettled: () => {
        createActivityModalOpen(false);
        reset();
      },
    });
  }

  function handleModalClose() {
    createActivityModalOpen(false);
    reset();
  }

  return (
    <ModalLayout setModal={createActivityModalOpen}>
      <div
        className="p-6 mx-auto bg-white rounded-lg shadow-lg w-80"
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
            <label htmlFor="location" className="inline-block mb-2 text-base">
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
            <label htmlFor="location" className="inline-block mb-2 text-base">
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
          <div className="flex justify-between w-full mt-11">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
