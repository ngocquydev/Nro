import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import Products from "../Products/Products";
function Content() {
  const { textTitle, containerContent } = styles;
  return (
    <Container
      className={containerContent}
      style={{ marginTop: "100px", marginBottom: "100px" }}
    >
      <div className="content">
        <div className="mb-3">
          <div>
            <h2 className={textTitle}>NICK GAME GIÁ RẺ</h2>
          </div>
          <div>
            <Products titleCategory={"NICK GAME GIÁ RẺ".toUpperCase()} />
          </div>
        </div>
        <div className="mt-5 mb-3">
          <div>
            <h2 className={textTitle}>DỊCH VỤ NGỌC RỒNG</h2>
          </div>
          <div>
            <Products titleCategory={"DỊCH VỤ NGỌC RỒNG".toUpperCase()} />
          </div>
        </div>
      </div>
    </Container>
  );
}
export default Content;
