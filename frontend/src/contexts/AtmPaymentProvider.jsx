import { createContext, useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getHistoryATM, getQrCode } from '@config/api/atm/atm';
import { AuthContext } from './AuthProvider';
import { useLocation } from 'react-router-dom';
export const AtmPaymentContext = createContext(null);

export const AtmPaymentProvider = ({ children }) => {
  const [url, setUrl] = useState(null);
  const { userDT } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
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
        const desc = `NAP${userDT?._id}`;
        const qrCodeData = await getQrCode(values.amount, desc);
        setUrl(qrCodeData.data);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    },
  });
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await getHistoryATM(userDT?._id);
        setData(res);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    if (userDT?._id) {
      fetchData();
    }
  }, [userDT?._id, location]);
  const value = { formik, url, setUrl, data, loading };
  return <AtmPaymentContext.Provider value={value}>{children}</AtmPaymentContext.Provider>;
};
