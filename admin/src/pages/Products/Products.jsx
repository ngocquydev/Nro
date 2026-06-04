import React, { useEffect, useRef, useState } from 'react';
import { CiSearch, CiViewColumn } from 'react-icons/ci';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { categories, listItem } from './contans/contans';
import { FaArrowDown } from 'react-icons/fa';

function Products() {
  const [type, setType] = useState('All');
  const [typeSubMenu, setTypeSubMenu] = useState('');
  const categoryRef = useRef(null);
  const columnsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        typeSubMenu === 'category' &&
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setTypeSubMenu('');
      }
      if (
        typeSubMenu === 'columns' &&
        columnsRef.current &&
        !columnsRef.current.contains(event.target)
      ) {
        setTypeSubMenu('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [typeSubMenu]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a href="#" className="transition-colors hover:text-blue-600">
              Dashboard
            </a>
          </li>
          <li>
            <span className="flex items-center text-gray-400">
              <MdKeyboardArrowRight size={16} />
            </span>
          </li>
          <li className="font-medium text-gray-900">Products</li>
        </ol>
      </nav>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">Browse and manage your product catalog.</p>
        </div>
        <div>
          <Link
            to="/"
            className="rounded-lg bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-700"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4">
        <ul className="inline-flex space-x-1 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm">
          {listItem.map((it) => {
            const isActive = it.name === type;
            return (
              <li
                key={it.name}
                onClick={() => setType(it.name)}
                className={`cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                  isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {it.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-9 flex items-center gap-2">
          <div className="max-w-md flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-300 bg-white py-1.5 pr-4 pl-9 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <CiSearch
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Ô Category Dropdown */}
          <div className="relative" ref={categoryRef}>
            <div
              className="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                setTypeSubMenu((prev) => (prev === 'category' ? '' : 'category'));
              }}
            >
              <IoIosAddCircleOutline size={16} className="text-gray-500" />
              <span>Category</span>
            </div>

            {typeSubMenu === 'category' && (
              <div className="absolute top-[115%] left-0 z-50 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                <div className="relative border-b border-gray-100 p-2">
                  <input
                    type="text"
                    placeholder="Search category..."
                    className="w-full rounded-md border border-gray-300 py-1.5 pr-3 pl-8 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <CiSearch
                    size={18}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div>
                  <ul className="max-h-60 space-y-0.5 overflow-y-auto bg-white p-1.5">
                    {categories.map((menu) => (
                      <li
                        key={menu.id}
                        onClick={(e) => e.stopPropagation()}
                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-800 transition-colors duration-150 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <RiCheckboxBlankCircleLine className="flex-shrink-0 text-lg text-amber-600" />
                          <span>{menu.title}</span>
                        </div>
                        <span className="pr-1 font-medium text-gray-900">2</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-3 flex justify-end gap-2">
          <div className="relative" ref={columnsRef}>
            <div
              className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                setTypeSubMenu((prev) => (prev === 'columns' ? '' : 'columns'));
              }}
            >
              <CiViewColumn size={18} className="text-gray-500" />
              <span>Columns</span>
            </div>

            {typeSubMenu === 'columns' && (
              <div className="absolute top-[115%] right-0 z-50 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                <div className="border-b border-gray-100 px-4 py-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Toggle columns
                </div>
                <div>
                  <ul className="space-y-0.5 bg-white p-1.5">
                    {categories.map((menu) => (
                      <li
                        key={menu.id}
                        onClick={(e) => e.stopPropagation()}
                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-800 transition-colors duration-150 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <RiCheckboxBlankCircleLine className="flex-shrink-0 text-lg text-blue-600" />
                          <span>{menu.title}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Nút Export */}
          <div className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
            <FaArrowDown size={13} className="text-gray-500" />
            <span>Export</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
