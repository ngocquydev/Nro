import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { getUser, loginUser, registerUser } from '@/_config/api/user/user';
import { auth } from '@/_config/firebase';
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userDT, setUserDT] = useState([]);
  const authRegisterUser = async ({ username, password, phone }) => {
    setLoading(true);
    let firebaseUser = null;
    try {
      const email = `${username}@mt.com`;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      firebaseUser = userCredential.user;

      const data = {
        uid: firebaseUser.uid,
        username: username,
        email: email,
        phone: phone,
        role: 'user',
      };

      const res = await registerUser(data);

      if (res.status === 'ERR') {
        throw new Error(res.message || 'Lỗi lưu dữ liệu tại Backend');
      }
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Lỗi đăng ký:', error);

      if (firebaseUser) {
        try {
          await firebaseUser.delete();
          console.log('Đã xóa user tạm thời trên Firebase do lỗi Backend.');
        } catch (deleteError) {
          console.error('Không thể xóa user sau lỗi BE:', deleteError);
        }
      }

      setLoading(false);

      let errorMsg = error.message || 'Đã có lỗi xảy ra, vui lòng thử lại.';
      if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'Tài khoản này đã được sử dụng!';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'Mật khẩu quá yếu!';
      }

      return { success: false, error: { message: errorMsg } };
    }
  };
  const authLogin = async (username, password) => {
    setLoading(true);
    try {
      const email = `${username}@mt.com`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userData = await loginUser(uid);

      setUserDT(userData?.data);
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Lỗi trong quá trình đăng nhập:', error);

      let errorMessage = error.message;
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Sai tài khoản hoặc mật khẩu!';
      } else if (!error.code) {
        errorMessage = 'Lỗi kết nối server backend!';
      }

      setLoading(false);
      return { success: false, error: { message: errorMessage } };
    }
  };
  const onChangePassword = async (oldPassword, newPassword) => {
    if (!oldPassword || !newPassword) {
      console.warn('Thiếu dữ liệu mật khẩu');
      return;
    }
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Lỗi:', error.code, error.message);
      setLoading(false);
      return { success: false };
    }
  };
  const handleLoginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const data = {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        phone: user.phoneNumber || 'chưa cập nhật',
        role: 'user',
      };
      const result = await registerUser(data);
      if (!result) return;
      return true;
    } catch (err) {
      console.log('Lỗi xảy ra:', err);
      let message;
      if (err.code === 'auth/account-exists-with-different-credential') {
        message =
          'Email này đã được sử dụng với một phương thức đăng nhập khác (ví dụ: Facebook). Vui lòng dùng đúng phương thức đó!';
      }
      // Nếu lỗi 403 hoặc 500 từ server, nó sẽ nhảy vào đây
      if (err.response) {
        console.log('Dữ liệu lỗi từ Server:', err.response.data);
      }
      return message;
    }
  };
  const handleLoginFB = async () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      const data = {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        phone: user.phoneNumber || 'chưa cập nhật',
        role: 'user',
      };

      const result = await registerUser(data);
      if (!result) return;
      return true;
    } catch (err) {
      // Bắt lỗi đóng popup giống như bên Google
      let message;
      if (err.code === 'auth/account-exists-with-different-credential') {
        message = 'Trùng Email với google vui lòng chọn acc facebook khác';
      }
      if (err.code === 'auth/popup-closed-by-user') {
        console.log('Người dùng đã hủy đăng nhập Facebook.');
      } else {
        console.error('Lỗi Facebook Auth:', err.message);
      }
      return message;
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLoadingUser(true);
        try {
          const res = await getUser();
          setUserDT(res.data?.data);
        } catch (err) {
          console.error('Lỗi lấy user:', err);
        } finally {
          setLoadingUser(false);
        }
      } else {
        setUserDT(null);
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);
  const value = {
    authRegisterUser,
    loading,
    authLogin,
    userDT,
    loadingUser,
    handleLoginGoogle,
    handleLoginFB,
    onChangePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
