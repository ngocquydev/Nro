import { createContext, useContext, useEffect, useState } from 'react';
import { ToastMessgeContext } from './ToastMessgeProvider';
import { buyAccount, getHistoryBuy } from '@config/api/buy/buy';
import { AuthContext } from './AuthProvider';

export const BuyAccountContext = createContext(null);

export const BuyAccountProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [idBuy, setIdBuy] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useContext(ToastMessgeContext);
  const { userDT } = useContext(AuthContext);
  const [listHistoryBuy, setlistHistoryBuy] = useState([]);
  const onConfirm = async (id, productId, method) => {
    setLoading(true);
    try {
      const res = await buyAccount(id, productId, method);
      setIdBuy(productId);
      setLoading(false);
      return res;
    } catch (error) {
      if (error.success === false) {
        console.error('lỗi', error.message);
        toast.error(error.message);
        setLoading(false);
        return;
      }
      toast.warning('Mất kết nối mạng hoặc lỗi server');
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    if (!userDT || !userDT._id) {
      return;
    }
    getHistoryBuy(userDT._id)
      .then((res) => {
        setlistHistoryBuy(res.data.list);
      })
      .catch((err) => console.error('lỗi', err))
      .finally(() => setLoading(false));
  }, [userDT._id, idBuy]);
  const value = {
    step,
    setStep,
    setAccount,
    account,
    loading,
    onConfirm,
    idBuy,
    listHistoryBuy,
  };

  return <BuyAccountContext.Provider value={value}>{children}</BuyAccountContext.Provider>;
};
