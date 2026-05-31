import React, { useState } from 'react';
// Sử dụng thư viện react-icons (bộ Material Design - md)
import { MdOutlineMail, MdLockOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Chào mừng trở lại</h2>
          <p className="mt-2 text-gray-500">Vui lòng nhập thông tin để tiếp tục</p>
        </div>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <MdOutlineMail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 py-2.5 pr-4 pl-10 transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                placeholder="name@company.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex justify-between">
              <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                Quên mật khẩu?
              </a>
            </div>
            <div className="relative">
              <MdLockOutline className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-10 transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
