import api from './axios';

const getAllDanhMuc = async () => {
    try {
        const res = await api.get('/products/DanhMucSanPham');
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllDanhMuc };
