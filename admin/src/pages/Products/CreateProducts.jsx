import { useState, useRef, useEffect } from 'react';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import Button from '@components/Button/Button';

// --- Component SelectInput với tính năng Click Outside ---
function SelectInput() {
  const [selected, setSelected] = useState('USA');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 transition outline-none hover:bg-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      >
        {selected}
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="2" d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-xl">
          <ul className="p-2 text-sm text-gray-700">
            {['USA', 'Australia', 'UK'].map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(item);
                    setIsOpen(false);
                  }}
                  className="w-full rounded-md p-2 text-left hover:bg-gray-100"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// --- Main Page Component ---
function CreateProducts() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb nameParent={'Products'} nameChild={'Create Product'} isChild />
          <h1 className="mt-2 text-2xl font-bold text-gray-900">New Product</h1>
          <p className="text-gray-600">Add a new product to the catalog.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Cột chính (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-lg font-bold text-gray-800">Product Information</h2>
              <p className="mb-6 text-sm text-gray-500">
                Enter the basic details for the new product.
              </p>

              <div className="space-y-4">
                {['Product Name', 'Category'].map((label) => (
                  <div key={label} className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows="3"
                    className="w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải (1/3) */}
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-800">Organization</h2>
              <div className="space-y-4">
                <SelectInput />
                <SelectInput />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button name="Create Product" bg="bg-emerald-600" hover="hover:bg-emerald-700" />
              <Button
                name="Cancel"
                textColor="text-dark"
                bg="bg-white"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProducts;
