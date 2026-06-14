import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

function SelectInput() {
  const [selectedValue, setSelectedValue] = useState('1');

  return (
    <div className="mx-auto w-full max-w-sm">
      <label htmlFor="select-box" className="mb-2 block text-sm font-semibold text-gray-700">
        Select an option
      </label>

      {/* Container tạo hiệu ứng viền khi focus */}
      <div className="group relative">
        <select
          id="select-box"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 shadow-sm transition-all duration-200 focus:outline-none"
        >
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 transition-colors">
          <FaChevronDown className="h-4 w-4 fill-current" />
        </div>
      </div>
    </div>
  );
}

export default SelectInput;
