// utils/formatTime.js
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export const formatRelativeTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Kiểm tra nếu ngày hợp lệ
  if (isNaN(date.getTime())) return "Ngày không hợp lệ";

  return formatDistanceToNow(date, {
    addSuffix: true, // Thêm chữ "trước" hoặc "sau"
    locale: vi, // Chuyển sang tiếng Việt
  });
};
