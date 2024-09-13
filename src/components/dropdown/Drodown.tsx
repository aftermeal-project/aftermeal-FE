import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { FaEllipsisV } from 'react-icons/fa';

interface DropDownProps {
  onUpdate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Dropdown({ onUpdate, onDelete }: DropDownProps) {
  return (
    <Menu as="div" className="relative">
      <MenuButton
        onClick={e => e.stopPropagation()}
        className="inline-flex items-center p-2 text-gray-500 hover:text-gray-700"
      >
        <FaEllipsisV className="w-5 h-5" aria-hidden="true" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-20 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-28">
        <div className="space-y-2">
          <button
            onClick={onUpdate}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
          >
            수정
          </button>
          <button
            onClick={onDelete}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-100"
          >
            삭제
          </button>
        </div>
      </MenuItems>
    </Menu>
  );
}
