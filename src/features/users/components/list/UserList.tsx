import { useState } from 'react';
import { UserListResponseDto, UserUpdateRequestDto } from '../../../../types';
import { User, UpdateUserModal } from '../';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import useDeleteUser from '../../api/delete-user';
import { useForm } from 'react-hook-form';
import { SearchBar, ConfirmDeleteModal } from '../../../../components';

interface UserListContainerProps {
  users: UserListResponseDto[];
}

export default function UserList({ users }: UserListContainerProps) {
  const formMethods = useForm<UserUpdateRequestDto>();
  const { reset } = formMethods;

  const { deleteUser } = useDeleteUser();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [activeUserId, setActiveUserId] = useRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_USER_ID),
  );
  const resetActiveUserId = useResetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_USER_ID),
  );

  const [deleteModalOpen, setDeleteModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.DELETE_USER_MODAL),
  );
  const [updateModalOpen, setUpdateModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.UPDATE_USER_MODAL),
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.email &&
            user.email.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : [];

  const settingUpdateUserModalFormValue = (userId: number) => {
    const selectedUser = users.find(user => user.id === userId);
    reset(selectedUser);
  };

  const handleUpdateUser = (userId: number) => {
    if (!deleteModalOpen) {
      settingUpdateUserModalFormValue(userId);
      setActiveUserId(userId);
      setUpdateModalOpen(true);
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (!updateModalOpen) {
      setActiveUserId(userId);
      setDeleteModalOpen(true);
    }
  };

  return (
    <section>
      {updateModalOpen && <UpdateUserModal useForm={formMethods} />}
      {deleteModalOpen && (
        <ConfirmDeleteModal
          message="정말 해당 유저를 삭제하시겠습니까?"
          modalKey={AtomKeys.DELETE_USER_MODAL}
          request={deleteUser}
          params={String(activeUserId)}
          onSettled={resetActiveUserId}
        />
      )}
      <SearchBar
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        placeholder="유저 검색 ..."
      />
      <div className="max-h-[calc(100vh-150px)] w-full overflow-y-auto rounded-lg border border-gray-200 bg-white px-6 py-3 shadow">
        <div className="flow-root">
          <ul className="divide-y divide-gray-200">
            {Array.isArray(users) && filteredUsers.length > 0 ? (
              <>
                {filteredUsers.map(user => (
                  <User
                    key={user.id}
                    user={user}
                    onUpdate={() => handleUpdateUser(user.id)}
                    onDelete={() => handleDeleteUser(user.id)}
                  />
                ))}
              </>
            ) : (
              <h1 className="text-md py-3 font-bold">검색 결과가 없습니다!</h1>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
