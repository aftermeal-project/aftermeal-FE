import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { LoginResponseDtoUser } from '../../types';

interface ProfileDropdownProps {
  user: LoginResponseDtoUser;
  onLogout: () => void;
  onNavigateToAdminPage: () => void;
}

export default function ProfileDropdown({
  user,
  onLogout,
  onNavigateToAdminPage,
}: ProfileDropdownProps) {
  const isAdmin = user.roles.includes('ADMIN');

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="text-md flex items-center justify-center gap-x-2 font-medium text-gray-700">
            <p className="tracking-wide text-white">{user.name}님</p>
            <FaChevronDown className="h-5 w-5 text-white" aria-hidden="true" />
          </MenuButton>
        </div>
        <MenuItems className="absolute right-0 z-50 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem>
            <div
              onClick={onLogout}
              className="flex cursor-pointer items-center rounded-t-md px-3 py-2 text-sm text-gray-900 hover:bg-gray-100"
            >
              <span role="img" aria-label="briefcase">
                🚪
              </span>
              <span className="ml-2">로그아웃</span>
            </div>
          </MenuItem>
          {isAdmin && (
            <MenuItem>
              <div
                onClick={onNavigateToAdminPage}
                className="flex cursor-pointer items-center rounded-b-md px-3 py-2 text-sm text-black hover:bg-gray-100"
              >
                <span role="img" aria-label="settings">
                  ⚙️
                </span>
                <span className="ml-2">어드민 페이지</span>
              </div>
            </MenuItem>
          )}
        </MenuItems>
      </Menu>
    </div>
  );
}
