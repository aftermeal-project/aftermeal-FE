import { useSetRecoilState } from 'recoil';
import ModalLayout from '../../@global/layout/ModalLayout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ModalAtomFamily } from '../../../atoms';
import { AtomKeys } from '../../../constants';
import { AuthInput } from '../auth';

interface ActivityFormValues {
  name: string;
  location: string;
  maxParticipants: number;
}

export default function CreateActivityModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityFormValues>({
    defaultValues: {
      name: '',
      location: '',
      maxParticipants: 2,
    },
  });

  const setModal = useSetRecoilState(ModalAtomFamily(AtomKeys.CREATE_ACTIVITY));

  const onSubmit: SubmitHandler<ActivityFormValues> = data => {
    setModal(false);
  };

  function handleModalClose() {
    setModal(false);
  }

  return (
    <ModalLayout setModal={setModal}>
      <div
        className="mx-auto w-80 rounded-lg bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-8 text-lg font-bold">활동 추가</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AuthInput<ActivityFormValues>
            label="이름"
            name="name"
            type="text"
            placeholder="이름"
            register={register}
            margin="mb-4"
            error={errors.name}
          />
          <AuthInput<ActivityFormValues>
            label="장소"
            name="location"
            type="text"
            placeholder="장소"
            register={register}
            margin="mb-4"
            error={errors.location}
          />
          <AuthInput<ActivityFormValues>
            label="최대 참가자 수"
            name="maxParticipants"
            type="number"
            placeholder="최대 참가자 수"
            register={register}
            margin="mb-4"
            error={errors.maxParticipants}
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
