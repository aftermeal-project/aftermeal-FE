import { useSetRecoilState } from 'recoil';
import ModalLayout from '../../../components/@global/layout/ModalLayout';
import { useForm } from 'react-hook-form';
import { ModalAtomFamily } from '../../../atoms';
import { AtomKeys } from '../../../constants';
import { Input } from '../../../components/@global';
import { ActivityCreationRequestDto } from '../../../types';
import useCreateActivity from '../api/create-activitiy';

export default function CreateActivityModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityCreationRequestDto>({
    defaultValues: {
      title: '',
      location: '',
      maxParticipants: 2,
    },
  });

  const { createActivity } = useCreateActivity();

  const setModal = useSetRecoilState(ModalAtomFamily(AtomKeys.CREATE_ACTIVITY));

  function onSubmit(data: ActivityCreationRequestDto) {
    // check validation

    createActivity.mutate(data, {
      onSuccess: () => setModal(false),
    });
  }

  function handleModalClose() {
    setModal(false);
  }

  return (
    <ModalLayout setModal={setModal}>
      <div
        className="p-6 mx-auto bg-white rounded-lg shadow-lg w-80"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-8 text-lg font-bold">활동 추가</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input<ActivityCreationRequestDto>
            label="이름"
            name="title"
            type="text"
            placeholder="이름"
            register={register}
            margin="mb-4"
            error={errors.title}
          />
          <Input<ActivityCreationRequestDto>
            label="장소"
            name="location"
            type="text"
            placeholder="장소"
            register={register}
            margin="mb-4"
            error={errors.location}
          />
          <Input<ActivityCreationRequestDto>
            label="최대 참가자 수"
            name="maxParticipants"
            type="number"
            placeholder="최대 참가자 수"
            register={register}
            margin="mb-4"
            error={errors.maxParticipants}
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
