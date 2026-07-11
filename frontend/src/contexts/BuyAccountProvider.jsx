import { createContext, useContext, useEffect, useState } from 'react';
import { ToastMessgeContext } from './ToastMessgeProvider';
import { buyAccount } from '@config/api/buy/buy';

export const BuyAccountContext = createContext(null);

export const BuyAccountProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [idBuy, setIdBuy] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useContext(ToastMessgeContext);

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

  const value = {
    step,
    setStep,
    setAccount,
    account,
    loading,
    onConfirm,
    idBuy,
  };

  return <BuyAccountContext.Provider value={value}>{children}</BuyAccountContext.Provider>;
};
