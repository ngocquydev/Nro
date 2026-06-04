import React, { useEffect, useRef, useState } from 'react';
import { CiBellOn, CiSettings } from 'react-icons/ci';
import { IoMoonOutline, IoSearchOutline } from 'react-icons/io5';
import { MdOutlinePalette } from 'react-icons/md';

function Header() {
  const containerRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setToggle(false);
      }
    }

    // Lắng nghe sự kiện mousedown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: xóa sự kiện khi component bị hủy
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center justify-between" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          className="rounded-md border px-8 py-2 text-olive-950 opacity-50 outline-none focus:outline-none"
          placeholder="Search anything..."
        />
        <IoSearchOutline className="absolute top-[50%] ms-2 translate-y-[-50%]" />
      </div>
      <div>
        <ul className="flex items-center justify-between gap-4">
          {/* Nhóm trái */}
          <li>
            <a
              href="#"
              className="block rounded-lg bg-amber-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-600"
            >
              + New Order
            </a>
          </li>

          {/* Nhóm phải */}
          <li className="flex items-center gap-4 text-black">
            <IoMoonOutline className="cursor-pointer" size={20} />
            <MdOutlinePalette className="cursor-pointer" size={20} />
            <CiBellOn className="cursor-pointer" size={20} />

            {/* Avatar Profile */}
            <div className="relative flex items-center gap-3">
              {/* Avatar - Nút bấm */}
              <button
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-200 font-bold text-amber-500 transition hover:bg-red-300"
                onClick={() => setToggle((prev) => !prev)}
              >
                A
              </button>

              {/* Popup Menu */}
              {toggle && (
                <div className="absolute top-12 right-0 z-50 w-48 rounded-xl border border-stone-800 bg-stone-900 p-3 text-white shadow-xl">
                  <ul className="space-y-3">
                    <li className="border-b border-stone-800 pb-2">
                      <div className="text-sm font-bold">Aigars S.</div>
                      <div className="text-xs text-stone-400">aigars@example.com</div>
                    </li>
                    <li className="flex cursor-pointer items-center gap-2 text-sm text-stone-300 hover:text-amber-500">
                      <CiSettings size={18} /> Settings
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
