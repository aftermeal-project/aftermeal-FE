import { useSetRecoilState } from 'recoil';
import ModalLayout from '../../@global/layout/ModalLayout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ModalAtomFamily } from '../../../atoms';
import { AtomKeys } from '../../../constants';
import { Input } from '../../@global';
import { ActivityCreatationRequestDto } from '../../../types';

export default function CreateActivityModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityCreatationRequestDto>({
    defaultValues: {
      name: '',
      location: '',
      maxParticipants: 2,
    },
  });

  const setModal = useSetRecoilState(ModalAtomFamily(AtomKeys.CREATE_ACTIVITY));

  const onSubmit: SubmitHandler<ActivityCreatationRequestDto> = data => {
    setModal(false);
  };

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
          <Input<ActivityCreatationRequestDto>
            label="이름"
            name="name"
            type="text"
            placeholder="이름"
            register={register}
            margin="mb-4"
            error={errors.name}
          />
          <Input<ActivityCreatationRequestDto>
            label="장소"
            name="location"
            type="text"
            placeholder="장소"
            register={register}
            margin="mb-4"
            error={errors.location}
          />
          <Input<ActivityCreatationRequestDto>
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
