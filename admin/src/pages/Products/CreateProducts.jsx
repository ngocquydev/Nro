import { useState, useRef, useEffect } from 'react';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import Button from '@components/Button/Button';
import SelectInput from './components/SelectInput/SelectInput';
import { dataRouter, status } from './contans/contans';
function CreateProducts() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb nameParent={'Products'} nameChild={'Create Product'} isChild />
          <h1 className="mt-2 text-2xl font-bold text-gray-900">New Product</h1>
          <p className="text-gray-600">Add a new product to the catalog.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-lg font-bold text-gray-800">Product Information</h2>
              <p className="mb-6 text-sm text-gray-500">
                Enter the basic details for the new product.
              </p>
              <div className="mb-4 space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700" htmlFor="productName">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter product name"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700" htmlFor="productDescription">
                    Description
                  </label>
                  <textarea
                    id="productDescription"
                    rows="3"
                    className="w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700" htmlFor="productPrice">
                      Price
                    </label>
                    <input
                      type="number"
                      id="productPrice"
                      placeholder="0.00"
                      className="w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700" htmlFor="productStock">
                      Stock
                    </label>
                    <input
                      type="number"
                      id="productStock"
                      placeholder="0"
                      className="w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-800">Organization</h2>
              <div className="space-y-4">
                <SelectInput data={dataRouter} />
                <SelectInput data={status} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button name="Create Product" bg="bg-emerald-600" hover="hover:bg-emerald-700" />
              <Button
                name="Cancel"
                textColor="text-dark"
                bg="bg-white"
                href={'/products'}
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
