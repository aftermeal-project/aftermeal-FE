import React from 'react';

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchBar({
  searchValue,
  onSearchChange,
  placeholder = '검색...',
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={searchValue}
      onChange={onSearchChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 mb-4 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  );
}
