import { Button, Container } from "react-bootstrap";
import Breadcrumbs from "@components/common/Breadcrumbs/Breadcrumbs";
import { useContext } from "react";
import { ProductsContext } from "@contexts/ProductsProvider";
import formatMoney from "@/util/formatMoney";
import LoadingCommon from "@components/common/LoadingCommon/LoadingCommon";

function Detail() {
  const { details, isLoading } = useContext(ProductsContext);

  if (isLoading) {
    return <LoadingCommon loading={true} />;
  }
  const product = details.product;

  return (
    <Container className="py-4">
      <div>
        <Breadcrumbs
          title={
            <div className="fs-4 mt-3">
              <div className="mb-2">ACC nro #{product?._id} - Như Ảnh</div>

              <div className="mb-3">
                <span className="me-2 text-danger fw-bold">
                  CARD : {formatMoney(product?.card?.$numberDecimal)}
                  <sup>đ</sup>
                </span>
                <span className="text-muted">|</span>
                <span className="ms-2 text-success fw-bold">
                  ATM : {formatMoney(product?.atm?.$numberDecimal)}
                  <sup>đ</sup>
                </span>
              </div>

              <Button variant="danger" className="w-50 fw-bold py-2">
                MUA NGAY
              </Button>
            </div>
          }
          desc={`#${product?._id}`}
        />

        {/* ================= THÔNG TIN ================= */}
        <div className="mt-4">
          <h2 className="fw-bold h4">Thông Tin Chi Tiết</h2>
          <hr />

          <div className="d-flex flex-column gap-3">
            <div className="d-flex gap-5">
              <div>
                <span className="text-muted">HÀNH TINH:</span>
                <strong className="text-danger ms-2">{product?.planed}</strong>
              </div>
              <div>
                <span className="text-muted">SERVER:</span>
                <strong className="text-danger ms-2">
                  {product?.server} sao
                </strong>
              </div>
            </div>

            <div>
              <span className="text-muted">ĐĂNG KÝ:</span>
              <strong className="text-danger ms-2">
                {product?.accountType}
              </strong>
            </div>

            <div className="p-3 bg-light rounded border-start border-danger border-4">
              <span className="text-muted small">NỔI BẬT:</span>
              <br />
              <strong className="text-danger text-uppercase">
                {details?.desc || "Đang cập nhật nội dung nổi bật..."}
              </strong>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* ================= HÌNH ẢNH ================= */}
        <div className="mt-4">
          <h3 className="h5 mb-3 fw-bold">Hình ảnh thực tế</h3>
          {details?.images?.length > 0 ? (
            details.images.map((img, index) => (
              <div className="mb-3" key={index}>
                <img
                  src={img}
                  alt={`Sản phẩm ${product?._id} - hình ${index + 1}`}
                  loading="lazy" // Tối ưu hiệu năng load ảnh
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://s3.hcm-1.cloud.cmctelecom.vn/bannick/storage/imageacc/d09635c35c89f12b4555da2ba8ad0192.jpg";
                  }}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    display: "block",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-5 bg-light rounded">
              <p className="text-muted mb-0">
                Không có hình ảnh chi tiết cho sản phẩm này.
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Detail;
