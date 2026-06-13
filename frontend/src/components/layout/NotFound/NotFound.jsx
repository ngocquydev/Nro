import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
function NotFound() {
  const {
    error_One,
    error_Content,
    error_404,
    sub_Title,
    text,
    error_Form,
    error_Btn,
    primary_Btn,
  } = styles;

  return (
    <section className={error_One}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-7 col-xl-8 col-lg-8">
            <div className={`${error_Content} text-center`}>
              <span className={error_404}>404</span>
              <h5 className={sub_Title}>Page Not Found</h5>
              <p className={text}>
                Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã bị di
                dời. Vui lòng thử tìm kiếm bên dưới.
              </p>

              <div className={error_Form}>
                {/* Thêm className={primary_Btn} để áp dụng style nút bấm */}
                <Link
                  to="/"
                  className={primary_Btn}
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  Về lại trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default NotFound;
