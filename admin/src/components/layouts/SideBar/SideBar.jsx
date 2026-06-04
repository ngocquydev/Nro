import React, { useEffect, useMemo, useState } from 'react';
import { CiShop } from 'react-icons/ci';
import { FaChartBar, FaHandshake, FaRocket } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { LuChartNoAxesCombined } from 'react-icons/lu';
import { MdArrowForwardIos } from 'react-icons/md';
import menuItems from './constans'; // Sửa nhẹ typo 'constans' nếu cần thiết ở file gốc của bạn
import { Link, useLocation } from 'react-router-dom';
import routers from '@routers/routers';
import useActiveRoute from '@hook/useActiveRoute';

function SideBar({ isShowSideBar }) {
  const [activeItems, setActiveItems] = useState(() => menuItems.map((item) => item.id));

  const handleToggle = (id) => {
    setActiveItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id) // Nếu đang mở -> đóng (xóa khỏi mảng)
        : [...prev, id]
    );
  };

  const totalArrSubMenu = useMemo(() => {
    return menuItems?.flatMap((it) => it.subMenu || []) || [];
  }, [menuItems]);

  const { pathname } = useActiveRoute(routers);

  return (
    <div className="flex h-screen flex-col bg-stone-950 p-3">
      {/* Sidebar Header */}
      <div className="flex h-20 items-center">
        <div className="flex w-20 items-center justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 text-stone-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
            </svg>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${isShowSideBar ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
        >
          <div className="text-lg font-bold whitespace-nowrap text-white">Apex</div>
          <div className="text-sm whitespace-nowrap text-stone-400 uppercase">Dashboard</div>
        </div>
      </div>

      {/* Sidebar Content */}
      <article className="no-scrollbar ms-3 flex-1 overflow-y-auto">
        {!isShowSideBar ? (
          <div className="ms-3.5">
            {totalArrSubMenu.map((it, index) => {
              return (
                <div className="my-2 text-2xl text-white" key={index}>
                  {it.icon}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {menuItems.map((item) => (
              <div key={item.id} className="mb-2">
                <div
                  className="flex cursor-pointer items-center justify-between py-2 text-stone-400 transition-colors hover:text-white"
                  onClick={() => handleToggle(item.id)}
                >
                  <div className="text-sm font-medium">{item.title}</div>

                  {/* CHÈN THÊM ICON ĐỂ UX TỐT HƠN: Quay mũi tên dựa vào trạng thái đóng/mở */}
                  <MdArrowForwardIos
                    className={`text-xs transition-transform duration-300 ${
                      activeItems.includes(item.id) ? 'rotate-90' : 'rotate-0'
                    }`}
                  />
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    activeItems.includes(item.id)
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <ul className="mt-1 space-y-3 pb-2 pl-2 text-stone-500">
                      {/* TỐI ƯU nhẹ: Lấy trực tiếp từ item.subMenu */}
                      {(item.subMenu || []).map((itMenuChild) => {
                        return (
                          <li key={itMenuChild.title}>
                            <Link
                              to={itMenuChild.link}
                              className={`flex items-center gap-2 hover:text-amber-500 ${pathname === itMenuChild.link ? 'text-amber-500' : ''}`}
                            >
                              {itMenuChild.icon}
                              {itMenuChild.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </article>

      {/* Sidebar Footer */}
      <div className="flex h-20 items-center border-t border-stone-800">
        <div className="flex w-20 items-center justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-white">
            A
          </div>
        </div>
        <div
          className={`flex items-center justify-between overflow-hidden transition-all duration-300 ${isShowSideBar ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
        >
          <div className="whitespace-nowrap">
            <div className="font-bold text-white">Aigars S.</div>
            <div className="text-xs text-stone-400 uppercase">Admin</div>
          </div>
          <a href="/login?admin" className="pr-4">
            <FaArrowUpRightFromSquare className="cursor-pointer text-stone-400 hover:text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
