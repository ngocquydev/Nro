import { createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastMessgeContext = createContext(null);

export const ToastMessgeProvider = ({ children }) => {
    const value = {
        toast,
    };

    return (
        <ToastMessgeContext.Provider value={value}>
            {children}
            <ToastContainer />
        </ToastMessgeContext.Provider>
    );
};
