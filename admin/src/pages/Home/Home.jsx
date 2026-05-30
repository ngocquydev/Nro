import Header from '@components/layouts/Header/Header';
import SideBar from '@components/layouts/SideBar/SideBar';
import React from 'react';

function Home() {
  return (
    <div className="grid h-screen grid-cols-[300px_1fr]">
      <div className="h-screen overflow-hidden border-r">
        <SideBar />
      </div>
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="h-20 bg-gray-200 p-4">
          <Header />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
