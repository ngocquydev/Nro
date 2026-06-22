import { createContext, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from './AuthProvider';
import { recharges } from '@/_config/api/recharges/recharges';
export const RechagresContext = createContext(null);

export const RechagresProvider = ({ children }) => {
  const { userDT } = useContext(AuthContext);
  const validationSchema = Yup.object({
    telco: Yup.string().required('Vui lòng chọn nhà mạng'),
    monney: Yup.string().required('Vui lòng chọn mệnh giá'),
    serial: Yup.string()
      .matches(/^[0-9]+$/, 'Số serial chỉ được bao gồm các chữ số')
      .required('Vui lòng nhập serial'),
    code: Yup.string()
      .matches(/^[0-9]+$/, 'Mã thẻ chỉ được bao gồm các chữ số')
      .required('Vui lòng nhập mã thẻ'),
  });

  const handleSubmit = (values) => {
    const body = {
      telco: values.telco,
      code: values.code,
      serial: values.serial,
      amount: +values.monney,
      userId: userDT?._id,
    };
    recharges(body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error('lỗi', err);
      });
  };
  const formik = useFormik({
    initialValues: {
      telco: '',
      code: '',
      serial: '',
      monney: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  const value = {
    formik,
    handleSubmit,
  };

  return <RechagresContext.Provider value={value}>{children}</RechagresContext.Provider>;
};
