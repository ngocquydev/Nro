import React, { useEffect, useRef, useState } from 'react';
import { CiSearch, CiViewColumn } from 'react-icons/ci';
import { IoIosAddCircleOutline, IoIosMore } from 'react-icons/io';
import { MdCheckBoxOutlineBlank, MdDeleteForever, MdKeyboardArrowRight } from 'react-icons/md';
import { MdOutlineCheckBox } from 'react-icons/md';
import { categories, Columns, listItem } from './contans/contans';
import { FaArrowDown, FaEdit } from 'react-icons/fa';
import ColumProduct from './components/ColumProducts/ColumProduct';
import { FaEye } from 'react-icons/fa6';
import useModal from '@hook/useModal';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import Pagination from '@components/Pagination/Pagination';
import Button from '@components/Button/Button';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
const dataTables = [
  {
    id: 1,
    name: ' John Michael',
    category: 'Manager',
    status: 'còn',
    stock: 999,
    price: 10000,
    created: '2/7/2023',
  },
  {
    id: 2,
    name: ' John Michael',
    category: 'Manager',
    status: 'còn',
    stock: 999,
    price: 10000,
    created: '2/7/2023',
  },
  {
    id: 3,
    name: ' John Michael',
    category: 'Manager',
    status: 'còn',
    stock: 999,
    price: 10000,
    created: '2/7/2023',
  },
];
function Products() {
  const [type, setType] = useState('All');
  const [typeSubMenu, setTypeSubMenu] = useState('');
  const categoryRef = useRef(null);
  const columnsRef = useRef(null);
  const { isShowing, toggle } = useModal();
  const [id, setId] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([
    'ColumsProdcutsName',
    'ColumsProdcutsCategory',
    'ColumsProdcutsStatus',
    'ColumsProdcutsStock',
    'ColumsProdcutsPrice',
    'ColumsProdcutsCreated',
  ]);
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-menu-container')) {
        toggle;
        setId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Breadcrumb nameParent={'Products'} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">Browse and manage your product catalog.</p>
        </div>
        <Button
          name="+ Add Product"
          bg="bg-emerald-600"
          bgHover="bg-emerald-700"
          href={'/products/create'}
        />
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
                          <RiCheckboxBlankCircleLine className="flex-shrink-0 text-lg text-blue-600" />
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
                    {Columns.map((colum) => (
                      <li
                        key={colum.id}
                        onClick={(e) => e.stopPropagation()}
                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-800 transition-colors duration-150 hover:bg-gray-50"
                      >
                        <div
                          className="flex items-center gap-3"
                          onClick={() =>
                            setVisibleColumns((prev) =>
                              prev.includes(colum.id)
                                ? prev.filter((id) => id !== colum.id)
                                : [...prev, colum.id]
                            )
                          }
                        >
                          {!visibleColumns.includes(colum.id) ? (
                            <MdOutlineCheckBox className="flex-shrink-0 text-lg text-blue-600" />
                          ) : (
                            <MdCheckBoxOutlineBlank className="flex-shrink-0 text-lg text-blue-600" />
                          )}
                          <span>{colum.name}</span>
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
      <div className="relative mt-3 flex h-full w-full flex-col overflow-scroll rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <ColumProduct
                title={'Name'}
                isShowColums={!visibleColumns.includes('ColumsProdcutsName')}
              />
              <ColumProduct
                title={'Category'}
                isShowColums={!visibleColumns.includes('ColumsProdcutsCategory')}
              />
              <ColumProduct
                title={'Status'}
                isShowColums={!visibleColumns.includes('ColumsProdcutsStatus')}
              />
              <ColumProduct
                title={'Stock'}
                isShowColums={!visibleColumns.includes('ColumsProdcutsStock')}
              />
              <ColumProduct
                title={'Price'}
                isShowColums={!visibleColumns.includes('ColumsProdcutsPrice')}
              />
              <ColumProduct
                title={'Created'}
                isShowColums={!visibleColumns.includes('ColumsProdcutsCreated')}
              />
              <ColumProduct title={'Action'} />
            </tr>
          </thead>
          <tbody>
            {dataTables.map((data) => {
              return (
                <tr key={data.id}>
                  <td
                    className="border-blue-gray-50 border-b p-4"
                    style={visibleColumns.includes('ColumsProdcutsName') ? {} : { display: 'none' }}
                  >
                    <p className="text-blue-gray-900 block font-sans text-sm leading-normal font-normal antialiased">
                      {data.name}
                    </p>
                  </td>
                  <td
                    className="border-blue-gray-50 border-b p-4"
                    style={
                      visibleColumns.includes('ColumsProdcutsCategory') ? {} : { display: 'none' }
                    }
                  >
                    <p className="text-blue-gray-900 block font-sans text-sm leading-normal font-normal antialiased">
                      {data.category}
                    </p>
                  </td>
                  <td
                    className="border-blue-gray-50 border-b p-4"
                    style={
                      visibleColumns.includes('ColumsProdcutsStatus') ? {} : { display: 'none' }
                    }
                  >
                    <p className="text-blue-gray-900 block font-sans text-sm leading-normal font-normal antialiased">
                      {data.status}
                    </p>
                  </td>
                  <td
                    className="border-blue-gray-50 border-b p-4"
                    style={
                      visibleColumns.includes('ColumsProdcutsStock') ? {} : { display: 'none' }
                    }
                  >
                    <a
                      href="#"
                      className="text-blue-gray-900 block font-sans text-sm leading-normal font-medium antialiased"
                    >
                      {data.stock}
                    </a>
                  </td>
                  <td
                    className="border-blue-gray-50 border-b p-4"
                    style={
                      visibleColumns.includes('ColumsProdcutsPrice') ? {} : { display: 'none' }
                    }
                  >
                    <a
                      href="#"
                      className="text-blue-gray-900 block font-sans text-sm leading-normal font-medium antialiased"
                    >
                      {data.price}
                    </a>
                  </td>
                  <td
                    className="border-blue-gray-50 border-b p-4"
                    style={
                      visibleColumns.includes('ColumsProdcutsCreated') ? {} : { display: 'none' }
                    }
                  >
                    <a
                      href="#"
                      className="text-blue-gray-900 block font-sans text-sm leading-normal font-medium antialiased"
                    >
                      {data.created}
                    </a>
                  </td>
                  <td className="border-blue-gray-50 border-b p-4">
                    <div className="relative inline-block p-4 text-left">
                      {/* Nút bấm (Icon) */}
                      <button
                        className="text-blue-gray-900 rounded-full p-2 transition-colors hover:bg-gray-100"
                        onClick={() => {
                          setId(data.id);
                          toggle();
                        }}
                      >
                        <IoIosMore size={20} className="cursor-pointer" />
                      </button>

                      {/* Menu thả xuống */}
                      {isShowing && data.id === id && (
                        <ul className="absolute right-0 z-50 mt-2 w-32 rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
                          <li className="flex cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                            <FaEye size={20} className="mr-1" />
                            View
                          </li>
                          <li className="flex cursor-pointer px-4 py-2 text-sm font-medium transition-colors hover:bg-red-50">
                            <FaEdit size={20} className="mr-1" />
                            Edit
                          </li>
                          <li className="flex cursor-pointer px-4 py-2 text-sm font-medium transition-colors hover:bg-red-50">
                            <MdDeleteForever size={20} className="mr-1" />
                            Delete
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={1} totalResults={100} itemsPerPage={2} onPageChange={3} />
    </div>
  );
}

export default Products;
