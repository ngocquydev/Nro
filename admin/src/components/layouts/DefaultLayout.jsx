import Header from '@components/layouts/Header/Header';
import SideBar from '@components/layouts/SideBar/SideBar';
import React, { useState } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
function DefaultLayout({ children }) {
  const [isShowSideBar, setShowSideBar] = useState(true);
  return (
    <div
      className={`grid h-screen transition-all duration-300 ease-in-out ${
        isShowSideBar ? 'grid-cols-[250px_1fr]' : 'grid-cols-[100px_1fr]'
      }`}
    >
      {/* Sidebar container */}
      <div className="relative h-screen border-r transition-all duration-300 ease-in-out">
        <SideBar isShowSideBar={isShowSideBar} />
        {/* Nút Toggle */}
        <div
          className="absolute top-[99px] -right-3 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-amber-200 transition-transform duration-300 hover:scale-110"
          onClick={() => setShowSideBar((prev) => !prev)}
        >
          <div
            className={`transition-transform duration-300 ${!isShowSideBar ? 'rotate-180' : ''}`}
          >
            <MdOutlineArrowForwardIos size={12} />
          </div>
        </div>
      </div>

      {/* Phần còn lại */}
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="h-20 bg-gray-200 p-4">
          <Header />
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
