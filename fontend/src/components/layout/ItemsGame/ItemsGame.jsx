import { Button as BootstrapBtn } from "react-bootstrap";
import styles from "./styles.module.scss";
import Button from "@components/common/Button/Button";
function ItemsGame({ src, title, card, atm, planed, server, category, id }) {
  const { container, boxImg, boxContent, boxBtn, containerBtn, idItem } =
    styles;
  return (
    <div className={container}>
      {/* Ảnh */}
      <div className={boxImg}>
        <img src={src} alt={title} />
        <div className={containerBtn}>
          <div className={boxBtn}>
            <Button text={"Mua Ngay"} isBg={false} />
          </div>
          <div className={boxBtn}>
            <BootstrapBtn variant="primary">Đặt cọc</BootstrapBtn>
          </div>
        </div>
        <div className={idItem}>ACC #{id}</div>
      </div>

      <div className={boxContent}>
        {/* Thông tin */}
        <div className="d-flex justify-content-between">
          <div className="mb-2">
            Hành Tinh:
            <strong className="ms-1">{planed}</strong>
          </div>

          <div className="mb-2">
            Server: <strong>{server} sao</strong>
          </div>
        </div>

        <div className="text-center mb-3">
          Đăng ký: <strong>{category}</strong>
        </div>

        {/* Giá */}
        <div className="text-center">
          <strong className="text-success mb-2">
            ATM {atm} <sup>đ</sup>
          </strong>
        </div>

        <div className="text-center">
          <strong className="text-danger">
            Card {card} <sup>đ</sup>
          </strong>
        </div>
      </div>
      <div>
        <Button
          text={"Chi tiết"}
          isBg={false}
          link={`/account?productId=${id}`}
        />
      </div>
    </div>
  );
}

export default ItemsGame;
