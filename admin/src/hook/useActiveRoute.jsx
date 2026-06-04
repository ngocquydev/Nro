import { useLocation } from 'react-router-dom';

const useActiveRoute = (routes) => {
  const { pathname } = useLocation();

  // Hàm kiểm tra logic
  const isActive = (targetPath) => pathname === targetPath;
  const isExistingRoute = routes.some((item) => item.path === pathname);

  return { pathname, isActive, isExistingRoute };
};
export default useActiveRoute;
