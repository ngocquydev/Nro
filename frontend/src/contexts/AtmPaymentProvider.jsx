import { createContext, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getQrCode } from '@config/api/atm/atm';
export const AtmPaymentContext = createContext(null);

export const AtmPaymentProvider = ({ children }) => {
  const [url, setUrl] = useState(null);
  const generateNumericId = () => {
    // Lấy thời gian hiện tại: YYMMDDHHMMSS (12 chữ số)
    const now = new Date();
    const timestamp =
      now.getFullYear().toString().slice(2) +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0') +
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');

    // Lấy 3 số ngẫu nhiên cuối để đảm bảo không trùng
    const randomSuffix = Math.floor(100 + Math.random() * 900);

    return `${timestamp}${randomSuffix}`;
  };

  const depositSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError('Số tiền phải là một con số')
      .required('Vui lòng nhập số tiền')
      .min(1, 'Số tiền phải lớn hơn 0')
      .max(10000000, 'Số tiền không được quá 10 triệu VNĐ'),
  });
  const formik = useFormik({
    initialValues: { amount: '', desc: '' },
    validationSchema: depositSchema,
    onSubmit: async (values) => {
      try {
        const desc = `Thanh toan don hang DH${generateNumericId()}`;
        const qrCodeData = await getQrCode(values.amount, desc);
        console.log(qrCodeData);
        setUrl(qrCodeData.data);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    },
  });
  const value = { formik, url, setUrl };
  return <AtmPaymentContext.Provider value={value}>{children}</AtmPaymentContext.Provider>;
};
