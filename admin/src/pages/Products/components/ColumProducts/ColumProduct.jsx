import React from 'react';
import { LuArrowDownUp } from 'react-icons/lu';
function ColumProduct({ title, isShowColums }) {
  if (isShowColums) {
    return null;
  }

  return (
    <th className="border-blue-gray-100 bg-blue-gray-50 border-b p-4">
      <div className="text-blue-gray-900 block font-sans text-sm leading-none font-normal antialiased opacity-70">
        <div className="flex items-center">
          <div className="flex items-center">
            {title}
            <LuArrowDownUp size={14} color="gray" />
          </div>
        </div>
      </div>
    </th>
  );
}

export default ColumProduct;
