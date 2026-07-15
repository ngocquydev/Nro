import { Button, Container } from 'react-bootstrap';
import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import { useEffect, useState } from 'react';
import formatMoney from '@/util/formatMoney';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import { useSearchParams } from 'react-router-dom';
import { getProductsById } from '@/_config/api/product/product';

function Detail() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    setIsLoading(true);

    getProductsById(id)
      .then((res) => {
        if (isMounted) {
          setData(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Lỗi khi tải chi tiết sản phẩm:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    }; // Cleanup
  }, [id]);

  if (isLoading) return <LoadingCommon loading={true} />;
  if (!data) return <Container className="py-5 text-center">Sản phẩm không tồn tại!</Container>;

  // Helper an toàn cho giá tiền
  const getPrice = (val) => val?.$numberDecimal || val || 0;

  return (
    <Container className="py-4">
      <div>
        <Breadcrumbs
          title={
            <div className="fs-4 mt-3" style={{ minWidth: '300px' }}>
              <div className="fw-bold mb-2">ACC nro #{data?._id}</div>
              <div className="mb-3">
                <span className="text-success fw-bold">
                  Giá : {formatMoney(getPrice(data?.ATM))}
                  <sup>đ</sup>
                </span>
              </div>
              <div className="d-flex">
                <Button variant="danger" className="fw-bold w-50 py-2 shadow-sm">
                  Mua ngay
                </Button>
                <Button variant="primary" className="fw-bold ms-2 w-50 py-2 shadow-sm">
                  Trả góp
                </Button>
              </div>
            </div>
          }
          desc={`#${data?._id}`}
        />

        {/* Thông tin chi tiết */}
        <div className="mt-4 rounded bg-white p-4 shadow-sm">
          <h2 className="fw-bold h4 mb-3">Thông Tin Chi Tiết</h2>
          <hr />
          <div className="d-flex flex-column gap-3">
            <div className="d-flex gap-5">
              <div>
                <span className="text-muted">HÀNH TINH:</span>
                <strong className="text-danger ms-2">{data?.planed || 'Chưa cập nhật'}</strong>
              </div>
              <div>
                <span className="text-muted">SERVER:</span>
                <strong className="text-danger ms-2">{data?.server || 0} sao</strong>
              </div>
            </div>
            <div>
              <span className="text-muted">ĐĂNG KÝ:</span>
              <strong className="text-danger ms-2">{data?.register || 'Trống'}</strong>
            </div>
            <div className="bg-light border-start border-danger rounded border-4 p-3">
              <span className="text-muted small">NỔI BẬT:</span>
              <div className="text-danger fw-bold text-uppercase mt-1">
                {data?.desc || 'Đang cập nhật nội dung nổi bật...'}
              </div>
            </div>
          </div>
        </div>

        {/* Hình ảnh */}
        <div className="mt-4">
          <h3 className="h5 fw-bold mb-3">Hình ảnh thực tế</h3>
          {data?.img?.length > 0 ? (
            data.img.map((img, index) => (
              <div className="mb-4" key={index}>
                <img
                  src={img}
                  alt={`Sản phẩm ${data?._id} - hình ${index + 1}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '100%', borderRadius: '12px' }}
                  onError={(e) => {
                    e.target.src =
                      'https://s3.hcm-1.cloud.cmctelecom.vn/bannick/storage/imageacc/d09635c35c89f12b4555da2ba8ad0192.jpg';
                  }}
                />
              </div>
            ))
          ) : (
            <div className="bg-light rounded py-5 text-center">Không có hình ảnh chi tiết.</div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Detail;
